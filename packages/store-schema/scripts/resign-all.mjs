#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const DER_PKCS8_PREFIX = Buffer.from("302e020100300506032b657004220420", "hex");

function findRoot(dir) {
  let d = dir;
  while (d !== path.dirname(d)) {
    if (fs.existsSync(path.join(d, "pnpm-workspace.yaml"))) return d;
    d = path.dirname(d);
  }
  throw new Error("monorepo root not found");
}

const monorepoRoot = findRoot(process.cwd());
const workspaceRoot = path.dirname(monorepoRoot);
const keyFile = process.env.ONURON_SIGNING_KEY_FILE || path.join(workspaceRoot, ".onuron-keys", "store-signing-key.json");

let rawPriv;
if (process.env.ONURON_SIGNING_PRIVATE_KEY) {
  rawPriv = Buffer.from(process.env.ONURON_SIGNING_PRIVATE_KEY, "base64");
} else {
  if (!fs.existsSync(keyFile)) {
    console.error("Set ONURON_SIGNING_PRIVATE_KEY or provide store-signing-key.json at " + keyFile);
    process.exit(1);
  }
  const keyData = JSON.parse(fs.readFileSync(keyFile, "utf8"));
  rawPriv = Buffer.from(keyData.privateKey, "base64");
}
const der = Buffer.concat([DER_PKCS8_PREFIX, rawPriv]);
const privateKey = crypto.createPrivateKey({ key: der, format: "der", type: "pkcs8" });

const REG = path.join(monorepoRoot, "apps/store/public/registry/apps");
const STORE_PUBLIC = path.join(monorepoRoot, "apps/store/public");

for (const dir of fs.readdirSync(REG)) {
  const mFile = path.join(REG, dir, "manifest.json");
  if (!fs.existsSync(mFile)) continue;

  const m = JSON.parse(fs.readFileSync(mFile, "utf8"));
  if (!m.package || !m.package.path) continue;

  const pkgPath = path.join(STORE_PUBLIC, m.package.path);
  if (!fs.existsSync(pkgPath)) {
    console.error(`missing package: ${pkgPath}`);
    continue;
  }

  const pkgBytes = fs.readFileSync(pkgPath);
  const size = pkgBytes.length;
  const sha256 = crypto.createHash("sha256").update(pkgBytes).digest("hex");
  const signature = crypto.sign(null, pkgBytes, privateKey).toString("base64");

  m.package.size = size;
  m.package.sha256 = sha256;
  m.package.signature = signature;
  m.package.signer = "onuron-team";

  fs.writeFileSync(mFile, JSON.stringify(m, null, 2) + "\n", "utf8");
  console.log(`✅ Resigned ${m.id} (${size} bytes, sha256: ${sha256.slice(0, 16)}...)`);
}

console.log("All packages resigned successfully!");
