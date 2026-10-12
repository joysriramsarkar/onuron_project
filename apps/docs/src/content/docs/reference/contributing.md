---
title: কনট্রিবিউশন গাইড
description: ইকোসিস্টেমে অবদান রাখা, প্রমাণ-ভিত্তিক দাবির নিয়ম এবং প্রতিটি রিপোর CI গেট।
---

এই ইকোসিস্টেমের সবচেয়ে গুরুত্বপূর্ণ অবদান-নিয়ম: **bug fix, test ও ডক নতুন
ফিচারের চেয়ে অগ্রাধিকার পায়**।

---

## ১. কোন রিপোতে কী

| রিপোজিটরি | ভাষা | অবদানের ক্ষেত্র |
|---|---|---|
| `nilLang` | Go | canonical ভাষা, VM, std, spec |
| `onuronOS` | Rust/Go/C | OS, services, nilpkg, nilshell |
| `alap-framework` | Go | UI framework (canonical-এ অভিসৃত) |
| `nilos-emulator` | Go | ডেভ-টুল, NilHost, HAL |
| `onuron_project` | TypeScript/Astro | store, docs, registry |

---

## ২. প্রমাণ-ভিত্তিক নিয়ম (বাধ্যতামূলক)

কোনো পরিপক্বতা বা ফিচার-দাবি করলে **প্রমাণ** দিন:

- একটি নির্দিষ্ট সোর্স ফাইল, এবং
- সেটি চালানো একটি passing test বা CI workflow।

"একটি ডিরেক্টরি আছে" বা "কোড কম্পাইল করে" — এগুলো **প্রমাণ নয়**।
ভুয়া/placeholder ডেটা কখনো commit করবেন না।

---

## ৩. রিপো-ভিত্তিক CI গেট (merge-এর আগে সবুজ হতে হবে)

| রিপোজিটরি | গেট |
|---|---|
| nilLang | CI + lint; cross-engine conformance (`tests/crossruntime/`); capability test |
| onuronOS | `linux-qemu.yml` (x86_64+aarch64 boot+persistence), `security-audit.yml`, `code-quality.yml`, `selinux.yml` |
| alap-framework | `go vet ./...` + `go test ./...` + `bin/{nil,nilc,nills}` build |
| nilos-emulator | `go vet ./...` + `go test ./...` (ubuntu/windows/macos) |
| onuron_project | `validate` + `validate:verify`; docs build |

---

## ৪. workflow

1. একটি শাখা তৈরি করুন এবং পরিবর্তন করুন।
2. স্থানীয়ভাবে সংশ্লিষ্ট গেট চালান (যেমন `go vet ./...`, `pnpm ... validate`).
3. commit-এ পরিবর্তনটি স্পষ্টভাবে বর্ণনা করুন।
4. pull request খুলুন; CI সবুজ হলে merge।

> **নোট:** maintainer প্রয়োজনে সরাসরি `main`-এ ছোট fix করতে পারেন, তবে বৈশিষ্ট্যপূর্ণ
> পরিবর্তন PR-পথেই আসে।

---

## ৫. ডক-অবদান

- ডক বাংলায়, কিন্তু কোড-উদাহরণ **আসল ও canonical** হতে হবে।
- পুরনো/ভুল উদাহরণ (যেমন অস্তিত্বহীন কমান্ড) ঠিক করা একটি গুরুত্বপূর্ণ অবদান।
- canonical স্পেসিফিকেশনের দিকে cross-link করুন, কপি করে ডুপ্লিকেট করবেন না।

---

## ৬. লাইসেন্স

- `contributions` সংশ্লিষ্ট রিপোর `LICENSE`-এর অধীনে।
- `alap-framework` ও `nilos-emulator` MIT carve-out-এ — [লাইসেন্সিং](/reference/licensing/)।

---

## ৭. পরবর্তী পড়ুন

- [রোডম্যাপ](/reference/roadmap/)
- [পরিপক্বতা ম্যাপ](/reference/maturity/)
- [নিরাপত্তা নীতি](/reference/security-policy/)
