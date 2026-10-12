---
title: কনকারেন্সি মডেল (Concurrency)
description: nilLang-এর task/await, Future, channel এবং structured concurrency।
---

nilLang-এর কনকারেন্সি মডেল lightweight asynchronous task ও **structured
concurrency scope**-এর উপর গড়া। এতে manual thread management নেই এবং
lifecycle ownership নির্ধারক (deterministic), ফলে data-race হ্রাস পায়।

---

## ১. মূল কনস্ট্রাক্ট

| কনস্ট্রাক্ট | অর্থ |
|---|---|
| `task { ... }` | একটি asynchronous computation spawn করে, `Future<T>` ফেরায় |
| `await future` | `future` resolve হওয়া পর্যন্ত ফ্রেম suspend করে; মান দেয় বা ব্যর্থতা propagate করে |

```nil
let job = task {
    return computeHeavy();
};

let result = await job;
```

---

## ২. Task lifecycle

```text
     ┌──────────┐
     │ Pending  │
     └────┬─────┘
          │ schedule
          ▼
     ┌──────────┐
     │ Running  │
     └────┬─────┘
   ┌──────┼──────────┐
 resolve│  reject   cancel
   ▼      ▼          ▼
 Resolved Errored  Cancelled
```

টার্মিনাল স্টেট: `Resolved`, `Errored`, `Cancelled`। একবার টার্মিনাল স্টেটে গেলে
task পুনরায় চালু হয় না।

---

## ৩. Structured concurrency

একটি scope-এর ভিতরে spawn করা task scope শেষ হওয়ার আগে হয় resolve বা cancel
হয় — "fire-and-forget" লিক এড়ানো যায়। এতে নির্ধারক lifecycle ownership বজায়
থাকে।

---

## ৪. Channel (message passing)

Runtime-স্তরের channel API `std/concurrency/channel`-এ:

```nil
import "std/concurrency/channel" as ch;

let c = ch.create(8);          // বাফার ধারণক্ষমতা 8
ch.sendValue(c, 1);
let v = ch.receiveValue(c);
```

- `selectRecv` — একাধিক channel থেকে নির্বাচন।
- `pipeline` — producer/consumer প্যাটার্ন।
- `std/concurrency/sync` — channel-ভিত্তিক mutex (`newMutex`, `withLock`) ও
  once-guard (`newOnce`, `doOnce`)।
- `std/concurrency/pool` — bounded worker pool (`map`, `runEach`), ordered results।

---

## ৫. Task API ও `withTimeout`

`std/concurrency/task`: `spawn`, `spawnWith`, `wait`, `waitAll`, `mapAsync`।
VM-নেটিভ `withTimeout` রয়েছে যা নির্দিষ্ট সময়ে closure কে সমাপ্ত করে।

---

## ৬. বর্তমান সীমাবদ্ধতা (সৎভাবে)

- concurrency সেমান্টিক্স **কোর ফ্রিজ**-এ আছে, তবে সম্পূর্ণ runtime coverage
  এখনো সব ক্ষেত্রে প্রমাণিত নয়।
- মেমরি মডেলের GC একীকরণ সম্পূর্ণ নয় (দেখুন
  [টাইপ ও মেমরি](/nil/types-and-memory/#৫-মেমরি-মডেল)), তাই কিছু concurrency
  behavior এখনো পরীক্ষাধীন।

রেফারেন্স: `nilLang/docs/spec/CONCURRENCY.md`।
