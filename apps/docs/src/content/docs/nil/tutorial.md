---
title: nilLang ভাষা টিউটোরিয়াল (Language Tutorial)
description: nilLang প্রোগ্রামিং ভাষার মৌলিক গঠন, ভেরিয়েবল, ফাংশন ও কন্ট্রোল ফ্লো।
---

**nilLang** হলো একটি আধুনিক, উচ্চ-পারফরম্যান্স এবং স্মৃতি-নিরাপদ সিস্টেম ও অ্যাপ্লিকেশন প্রোগ্রামিং ভাষা। 

## মূল সিনট্যাক্স ও হ্যালো ওয়ার্ল্ড

যেকোনো nilLang প্রোগ্রামের সূচনা হয় `main()` ফাংশনের মাধ্যমে:

```rust
fn main() {
    let name = "অনুরণ"
    print("স্বাগতম, " + name + "!")
}

main()
```

---

## ভেরিয়েবল ও মিউটেবিলিটি (Variables & Mutability)

ডিফল্টভাবে nilLang এর সমস্ত ভেরিয়েবল অপরিবর্তনশীল (Immutable):

```rust
// অপরিবর্তনীয় ভেরিয়েবল (Immutable)
let port = 4324

// পরিবর্তনশীল ভেরিয়েবল (Mutable)
let mut counter = 0
counter = counter + 1
```

---

## ডেটা টাইপস (Basic Types)

nilLang এ রয়েছে শক্তিশালী স্ট্যাটিক টাইপিং এবং স্মার্ট টাইপ অনুমিতি (Type Inference):

```rust
let isOnline: bool = true
let count: int = 100
let ratio: float = 3.14159
let label: string = "Onuron OS"
let bytes: [u8] = [0xDE, 0xAD, 0xBE, 0xEF]
```

---

## শর্ত ও লুপ (Control Flow)

### `if - else` স্টেটমেন্ট
```rust
let memoryAvailable = 1024 // MB

if memoryAvailable >= 1024 {
    print("পর্যাপ্ত মেমরি রয়েছে।")
} else {
    print("সতর্কতা: মেমরি কম।")
}
```

### `for` লুপ
```rust
print("১ থেকে ৫ পর্যন্ত প্রিন্ট:")
for i in 1..=5 {
    print("গণনা: " + i)
}
```

### `while` লুপ
```rust
let mut remaining = 3
while remaining > 0 {
    print("বুট শুরু হতে বাকি: " + remaining + " সেকেন্ড")
    remaining = remaining - 1
}
```

---

## ফাংশন ও রিটার্ন ভ্যালু (Functions)

```rust
fn add(a: int, b: int) -> int {
    return a + b
}

fn main() {
    let result = add(10, 20)
    print("যোগফল: " + result) // আউটপুট: ৩০
}
```

ব্রাউজারেই লাইভ কোড লিখে টেস্ট করতে [nilLang Web Playground](http://localhost:4324/playground) ভিজিট করুন।
