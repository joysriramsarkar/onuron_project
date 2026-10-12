---
title: শব্দকোষ (Glossary)
description: অনুরণ ইকোসিস্টেমের পরিভাষা — ভাষা, OS, স্টোর ও এমুলেটর।
---

---

## ভাষা ও রানটাইম

**NilLang** — canonical ভাষা (nilLang রিপো, Go)।

**নীলাং / নিলাং** — NilLang-এর বাংলা রূপ।

**NABC** — *NilLang Application ByteCode* — portable বাইটকোড ফরম্যাট (ম্যাজিক `NABC`)।

**`.nil`** — NilLang সোর্স ফাইল।

**canonical** — একক সত্য-উৎস; ভাষার ক্ষেত্রে **nilLang (Go)**।

**subset / prototype runtime** — canonical-এর আংশিক বাস্তবায়ন (যেমন Rust `runtime/nillang`)।

**capability** — অ্যাপ যে অনুমতি চায় (যেমন `stdout`, `storage.read`)।

**effect** — ফাংশনের পার্শ্ব-প্রভাব; effect checking আংশিক/পরিকল্পিত।

---

## OS

**onuronOS** — Linux LTS 6.6 ভিত্তিক মোবাইল OS।

**`nilinit`** — PID 1 supervisor।

**NilHAL** — হার্ডওয়্যার অ্যাবস্ট্রাকশন (C ABI + Rust dlopen loader; `FakeHAL` mock)।

**`nilrt`** — runtime: namespaces + seccomp + per-app UID + permission revocation।

**`nilprotocol`** — ফ্রেমড IPC (`ONUR` magic, ≤1 MiB, `SO_PEERCRED`)।

**`nilpkg`** — প্যাকেজ ইনস্টলার (atomic staging→rename, rollback, crash journal, key revocation)।

**`nilupd`** — A/B OTA আপডেট (anti-rollback `rollback_index`)।

**`nilshell`** — Wayland/DRM-KMS compositor **এবং** টেক্সট টার্মিনাল।

**`nilkeyd`** — fscrypt key ব্যবস্থাপনা।

---

## স্টোর

**`.nilax`** — universal bundle (ZIP: manifest + bytecode + src)।

**`.onp`** — nilpkg প্যাকেজ (uncompressed tar)।

**manifest.json** — প্রকাশিত অ্যাপের মেটাডেটা (স্কিমা-abided)।

**`releaseStage`** — সৎ লেবেল: `reference` | `preview` | `stable`।

**trusted-keys.json** — বিশ্বস্ত Ed25519 পাবলিক কী তালিকা।

**`validate` / `validate:verify`** — স্টোর গেটের স্কিমা / বাইট-স্তরের মোড।

**registry-src** — পুনরুৎপাদনযোগ্য অ্যাপ সোর্স।

---

## এমুলেটর

**nilos-emulator / NilOS Studio** — অ্যাপ-রানটাইম ডেভ-এমুলেটর।

**`nilosd`** — অ্যাপ worker প্রসেস।

**NilHost Protocol v1** — হোস্ট↔VM newline-delimited JSON চুক্তি।

**NilHAL** — এমুলেটরের ভার্চুয়াল হার্ডওয়্যার (permission-ম্যাপড + fault injection)।

**NilBus** — ইন্টার-অ্যাপ pub/sub বাস।

**`.nilrec`** — রেকর্ড/রিপ্লে ক্যাপচার।

**`nilsp` / `nildap`** — LSP / DAP সার্ভার।

**System Mode** — ঐচ্ছিক QEMU মোড (real framebuffer)।

---

## পরিপক্বতা পরিভাষা

- **Production** · **Functional Prototype** · **Experimental** · **Stub/Simulated** · **Not Implemented**
- **Host-only** · **QEMU** · **Physical-device tested**

---

## পরবর্তী পড়ুন

- [পরিপক্বতা ম্যাপ](/reference/maturity/)
- [canonical স্পেসিফিকেশন](/reference/specs/)
