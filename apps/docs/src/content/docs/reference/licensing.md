---
title: লাইসেন্সিং নীতি
description: ইকোসিস্টেম-ব্যাপী লাইসেন্স নিয়ম, AGPL-3.0-এর প্রকৃত অর্থ এবং MIT carve-out।
---

> **নিয়ম:** প্রকল্প-মালিকানাধীন সব কম্পোনেন্ট **GNU Affero General Public License
> v3.0 (AGPL-3.0)**-এর অধীনে।

উৎস: [`docs/LICENSING.md`](https://github.com/joysriramsarkar/onuron_project/blob/main/docs/LICENSING.md)।

---

## ১. প্রতিটি রিপোজিটরি

| রিপোজিটরি | লাইসেন্স | নোট |
|---|---|---|
| `nilLang` | AGPL-3.0 | Canonical language implementation |
| `onuronOS` | AGPL-3.0 | GPL-3.0 থেকে relicensed (GPLv3 → AGPLv3 অনুমোদিত) |
| `onuron_project` | AGPL-3.0 | Store, docs, ecosystem meta |
| `alap-framework` | MIT | §৩ — MIT carve-out |
| `nilos-emulator` | MIT | §৩ — MIT carve-out |

এই প্রকল্প থেকে প্রকাশিত স্টোর অ্যাপ ম্যানিফেস্টে (স্পষ্ট থার্ড-পার্টি না হলে)
`"license": "AGPL-3.0"` থাকবে। **Terminal `onuronOS`-এর ভিতরে `nilshell`-এ থাকে;
আলাদা কোনো টার্মিনাল রিপোজিটরি নেই।**

---

## ২. AGPL-3.0 আসলে কী বোঝায়

- AGPL-3.0 **বাণিজ্যিক ব্যবহার বা বিক্রি নিষিদ্ধ করে না** — লাইসেন্স মানলে যে কেউ
  সফটওয়্যার (বা তার উপর গড়া সেবা) বিক্রি করতে পারে।
- শক্তিশালী copyleft অর্থ: সফটওয়্যার distribute করলে, বা **নেটওয়ার্কে ব্যবহারকারীকে
  অফার করলে**, সংশ্লিষ্ট **সোর্স কোড** একই লাইসেন্সে ব্যবহারকারীর জন্য উন্মুক্ত করতে হবে।
- derivative work-ও AGPL-3.0-ই থাকবে।

অর্থাৎ নিশ্চয়তা হলো *freedom + source availability*, "বাণিজ্যিক পুনর্বিক্রি নিষিদ্ধ" নয়।

---

## ৩. MIT carve-out (`alap-framework`, `nilos-emulator`)

এই দুটি আগে **MIT**-তে প্রকাশিত। তাদের `LICENSE` MIT-ই থাকবে — কারণ:

- ইতিমধ্যে provided একটি লাইসেন্স পরবর্তীতে অন্য `LICENSE` ফাইল যোগ করে
  প্রত্যাহার করা যায় না। অতীতের MIT রিলিজ MIT-ই থাকে।
- এই রিপোতে নতুন contribution MIT-ই থাকবে (maintainer ভবিষ্যতে পরিবর্তন না করলে)।

এই কম্পোনেন্ট ভবিষ্যতে canonical AGPL কোডবেসে মিলিত হলে *নতুন কোড* AGPL-3.0 হতে পারে,
আর ঐতিহাসিক MIT কোড তার বিদ্যমান অনুমতি ধরে রাখবে।

---

## ৪. নীতি বদলালে

পরিবর্তন আগে এখানে লিপিবদ্ধ করুন, তারপর রিপো-ভিত্তিক প্রয়োগ করুন।

| বিকল্প | বাণিজ্যিক পুনর্বিক্রি নিষিদ্ধ? | "open source"? |
|---|---|---|
| AGPL-3.0 (বর্তমান) | না | হ্যাঁ |
| Source-Available, non-commercial | হ্যাঁ (contractually) | **না** |
| Dual-licence (AGPL-3.0 + paid commercial) | না | হ্যাঁ (AGPL দিক) |

---

## ৫. Contribution ও ownership

- Contribution রিপোর `LICENSE`-এর অধীনে গ্রহণ করা হয়।
- ভবিষ্যতের dual-licensing-এর জন্য maintainer-এর সব contribution relicence করার
  অধিকার লাগবে (যেমন CLA)। সেটি **এখন নেই**, তাই আজ dual-licensing সম্ভব নয়।

---

## ৬. পরবর্তী পড়ুন

- [রোডম্যাপ](/reference/roadmap/)
- [পরিপক্বতা ম্যাপ](/reference/maturity/)
- [ডেভেলপার সাবমিশন গাইড](/store/developer-guide/)
