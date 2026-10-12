---
title: নিরাপত্তা নীতি ও মডেল
description: দুর্বলতা রিপোর্ট, supply-chain অডিট এবং OS/store-স্তরের নিরাপত্তা নীতি।
---

এই পৃষ্ঠাটি পুরো ইকোসিস্টেমের নিরাপত্তা নীতি ও মডেলের সারসংক্ষেপ।

---

## ১. দুর্বলতা রিপোর্ট

- সম্পর্কিত রিপোজিটরির **GitHub Security Advisory** (private) ব্যবহার করে রিপোর্ট করুন।
- দুর্বলতার জন্য **পাবলিক issue খুলবেন না** — সমাধান না হওয়া পর্যন্ত গোপন রাখুন।
- রিপোর্টে রাখুন: প্রভাবিত কম্পোনেন্ট/ভার্সন, পুনরুৎপাদনের ধাপ, প্রত্যাশিত বনাম
  প্রকৃত আচরণ এবং সম্ভাব্য প্রভাব।
- **কোনো পেইড bug bounty নেই।**

---

## ২. Supply-chain অডিট

`onuronOS/.github/workflows/security-audit.yml` + `deny.toml`:

- পরিচিত দুর্বলতা পেলে **hard-fail**।
- unmaintained crate-এর একটি **documented allowlist** — কারণ লিখিত থাকতে হবে।
- উদাহরণ: `RUSTIX-2026-0343`-এ `quinn-proto` 0.11.17 → 0.11.19-এ bump করা হয়েছে।

CI গেট: `security-audit.yml`, `linux-qemu.yml`, `code-quality.yml`, `selinux.yml`।

---

## ৩. OS-স্তরের নিরাপত্তা

| প্রক্রিয়া | বর্ণনা |
|---|---|
| SELinux enforcing | CIL পলিসি, `90-neverallow.cil` |
| seccomp | ~১১০ syscall allowlist, per-app |
| Per-app UID | অ্যাপ একে অপরের থেকে বিচ্ছিন্ন |
| Permission auto-revoke | ৭ দিন অব্যবহারে permission স্বয়ংক্রিয় প্রত্যাহার |
| Storage encryption | `fscrypt` v2, master key `nilkeyd`-এ (TEE/keystore) |
| IPC নিরাপত্তা | `nilprotocol`: `ONUR` magic, ≤1 MiB frame, `SO_PEERCRED` যাচাই |

বিস্তারিত: [নিরাপত্তা ও স্যান্ডবক্সিং](/os/security/) এবং
`onuronOS/docs/{security,threat-model}.md`।

---

## ৪. Store trust model

- প্রতিটি প্রকাশিত প্যাকেজ **Ed25519-সাইনড**; `signature` ও `signer` বাধ্যতামূলক।
- পাবলিক কী `packages/store-schema/trusted-keys.json`-এ; প্রাইভেট কী **কখনো** রিপোতে নয়।
- archive↔manifest মিল (id, version, entry, permissions) যাচাই হয়।
- remote URL অপ্রাপ্য = **failure**, skip নয়।

বিস্তারিত: [যাচাই পাইপলাইন](/store/verification/)।

---

## ৫. সৎ রিপোর্টিং নিয়ম

- ব্যাকএন্ড না থাকলে কম্পোনেন্ট **"not detected"** রিপোর্ট করে — ভুয়া মান নয়।
- কোনো নিরাপত্তা দাবির পিছনে প্রমাণ (সোর্স + test) থাকতে হবে।
- সুবিধা না থাকলে "নেই" বলে দিতে হবে — Guessing বা বানানো আচরণ নিষিদ্ধ।

---

## ৬. পরবর্তী পড়ুন

- [নিরাপত্তা ও স্যান্ডবক্সিং (OS)](/os/security/)
- [নীতি: পরিপক্বতা](/reference/maturity/)
- [লাইসেন্সিং](/reference/licensing/)
