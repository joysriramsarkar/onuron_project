# NilBus / SoftBus — convergence draft (13 Oct 2026)

> **সত্য অবস্থা:** আজ ৩টি পৃথক বাস্তবায়ন: `../../nilLang/pkg/softbus` (খালি/সূচনা), `../../onuronOS/softbus` (Rust, `ONUR` magic framing + `etc/nilos/ipc-policy.toml` auth), `../../nilos-emulator/internal/bus` (Go, pub/sub + request/response + DevTools log)।
> **লক্ষ্য:** একটাই wire spec + একটাই conformance transcript স্যুট; OS (Rust) ও টুলিং (Go) দুটোই সেটা পাস করবে।

## 1. ন্যূনতম চুক্তি (সব impl মানবে)
- Frame: `magic + request-id + lengths + payload`। **Max payload cap বাধ্যতামূলক** (e.g. 16 MB) — cap ছাড়া impl spec-compliant নয়।
- Service/method নামের length cap; status code + error message parse; heartbeat + reconnect; context timeout।
- Permission check: sender→target `can_communicate` + rate limit + max message size (যেমন পরিকল্পনায় প্রস্তাবিত `NilBus::send_message`)।

## 2. পরের ধাপ (RFC আকারে আসবে)
- [ ] ৩ impl-এর message format পাশাপাশি তুলনা → এক wire format বাছাই।
- [ ] `conformance/nilbus/` transcript fixtures (good + malicious: oversize, bad-magic, truncated)।
- [ ] OS auth (`runtime/nilsd/src/auth.rs` + `ipc-policy.toml`) live-boot audit-এর সাথে মিলানো।

## 3. Conformance (আজ যা আছে)
- onuronOS: `softbus` unit tests + `cargo test --workspace`।
- Emulator: `internal/bus` tests।
- nilLang: `pkg/softbus` — test নেই (impl শুরু হলে conformance এখানেও চলবে)।
