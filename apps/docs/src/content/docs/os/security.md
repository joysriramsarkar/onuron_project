---
title: নিরাপত্তা ও স্যান্ডবক্সিং
description: SELinux CIL, namespace/seccomp sandbox, permission broker, fscrypt এবং fail-closed invariant।
---

onuronOS-এ নিরাপত্তা ও গোপনীয়তা ভিত্তি-স্তরের প্রয়োজন (optional নয়)। এই
আর্কিটেকচার defense-in-depth অনুসরণ করে: mandatory access control, cryptographic
verification, hardware-backed encryption এবং process isolation।

---

## ১. SELinux Policy Engine (CIL)

`security/selinux/`-এ enforcing CIL পলিসি:

```text
security/selinux/
├── 00-base.cil         # types, roles, classes, permissions
├── 10-domains.cil      # daemon isolation, execution transitions
├── 20-app-mcs.cil      # per-app MCS isolation
├── 90-neverallow.cil   # অলঙ্ঘনীয় নিষেধ (neverallow)
└── file_contexts       # cryptographic file labels
```

অলঙ্ঘনীয় invariant (`90-neverallow.cil`):
- ব্যবহারকারী অ্যাপ কখনো raw device node (`/dev/block/*`, `/dev/mem`) পড়তে/লিখতে পারে না।
- কোনো unconfined daemon নেই; প্রতিটি সার্ভিস ন্যূনতম privilege-এ সীমাবদ্ধ।
- immutable system image কোনো non-recovery process remount RW করতে পারে না।

---

## ২. Process Sandboxing (`runtime/nilrt`)

প্রতিটি নেটিভ/তৃতীয়-পক্ষ অ্যাপ একটি isolated sandbox-এ চলে:

1. **Linux namespaces** — `CLONE_NEWPID` (অন্য প্রসেস অদৃশ্য), `CLONE_NEWNS`
   (private mount), `CLONE_NEWNET` (অনুমতি ছাড়া নেটওয়ার্ক নেই), `CLONE_NEWIPC`,
   `CLONE_NEWUTS`।
2. **Seccomp-BPF** — বিপজ্জনক syscall ব্লকলিস্ট (`ptrace`, `kexec_load`, `bpf`,
   `reboot`); প্রায় **১১০ syscall allowlist**।
3. **per-app UID** — প্রতিটি অ্যাপ অনন্য unprivileged UID (যেমন 10000+) পায়।
4. **Permission broker (`permbroker`)** — `camera`, `microphone`, `location`,
   `contacts`, `phone`, `sms`, `bluetooth`, `network`, `storage`, `notifications`
   ইত্যাদি capability UNIX socket-এ `nilrt`-এর কাছে অনুরোধ করতে হয়।
   স্টেট: `DENIED`, `GRANTED`, `GRANTED_WHILE_IN_USE`; **৭ দিনের auto-revoke**।

---

## ৩. Cryptographic Package Verification (`nilpkg`)

সব `.nilax` প্যাকেজ enrolled developer/system authority দিয়ে স্বাক্ষরিত হতে হবে:

- **Digest:** payload bytes-এর SHA-256।
- **Signature:** canonical manifest metadata-র উপর Ed25519।
- **Enforcement:** ভুল সিগনেচার, mismatch hash বা অনুপস্থিত সিগনেচার হলে ইনস্টল প্রত্যাখ্যাত।

বিস্তারিত: [ভেরিফিকেশন পাইপলাইন](/store/verification/)।

---

## ৪. Storage Encryption (`fscrypt v2` ও `nilkeyd`)

`/data/user/<uid>` partition সংরক্ষিত:
- Cipher: AES-256-XTS (contents), AES-256-CTS (filenames)।
- Master key user credential (PIN/passphrase/biometric) থেকে derived, TEE/keystore-এ enrolled।
- `nilkeyd` runtime-এ key ব্যবস্থাপনা: initial unlock-এ enroll, device lock/timeout-এ memory থেকে evict।
- per-app directory separation — একটি compromise অ্যাপঅন্যের ডেটা decrypt করতে পারে না।

---

## ৫. ফ্রেমড IPC নিরাপত্তা (`nilprotocol`)

- `ONUR` magic preamble যাচাই।
- **1 MiB**-এর বেশি frame প্রত্যাখ্যাত (`IpcError::PayloadTooLarge`)।
- message type enum bound যাচাই।
- peer UID/GID credential যাচাই (`SO_PEERCRED`)।

বিস্তারিত: [সিস্টেম সার্ভিস ও IPC](/os/services/)।

---

## ৬. Fail-Closed Invariant Matrix

নিরাপত্তা চেক কখনো "fail open" করবে না:

| ব্যর্থতা | প্রত্যাশিত fail-closed আচরণ | Enforcement point |
|---|---|---|
| সিগনেচার mismatch | ইনস্টল বন্ধ, staging মুছে ফেলা | `nilpkg::verify_signature` |
| অবিশ্বস্ত publisher key | `UntrustedPublisher` দিয়ে প্রত্যাখ্যান | `nilpkg::keymgmt` |
| archive-এ path traversal | unpack বাতিল (`..`, absolute, escaping symlink) | `nilpkg::safe_extract_archive` |
| seccomp setup ব্যর্থ | process launch ব্যর্থ, filter ছাড়া child চলে না | `nilrt::seccomp::enforce_strict_filter` |
| namespace isolation ব্যর্থ | launch বাতিল; unconfined execution নিষিদ্ধ | `nilrt::sandbox::spawn_sandboxed` |
| > 1 MiB IPC | frame প্রত্যাখ্যান, socket drop | `protocol::Frame::read_from` |
| OTA downgrade | `rollback_index` কম হলে আপডেট বাতিল | `nilupd::anti_rollback_protection` |

---

## ৭. Zero-Telemetry চার্টার

- কোনো diagnostics call-home, unique device ID বা usage statistic নেই।
- সব বিল্ড reproducible pipeline-এ — ব্যবহারকারী byte-for-byte যাচাই করতে পারেন।
- crash report কেবল লোকাল encrypted storage (`/data/logs/crash/`), `crashd` দ্বারা।

---

## ৮. দুর্বলতা প্রকাশ নীতি

- গোপন রিপোর্ট: `security@onuron.org` বা GitHub Security Advisories।
- critical privilege-escalation/crypto-bypass/sandbox-escape → **৪৮ ঘণ্টায়** triage।
- সমর্থিত রিলিজ ব্র্যাঞ্চে patch + regression test।
- compromised publisher key → revoked-এ যোগ + বর্ধিত `rollback_index`-সহ জরুরি signed OTA।

দেখুন: [রেফারেন্স — নিরাপত্তা নীতি](/reference/security-policy/)।
