---
title: ইকোসিস্টেম পরিচিতি
description: পাঁচটি রিপোজিটরি, তাদের ভূমিকা এবং কীভাবে তারা একসাথে কাজ করে।
---

অনুরণ ইকোসিস্টেম পাঁচটি রিপোজিটরির সমন্বয়। প্রত্যেকের স্পষ্ট সীমানা ও ভূমিকা আছে।

---

## ১. রিপোজিটরিসমূহ

| রিপোজিটরি | ভাষা | ভূমিকা | অবস্থা |
|---|---|---|---|
| **nilLang** | Go | canonical ভাষা, compiler, VM, std, spec | Production |
| **onuronOS** | Rust/Go/C | Linux-ভিত্তিক মোবাইল OS | Functional Prototype |
| **alap-framework** | Go | UI/অ্যাপ ফ্রেমওয়ার্ক (early-alpha) | Experimental |
| **nilos-emulator** | Go | ডেভ-এমুলেটর (NilOS Studio) | Functional Prototype |
| **onuron_project** | TypeScript | স্টোর, ডকস, রেজিস্ট্রি | Functional Prototype |

---

## ২. সম্পর্ক

```text
nilLang (Go, canonical)
   │  অন্যদের compatibility লক্ষ্য
   ├────────────► onuronOS ──► runtime/nillang (Rust subset) ──► nilshell
   ├────────────► alap-framework (canonical-এ অভিসৃত হবে)
   └────────────► nilos-emulator (MockVM ডেভ-টুল)

onuron_project ──► onuronOS (স্টোর অ্যাপ .nilax ইনস্টল করে)
```

- **Terminal** `onuronOS`-এর `nilshell`-এ; **আলাদা রিপো নেই**।
- alap-framework তার নিজস্ব compiler/VM রাখে, যা ধাপে ধাপে canonical-এ যাবে।

---

## ৩. ডেটা ও আর্টিফ্যাক্ট প্রবাহ

```text
.nil source  ──nil build──►  .nilax (ZIP) / .onp (tar)
                                   │  sign (Ed25519)
                                   ▼
                        onuron_project registry
                                   │
                   install ────► onuronOS (nilpkg)  বা  emulator (Studio)
```

- `.nilax` — universal bundle (ZIP); `.onp` — nilpkg (tar)।
- সব প্রকাশিত প্যাকেজ **সাইনড**; গেট archive↔manifest মিল যাচাই করে।

বিস্তারিত: [প্যাকেজ ফরম্যাট](/store/package-format/)।

---

## ৪. একে অপরকে কী দেয়

| থেকে | প্রতি | কী |
|---|---|---|
| nilLang | সব | ভাষা চুক্তি ও canonical behavior |
| onuron_project | onuronOS | স্টোর রেজিস্ট্রি ও signed `.nilax` |
| nilos-emulator | ডেভেলপার | OS ছাড়া অ্যাপ টেস্ট ও ডিবাগ |
| alap-framework | onuronOS/অন্য | UI কম্পোনেন্ট ও অ্যাপ মডেল |
| onuronOS | ব্যবহারকারী | চালু OS, services ও shell |

---

## ৫. পরবর্তী পড়ুন

- [শুরু করুন](/start-here/getting-started/)
- [পরিপক্বতা ম্যাপ](/reference/maturity/)
- [লাইসেন্সিং](/reference/licensing/)
