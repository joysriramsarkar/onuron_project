# Onuron Specs — একটাই সত্য (v1.0, 13 Oct 2026)

এই ফোল্ডার ইকোসিস্টেমের **একমাত্র স্পেক-ইনডেক্স**। নিয়ম:
1. প্রতিটি এলাকার **একটাই canonical উৎস** (নিচের টেবিল)। বাকি সব রিপো সেটাই implement/import করবে, পুনর্লিখন নয়।
2. স্পেক বদল = **আগে RFC** (ছোট markdown প্রস্তাব), তারপর স্পেক, তারপর কোড + conformance ফিক্সচার একসাথে।
3. কোনো দাবি (🟢/🔵) টেস্ট/CI লিংক ছাড়া নয়। Simulated হলে `[SIMULATED]` ব্যাজ।

| এলাকা | Canonical উৎস | মালিক রিপো | সংস্করণ |
|---|---|---|---|
| ভাষা (NilLang) | `../../nilLang/docs/spec/LANGUAGE_SPEC_CANONICAL.md` (+ পূর্ণ `LANGUAGE_SPEC.md`) | nilLang | spec ফাইলে দেখুন |
| `.nilax` বান্ডিল + সাইনিং | `language-nilax.md` (এই ফোল্ডার) → impl: `../../nilLang/pkg/bundle`, `../../nilLang/pkg/signing` | nilLang | v1 (Ed25519, zip) |
| অ্যাপ-রানটাইম প্রোটোকল (NilHost) | `../../nilos-emulator/docs/protocol.md` | nilos-emulator | v1 (NDJSON stdio) |
| HAL | `../../nilos-emulator/docs/hal.md` (+ OS: `../../onuronOS/runtime/nilhal`) | nilos-emulator | v1 (12 class) |
| NilBus/SoftBus | `nilbus.md` (এই ফোল্ডার — convergence target; impl আজ ৩ জায়গায়: `nilLang/pkg/softbus`, `onuronOS/softbus`, emulator `internal/bus`) | — (TBD) | draft |
| স্টোর manifest schema | `../packages/store-schema` (+ `trusted-keys.json`) | onuron_project | — |

Conformance: `conformance/` — প্রতি এলাকায় কোথায় টেস্ট চলে তার মানচিত্র।
