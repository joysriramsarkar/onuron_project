# Roadmap & Release Gates

**Last Updated:** 2026-10-12
**Companion to:** [Ecosystem Maturity Map](./ECOSYSTEM_MATURITY.md)

This roadmap replaces feature wish-lists with **verifiable phases**. Each phase
finishes with evidence (a passing test or workflow) that the next phase depends
on. If a phase's gate is skipped or failed, the next phase does not start.

> **Guiding rule:** a phase is done when its acceptance criteria **pass in CI**,
> not when the code exists. "It compiles" and "a directory exists" are not done.

---

## Phase A — Release scope & stability

**Goal:** freeze the `0.1` core and make regression detection automatic.

Acceptance criteria:
- [ ] nilLang `0.1` core is frozen; no new syntax lands without a spec change.
- [ ] Each of onuronOS, nilos-emulator, and onuron_project has its **own**
      written acceptance criteria (this document + per-repo docs).
- [ ] Every behaviour already proven by CI is kept in a **regression gate**:
      - nilLang: cross-engine conformance (`tests/crossruntime/`), capability tests
      - onuronOS: QEMU boot + persistence, `cargo test -p nilshell`, maturity drift check
      - nilos-emulator: `go vet` + `go test ./...` on ubuntu/windows/macos
      - onuron_project: store `validate` + `validate:verify`
- [ ] Bug fixes, tests, and documentation take priority over new features.

---

## Phase B — Canonical NilLang contract

**Goal:** a single, versioned language contract, and feature-tagged proof that
each runtime implements exactly the subset it claims.

Acceptance criteria:
- [ ] The 21 cross-engine conformance programs continue to pass (evaluator + VM).
- [ ] Every conformance program is **feature-tagged** (e.g. `core`,
      `control-flow`, `functions`, `stdlib`, `errors`) so a runtime can be run
      against only the tags it claims.
- [ ] `runtime/nillang` (Rust) passes the **UI-app subset** tags against the
      same expected output as the Go engines — automatically, not manually.
- [ ] Alap's supported features are tagged and run through the **same** harness.
- [ ] A stable `.nilax` / bytecode version is declared, plus a runtime
      compatibility contract (which bytecode version each runtime accepts).
- [ ] Alap begins importing canonical nilLang compiler/runtime packages (see
      `alap-framework/RELATIONSHIP.md`); its Go toolchain matches nilLang's.

---

## Phase C — One true native app

**Goal:** raise exactly one reference app (proposed: **Calculator**, then
**Notes**) from a logic demo to a genuinely interactive, persistent app, and
prove the whole path from source to data survival.

Acceptance criteria for the chosen app:
- [ ] Real UI: user input, live display, and correct error handling.
- [ ] Built from source with the canonical `nil` toolchain.
- [ ] Package created, size + SHA-256 computed, **signed**, and verified.
- [ ] Archive↔manifest consistency passes (id, version, entry, permissions).
- [ ] Installed, launched, and operated end-to-end.
- [ ] Persistent storage: data survives a process restart (Notes especially).
- [ ] The same app runs with the same behaviour in the emulator and on Onuron OS.

Only after this app's stable path exists do the other reference apps follow the
same pattern.

---

## Phase D — OS & emulator integration

**Goal:** mandatory OS-level integration tests, using the Phase C app — not a
mock.

Acceptance criteria:
- [ ] QEMU boot, disk persistence, and **recovery** are all in the release gate:
      `onuron.recovery=1` enters recovery; consecutive failed boots enter
      recovery automatically; a corrupt `/data` produces a clear error.
- [ ] The app **installs** through `nilpkg`, **launches** through `nilrt`, and
      its declared **permissions are enforced** (denied access is denied).
- [ ] A failed/upgraded package **rolls back** to the previous version, with the
      previous version restored and its data intact.
- [ ] A package with a corrupt or untrusted signature is **rejected**.
- [ ] nilos-emulator runs the **canonical-compiler-built** Phase C app and
      produces the same observable behaviour as the OS — no MockVM-only output
      counts as proof.

---

## Phase E — Release readiness

**Goal:** one combined gate that must be green before a release is "ready".

The release gate consists of:
- [ ] Linux, Windows, and macOS CI (per component as applicable).
- [ ] onuronOS QEMU x86_64 **and** aarch64 boot + persistence + recovery.
- [ ] Mandatory package signature validation (`validate:verify`).
- [ ] Archive integrity + archive↔manifest id/version/entry/permissions match.
- [ ] A licence audit consistent with [LICENSING.md](./LICENSING.md).
- [ ] A multi-component integration test (app runs on emulator **and** OS).

A release is **not ready** if any critical test is skipped or failed.

---

## The next three tasks (current priority)

1. **One true native reference app.** Start with **Calculator** (or Notes):
   small enough to exercise UI, state, input, signing, app lifecycle, and
   persistent storage together. → Phase C.
2. **Automate cross-runtime conformance.** The two Go engines already have a
   solid base; now prove the OS Rust subset's supported features, and bring Alap
   onto the canonical implementation step by step. → Phase B.
3. **Close the OS release gates and documentation together.** QEMU persistence
   is now proven and reflected in the docs; next finish recovery, IPC
   authorization, package rollback, and the security-audit policy with concrete
   acceptance criteria. → Phases D and E.

Adding new OS utilities, new language syntax, more store listings, or more UI
animation before these are done grows the project without a matching increase in
reliability.
