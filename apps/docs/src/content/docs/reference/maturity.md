---
title: ইকোসিস্টেম পরিপক্বতা ম্যাপ
description: প্রতিটি কম্পোনেন্টের সৎ পরিপক্বতা, প্রমাণ এবং সীমাবদ্ধতার সারসংক্ষেপ।
---

এই পৃষ্ঠাটি পুরো ইকোসিস্টেমের পরিপক্বতার একক সত্য-উৎস
([`docs/ECOSYSTEM_MATURITY.md`](https://github.com/joysriramsarkar/onuron_project/blob/main/docs/ECOSYSTEM_MATURITY.md))-এর
সারসংক্ষেপ।

> **নিয়ম:** প্রতিটি দাবির পিছনে **প্রমাণ** থাকতে হবে — একটি নির্দিষ্ট সোর্স ফাইল
> এবং সেটি চালানো passing test/CI workflow। "একটি ডিরেক্টরি আছে" — এটা প্রমাণ নয়।

---

## ১. পরিপক্বতা স্তর

| স্তর | অর্থ |
|---|---|
| **Production** | স্থিতিশীল, ভালোভাবে পরীক্ষিত, আসল অ্যাপের উপযোগী |
| **Functional Prototype** | মূল পথ কাজ করে ও পরীক্ষিত, কিন্তু অসম্পূর্ণ |
| **Experimental** | প্রাথমিক; ইন্টারফেস বদলাতে পারে |
| **Stub / Simulated** | প্লেসহোল্ডার বা স্পষ্টভাবে simulated |
| **Not Implemented** | এখনো নেই |

**Hardware validation:** Host-only · QEMU · Physical-device tested।

> **বর্তমানে কোনো কম্পোনেন্ট `physical-device tested` নয়।** onuronOS QEMU-তে
> তৈরি ও পরীক্ষিত।

---

## ২. কম্পোনেন্ট সারসংক্ষেপ

| কম্পোনেন্ট | অবস্থা | ভাষা | Hardware validation |
|---|---|---|---|
| **nilLang** | Production (canonical) | Go | Host-only |
| **onuronOS** | Functional Prototype | Rust/Go/C | QEMU (x86_64 + aarch64) |
| **runtime/nillang** | Functional Prototype (subset) | Rust | QEMU |
| **alap-framework** | Experimental (early-alpha) | Go | Host-only |
| **nilos-emulator** | Functional Prototype | Go | Host-only |
| **onuron_project** | Functional Prototype | TypeScript | N/A |
| **Terminal (in `nilshell`)** | Functional Prototype | Rust | QEMU |

---

## ৩. মূল নীতি (Key decisions)

1. **nilLang (Go) canonical** — সব রানটাইম এর সাথে compatibility লক্ষ্য করে।
2. **`runtime/nillang` একটি ইচ্ছাকৃত subset** — drop-in replacement নয়।
3. **alap-framework canonical-এ অভিসৃত হবে** — নিজস্ব compiler/VM আর বাড়ানো হবে না।
4. **nilos-emulator MockVM ব্যবহার করে** — ডেভ-টুল, production runtime নয়।
5. **প্রকাশিত স্টোর অ্যাপ = Reference / Developer Preview** — `releaseStage: reference`।
6. **প্রতিটি প্রকাশিত প্যাকেজ সাইনড**; অনুপলব্ধ remote প্যাকেজকে সাফল্য ধরা হয় না।

---

## ৪. সম্পর্ক-চিত্র

```text
              ┌─────────────────┐
              │   nilLang (Go)  │  ← canonical
              │   Production    │
              └────────┬────────┘
                       │ (others target compatibility)
     ┌─────────────────┼──────────────────┐
     ▼                 ▼                  ▼
┌──────────┐   ┌───────────────┐   ┌───────────────┐
│ onuronOS │   │alap-framework │   │nilos-emulator │
│ Function │   │ Experimental  │   │  Functional   │
└────┬─────┘   └───────────────┘   └───────────────┘
     │
     ▼
┌──────────────────┐
│ runtime/nillang  │  ← Rust subset, OS-embedded
└────────┬─────────┘
         ▼
┌──────────────────┐
│ nilshell         │  ← terminal lives here (no separate repo)
└──────────────────┘
```

---

## ৫. পরিচিত সীমাবদ্ধতা (সারসংক্ষেপ)

- **nilLang:** cross-engine suite শুধু দুই Go engine কভার করে; Rust subset ও Alap
  স্বয়ংক্রিয়ভাবে তুলনা হয় না। `try`/`catch`, generic traits, full effect checking অসম্পূর্ণ।
- **onuronOS:** recovery boot ও IPC authorization injected-failure-এ সম্পূর্ণ
  exercised নয়; package rollback আংশিক; GPU/audio/camera ব্যাকএন্ড নেই।
- **runtime/nillang:** পূর্ণ expression/control-flow/stdlib নেই।
- **alap-framework:** type checker নন-নিষেধক; error handling/concurrency/capability সীমিত।
- **nilos-emulator:** real hardware emulation নেই; MockVM।
- **onuron_project:** স্টোর backend/real submission/payment নেই; অ্যাপ reference-level।

সম্পূর্ণ প্রমাণ-ভিত্তিক বিশ্লেষণ: [রোডম্যাপ](/reference/roadmap/), [`docs/ECOSYSTEM_MATURITY.md`](https://github.com/joysriramsarkar/onuron_project/blob/main/docs/ECOSYSTEM_MATURITY.md)।

---

## ৬. পরবর্তী পড়ুন

- [রোডম্যাপ ও রিলিজ গেট](/reference/roadmap/)
- [লাইসেন্সিং](/reference/licensing/)
- [canonical স্পেসিফিকেশন](/reference/specs/)
