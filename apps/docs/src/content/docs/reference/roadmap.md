---
title: রোডম্যাপ ও রিলিজ গেট
description: ভেরিফায়েবল ফেজ (A–E), প্রতিটির acceptance criteria এবং একত্রিত release gate।
---

এই রোডম্যাপ ইচ্ছা-তালিকার বদলে **যাচাইযোগ্য ফেজ** ব্যবহার করে। প্রতিটি ফেজ
প্রমাণ (passing test/workflow) দিয়ে শেষ হয়, যার উপর পরের ফেজ নির্ভর করে।

> **মূল নিয়ম:** একটি ফেজ "সম্পন্ন" যখন তার acceptance criteria **CI-তে পাশ করে**,
> কোড থাকলেই নয়।

উৎস: [`docs/ROADMAP.md`](https://github.com/joysriramsarkar/onuron_project/blob/main/docs/ROADMAP.md)।

---

## Phase A — Release scope ও stability

**লক্ষ্য:** `0.1` core freeze করা ও regression detection স্বয়ংক্রিয় করা।

- [ ] nilLang `0.1` core frozen; spec পরিবর্তন ছাড়া নতুন syntax নয়।
- [ ] onuronOS, nilos-emulator, onuron_project — প্রত্যেকের নিজস্বলিখিত acceptance criteria।
- [ ] CI-প্রমাণিত প্রতিটি আচরণ regression gate-এ রাখা।
- [ ] bug fix, test ও ডক নতুন ফিচারের চেয়ে অগ্রাধিকার পায়।

---

## Phase B — Canonical NilLang contract

**লক্ষ্য:** একটি versioned language contract, এবং feature-tagged প্রমাণ যে প্রতিটি
রানটাইম ঠিক যতটুকু দাবি করে ততটুকুই ইমপ্লিমেন্ট করে।

- [ ] ২১টি cross-engine conformance প্রোগ্রাম পাশ করে (evaluator + VM)।
- [ ] প্রতিটি প্রোগ্রাম **feature-tagged** (`core`, `control-flow`, `functions`, `stdlib`, `errors`)।
- [ ] `runtime/nillang` (Rust) UI-app subset tag স্বয়ংক্রিয়ভাবে পাশ করে।
- [ ] Alap-এর সমর্থিত ফিচার tag করে **একই** harness-এ চালানো।
- [ ] স্থিতিশীল `.nilax`/bytecode ভার্সন + runtime compatibility contract ঘোষণা।
- [ ] Alap canonical nilLang compiler/runtime প্যাকেজ import শুরু করে।

---

## Phase C — One true native app

**লক্ষ্য:** ঠিক একটি reference app (প্রস্তাব: **Calculator**, তারপর **Notes**) কে
logic demo থেকে সত্যিকারের interactive, persistent অ্যাপে উন্নীত করা।

- [ ] আসল UI: user input, live display, সঠিক error handling।
- [ ] canonical `nil` toolchain দিয়ে সোর্স থেকে বিল্ড।
- [ ] প্যাকেজ তৈরি, size+SHA-256, **সাইনড** ও verified।
- [ ] archive↔manifest মিল (id, version, entry, permissions)।
- [ ] install, launch ও end-to-end পরিচালনা।
- [ ] Persistent storage — process restart-এ ডেটা টিকে থাকে।
- [ ] একই আচরণ emulator ও onuronOS দুই জায়গায়।

---

## Phase D — OS ও emulator integration

**লক্ষ্য:** বাধ্যতামূলক OS-স্তরের ইন্টিগ্রেশন টেস্ট, Phase C অ্যাপ দিয়ে — mock নয়।

- [ ] QEMU boot, disk persistence ও **recovery** release gate-এ:
      `onuron.recovery=1` recovery-তে ঢোকে; ধারাবাহিক failed boot স্বয়ংক্রিয়ভাবে
      recovery-তে যায়; corrupt `/data` পরিষ্কার error দেয়।
- [ ] অ্যাপ `nilpkg` দিয়ে install, `nilrt` দিয়ে launch, এবং declared
      **permissions enforced**।
- [ ] failed/upgraded প্যাকেজ আগের ভার্সনে **rollback**, ডেটা অক্ষত।
- [ ] corrupt/untrusted signature-যুক্ত প্যাকেজ **প্রত্যাখ্যাত**।
- [ ] nilos-emulator canonical-compiler-built Phase C অ্যাপ চালায় — MockVM-only
      output প্রমাণ নয়।

---

## Phase E — Release readiness

**লক্ষ্য:** রিলিজ "ready" হওয়ার আগে একটি একত্রিত সবুজ gate।

- [ ] Linux/Windows/macOS CI (প্রযোজ্যসমূহে)।
- [ ] onuronOS QEMU x86_64 **এবং** aarch64 boot + persistence + recovery।
- [ ] বাধ্যতামূলক প্যাকেজ সিগনেচার যাচাই (`validate:verify`)।
- [ ] Archive integrity + archive↔manifest মিল।
- [ ] [লাইসেন্স](/reference/licensing/) নীতির সাথে সঙ্গতিপূর্ণ licence audit।
- [ ] Multi-component integration test (অ্যাপ emulator **ও** OS-এ চলে)।

কোনো গুরুত্বপূর্ণ টেস্ট skip বা fail হলে রিলিজ **ready নয়**।

---

## পরবর্তী তিনটি কাজ (বর্তমান অগ্রাধিকার)

1. **একটি আসল native reference app** (Calculator/Notes) → Phase C।
2. **Cross-runtime conformance স্বয়ংক্রিয় করা** → Phase B।
3. **OS release gate ও ডক একসাথে বন্ধ করা** → Phase D ও E।

---

## পরবর্তী পড়ুন

- [পরিপক্বতা ম্যাপ](/reference/maturity/)
- [যাচাই পাইপলাইন](/store/verification/)
