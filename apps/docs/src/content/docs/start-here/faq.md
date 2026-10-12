---
title: সাধারণ প্রশ্ন (FAQ)
description: অনুরণ ইকোসিস্টেম সম্পর্কে সচরাচর জিজ্ঞাসা ও সৎ উত্তর।
---

## অনুরণ কি একটি Android ROM বা fork?

**না।** onuronOS একটি স্বাধীন Linux-ভিত্তিক OS। Android সমর্থন একটি **বিচ্ছিন্ন
compat স্তর** (`android/`, `android-host/`) — native ভিত্তি নয়। দেখুন
[Android কম্প্যাটিবিলিটি](/os/android-compatibility/)।

---

## canonical ভাষা কোনটি?

**nilLang (Go)**। Rust `runtime/nillang` একটি **ইচ্ছাকৃত subset** (OS-embedded UI-app),
আর `alap-framework`-এর নিজস্ব ডাইলেক্ট **canonical নয়** — এটি canonical-এ অভিসৃত হবে।
দেখুন [nil কম্প্যাটিবিলিটি](/nil/compatibility/)।

---

## alap-framework কি একই NilLang?

আংশিক। alap তার নিজস্ব ডায়ালেক্ট ব্যবহার করে (`function`, `let`/`var`/`const`,
`@Component`/`@State`, `build()`), যা canonical থেকে আলাদা। ভাষা-চুক্তিতে canonical-ই
অগ্রগণ্য।

---

## টার্মিনালের আলাদা রিপো কোথায়?

**নেই।** টার্মিনাল `onuronOS`-এর `nilshell`-এ অন্তর্নির্মিত। দেখুন
[টার্মিনাল](/os/terminal/)।

---

## আমি কি আসল ফোনে flash করতে পারি?

এখনো না। কোনো কম্পোনেন্ট **physical-device tested** নয়; onuronOS QEMU-তে
তৈরি ও পরীক্ষিত। দেখুন [পরিপক্বতা ম্যাপ](/reference/maturity/)।

---

## স্টোরে কি আসল (finished) অ্যাপ আছে?

এখন সমস্ত অ্যাপ **Reference / Developer Preview** (`releaseStage: reference`) —
platform ডেমো, চূড়ান্ত product নয়। Phase C-তে একটি অ্যাপ আসল স্তর পাবে।
দেখুন [রোডম্যাপ](/reference/roadmap/)।

---

## লাইসেন্স কোনটি?

প্রকল্প-মালিকানাধীন সব: **AGPL-3.0**; `alap-framework` ও `nilos-emulator` **MIT**
carve-out। দেখুন [লাইসেন্সিং](/reference/licensing/)।

---

## AGPL মানে কি ব্যবহার নিষিদ্ধ?

**না।** AGPL বাণিজ্যিক ব্যবহার/বিক্রি নিষিদ্ধ করে না; তবে নেটওয়ার্কে দিলে সোর্স
উন্মুক্ত করতে হয়।

---

## emulator কি আসল OS চালায়?

ডিফল্টে না। এটি প্রতিটি অ্যাপ আলাদা worker প্রসেসে চালায় এবং ভার্চুয়াল HAL দেয়।
একটি **System Mode** (QEMU) ঐচ্ছিকভাবে আসল framebuffer দেখায় — image/QEMU থাকলে,
নাহলে `available:false`, ভুয়া লগ নয়। দেখুন
[এমুলেটর আর্কিটেকচার](/emulator/architecture/)।

---

## প্যাকেজ কেন সাইন করতে হয়?

কারণ গেট **unsigned** প্যাকেজ প্রত্যাখ্যান করে — যাচাইযোগ্য publisher পরিচয় ছাড়া
কিছু রেজিস্ট্রিতে ঢুকতে পারে না। দেখুন [যাচাই পাইপলাইন](/store/verification/)।

---

## কোথা থেকে শুরু করব?

দেখুন [শুরু করুন](/start-here/getting-started/)।
