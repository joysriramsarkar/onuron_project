---
title: কম্পোনেন্ট ও স্টাইলিং (Components & Styling)
description: alap-framework-এর @Component/@State মডেল, widget বিল্ডার, modifier ও থিম টোকেন।
---

alap-framework-এ UI হলো একটি **ডিক্লেয়ারেটিভ কম্পোনেন্ট ট্রি**। কম্পোনেন্টে
`@State` থাকলে তা বদলালে `ui/state`-এর signal/reconciler ট্রি diff করে পুনরায়
রেন্ডার করে।

> alap ডায়ালেক্ট `@Component`/`@State` ও `build()` ব্লক ব্যবহার করে। ক্যানোনিক্যাল
> nilLang UI `component { state ...; render {...} }` ব্যবহার করে — দেখুন
> [nilLang টিউটোরিয়াল](/nil/tutorial/#১০-ডিক্লেয়ারেটিভ-কম্পোনেন্ট-alapnilui)।

---

## ১. কম্পোনেন্ট গঠন

```nil
@Entry
@Component
component Card {
    @State title: string = "শিরোনাম"
    @State count: i32 = 0

    build() {
        Column {
            Text(title).fontSize(20)
            Text("গণনা: " + count.toString())
            Button("যোগ") { onClick => { count += 1 } }
        }
    }
}
```

- `@Entry` — রুট কম্পোনেন্ট চিহ্নিত করে।
- `@Component` — কম্পোনেন্ট ঘোষণা।
- `@State` — পরিবর্তনযোগ্য, ট্রি reconcile করে।
- `build()` — ডিক্লেয়ারেটিভ widget গাছ।

---

## ২. বিল্ট-ইন widget (`ui/widgets`)

| Widget | সিগনেচার |
|---|---|
| `Column(children...)` | উল্লম্ব স্ট্যাক |
| `Row(children...)` | অনুভূমিক স্ট্যাক |
| `Text(content)` | টেক্সট |
| `Button(label, onClick)` | বাটন |
| `TextInput(placeholder, onChange)` | ইনপুট ফিল্ড |
| `Image(source, width, height)` | ছবি |
| `Card(children...)` | কার্ড |
| `Divider()` | বিভাজক |
| `Spacer()` | ফাঁকা স্থান |
| `Switch(isOn, onToggle)` | টগল |

> **নোট:** canonical NilLang-এর অনেক বড় NilUI কম্পোনেন্ট ক্যাটালগ (Page, Dashboard,
> Button, Card ইত্যাদি) `nilLang/docs/spec/CATALOG.md`-এ ৫৪টি এন্ট্রি নিয়ে আছে।
> alap-prototype-এ widget সেট এখন ছোট।

---

## ৩. Modifier ও ইভেন্ট

প্রপার্টি `.` দিয়ে যুক্ত হয়, ইভেন্ট arrow handler দিয়ে:

```nil
Button("সংরক্ষণ") {
    onClick => { save() }
}
.padding({ horizontal: 24, vertical: 12 })
.backgroundColor("#176BFF")
.color("#FFFFFF")
.borderRadius(8)
.borderWidth(1)
.fontSize(16)
```

লেআউট `ui/layout`-এ flex/leaf নিয়মে হিসাব হয় (`ComputeLayout`)।

---

## ৪. থিম টোকেন

`ui/theme` ডিফল্ট প্যালেট দেয়:

```nil
// প্যালেট APIs
LightTheme()
DarkTheme()
```

সাধারণ টোকেন: primary/accent, background, surface, text, muted, border।
থিম API থেকে মান নিয়ে `.color(...)`/`.backgroundColor(...)`-এ দিন।

---

## ৫. অ্যানিমেশন

`ui/animation` easing ও interpolation দেয়:

| Easing | ব্যবহার |
|---|---|
| `Linear` | রৈখিক |
| `EaseInQuad` | ধীর শুরু |
| `EaseOutQuad` | ধীর শেষ |
| `EaseInOutCubic` | মসৃণ দুই প্রান্ত |
| `Spring` | স্প্রিং-ফিজিক্স |

---

## ৬. বর্তমান সীমাবদ্ধতা

- widget সেট ছোট; canonical NilUI-এর ৫৪-কম্পোনেন্ট ক্যাটালগ এখনো alap-prototype-এ নেই।
- হার্ডওয়্যার অ্যাক্সিলারেশন নেই — `ui/render` সফটওয়্যার rasteriser।
- থিম টোকেন সীমিত; পূর্ণ design-system এখনো অসম্পূর্ণ।

রেফারেন্স: `alap-framework/docs/ARCHITECTURE.md` (§4), `docs/LANGUAGE.md` (§11)।
