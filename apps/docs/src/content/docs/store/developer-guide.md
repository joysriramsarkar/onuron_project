---
title: ডেভেলপার সাবমিশন গাইড (Store Developer Guide)
description: Onuron App Store-এ নতুন অ্যাপ্লিকেশন প্যাকেজিং, টেস্ট এবং সাবমিট করার পদ্ধতি।
---

Onuron App Store হলো একটি সম্পূর্ণ Git-চালিত ও উন্মুক্ত অ্যাপ্লিকেশন বিতরণ কেন্দ্র। ডেভেলপাররা সরাসরি GitHub Pull Request এর মাধ্যমে অ্যাপ জমা দিতে পারেন।

## সাবমিশনের প্রস্তুতি

একটি অ্যাপ্লিকেশন জমা দেওয়ার জন্য আপনার নিম্নলিখিত বিষয়গুলো প্রয়োজন:
1. একটি অনন্য রিভার্স-ডোমেইন আইডি (যেমন: `org.yourname.appname`)
2. ভ্যালিড SemVer ভার্সন (যেমন: `1.0.0`)
3. `icon.svg`: ১২৮x১২৮ সাইজের ভেক্টর আইকন
4. বাইনারি ডাউনলোড ইউআরএল এবং ফাইলের SHA256 চেকসাম
5. উন্মুক্ত সোর্স কোড রিপোজিটরি লিংক

---

## ১. ম্যানিফেস্ট তৈরি

`manifest.json` ফাইল তৈরি করুন:

```json
{
  "id": "org.myorg.calculator",
  "name": "QuickCalc",
  "version": "1.0.0",
  "summary": "দ্রুত হিসাব-নিকাশের আধুনিক সায়েন্টিফিক ক্যালকুলেটর।",
  "description": "অনুরণ ওএসের জন্য নির্মিত দ্রুত ও পারফরম্যান্ট ক্যালকুলেটর অ্যাপ্লিকেশন।",
  "category": "utilities",
  "license": "MIT",
  "developer": {
    "name": "My Team",
    "website": "https://myorg.org"
  },
  "package": {
    "arch": "x86_64",
    "url": "https://cdn.myorg.org/packages/calculator-1.0.0.onp",
    "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  },
  "media": {
    "iconUrl": "/registry/apps/org.myorg.calculator/icon.svg",
    "screenshots": []
  }
}
```

---

## ২. লোকাল ভ্যালিডেশন চালানো

মোনোরিপো ডিরেক্টরিতে আপনার অ্যাপের ফোল্ডার `apps/store/public/registry/apps/org.myorg.calculator/` এ ফাইলগুলো রাখুন এবং টেস্ট চালান:

```bash
pnpm validate
```
যদি ম্যানিফেস্টে কোনো ভুল থাকে (যেমন ভুল ক্যাটাগরি, ছোট SHA256 বা মিসিং আইকন), ভ্যালিডেটর ত্রুটি চিহ্নিত করবে।

---

## ৩. গিটহাবে PR তৈরি করা

আপনার ব্রাঞ্চ গিটহাবে পুশ করে মূল রিপোজিটরিতে Pull Request ওপেন করুন। আমাদের স্বয়ংক্রিয় CI গেট (`.github/workflows/app-registry-gate.yml`) আপনার অ্যাপ পরীক্ষা করে স্বয়ংক্রিয়ভাবে অনুমোদন দেবে।
