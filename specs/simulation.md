# Simulation — ভূমিকা-বিভাজন (13 Oct 2026, ADR)

> সিদ্ধান্ত: OS `nilsim/` **আর্কাইভ করা হবে না** — এটি ভিন্ন স্তরের, CI-কভার্ড Rust ডেস্কটপ সিমুলেটর।
> নিয়ম: নতুন অ্যাপ-রানটাইম সিমুলেশন শুধু `nilos-emulator`-এ (NilHost v1); OS-এ নতুন app-runtime sim নয়।

## তিন স্তর, তিন ভূমিকা

| স্তর | কোথায় | ভাষা | ভূমিকা | অবস্থা |
|---|---|---|---|---|
| Desktop device sim | `../../onuronOS/nilsim` (workspace member, `run-simulator.bat`, `windows-simulator.yml` CI) | Rust | System shell + framebuffer + font/audio stack-এর ডেস্কটপ-স্তরের ডিভাইস সিমুলেশন | 🟡 CI-built, tracked |
| App-runtime emulator | `../../nilos-emulator` (`internal/*`, NilHost v1) | Go | প্রতি-অ্যাপ worker, HAL, fault-injection, record/replay, golden — ডেভেলপার ডেইলি-ড্রাইভার | 🟡 Functional, canonical app-runtime |
| System mode (QEMU) | OS `build/qemu-*.sh` + emulator `internal/qemu` (QMP) | Rust/Go/py | Full-system boot, persistence, recovery যাচাই | 🔵 QEMU smoke |

## স্পষ্ট সীমানা
- `nilos-emulator/simulator/` (পুরোনো Go প্রোটোটাইপ) ও `nilsim/` (Rust shell prototype): **local-only, untracked** (`.gitignore`: `*.exe`, `/target/`) — রিপোতে আনা নয়, মুছাও নয় (ডেভেলপারের স্ক্র্যাচ)।
- OS-এ `.nilax` চালানো = ভবিষ্যতে NilHost-কম্প্যাটিবল runtime (`specs/README.md` নিয়ম); তার আগে OS `nilsim` system-shell-স্তরেই থাকবে, app-runtime দাবি করবে না (`[SIMULATED]` ব্যাজ নিয়ম বহাল)।
- এই সিদ্ধান্ত বদলাতে হলে RFC + conformance (QEMU smoke + NilHost transcript) একসাথে।

## Conformance (আজ)
- OS: `cargo build --release -p nilsim` (Windows CI) + `cargo test --workspace`।
- Emulator: `go test ./...` + golden SVG।
