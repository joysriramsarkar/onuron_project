# Ecosystem Maturity Map

**Last Updated:** 2026-10-12

---

## Overview

This document maps all repositories in the NilLang/Onuron ecosystem, their
maturity levels, and their relationships.

---

## Maturity Levels

| Level | Description |
|-------|-------------|
| **Production** | Stable, well-tested, ready for real applications |
| **Functional Prototype** | Core features work, but incomplete; not production-ready |
| **Experimental** | Early development; features may change or be removed |
| **Stub** | Placeholder or minimal implementation; not functional |

---

## Repository Map

### 1. nilLang (Go)

| Attribute | Value |
|-----------|-------|
| **Maturity** | Production |
| **Language** | Go |
| **Purpose** | Canonical NilLang language implementation |

**What Works:**
- ✅ 3 execution engines (evaluator, VM, AOT/LLVM)
- ✅ Full type checker with diagnostics
- ✅ Complete standard library
- ✅ Cross-engine conformance tests (200+ cases)
- ✅ WASM target
- ✅ Mobile runtime (Android, iOS, HarmonyOS)
- ✅ Package manager (nilpkg)
- ✅ LSP server
- ✅ Alap UI framework (`pkg/alap/ui`)
- ✅ Reactive signals and state management
- ✅ Capabilities system (`requires`, `pure`, `unsafe`)
- ✅ Structs, enums, traits, generics
- ✅ Error handling (`Result<T,E>`, `?T`)
- ✅ Concurrency (`async`/`await`, `task`, channels)

**What's Stubbed:**
- ❌ `try`/`catch` error handling
- ❌ Generic traits (partially implemented)
- ❌ Compile-time effect checking beyond `pure`

**Planned:**
- AST → typed HIR → MIR as the only backend path
- Static methods (`Type::new()`)
- Full effect system

---

### 2. onuronOS

| Attribute | Value |
|-----------|-------|
| **Maturity** | Functional Prototype |
| **Language** | Rust, Go, C |
| **Purpose** | Linux-based mobile operating system |

**What Works:**
- ✅ QEMU-based development environment
- ✅ nilinit (PID 1 / service supervision)
- ✅ NilHAL (hardware abstraction boundary)
- ✅ runtime/nillang (NilLang runtime — see below)
- ✅ .nilax package format
- ✅ nilpkg package manager
- ✅ SoftBus distributed layer
- ✅ SELinux + seccomp + namespaces sandboxing

**What's Stubbed:**
- ⚠️ runtime/nillang — parser + JSON bytecode + basic VM only
- ❌ Real hardware support (QEMU only)
- ❌ DRM/KMS, touch, storage, power, networking
- ❌ Audio backend
- ❌ GPU backend
- ❌ Camera/media infrastructure

**Planned:**
- Reference hardware bring-up
- One native app end-to-end
- DRM/KMS, touch, storage, power, networking
- Android compatibility layer

---

### 3. runtime/nillang (Rust)

| Attribute | Value |
|-----------|-------|
| **Maturity** | Functional Prototype |
| **Language** | Rust |
| **Purpose** | Native NilLang runtime for Onuron OS |

**What Works:**
- ✅ Parser for basic NilLang syntax
- ✅ JSON bytecode serialization
- ✅ Basic VM for app/state management
- ✅ Struct and app definitions
- ✅ State get/set operations
- ✅ Scene rendering (XML strings)
- ✅ Event dispatch (hardcoded patterns)

**What's Stubbed:**
- ❌ Expression evaluation
- ❌ Control flow execution
- ❌ Function calls
- ❌ Error handling
- ❌ Standard library
- ❌ Traits, enums, modules
- ❌ Multi-app support
- ❌ Real rendering pipeline

**Note:** This is NOT a drop-in replacement for nilLang. It runs a subset of
NilLang syntax focused on UI app definitions.

---

### 4. alap-framework (Go)

| Attribute | Value |
|-----------|-------|
| **Maturity** | Experimental |
| **Language** | Go |
| **Purpose** | Early-alpha Alap UI framework prototype |

**What Works:**
- ✅ Basic compiler (lexer, parser, AST)
- ✅ Basic VM (NABC bytecode)
- ✅ UI engine (layout, render, state, animation, widgets)
- ✅ Platform adapters (Android, iOS, Linux, Onuron)
- ✅ Web server (HTTP, WebSocket, SSE, SSR, middleware)
- ✅ ORM and migrations
- ✅ Package manager (NilPM)
- ✅ LSP server

**What's Stubbed:**
- ❌ Type checker
- ❌ Error handling
- ❌ Concurrency
- ❌ Capabilities
- ❌ Limited standard library

**Note:** This is NOT the canonical implementation. nilLang is. See
`alap-framework/RELATIONSHIP.md` for details.

**Planned:**
- Import nilLang packages instead of separate compiler/VM
- Merge into nilLang as UI framework packages

---

### 5. nilos-emulator (Go)

| Attribute | Value |
|-----------|-------|
| **Maturity** | Functional Prototype |
| **Language** | Go |
| **Purpose** | Development tool with MockVM for NilLang apps |

**What Works:**
- ✅ Emulator with MockVM
- ✅ NilHost Protocol implementation
- ✅ UI tree patching
- ✅ HAL emulation
- ✅ Lifecycle management
- ✅ DAP (Debug Adapter Protocol)
- ✅ LSP server
- ✅ VFS (virtual file system)
- ✅ QEMU bridge
- ✅ Device profiles (phone, tablet, desktop, POS)
- ✅ Recording and playback
- ✅ Sandbox with limits

**What's Stubbed:**
- ❌ Real hardware emulation
- ❌ Full GPU acceleration
- ❌ Real camera/sensors

**Planned:**
- More device profiles
- Better performance
- Full hardware emulation

---

### 6. terminal

| Attribute | Value |
|-----------|-------|
| **Maturity** | Stub |
| **Language** | — |
| **Purpose** | Terminal application |

**What Works:**
- ❌ Not yet implemented

**Planned:**
- Terminal emulator for Onuron OS
- Integration with nilshell

---

### 7. onuron_project

| Attribute | Value |
|-----------|-------|
| **Maturity** | Functional Prototype |
| **Language** | TypeScript, Astro |
| **Purpose** | Web presence and documentation |

**What Works:**
- ✅ Documentation site (Astro/Starlight)
- ✅ App store frontend
- ✅ UI component library
- ✅ Store schema

**What's Stubbed:**
- ❌ Backend services
- ❌ Real app submissions
- ❌ Payment processing

**Planned:**
- Full app store backend
- Developer portal
- Community features

---

## Relationship Diagram

```text
                    ┌─────────────────┐
                    │   nilLang (Go)  │
                    │   Production    │
                    │   Canonical     │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │  onuronOS   │  │alap-framework│  │nilos-emulator│
    │  Functional │  │ Experimental │  │  Functional  │
    │  Prototype  │  │  Early-alpha │  │  Prototype   │
    └──────┬──────┘  └─────────────┘  └─────────────┘
           │
           ▼
    ┌─────────────┐
    │runtime/     │
    │nillang(Rust)│
    │  Prototype  │
    └─────────────┘
```

---

## Summary Table

| Repository | Maturity | Language | Purpose |
|------------|----------|----------|---------|
| nilLang | Production | Go | Canonical language implementation |
| onuronOS | Functional Prototype | Rust/Go/C | Mobile operating system |
| runtime/nillang | Functional Prototype | Rust | Native NilLang runtime |
| alap-framework | Experimental | Go | Early-alpha UI framework |
| nilos-emulator | Functional Prototype | Go | Development emulator |
| terminal | Stub | — | Terminal application |
| onuron_project | Functional Prototype | TypeScript | Web presence |

---

## Key Decisions

1. **nilLang is the canonical implementation** — all other implementations
   should target compatibility with it
2. **alap-framework should import nilLang** — not maintain a separate compiler/VM
3. **runtime/nillang is a subset** — not a drop-in replacement for nilLang
4. **nilos-emulator uses MockVM** — for development only, not production

---

## References

- [nilLang Repository](../nilLang/)
- [nilLang Language Specification](../nilLang/docs/spec/LANGUAGE_SPEC.md)
- [nilLang Canonical Spec](../nilLang/docs/spec/LANGUAGE_SPEC_CANONICAL.md)
- [OnuronOS Project](../onuronOS/)
- [Alap Framework](../alap-framework/)
- [Alap Relationship](../alap-framework/RELATIONSHIP.md)
- [nilos-emulator](../nilos-emulator/)
