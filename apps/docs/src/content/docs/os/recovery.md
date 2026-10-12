---
title: রিকভারি, A/B স্লট ও রোলব্যাক
description: onuronOS-এর transactional OTA, anti-rollback এবং failed-boot recovery পথ।
---

onuronOS system image immutable রাখে এবং আপডেট dual-slot (A/B) transactional
পদ্ধতিতে দেয় — অর্থাৎ আপডেট কখনোই চলমান, ভালো সিস্টেমকে সরাসরি নষ্ট করে না।

---

## ১. A/B স্লট

| স্লট | পার্টিশন | ভূমিকা |
|---|---|---|
| A | `system_a`, `boot_a`, `vendor_a` | সক্রিয় বা পূর্ববর্তী |
| B | `system_b`, `boot_b`, `vendor_b` | নিষ্ক্রিয় বা নতুন |

আপডেট নিষ্ক্রিয় স্লটে লেখা হয়; সুস্থ boot সাব্যস্ত হলে স্লট বদল (switch) হয়।

---

## ২. OTA ফ্লো (`nilupd`)

```text
নতুন signed OTA ডাউনলোড
   → UpdateManifest যাচাই (Ed25519)
   → anti-rollback: rollback_index ≥ running?
        না হলে → প্রত্যাখ্যান
   → নিষ্ক্রিয় স্লটে লেখা
   → বুট-পরে স্লট switch
   → সুস্থ boot সাব্যস্ত?
        হ্যাঁ → active স্লট চূড়ান্ত
        না   → পূর্ববর্তী স্লটে রোলব্যাক
```

**Anti-rollback:** `UpdateManifest.rollback_index` চলমান ইমেজের চেয়ে কম হলে
আপডেট বাতিল — পুরনো (দুর্বল) ইমেজে ফিরিয়ে দেওয়া আটকায়।

---

## ৩. রিকভারি মোড

- `onuron.recovery=1` বুট-অপশন রিকভারি এনভায়রনমেন্টে ঢোকে।
- পর্যটনক্রমে ব্যর্থ বুট রিকভারিতে নিয়ে যায়।
- corrupt `/data` স্পষ্ট এরর দেয় (silent wipe নয়)।

লক্ষ্য: রিকভারি একটি **standalone** পরিবেশ, যা `/system` ছাড়াও কাজ করে।

---

## ৪. প্যাকেজ রোলব্যাক (`nilpkg`)

অ্যাপ-স্তরেও একই নীতি: upgrade ব্যর্থ বা নতুন বিল্ড boot-fail হলে পূর্বের ভার্সনে
rollback, এবং **পূর্বের ডেটা অক্ষত** থাকে। cross-process lock ও crash-recovery
journal এ সহায়তা করে। বিস্তারিত: [প্যাকেজ ম্যানেজার](/os/package-manager/)।

---

## ৫. বর্তমান অবস্থা (সৎভাবে)

| দাবি | অবস্থা |
|---|---|
| QEMU boot + persistence | ✅ proven (release gate) |
| A/B slot logic | 🔵 Functional Prototype |
| anti-rollback verification | 🔵 Functional Prototype |
| recovery boot path (injected failure) | 🟡 আংশিক / রোডম্যাপ ফেজ D |
| package rollback with data intact | 🟡 আংশিক / রোডম্যাপ ফেজ D |

---

## ৬. পরবর্তী পড়ুন

- [প্যাকেজ ম্যানেজার](/os/package-manager/)
- [রোডম্যাপ](/reference/roadmap/) — Phase D/E
- রেফারেন্স: `onuronOS/docs/{boot-process,security}.md`
