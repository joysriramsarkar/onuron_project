---
title: Canonical স্পেসিফিকেশন সূচি
description: nilLang রিপোজিটরির docs/spec-এ থাকা canonical নথিগুলোর সূচি ও ভূমিকা।
---

ভাষা ও রানটাইমের **একক সত্য-উৎস** হলো canonical বাস্তবায়ন **nilLang (Go)**-এর
`docs/spec/` নথিগুলো। নিচের সূচিটি দেখায় কোথায় কী আছে; ডুপ্লিকেট না করে এগুলোতে
cross-link করুন।

> পাথগুলো `nilLang/docs/spec/`-এর relative।

---

## ১. ভাষা ও সেমান্টিক্স

| নথি | ভূমিকা |
|---|---|
| `LANGUAGE_SPEC.md` | গ্রামার/সিনট্যাক্স (keyword, literal, EBNF §2–§4) |
| `LANGUAGE_SPEC_CANONICAL.md` | canonical ভাষা-চুক্তি (ভার্সনড) |
| `SEMANTICS.md` | সেমান্টিক্স — যেমন `let` = mutable, `const` = immutable |
| `TYPE_SYSTEM.md` | টাইপ সিস্টেম, sized type, assignability |
| `MEMORY_MODEL.md` | মেমোরি মডেল ও ownership |
| `MODULE_SYSTEM.md` | মডিউল/import |
| `ERROR_MODEL.md` | error model (`Result`, `Option`, `match`) |
| `SYNTACTIC_DIAGNOSTICS.md` | syntactic diagnostic কোড (`E0001–E0005`) |

---

## ২. ক্ষমতা ও প্রভাব

| নথি | ভূমিকা |
|---|---|
| `CAPABILITIES.md` | capability vocabulary ও প্রয়োগ |
| `EFFECTS.md` | effect system (পরিকল্পিত/আংশিক) |
| `CONCURRENCY.md` | task/actor/channel কনকারেন্সি মডেল |

---

## ৩. UI, ক্যাটালগ ও প্ল্যাটফর্ম

| নথি | ভূমিকা |
|---|---|
| `UI_SPEC.md` | UI/component মডেল ও রেন্ডার |
| `CATALOG.md` | NilUI কম্পোনেন্ট ক্যাটালগ (৫৪টি এন্ট্রি) |
| `DEVICE_MATRIX.md` | টার্গেট ডিভাইস matrix |
| `MOBILE_RUNTIME.md` | মোবাইল runtime |
| `ONURON_SHELL.md` | Onuron shell (`nilshell`) |
| `ARCHITECTURE.md` | কম্পাইলার/Runtime আর্কিটেকচার |

---

## ৪. ডায়াগনস্টিক কোড (canonical)

- Syntactic: `E0001–E0005`
- Semantic: `E0102` (undefined identifier in assignment), `E0104` (assign to constant)
- Capability: `E0201` (CapabilityViolation)

compiler **কখনো panic করে না** — সব ত্রুটি diagnostic আকারে রিপোর্ট হয়।

---

## ৫. সম্পর্কিত ডক

- [nil কম্প্যাটিবিলিটি](/nil/compatibility/)
- [nil টুলচেইন](/nil/toolchain/)
- [nil স্ট্যান্ডার্ড লাইব্রেরি](/nil/standard-library/)
- [পরিপক্বতা ম্যাপ](/reference/maturity/)

---

## ৬. পরবর্তী পড়ুন

- [শুরু করুন](/start-here/getting-started/)
- [লাইসেন্সিং](/reference/licensing/)
