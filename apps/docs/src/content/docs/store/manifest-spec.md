---
title: ম্যানিফেস্ট স্পেসিফিকেশন (Manifest Specification)
description: manifest.json এর সম্পূর্ণ স্কিমা, অনুমোদিত ক্যাটাগরি ও ফিল্ড রেফারেন্স।
---

Onuron App Store এ প্রতিটি অ্যাপ্লিকেশনের জন্য একটি `manifest.json` ফাইল থাকা বাধ্যতামূলক। নিচে এর প্রতিটি ফিল্ডের নিয়ম ও স্পেসিফিকেশন দেওয়া হলো:

## স্কিমা ফিল্ডস

| ফিল্ডের নাম | ডেটা টাইপ | বাধ্যতামূলক? | বর্ণনা |
|---|---|---|---|
| `id` | `string` | হ্যাঁ | রিভার্স ডোমেইন ফরম্যাট, যেমন `org.onuron.notes` |
| `name` | `string` | হ্যাঁ | অ্যাপের প্রদর্শন নাম (৩ থেকে ৫০ অক্ষর) |
| `version` | `string` | হ্যাঁ | সঠিক SemVer ফরম্যাট, যেমন `1.0.0` |
| `summary` | `string` | হ্যাঁ | অ্যাপের এক লাইনের সংক্ষিপ্ত বিবরণ (১০ থেকে ১২০ অক্ষর) |
| `description` | `string` | হ্যাঁ | অ্যাপের পূর্ণাঙ্গ বিবরণ |
| `category` | `string` | হ্যাঁ | অনুমোদিত ক্যাটাগরি তালিকা থেকে একটি |
| `license` | `string` | হ্যাঁ | ওপেন-সোর্স লাইসেন্স (যেমন `AGPL-3.0`, `MIT`, `Apache-2.0`) |
| `releaseStage` | `string` | না | প্রকাশনার সৎ লেবেল: `reference`, `preview` বা `stable` (ডিফল্ট `stable`) |
| `permissions` | `string[]` | না | অ্যাপ যে capability চায়; প্যাকেজের ভিতরের manifest-এর superset হতে হবে |
| `developer` | `object` | হ্যাঁ | `name` এবং `website` ফিল্ড সহ অবজেক্ট |
| `package` | `object` | হ্যাঁ | `url`, `size`, `sha256`, `signature`, `signer` (ও ঐচ্ছিক `path`) ফিল্ড সহ অবজেক্ট |
| `media` | `object` | হ্যাঁ | `iconUrl` এবং `screenshots` অ্যারে |

> **বাধ্যতামূলক:** প্রতিটি প্রকাশিত প্যাকেজে `package.signature` ও `package.signer` থাকতে হবে। Release gate archive-এর ভিতরের `manifest.json`-এর id, version, entry point ও permissions প্রকাশিত manifest-এর সাথে মিলিয়ে দেখে; মিল না থাকলে, বা remote URL অপ্রাপ্য হলে, verification ব্যর্থ হয়।

---

## অনুমোদিত ক্যাটাগরি তালিকা

- `utilities` (ইউটিলিটি ও সিস্টেম টুলস)
- `productivity` (নোটস, অফিস ও প্রডাক্টিভিটি)
- `developer-tools` (আইডিই, কম্পাইলার ও ডিবাগার)
- `media` (অডিও, ভিডিও ও ইমেজ প্লেয়ার)
- `education` (শিক্ষা ও গবেষণা)
- `system` (কার্নেল ও সিস্টেম ডেবন)
