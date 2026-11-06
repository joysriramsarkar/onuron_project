# Conformance মানচিত্র (13 Oct 2026)

স্পেক-বদলের সাথে এই স্যুটগুলো সবুজ থাকতে হবে। নতুন স্পেক = নতুন ফিক্সচার এখানে।

| এলাকা | স্যুট | কমান্ড |
|---|---|---|
| ভাষা (3-engine parity) | `nilLang/tests/conformance`, `cross_engine`, `crossruntime` | `cd ../../nilLang && go test ./tests/... ./compiler/... ./pkg/...` |
| `.nilax` + signing | `pkg/bundle`, `pkg/signing`, emulator `internal/packages` | `cd ../../nilLang && go test ./pkg/bundle/... ./pkg/signing/...` + `cd ../../nilos-emulator && go test ./internal/packages/...` |
| NilHost v1 | emulator `internal/runtime`, `internal/render` golden, `tests/` | `cd ../../nilos-emulator && go test ./...` |
| HAL | emulator `internal/hal`, `internal/textutil` | `cd ../../nilos-emulator && go test ./internal/hal/... ./internal/textutil/...` |
| NilBus | OS `softbus`, emulator `internal/bus` (+ ভবিষ্যতে `conformance/nilbus/` transcripts) | `cd ../../onuronOS && cargo test -p <softbus-pkg>` + emulator bus tests |
| OS boot | `build/qemu-smoke.py`, persistence, recovery | OS CI (`linux-qemu.yml`) / `python3 build/qemu-smoke.py` |
| Store feed | `packages/store-schema` validate | `pnpm validate && pnpm build` |
| UI golden (ভবিষ্যৎ) | layout JSON golden + deterministic frame diff | TBD (alap M3) |

## Fixture নিয়ম
- Good + bad + malicious triple: প্রতিটি valid fixture-এর পাশে invalid ও adversarial case।
- Bytecode/protocol fixture-তে version field; version-bump = পুরোনো fixture রেখে নতুন যোগ (compat প্রমাণ)।
