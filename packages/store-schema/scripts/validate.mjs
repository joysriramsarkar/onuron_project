import fs from "node:fs";
import path from "node:path";

function findRoot(dir) {
  let d = dir;
  while (d !== path.dirname(d)) {
    if (fs.existsSync(path.join(d, "pnpm-workspace.yaml"))) return d;
    d = path.dirname(d);
  }
  throw new Error("monorepo root not found");
}

const REG = path.join(findRoot(process.cwd()), "apps/store/public/registry/apps");
const CATS = ["productivity", "utilities", "media", "games", "development", "communication", "education", "security"];
const ARCHES = ["x86_64", "aarch64", "riscv64"];
const errors = [];
const err = (app, msg) => errors.push(`[${app}] ${msg}`);

if (!fs.existsSync(REG)) {
  console.log("registry empty — nothing to validate");
  process.exit(0);
}

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
  if (!/^\d+\.\d+\.\d+/.test(m.version ?? "")) err(dir, "bad version (semver)");
  if (!m.minOs) err(dir, "minOs required");
  if (!Array.isArray(m.arch) || !m.arch.length || m.arch.some((a) => !ARCHES.includes(a))) err(dir, "bad arch");
  if (!CATS.includes(m.category)) err(dir, "bad category");
  if (!m.package?.url?.startsWith("https://")) err(dir, "package.url must be https");
  if (!/^[0-9a-f]{64}$/.test(m.package?.sha256 ?? "")) err(dir, "sha256 must be 64 hex chars");
  if (!(m.package?.size > 0)) err(dir, "package.size must be > 0");
  if (!m.developer?.name) err(dir, "developer.name required");
  if (!m.media?.icon || !fs.existsSync(path.join(appDir, m.media.icon))) err(dir, "icon file missing");
  for (const s of m.media?.screenshots ?? []) {
    if (!fs.existsSync(path.join(appDir, s))) err(dir, `screenshot missing: ${s}`);
  }
}

if (errors.length) {
  console.error("❌ Registry invalid:\n" + errors.join("\n"));
  process.exit(1);
}
console.log("✅ Registry valid");
