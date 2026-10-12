---
title: প্যাকেজ ম্যানেজার (`nilpkg`) ও `.nilax` ফরম্যাট
description: onuronOS-এর স্বাক্ষরিত .nilax প্যাকেজ, nilpkg CLI এবং atomic install/rollback।
---

onuronOS-এ নেটিভ অ্যাপ্লিকেশন **`.nilax`** (Nil Application Archive) ফরম্যাটে
প্যাকেজ করা হয়। লেগ্যাসি/সাধারণ ফরম্যাট **`.onp`**-ও পঠিত হয়। উভয় প্যাকেজ
**SHA-256 + Ed25519** দ্বারা যাচাইকৃত।

> **নোট:** এখানে বর্ণিত CLI কমান্ডগুলো onuronOS-এর Rust প্যাকেজ ম্যানেজার
> `nilpkg`-এর। স্টোর-সাইড ভ্যালিডেটরের কমান্ড আলাদা — দেখুন
> [ভেরিফিকেশন পাইপলাইন](/store/verification/)।

---

## ১. `.nilax` প্যাকেজের গঠন

`.nilax` একটি **ZIP আর্কাইভ** (unix-প্র্যাকটিসে `nilpkg pack` দ্বারা তৈরি):

```text
app.nilax
├── manifest.json         # app_name, app_version, entry_bytecode, permissions, arch, min_os
├── bytecode/main.nabc    # NABC (Nil Application ByteCode) — ম্যানিফেস্টে এন্ট্রি
├── src/main.nil          # (ঐচ্ছিক) রেফারেন্স সোর্স
├── assets/               # ছবি, ফন্ট, লোকাল রিসোর্স
└── SIGNATURE.json        # key_id, manifest/payload sha256, Ed25519 signature
```

অভ্যন্তরীণ `manifest.json`-এ অন্তত থাকে:

```json
{
  "app_name": "org.onuron.calculator",
  "app_version": "1.0.0",
  "entry_bytecode": "bytecode/main.nabc",
  "permissions": ["stdout"]
}
```

---

## ২. `nilpkg` কমান্ড-লাইন ইন্টারফেস

```bash
# একটি বিল্ড ডিরেক্টরি থেকে স্বাক্ষরিত প্যাকেজ তৈরি
nilpkg pack ./build/my-app --key dev.key --out my-app-1.0.0.nilax

# ইনস্টল (atomic: staging-এ unpack → rename)
nilpkg install my-app-1.0.0.nilax

# আপগ্রেড (ব্যর্থ হলে স্বয়ংক্রিয় রোলব্যাক)
nilpkg upgrade my-app-1.1.0.nilax

# ইনস্টল করা অ্যাপের তালিকা
nilpkg list

# আনইনস্টল (স্যান্ডবক্স + ডেটা ক্লিনআপ)
nilpkg remove org.onuron.calculator

# ইন্টিগ্রিটি ও সিগনেচার যাচাই
nilpkg verify org.onuron.calculator
```

---

## ৩. ইনস্টলেশন কৌশল (কেন নিরাপদ)

| ধাপ | কৌশল |
|---|---|
| Verification | `package.signature` (`signer`) `trusted-keys.json`/`<key_dir>/trusted/`-এর কী দিয়ে যাচাই; revoked কী প্রত্যাখ্যাত |
| Integrity | প্যাকেজ bytes-এর SHA-256 + size চেক |
| Safe extract | আর্কাইভে `..`, absolute path বা destination ছাড়ানো symlink থাকলে unpack বাতিল |
| Atomic install | staging ডিরেক্টরিতে unpack → atomic rename; মাঝপথে ক্র্যাশ হলে journal দিয়ে recovery |
| Rollback | আপগ্রেড ব্যর্থ বা নতুন বিল্ড বুট-ফেল হলে পূর্বের স্লটে ফেরা |
| Locking | cross-process lock — একসাথে দুই ইনস্টল সংঘর্ষে পড়ে না |

এই ফেল-ক্লোজড আচরণগুলো [থ্রেট মডেল](/os/security/)-এ বিস্তারিত।

---

## ৪. সাইনিং মডেল

- **Digest:** প্যাকেজ payload-এর উপরে SHA-256।
- **Signature:** canonical manifest মেটাডেটার উপরে Ed25519।
- **Trust:** কেবল `<key_dir>/trusted/`-এর কী গৃহীত; `<key_dir>/revoked/`-এর কী
  সাথে সাথে বাতিল।
- **Key compromise:** কমপ্রোমাইজড কী revoked-এ যোগ + বর্ধিত `rollback_index`-সহ
  জরুরি signed OTA।

কী তৈরি ও প্যাকেজ সাইন করার ধাপ: [স্টোর ডেভেলপার গাইড](/store/developer-guide/)।

---

## ৫. OTA আপডেট (A/B)

`nilupd` dual-slot (A/B) transactional আপডেট ব্যবহার করে। একটি ডাউনগ্রেড
আক্রমণ ঠেকাতে `UpdateManifest.rollback_index` চলমান ইমেজের চেয়ে কম হলে আপডেট
প্রত্যাখ্যাত হয়। বুট ব্যর্থ হলে স্বয়ংক্রিয়ভাবে পূর্বের স্লটে ফেরা হয়।
বিস্তারিত: [রিকভারি](/os/recovery/)।
