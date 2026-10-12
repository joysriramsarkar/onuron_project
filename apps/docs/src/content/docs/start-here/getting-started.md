---
title: শুরু করুন
description: অনুরণ ইকোসিস্টেমে কোথা থেকে শুরু করবেন — আপনার ভূমিকা অনুযায়ী পথ।
---

অনুরণ (Onuron) একটি স্বাধীন ইকোসিস্টেম: একটি ভাষা, একটি অপারেটিং সিস্টেম, একটি
UI ফ্রেমওয়ার্ক, একটি ডেভ-এমুলেটর এবং একটি অ্যাপ স্টোর। এই পৃষ্ঠা আপনার ভূমিকা
অনুযায়ী সঠিক শুরু-বিন্দু দেখায়।

---

## ১. এক নজরে

- **nilLang** (Go) — canonical ভাষা। সবকিছুর ভিত্তি।
- **onuronOS** (Rust/Go/C) — Linux-ভিত্তিক মোবাইল OS।
- **alap-framework** (Go) — ক্রস-প্ল্যাটফর্ম UI/অ্যাপ ফ্রেমওয়ার্ক (early-alpha)।
- **nilos-emulator** (Go) — NilOS Studio ডেভ-এমুলেটর।
- **onuron_project** (TypeScript) — স্টোর, ডকস ও রেজিস্ট্রি।

---

## ২. ভূমিকা অনুযায়ী পথ

### আমি ভাষা শিখতে চাই
1. [nil টিউটোরিয়াল](/nil/tutorial/)
2. [টাইপ ও মেমোরি](/nil/types-and-memory/)
3. [কনকারেন্সি](/nil/concurrency/) · [এরর হ্যান্ডলিং](/nil/error-handling/)
4. [স্ট্যান্ডার্ড লাইব্রেরি](/nil/standard-library/)

### আমি OS-এ অ্যাপ চালাতে চাই
1. [onuronOS শুরু করুন](/os/getting-started/)
2. [বুট প্রক্রিয়া](/os/boot-process/)
3. [প্যাকেজ ম্যানেজার](/os/package-manager/)

### আমি ডিক্লেয়ারেটিভ UI অ্যাপ বানাতে চাই
1. [alap প্রথম অ্যাপ](/alap/first-app/)
2. [কম্পোনেন্ট ও স্টাইলিং](/alap/components-and-styling/)
3. [alap আর্কিটেকচার](/alap/architecture/)

### আমি এমুলেটরে টেস্ট করতে চাই
1. [এমুলেটর শুরু করুন](/emulator/getting-started/)
2. [NilHost Protocol](/emulator/protocol/)
3. [ডিবাগিং](/emulator/debugging/)

### আমি স্টোরে অ্যাপ প্রকাশ করতে চাই
1. [ডেভেলপার সাবমিশন গাইড](/store/developer-guide/)
2. [ম্যানিফেস্ট স্পেসিফিকেশন](/store/manifest-spec/)
3. [যাচাই পাইপলাইন](/store/verification/)

---

## ৩. সৎ প্রত্যাশা (গুরুত্বপূর্ণ)

- এটি একটি **সক্রিয়, কর্মপ্রবাহী** ইকোসিস্টেম — সবকিছু production-ready নয়।
- কোনো কম্পোনেন্ট এখনো **physical device-এ যাচাই হয়নি**; onuronOS QEMU-তে।
- স্টোরের সব অ্যাপ **Reference / Developer Preview** (`releaseStage: reference`)।
- alap-framework **canonical নয়** — তার নিজস্ব ডায়ালেক্ট ব্যবহার করে, যা canonical-এ অভিসৃত হবে।

সম্পূর্ণ চিত্র: [পরিপক্বতা ম্যাপ](/reference/maturity/)।

---

## ৪. পরবর্তী পড়ুন

- [ইকোসিস্টেম পরিচিতি](/start-here/ecosystem/)
- [শব্দকোষ](/start-here/glossary/)
- [সাধারণ প্রশ্ন (FAQ)](/start-here/faq/)
