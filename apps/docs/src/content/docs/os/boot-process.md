---
title: বুট প্রক্রিয়া ও nilinit
description: onuronOS-এর মাল্টি-স্টেজ বুট চেইন, পার্টিশন টপোলজি এবং nilinit PID 1 সুপারভিশন।
---

এই ডকুমেন্ট onuronOS-এর ফার্মওয়্যার হ্যান্ডঅফ থেকে সিস্টেম সুপারভিশন পর্যন্ত
সম্পূর্ণ বুট সিকোয়েন্স বর্ণনা করে।

---

## ১. মাল্টি-স্টেজ বুট পাইপলাইন

```text
┌─────────────────┐
│     Stage 0     │  Firmware / Bootloader (AVB / Ed25519 Verified Boot)
│   (Bootloader)  │  boot signature ও vbmeta.img যাচাই
└────────┬────────┘
         ▼
┌─────────────────┐
│     Stage 1     │  Kernel (vmlinuz-lts) initramfs → tmpfs
│   (initramfs)   │  early environment-এ /init (nilinit) চালায়
└────────┬────────┘
         ▼
┌─────────────────┐
│     Stage 2     │  immutable system rootfs মাউন্ট
│  (System Root)  │  SELinux policy লোড, root switch, সার্ভিস সুপারভাইজ
└─────────────────┘
```

---

## ২. পার্টিশন টপোলজি ও স্টোরেজ

A/B slot redundancy সহ standard GPT/UFS লেআউট:

| পার্টিশন | টাইপ | মাউন্ট | উদ্দেশ্য |
|---|---|---|---|
| `boot_a` / `boot_b` | Raw | — | Linux LTS kernel + boot DTB |
| `system_a` / `system_b` | ext4 / EROFS | `/system` | immutable base system |
| `vendor_a` / `vendor_b` | ext4 / EROFS | `/vendor` | device-specific HAL/firmware |
| `cache` | ext4 | `/cache` | tmp OTA download buffer |
| `recovery` | ext4 | `/recovery` | standalone disaster recovery |
| `metadata` | ext4 | `/metadata` | encryption key metadata, rollback counter |
| `userdata` | ext4 (fscrypt v2) | `/data` | user data, per-user encrypted |

বিস্তারিত: [স্টোরেজ ও ফাইলসিস্টেম](/os/filesystem/)।

---

## ৩. `nilinit` — PID 1 সিস্টেম সুপারভাইজার

Rust-এ লেখা `nilinit` নিম্নলিখিত দায়িত্ব পালন করে:

1. **Early mounts** — `/proc` (proc), `/sys` (sysfs), `/dev` (devtmpfs),
   `/run` (tmpfs), `/tmp` (tmpfs)।
2. **পরিচ্ছন্ন standard logging** — `/dev/kmsg` ও `/dev/console`-এ `[  OK  ]`।
3. **cgroup v2** — `/sys/fs/cgroup/onuron.slice`।
4. **SELinux policy injection** — `/etc/selinux/targeted/policy/policy.33` →
   `/sys/fs/selinux/load`।
5. **Service supervision & socket activation** — `/etc/nilos/services.toml` পার্স।
6. **Crash recovery** — exponential backoff-এ auto restart; hardware watchdog ping (`nilwdt`)।
7. **Graceful shutdown** — SIGTERM → SIGKILL → unmount/sync।

---

## ৪. `services.toml` — সার্ভিস টপোলজি

```toml
[[services]]
name = "inputd"
exec = "/usr/bin/inputd"
restart = "always"

[[services]]
name = "powerd"
exec = "/usr/bin/powerd"
restart = "always"

[[services]]
name = "netd"
exec = "/usr/bin/netd"
restart = "always"

[[services]]
name = "nilshell"
exec = "/usr/bin/nilshell"
restart = "always"

# lazy, socket-activated (ক্লায়েন্ট socket-এ লিখলে তবেই চালু)
[[services]]
name = "notifyd"
exec = "/usr/bin/notifyd"
socket_activation = "/run/onuron/notify.sock"
```

---

## ৫. Socket activation lifecycle

1. `nilinit` স্টার্টআপে listening UNIX socket bind করে
   (যেমন `/run/onuron/notify.sock`)।
2. Socket non-blocking মোডে রাখা হয়, event polling চালু।
3. কোনো ক্লায়েন্ট connect করলে `nilinit` pending connection দেখে।
4. `nilinit` সার্ভিস চালু করে FD পাস করে env-এ
   (`LISTEN_FDS=1`, `LISTEN_FDNAMES=notifyd`)।
5. Daemon `nilsd` crate দিয়ে FD গ্রহণ করে ও সাথে সাথে সার্ভ করে।

এতে অলস ডিমন মেমরি খরচ করে না, আবার প্রথম কলে দ্রুত শুরু হয়।

---

## ৬. বর্তমান অবস্থা

এটি একটি **Functional Prototype**: QEMU-তে bootable, automated headless boot
smoke harness সহ। কোনো physical device-এ যাচাই হয়নি।
