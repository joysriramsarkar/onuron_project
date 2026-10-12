---
title: onuronOS সিস্টেম আর্কিটেকচার
description: Linux LTS কার্নেল, Rust-ভিত্তিক nilinit PID 1, NilHAL এবং সিস্টেম সার্ভিসের আর্কিটেকচার।
---

onuronOS হলো স্মার্টফোন ও ব্যক্তিগত কম্পিউটারের জন্য গ্রাউন্ড-আপ থেকে ডিজাইন
করা একটি স্বাধীন, সুরক্ষিত মোবাইল প্ল্যাটফর্ম। এটি Linux LTS কার্নেল এবং
সিস্টেম স্তরে **Rust-first userspace** ব্যবহার করে।

> **onuronOS একটি AOSP fork নয়।** Android কম্প্যাটিবিলিটি একটি পৃথক সাবসিস্টেম।

---

## ১. আর্কিটেকচার লেয়ার ওভারভিউ

```text
┌───────────────────────────────────────────────────────────────┐
│  অ্যাপ্লিকেশন:  Notes · Files · Calc · Music · POS · Terminal  │
│               NilLang + Alap/NilUI রিঅ্যাক্টিভ UI             │
├───────────────────────────────────────────────────────────────┤
│  অ্যাপ রানটাইম:  runtime/nilrt (sandbox · permissions)        │
├───────────────────────────────────────────────────────────────┤
│  UI শেল:  nilshell (Wayland / DRM-KMS) · nilui-gpu            │
├───────────────────────────────────────────────────────────────┤
│  সিস্টেম সার্ভিস:  inputd · powerd · netd · audiod · camerad  │
│   btd · telephonyd · nilwdt · nilupd · nilkeyd · nilprotocol  │
├───────────────────────────────────────────────────────────────┤
│  হার্ডওয়্যার সীমানা:  NilHAL (C-ABI + Rust dlopen loader)    │
├───────────────────────────────────────────────────────────────┤
│  কার্নেল:  Linux LTS 6.6 + GKI · DRM/KMS · SELinux `policy.33` │
├───────────────────────────────────────────────────────────────┤
│  (পৃথক) Android কম্প্যাটিবিলিটি:  android/ · android-host/     │
└───────────────────────────────────────────────────────────────┘
```

---

## ২. মূল আর্কিটেকচারাল নীতি

### ২.১ স্মৃতি নিরাপত্তা (Memory Safety)
সম্পূর্ণ userspace, ডিমন, runtime, প্যাকেজ ম্যানেজমেন্ট এবং init **Rust**-এ
লিখিত। এটি বাফার ওভারফ্লো, use-after-free, double-free ও ডেটা-রেসের মতো
সাধারণ OS দুর্বলতাগুলো দূর করে — ভারী GC ছাড়াই।

### ২.২ মাইক্রো-সার্ভিস সুপারভিশন
`nilinit` একটি হালকা PID 1, যা স্বতন্ত্র ডিমনগুলোকে সুপারভাইজ করে। ডিমনরা
লোকাল UNIX socket-এ কথা বলে এবং **socket activation**-এর মাধ্যমে অলস থাকতে
পারে (প্রয়োজন হলেই চালু)। `systemd` বা `OpenRC` ব্যবহার হয় না।

### ২.৩ সীমানার বিচ্ছেদ (Separation of Concerns)
হার্ডওয়্যার ড্রাইভার **NilHAL**-এর নিচে থাকে; উপরের কোনো স্তরে ডিভাইস-নির্দিষ্ট
কোড থাকে না।

### ২.৪ লোকাল-ফার্স্ট Distributed Fabric (SoftBus)
আন্তঃডিভাইস সক্ষমতা প্রোটোকল স্তরে বেক করা: mDNS-SD peer discovery + QUIC/TLS
1.3 transport। কোনো মালিকানা ক্লাউড ব্যাকএন্ড নেই।

---

## ৩. কোর সাবসিস্টেম

### ৩.১ `nilinit` (PID 1)
প্রারম্ভিক মাউন্ট (`/proc`, `/sys`, `/dev`, `/run`, `/tmp`), cgroup v2 slice,
SELinux পলিসি লোড, এবং `/etc/nilos/services.toml` পার্স করে সার্ভিস সুপারভাইজ।
বিস্তারিত: [বুট প্রক্রিয়া](/os/boot-process/)।

### ৩.২ `NilHAL`
C-ABI ইন্টারফেস (`hal_display.h`, `hal_sensors.h`, `hal_audio.h`,
`hal_camera.h`) এবং সেগুলোর safe Rust wrapper (`runtime/nilhal`)। ডেভেলপমেন্ট ও
হেডলেস CI-র জন্য `FakeHAL` mock। বিস্তারিত: [হার্ডওয়্যার সাপোর্ট](/os/hardware-support/)।

### ৩.৩ সিস্টেম সার্ভিস ও IPC (`nilprotocol`)
length-prefixed binary frame — `ONUR` magic (4B) + payload length (4B) +
version (2B) + message type (2B) + request ID (8B) + flags (4B) + payload।
পেলোড সর্বোচ্চ **1 MiB**; `SO_PEERCRED` দিয়ে কলারের UID/GID যাচাই।
বিস্তারিত: [সিস্টেম সার্ভিস ও IPC](/os/services/)।

### ৩.৪ `runtime/nilrt` (অ্যাপ রানটাইম ও আইসোলেশন)
Linux namespaces + seccomp-BPF (~110 syscall allowlist) + per-app UID +
permission broker (7-day auto-revoke)। বিস্তারিত: [নিরাপত্তা](/os/security/)।

### ৩.৫ `nilpkg` (প্যাকেজ ম্যানেজমেন্ট)
স্বাক্ষরিত `.nilax` প্যাকেজ — SHA-256 + Ed25519, atomic staging → rename,
rollback support, crash-recovery journal, cross-process locking, key revocation।
বিস্তারিত: [প্যাকেজ ম্যানেজার](/os/package-manager/)।

### ৩.৬ UI (`nilshell` + NilUI + `nilui-gpu`)
`nilshell` একটি `wlroots`-ভিত্তিক Wayland compositor; ডিসপ্লে পাইপলাইন DRM/KMS
dumb buffer + Vulkan 2D। NilUI ডিক্লেয়ারেটিভ UI মডেল + spring-physics animation।

### ৩.৭ SoftBus
লোকাল পিয়ার discovery (mDNS-SD) + QUIC/TLS 1.3। দূরবর্তী পিয়ার তালিকা UI-তে
দেখানো ডেটা **[SIMULATED]** (ডেমো)।

---

## ৪. Operating Modes

| Mode | বর্ণনা | অবস্থা |
|---|---|---|
| **Mode 1 — QEMU** | সম্পূর্ণ সিস্টেম ভার্চুয়াল মেশিনে | ✅ চালু |
| **Mode 2 — Galaxy S25 Hosted Lab** | আধুনিক Android ডিভাইসের উপরে hosted runtime | 🟡 চলমান |
| **Mode 3 — Bare-metal Phone** | প্রকৃত ফোনে সরাসরি | 🔴 পরিকল্পিত |

---

## ৫. বর্তমান সীমাবদ্ধতা (সৎভাবে)

- GPU/audio/camera-এর প্রকৃত (real) ব্যাকএন্ড নেই — এগুলো "not detected" হিসাবে
  সৎভাবে রিপোর্ট করে, ভুয়া ডেটা নয়।
- রিকভারি বুট ফ্লো এবং IPC authorization এখনো ইনজেক্টেড ফেইলিওরে সম্পূর্ণভাবে
  পরীক্ষিত নয়।
- কোনো physical device নেই; সব QEMU-তে যাচাইকৃত।

দেখুন: [ইকোসিস্টেম পরিপক্বতা ম্যাপ](/reference/maturity/) · [রোডম্যাপ](/reference/roadmap/)।
