---
title: প্যাকেজ ম্যানেজার ও `.nilax` ফরম্যাট
description: onuronOS এর অফিসিয়াল .nilax প্যাকেজ স্পেসিফিকেশন এবং ডিজিটাল সিগনেচার যাচাই প্রক্রিয়া।
---

onuronOS-এ সমস্ত অ্যাপ্লিকেশন একটি আধুনিক ও নিরাপদ ফরম্যাট **`.nilax` (Nil Application Archive)** অথবা লেগ্যাসি **`.onp` (Onuron Package)** হিসেবে সংকলিত ও বিতরণ করা হয়।

## `.nilax` প্যাকেজের গঠন

একটি `.nilax` প্যাকেজ মূলত একটি ক্রিপ্টোগ্রাফিকালি সাইন করা এবং কমপ্রেসড টারবল, যার অভ্যন্তরীণ ফাইল কাঠামো নিম্নরূপ:

```text
package.nilax/
├── manifest.json      # অ্যাপ মেটাডেটা, পারমিশন ও এন্ট্রি পয়েন্ট
├── icon.svg           # অ্যাপ আইকন (SVG ভেক্টর)
├── bin/               # কম্পাইল্ড NilLang বাইনারি / এক্সিকিউটেবল
├── assets/            # ইমেজ, ফন্ট এবং লোকাল রিসোর্স
└── signature.sig      # ed25519 ক্রিপ্টোগ্রাফিক সিগনেচার
```

### `manifest.json` উদাহরণ

```json
{
  "$schema": "https://store.onuron.org/schemas/v1/manifest.json",
  "id": "org.onuron.calculator",
  "name": "ক্যালকুলেটর",
  "version": "1.0.0",
  "summary": "আধুনিক ও দ্রুতগতির সায়েন্টিফিক ক্যালকুলেটর",
  "category": "utilities",
  "developer": {
    "name": "Onuron Core Team",
    "website": "https://onuron.org"
  },
  "package": {
    "type": "nilax",
    "url": "https://cdn.onuron.org/packages/org.onuron.calculator-1.0.0.nilax",
    "sha256": "5f4dcc3b5aa765d61d8327deb882cf992b321a00a7b1b86d9a2a90098a581454",
    "size": 3145728
  }
}
```

---

## কমান্ড-লাইন ইন্টারফেস (`nilax` / `onp` CLI)

টার্মিনাল থেকে সরাসরি প্যাকেজ ম্যানেজ করার জন্য সিস্টেম প্যাকেজ ম্যানেজার টুল ব্যবহার করা যায়:

### ১. প্যাকেজ ইনস্টল করা
```bash
nilax install org.onuron.calculator
```
এটি স্বয়ংক্রিয়ভাবে [store.onuron.org/api/v1/apps/org.onuron.calculator.json](https://store.onuron.org/api/v1/apps/org.onuron.calculator.json) থেকে ম্যানিফেস্ট ও চেকসাম যাচাই করে ডাউনলোড ও আনপ্যাক করবে।

### ২. প্যাকেজের ডিজিটাল সিগনেচার ও ইন্টিগ্রিটি পরীক্ষা
```bash
nilax verify org.onuron.calculator
```
আউটপুট:
```text
✓ Package: org.onuron.calculator (v1.0.0)
✓ SHA256: 5f4dcc3b5aa765d61d8327deb882cf992b321a00a7b1b86d9a2a90098a581454
✓ Developer Signature: VALID (ed25519 verified)
✓ Permissions: Sandboxed (no elevated privileges)
```

### ৩. সমস্ত অ্যাপ্লিকেশন আপডেট করা
```bash
nilax update --all
```

### ৪. প্যাকেজ আনইনস্টল করা
```bash
nilax remove org.onuron.calculator
```
কোনো অবশিষ্ট ক্যাশ বা অপ্রয়োজনীয় ডিরেক্টরি ফেলে না রেখে সম্পূর্ণ স্যান্ডবক্স ক্লিনআপ নিশ্চিত করা হয়।
