---
title: টার্মিনাল (nilshell)
description: onuronOS-এ অন্তর্নির্মিত nilshell টার্মিনাল — কমান্ড, সৎ লেবেল এবং সীমাবদ্ধতা।
---

onuronOS-এর নেটিভ টার্মিনাল **`nilshell`**-এ অন্তর্নির্মিত। **আলাদা কোনো
টার্মিনাল রিপোজিটরি নেই।**

> একটি গুরুত্বপূর্ণ সত্য: `nilshell` এখনো কোনো পূর্ণ POSIX shell নয়। এখানে কী
> বাস্তব আর কী ডেমো, নিচে সৎভাবে দেওয়া হলো।

---

## ১. বাস্তব বনাম simulated কমান্ড

| কমান্ড | অবস্থা | নোট |
|---|---|---|
| `ls`, `cd`, `pwd` | ✅ Reference | সত্যিকারের VFS traversal |
| `cat` | ✅ Reference | সত্যিকারের ফাইল পড়া |
| `mem` | ✅ Reference | সত্যিকারের `/proc` memory পড়া |
| `echo` | ✅ Reference | খাঁটি আউটপুট |
| `ps` | 🟡 Simulated | static প্রসেস তালিকা ডেমো |
| `services` | 🟡 Simulated | static সার্ভিস তালিকা ডেমো |
| `help` | ✅ Reference | কমান্ড সাহায্য |
| `clear`, `exit` | ✅ Reference | |

**`SIMULATED` চিহ্নিত কমান্ড প্রকৃত সিস্টেম স্টেট নয় — শুধু UI ডেমো।**

---

## ২. ব্যবহার

```text
nilshell> ls /data
nilshell> cat /data/config/oobe_done
nilshell> mem
nilshell> help
```

ডেভেলপাররা এখান থেকে micro-service স্টেট দেখতে পারেন (লক্ষ্য), তবে বর্তমানে
`ps`/`services` বাস্তব `/proc` বা supervisor RPC পড়ে না।

---

## ৩. আর্কিটেকচার

- `nilshell` একইসাথে Wayland-based UI compositor ও টেক্সট শেল সেশন।
- টেক্সট রেন্ডার + input routing `inputd` (evdev) দিয়ে।
- ভবিষ্যতে supervisor RPC (`nilprotocol`) যুক্ত করে আসল `ps`/`services` দেওয়া
  লক্ষ্য।

---

## ৪. পরিপক্বতা (সৎভাবে)

| দিক | অবস্থা |
|---|---|
| মৌলিক ফাইল কমান্ড | 🔵 Functional Prototype |
| প্রসেস/সার্ভিস কমান্ড | 🟡 Stub/Simulated |
| সম্পূর্ণ POSIX শেল | 🔴 পরিকল্পিত |

---

## ৫. পরবর্তী পড়ুন

- [স্টোরেজ ও ফাইলসিস্টেম](/os/filesystem/)
- [সিস্টেম সার্ভিস ও IPC](/os/services/)
- [ইকোসিস্টেম পরিপক্বতা ম্যাপ](/reference/maturity/)
