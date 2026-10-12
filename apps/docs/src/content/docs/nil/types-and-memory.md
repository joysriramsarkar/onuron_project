---
title: টাইপ সিস্টেম ও মেমরি মডেল
description: nilLang-এর sound স্ট্রাকচারাল টাইপ সিস্টেম, sized সংখ্যা টাইপ এবং মেমরি-সেফটি কনট্রাক্ট।
---

nilLang একটি **sound, static, স্ট্রাকচারাল** টাইপ সিস্টেম প্রয়োগ করে। কম্পাইলার
টাইপ-চেকার হলো প্রতিটি কম্পাইলেশন পথের বাধ্যতামূলক ভেরিফায়ার।

---

## ১. প্রাথমিক টাইপ

| টাইপ | রিপ্রেজেন্টেশন | ডিফল্ট |
|---|---|---|
| `Int` | ৬৪-বিট signed integer | `0` |
| `Float` | ৬৪-বিট IEEE float | `0.0` |
| `String` | UTF-8 স্ট্রিং | `""` |
| `Bool` | বুলিয়ান | `false` |
| `Byte` | ৮-বিট unsigned | `0` |
| `Null` | nil রেফারেন্স | `null` |
| `Void` | খালি রিটার্ন | — |
| `Any` | dynamic top type | `null` |

## ২. Sized সংখ্যা টাইপ

আকার-নির্দিষ্ট টাইপ আলাদা প্রিমিটিভ (এরা `Int` থেকে আলাদা; implicit রূপান্তর নেই):

```text
i8  i16  i32  i64
u8  u16  u32  u64
f32  f64
```

```nil
let small: i32 = 100;
// let x: i32 = someInt;   // ❌ Int → i32 স্বয়ংক্রিয় নয়
```

> **"No implicit numeric coercion"** মানে: একটি untyped পেলোড (যেমন
> `payload["step"]`) থেকে পড়া মান `i32`-এ সরাসরি যোগ করা যাবে না, যদি না একটি
> consistent ডিফল্ট/লিটারেল টাইপ দেওয়া হয়।

---

## ৩. Compound ও Algebraic টাইপ

| ধরন | লেখা | স্ট্যাটাস |
|---|---|---|
| Struct | `struct User { id: Int, name: String }` | সক্রিয় |
| Enum (tagged union) | `enum Status { Pending, Active(Int) }` | সক্রিয়/আংশিক |
| Generics | `List<T>`, `Hash<K, V>` | planned (সিনট্যাক্স পার্স হয়) |
| Union | `Int \| String` | planned |
| Optional | `?T` (= `T \| Null`) | planned |
| Result | `Result<T, E>` (`Ok(T)`/`Err(E)`) | সক্রিয়/আংশিক |
| Trait | `trait Serializable { fn serialize() -> String; }` | সক্রিয়/আংশিক |

স্ট্রাকচার ও লিটারেল:

```nil
struct User { id: Int, name: String, active: Bool }

let u = User { id: 1, name: "joysri", active: true };
```

---

## ৪. `Any` ও soundness

`Any` হলো unchecked top type, যা untyped function প্যারামিটার, component
সীমানা ও যেসব builtin-এর generic কনট্রাক্ট এখনো বাস্তবায়িত হয়নি সেখানে অনুমিত হয়।

- কোর ফ্রিজ চলাকালীন **নতুন কোনো implicit `Any` fallback নিষিদ্ধ**।
- `Int` থেকে sized টাইপে (বা উল্টোদিকে) অ্যাসাইন `isAssignable` দ্বারা প্রত্যাখ্যাত হয়।

---

## ৫. মেমরি মডেল

nilLang স্ট্যাক/ম্যানেজড এক্সিকিউশনে ব্যবহারকারীর জন্য কঠোর মেমরি-সেফটি দেয়:

- **No Uninitialized Memory** — প্রতিটি ভ্যারিয়েবল ও ফিল্ড পড়ার আগে initialized।
- **No Use-After-Free** — ম্যানেজড scope ও GC কনট্রাক্ট।
- **Object May Not Escape Without a Handle** — FFI/callback সীমানায়।

### গারবেজ কালেক্টর — বাস্তব অবস্থা

রিপোতে একটি **tracing mark-and-sweep** কলেক্টর আছে (`runtime/gc`) এবং cycle
টেস্ট আছে। তবে এটি **আজ একটি স্ট্যান্ডঅ্যালোন প্যাকেজ**:

> **সীমাবদ্ধতা (সৎভাবে):** tree-walking evaluator বা stack VM এখনো তাদের
> অ্যালোকেশনগুলো `Track`-এর মধ্য দিয়ে রাউট করে না, তাই কোনো execution path
> বর্তমানে এই GC দিয়ে সংগ্রহ হয় না এবং live root set রানটাইমে scan হয় না।
> প্রতিটি VM value, closure, task, component ও native handle-কে এক managed
> heap-এ একীভূত করা **এখনো Nilang 0.1 গ্যারান্টি নয়**, বরং এটি এমবেড করার
> required checklist।

অর্থাৎ: ভাষাটি মেমরি-নিরাপদ স্ট্যাক এক্সিকিউশন দেয়, কিন্তু "কোনো GC pause নেই"
ধরনের কোনো সম্পূর্ণ concurrency/realtime claim এখনো verified নয়। বিস্তারিত:
`nilLang/docs/spec/MEMORY_MODEL.md`।

---

## ৬. টাইপ চেকিং কখন ঘটে

প্রতিটি compilation path একটিমাত্র frontend gate (`frontend.Check`) ব্যবহার করে,
যা টোকেন → প্রোগ্রাম AST → টাইপ চেক একসাথে চালায়। ব্যর্থ হলে কখনো panic করে না —
বরং **structured diagnostic** (`E0101` রেঞ্জ) দেয়, span ও suggestion সহ।
দেখুন: [এরর মডেল](/nil/error-handling/)।

---

## ৭. পরবর্তী পড়ুন

- [ক্যাপাবিলিটি ও ইফেক্ট](/nil/capabilities-and-effects/)
- [নিল ও অন্য রানটাইম কম্প্যাটিবিলিটি](/nil/compatibility/)
- ক্যানোনিক্যাল স্পেসিফিকেশন: `nilLang/docs/spec/TYPE_SYSTEM.md`
