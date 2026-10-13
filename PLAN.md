# onuron_project — প্ল্যান (পোর্টাল + ডকস + স্টোর)

> Astro/Turborepo/pnpm, AGPL-3.0। `apps/{main,os,alap,nil,docs,store}` + `packages/{ui,store-schema}`। `node_modules/.turbo` আছে।

## বর্তমান অবস্থা
- 6 সাইট (brand + os/alap/nil/docs-Starlight + store) + `api/v1/index.json` feed + R2 CDN পরিকল্পনা + `org.onuron.*` রেফারেন্স অ্যাপ।
- বাকি: `store-schema` placeholder-hash, `registry-src/` → signed `.nilax` → `public/packages/` + `trusted-keys.json`, `onuron://store/install` deep-link, legal (Content/DMCA/Dev-Agreement/Privacy/Terms), 6 Vercel deploy + DNS/SSL।

## পরের 5
1. `pnpm install && pnpm validate && pnpm build` সবুজ নিশ্চিত।
2. Store registry populate: build/sign `.nilax` → sha256/size/signature সহ feed।
3. OS Store-client polling + deep-link তারে জোড়া।
4. Legal পেজ + বাংলা-প্রথম ডকস (Starlight i18n)।
5. Deploy + status page + playground (WASM) রোডম্যাপ।

## DoD
- `pnpm validate` + `build` সবুজ; feed-এ প্রতিটি প্যাকেজের hash/sig যাচাইযোগ্য।

## এই সেশনে
- [ ] `pnpm validate/build` স্মোক (পরিবেশ থাকলে) + ফলাফল রেকর্ড।
