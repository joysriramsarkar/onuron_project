---
title: nilLang ভাষা টিউটোরিয়াল (Language Tutorial)
description: nilLang-এর মৌলিক গঠন — বাইন্ডিং, ফাংশন, কন্ট্রোল ফ্লো, টাইপ ও ডিক্লেয়ারেটিভ কম্পোনেন্ট।
---

**nilLang** হলো একটি স্ট্যাটিক, স্ট্রাকচারাল টাইপযুক্ত সিস্টেম ও অ্যাপ্লিকেশন
প্রোগ্রামিং ভাষা। এর ক্যানোনিক্যাল বাস্তবায়ন Go-তে (`nilLang/`) এবং ভাষার
কোর কনফরম্যান্স `CORE_FREEZE.md` দ্বারা সুরক্ষিত।

> এই টিউটোরিয়াল ক্যানোনিক্যাল সিনট্যাক্স অনুসরণ করে। আলাদা ডায়ালেক্ট
> (যেমন `alap-framework`-এর prototype) এর সাথে পার্থক্য জানতে দেখুন
> [কম্প্যাটিবিলিটি](/nil/compatibility/)।

---

## ১. প্রথম প্রোগ্রাম

একটি nilLang প্রোগ্রাম থাকে টপ-লেভেল স্টেটমেন্ট বা `main()` কল দিয়ে। ফাইল
`UTF-8`; আইডেন্টিফায়ার ও স্ট্রিং-এ বাংলা সরাসরি চলে।

```nil
let appName = "অনুরণ";
let version = "1.0.0";

puts("স্বাগতম \(appName) v\(version)!");
```

আউটপুট:
```text
স্বাগতম অনুরণ v1.0.0!
```

`puts`, `print` ও `println` — তিনটিই আউটপুট বিল্টইন হিসেবে আছে।

---

## ২. কমেন্ট

```nil
// এক-লাইনের কমেন্ট
/* একাধিক
   লাইনের কমেন্ট */
```

---

## ৩. বাইন্ডিং: `let` ও `const`

- **`let`** → পরিবর্তনযোগ্য (mutable) লেক্সিক্যাল বাইন্ডিং।
- **`const`** → অপরিবর্তনীয় (immutable) বাইন্ডিং।

```nil
let port = 4324;          // পুনঃঅ্যাসাইন করা যাবে
const MAX = 1024;         // পুনঃঅ্যাসাইন = কম্পাইল-টাইম এরর (E0104)

port = port + 1;          // ✅ ঠিক আছে
// MAX = 2048;            // ❌ cannot assign to constant 'MAX'
```

> **নোট:** nilLang-এ `let mut` বসবে না। সব `let` ই ডিফল্টে mutable; অপরিবর্তনীয়
> চাইলে `const` ব্যবহার করুন।

টাইপ অ্যানোটেশন ঐচ্ছিক — অ্যাসাইনমেন্ট বা লিটারেল দিয়ে টাইপ অনুমিত হয়:

```nil
let count: i32 = 100;
let ratio: f64 = 3.14159;
let active: bool = true;
let label = "Onuron OS";
let bytes: Byte[] = [0xDE, 0xAD, 0xBE, 0xEF];
```

---

## ৪. প্রাথমিক টাইপ

| টাইপ | অর্থ | ডিফল্ট |
|---|---|---|
| `Int` | ৬৪-বিট signed integer | `0` |
| `Float` | ৬৪-বিট IEEE float | `0.0` |
| `String` | UTF-8 স্ট্রিং | `""` |
| `Bool` | বুলিয়ান | `false` |
| `Byte` | ৮-বিট unsigned | `0` |
| `Null` | অনুপস্থিত মান | `null` |

আকারসহ (sized) সংখ্যা টাইপ: `i8 i16 i32 i64 u8 u16 u32 u64 f32 f64`।
**কোনো implicit সংখ্যাগত coercion নেই** — `Int` স্বয়ংক্রিয়ভাবে `i32`-এ
রূপান্তরিত হয় না।

লিটারেল:
```nil
let a = 42;          // decimal
let b = 0xFF;        // hex
let c = 0o777;       // octal
let d = 0b1010;      // binary
let e = 1_000_000;   // _ separator
let f = ৪২;           // বাংলা অঙ্কও চলে
```

---

## ৫. অপারেটর

| শ্রেণি | অপারেটর |
|---|---|
| পাটিগণিত | `+ - * / %` |
| তুলনা | `== != < <= > >=` |
| লজিক | `&& \|\| !` |
| অ্যাসাইনমেন্ট | `= += -=` |
| Null-coalescing | `??` |
| Safe access | `?.` |

```nil
let a = 10;
let b = 3;
puts(a / b);            // 3 (integer division)
puts(a % b);            // 1
puts("sum=" + string(a + b));
```

---

## ৬. কন্ট্রোল ফ্লো

শর্ত ও লুপের কন্ডিশন **বন্ধনীর ভিতরে** লিখতে হয়:

```nil
let score = 82;

if (score > 90) {
    puts("excellent");
} else if (score > 75) {
    puts("good");
} else {
    puts("keep going");
}
```

```nil
let i = 0;
while (i < 5) {
    puts("\(i)");
    i = i + 1;
}

for n in 0..5 {
    puts("range: \(n)");       // 0,1,2,3,4
}

for n in 1..=5 {
    puts("inclusive: \(n)");   // 1..5
}
```

`break` ও `continue` সমর্থিত। রেঞ্জ কেবল `for` হেডারে অর্থবহ।

### `match`

```nil
fn grade(score: Int) -> String {
    return match score {
        100 => "perfect",
        90  => "excellent",
        _   => "ok"
    };
}
```

---

## ৭. ফাংশন

```nil
fn add(a: Int, b: Int) -> Int {
    return a + b;
}

fn greet(name: String) {
    puts("Hello, \(name)!");
}
```

ফাংশন মান (first-class):

```nil
let double = fn(x) { return x * 2; };
puts("\(double(21))");   // 42
```

মেথডের receiver সাধারণ প্রথম প্যারামিটার (`self` কনভেনশন, soft keyword):

```nil
struct Counter { count: Int }

impl Counter for Counter {
    fn inc(self) -> Int {
        self.count = self.count + 1;
        return self.count;
    }
}
```

---

## ৮. অ্যারে ও হ্যাশ

```nil
let nums = [10, 20, 30];
puts("\(nums[0])");          // 10

let config = {
    "host": "localhost",
    "port": 4324
};
puts(config["host"]);
```

---

## ৯. struct, enum, trait

```nil
struct User {
    id: Int,
    username: String,
    isAdmin: Bool,
}

let dev = User { id: 1, username: "joysri", isAdmin: true };
puts("ইউজার: \(dev.username)");
```

```nil
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

```nil
trait Serializable {
    fn serialize() -> String;
}
```

Generic সিনট্যাক্স, ADT ও exhaustive matching এখনো **planned/experimental**
(§৪.২ দেখুন)।

---

## ১০. ডিক্লেয়ারেটিভ কম্পোনেন্ট (Alap/NilUI)

UI কম্পোনেন্ট থাকে `StateDeclaration` + `render`/`build` ব্লক + ইভেন্ট হ্যান্ডলার:

```nil
component Counter {
    state count: i32 = 0;

    render {
        return {
            "type": "Page",
            "title": "Alap UI Counter",
            "content": [
                { "type": "Card", "title": "Current Count", "body": "\(count)" },
                { "type": "Button", "id": "inc", "label": "Increment",
                  "event": "increment", "payload": {"step": 1} }
            ]
        };
    }

    on increment(payload) {
        let step: i32 = 1;
        if (payload != null) {
            step = payload["step"] ?? 1;
        }
        count = count + step;
        emit("changed", count);
    }
}
```

এখানে `count` একটি mutable state; `emit(name, payload?)` ইভেন্ট রেকর্ড করে।

---

## ১১. পরবর্তী পড়ুন

- [টাইপ সিস্টেম ও মেমরি](/nil/types-and-memory/)
- [স্ট্যান্ডার্ড লাইব্রেরি](/nil/standard-library/)
- [কনকারেন্সি](/nil/concurrency/)
- [এরর মডেল](/nil/error-handling/)
- [ক্যাপাবিলিটি ও ইফেক্ট](/nil/capabilities-and-effects/)
- [নিল টুলচেইন](/nil/toolchain/)
- ক্যানোনিক্যাল গ্রামার: `nilLang/docs/spec/LANGUAGE_SPEC.md`
