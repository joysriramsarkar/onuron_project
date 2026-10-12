---
title: এমুলেটর আর্কিটেকচার
description: nilos-emulator-এর worker প্রসেস মডেল, supervisor, NilBus, VFS/স্যান্ডবক্স ও সিস্টেম মোড।
---

`nilos-emulator` (`nilemu`) একটি **আলাদা-প্রসেস worker** মডেল অনুসরণ করে: এমুলেটরে
অ্যাপ-লজিক থাকে না, সে শুধু ইভেন্ট পাঠায় ও ফ্রেম রেন্ডার করে।

---

## ১. স্তর-চিত্র

```text
Studio UI (public/studio.html)  ──  Control API (internal/api, REST+SSE)
        │                                    │
        └──────────── DevTools / CLI ────────┤
                                             ▼
                                   Supervisor (internal/supervisor)
                                             │  spawn/monitor
                          ┌──────────────────┼──────────────────┐
                          ▼                  ▼                  ▼
                     nilosd (app A)     nilosd (app B)     … (worker procs)
                          │  NilHost Protocol v1 (stdio JSON)
                          ▼
              Virtual HAL · NilBus · VFS/Sandbox
```

---

## ২. উপাদান

| প্যাকেজ | দায়িত্ব |
|---|---|
| `internal/config` | `nilemu.toml` + env override |
| `internal/emulator` | ডিভাইস profile, lifecycle, persistence |
| `internal/supervisor` | worker প্রসেস spawn/নজরদারি; ক্র্যাশ → synthesized `exit` |
| `internal/runtime` | NilHost Protocol v1 session |
| `internal/hal` | ভার্চুয়াল ডিভাইস + fault injection |
| `internal/bus` | NilBus pub/sub ও request/response (+ DevTools log) |
| `internal/vfs`, `internal/sandbox` | per-app ফাইলসিস্টেম ও resource limit |
| `internal/packages` | `.nilax` zip যাচাই, Ed25519, zip-slip-safe extraction |
| `internal/render` | Alap tree → SVG |
| `internal/textutil` | grapheme-cluster (UAX #29 subset) Bengali cursor/backspace |
| `internal/record` | `.nilrec` capture/replay |
| `internal/lsp`, `internal/dap` | `nilsp` (LSP), `nildap` (DAP) |
| `internal/qemu` | ঐচ্ছিক System Mode (QMP + framebuffer) |
| `internal/jsonwire` | JSON framing |

---

## ৩. নিরাপত্তা সীমানা

- `nilosd` আলাদা প্রসেস — একটি ক্র্যাশ বাকি এমুলেটরকে নেয় না।
- অ্যাপের ফাইল অ্যাক্সেস VFS-নিয়ন্ত্রিত; `..`/symlink/drive path প্রত্যাখ্যাত।
- প্যাকেজ ইনস্টল সাইনড `.nilax`-এ সীমিত, `allow_unsigned` ডেভ-মোড ছাড়া।
- Control API শুধু loopback; cross-origin বাতিল।

---

## ৪. System Mode (ঐচ্ছিক, QEMU)

```powershell
go build -o bin/nilstudio.exe ./cmd/nilstudio
$env:NILEMU_QEMU = "C:\Program Files\qemu\qemu-system-x86_64.exe"
$env:NILEMU_OS_IMAGE = "onuron.img"
```

QEMU হেডলেসে চলে (QMP control socket); **আসল** framebuffer `screendump` দিয়ে
PPM→PNG হিসেবে stream হয় (`/api/qemu/framebuffer`)। QEMU বা image না থাকলে এন্ডপয়েন্ট
`available:false` রিপোর্ট করে — **কোনো ভুয়া রেজিস্টার বা কার্নেল লগ নয়**।

---

## ৫. পরিপক্বতা (সৎভাবে)

| দিক | অবস্থা |
|---|---|
| ডিভাইস ম্যানেজার + lifecycle | ✅ Functional |
| NilHost Protocol v1 | ✅ Functional |
| ভার্চুয়াল HAL + fault injection | ✅ Functional |
| `.nilax` ইনস্টল + সিগনেচার যাচাই | ✅ Functional |
| LSP/DAP | ✅ Functional (mock VM-এ bytecode line নেই — বানানো হয় না) |
| System Mode (QEMU) | 🟡 ঐচ্ছিক, image/qemu থাকলে |

---

## ৬. পরবর্তী পড়ুন

- [NilHost Protocol](/emulator/protocol/)
- [ভার্চুয়াল হার্ডওয়্যার](/emulator/hal/)
- রেফারেন্স: `nilos-emulator/README.md`
