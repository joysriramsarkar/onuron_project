# onuron_project — প্ল্যান (পোর্টাল + ডকস + স্টোর)

> Astro/Turborepo/pnpm, AGPL-3.0। `apps/{main,os,alap,nil,docs,store}` + `packages/{ui,store-schema}`। `node_modules/.turbo` আছে।

## বর্তমান অবস্থা
- 6 সাইট (brand + os/alap/nil/docs-Starlight + store) + `api/v1/index.json` feed + `org.onuron.*` রেফারেন্স অ্যাপ।
- Done: store registry populated — 6 signed `.nilax` packages in `apps/store/public/packages/`, sha256/size/signature in manifests, `trusted-keys.json` (`onuron-team`), `validate --verify` 6/6 (re-signed after 2026-11-06 key rotation; private key lives only outside the repo in `.onuron-keys/`, never committed).
- Done: legal pages present (Content/DMCA/Dev-Agreement/Privacy/Terms under `apps/store/src/pages/policy|developers|privacy|terms`).
- Done: `onuron://store/install` deep-link component (`packages/ui/components/InstallButton.astro`, `.nilax` download label).
- Done: contracts mirror pinned (`contracts.lock.json` with portable relative `source`, `sync-contracts.mjs --check` passes); `validate.mjs` root-finding is cwd-independent (`import.meta.dirname`).
- Done: honest labelling — playground is a print()-preview syntax demo (no WASM execution claim), OS download page is `Not yet released / PLANNED` (no unverified hashes, no physical-device claim; see `docs/ECOSYSTEM_MATURITY.md`).
- বাকি: R2 CDN পরিকল্পনা, OS Store-client polling wiring, 6 Vercel deploy + DNS/SSL, real store backend/submissions/payments (none exist yet — see maturity doc).

## পরের 5
1. [x] `pnpm build` সবুজ নিশ্চিত — 2026-11-06: turbo 6/6 successful (validate/validate:verify/contracts:check also green).
2. [x] Store registry populate: build/sign `.nilax` → sha256/size/signature সহ feed। (6/6 verified)
3. [ ] OS Store-client polling + deep-link তারে জোড়া (deep-link UI done; OS client wiring not verified).
4. [x] Legal পেজ (Content/DMCA/Dev-Agreement/Privacy/Terms present) + [ ] বাংলা-প্রথম ডকস (Starlight i18n) সম্পূর্ণ করা।
5. [ ] Deploy (6 Vercel) + DNS/SSL + status page; playground real execution (WASM/nilLang) is a future roadmap item, not a current claim.

## Lint (honest minimal)
- There is no per-app ESLint/`astro check` setup. Root `pnpm lint` therefore does NOT claim turbo per-app linting: it runs `pnpm validate` plus `node --check` on the store-schema scripts (`packages/store-schema` `lint` script). Turbo has no `lint` task.

## DoD
- `pnpm validate` + `build` সবুজ; feed-এ প্রতিটি প্যাকেজের hash/sig যাচাইযোগ্য। (`validate:verify` 6/6 as of 2026-11-06 rotation.)

## এই সেশনে
- [x] `pnpm validate` / `validate:verify` (6/6) + `contracts:check` স্মোক + ফলাফল রেকর্ড (2026-11-06, incl. cwd-independent run from `C:\`).
- [x] `pnpm build` স্মোক + ফলাফল রেকর্ড (2026-11-06: 6/6 successful).
