---
title: ইউআই কম্পোনেন্টস ও স্টাইলিং (Components & Styling)
description: alap-framework এর বিল্ট-ইন উইজেট, গ্লাসমেটালিক ডিজাইন সিস্টেম ও কাস্টম থিমিং।
---

alap-framework এ বিল্ট-ইন রয়েছে আধুনিক ডার্ক থিম ও গ্লাসমেটালিক (Glassmorphism) উপাদান যা onuronOS এর সাথে নিখুঁতভাবে মানানসই।

## প্রধান কোর কম্পোনেন্টস

### ১. `Window`
মূল উইন্ডো ফ্রেম তৈরি করে:
```rust
<Window title="অ্যাপের শিরোনাম" width={800} height={600} resizable={true}>
    {children}
</Window>
```

### ২. `Card` ও `Container`
কন্টেন্ট গুছিয়ে সাজানোর ফ্রস্টেড-গ্লাস ব্যাকগ্রাউন্ড:
```rust
<Card variant="glass" glow="cyan">
    <Text weight="bold">প্রিমিয়াম গ্লাস প্যানেল</Text>
</Card>
```

### ৩. `Button`
ইন্টারেক্টিভ অ্যাকশন বাটন:
```rust
<Button variant="primary" size="medium" onClick={handleSave}>
    সংরক্ষণ করুন
</Button>
<Button variant="ghost">বাতিল</Button>
```

---

## থিম ও কালার টোকেন

alap এর ডিফল্ট ডিজাইন সিস্টেম সিএসএস ভেরিয়েবলের ওপর প্রতিষ্ঠিত:
- `--accent`: `#4f8bf9` (ইলেকট্রিক ব্লু)
- `--accent-teal`: `#10e5b2` (নিওন টিল)
- `--card-bg`: `rgba(16, 24, 52, 0.7)`
- `--border`: `rgba(46, 64, 120, 0.5)`
