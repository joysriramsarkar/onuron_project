---
title: রেজিস্ট্রি ও API
description: স্টোরের static registry API — index feed, per-app endpoint এবং সাইট রুট।
---

স্টোর রেজিস্ট্রি **static** (Astro build-সময়ে উৎপন্ন)। কোনো লাইভ ডেটাবেস নেই — সব
ডেটা `apps/store/public/registry/apps/`-এর ম্যানিফেস্ট ফাইল থেকে আসে।

লোডার: `apps/store/src/lib/registry.ts` (`loadApps()`, `getApp(id)`), যা প্রতিটি
ম্যানিফেস্টে `iconUrl`/`screenshotUrls` যোগ করে নাম-অনুযায়ী সাজায়।

---

## ১. `GET /api/v1/index.json`

সম্পূর্ণ ফিড:

```json
{
  "feed": 1,
  "updated": "2026-10-12T00:00:00.000Z",
  "apps": [ /* AppManifest[] */ ]
}
```

- `feed` — ফিড ভার্সন (`1`)।
- `updated` — build সময়ে উৎপন্ন ISO টাইমস্ট্যাম্প।
- `apps` — সব প্রকাশিত ম্যানিফেস্টের অ্যারে।

সোর্স: `src/pages/api/v1/index.json.ts`।

---

## ২. `GET /api/v1/apps/<id>.json`

একটি অ্যাপের ম্যানিফেস্ট ফেরায়:

- সফল হলে: `AppManifest` (JSON)।
- না মিললে: `404` + `{ "error": "not found" }`।

সোর্স: `src/pages/api/v1/apps/[id].json.ts` (static path প্রতিটি `id`-এর জন্য)।

---

## ৩. ডেটার আকার (`AppManifest`)

সম্পূর্ণ ফিল্ড তালিকা: [ম্যানিফেস্ট স্পেসিফিকেশন](/store/manifest-spec/)।
API-স্পেসিফিক দুটি অতিরিক্ত ফিল্ড loader যোগ করে:

- `media.iconUrl` — `/registry/apps/<id>/<icon>`
- `media.screenshotUrls[]` — `/registry/apps/<id>/<screenshot>`

---

## ৪. সাইট রুট

| রুট | কাজ |
|---|---|
| `/` | স্টোর হোম |
| `/apps` | সব অ্যাপ |
| `/apps/<id>` | অ্যাপ ডিটেইল |
| `/categories/<category>` | ক্যাটাগরি-ভিত্তিক তালিকা |
| `/developers` | ডেভেলপার তথ্য |
| `/developers/submit` | সাবমিশন নির্দেশনা |
| `/developers/badge` | "Available on Onuron" ব্যাজ |
| `/privacy`, `/terms`, `/policy/*` | নীতিমালা |

---

## ৫. ক্লায়েন্ট ব্যবহার

```bash
# সব অ্যাপ
curl -s https://store.onuron.org/api/v1/index.json | jq '.apps[].id'

# একটি অ্যাপ
curl -s https://store.onuron.org/api/v1/apps/org.onuron.calculator.json | jq '.name, .version'
```

> `updated` ফিল্ড deploy time প্রতিফলিত করে — এটি লাইভ আপডেট স্ট্রিম নয়।

---

## ৬. পরবর্তী পড়ুন

- [ম্যানিফেস্ট স্পেসিফিকেশন](/store/manifest-spec/)
- [যাচাই পাইপলাইন](/store/verification/)
- [প্যাকেজ ম্যানেজার (onuronOS)](/os/package-manager/)
