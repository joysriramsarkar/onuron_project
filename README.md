# Onuron Central Monorepo

> **onuron.org · os · alap · nil · docs · store**  
> সম্পূর্ণ উন্মুক্ত ও সার্বভৌম কম্পিউটিং ইকোসিস্টেমের সেন্ট্রাল প্ল্যাটফর্ম, ওয়েব পোর্টাল, ডকুমেন্টেশন এবং অফিশিয়াল অ্যাপ স্টোর রেজিস্ট্রি।

---

## 🌐 ইকোসিস্টেম রিপোজিটরি ম্যাপ (Ecosystem Map)

Onuron ইকোসিস্টেম মূলত একাধিক উচ্চ-দক্ষতাসম্পন্ন ও সমন্বিত প্রজেক্টের সমন্বয়ে গঠিত:

| প্রজেক্ট | বর্ণনা | প্রযুক্তি স্ট্যাক |
|---|---|---|
| **`onuronOS`** | স্মার্টফোন ও পিসির জন্য ফ্ল্যাগশিপ অপারেটিং সিস্টেম (`nilinit` PID 1, `NilHAL`, ext4 স্টোরেজ, ডুয়াল অ্যান্ড্রয়েড রানটাইম) | Linux LTS, Rust, C, Shell |
| **`nilLang`** | মেমরি-নিরাপদ ও আধুনিক সিস্টেম ও অ্যাপ্লিকেশন প্রোগ্রামিং ল্যাঙ্গুয়েজ | Rust, LLVM/Cranelift |
| **`alap-framework`** | ডিক্লেয়ারেটিভ রিঅ্যাক্টিভ ইউজার ইন্টারফেস ফ্রেমওয়ার্ক ও উইজেট কিট | NilLang, Rust |
| **`nilos-emulator` (`nilsim`)** | ভার্চুয়াল টাচস্ক্রিন ও সিস্টেম ডেভেলপমেন্ট/টেস্টিং সিমুলেটর | Rust, SDL2 / softbuffer |
| **`onuron_project`** (This Repo) | সেন্ট্রাল ওয়েব প্ল্যাটফর্ম, মাল্টি-সাইট ডোমেন, ডকুমেন্টেশন ও অ্যাপ স্টোর ফিড | TypeScript, Astro, Turborepo |
| **অ্যাপ্লিকেশন স্যুট** | ক্যালকুলেটর, ফাইল ম্যানেজার, মিউজিক প্লেয়ার, নোটপ্যাড, পয়েন্ট অব সেল (POS), টার্মিনাল | NilLang, Alap |

---

## 📁 মনোরিপো কাঠামো (Monorepo Structure)

```text
onuron_project/
├── apps/
│   ├── main/          # onuron.org — ব্র্যান্ড পোর্টাল ও ইন্টারেক্টিভ ইকোসিস্টেম ডেমো
│   ├── os/            # os.onuron.org — onuronOS আর্কিটেকচার, ফিচার ও ডাউনলোড
│   ├── alap/          # alap.onuron.org — Alap UI ফ্রেমওয়ার্ক ল্যান্ডিং ও গাইড
│   ├── nil/           # nil.onuron.org — NilLang ভাষা, সিনট্যাক্স ও প্লেগ্রাউন্ড
│   ├── docs/          # docs.onuron.org — সেন্ট্রালাইজড টেকনিক্যাল ডকুমেন্টেশন (Starlight)
│   └── store/         # store.onuron.org — অফিসিয়াল অ্যাপ স্টোর ফ্রন্টএন্ড ও REST API ফিড
├── packages/
│   ├── ui/            # শেয়ার্ড Astro ডিজাইন সিস্টেম, কম্পোনেন্ট ও কালার টোকেন
│   └── store-schema/  # App Store Manifest JSON স্কিমা, টাইপ ডেফিনিশন ও ভ্যালিডেটর
└── package.json
```

---

## 📦 App Store রেজিস্ট্রি (`apps/store`)

অফিসিয়াল অ্যাপ স্টোর ফিড ও প্যাকেজ রেজিস্ট্রি `apps/store/public/registry/apps/`-এ সংরক্ষিত। প্রতিটি অ্যাপ্লিকেশনে ক্রিপ্টোগ্রাফিক ভ্যালিডেশন বাধ্যতামূলক:
> **Note:** All apps below are **Reference / Developer Preview** (`releaseStage: "reference"`) — they demonstrate the platform path (build → sign → install → launch), not finished consumer products.

- `org.onuron.calculator`: দ্রুতগতির সায়েন্টিফিক ও স্ট্যান্ডার্ড ক্যালকুলেটর।
- `org.onuron.files`: সম্পূর্ণ ফাইল সিস্টেম ম্যানেজার ও মেটাডেটা ভিউয়ার।
- `org.onuron.music`: লো-লেটেন্সি অডিও প্লেয়ার ও ব্যাকগ্রাউন্ড সার্ভিস।
- `org.onuron.notes`: অটোসেভ ও মার্কডাউন সমৃদ্ধ লাইটওয়েট নোটপ্যাড।
- `org.onuron.pos`: দোকান খাতা ও পয়েন্ট অব সেল ইনভেন্টরি সলিউশন।
- `org.onuron.terminal`: রেফারেন্স-লেভেল টার্মিনাল শেল (Onuron OS-এর `nilshell`-এর অংশ; আলাদা repo নেই)।

---

## 🚀 লোকাল সেটআপ ও ডেভেলপমেন্ট

```bash
# ডিপেন্ডেন্সি ইনস্টল
pnpm install

# সমস্ত পোর্টাল একসাথে লোকালি রান করা
pnpm dev

# প্রোডাকশন বিল্ড তৈরি
pnpm build

# অ্যাপ রেজিস্ট্রি ও ম্যানিফেস্ট স্কিমা ভ্যালিডেশন
pnpm validate
```

---

## 🔒 সিকিউরিটি ও ভ্যালিডেশন স্ট্যান্ডার্ড

প্রতিটি অ্যাপ্লিকেশনের ম্যানিফেস্টে নিম্নোক্ত শর্তসমূহ কঠোরভাবে মানা হয়:
1. রিভার্স ডোমেন আইডেন্টিফায়ার (যেমন: `org.onuron.<app>`)।
2. 64-ক্যারেক্টার দীর্ঘ হেক্সাডেসিমেল SHA-256 ইন্টিগ্রিটি হ্যাশ।
3. HTTPS রিমোট প্যাকেজ URL বা লোকাল ভ্যালিড পাথ (`.nilax` / `.onp`)।
4. Ed25519 ক্রিপ্টোগ্রাফিক সাইনিং সমর্থন।

---

## 🔐 Package Verification Pipeline

Every app in the store registry is protected by a two-stage verification pipeline, all implemented with Node.js built-ins (no external dependencies):

**Stage 1 — Format validation** (`pnpm validate`):
Checks manifest structure, full semver for `version`/`minOs`, categories, architecture, HTTPS URLs, package format (`.nilax`/`.onp`), 64-hex checksum, and icon/media assets. **Placeholder checksums are a hard error** (all-zeros, repeated blocks, sequential hex like `a1b2c3d4...`, or hashes of common test strings such as `"abc"`/`"test"`) — a store entry must stand for a real, verifiable artifact.

**Stage 2 — Cryptographic verification** (`pnpm validate:verify`):
For each app, verifies the package bytes against the manifest:
- **SHA-256** matches `package.sha256`
- **File size** matches `package.size`
- **Ed25519 signature** (when present) verifies against the trusted key identified by `package.signer` in `packages/store-schema/trusted-keys.json`

Artifacts are committed under `apps/store/public/packages/` and referenced from the
manifest's `package.path`. Verification reads those exact bytes, so CI is
deterministic and never depends on the CDN being deployed. When `package.path` is
absent the validator falls back to downloading `package.url`; an unreachable URL
is then reported as a warning rather than an error.

### Signing a package

```bash
# Generate an Ed25519 keypair (keep the private key in a secret manager,
# publish only the public half in trusted-keys.json)
node packages/store-schema/scripts/sign-package.mjs --generate-keypair

# Sign a package → base64 signature for the manifest's package.signature field
node packages/store-schema/scripts/sign-package.mjs path/to/app-1.0.0.nilax <private-key>

# Full verification run
pnpm --filter @onuron/store-schema validate:verify
```

Reproducible app sources for the published packages live in
`apps/store/registry-src/` — see its [README](./apps/store/registry-src/README.md)
for the build-and-sign walkthrough.

---

## 📜 License

The Onuron ecosystem monorepo is licensed under the
[GNU Affero General Public License v3.0 (AGPL-3.0)](./LICENSE), matching
[nilLang](https://github.com/joysriramsarkar/nilLang).

