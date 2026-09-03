# Onuron Monorepo
onuron.org · os · alap · nil · docs · store

## Setup
```bash
pnpm install
pnpm dev        # সব সাইট একসাথে
pnpm build      # প্রোডাকশন বিল্ড
pnpm validate   # app registry ভ্যালিডেশন
```

## Structure
- `apps/main`: `onuron.org` (ব্র্যান্ড হোমপেজ)
- `apps/os`: `os.onuron.org` (onuronOS ল্যান্ডিং পেজ)
- `apps/alap`: `alap.onuron.org` (alap-framework)
- `apps/nil`: `nil.onuron.org` (nilLang ল্যাঙ্গুয়েজ)
- `apps/docs`: `docs.onuron.org` (কেন্দ্রীয় ডকুমেন্টেশন - Starlight)
- `apps/store`: `store.onuron.org` (App Store storefront & OS client API feed)
- `packages/ui`: শেয়ার্ড Astro কম্পোনেন্ট ও স্টাইল সিস্টেম
- `packages/store-schema`: App Store Manifest JSON Schema, TS Types ও ভ্যালিডেটর
