---
title: হার্ডওয়্যার সাপোর্ট ও HAL
description: onuronOS-এর Layered driver কৌশল, NilHAL সীমানা এবং রেফারেন্স ডিভাইস।
---

vendor-নির্দিষ্ট rewrite ছাড়া বিস্তৃত মোবাইল হার্ডওয়্যার সমর্থনের জন্য onuronOS
একটি স্তরীভূত driver কৌশল ব্যবহার করে: upstream Linux LTS driver + Android
Treble modularity + libhybris/Halium সেতু।

---

## ১. হার্ডওয়্যার অ্যাবস্ট্রাকশন টপোলজি

```text
┌────────────────────────────────────────────────────────────┐
│             Onuron OS Userspace Daemons                     │
│       (audiod, camerad, inputd, powerd, nilshell)           │
└─────────────────────────────┬──────────────────────────────┘
                              │ safe Rust wrapper
                              ▼
┌────────────────────────────────────────────────────────────┐
│                       nilhal (Rust)                         │
│            safe dlopen loader ও device probing              │
└─────────────────────────────┬──────────────────────────────┘
                              │ C-ABI dynamic linkage
                              ▼
┌────────────────────────────────────────────────────────────┐
│            Linux LTS drivers + vendor blobs                 │
└────────────────────────────────────────────────────────────┘
```

`hal/*.h` (C ABI) + `runtime/nilhal` (safe Rust)। ডেভ ও হেডলেস CI-র জন্য
`FakeHAL` in-memory mock।

---

## ২. স্তরের দায়িত্ব

| স্তর | কী থাকে |
|---|---|
| Kernel | Linux LTS 6.6, DRM/KMS, evdev, ALSA, V4L2 |
| Vendor | device-specific blob (Adreno/Mali GPU, Wi-Fi/BT ফার্মওয়্যার) |
| NilHAL | স্থিতিশীল C ABI সীমানা (display/sensors/audio/camera) |
| Daemon | `inputd`, `audiod`, `camerad`, `powerd` ইত্যাদি |

ডিভাইস-নির্দিষ্ট ডিটেইল NilHAL-এর নিচে থাকে; উপরে কোনো ডিভাইস কোড নেই।

---

## ৩. রেফারেন্স ডিভাইস

| ডিভাইস | ভূমিকা | অবস্থা |
|---|---|---|
| **QEMU x86_64** | প্রাথমিক ডেভ টার্গেট | ✅ চালু |
| **QEMU aarch64** | সেকেন্ডারি টার্গেট | ✅ CI-তে |
| **Samsung Galaxy S25** | host lab | 🟡 experimental |
| **PinePhone (A64)** | ফেজ ৩ রেফারেন্স | 🔴 পরিকল্পিত |
| **OnePlus Fajita** | canonical target registry | 🔴 পরিকল্পিত |

একটি নির্দিষ্ট reference device পূর্ণ যাচাই হওয়ার আগে বিস্তৃত \"supported device\"
দাবি করা হয় না।

---

## ৪. হার্ডওয়্যার সাপোর্ট দাবির নিয়ম

- একটি driver বা HAL stub ফাইল থাকা মানেই ডিভাইস supported নয়।
- সমর্থন দাবির জন্য reproducible evidence (boot log, sensor read, render frame) দরকার।
- ব্যাকএন্ড না থাকলে ক্পোনেন্ট \"not detected\" হিসাবে সৎভাবে রিপোর্ট করে — ভুয়া
  মান নয়।

## ৫. বর্তমান সীমাবদ্ধতা

- প্রকৃত GPU/audio/camera ব্যাকএন্ড নেই; software/reference path চলে।
- কোনো physical device-এ পূর্ণ যাচাই হয়নি।
- libhybris সেতু experimental।

---

## ৬. পরবর্তী পড়ুন

- [onuronOS আর্কিটেকচার](/os/architecture/)
- [সিস্টেম সার্ভিস ও IPC](/os/services/)
- রেফারেন্স: `onuronOS/docs/hardware-support.md`
