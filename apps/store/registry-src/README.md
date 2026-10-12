# Store app sources

These are the **reference NilLang sources** for the apps published in the Onuron
Store registry (`apps/store/public/registry/apps/`). They are kept here so every
published package is reproducible from source, not just an opaque binary blob.

> These apps are **Reference Apps / Developer Preview**. Their manifests carry
> `"releaseStage": "reference"`. They demonstrate the platform end to end
> (package format, signing, install, launch) rather than shipping as finished
> products. A single one of them (e.g. Calculator or Notes) is meant to be
> raised to a truly interactive, persistent reference app first; the rest
> follow the same pattern afterwards.

Layout mirrors a standard NilLang project:

```
registry-src/org.onuron.<app>/
  nil.json        # project manifest (name, version, entry, capabilities)
  src/main.nil    # application source
```

## Rebuilding a package

From the repository root:

```sh
# 1. Build the universal .nilax bundle with the nilLang toolchain.
#    (Requires the `nil` CLI from the nilLang repository.)
cd apps/store/registry-src/org.onuron.calculator
nil build                     # -> build/org.onuron.calculator-1.0.0.nilax

# 2. Copy the bundle into the served packages directory.
cp build/org.onuron.calculator-1.0.0.nilax \
   ../../public/packages/org.onuron.calculator-1.0.0.nilax

# 3. Compute the real size + SHA-256 and update the manifest's `package` block.
#    Then re-sign (see below) and run the gate:
pnpm --filter @onuron/store-schema validate:verify
```

## Signing

Packages are signed with an Ed25519 key. The **public** half lives in
`packages/store-schema/trusted-keys.json`; the **private** half MUST live in a
secret manager — never in this repository.

```sh
# One-time: generate a keypair, add the public half to trusted-keys.json.
node packages/store-schema/scripts/sign-package.mjs --generate-keypair

# Sign a built package (private key as a base64 raw key or a PEM path).
node packages/store-schema/scripts/sign-package.mjs \
  apps/store/public/packages/org.onuron.calculator-1.0.0.nilax \
  "$ONURON_STORE_SIGNING_KEY"
```

Paste the printed signature into the manifest as `package.signature` and set
`package.signer` to the key id from `trusted-keys.json`.

## Verification

```sh
pnpm --filter @onuron/store-schema validate          # schema + format checks
pnpm --filter @onuron/store-schema validate:verify   # + size, SHA-256, signature, archive
```

`validate:verify` reads each package from its committed `package.path` (inside
`apps/store/public`), so it verifies the exact bytes that will be served without
depending on the CDN being deployed. The release gate is strict:

- `package.signature` and `package.signer` are **mandatory**. An unsigned entry
  fails validation.
- The archive is opened and its packed `manifest.json` is compared with the
  published manifest: id, version, entry point and permissions must match.
- When `package.path` is absent the package is downloaded from `package.url`.
  An unreachable URL or a non-2xx response is a **failure**, not a skip — a
  published remote package must be downloadable and verifiable.
