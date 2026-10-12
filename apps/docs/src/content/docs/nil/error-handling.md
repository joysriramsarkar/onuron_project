---
title: এরর মডেল (Error Handling)
description: nilLang-এর কখনো-panic-না-করা কম্পাইলার, structured diagnostics এবং typed runtime error।
---

nilLang-এর এরর মডেল তিনটি কার্ডিনাল invariant-এর উপর দাঁড়ানো:

1. **Compiler Never-Panic** — কম্পাইলার যেকোনো ব্যবহারকারী-সোর্সে (syntax
   error, cyclic structure, deep recursion, malformed token) কখনো panic করবে না।
   কোনো বিচ্যুতি মানেই কম্পাইলার বাগ।
2. **Deterministic Diagnosability** — প্রতিটি এরর বহন করে একটি স্থির কোড
   (`E0xxx`), সঠিক position (line, column, span), প্রাসঙ্গিক সোর্স লাইন ও
   কর্মযোগ্য suggestion।
3. **Structured Runtime Error** — runtime exception একটি typed `RuntimeError`,
   arbitrary host crash বা unbounded panic নয়।

---

## ১. Syntactic diagnostics

প্রথম পাঁচটি সিনট্যাকটিক কোড:

| কোড | অর্থ |
|---|---|
| `E0001` | Unexpected token |
| `E0002` | Unterminated string |
| `E0003` | Unexpected end of file |
| `E0004` | Expected token X, got Y |
| `E0005` | (রেঞ্জ ইত্যাদি প্রসঙ্গ-নির্দিষ্ট ব্যাখ্যা) |

প্রতিটি compilation path এগুলো একটিমাত্র gate `frontend.Check` দিয়ে পায়।

উদাহরণ ডায়াগনস্টিক আউটপুট:
```text
error[E0104]: cannot assign to constant 'MAX'
  --> src/main.nil:3:1
   |
 3 | MAX = 2048;
   | ^^^^^^^^^^^ 'MAX' is declared immutable
   |
   = help: use `let` if you need a mutable binding
```

---

## ২. Semantic errors

| কোড | অর্থ |
|---|---|
| `E0102` | undefined identifier (বিশেষত assignment target) |
| `E0104` | cannot assign to constant |
| `E0201` | CapabilityViolation (দেখুন [ক্যাপাবিলিটি](/nil/capabilities-and-effects/)) |

অ্যাসাইনমেন্ট কখনো নতুন বাইন্ডিং ঘোষণা করে না — unscoped identifier-এ অ্যাসাইন
করলে `E0102`।

---

## ৩. Runtime errors

- Typed `RuntimeError` অবজেক্ট (host process crash নয়)।
- টাস্ক ব্যর্থ হলে `Future` → `Errored`; `await` সেই ব্যর্থতা propagate করে।
- channel/mutex ইত্যাদির জন্য নির্ধারক error path।

---

## ৪. Result ও Option দিয়ে সফলতা/ব্যর্থতা মডেলিং

`std/core`:

```nil
import "std/core" as core;

let ok  = core.ok(42);
let bad = core.err("not found");

// chain
let mapped = core.mapResult(ok, fn(x){ return x + 1; });
let value  = core.unwrapOrDefault(bad, 0);
```

Option API: `some`, `none`, `mapOption`, `unwrapOrDefault`, `expectOption`।

`Result<T, E>` টাইপ (`Ok(T)`/`Err(E)`) ও `match` দিয়ে variant unwrap করা যায়।

---

## ৫. `try`/`catch` — বর্তমান অবস্থা

`throw`/`try`/`catch` ইন্সট্রাকশন ও সেমান্টিক্স **এখনো সম্পূর্ণ হয়নি**।
ব্যবহারযোগ্য এরর-হ্যান্ডলিং প্যাটার্ন হলো `Result`/`Option` + `match` (উপরের §৪)।
`try`/`catch` সেমান্টিক্স সম্পূর্ণ হলে সেই অনুযায়ী ডক আপডেট করা হবে।

---

## ৬. পরবর্তী পড়ুন

- [ক্যাপাবিলিটি ও ইফেক্ট](/nil/capabilities-and-effects/)
- ক্যানোনিক্যাল স্পেসিফিকেশন: `nilLang/docs/spec/ERROR_MODEL.md`
