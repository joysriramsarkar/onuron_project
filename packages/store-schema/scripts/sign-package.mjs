#!/usr/bin/env node
/**
 * sign-package.mjs — sign a store package with an Ed25519 private key.
 *
 * Usage:
 *   node scripts/sign-package.mjs <package-file> <private-key>
 *   node scripts/sign-package.mjs --generate-keypair
 *
 * <package-file>   Path to the package file (e.g. .nilax / .onp archive).
 * <private-key>    One of:
 *                    - path to a PEM (PKCS#8) private key file
 *                    - path to a file containing a base64 raw 32-byte key
 *                    - a literal base64 raw 32-byte key string
 *
 * Output: base64-encoded Ed25519 signature over the raw package bytes,
 * suitable for the `package.signature` field in a manifest.
 *
 * --generate-keypair prints a fresh keypair (base64 raw keys) as JSON so the
 * public half can be added to trusted-keys.json.
 */
import fs from "node:fs";
import crypto from "node:crypto";

const DER_PKCS8_PREFIX = Buffer.from("302e020100300506032b657004220420", "hex");

function usage() {
  console.error("usage: node scripts/sign-package.mjs <package-file> <private-key>");
  console.error("       node scripts/sign-package.mjs --generate-keypair");
}

const args = process.argv.slice(2);

if (args[0] === "--generate-keypair") {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
  const privRaw = privateKey.export({ format: "der", type: "pkcs8" }).subarray(-32);
  const pubRaw = publicKey.export({ format: "der", type: "spki" }).subarray(-32);
  console.log(JSON.stringify({ privateKey: privRaw.toString("base64"), publicKey: pubRaw.toString("base64") }, null, 2));
  process.exit(0);
}

const [file, keyArg] = args;
if (!file || !keyArg) {
  usage();
  process.exit(1);
}

let keyString = keyArg;
if (fs.existsSync(keyArg)) {
  keyString = fs.readFileSync(keyArg, "utf8").trim();
}

let privateKey;
if (keyString.includes("-----BEGIN")) {
  privateKey = crypto.createPrivateKey(keyString);
} else {
  const raw = Buffer.from(keyString, "base64");
  if (raw.length !== 32) {
    console.error(`error: raw Ed25519 private key must be 32 bytes, got ${raw.length}`);
    process.exit(1);
  }
  const der = Buffer.concat([DER_PKCS8_PREFIX, raw]);
  privateKey = crypto.createPrivateKey({ key: der, format: "der", type: "pkcs8" });
}

const data = fs.readFileSync(file);
const signature = crypto.sign(null, data, privateKey);
console.log(signature.toString("base64"));
