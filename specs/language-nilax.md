# `.nilax` বান্ডিল + সাইনিং — স্পেক v1 (13 Oct 2026)

> Canonical impl: `../../nilLang/pkg/bundle/` (`builder.go`, `manifest.go`, `reader.go`) + `../../nilLang/pkg/signing/`। TS-পক্ষে manifest shape: `../packages/store-schema/`।
> নিয়ম: ফরম্যাট বদলালে impl + এই স্পেক + conformance ফিক্সচার একসাথে বদলাবে।

## 1. কনটেইনার
- **zip** archive (`.nilax` extension)। Deterministic build: `reproducible_test.go` সবুজ থাকতে হবে (timestamps/sort-order স্থির)।

## 2. আবশ্যক এন্ট্রি
| পাথ | বিষয়বস্তু |
|---|---|
| `manifest.json` | App metadata: `id` (e.g. `org.onuron.pos`), `name`, `version` (semver), `entry` (bytecode entry), `permissions`/`capabilities`, `files[]` (sha256 + size প্রতি ফাইল) |
| `bytecode/main.nabc` (বা manifest-এর `entry`) | Self-contained bytecode — import compile-time-এ inline (VM parity: `nilLang/pkg/compiler/import_parity_test.go`) |
| `signature.ed25519` | Ed25519 signature — **ঠিক কী সাইন হয়**: `manifest.json`-এর canonical bytes + প্রতিটি listed ফাইলের sha256 (zip metadata নয়)। `timestamp` field সহ (`PackageSignature.timestamp`; legacy `.sig` fallback আছে)। |

## 3. যাচাই (verify) নিয়ম
1. zip-slip-safe extraction (path traversal: `..`, symlink, UNC reject — emulator `internal/vfs` + `internal/packages` একই নিয়ম মানে)।
2. প্রতিটি ফাইলের sha256 `manifest.json`-এর সাথে মিলতে হবে।
3. `signature.ed25519` যাচাই: public key **keystore থেকে, password ছাড়া** (`GetPublicKey(keyID)`); `nilkey verify` শুধু print নয়, সত্যিকারের checksum + Ed25519 verify করে।
4. Keystore-এ একাধিক key থাকলে `-key=<key-id>` বাধ্যতামূলক (map random-order bug-এর শিক্ষা: `9f8994c`)।

## 4. Conformance
- `nilLang`: `pkg/bundle/*_test.go` (incl. `reproducible_test.go`), `pkg/signing/*_test.go` (round-trip, wrong-password, tamper)।
- Emulator: `internal/packages` tests (zip-slip cases)।
- Store: `pnpm validate` (`packages/store-schema`) + feed-এ প্রতিটি প্যাকেজের sha256/size/signature।
