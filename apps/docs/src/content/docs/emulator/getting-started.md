---
title: nilos-emulator শুরু করুন
description: NilOS Studio — ডিভাইস তৈরি, অ্যাপ ইনস্টল/লঞ্চ, CLI ও কনফিগারেশন।
---

**NilOS Studio** (`nilos-emulator`) হলো NilLang / Onuron অ্যাপের জন্য একটি
**অ্যাপ-রানটাইম এমুলেটর** — Android Studio-সদৃশ ডেভেলপার অভিজ্ঞতা, কিন্তু হার্ডওয়্যার
ভার্চুয়ালাইজেশনের ভার ছাড়াই। এটি পূর্ণ QEMU সিস্টেম মেশিন নয়; প্রতিটি অ্যাপ একটি
আলাদা worker প্রসেস হিসেবে চলে এবং একটি versioned JSON প্রোটোকলে কথা বলে।

---

## ১. দ্রুত শুরু

```powershell
# worker বিল্ড, তারপর studio চালান
go build -o bin/nilosd.exe ./cmd/nilosd
go run . --open
```

ব্রাউজারে খুলুন: **http://127.0.0.1:8085/studio.html**

1. একটি ডিভাইস **Create** করুন (NilPhone Ultra / NilPad Pro / NilPOS / NilOS Desktop)।
2. **Start** করুন।
3. `firmware/sample-notes.nilax` (আগেই সাইনড ও trusted) **Install** করুন।
4. `org.nilang.notes` **Launch** করুন — UI tree লাইভ রেন্ডার হয়, tap অ্যাপে ফেরত যায়।

---

## ২. CLI (`nilctl`)

```powershell
go build -o bin/nilctl.exe ./cmd/nilctl
$d = (.\bin\nilctl.exe create --profile nilphone-ultra | ConvertFrom-Json).id
.\bin\nilctl.exe start $d
.\bin\nilctl.exe install firmware/sample-notes.nilax --device $d
.\bin\nilctl.exe launch org.nilang.notes --device $d
.\bin\nilctl.exe screenshot screen.svg org.nilang.notes --device $d
.\bin\nilctl.exe battery 15 --device $d
.\bin\nilctl.exe fault printer print --code paper_out --device $d
```

---

## ৩. কী চলে (বাস্তব)

| স্তর | ইমপ্লিমেন্টেশন |
|---|---|
| ডিভাইস ম্যানেজার | `internal/emulator` — profile, lifecycle, persistence |
| অ্যাপ worker | `internal/runtime` — NilHost Protocol v1 (stdio), প্রতি অ্যাপে একটি session |
| ভার্চুয়াল হার্ডওয়্যার | `internal/hal` — battery, network, storage, printer (ESC/POS), scanner, sensors, clock, clipboard, notifications + **fault injection** |
| ইন্টার-অ্যাপ বাস | `internal/bus` — NilBus pub/sub + request/response (DevTools log) |
| প্যাকেজ | `internal/packages` — `.nilax` zip + Ed25519, zip-slip-safe extraction |
| স্যান্ডবক্স | `internal/vfs` + `internal/sandbox` — per-app VFS ও resource limit (Job Object/cgroup) |
| রেকর্ড/রিপ্লে | `internal/record` — `.nilrec` (input/IME/HAL ইভেন্ট) |
| ডিবাগিং | `internal/lsp` (`nilsp`) + `internal/dap` (`nildap`) |
| রেন্ডারিং | `internal/render` — Alap tree → SVG (golden screenshot test) |
| Control API | `internal/api` — REST + SSE (UI ও CLI একই API) |

অ্যাপ আলাদা প্রসেস (`nilosd`) হিসেবে চলে — ক্র্যাশ করলে এমুলেটর পড়ে না, এবং clean
message ছাড়াও exit শনাক্ত হয়।

---

## ৪. কনফিগারেশন (`nilemu.toml`)

```toml
listen_addr = "127.0.0.1"
[server]
port = 8085
# data_dir = "~/.nilemu"
allow_unsigned = false
[keys]
dev-sample = "<hex ed25519 public key>"
```

পরিবেশ ভেরিয়েবল: `NILEMU_ADDR`, `NILEMU_PORT`, `NILEMU_DATA`, `NIL_BIN`,
`NILOSD_BIN`, `NILEMU_TOKEN`, `NILEMU_FIRMWARE`, `NILEMU_ALLOW_UNSIGNED`,
`NILEMU_QEMU`, `NILEMU_OS_IMAGE`।

---

## ৫. নিরাপত্তা

- শুধু **127.0.0.1**-এ bind করে।
- cross-origin অনুরোধ প্রত্যাখ্যাত; mutating call-এ `X-Nilemu-Token` (`NILEMU_TOKEN`) লাগতে পারে।
- অ্যাপ ফাইল অ্যাক্সেস **virtual filesystem**-এর মধ্য দিয়ে (`..`, symlink, drive/UNC path প্রত্যাখ্যাত)।
- legacy terminal endpoint একটি **virtual shell**; arbitrary host command execution সরানো হয়েছে।

---

## ৬. পরবর্তী পড়ুন

- [এমুলেটর আর্কিটেকচার](/emulator/architecture/)
- [NilHost Protocol](/emulator/protocol/)
- [ভার্চুয়াল হার্ডওয়্যার (NilHAL)](/emulator/hal/)
- [ডিবাগিং](/emulator/debugging/)
