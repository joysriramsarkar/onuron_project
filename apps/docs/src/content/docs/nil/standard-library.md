---
title: nilLang স্ট্যান্ডার্ড লাইব্রেরি (Standard Library)
description: System, Crypto, IO, Math এবং Net মডিউলের বিস্তারিত এপিআই রেফারেন্স।
---

nilLang এর বিল্ট-ইন স্ট্যান্ডার্ড লাইব্রেরি সিস্টেম ও অ্যাপ্লিকেশনের দৈনন্দিন সব প্রয়োজন মেটাতে সক্ষম।

## ১. `System` মডিউল

অপারেটিং সিস্টেম ও হার্ডওয়্যার তথ্যের অ্যাক্সেস দেয়:

```rust
import { System } from "nil/std"

fn main() {
    print("OS নাম: " + System.name())            // onuronOS
    print("আর্কিটেকচার: " + System.arch())        // x86_64
    print("সিপিইউ কোর: " + System.cpuCount())      // 8
    print("আপটাইম: " + System.uptime() + " sec")
}
```

---

## ২. `Crypto` মডিউল

হ্যাশিং ও ক্রিপ্টোগ্রাফিক ডিজিটাল স্বাক্ষর পরীক্ষা:

```rust
import { Crypto } from "nil/std"

fn main() {
    let text = "onuron-secure-payload"
    let hash = Crypto.sha256(text)
    print("SHA256: " + hash)

    let isValid = Crypto.ed25519_verify(text, "signature_hex", "public_key_hex")
    print("সিগনেচার সঠিক কিনা: " + isValid)
}
```

---

## ৩. `IO` মডিউল (ফাইল রিড ও রাইট)

```rust
import { File } from "nil/std/io"

fn main() {
    // ফাইল লেখা
    File.write("config.txt", "port=4321\nenv=production")

    // ফাইল পড়া
    let content = File.read("config.txt")
    print("ফাইলের তথ্য:\n" + content)
}
```
