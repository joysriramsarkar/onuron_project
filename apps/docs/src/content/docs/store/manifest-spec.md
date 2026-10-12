---
title: ম্যানিফেস্ট স্পেসিফিকেশন
description: manifest.json-এর সম্পূর্ণ ফিল্ড রেফারেন্স, ক্যাটাগরি, arch ও releaseStage।
---

প্রকাশিত প্রতিটি অ্যাপের জন্য
`apps/store/public/registry/apps/<id>/manifest.json` বাধ্যতামূলক। টাইপ ডেফিনিশন:
`packages/store-schema/src/types.ts`; ভ্যালিডেটর: `packages/store-schema/scripts/validate.mjs`।

---

## ১. সর্বোচ্চ স্তরের ফিল্ড

| ফিল্ড | টাইপ | আবশ্যক | নিয়ম |
|---|---|---|---|
| `id` | `string` | ✅ | রিভার্স-ডোমেইন; **ফোল্ডার নামের সাথে হুবহু মিলতে হবে**; regex `^[a-z0-9-]+(\.[a-z0-9-]+)+$` |
| `name` | `string` | ✅ | খালি নয় |
| `summary` | `string` | ✅ | খালি নয় (এক লাইনের বর্ণনা) |
| `description` | `string` | — | পূর্ণাঙ্গ বর্ণনা |
| `version` | `string` | ✅ | SemVer (`1.0.0`, `1.2.3-beta.1`) |
| `minOs` | `string` | ✅ | SemVer; সর্বনিম্ন onuronOS ভার্সন |
| `arch` | `string[]` | ✅ | অ-খালি; মান সীমিত (§৩) |
| `category` | `string` | ✅ | অনুমোদিত ৮টির একটি (§২) |
| `tags` | `string[]` | — | সার্চ ট্যাগ |
| `license` | `string` | — | SPDX আইডি; নীতি অনুযায়ী `AGPL-3.0` |
| `releaseStage` | `string` | — | `reference` \| `preview` \| `stable` (ডিফল্ট `stable`) |
| `permissions` | `string[]` | — | ঘোষিত capability; প্যাকেজের ভিতরের manifest-এর superset হতে হবে |
| `developer` | `object` | ✅ | `name` আবশ্যক (§৪) |
| `package` | `object` | ✅ | (§৫) |
| `media` | `object` | ✅ | `icon` আবশ্যক (§৬) |

---

## ২. অনুমোদিত ক্যাটাগরি (৮টি)

`productivity`, `utilities`, `media`, `games`, `development`, `communication`,
`education`, `security`।

> **সতর্কতা:** `system`, `developer-tools` ইত্যাদি এই স্কিমায় **নেই**। ভুল ক্যাটাগরি
> গেট ব্যর্থ করায়।

---

## ৩. আর্কিটেকচার (`arch`)

শুধু এই তিনটি মান অনুমোদিত: `x86_64`, `aarch64`, `riscv64`।

```json
"arch": ["x86_64", "aarch64"]
```

---

## ৪. `developer`

| ফিল্ড | টাইপ | আবশ্যক |
|---|---|---|
| `name` | `string` | ✅ |
| `email` | `string` | — |
| `url` | `string` | — |

```json
"developer": { "name": "Onuron Team", "email": "dev@onuron.org", "url": "https://onuron.org" }
```

> পুরনো ডকে `website` লেখা ছিল — স্কিমার আসল ফিল্ড নাম **`url`**।

---

## ৫. `package`

| ফিল্ড | টাইপ | আবশ্যক | নিয়ম |
|---|---|---|---|
| `url` | `string` | ✅ | `https://` দিয়ে শুরু; এক্সটেনশন `.nilax` বা `.onp` |
| `path` | `string` | — | `apps/store/public`-এর ভিতরে relative (absolute বা `..` নিষিদ্ধ); থাকলে CI এই committed বাইটই যাচাই করে |
| `size` | `number` | ✅ | > 0 (বাইট) |
| `sha256` | `string` | ✅ | ৬৪ হেক্স অক্ষর; placeholder যথা `abc`-এর hash নিষিদ্ধ |
| `signature` | `string` | ✅ | base64 Ed25519 সিগনেচার (৬৪ বাইট) |
| `signer` | `string` | ✅ | `trusted-keys.json`-এর কী `id` |

```json
"package": {
  "url": "https://store.onuron.org/packages/org.onuron.calculator-1.0.0.nilax",
  "path": "packages/org.onuron.calculator-1.0.0.nilax",
  "size": 1421,
  "sha256": "877f100ecc18e4970bd81887d2fda2d355fb1e45ae4bfca83962cf1bb14325f8",
  "signature": "…base64…",
  "signer": "onuron-team"
}
```

---

## ৬. `media`

| ফিল্ড | টাইপ | আবশ্যক | নিয়ম |
|---|---|---|---|
| `icon` | `string` | ✅ | অ্যাপ ফোল্ডারে ফাইলের **নাম** (যেমন `icon.svg`); ফাইলটি থাকতে হবে |
| `screenshots` | `string[]` | — | প্রতিটি নাম অ্যাপ ফোল্ডারে থাকতে হবে |

> `iconUrl`/`screenshotUrls` **আপনি লিখবেন না** — registry loader
> (`apps/store/src/lib/registry.ts`) এগুলো সাইটের জন্য স্বয়ংক্রিয়ভাবে তৈরি করে।

---

## ৭. সম্পূর্ণ উদাহরণ

```json
{
  "id": "org.yourname.appname",
  "name": "Your App",
  "summary": "এক লাইনের বর্ণনা।",
  "version": "1.0.0",
  "minOs": "0.9.0",
  "arch": ["x86_64", "aarch64"],
  "category": "utilities",
  "tags": ["demo"],
  "license": "AGPL-3.0",
  "releaseStage": "reference",
  "permissions": ["stdout"],
  "developer": { "name": "Your Team", "email": "dev@yourname.org", "url": "https://yourname.org" },
  "package": {
    "url": "https://store.onuron.org/packages/org.yourname.appname-1.0.0.nilax",
    "path": "packages/org.yourname.appname-1.0.0.nilax",
    "size": 1234,
    "sha256": "…64 hex…",
    "signature": "…base64…",
    "signer": "your-signer-id"
  },
  "media": { "icon": "icon.svg", "screenshots": [] }
}
```

---

## ৮. পরবর্তী পড়ুন

- [প্যাকেজ ফরম্যাট](/store/package-format/)
- [যাচাই পাইপলাইন](/store/verification/)
- [ডেভেলপার সাবমিশন গাইড](/store/developer-guide/)
