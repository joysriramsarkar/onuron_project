---
title: ক্যাপাবিলিটি ও ইফেক্ট সিস্টেম
description: nilLang-এর compile-time capability declaration, runtime gate এবং operational effect ট্র্যাকিং।
---

nilLang নিরাপত্তা ও side-effect গ্যারান্টিকে সরাসরি কম্পাইলার/টাইপ চেকিংয়ে ঢুকিয়ে
দেয়। দুটি সম্পর্কিত ব্যবস্থা: **Capability** (কোন সম্পদ ব্যবহার করা যাবে) এবং
**Effect** (কোন প্রকার observable প্রভাব ফেলা যাবে)।

---

## ১. Capability declaration

অ্যাপের `nil.json`-এ দাবি করা হয় কোন capability লাগবে:

```json
{
  "name": "vision-app",
  "capabilities": ["Camera", "GPU", "Network"]
}
```

Capability সংস্থানসমূহ: `Filesystem`, `Network`, `Camera`, `GPS`, `Bluetooth`,
`GPU`, `Database`, `Process`, `Crypto`, `AI`, `Sensors`, `Audio`।

---

## ২. Compile-time ভেরিফিকেশন ও runtime gate

দুই স্তরের enforcement আছে:

1. **Capability requirement table** (`compiler/capability/manifest.go`) — প্রতিটি
   builtin ও `std.*` অপারেশন কী দাবি করে তার স্পষ্ট তালিকা।
2. **Compile-time instrumentation** — একটি gated অপারেশনে সরাসরি named call থাকলে
   কম্পাইলার `OpNativeCall` তৈরি করে; pure builtin সাধারণ `OpCall`-এ থাকে।
3. **Runtime gate** — VM প্রতিটি gated dispatch-এর আগে `CapabilityChecker`
   জিজ্ঞাসা করে এবং কী দরকার (অপারেশন, প্রয়োজন, বর্তমানে ধারণকৃত) তা নামসহ
   জানিয়ে একটি typed `*DeniedError` ফেরায়। evaluator পথে একটি রক্ষণশীল
   (conservative) refusal scan-ও আছে (`nil run`)।

ডিক্লেয়ারে capability না থাকলে কম্পাইলেশন থামে:

```text
error[E0201]: CapabilityViolation
  --> src/camera.nil:12:5
   = operation `camera.capture` requires capability `Camera`,
     but the project declares: ["Network", "GPU"]
```

---

## ৩. Runtime `DeniedError`

একটি gated dispatch-এ ম্যানিফেস্ট/গ্রান্ট না মিললে:
```
*DeniedError{
  operation: "camera.capture",
  required:  ["Camera"],
  held:      [],
}
```
এটি host crash নয় — একটি structured runtime error, যা অ্যাপ হ্যান্ডল করতে পারে
([এরর মডেল](/nil/error-handling/))।

---

## ৪. Operational effect (closed set)

প্রতিটি ফাংশনের একটি effect signature থাকে:

| Effect | অর্থ |
|---|---|
| `pure` | গাণিতিকভাবে পিওর; local stack computation, immutable read |
| `read` | global/module/component state পড়া |
| `write` | shared/component state মিউটেশন |
| `io` | stdin/stdout, logging, console |
| `network` | socket/HTTP |
| `spawn` | async task/thread/actor spawn |
| `unsafe` | low-level FFI / raw pointer |

Cardinal invariant: একটি ফাংশন তার signature-এ ডিক্লেয়ার না করা কোনো
operational effect দেখাতে পারে না।

`pure` ও `unsafe` ফাংশন মডিফায়ার হিসেবে লেখা হয়:

```nil
pure fn add(a: Int, b: Int) -> Int {
    return a + b;
}
```

---

## ৫. বর্তমান অবস্থা (সৎভাবে)

- capability declaration parsing/validation, requirement table, compile-time
  instrumentation এবং VM runtime gate **বাস্তবায়িত**।
- পূর্ণ effect checking (সব পথে effect signature inference/enforcement) এখনো
  **planned**। `pure` context-এর enforcement আংশিক (VM `checkBuiltinCall`)।
- দুইটি capability ভকাবুলারি রয়েছে: `compiler/capability` (lowercase inline) ও
  `pkg/capability` (PascalCase); nilLang build উভয়ই গ্রহণ করে।

রেফারেন্স: `nilLang/docs/spec/CAPABILITIES.md` ও `EFFECTS.md`।
