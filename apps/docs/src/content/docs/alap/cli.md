---
title: alap CLI ও টুলচেইন
description: alap-framework-এর তিনটি বাইনারি — nil, nilc, nills এবং তাদের কমান্ড রেফারেন্স।
---

alap-framework তিনটি বাইনারি সরবরাহ করে:

| বাইনারি | কাজ |
|---|---|
| `nil` | প্রকল্প CLI (init, run, build, test, fmt, repl, pm…) |
| `nilc` | স্বতন্ত্র NilLang কম্পাইলার (`source.nil` → `.nabc`) |
| `nills` | এডিটরের জন্য Language Server (LSP over stdio) |

```bash
go build -o bin/nil   ./cmd/nil
go build -o bin/nilc  ./cmd/nilc
go build -o bin/nills ./cmd/nills
```

---

## ১. `nil` — প্রকল্প CLI

```text
nil init <name>          নতুন NilLang প্রকল্প
nil run [file]           কম্পাইল ও চালান
nil build <platform>     onuron|android|ios|linux
nil check                সব .nil টাইপ-চেক
nil fmt                  সব .nil ফরম্যাট
nil test                 টেস্ট চালান
nil repl                 REPL
nil lsp                  language server চালু
nil pm <sub>             প্যাকেজ ম্যানেজার (install, add, remove, list)
nil add <pkg>            ডিপেন্ডেন্সি যোগ
nil clean                build artifact পরিষ্কার
nil version              ভার্সন
nil help                 ব্যবহার
```

`nil build <platform>` NABC bytecode সংশ্লিষ্ট অ্যাডাপ্টারের
`GenerateProject`-এ পাঠায়।

---

## ২. `nilc` — স্বতন্ত্র কম্পাইলার

```text
nilc [flags] [input.nil] [output.nabc]

  -in <file>     ইনপুট .nil
  -out <file>    আউটপুট .nabc
  -run           কম্পাইল ও সাথে সাথে চালান
  -check         শুধু টাইপ-চেক
  -dump          AST ও bytecode disassembly প্রিন্ট
```

```bash
nilc -check src/main.nil
nilc src/main.nil out/main.nabc
nilc -run src/main.nil
nilc -dump src/main.nil
```

---

## ৩. `nills` — language server

stdio-তে LSP চালায় এবং diagnostic প্রকাশ করে:

- `textDocument/completion`
- `textDocument/hover`
- `textDocument/definition`
- `textDocument/references`
- `textDocument/rename`
- `textDocument/documentSymbol`

এডিটরের LSP ক্লায়েন্ট `nills`-এর দিকে পয়েন্ট করুন।

---

## ৪. পরবর্তী পড়ুন

- [প্রথম অ্যাপ](/alap/first-app/)
- [প্ল্যাটফর্ম](/alap/platforms/)
- [টেস্টিং](/alap/testing/)
