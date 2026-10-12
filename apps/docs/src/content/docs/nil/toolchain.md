---
title: nil টুলচেইন ও CLI
description: nilLang-এর nil CLI — run, build, check, fmt, repl, dap এবং একাধিক target।
---

nilLang-এর ক্যানোনিক্যাল CLI হলো `nil` (`nilLang/cmd/nil`)। এটি evaluator, bytecode
VM এবং AOT/LLVM — তিনটি engine ব্যবহার করে।

---

## ১. প্রধান কমান্ড

```bash
nil init my-app          # নতুন প্রকল্প (src/, resources/, build/)
nil run src/main.nil     # evaluator/VM-এ চালান
nil build .              # বিল্ড (নিচের টার্গেট দেখুন)
nil check .              # টাইপ ও স্ট্যাটিক চেক (alias: ai)
nil fmt .                # ফরম্যাট (gofmt-সদৃশ)
nil lint .               # লিন্ট
nil repl                 # ইন্টারঅ্যাকটিভ REPL
nil doc                  # builtin/std ফাংশন ডকুমেন্টেশন
nil version              # ভার্সন
```

---

## ২. বিল্ড টার্গেট

```bash
nil build windows        # Windows Executable
nil build linux          # Linux Executable
nil build macos          # macOS (amd64 / arm64)
nil build onuron         # Onuron OS (.nilax)
nil build android        # Android APK
nil build all            # সব প্ল্যাটফর্ম
```

`nil build onuron` একটি স্বাক্ষরযোগ্য `.nilax` বান্ডল তৈরি করে; সাইন করে
`nilpkg` দিয়ে ইনস্টল করা হয় ([প্যাকেজ ম্যানেজার](/os/package-manager/))।

---

## ৩. ডেভেলপার ও ওয়েব কমান্ড

```bash
nil dev                  # ডেভ সার্ভার (profiles: web / server / mobile)
nil routes               # নিবন্ধিত রাউট টেবিল
nil db migrate           # ডেটাবেস মাইগ্রেশন
nil render               # কম্পোনেন্ট ট্রি রেন্ডার/প্রিভিউ
nil game                 # গেম প্রোফাইল টুলস
nil profile              # capability matrix/profile রিপোর্ট
```

---

## ৪. ডিবাগিং

```bash
nil dap src/main.nil     # Debug Adapter Protocol সার্ভার (stdio)
```

এডিটর (VS Code/Neovim) DAP-এর মাধ্যমে সংযুক্ত হয়ে breakpoint, step, call
stack ও variable দেখতে পারে। এমুলেটরের সাথে বিস্তারিত:
[ডিবাগিং](/emulator/debugging/)।

---

## ৫. মডিউল ব্যবস্থাপনা

```bash
nil add <package>        # ডিপেন্ডেন্সি যোগ
nil update               # nil.lock আপডেট
```

প্যাকেজ রেজোলিউশন `nil.lock`-এর মাধ্যমে (planned/আংশিক — দেখুন
`nilLang/docs/spec/MODULE_SYSTEM.md`)।

---

## ৬. ইন্টারমিডিয়েট রিপ্রেজেন্টেশন পরিদর্শন

```bash
nil hir src/main.nil     # High-level IR
nil mir src/main.nil     # Mid-level IR / CFG
```

ডিভ বান্ধব ও কম্পাইলার শিক্ষার জন্য উপযোগী।

---

## ৭. পরবর্তী পড়ুন

- [নিল কম্প্যাটিবিলিটি](/nil/compatibility/)
- [স্ট্যান্ডার্ড লাইব্রেরি](/nil/standard-library/)
