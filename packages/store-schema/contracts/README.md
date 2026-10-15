# Contract mirror

These files are a **mirror** of `nilLang/contracts` — the ecosystem contract
bundle. They are not maintained here.

NilLang owns the capability vocabulary, the `.nilax` package format, the runtime
ABI and the compatibility matrix (ADR-0003, ADR-0004, ADR-0008). This store
enforces those rules; it does not define them. A permission name listed here is
a name the language actually declares, because the file it came from says so.

## Why a mirror and not a copy someone edited

A store-local list of permission names is a second answer to "is `storage.read`
a real capability". Two answers eventually disagree, and the one that disagrees
last is the one that ships a package granting something the language will refuse
at run time. So the mirror is checksummed against the upstream bundle's own index
and pinned in `contracts.lock.json`.

## Updating

```sh
node scripts/sync-contracts.mjs --from ../../../nilLang/contracts
node scripts/sync-contracts.mjs --check      # what CI runs
```

`--check` fails when the mirror is missing, when a file's bytes disagree with the
checksum in the bundle index, or when `contracts.lock.json` pins a different
bundle version than the mirror holds.

Run `--check` in CI. A store that cannot verify the contract it gates on refuses
every package rather than checking nothing — "checked nothing" and "checked and
found nothing" look identical in the output that gates a release.

## What the store enforces from it

- every capability in `manifest.permissions` and in the packed `.nilax` manifest
  must be in `capabilities/vocabulary.json` (aliases normalised: `GPS` is
  `location`, `File-System` is `filesystem`);
- a capability listed twice under two spellings is an error, because one
  capability with two sources of truth is not one source of truth;
- a packed manifest target must be declared in `abi/runtime-abi.json` and must be
  `stable` — an experimental target is not a publishable target.

## Known divergence

The signing scheme this store implements (`package.signature`: base64 Ed25519
over the raw package bytes, signer named in `trusted-keys.json`) is **not** the
scheme NilLang's `contracts/signing/signing.json` specifies (hex Ed25519 over a
`{checksum, timestamp, key_id}` payload, key id derived from the public key).

That is recorded as `signing-store-scheme` in the contract's `known_divergences`
and is open. Until it is resolved, no verifier may claim to verify "the" Onuron
signature — a verifier states which scheme it implements. Do not try to make the
two agree by editing one of them: six packages are published under the store
scheme, and the reconciliation is a coordinated release, not a patch.