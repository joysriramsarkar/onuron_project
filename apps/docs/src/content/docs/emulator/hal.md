---
title: ভার্চুয়াল হার্ডওয়্যার (NilHAL)
description: NilHAL v1 ডিভাইস কনট্রাক্ট, permission ম্যাপিং এবং fault injection।
---

**NilHAL** একটি চুক্তি (contract), কোনো নির্দিষ্ট ইমপ্লিমেন্টেশন নয়। প্রতিটি ডিভাইস
শ্রেণি নাম ও অপারেশন দিয়ে NilHost Protocol-এর উপর অ্যাড্রেস হয়। এমুলেটর **virtual**
driver দেয়; onuronOS ভবিষ্যতে একই ইন্টারফেসের পিছনে **আসল** driver দেবে, ফলে অ্যাপ
কখনো বদলাতে হবে না।

---

## ১. Permission ম্যাপিং

| HAL ডিভাইস | ম্যানিফেস্ট permission |
|---|---|
| `battery`, `power` | `power` |
| `network`, `net` | `network` |
| `printer` | `printer` |
| `scanner` | `scanner` |
| `storage`, `filesystem`, `fs` | `filesystem` |
| `sensors` | `sensors` |
| `clipboard` | `clipboard` |
| `notifications` | `notifications` |
| `camera` | `camera` |

অনুমতি না থাকলে কল `E_PERMISSION` ফেরায়। ডেভ-শেল (খালি `app_id`) সর্বদা অনুমতিপ্রাপ্ত।

---

## ২. ডিভাইস

### battery / power
- `level`/`get` → `{level, charging, temperature_c}`
- `set` → `{level?, charging?}`

### network / net
- `status`/`get` → `{mode, online, latency_ms, down_kbps}`
- `set` → `{mode?, online?, latency_ms?}`
- নামযুক্ত profile: `5g`, `4g`, `3g`, `edge`, `wifi`, `offline`

### clock / time
- `now`/`get` → `{unix_ms, iso, tz, frozen}`
- `set` → `{unix_ms? | iso?, tz?, frozen?}` — frozen clock স্ক্রিনশট deterministic করে

### storage / filesystem / fs
পাথ অ্যাপের **private directory**-র relative; `..` escape VFS প্রত্যাখ্যান করে।

- `read {path}` → `{data, size}`
- `write {path, data}`
- `list {path}` → `{entries:[{name,path,is_dir,size,mod_time}]}`
- `delete {path}`, `exists {path}` → `{exists}`

### printer (ESC/POS)
- `print {lines?, data?}` → `{bytes, receipt:{lines:[{text,align,bold,size}],cut}}`
- `list` → `[PrinterInfo]`, `last` → সর্বশেষ receipt

এমুলেটর ESC/POS-এর একটি subset (init, alignment, bold, size, cut) encode/decode করে,
ফলে "emulator-এ প্রিন্ট" ও "আসল হার্ডওয়্যারে প্রিন্ট" মেলে।

### scanner
- `scan {value?}` → `{format, value, ts}`
- `wedge {value}` → `{keys:[...]}` (keyboard-wedge HID mode)

### clipboard
- `get {text}`, `set {text}`

### notifications
- `post {title, body, app_id}`, `list`, `clear`, `dismiss {id}`

### sensors
- `accel`, `gyro`, `gps`; `set {accel?, gyro?, lat?, lng?}`

### display
- `info` → `{width_px, height_px, dpr, locale}`

### audio / haptics
- `vibrate`; `set {volume?, brightness?}`

---

## ৩. Fault injection

যেকোনো অপারেশন deterministically fail করানো যায়:

```json
{"dev":"printer","op":"print","fail":"paper_out","times":1}
```

কন্ট্রোল প্যানেল বা CLI দিয়ে:

```powershell
nilctl fault printer print --code paper_out --times 1 --device <id>
```

এটি এমুলেটরের সবচেয়ে মূল্যবান ডেভেলপার ফিচারগুলোর একটি: আসল অ্যাপ paper-out,
disk-full ও permission-denied path-এ ভাঙে — জোর করে তা চালিয়ে পরীক্ষা করুন।

---

## ৪. পরিপক্বতা (সৎভাবে)

| দিক | অবস্থা |
|---|---|
| ভার্চুয়াল ডিভাইস সেট | ✅ Functional |
| permission enforcement (`E_PERMISSION`) | ✅ Functional |
| ESC/POS subset round-trip | ✅ Tested |
| fault injection | ✅ Functional |
| আসল হার্ডওয়্যার driver | 🔴 onuronOS-এ ভবিষ্যতে (একই ইন্টারফেস) |

---

## ৫. পরবর্তী পড়ুন

- [NilHost Protocol](/emulator/protocol/)
- [ডিবাগিং](/emulator/debugging/)
- রেফারেন্স: `nilos-emulator/docs/hal.md`
