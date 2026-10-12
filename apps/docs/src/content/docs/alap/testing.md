---
title: alap-framework টেস্টিং
description: alap-framework-এর go build/vet/test গেট, টেস্ট লেআউট এবং কভারেজ ম্যাপ।
---

alap-framework conventional Go টেস্ট ব্যবহার করে। CI (`.github/workflows/ci.yml`)
Linux/macOS/Windows-এ চালায়:

1. `go mod verify`
2. `go vet ./...`
3. `go test -v ./...`
4. `bin/nil`, `bin/nilc`, `bin/nills` বিল্ড

> **`go vet` একটি বাধ্যতামূলক গেট** — নতুন কোনো warning CI ফেল করায়।

---

## ১. স্থানীয় কমান্ড

```bash
go build ./...          # সব প্যাকেজ কম্পাইল
go vet ./...            # static analysis (পরিষ্কার থাকতে হবে)
go test ./...           # unit + integration
go test -race ./...     # race detector (C toolchain দরকার)
go test -cover ./...    # coverage
```

---

## ২. টেস্ট লেআউট

| এলাকা | টেস্ট ফাইল |
|---|---|
| Compiler | `compiler/{lexer,parser,types,codegen,hir,formatter,lsp}/*_test.go` |
| Runtime | `runtime/{vm,actor,gc,scheduler}/*_test.go`, `runtime/nilrt/pipeline_test.go` |
| UI | `ui/{engine,layout,render,state,theme,widgets}/*_test.go` |
| Web | `web/{router,middleware,server,ssr,sse,websocket}/*_test.go` |
| Data | `data/{orm,migration}/*_test.go`, `stdlib/nil/nil_test.go` |
| Platforms | `platform/{android,ios,linux,onuron,web}/*_test.go` |
| Package manager | `pkg/manager/manager_test.go` |
| ABI | `abi/nilabi_test.go` |
| End-to-end | `tests/integration_test.go`, `examples/pos/*_test.go` |

---

## ৩. কভারেজ ম্যাপ

প্রতিটি প্যাকেজ অন্তত একটি টেস্ট দ্বারা exercised: `abi`, `auth`,
`compiler/{lexer,parser,types,codegen,hir,formatter,lsp}`, `runtime/{vm,actor,gc,scheduler,nilrt}`,
`ui/{engine,layout,render,state,theme,widgets}`, `web/{router,middleware,server,ssr,sse,websocket}`,
`data/{orm,migration}`, `stdlib/{json,math,nil}`, `pkg/manager`,
`platform/{android,ios,linux,onuron,web}`।

### ডেডিকেটেড টেস্ট নেই (জানা gap)

| প্যাকেজ | কেন |
|---|---|
| `cmd/{nil,nilc,nills}` | CLI entry point; `tests/` দিয়ে পরোক্ষভাবে exercised |
| `compiler/ast` | নিছক data type |
| `runtime/repl` | interactive loop; scripted stdin হার্নেস দরকার |
| `stdlib/{async,core,crypto,database,fs,log,net,time}` | library binding; VM দিয়ে exercised |
| `ui/animation` | easing/interpolation |
| `platform/onuron/{nilbus,nilhal,nilui}` | host-hardware shim; প্রকৃত device ছাড়া অর্থহীন |

এই gap-গুলো `docs/ROADMAP.md`-এ track করা।

---

## ৪. একটি টেস্ট লেখা

`tests/integration_test.go` থেকে end-to-end প্যাটার্ন:

```go
l := lexer.New("test.nil", src)
tokens := l.Tokenize()

p := parser.New("test.nil", tokens)
prog := p.Parse()

gen := codegen.New("test")
gen.GenerateProgram(prog)
blob := codegen.Serialize(gen.Module())

// blob চালান runtime/vm (বা runtime/nilrt) দিয়ে
```

টেস্ট deterministic রাখুন। concurrency-সensitive টেস্ট ইচ্ছাকৃতভাবে worker
(`runtime/scheduler`) বা mailbox (`runtime/actor`) block করে timeout/error path প্রমাণ করে।

---

## ৫. পরবর্তী পড়ুন

- রেফারেন্স: `alap-framework/docs/TESTING.md`
- [alap CLI](/alap/cli/)
