---
title: টাইপ সিস্টেম ও মেমরি মডেল
description: nilLang এর ওনারশিপ, স্ট্রাক্ট, এনাম এবং গারবেজ-কালেক্টর মুক্ত মেমরি সেফটি মডেল।
---

nilLang-এর অন্যতম বৈশিষ্ট্য হলো কোনো গারবেজ কালেক্টর (GC) ছাড়াই এটি শতভাগ মেমরি নিরাপত্তা নিশ্চিত করে।

## স্ট্রাকচার (Structs)

কাস্টম ডেটা টাইপ ডিফাইন করার জন্য `struct` ব্যবহার করা হয়:

```rust
struct User {
    id: int,
    username: string,
    isAdmin: bool,
}

fn main() {
    let dev = User {
        id: 1,
        username: "joysri",
        isAdmin: true,
    }

    print("ইউজার: " + dev.username)
}
```

---

## এনাম ও প্যাটার্ন ম্যাচিং (Enums & Pattern Matching)

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}

fn check_status(code: int) -> Result<string, string> {
    if code == 200 {
        return Result.Ok("অনুরোধ সফল")
    }
    return Result.Err("সার্ভার এরর")
}

fn main() {
    let response = check_status(200)

    match response {
        Result.Ok(msg) => print("সফল: " + msg),
        Result.Err(err) => print("ব্যর্থ: " + err),
    }
}
```

---

## ওনারশিপ ও ধার নেওয়া (Ownership & Borrowing)

মেমরি লিক বা ড্যাঙ্গলিং পয়েন্টার প্রতিরোধে nilLang কম্পাইল-টাইমে প্রতিটি ভ্যালুর মালিকানা ট্র্যাক করে:

- প্রতিটি রিসোর্সের একমাত্র ওনার থাকে।
- যখন ওনারের স্কোপ শেষ হয়, মেমরি অবিলম্বে মুক্ত (Deallocate) করা হয়।
- রেফারেন্স ব্যবহারের ক্ষেত্রে একাধিক রিড-অনলি ধার নেওয়া যায়, অথবা কেবল একটি মিউটেবল রেফারেন্স অনুমোদিত হয়।
