---
title: কম্প্যাটিবিলিটি — nilLang ও অন্য রানটাইম
description: ক্যানোনিক্যাল nilLang (Go), Rust runtime/nillang সাবসেট এবং alap-framework-এর তুলনা।
---

ইকোসিস্টেমে একাধিক NilLang রানটাইম আছে। **ক্যানোনিক্যাল** হলো Go বাস্তবায়ন
(`nilLang/`)। অন্যগুলো এর সাথে সামঞ্জস্য রক্ষার লক্ষ্য রাখে।

| বাস্তবায়ন | অবস্থান | পরিপক্বতা |
|---|---|---|
| **nilLang (Go)** — canonical | `nilLang/` | Production: ৩টি engine (evaluator, VM, AOT/LLVM), পূর্ণ type checker, `tests/crossruntime/` conformance |
| **Rust runtime** | `onuronOS/runtime/nillang/` | Prototype: parser + JSON bytecode + UI-oriented VM |
| **alap-framework (Go)** | `alap-framework/` | Early-alpha: আলাদা lexer/parser/NABC VM, non-fatal type checker |

---

## ১. কেন ক্যানোনিক্যাল Go?

`nilLang` (Go) একমাত্র ভাষা-কনট্রাক্টের কর্তৃপক্ষ (`CORE_FREEZE.md`)। কম্পাইলার
কখনো panic করে না, structured diagnostics দেয়, এবং cross-engine conformance
suite (evaluator + bytecode VM, ২১টি প্রোগ্রাম) পাস করে।

---

## ২. সাবসেট কি এবং কেন?

`onuronOS/runtime/nillang` একটি **ইচ্ছাকৃত সাবসেট** — শুধু UI-অ্যাপ ডেফিনিশন
চালানোর জন্য যথেষ্ট। এটি **drop-in replacement নয়**:

- ❌ general expression evaluation, control flow, function call নেই
- ❌ standard library, error handling, traits/enums/modules নেই
- ❌ multi-app support, real render pipeline নেই
- ✅ parser + JSON bytecode serialization + basic VM
- ✅ struct/app/state/scene handling

সাবসেটটি canonical expected output-এর সাথে **feature-tagged** conformance run
দিয়ে প্রমাণ করা হবে (রোডম্যাপ ফেজ B)।

---

## ৩. alap-framework-এর সম্পর্ক

alap-framework বর্তমানে তার **নিজস্ব** compiler/VM রাখে, যা canonical এর সাথে
সামঞ্জস্যপূর্ণ নয়। সিদ্ধান্ত: alap এর নিজস্ব কম্পাইলার/VM বাড়াবে না, বরং ধাপে
ধাপে canonical nilLang ইন্টিগ্রেট করবে। বিস্তারিত: [alap আর্কিটেকচার](/alap/architecture/)।

---

## ৪. সিনট্যাক্স পার্থক্য (উদাহরণ)

| বিষয় | Canonical (Go) | alap prototype |
|---|---|---|
| বাইন্ডিং | `let` (mutable), `const` (immutable) | `let`, `var` |
| ফাংশন | `fn add(a: Int, b: Int) -> Int` | `function add(a: i32, b: i32): i32` |
| প্রিন্ট | `puts` / `print` / `println` | `print` |
| UI | `component { state; render {...}; on ... {} }` | `component` + widget tree |

এই ডকুমেন্টেশন সাইট **canonical** সিনট্যাক্স শেখায় এবং পার্থক্য থাকলে তা
স্পষ্টভাবে আলাদা করে বলে।

---

## ৫. বর্তমান সীমাবদ্ধতা (সৎভাবে)

- automated conformance suite কেবল দুটি **Go** engine তুলনা করে।
- Rust সাবসেট ও alap-এর সাথে তুলনা **manual verification** — automated নয়।
- কিছু canonical ফিচার (`try`/`catch`, generic traits, full effect checking)
  অসম্পূর্ণ।

রেফারেন্স: `nilLang/docs/spec/LANGUAGE_SPEC_CANONICAL.md`, `tests/crossruntime/crossruntime_test.go`।
