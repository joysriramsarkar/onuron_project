---
title: first app — alap-framework
description: alap টুলচেইন দিয়ে প্রথম ডিক্লেয়ারেটিভ UI অ্যাপ তৈরি, চালানো ও বিল্ড করা।
---

এই গাইডে alap-framework-এর `nil` টুলচেইন দিয়ে একটি ছোট অ্যাপ তৈরি করা হবে।

> **ডায়ালেক্ট সতর্কতা:** alap-framework তার নিজস্ব NilLang ডায়ালেক্ট ব্যবহার করে
> (`function`, `let`/`var`/`const`, `@Component`/`@State`, `build()` ব্লক)। এটি
> খাঁটি **canonical** নয়। খাঁটির জন্য [nilLang টিউটোরিয়াল](/nil/tutorial/) দেখুন।

---

## ১. ইনস্টল ও প্রকল্প তৈরি

```bash
# টুলচেইন বিল্ড
go build -o bin/nil   ./cmd/nil
go build -o bin/nilc  ./cmd/nilc
go build -o bin/nills ./cmd/nills

# নতুন প্রকল্প
nil init my-first-app
cd my-first-app
```

সৃষ্ট কাঠামো:

```text
my-first-app/
├── alap.yaml           # প্রকল্প ম্যানিফেস্ট
└── src/
    ├── main.nil        # program entry point
    └── App.nil         # ডিক্লেয়ারেটিভ UI root component
```

---

## ২. `alap.yaml`

```yaml
name: my-first-app
version: 0.1.0
entry: src/main.nil

permissions:
  - storage.read
  - notifications

targets:
  onuron:  { arch: arm64 }
  android: { minSdk: 26, targetSdk: 35 }
  ios:     { minVersion: "16.0" }
  linux:   { display: wayland }

dependencies: {}
```

---

## ৩. কোড — `src/main.nil` ও `src/App.nil`

`main.nil` চালু করে, আর `App.nil` UI বর্ণনা করে:

```nil
// src/App.nil
@Entry
@Component
component App {
    @State count: i32 = 0
    @State message: string = "বোতামে চাপ দিন!"

    build() {
        Column {
            Text("কাউন্ট: " + count.toString())
                .fontSize(24)
                .color("#333333")

            Button("+১") {
                onClick => {
                    count += 1
                    message = "বাড়ল " + count.toString()
                }
            }
            .padding({ horizontal: 24, vertical: 12 })
            .backgroundColor("#176BFF")
            .color("#FFFFFF")
            .borderRadius(8)

            Text(message).fontSize(14).color("#666666")
        }
    }
}
```

`@State` পরিবর্তন হলে `ui/state`-এর signal/reconciler ট্রি diff করে UI আপডেট করে।

---

## ৪. চালান ও যাচাই করুন

```bash
nil run src/main.nil     # কম্পাইল + চালান (+ UI tree রিপোর্ট)
nil check                # টাইপ-চেক (diagnostics প্রিন্ট)
nil fmt                  # ফরম্যাট
nil repl                 # ইন্টারঅ্যাকটিভ পরীক্ষা
```

> **সীমাবদ্ধতা:** `runtime/types` এখনো non-fatal — চেকার diagnostics দেয় কিন্তু
> execution আটকায় না। তাই `nil check` পরিষ্কার দেখানো মানেই সব টাইপ-নিরাপদ নয়।

---

## ৫. বিল্ড

```bash
nil build onuron         # onuronOS .nilax বান্ডল
nil build linux          # AppImage/Flatpak-শৈলীর ডেস্কটপ বান্ডল
nil build android        # Gradle প্রকল্প + JNI ব্রিজ
nil build ios            # Swift/Metal প্রকল্প
```

প্ল্যাটফর্ম অ্যাডাপ্টারের বিস্তারিত: [প্ল্যাটফর্ম](/alap/platforms/)।
Onuron বান্ডল সাইন/ইনস্টলের ধাপ: [প্যাকেজ ম্যানেজার](/os/package-manager/)।

---

## ৬. প্যাকেজ ম্যানেজমেন্ট

```bash
nil pm install           # alap.lock অনুযায়ী ডিপেন্ডেন্সি
nil add somepkg@^1.2.0   # ডিপেন্ডেন্সি যোগ (alap.lock আপডেট)
nil pm list              # ইনস্টল করা ডিপেন্ডেন্সি
nil pm remove somepkg
```

`pkg/manager` (NilPM) `alap.yaml`/`alap.lock` চালায়; `Audit()` নিরাপত্তা চেক করে।

---

## ৭. পরবর্তী পড়ুন

- [alap আর্কিটেকচার](/alap/architecture/)
- [কম্পোনেন্ট ও স্টাইলিং](/alap/components-and-styling/)
- [alap CLI](/alap/cli/)
- [টেস্টিং](/alap/testing/)
