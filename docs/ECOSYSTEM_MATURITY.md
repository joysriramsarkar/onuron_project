# Ecosystem Maturity Map

**Last Updated:** 2026-10-12
**Status:** Single source of truth for component maturity across the
nilLang / Onuron ecosystem.

---

## How to read this map

Every component is classified honestly and backed by **Evidence** (a concrete
source file and the test or workflow that exercises it). "A directory exists"
is **not** evidence of maturity.

| Field | Meaning |
|-------|---------|
| **Implementation status** | `Production`, `Functional Prototype`, `Experimental`, `Stub / Simulated`, or `Not Implemented` |
| **Evidence** | Specific source path + the passing test / CI workflow that exercises it |
| **Limitations** | What does **not** work yet |
| **Hardware validation** | `QEMU`, `host-only`, or `physical-device tested` |
| **Release gate** | The checks that must pass before a release |

### Maturity levels

| Level | Description |
|-------|-------------|
| **Production** | Stable, well-tested, ready for real applications |
| **Functional Prototype** | Core paths work and are tested, but the component is incomplete |
| **Experimental** | Early development; interfaces and features may change |
| **Stub / Simulated** | Placeholder or clearly-labelled simulated behaviour |
| **Not Implemented** | Component does not exist yet |

### Hardware-validation levels

| Level | Meaning |
|-------|---------|
| **Host-only** | Runs on a developer machine; no OS image |
| **QEMU** | Verified on our QEMU reference targets |
| **Physical-device tested** | Verified on real hardware with reproducible evidence |

> **No component is currently `physical-device tested`.** Onuron OS is developed
> against QEMU. See `onuronOS/docs/reference-board.md` for the bring-up path.

---

## Component status

### 1. nilLang (Go) — canonical language

| Field | Value |
|-------|-------|
| **Implementation status** | Production |
| **Language** | Go |
| **Role** | Canonical NilLang implementation; the authority other runtimes target |
| **Evidence** | Cross-engine conformance suite `nilLang/tests/crossruntime/crossruntime_test.go` (evaluator + bytecode VM, 21 programs); capability fix + tests `nilLang/pkg/capability/capability_test.go`; canonical spec `nilLang/docs/spec/LANGUAGE_SPEC_CANONICAL.md`; CI green on `693da64` |
| **Limitations** | The automated conformance suite covers the two **Go** engines. The Rust subset and Alap are **not** automatically compared yet (manual verification only). Some features (`try`/`catch`, generic traits, full effect checking) remain incomplete |
| **Hardware validation** | Host-only (plus WASM target) |
| **Release gate** | CI + Lint green; cross-engine conformance passes; canonical spec updated with any contract change |

### 2. onuronOS — operating system

| Field | Value |
|-------|-------|
| **Implementation status** | Functional Prototype |
| **Language** | Rust, Go, C |
| **Role** | Independent Linux-based mobile OS (nilinit → NilHAL → nilrt → NilLang/Alap/NilUI) |
| **Evidence** | Two-phase QEMU persistence test `onuronOS/build/qemu-persistence-test.py` (write `/data` → reboot same disk → read back, byte-exact), green in Linux/QEMU CI; app lifecycle `runtime/nilrt/tests/lifecycle.rs`; permission policy `runtime/nilrt/src/permissions.rs`; signed updates `services/nilupd`; shell `/proc`,`/sys` + honest not-detected reporting `shell/` (`cargo test -p nilshell` 28 passed); simulated-screen registry `shell/src/simulated.rs` + `docs/maturity.toml` + `build/gen-maturity.py` |
| **Limitations** | Recovery boot flow and IPC authorization are not yet fully exercised under injected failure; package rollback across a simulated power cut is partially covered; GPU/audio/camera have no real backend (honestly reported as not detected); no physical device |
| **Hardware validation** | QEMU x86_64 (primary) and aarch64 `-M virt` (secondary) |
| **Release gate** | `linux-qemu.yml` (x86_64 + aarch64), `security-audit.yml`, `code-quality.yml` (maturity drift check) all green; QEMU boot **and** persistence must pass |

### 3. runtime/nillang (Rust) — native NilLang subset

| Field | Value |
|-------|-------|
| **Implementation status** | Functional Prototype (deliberate subset) |
| **Language** | Rust |
| **Role** | Native NilLang runtime for UI-app definitions inside Onuron OS |
| **Evidence** | Parser + JSON bytecode serialization + basic VM + struct/app/state/scene handling (`onuronOS/runtime/nillang/`) |
| **Limitations** | **Not** a drop-in replacement for nilLang. No general expression evaluation, control flow, function calls, standard library, error handling, traits/enums/modules, multi-app support, or real render pipeline. Verified **manually** against the subset |
| **Hardware validation** | QEMU |
| **Release gate** | The supported subset must pass a **feature-tagged** conformance run against the canonical expected output (tracked in Roadmap Phase B) |

### 4. alap-framework (Go) — UI framework

| Field | Value |
|-------|-------|
| **Implementation status** | Experimental (early-alpha) |
| **Language** | Go |
| **Role** | Independent UI framework prototype; **not** the canonical implementation |
| **Evidence** | Compiler (lexer/parser/AST) + NABC VM + UI engine + platform adapters + web server + ORM + NilPM; relationship documented in `alap-framework/RELATIONSHIP.md`; CI green |
| **Limitations** | No type checker, error handling, concurrency, or capability system; limited standard library. Maintains its **own** compiler/VM today, which must converge on canonical nilLang |
| **Hardware validation** | Host-only |
| **Release gate** | CI green **and** the nilLang-integration path (Roadmap Phase B) must run the shared example apps |

### 5. nilos-emulator (Go) — development emulator

| Field | Value |
|-------|-------|
| **Implementation status** | Functional Prototype |
| **Language** | Go |
| **Role** | Development tool; runs NilLang apps against a MockVM |
| **Evidence** | MockVM + NilHost protocol + UI tree patching + lifecycle + DAP/LSP + VFS + sandbox; cross-platform sandbox/VFS containment tests `internal/vfs/vfs_test.go`, `internal/sandbox/guard.go`; CI green on ubuntu + windows + macos |
| **Limitations** | No real hardware emulation and no full GPU path; uses MockVM, so it is **not** a production runtime |
| **Hardware validation** | Host-only |
| **Release gate** | CI green on all three OSes; must run the canonical-compiler-built reference app (Roadmap Phase D) |

### 6. onuron_project — store, docs, ecosystem meta

| Field | Value |
|-------|-------|
| **Implementation status** | Functional Prototype |
| **Language** | TypeScript, Astro |
| **Role** | Web presence, documentation, and App Store registry/gate |
| **Evidence** | Store validator `packages/store-schema/scripts/validate.mjs` (`validate` + `validate:verify`), signing helper `scripts/sign-package.mjs`, trusted key `trusted-keys.json`, signed packages under `apps/store/public/packages/`, reproducible sources under `apps/store/registry-src/`, gate `onuron_project/.github/workflows/app-registry-gate.yml` |
| **Limitations** | Published apps are **Reference / Developer Preview** (`releaseStage: "reference"`) — logic demos, not finished interactive apps. No store backend, real submissions, or payments |
| **Hardware validation** | N/A (host tooling) |
| **Release gate** | `validate:verify` must pass: mandatory signature/signer, exact bytes (size + SHA-256), Ed25519 verification against `trusted-keys.json`, and archive↔manifest id/version/entry/permissions match |

### 7. Terminal

| Field | Value |
|-------|-------|
| **Implementation status** | Functional Prototype (reference-level) |
| **Language** | Rust (part of Onuron OS) |
| **Role** | Terminal shipped inside **`nilshell`** |
| **Evidence** | `onuronOS/shell/` command dispatch + `cargo test -p nilshell` (28 passed) |
| **Limitations** | **There is no separate terminal repository.** It is a reference-level shell, not yet a full terminal emulator with complete capability/permission enforcement and error reporting |
| **Hardware validation** | QEMU |
| **Release gate** | Included in the `onuronOS` release gate |

---

## Relationship diagram

```text
                    ┌─────────────────┐
                    │   nilLang (Go)  │  ← canonical
                    │   Production    │
                    └────────┬────────┘
                             │  (others target compatibility)
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
  │  onuronOS   │    │alap-framework│    │nilos-emulator│
  │ Functional  │    │ Experimental │    │  Functional  │
  │ Prototype   │    │  Early-alpha │    │  Prototype   │
  └──────┬──────┘    └─────────────┘    └─────────────┘
         │
         ▼
  ┌──────────────────┐
  │ runtime/nillang  │  ← Rust subset, embedded in OS
  │     (subset)     │
  └──────────────────┘
         │
         ▼
  ┌─────────────┐
  │ nilshell    │  ← terminal lives here (no separate repo)
  │  (in-OS)    │
  └─────────────┘
```

---

## Summary table

| Component | Status | Language | Hardware validation |
|-----------|--------|----------|---------------------|
| nilLang | Production | Go | Host-only |
| onuronOS | Functional Prototype | Rust/Go/C | QEMU (x86_64 + aarch64) |
| runtime/nillang | Functional Prototype (subset) | Rust | QEMU |
| alap-framework | Experimental | Go | Host-only |
| nilos-emulator | Functional Prototype | Go | Host-only |
| onuron_project | Functional Prototype | TypeScript | N/A |
| Terminal (in `nilshell`) | Functional Prototype | Rust | QEMU |

---

## Key decisions

1. **nilLang (Go) is the canonical implementation** — all other runtimes target
   compatibility with it.
2. **runtime/nillang is a deliberate subset**, not a drop-in replacement. It is
   grown only to run a specific, testable UI-app subset.
3. **alap-framework converges on nilLang** — stop growing its separate
   compiler/VM; integrate the canonical compiler and runtime step by step.
4. **nilos-emulator uses MockVM** — development only, not a production runtime.
5. **Published store apps are Reference / Developer Preview** until a single app
   passes the full end-to-end release gate.
6. **Every published package is signed**; the gate never treats an unavailable
   remote package as success.

---

## References

- [Roadmap & release gates](./ROADMAP.md)
- [Licensing policy](./LICENSING.md)
- [nilLang](../nilLang/)
- [nilLang Canonical Spec](../nilLang/docs/spec/LANGUAGE_SPEC_CANONICAL.md)
- [Onuron OS Project](../onuronOS/)
- [Onuron OS improvement plan](../onuronOS/docs/improvement-plan.md)
- [Onuron OS reference board](../onuronOS/docs/reference-board.md)
- [Alap Framework](../alap-framework/)
- [Alap Relationship](../alap-framework/RELATIONSHIP.md)
- [nilos-emulator](../nilos-emulator/)
