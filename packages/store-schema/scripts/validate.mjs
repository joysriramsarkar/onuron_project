import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

function findRoot(dir) {
  let d = dir;
  while (d !== path.dirname(d)) {
    if (fs.existsSync(path.join(d, "pnpm-workspace.yaml"))) return d;
    d = path.dirname(d);
  }
  throw new Error("monorepo root not found");
}

const REG = path.join(findRoot(process.cwd()), "apps/store/public/registry/apps");
const STORE_PUBLIC = path.join(findRoot(process.cwd()), "apps/store/public");
const CATS = ["productivity", "utilities", "media", "games", "development", "communication", "education", "security"];
const ARCHES = ["x86_64", "aarch64", "riscv64"];
const PACKAGE_EXTENSIONS = [".nilax", ".onp"];
const SEMVER_RE = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
const TRUSTED_KEYS_FILE = path.join(import.meta.dirname, "..", "trusted-keys.json");
const DOWNLOAD_TIMEOUT_MS = 15000;

const VERIFY = process.argv.includes("--verify");

const errors = [];
const warnings = [];
const err = (app, msg) => errors.push(`[${app}] ${msg}`);
const warn = (app, msg) => warnings.push(`[${app}] ${msg}`);

// ---------------------------------------------------------------------------
// Package format compatibility
// ---------------------------------------------------------------------------

// packageExtension returns the lowercased extension of a package URL's path, or
// "" when the URL cannot be parsed.
function packageExtension(url) {
  try {
    return path.extname(new URL(url).pathname).toLowerCase();
  } catch {
    return "";
  }
}

// ---------------------------------------------------------------------------
// Placeholder checksum detection
// ---------------------------------------------------------------------------

// Hashes of trivial test strings — real packages never match these.
const KNOWN_PLACEHOLDER_HASHES = new Set(
  ["", "0", "1", "a", "abc", "test", "foo", "bar", "hello", "password", "123", "123456", "nil", "nilax", "onp", "onuron"].map((s) =>
    crypto.createHash("sha256").update(s).digest("hex")
  )
);

/**
 * Returns a human-readable reason when `sha256` is a known placeholder
 * checksum, or null when it looks like a real hash.
 */
function placeholderReason(sha256) {
  const h = String(sha256).toLowerCase();
  if (!/^[0-9a-f]{64}$/.test(h)) return null;
  if (/^0{64}$/.test(h)) return "all-zeros checksum";
  if (/^(.)\1{63}$/.test(h)) return "repeated-character checksum";
  if (KNOWN_PLACEHOLDER_HASHES.has(h)) {
    return "matches sha256 of a common test string (e.g. \"abc\" / \"test\")";
  }
  // Repeated short block, e.g. "a1b2c3d4a1b2c3d4..."
  for (let len = 1; len <= 16; len++) {
    if (64 % len !== 0) continue;
    const block = h.slice(0, len);
    if (block.repeat(64 / len) === h) return `repeated ${len}-char block pattern`;
  }
  // Sequential hex, e.g. "a1b2c3d4e5f6..." — a run of >= 10 bytes with a
  // constant step (mod 256) between consecutive bytes.
  const bytes = Buffer.from(h, "hex");
  for (let i = 0; i + 10 <= bytes.length; i++) {
    const step = (bytes[i + 1] - bytes[i] + 256) % 256;
    if (step === 0) continue;
    let run = 2;
    while (i + run < bytes.length && (bytes[i + run] - bytes[i + run - 1] + 256) % 256 === step) run++;
    if (run >= 10) return "sequential hex pattern (e.g. \"a1b2c3d4...\")";
  }
  return null;
}

// ---------------------------------------------------------------------------
// Trusted-key loading + Ed25519 verification
// ---------------------------------------------------------------------------

function loadTrustedKeys() {
  if (!fs.existsSync(TRUSTED_KEYS_FILE)) return [];
  try {
    const keys = JSON.parse(fs.readFileSync(TRUSTED_KEYS_FILE, "utf8"));
    return Array.isArray(keys) ? keys : [];
  } catch {
    return [];
  }
}

/** Import a base64 raw 32-byte key or a PEM key string into a KeyObject. */
function importKey(key, type) {
  if (String(key).includes("-----BEGIN")) {
    return type === "public" ? crypto.createPublicKey(key) : crypto.createPrivateKey(key);
  }
  const raw = Buffer.from(key, "base64");
  const derPrefix = type === "public"
    ? Buffer.from("302a300506032b6570032100", "hex") // DER SPKI prefix for Ed25519
    : Buffer.from("302e020100300506032b657004220420", "hex"); // DER PKCS#8 prefix
  const der = Buffer.concat([derPrefix, raw]);
  return type === "public"
    ? crypto.createPublicKey({ key: der, format: "der", type: "spki" })
    : crypto.createPrivateKey({ key: der, format: "der", type: "pkcs8" });
}

function verifySignature(app, m, data) {
  const keys = loadTrustedKeys();
  const signer = m.package.signer;
  const entry = signer ? keys.find((k) => k.id === signer) : keys[0];
  if (!entry) {
    err(app, `signature present but no trusted key${signer ? ` with id "${signer}"` : ""} in trusted-keys.json`);
    return;
  }
  let pub;
  try {
    pub = importKey(entry.key, "public");
  } catch (e) {
    err(app, `trusted key "${entry.id}" is invalid: ${e.message}`);
    return;
  }
  let ok = false;
  try {
    ok = crypto.verify(null, data, pub, Buffer.from(m.package.signature, "base64"));
  } catch {
    ok = false;
  }
  if (!ok) err(app, `Ed25519 signature invalid (signer: ${entry.id})`);
}

// ---------------------------------------------------------------------------
// Package download + checksum/size verification
// ---------------------------------------------------------------------------

let verifiedCount = 0;

// verifyPackage checks a package against its manifest. When the manifest names a
// committed artifact via `package.path` (relative to apps/store/public) that
// file is read directly, so CI verifies the exact bytes that will be served —
// no network and no dependency on the CDN being deployed. Otherwise the package
// is downloaded from package.url.
async function verifyPackage(app, m) {
  let buf;

  const localRel = m.package.path;
  if (localRel) {
    const localAbs = path.join(STORE_PUBLIC, localRel);
    if (!fs.existsSync(localAbs)) {
      err(app, `package.path declared but file missing: ${localRel}`);
      return;
    }
    buf = fs.readFileSync(localAbs);
  } else {
    let res;
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), DOWNLOAD_TIMEOUT_MS);
      res = await fetch(m.package.url, { signal: ctrl.signal, redirect: "follow" });
      clearTimeout(timer);
    } catch (e) {
      // CDN may not be deployed yet — warn, don't fail.
      warn(app, `package URL unreachable (${m.package.url}): ${e.message} — skipping download verification`);
      return;
    }
    if (!res.ok) {
      warn(app, `package URL returned HTTP ${res.status} — skipping download verification`);
      return;
    }
    buf = Buffer.from(await res.arrayBuffer());
  }

  verifiedCount++;

  if (buf.length !== m.package.size) {
    err(app, `size mismatch: manifest says ${m.package.size} bytes, package is ${buf.length}`);
  }
  const actual = crypto.createHash("sha256").update(buf).digest("hex");
  if (actual !== String(m.package.sha256).toLowerCase()) {
    err(app, `sha256 mismatch: manifest says ${m.package.sha256}, actual ${actual}`);
  }
  if (m.package.signature) verifySignature(app, m, buf);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

if (!fs.existsSync(REG)) {
  console.log("registry empty — nothing to validate");
  process.exit(0);
}

const manifests = [];

for (const dir of fs.readdirSync(REG)) {
  const appDir = path.join(REG, dir);
  if (!fs.statSync(appDir).isDirectory()) continue;
  const mFile = path.join(appDir, "manifest.json");
  if (!fs.existsSync(mFile)) {
    err(dir, "manifest.json missing");
    continue;
  }

  let m;
  try {
    m = JSON.parse(fs.readFileSync(mFile, "utf8"));
  } catch {
    err(dir, "manifest.json invalid JSON");
    continue;
  }

  if (m.id !== dir) err(dir, `id "${m.id}" must equal folder name`);
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(m.id ?? "")) err(dir, "bad id format");
  if (!m.name?.trim()) err(dir, "name required");
  if (!m.summary?.trim()) err(dir, "summary required");
  // --- version / OS compatibility -------------------------------------------
  if (!SEMVER_RE.test(m.version ?? "")) err(dir, `bad version (must be semver): ${m.version}`);
  if (!SEMVER_RE.test(m.minOs ?? "")) err(dir, `minOs must be a semver string: ${m.minOs}`);
  if (!Array.isArray(m.arch) || !m.arch.length || m.arch.some((a) => !ARCHES.includes(a))) err(dir, "bad arch");

  // --- package format --------------------------------------------------------
  if (!m.package?.url?.startsWith("https://")) err(dir, "package.url must be https");
  const ext = packageExtension(m.package?.url ?? "");
  if (!PACKAGE_EXTENSIONS.includes(ext)) {
    err(dir, `package format must be one of ${PACKAGE_EXTENSIONS.join(", ")} (got "${ext || "?"}")`);
  }
  if (!/^[0-9a-f]{64}$/.test(m.package?.sha256 ?? "")) err(dir, "sha256 must be 64 hex chars");
  if (!(m.package?.size > 0)) err(dir, "package.size must be > 0");
  if (m.package?.path !== undefined) {
    const p = m.package.path;
    if (typeof p !== "string" || path.isAbsolute(p) || p.split(/[\\/]/).includes("..")) {
      err(dir, "package.path must be a relative path inside apps/store/public");
    }
  }
  if (m.package?.signature !== undefined && !m.package?.signer) {
    err(dir, "package.signature present but package.signer is missing");
  }

  if (!CATS.includes(m.category)) err(dir, "bad category");
  if (!m.developer?.name) err(dir, "developer.name required");
  if (!m.media?.icon || !fs.existsSync(path.join(appDir, m.media.icon))) err(dir, "icon file missing");
  for (const s of m.media?.screenshots ?? []) {
    if (!fs.existsSync(path.join(appDir, s))) err(dir, `screenshot missing: ${s}`);
  }

  // Placeholder checksums are a hard error, with or without --verify: a store
  // entry must stand for a real, verifiable artifact. Publishing the SHA-256 of
  // "abc" would otherwise let CI report success for a package that does not
  // exist.
  const reason = placeholderReason(m.package?.sha256);
  if (reason) {
    err(dir, `placeholder checksum: ${reason} — build and sign a real package before publishing`);
  }

  if (VERIFY && m.package?.url && /^[0-9a-f]{64}$/.test(m.package?.sha256 ?? "")) {
    manifests.push([dir, m]);
  }
}

if (VERIFY) {
  await Promise.all(manifests.map(([dir, m]) => verifyPackage(dir, m)));
}

for (const w of warnings) console.warn(`⚠️  ${w}`);

if (errors.length) {
  console.error("❌ Registry invalid:\n" + errors.join("\n"));
  process.exit(1);
}

if (VERIFY) {
  const skipped = manifests.length - verifiedCount;
  console.log(`✅ Registry valid (${verifiedCount} packages verified, ${skipped} skipped)`);
} else {
  console.log("✅ Registry valid");
}
