---
title: যাচাই পাইপলাইন (Verification)
description: স্টোর রিলিজ গেট — স্কিমা, placeholder সনাক্তকরণ, size, SHA-256, Ed25519 ও archive মিল।
---

প্রতিটি প্রকাশিত প্যাকেজ একটি কঠোর রিলিজ গেট অতিক্রম করে। ভ্যালিডেটর:
`packages/store-schema/scripts/validate.mjs`। দুটি মোড:

```bash
pnpm --filter @onuron/store-schema validate          # স্কিমা + ফরম্যাট
pnpm --filter @onuron/store-schema validate:verify   # + size, sha256, signature, archive
```

---

## ১. স্কিমা-পর্যায় (সবসময় চলে)

| পরীক্ষা | ব্যর্থ হলে |
|---|---|
| `id` = ফোল্ডার নাম ও regex-সিদ্ধ | error |
| `name`, `summary` অ-খালি | error |
| `version`, `minOs` SemVer | error |
| `arch` অ-খালি ও `{x86_64,aarch64,riscv64}`-এর উপসেট | error |
| `package.url` `https://` | error |
| URL path এক্সটেনশন `.nilax`/`.onp` | error |
| `sha256` ৬৪ হেক্স | error |
| `size` > 0 | error |
| `package.path` relative, `..`/absolute নয় | error |
| `package.signature` উপস্থিত ও ৬৪ বাইট | error |
| `package.signer` উপস্থিত | error |
| `permissions` string[] | error |
| `releaseStage` ∈ `{reference,preview,stable}` | error |
| `category` অনুমোদিত ৮টির একটি | error |
| `developer.name` উপস্থিত | error |
| `media.icon` ফাইল বিদ্যমান | error |
| প্রতিটি screenshot ফাইল বিদ্যমান | error |

---

## ২. Placeholder চেকসাম প্রত্যাখ্যান

ভুয়া বা পরীক্ষামূলক hash **কঠোর error** — `--verify` ছাড়াও। নিম্নলিখিতগুলো
শনাক্ত হয়:

- সব-শূন্য (`000…0`) বা একই অক্ষর পুনরাবৃত্ত (`ffff…`)।
- পরিচিত পরীক্ষা-স্ট্রিংয়ের SHA-256 (`abc`, `test`, `hello`, `nil`, `nilax` …)।
- পুনরাবৃত্ত ছোট ব্লক প্যাটার্ন (`a1b2c3d4a1b2c3d4…`)।
- ক্রমিক হেক্স প্যাটার্ন (`a1b2c3d4e5f6…`)।

> কারণ: `"abc"`-এর hash প্রকাশ করলে CI এমন প্যাকেজে সফল দেখাত যার অস্তিত্বই নেই।

---

## ৩. বাইট-স্তরের যাচাই (`--verify`)

### কী ডাউনলোড/পড়া হয়

- `package.path` থাকলে: `apps/store/public/<path>` থেকে **সরাসরি** পড়া হয় (কোনো
  নেটওয়ার্ক নেই; CDN-নির্ভরতা নেই)।
- নাহলে: `package.url` থেকে ডাউনলোড (১৫ সেকেন্ড timeout)।
- **URL অপ্রাপ্য বা non-2xx = ব্যর্থতা, skip নয়** — প্রকাশিত remote প্যাকেজ অবশ্যই
  ডাউনলোডযোগ্য ও যাচাইযোগ্য হতে হবে।

### যা মেলানো হয়

1. **size** — `buf.length === package.size`।
2. **SHA-256** — `sha256(buf) === package.sha256` (lowercase)।
3. **Ed25519 সিগনেচার** — `package.signature` (base64) trusted কী দিয়ে যাচাই।
4. **archive মিল** — আর্কাইভ খুলে ভিতরের `manifest.json`-এর সাথে তুলনা:
   - `app_name`/`id` = প্রকাশিত `id`
   - `app_version`/`version` = প্রকাশিত `version`
   - প্যাক করা প্রতিটি `permissions` প্রকাশিত `permissions`-এ উপস্থিত
   - `entry_bytecode`/`entry` আর্কাইভে উপস্থিত ও অ-খালি

---

## ৪. বিশ্বস্ত কী (`trusted-keys.json`)

`packages/store-schema/trusted-keys.json` একটি অ্যারে, প্রতিটি এন্ট্রি:

```json
{
  "id": "onuron-team",
  "key": "2GP8Kmmby3M8Yhl57O/H5pWL59jWxiDmx8hkc5qryd0=",
  "note": "…raw 32-byte Ed25519 public key, base64…"
}
```

- `key` — raw 32-byte Ed25519 পাবলিক কী (base64), অথবা PEM।
- `id` — ম্যানিফেস্টের `package.signer` এই `id` নাম দেয়।
- প্রাইভেট কী **কখনো** রিপোতে নয় — secret manager-এ থাকবে (maintainer-পরিচালিত)।
- রোটেশন: নতুন keypair তৈরি করে নতুন `id`-এ পাবলিক কী যোগ করুন, তারপর প্রকাশিত
  প্যাকেজ পুনরায় সাইন করুন।

---

## ৫. ব্যর্থতার সেমান্টিক্স (সংক্ষেপে)

- unsigned এন্ট্রি → **fail**।
- `package.path` ঘোষিত কিন্তু ফাইল নেই → **fail**।
- remote URL অপ্রাপ্য/non-2xx → **fail**।
- placeholder checksum → **fail**।
- archive খোলা না গেলে বা ভিতরের ম্যানিফেস্ট না মিললে → **fail**।

---

## ৬. পরবর্তী পড়ুন

- [প্যাকেজ ফরম্যাট](/store/package-format/)
- [ম্যানিফেস্ট স্পেসিফিকেশন](/store/manifest-spec/)
- [ডেভেলপার সাবমিশন গাইড](/store/developer-guide/)
