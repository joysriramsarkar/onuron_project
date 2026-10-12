---
title: Onuron Ecosystem Documentation
description: onuronOS, nilLang, alap-framework, nilos-emulator ও App Store-এর সম্পূর্ণ গাইড, স্পেসিফিকেশন ও টিউটোরিয়াল।
template: splash
hero:
  tagline: সার্বভৌম উন্মুক্ত কম্পিউটিং ইকোসিস্টেম — Linux LTS-ভিত্তিক মোবাইল OS, স্মৃতি-নিরাপদ প্রোগ্রামিং ভাষা এবং রিঅ্যাক্টিভ অ্যাপ্লিকেশন ফ্রেমওয়ার্ক।
  actions:
    - text: ইকোসিস্টেম দ্রুত শুরু
      link: /start-here/getting-started/
      icon: rocket
      variant: primary
    - text: onuronOS গাইড
      link: /os/architecture/
      icon: open-book
    - text: nilLang টিউটোরিয়াল
      link: /nil/tutorial/
      icon: document
---

## এই ডকুমেন্টেশন সম্পর্কে

এই সাইটটি অনুরণ (Onuron) ইকোসিস্টেমের **পাঁচটি প্রকৌশল প্রকল্পের** কেন্দ্রীয় টেকনিক্যাল ডকুমেন্টেশন। প্রতিটি ফিচারের **বাস্তব পরিপক্বতা (maturity)** সৎভাবে উল্লেখ করা হয়েছে — কোড বা ডিরেক্টরি থাকা মানেই ফিচার তৈরি হয়ে গেছে এমন দাবি এখানে করা হয় না।

> **রিয়েলিটি নীতি:** ফিচারগুলো পাঁচটি শ্রেণিতে বিভক্ত — `Production`, `Functional Prototype`, `Experimental`, `Stub / Simulated`, `Not Implemented`। সম্পূর্ণ ম্যাপ দেখুন [ইকোসিস্টেম পরিপক্বতা ম্যাপ](/reference/maturity/)।

---

## 🧭 ইকোসিস্টেমের পাঁচটি প্রকল্প

| প্রকল্প | ভূমিকা | প্রযুক্তি | পরিপক্বতা |
|---|---|---|---|
| **onuronOS** | স্বাধীন Linux LTS-ভিত্তিক মোবাইল অপারেটিং সিস্টেম | Rust (userspace), C, Linux 6.6 LTS | Functional Prototype (QEMU) |
| **nilLang** | ক্যানোনিক্যাল সিস্টেম ও অ্যাপ প্রোগ্রামিং ভাষা | Go | Production (host-only) |
| **alap-framework** | ডিক্লেয়ারেটিভ UI ফ্রেমওয়ার্ক ও টুলচেইন | Go | Experimental (early-alpha) |
| **nilos-emulator** | অ্যাপ-রানটাইম ডেভেলপমেন্ট এমুলেটর | Go | Functional Prototype (host-only) |
| **onuron_project** | ওয়েব প্ল্যাটফর্ম, ডকুমেন্টেশন ও App Store রেজিস্ট্রি | TypeScript, Astro | Functional Prototype |

---

## 🚀 দ্রুত শুরু করুন

- **[ইকোসিস্টেম দ্রুত শুরু](/start-here/getting-started/)** — কোন প্রকল্প কোথায় শুরু করবেন।
- **[ইকোসিস্টেম ম্যাপ](/start-here/ecosystem/)** — প্রকল্পগুলোর সম্পর্ক ও নির্ভরতা।
- **[পরিভাষা (Glossary)](/start-here/glossary/)** — nilinit, NilHAL, nilrt, nilshell, `.nilax` ইত্যাদির সংজ্ঞা।
- **[সাধারণ প্রশ্ন (FAQ)](/start-here/faq/)** — সত্য-ভিত্তিক সংক্ষিপ্ত উত্তর।

### onuronOS

onuronOS হলো একটি স্বাধীন, Linux LTS কার্নেল-ভিত্তিক মোবাইল OS — **AOSP fork নয়**। নেটিভ স্ট্যাক:

```text
Linux LTS 6.6 → nilinit (PID 1) → NilHAL → Onuron সিস্টেম সার্ভিস
→ runtime/nilrt (sandbox) → NilLang + Alap + NilUI → signed .nilax অ্যাপ
```

- [onuronOS আর্কিটেকচার](/os/architecture/)
- [বুট প্রক্রিয়া](/os/boot-process/)
- [নিরাপত্তা ও স্যান্ডবক্সিং](/os/security/)
- [প্যাকেজ ম্যানেজার (`nilpkg`) ও `.nilax`](/os/package-manager/)
- [টার্মিনাল (`nilshell`)](/os/terminal/)

> উন্নয়ন বর্তমানে **QEMU**-তে হয়। কোনো প্রকৃত ফোনে (physical device) এখনো যাচাই করা হয়নি। [রেফারেন্স বোর্ড](/os/hardware-support/) দেখুন।

### nilLang (ক্যানোনিক্যাল)

nilLang-এর ক্যানোনিক্যাল বাস্তবায়ন Go-তে (`nilLang/`)। ভাষার কনফরম্যান্স কে-ফ্রিজ (`CORE_FREEZE.md`) দ্বারা সুরক্ষিত।

```nil
let appName = "Hello Onuron";
let version = "1.0.0";

puts("\(appName) v\(version)");

let fibonacci = fn(n) {
    if (n < 2) { return n; }
    return fibonacci(n - 1) + fibonacci(n - 2);
};

let i = 0;
while (i < 10) {
    puts("fib(\(i)) = \(fibonacci(i))");
    i = i + 1;
}
```

- [nilLang টিউটোরিয়াল](/nil/tutorial/)
- [টাইপ সিস্টেম ও মেমরি](/nil/types-and-memory/)
- [স্ট্যান্ডার্ড লাইব্রেরি](/nil/standard-library/)
- [কনকারেন্সি মডেল](/nil/concurrency/)
- [এরর মডেল](/nil/error-handling/)
- [ক্যাপাবিলিটি ও ইফেক্ট](/nil/capabilities-and-effects/)
- [নিল এবং অন্যান্য রানটাইমের কম্প্যাটিবিলিটি](/nil/compatibility/)

### alap-framework

alap-framework একটি **প্রারম্ভিক-আলফা (early-alpha) ডিক্লেয়ারেটিভ UI ফ্রেমওয়ার্ক প্রোটোটাইপ**। এটি এর নিজস্ব কম্পাইলার/VM বাড়ানোর বদলে ক্যানোনিক্যাল nilLang-এর দিকে অভিসৃত (converge) হচ্ছে — বিস্তারিত [সম্পর্ক নথি](/alap/architecture/)।

- [প্রথম অ্যাপ](/alap/first-app/)
- [কম্পোনেন্ট ও স্টাইলিং](/alap/components-and-styling/)
- [ওয়েব ফ্রেমওয়ার্ক](/alap/web-framework/)
- [SSR ও হাইড্রেশন](/alap/ssr-and-hydration/)
- [ডেটা লেয়ার ও ORM](/alap/orm-and-database/)
- [অথেনটিকেশন ও সিকিউরিটি](/alap/auth-and-security/)
- [alap CLI](/alap/cli/)

### অ্যাপ স্টোর ও রেজিস্ট্রি

প্রতিটি প্রকাশিত প্যাকেজ **বাধ্যতামূলকভাবে স্বাক্ষরিত**। বর্তমান অ্যাপগুলো **Reference / Developer Preview**।

- [ডেভেলপার সাবমিশন গাইড](/store/developer-guide/)
- [ম্যানিফেস্ট স্পেসিফিকেশন](/store/manifest-spec/)
- [প্যাকেজ ফরম্যাট (`.nilax` / `.onp`)](/store/package-format/)
- [ভেরিফিকেশন পাইপলাইন](/store/verification/)
- [রেজিস্ট্রি API](/store/registry-api/)

### nilos-emulator

- [এমুলেটর দ্রুত শুরু](/emulator/getting-started/)
- [আর্কিটেকচার](/emulator/architecture/)
- [NilHost প্রোটোকল](/emulator/protocol/)
- [ভার্চুয়াল হার্ডওয়্যার (NilHAL)](/emulator/hal/)
- [ডিবাগিং (LSP / DAP)](/emulator/debugging/)

---

## 🏛️ প্রকৌশল মূলনীতি

1. **সার্বভৌমত্ব (Sovereignty)** — বড়-টেক নির্ভরতা বা ক্লাউড ট্র্যাকিং নেই; সোর্স কোড ও বিল্ড পুনরুৎপাদনযোগ্য (reproducible)।
2. **স্মৃতি নিরাপত্তা (Memory Safety)** — onuronOS-এর userspace Rust-এ এবং nilLang স্ট্যাটিক টাইপ-চেকিং দ্বারা সুরক্ষিত।
3. **ক্রিপ্টোগ্রাফিক ভেরিফিকেশন** — প্রতিটি `.nilax`/`.onp` প্যাকেজ SHA-256 + Ed25519 দ্বারা যাচাইকৃত।
4. **ইন্টারনেট-মুক্ত টেলিমেট্রি** — ব্যক্তিগত ডেটা ডিভাইস ছাড়ে না ([Zero-Telemetry চার্টার](/os/security/))।

---

## 📚 সূত্র (Source of Truth)

- [ইকোসিস্টেম পরিপক্বতা ম্যাপ](/reference/maturity/)
- [রোডম্যাপ](/reference/roadmap/)
- [লাইসেন্স নীতি](/reference/licensing/)
- [নিরাপত্তা নীতি](/reference/security-policy/)
- [ক্যানোনিক্যাল স্পেসিফিকেশন](/reference/specs/)
