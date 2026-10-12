---
title: সিস্টেম আর্কিটেকচার (System Architecture)
description: অনুরণ ইকোসিস্টেমের লেয়ারড আর্কিটেকচার — হার্ডওয়্যার থেকে অ্যাপ বিতরণ পর্যন্ত।
---

অনুরণ (Onuron) একটি সন্নিবদ্ধ কম্পিউটিং ইকোসিস্টেম: একটি Linux LTS-ভিত্তিক
মোবাইল অপারেটিং সিস্টেম (`onuronOS`), একটি ক্যানোনিক্যাল প্রোগ্রামিং ভাষা
(`nilLang`), একটি ডিক্লেয়ারেটিভ UI ফ্রেমওয়ার্ক (`alap-framework`), একটি
ডেভেলপমেন্ট এমুলেটর (`nilos-emulator`) এবং একটি হস্তাক্ষরযুক্ত App Store
রেজিস্ট্রি (`onuron_project`)।

> **দ্রষ্টব্য:** onuronOS কোনো **মাইক্রোকার্নেল নয়** এবং **AOSP fork-ও নয়**।
> এটি Linux LTS কার্নেলের উপর একটি Rust-first userspace, যেখানে `nilinit` PID 1।

---

## ১. সামগ্রিক স্ট্যাক

```text
┌───────────────────────────────────────────────────────────────┐
│  অ্যাপ্লিকেশন:  signed .nilax (Reference apps)                 │
│  নেটিভ প্ল্যাটফর্ম:  NilLang + Alap + NilUI                    │
├───────────────────────────────────────────────────────────────┤
│  অ্যাপ রানটাইম ও স্যান্ডবক্স:  runtime/nilrt                   │
│    namespaces · seccomp-BPF · permission broker · fscrypt      │
├───────────────────────────────────────────────────────────────┤
│  শেল ও কম্পোজিটর:  nilshell (Wayland/DRM-KMS)                  │
├───────────────────────────────────────────────────────────────┤
│  কোর সিস্টেম সার্ভিস:  nilinit · inputd · powerd · netd        │
│    audiod · camerad · btd · telephonyd · nilupd · nilkeyd      │
│    ফ্রেমড IPC: nilprotocol (ONUR magic, ≤1 MiB)                │
├───────────────────────────────────────────────────────────────┤
│  হার্ডওয়্যার অ্যাবস্ট্রাকশন:  NilHAL (C-ABI + Rust loader)     │
├───────────────────────────────────────────────────────────────┤
│  কার্নেল:  Linux LTS 6.6 (GKI-compatible) · DRM/KMS · SELinux  │
├───────────────────────────────────────────────────────────────┤
│  Android কম্প্যাটিবিলিটি (পৃথক):  android/ · android-host/      │
└───────────────────────────────────────────────────────────────┘
```

Android কম্প্যাটিবিলিটি একটি **বিচ্ছিন্ন সেকেন্ডারি সাবসিস্টেম**; এটি নেটিভ
আর্কিটেকচারের ভিত্তি নয়। বিস্তারিত: [Android কম্প্যাটিবিলিটি](/os/android-compatibility/)।

---

## ২. ভাষা ও প্ল্যাটফর্মের সম্পর্ক

```text
                 ┌──────────────────────┐
                 │   nilLang (Go)        │  ← ক্যানোনিক্যাল ভাষা
                 │   Production          │
                 └───────────┬──────────┘
                             │ (অন্য রানটাইম এর সাথে সামঞ্জস্য লক্ষ্য করে)
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
 ┌─────────────┐    ┌──────────────┐    ┌────────────────┐
 │  onuronOS   │    │ alap-framework│    │ nilos-emulator │
 │ Functional  │    │ Experimental  │    │ Functional     │
 │ Prototype   │    │ (early-alpha) │    │ Prototype      │
 └──────┬──────┘    └──────────────┘    └────────────────┘
        │
        ▼
 ┌──────────────────┐
 │ runtime/nillang  │  ← Rust সাবসেট, OS-এ এমবেডেড
 │    (subset)      │     (drop-in replacement নয়)
 └──────────────────┘
```

- **ক্যানোনিক্যাল:** `nilLang` (Go)। প্রতিটি অন্য রানটাইম এর সাথে সামঞ্জস্য
  রক্ষা করার লক্ষ্য রাখে।
- **alap-framework** এর নিজস্ব compiler/VM বাড়ানোর বদলে ক্যানোনিক্যাল
  nilLang-এর দিকে অভিসৃত হচ্ছে।
- **runtime/nillang (Rust)** একটি ইচ্ছাকৃত সাবসেট — শুধু UI-অ্যাপ ডেফিনিশন চালানোর জন্য।

বিস্তারিত: [nil ও অন্যান্য রানটাইম কম্প্যাটিবিলিটি](/nil/compatibility/)।

---

## ৩. লেয়ারসমূহের বিশ্লেষণ

### লেয়ার ১ — কার্নেল (Linux LTS)
Linux 6.6 LTS মেমরি ম্যানেজমেন্ট, শিডিউলিং, নেটওয়ার্কিং, ফাইলসিস্টেম, DRM/KMS
ও evdev সরবরাহ করে। ব্যবহারকারীর কোড কার্নেলের সাথে সরাসরি কথা বলে না।

### লেয়ার ২ — NilHAL (হার্ডওয়্যার সীমানা)
হার্ডওয়্যার ড্রাইভার ডিটেইল অ্যাপ থেকে লুকানো থাকে। C-ABI ইন্টারফেস
(`hal/`) এর উপরে একটি memory-safe Rust loader (`runtime/nilhal`) বসে।
ডেভেলপমেন্টে `FakeHAL` (in-memory mock) CI-র জন্য ব্যবহৃত হয়।
দেখুন: [হার্ডওয়্যার সাপোর্ট](/os/hardware-support/)।

### লেয়ার ৩ — কোর সিস্টেম সার্ভিস
`nilinit` PID 1 হিসেবে ছোট ছোট ডিমন সুপারভাইজ করে, বেশিরভাগ সকেট-অ্যাক্টিভেটেড।
সার্ভিসগুলো `nilprotocol` (length-prefixed binary frame, `ONUR` magic) দিয়ে
কথা বলে। দেখুন: [সিস্টেম সার্ভিস ও IPC](/os/services/)।

### লেয়ার ৪ — অ্যাপ রানটাইম ও স্যান্ডবক্স (`runtime/nilrt`)
প্রতিটি অ্যাপ Linux namespaces (PID/Mount/Net/IPC/UTS) + seccomp-BPF
(~110 syscall allowlist) + per-app UID + permission broker-এর ভিতরে চলে।
দেখুন: [নিরাপত্তা ও স্যান্ডবক্সিং](/os/security/)।

### লেয়ার ৫ — নেটিভ UI (`nilshell` + NilUI + nilui-gpu)
`nilshell` Wayland compositor, NilUI ডিক্লেয়ারেটিভ UI মডেল, এবং `nilui-gpu`
রেন্ডারার (Vulkan 2D + DRM/KMS).

### লেয়ার ৬ — নেটিভ অ্যাপ প্ল্যাটফর্ম (NilLang + Alap)
সোর্স → বিল্ড → `.nilax` → সাইন → `nilpkg` ইনস্টল → `nilrt` লঞ্চ।

### লেয়ার ৭ — বিতরণ (App Store রেজিস্ট্রি)
`onuron_project`-এর Git-ভিত্তিক রেজিস্ট্রি প্রতিটি প্যাকেজের SHA-256, size
ও Ed25519 সিগনেচার যাচাই করে। দেখুন: [ভেরিফিকেশন](/store/verification/)।

---

## ৪. একটি `.nilax` অ্যাপের জীবনচক্র

```text
NilLang সোর্স (.nil)
   │  nil build / alap টুলচেইন
   ▼
NABC bytecode + resources → .nilax (zip; manifest.json + bytecode/main.nabc + src/)
   │  Ed25519 সাইন
   ▼
nilpkg install  ──►  /data/app/<id>/  (atomic staging → rename)
   │
   ▼
nilrt launch  ──►  namespaces + seccomp + permissions
   │
   ▼
NilUI / nilshell  ──►  স্ক্রিনে রেন্ডার
```

---

## ৫. কেন এই বিচ্ছেদ?

- **প্রত্যাশিত সীমানা:** কম্পাইলার → `nilLang`, OS স্পেসিফিকেশন → `onuronOS`,
  UI ফ্রেমওয়ার্ক → `alap-framework`, বিতরণ → `onuron_project`।
- **হলোনা নীতি:** যেকোনো একক প্রকল্পে দ্বিতীয় কম্পাইলার/VM বা সমান্তরাল
  সত্যের সূত্র তৈরি করা হয় না।

পরবর্তী পড়ুন: [onuronOS আর্কিটেকচার](/os/architecture/) · [nilLang টিউটোরিয়াল](/nil/tutorial/)।
