---
title: স্টোরেজ ও ফাইলসিস্টেম
description: onuronOS-এর /system, /vendor, /data লেআউট, atomic write এবং fscrypt encryption।
---

onuronOS immutable system image এবং encrypted user data — এই দুই-ধরনের স্টোরেজ
দর্শনে চলে।

---

## ১. পাথ লেআউট

| পাথ | পরিবর্তনযোগ্য? | বিষয়বস্তু |
|---|---|---|
| `/system` | ❌ read-only (dm-verity) | base system image ও বাইনারি |
| `/vendor` | ❌ read-only | device-specific HAL/firmware blobs |
| `/cache` | ✅ (tmp) | OTA download buffer |
| `/recovery` | ✅ | standalone recovery environment |
| `/metadata` | ✅ | encryption key metadata, rollback counter |
| `/run/onuron/`, `/run/nilos/` | ✅ (tmpfs) | IPC sockets |
| `/data` | ✅ (encrypted) | user data |

---

## ২. `/data` সাব-ডিরেক্টরি

```text
/data/
├── user/<uid>/      # isolated per-app home (fscrypt v2 protected)
├── app/             # atomic .nilax installations
├── system/          # settings, PIN hashes, state database
├── media/           # photos, music, downloads, external mounts
├── config/          # system config flags (যেমন oobe_done)
├── sms/             # Messages app thread storage
└── logs/crash/      # local-only crash tombstones
```

- প্রতিটি অ্যাপ অনন্য UID-এর অধীনে `user/<uid>/` পায়; অ্যাপ অন্য অ্যাপের
  ডেটা দেখতে পারে না।
- `.nilax` ইনস্টল `/data/app/<id>/`-এ যায়, atomic staging → rename-এ।

---

## ৩. Atomic write (ক্র্যাশ-নিরাপদ)

গুরুত্বপূর্ণ ফাইল লেখা হয় **write-temp → fsync → rename** প্যাটার্নে। ফলে
বিদ্যুৎ বিভ্রাট বা ক্র্যাশে ফাইল অর্ধ-লিখিত অবস্থায় থাকে না — হয় পুরনো সংস্করণ, নয়তো সম্পূর্ণ নতুন।

- permission broker-এর JSON DB অ্যাটমিক write ব্যবহার করে; corrupt হলে quarantine করে।
- প্যাকেজ ইনস্টলের journal crash-recovery সমর্থন করে।

---

## ৪. Encryption (fscrypt v2)

`/data/user/<uid>` account-ভিত্তিক এনক্রিপশনে সুরক্ষিত। Master key user
credential থেকে derive হয় এবং `nilkeyd` runtime-এ পরিচালনা করে (unlock-এ enroll,
lock-এ evict)। বিস্তারিত: [নিরাপত্তা](/os/security/#৪-storage-encryption-fscrypt-v2-ও-nilkeyd)।

---

## ৫. storage HAL / VFS

- **নেটিভ:** Linux VFS + `ext4`, উপরে NilHAL `storage` ইন্টারফেস।
- **এমুলেটরে:** একটি per-app ভার্চুয়াল ফাইলসিস্টেম (path traversal প্রত্যাখ্যান করে)
  — দেখুন [এমুলেটর HAL](/emulator/hal/#storage-filesystem-fs)।

---

## ৬. বর্তমান সীমাবদ্ধতা

- `/system`-এর dm-verity root hash tree টুলিং (`mkvbmeta`) একটি functional
  prototype; সব ডিভাইসে যাচাইকৃত নয়।
- ফাইলসিস্টেম fsck/recovery ফ্লো এখনো injected power-cut-এ সম্পূর্ণ পরীক্ষিত নয়।
