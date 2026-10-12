---
title: ডেভেলপার সাবমিশন গাইড
description: Onuron App Store-এ প্যাকেজ বিল্ড, সাইন ও জমা দেওয়ার সম্পূর্ণ প্রক্রিয়া।
---

Onuron App Store একটি **Git-চালিত** রেজিস্ট্রি। কোনো কেন্দ্রীয় ডেটাবেস নেই —
প্রকাশিত প্রতিটি অ্যাপ `onuron_project` রিপোজিটরির `apps/store/`-এ ফাইল হিসেবেই
থাকে এবং একটি PR + CI গেটের মাধ্যমে যুক্ত হয়।

> **পুনরুৎপাদনযোগ্যতার নিয়ম:** প্রতিটি প্রকাশিত প্যাকেজের **সোর্স**
> `apps/store/registry-src/`-এ রাখা বাধ্যতামূলক, যাতে কেউ বাইনারি থেকে নয়, সোর্স
> থেকেই প্যাকেজ পুনর্নির্মাণ করতে পারে।

---

## ০. যা যা লাগবে

1. একটি রিভার্স-ডোমেইন `id` — যেমন `org.yourname.appname` (শুধু ছোট হাতের
   অক্ষর, সংখ্যা, `.`, `-`)।
2. একটি SemVer `version` — যেমন `1.0.0`।
3. একটি `icon.svg` (প্যাকেজ ফোল্ডারে থাকবে, `media.icon`-এ নাম দিতে হবে)।
4. **আসল** প্যাকেজ আর্টিফ্যাক্ট — `.nilax` (ZIP) বা `.onp` (tar)।
5. একটি Ed25519 সাইনিং কী (প্রাইভেট কী কখনো রিপোতে নয় — দেখুন §৫)।

---

## ১. সোর্স রাখুন (`registry-src/`)

```text
apps/store/registry-src/org.yourname.appname/
├── nil.json        # project manifest (নিচে)
└── src/main.nil    # অ্যাপের সোর্স
```

`nil.json` উদাহরণ:

```json
{
  "name": "org.yourname.appname",
  "version": "1.0.0",
  "author": "Your Team",
  "description": "এক লাইনের বর্ণনা।",
  "entry": "src/main.nil",
  "capabilities": ["stdout"],
  "targets": ["onuron"],
  "resources": [],
  "dependencies": {},
  "build": { "output_dir": "build", "optimize": true, "debug": false },
  "scripts": { "start": "nil run", "build": "nil build" }
}
```

---

## ২. প্যাকেজ বিল্ড করুন

```bash
cd apps/store/registry-src/org.yourname.appname
nil build
# -> build/org.yourname.appname-1.0.0.nilax
```

তারপর আর্টিফ্যাক্টটি সার্ভ-করা ডিরেক্টরিতে কপি করুন:

```bash
cp build/org.yourname.appname-1.0.0.nilax \
   ../../public/packages/org.yourname.appname-1.0.0.nilax
```

---

## ৩. রেজিস্ট্রি ফোল্ডার ও ম্যানিফেস্ট

```text
apps/store/public/registry/apps/org.yourname.appname/
├── manifest.json      # প্রকাশিত ম্যানিফেস্ট
└── icon.svg           # media.icon এই ফাইলের নাম
```

ম্যানিফেস্টে `package.size` ও `package.sha256` **আসল** আর্টিফ্যাক্ট থেকে নিতে হবে:

```bash
# size (বাইট) ও sha256
node -e "const f=require('fs');const c=require('crypto');const b=f.readFileSync('apps/store/public/packages/org.yourname.appname-1.0.0.nilax');console.log(b.length, c.createHash('sha256').update(b).digest('hex'))"
```

সম্পূর্ণ ফিল্ড রেফারেন্স: [ম্যানিফেস্ট স্পেসিফিকেশন](/store/manifest-spec/)।

---

## ৪. প্যাকেজ সাইন করুন

প্রাইভেট কী secret manager-এ রাখুন। পাবলিক কী `packages/store-schema/trusted-keys.json`-এ
থাকবে (`id` + `key`)।

```bash
# কী-পেয়ার তৈরি (একবার)
node packages/store-schema/scripts/sign-package.mjs --generate-keypair

# প্যাকেজ সাইন (প্রাইভেট কী base64 raw 32-byte বা PEM path)
pnpm --filter @onuron/store-schema sign \
  apps/store/public/packages/org.yourname.appname-1.0.0.nilax \
  "$ONURON_STORE_SIGNING_KEY"
```

প্রিন্ট হওয়া base64 সিগনেচার ম্যানিফেস্টের `package.signature`-এ বসান, এবং
`package.signer`-এ `trusted-keys.json`-এর `id` দিন। **সিগনেচার ও সাইনার দুটোই
বাধ্যতামূলক** — না থাকলে গেট ব্যর্থ হয়।

বিস্তারিত: [যাচাই পাইপলাইন](/store/verification/)।

---

## ৫. লোকাল গেট চালান

```bash
pnpm --filter @onuron/store-schema validate          # স্কিমা + ফরম্যাট
pnpm --filter @onuron/store-schema validate:verify   # + size, sha256, signature, archive
```

`validate:verify` প্রতিটি প্যাকেজ তার committed `package.path` থেকে পড়ে — অর্থাৎ
সার্ভ হবে ঠিক সেই বাইটই যাচাই হয়, CDN deploy হয়েছে কি না তার উপর নির্ভর করে না।

---

## ৬. Pull Request ও CI

সব ফাইল কমিট করে `main`-এ PR খুলুন। CI গেট
`.github/workflows/app-registry-gate.yml` চলে:

- ম্যানিফেস্ট স্কিমা ও ক্যাটাগরি
- placeholder/ভুয়া checksum প্রত্যাখ্যান
- size + SHA-256 মিল
- Ed25519 সিগনেচার (trusted key)
- archive↔manifest মিল (id, version, entry, permissions)

---

## ৭. সৎ লেবেল (`releaseStage`)

| মান | অর্থ |
|---|---|
| `reference` | বিল্ট-ইন reference/developer-preview অ্যাপ — platform ডেমো, চূড়ান্ত product নয় |
| `preview` | ব্যবহারযোগ্য, তবে পরিবর্তনশীল |
| `stable` | production-ready, end-to-end release gate দ্বারা আবৃত |

বর্তমান সমস্ত রেজিস্ট্রি অ্যাপ `reference` লেবেলযুক্ত। কোনো `stable` দাবি করতে
হলে end-to-end release gate পাশ করতে হবে।

---

## ৮. লাইসেন্স নীতি

এই রিপোজিটরি থেকে প্রকাশিত অ্যাপ ম্যানিফেস্টে `"license": "AGPL-3.0"` রাখা হয়
(স্পষ্টভাবে থার্ড-পার্টি না হলে)। বিস্তারিত: [লাইসেন্সিং](/reference/licensing/)।

---

## ৯. পরবর্তী পড়ুন

- [ম্যানিফেস্ট স্পেসিফিকেশন](/store/manifest-spec/)
- [প্যাকেজ ফরম্যাট](/store/package-format/)
- [যাচাই পাইপলাইন](/store/verification/)
- [রেজিস্ট্রি API](/store/registry-api/)
