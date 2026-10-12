---
title: ডিবাগিং (LSP, DAP, DevTools)
description: nilsp ভাষা-সার্ভার, nildap ডিবাগ অ্যাডাপ্টার, রেকর্ড/রিপ্লে ও deterministic mode।
---

এমুলেটর NilLang অ্যাপ ডিবাগ করার জন্য বাস্তব LSP ও DAP সমর্থন এবং একটি
record/replay সিস্টেম দেয়।

---

## ১. Language Server (`nilsp`)

`nilsp` একটি স্ট্যান্ডার্ড LSP (Content-Length framed JSON over stdio)। `.nil`
ফাইলের জন্য এডিটর এটি চালাবে।

সমর্থিত ফিচার:

| ফিচার | অবস্থা |
|---|---|
| `textDocument/publishDiagnostics` | ✅ (অসামঞ্জস্যপূর্ণ brace/paren, মান ছাড়া `চল`, `()` ছাড়া `ফাংশন`) |
| `textDocument/completion` | ✅ (keyword, decorator, NilBus/print) |
| `textDocument/hover` | ✅ |
| `textDocument/documentSymbol` | ✅ (`@Component`, `ফাংশন`) |

একই লজিক Studio-র HTTP এন্ডপয়েন্ট `/api/lsp/{analyze,complete,hover}`-ও চালায়।

---

## ২. Debug Adapter (`nildap`)

`nildap` DAP বলে, তাই VS Code/Neovim ইত্যাদি attach করতে পারে।

```powershell
nildap                                                              # standalone mock
nildap --device <device-id> --app <app-id> --server http://127.0.0.1:8085
```

সমর্থিত request: `initialize`, `launch`/`attach`, `setBreakpoints`,
`configurationDone`, `threads`, `stackTrace`, `scopes`, `variables`, `continue`,
`next`, `stepIn`, `stepOut`, `pause`, `evaluate`, `disconnect`।

### আসল NilLang VM stepping

source-line stepping NilLang VM-এ নিজেই আছে (`compiler/vm/debug.go` + position table):

- compiler একটি **offset → file:line:column** টেবিল রেকর্ড করে;
- VM breakpoint, single-step, call stack, locals/globals/free variable ও name lookup দেয়;
- `nil dap <file.nil>` DAP সার্ভ করে।

`nildap` এটিকে front করে:

```powershell
nildap --nil-bin "C:\path\to\nil.exe" --program .\main.nil
# অথবা:
nildap --exec "nil dap .\main.nil"
```

> **সতর্কতা:** running emulator অ্যাপে attach করলে adapter শুধু এমুলেটরের যা আছে
> (session/device variable, saved state, worker frame) তা রিপোর্ট করে। এমুলেটরের
> built-in mock runtime কোনো bytecode line নেই — adapter **কখনো** লাইন বানিয়ে দেয় না।
> source-line stepping-এর জন্য আসল runtime-এ (`NIL_BIN`) চালান।

একই ডেটা HTTP-তেও:

```
GET  /api/v1/devices/{d}/apps/{a}/debug/stack
GET  /api/v1/devices/{d}/apps/{a}/debug/scopes
GET  /api/v1/devices/{d}/apps/{a}/debug/variables?ref=1
POST /api/v1/devices/{d}/apps/{a}/debug/breakpoints   {"source":"main.nil","lines":[4]}
POST /api/v1/devices/{d}/apps/{a}/debug/command       {"command":"next"}
GET  /api/v1/devices/{d}/apps/{a}/debug/evaluate?expr=count
```

---

## ৩. Record / replay

প্রতিটি input, IME ও HAL ইভেন্ট ধরে একটি বাগ হুবহু পুনরুৎপাদন করুন।

```powershell
nilctl record start --device <id> --app org.nilang.notes --name bug1
nilctl record stop --device <id>
nilctl recordings --device <id>
nilctl replay bug1 --device <id> --app org.nilang.notes          # real-time
nilctl replay bug1 --device <id> --app org.nilang.notes --instant # ASAP
```

রেকর্ডিং `~/.nilemu/devices/<id>/recordings/<name>.nilrec`-এ থাকে এবং test fixture
হিসেবেও কাজ করে।

---

## ৪. Deterministic mode

পুনরুৎপাদনযোগ্য স্ক্রিনশট ও CI-র জন্য:

```powershell
$env:NILEMU_CLOCK_ISO = "2026-10-07T10:00:00+06:00"
$env:NILEMU_CLOCK_FROZEN = "1"
$env:NILEMU_SEED = "42"
$env:NILEMU_ANIMATIONS = "off"
```

ভার্চুয়াল ঘড়ি থামে, RNG seed হয়, animation বন্ধ হয় — একই ক্রিয়ায় একই ফ্রেম।
`internal/render`-এ byte-for-byte golden test আছে
(`go test ./internal/render -run Golden -update`)।

---

## ৫. পরীক্ষা

```powershell
go test ./...          # unit + integration
go vet ./...
```

path traversal/symlink escape, bundle tamper, zip-slip, protocol handshake/timeout,
HAL fault injection, ESC/POS round-trip, PPM/QMP parsing, grapheme-cluster, record/replay,
LSP/DAP flow, device lifecycle এবং পূর্ণ HTTP end-to-end flow আবৃত।

---

## ৬. পরবর্তী পড়ুন

- [NilHost Protocol](/emulator/protocol/)
- [ভার্চুয়াল হার্ডওয়্যার](/emulator/hal/)
- রেফারেন্স: `nilos-emulator/docs/debug.md`
