---
title: Android কম্প্যাটিবিলিটি লেয়ার
description: onuronOS-এর isolated containerized Android app layer — উদ্দেশ্য, সীমানা এবং বর্তমান অবস্থা।
---

onuronOS-এ Android সমর্থন একটি **বিচ্ছিন্ন সেকেন্ডারি সাবসিস্টেম**, যা
`android/` ও `android-host/`-এ থাকে।

> **আর্কিটেকচারাল নিয়ম:** Android কম্প্যাটিবিলিটি onuronOS-এর নেটিভ ভিত্তি নয়।
> নেটিভ প্ল্যাটফর্ম NilLang + Alap, এবং নেটিভ অ্যাপ `.nilax`। Android আপস ব্যবহারকারীর
> আপস চালাতে একটি compat স্তর মাত্র।

---

## ১. কেন আলাদা স্তর?

brute-force Android reimplementation-এর বদলে onuronOS একটি hardened, containerized
isolation স্তর ব্যবহার করে (LXC/Waydroid-অনুপ্রাণিত)।

---

## ২. আর্কিটেকচার

```text
┌───────────────────────────────────────────────────────────┐
│                   Android Container                        │
│      Android Apps (APK) · Android Framework (AOSP)        │
│             Headless SurfaceFlinger & Audio                │
└───────────────────────────┬────────────────────────────────┘
                            │ Wayland / PipeWire / Binder socket
                            ▼
┌───────────────────────────────────────────────────────────┐
│                Onuron OS Host Bridge Layer                │
│          nilandroidd · binder-shim · nilshell             │
└───────────────────────────┬────────────────────────────────┘
                            │ Host IPC (nilprotocol)
                            ▼
                 নেটিভ Onuron সার্ভিস / kernel
```

- SurfaceFlinger audio/display আউটপুট host Wayland/PipeWire-এ যায়।
- Binder socket নেটিভ সার্ভিসের সাথে সেতু করে।
- `nilandroidd` compat কন্টেইনার সুপারভাইজ করে।

---

## ৩. বর্তমান অবস্থা (সৎভাবে)

| দিক | অবস্থা |
|---|---|
| QEMU-তে container boot | 🔵 Functional Prototype (dev-only) |
| Android app execution | 🟡 Experimental |
| Galaxy S25 host lab (`android-host/`) | 🟡 চলমান |
| গুগল প্লে সার্ভিস | 🔴 নেই — microG পথ বিবেচনাধীন |
| প্রকৃত ডিভাইসে পূর্ণ Android compat | 🔴 পরিকল্পিত |

**onuronOS কোনো AOSP fork বা Android ROM নয়।** এই স্তরকে native ভিত্তি বানানো
যাবে না।

---

## ৪. পরবর্তী পড়ুন

- [onuronOS আর্কিটেকচার](/os/architecture/)
- [হার্ডওয়্যার সাপোর্ট](/os/hardware-support/)
- [রোডম্যাপ](/reference/roadmap/)
