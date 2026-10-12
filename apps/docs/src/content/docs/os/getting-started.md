---
title: onuronOS শুরু করার গাইড (Getting Started)
description: QEMU-তে onuronOS বুট করা, রেফারেন্স টার্গেট এবং বর্তমান বাস্তব সীমাবদ্ধতা।
---

স্বাগতম **onuronOS** ডকুমেন্টেশনে। onuronOS একটি স্বাধীন, Linux LTS-ভিত্তিক
মোবাইল অপারেটিং সিস্টেম।

> **অবশ্যপাঠ্য — বর্তমান বাস্তবতা:** onuronOS এই মুহূর্তে একটি
> **Functional Prototype**, যা **QEMU**-তে বুট ও যাচাই করা হয়। এখনো কোনো
> physical device-এ যাচাই হয়নি এবং কোনো রেডি-টু-ইনস্টল ISO রিলিজ হয়নি।
> কোনো ফোনে ফ্ল্যাশ করার আগে [রেফারেন্স বোর্ড](/os/hardware-support/) ও
> [রোডম্যাপ](/reference/roadmap/) পড়ুন।

---

## ১. প্ল্যাটফর্ম সাপোর্ট

| টার্গেট | অবস্থা | নোট |
|---|---|---|
| **QEMU x86_64** | ✅ প্রাথমিক ডেভ টার্গেট | `bootable`, persistence টেস্ট পাস |
| **QEMU aarch64 (`-M virt`)** | ✅ সেকেন্ডারি | `linux-qemu.yml` CI-তে |
| **Samsung Galaxy S25 (android-host)** | 🟡 experimental lab | Hosted runtime, `android-host/` |
| **PinePhone (Allwinner A64)** | 🔴 পরিকল্পিত | ফেজ ৩-এর রেফারেন্স ডিভাইস |
| **OnePlus Fajita** | 🔴 পরিকল্পিত | canonical target registry-তে নিবন্ধিত |

---

## ২. QEMU-তে বুট করা

### পূর্বশর্ত
- QEMU (`qemu-system-x86_64` বা `qemu-system-aarch64`)
- একটি নির্ভরযোগ্য Rust toolchain (workspace build-এর জন্য)
- Python 3 (টেস্ট হারনেসের জন্য)

### Windows (PowerShell)
```powershell
.\build\qemu-boot.ps1
```

### Linux / macOS / WSL
```bash
./build/qemu-boot.sh
```

স্ক্রিপ্টটি একটি initramfs/disk ইমেজ প্রস্তুত করে QEMU-কে হেডলেস (বা
গ্রাফিক্যাল) মোডে বুট করে। বুট সিকোয়েন্স প্রিন্ট করে `[  OK  ]` লাইন, যা
`nilinit` থেকে আসে।

### Persistence টেস্ট
লেখা-পড়ার স্থায়িত্ব যাচাই করতে:
```bash
python build/qemu-persistence-test.py
```
এটি একটি `data.img` ডিস্কে `/data` লিখে, একই ডিস্কে রিবুট করে পুনরায় পড়ে
**byte-exact** মিল যাচাই করে।

---

## ৩. বুট হওয়ার পর কী দেখবেন

| UI উপাদান | অবস্থা |
|---|---|
| First-Boot Setup (OOBE) | Functional Prototype (নাম + PIN → `/data/config/`) |
| Lock Screen | Functional Prototype (100k-round SHA-256 PIN; clock/date static **[SIMULATED]**) |
| Home Launcher | Functional Prototype (app grid, status bar; battery/signal static **[SIMULATED]**) |
| Messages / Files / Settings | Functional Prototype |
| Phone / Notification Center | Stub / Simulated |
| Terminal (`nilshell`) | Reference-level (`ls`/`cat`/`mem` আসল; `ps`/`services` simulated) |

**স্ক্রিনে যা যা `SIMULATED` চিহ্নিত, তা ডেমো মান — প্রকৃত হার্ডওয়্যার ডেটা নয়।**
সম্পূর্ণ তালিকা: [ইকোসিস্টেম পরিপক্বতা ম্যাপ](/reference/maturity/)।

---

## ৪. একটি অ্যাপ ইনস্টল করা

onuronOS-এ নেটিভ অ্যাপ হচ্ছে **স্বাক্ষরিত `.nilax` বান্ডল**।

```bash
# nilpkg দিয়ে ইনস্টল (host থেকে অথবা QEMU-র ভিতরে)
nilpkg install /path/to/org.onuron.calculator.nilax

# ইনস্টল করা অ্যাপের তালিকা
nilpkg list

# রোলব্যাক-সহ আপগ্রেড
nilpkg upgrade /path/to/app-1.1.0.nilax
```

`nilpkg` সিগনেচার, SHA-256 ও পাথ-ট্রাভার্সাল যাচাই করে; ব্যর্থ হলে ইনস্টল
বাতিল ও staging মুছে ফেলা হয়। বিস্তারিত: [প্যাকেজ ম্যানেজার](/os/package-manager/)।

---

## ৫. পরবর্তী পদক্ষেপ

- [onuronOS আর্কিটেকচার](/os/architecture/) — স্ট্যাক ও লেয়ার।
- [বুট প্রক্রিয়া ও `nilinit`](/os/boot-process/) — বুট চেইন।
- [নিরাপত্তা ও স্যান্ডবক্সিং](/os/security/) — namespaces, seccomp, SELinux।
- [স্টোরেজ ও ফাইলসিস্টেম](/os/filesystem/) — `/system`, `/vendor`, `/data`।
- [রিকভারি](/os/recovery/) — A/B স্লট ও রোলব্যাক।
- [নিজের অ্যাপ তৈরি](/alap/first-app/) — NilLang + Alap।
