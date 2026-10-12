---
title: সিস্টেম সার্ভিস ও IPC (nilprotocol)
description: onuronOS-এর ছোট ছোট সুপারভাইজড ডিমন এবং nilprotocol ফ্রেমড IPC চুক্তি।
---

onuronOS functionality ছোট, আলাদাভাবে-সুপারভাইজড সার্ভিসে ভাগ করে; তারা ফ্রেমড
binary IPC প্রোটোকল **nilprotocol**-এ কথা বলে।

---

## ১. কোর ডিমন

| ডিমন | দায়িত্ব |
|---|---|
| `nilinit` | PID 1 superviser, socket activation |
| `inputd` | evdev touch/button routing |
| `powerd` | battery/charging, suspend/resume |
| `netd` | নেটওয়ার্ক ও কানেক্টিভিটি |
| `audiod` | ALSA/PipeWire অডিও রাউটিং |
| `camerad` | V4L2 ক্যামেরা |
| `btd` | Bluetooth |
| `telephonyd` | telephony/RIL |
| `nilwdt` | hardware watchdog |
| `nilupd` | A/B OTA আপডেট |
| `nilkeyd` | fscrypt কী ব্যবস্থাপনা |
| `nilshell` | UI compositor/shell |

`nilinit` `/etc/nilos/services.toml` থেকে এগুলো চালু/সুপারভাইজ করে; অনেক ডিমন
**socket-activated** — প্রথম কলে চালু হয়। বিস্তারিত:
[বুট প্রক্রিয়া](/os/boot-process/).

---

## ২. nilprotocol ফ্রেম

length-prefixed binary frame:

| ফিল্ড | আকার | নোট |
|---|---|---|
| magic | 4 B | `ONUR` |
| payload length | 4 B | সর্বোচ্চ **1 MiB** |
| version | 2 B | প্রোটোকল ভার্সন |
| message type | 2 B | enum |
| request ID | 8 B | response correlation |
| flags | 4 B | আচরণ ফ্ল্যাগ |
| payload | ≤ 1 MiB | বার্তা-নির্দিষ্ট |

নিরাপত্তা:
- `ONUR` magic যাচাই (ভুল হলে প্রত্যাখ্যান)।
- **1 MiB-এর বেশি** হলে `IpcError::PayloadTooLarge`।
- message type enum bound যাচাই।
- কলারের credential যাচাই `SO_PEERCRED` (UID/GID) দিয়ে।

দেখুন: [নিরাপত্তা ও স্যান্ডবক্সিং](/os/security/#৫-ফ্রেমড-ipc-নিরাপত্তা-nilprotocol)।

---

## ৩. IPC authorization (বর্তমান ফোকাস)

নেটিভ অ্যাপ ও compat স্তর থেকে আসা IPC অনুরোধ **অনুমোদন** করার নিয়ম এখন সক্রিয়
উন্নয়নের বিষয়। লক্ষ্য: প্রতিটি সার্ভিস ঠিক করে কে কোন message type পাঠাতে পারে,
এবং অননুমোদিত অনুরোধ fail-closed প্রত্যাখ্যান করা।

> **সীমাবদ্ধতা:** IPC authorization-এর injected-failure পরীক্ষা এখনো সম্পূর্ণ নয়
> (রোডম্যাপ ফেজ D/E)।

---

## ৪. পরবর্তী পড়ুন

- [বুট প্রক্রিয়া](/os/boot-process/)
- [নিরাপত্তা](/os/security/)
- রেফারেন্স: `onuronOS/docs/boot-process.md`, `onuronOS/docs/security.md`
