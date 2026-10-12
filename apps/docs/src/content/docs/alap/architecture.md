---
title: alap-framework আর্কিটেকচার
description: alap-framework-এর কম্পাইল পাইপলাইন, প্যাকেজ মানচিত্র এবং canonical nilLang-এর সাথে সম্পর্ক।
---

**alap-framework** একটি ক্রস-প্ল্যাটফর্ম ডিক্লেয়ারেটিভ UI ও অ্যাপ্লিকেশন
ফ্রেমওয়ার্ক। এটি অনুরণ ইকোসিস্টেমের একটি **আর্লি-আলফা (early-alpha) প্রোটোটাইপ**।

> **গুরুত্বপূর্ণ — canonical সম্পর্ক:** ভাষার ক্যানোনিক্যাল বাস্তবায়ন **`nilLang`
> (Go)**। alap-এর নিজস্ব কম্পাইলার/VM **canonical নয়**। পরিকল্পনা হলো ধাপে ধাপে
> canonical nilLang-এর দিকে অভিসৃত (converge) হওয়া, আর alap-এর নিজস্ব মূল্য
> (UI ইঞ্জিন, প্ল্যাটফর্ম অ্যাডাপ্টার, ওয়েব সার্ভার, ORM, প্যাকেজ ম্যানেজার) ধরে রাখা।
> বিস্তারিত: [nil কম্প্যাটিবিলিটি](/nil/compatibility/) এবং
> [কম্পাইল পাইপলাইন নথি](https://github.com/joysriramsarkar/alap-framework/blob/main/docs/ARCHITECTURE.md)।

---

## ১. কম্পাইল পাইপলাইন

```text
source.nil
  │
  ▼  compiler/lexer      → []Token
  ▼  compiler/parser     → *ast.Program
  ▼  compiler/types      → diagnostics (alpha: non-fatal)
  ▼  compiler/codegen    → *codegen.Module  (NABC bytecode)
  ▼  codegen.Serialize   → []byte           (portable .nabc)
  ▼  runtime/vm          → program output + *engine.UITree
```

| প্যাকেজ | দায়িত্ব | এন্ট্রি পয়েন্ট |
|---|---|---|
| `compiler/lexer` | সোর্স → টোকেন | `lexer.New(file, src).Tokenize()` |
| `compiler/parser` | টোকেন → AST | `parser.New(file, tokens).Parse()` |
| `compiler/types` | স্ট্যাটিক টাইপ চেক | `types.New().CheckProgram(prog)` |
| `compiler/codegen` | NABC বাইটকোড এমিট | `codegen.New(name).GenerateProgram(prog)` |
| `runtime/vm` | NABC এক্সিকিউশন | `vm.New(module).Run()` |

`runtime/nilrt` উপরের সবকিছু একটি কলে যুক্ত করে (`Engine.ExecuteFullPipeline`),
যা bytecode, UI tree, draw command ও timing ফেরায়।

---

## ২. NABC বাইটকোড

`compiler/codegen` **N**ilLang **A**pplication **B**yte**C**ode ফরম্যাট নির্ধারণ করে:

- `Opcode` — `byte` এনাম (`OP_ADD`, `OP_JUMP`, `OP_UI_CREATE`, …)
- `Instruction` — `{ Op Opcode; Operand int32 }`
- `Constant` — tagged constant (`ConstInt`, `ConstFloat`, `ConstString`, `ConstBool`, `ConstNull`)
- `Function` — name, param/local counts, `[]Instruction`, constant pool
- `Module` — name, `[]*Function`, globals, `MainFunc`

`Serialize(mod)` একটি compact little-endian বাফার তৈরি করে, যার শুরুতে ম্যাজিক
`NABC`; `Deserialize([]byte)` ম্যাজিক যাচাই করে মডিউল পুনর্গঠন করে — ৮ বাইটের
কম বা ভুল ম্যাজিক প্রত্যাখ্যাত হয়। এই বাফারই প্ল্যাটফর্ম অ্যাডাপ্টার ও C ABI
অতিক্রম করে।

---

## ৩. রানটাইম

### `runtime/vm`
একটি stack-based interpreter। মান হলো tagged union `Value`
(`ValInt`, `ValFloat`, `ValString`, `ValBool`, `ValArray`, `ValObject`,
`ValFunc`, `ValChannel`, …)। Builtins `stdlib/*`-এ যুক্ত হয়
(`crypto.Sha256`, `math.Sqrt`, file IO, JSON, time, net)।

### কনকারেন্সি প্রিমিটিভ

| প্যাকেজ | মডেল |
|---|---|
| `runtime/actor` | Isolated actor + buffered mailbox; `Send` (fire-and-forget), `Ask` (reply awaited)। মনে রাখুন: `Ask`-এ timeout নেই, এবং `Start()`-এর আগে `Send`/`Ask` ব্যর্থ হয়। |
| `runtime/scheduler` | Worker pool; `Spawn` + `Await`/`AwaitTimeout` (`AwaitTimeout` মেয়াদ শেষে `context.DeadlineExceeded`)। |
| `runtime/gc` | Allocation tracking ও telemetry (`TrackAlloc`, `TrackFree`, `Collect`, `GetStats`)। |
| `vm.Channel` | Go-channel ভিত্তিক `Channel<T>` (`NewChannel`, `Send`, `Recv`)। |

### `runtime/repl`
`repl.Start(in, out)` একটি ইন্টারঅ্যাকটিভ লুপ, যা snippet কম্পাইল-রান করে।

---

## ৪. UI ইঞ্জিন

| প্যাকেজ | দায়িত্ব |
|---|---|
| `ui/engine` | ট্রি মডেল — `UITree` (`BeginNode`/`EndNode`/`SetProp`/`SetEvent`), `WidgetNode`, hit-testing, touch dispatch, JSON export |
| `ui/layout` | Flex/leaf layout — `ComputeLayout(root, ctx)` → `Bounds` |
| `ui/state` | Reactive primitives — `Signal`, `Store`, `Reconciler` (tree diff → mutations) |
| `ui/render` | Software rasteriser — `Canvas`, `DrawRect`, `DrawRoundedRect`, gradient |
| `ui/theme` | `LightTheme()` / `DarkTheme()` টোকেন |
| `ui/widgets` | Builder — `Column`, `Row`, `Text`, `Button`, `TextInput`, `Image`, `Card`, `Divider`, `Spacer`, `Switch` |
| `ui/animation` | Easing (`Linear`, `EaseInQuad`, `EaseOutCubic`, `Spring`) ও `Interpolate` |

VM-এর UI ইন্সট্রাকশন ট্রি গড়ে; হোস্ট সেটি রেন্ডার করে। প্ল্যাটফর্ম অ্যাডাপ্টারের
জন্য: bytecode চালান → `*engine.UITree` পান → প্ল্যাটফর্মে রেন্ডার (Onuron-এ
`nilui`, Android/iOS-এ JSON)।

---

## ৫. C ABI সীমানা

`abi/` native হোস্ট থেকে alap এমবেড করার স্থিতিশীল সীমানা:

- `abi/nilabi.h` — C হেডার (`NilContext`, `NilValue`, `NilResult` …)
- `abi/bridge.go` — opaque handle → `*RuntimeContext` রেজিস্ট্রি
- `abi/nilabi.go` — cgo ব্রিজ (`//go:build cgo`); integer handle C-allocated
  memory-তে box করে, যাতে Go কখনো `uintptr` → `unsafe.Pointer` না করে

হোস্ট `nilx_runtime_create`, `nilx_runtime_run`, `nilx_runtime_dispatch_touch`,
`nilx_runtime_get_ui_json` কল করে।

---

## ৬. অ-লক্ষ্য (Non-goals)

- alap **canonical NilLang নয়**। এটি ভিন্ন ডায়ালেক্ট (`function`, `let`/`var`,
  `@Component`) ব্যবহার করে — canonical নয় ([তুলনা](/nil/compatibility/))।
- টাইপ চেকার এখনো **diagnostics দেয় কিন্তু execution আটকায় না**।
- Error handling, capabilities এবং পূর্ণ standard library **অসম্পূর্ণ**।
- হার্ডওয়্যার ব্যাকএন্ড (GPU/audio/camera) প্রতিনিধিত্ব করে কিন্তু production-ready নয়।

বিস্তারিত: `alap-framework/docs/ARCHITECTURE.md`, `RELATIONSHIP.md`, `docs/ROADMAP.md`।
