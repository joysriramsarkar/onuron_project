### USER
https://github.com/joysriramsarkar/alap-framework, https://github.com/joysriramsarkar/nilLang, https://github.com/joysriramsarkar/onuronOS এদের জন্য একটা ডোমেইন কিনলাম onuron.org। এখানে এগুলোকে একটা ওয়েবসাইট কেমন করে রাখবে, সাবডোমেইন করে? কী কী রাখবো, সব বিস্তারিত বলো। মোবাইল অ্যাপগুলোর লিঙ্ক কোথায় রাখবো যেগুলো অ্যাপ স্টোর ডাউনলোড হবে। আরো যা যা লাগবে। 

### ASSISTANT
অভিনন্দন! `onuron.org` একটি চমৎকার এবং প্রিমিয়াম ডোমেইন নেম। যেহেতু আপনার প্রজেক্টগুলোর প্রকৃতি একে অপরের থেকে বেশ আলাদা (অপারেটিং সিস্টেম, প্রোগ্রামিং ল্যাঙ্গুয়েজ এবং ফ্রেমওয়ার্ক), তাই এদের একটি সুন্দর **ইকোসিস্টেম (Ecosystem)** বা ব্র্যান্ড হিসেবে উপস্থাপন করা উচিত।

নিচে ওয়েবসাইটের স্ট্রাকচার, কন্টেন্ট, মোবাইল অ্যাপের প্লেসমেন্ট এবং টেকনিক্যাল বিষয়গুলো বিস্তারিত আলোচনা করা হলো:

### ১. ওয়েবসাইটের আর্কিটেকচার (Subdomain নাকি Subdirectory?)
যেহেতু আপনার প্রজেক্টগুলো বেশ বড় এবং এগুলোর জন্য আলাদা ডকুমেন্টেশন বা ল্যান্ডিং পেজের প্রয়োজন হবে, তাই **Subdomain** ব্যবহার করা সবচেয়ে ভালো আইডিয়া। এতে প্রতিটি প্রজেক্টের আলাদা একটি ব্র্যান্ড ভ্যালু তৈরি হবে এবং ইউজারদের মনে রাখা সহজ হবে।

*   **Main Website**: `onuron.org` (এটি হবে আপনার মূল ল্যান্ডিং পেজ বা পোর্টফোলিও হাব)
*   **Subdomains**:
    *   `os.onuron.org` (onuronOS এর জন্য)
    *   `alap.onuron.org` (alap-framework এর জন্য)
    *   `nil.onuron.org` (nilLang এর জন্য)
    *   `docs.onuron.org` (যদি সবার জন্য একটি সাধারণ ডকুমেন্টেশন হাব বানাতে চান)

*(বিকল্প: যদি সাবডোমেইন ম্যানেজ করতে না চান, তবে `onuron.org/os`, `onuron.org/alap` ইত্যাদি সাব-ডিরেক্টরি ব্যবহার করতে পারেন। তবে OS এবং Lang এর জন্য সাবডোমেইন বেশি মানানসই।)*

---

### ২. কী কী পেজ ও কন্টেন্ট রাখবেন?

#### ক. মেইন হোমপেজ (`onuron.org`)
এটি হবে আপনার 'Onuron' ব্র্যান্ডের প্রবেশদ্বার।
*   **Hero Section**: একটি সুন্দর ট্যাগলাইন (যেমন: "Building the future of computing with Onuron Ecosystem")।
*   **Overview**: Onuron কী এবং আপনার ভিশন কী।
*   **Products Showcase**: তিনটি প্রজেক্টের সুন্দর কার্ড বা সেকশন, যেখানে ক্লিক করলে সাবডোমেইনে নিয়ে যাবে।
*   **Open Source**: আপনার গিটহাব প্রোফাইলের (`github.com/joysriramsarkar`) লিঙ্ক।
*   **Community/Socials**: Twitter/X, Discord, LinkedIn ইত্যাদির লিঙ্ক।
*   **Footer**: কপিরাইট, Privacy Policy, Terms of Service, Contact Email.

#### খ. `os.onuron.org` (onuronOS এর জন্য)
*   **Features**: OS এর প্রধান ফিচারগুলো (লাইটওয়েট, সিকিউরিটি, কার্নেল টাইপ ইত্যাদি)।
*   **Screenshots/Gallery**: OS এর UI এর ছবি।
*   **System Requirements**: রান করার জন্য কনফিগারেশন কী কী লাগবে।
*   **Download**: ISO বা ইমেজ ফাইল ডাউনলোড করার লিঙ্ক (সরাসরি ডাউনলোড লিঙ্ক বা গিটহাব রিলিজের লিঙ্ক)।
*   **Installation Guide**: কীভাবে ইনস্টল বা বুট করতে হয় তার স্টেপ-বাই-স্টেপ গাইড।

#### গ. `alap.onuron.org` (alap-framework এর জন্য)
*   **Introduction**: ফ্রেমওয়ার্কটি কেন ব্যবহার করবে, এর USP (Unique Selling Proposition) কী।
*   **Quick Start**: ইনস্টলেশন কমান্ড (যেমন: `npm install alap` বা `pip install alap`)।
*   **Documentation**: API রেফারেন্স, কম্পোনেন্ট বা ফাংশনগুলোর বিস্তারিত।
*   **Examples**: কিছু কোড স্নিপেট বা ডেমো প্রজেক্ট।

#### ঘ. `nil.onuron.org` (nilLang এর জন্য)
*   **Overview**: nilLang কী এবং কেন এটি আলাদা (সিনট্যাক্স, স্পিড ইত্যাদি)।
*   **Syntax Guide**: বেসিক সিনট্যাক্স এবং উদাহরণ।
*   **Compiler/Interpreter**: কীভাবে কোড রান করতে হয়।
*   **Playground (Optional)**: যদি সম্ভব হয় ব্রাউজারেই কোড রান করার একটি ছোট উইন্ডো (WebAssembly ব্যবহার করে)।

---

### ৩. মোবাইল অ্যাপগুলোর লিঙ্ক কোথায় রাখবেন?
যদি এই প্রজেক্টগুলোর কম্প্যানিয়ন মোবাইল অ্যাপ থাকে, তবে সেগুলো হাইলাইট করা জরুরি:

1.  **মেইন হোমপেজে**: আলাদা একটি "Mobile Apps" সেকশন রাখতে পারেন যেখানে সব অ্যাপের আইকন থাকবে।
2.  **প্রজেক্টের ল্যান্ডিং পেজে**: যেমন, `os.onuron.org`-এর হিরো সেকশনের নিচেই Google Play এবং Apple App Store এর অফিসিয়াল ব্যাজ (Badge) বা বাটন ব্যবহার করবেন।
3.  **Dedicated Download Page**: `onuron.org/downloads` বা `onuron.org/apps` নামে একটি পেজ রাখতে পারেন, যেখানে সব অ্যাপের লিঙ্ক (App Store, Play Store এবং সরাসরি APK ডাউনলোড লিঙ্ক) একসাথে থাকবে।
4.  **Footer-এ**: প্রতিটি পেজের নিচে "Download Our Apps" নামে ছোট লিঙ্ক রাখতে পারেন।

*টিপস: অ্যাপ স্টোরের অফিসিয়াল SVG ব্যাজ ব্যবহার করবেন, এতে প্রফেশনাল লুক আসে। পাশাপাশি যারা প্লে-স্টোর ব্যবহার করে না তাদের জন্য সরাসরি `.apk` ডাউনলোড লিঙ্কও রাখবেন।*

---

### ৪. টেকনিক্যাল বিষয় এবং আরও যা যা লাগবে (Hosting & Tools)

*   **Hosting**:
    *   যেহেতু ওয়েবসাইটগুলো স্ট্যাটিক (Static) হবে, তাই **Cloudflare Pages**, **Vercel**, বা **Netlify** ব্যবহার করতে পারেন। এগুলো ফ্রি এবং গ্লোবালি খুব ফাস্ট।
    *   গিটহাবে কোড পুশ করলেই অটোমেটিক ডিপ্লয় হয়ে যাবে (CI/CD)।
*   **Framework / SSG (Static Site Generator)**:
    *   ওয়েবসাইট বানানোর জন্য **Astro** (খুব ফাস্ট) বা **Next.js** ব্যবহার করতে পারেন।
    *   ডকুমেন্টেশনের জন্য **Docusaurus** বা **VitePress** সেরা। এগুলো গিটহাবের README থেকে খুব সুন্দরভাবে ডকস বানিয়ে দেয়।
*   **DNS Configuration**:
    *   ডোমেইন রেজিস্ট্রারের প্যানেল থেকে `onuron.org`-এর জন্য A Record বা CNAME রেকর্ড হোস্টিংয়ের সাথে পয়েন্ট করতে হবে।
    *   সাবডোমেইনগুলোর (`os.`, `alap.`) জন্য আলাদা CNAME রেকর্ড যোগ করতে হবে।
*   **SSL Certificate (HTTPS)**:
    *   Cloudflare বা Vercel ব্যবহার করলে ফ্রিতে অটোমেটিক SSL সেটআপ হয়ে যাবে। এটি অ্যাপ স্টোরের লিঙ্কের জন্য বাধ্যতামূলক।
*   **Custom Email**:
    *   যোগাযোগের জন্য `contact@onuron.org` বা `support@onuron.org`-এর মতো প্রফেশনাল ইমেইল খুলুন (Zoho Mail বা Cloudflare Email Routing ব্যবহার করে ফ্রিতে করা যায়)।
*   **Legal Pages**:
    *   **Privacy Policy** এবং **Terms of Service** (খুব জরুরি, বিশেষ করে Google Play Store বা Apple App Store-এ অ্যাপ সাবমিট করার সময় এগুলো ওয়েবসাইটে লিঙ্ক হিসেবে দিতে হয়)।
*   **Analytics**:
    *   Google Analytics অথবা প্রাইভেসি-ফ্রেন্ডলি **Plausible** বা **Umami** ব্যবহার করতে পারেন ভিজিটর ট্র্যাক করার জন্য।
*   **Press Kit**:
    *   একটি `onuron.org/press` পেজ রাখতে পারেন, যেখানে আপনার প্রজেক্টগুলোর হাই-রেজোলিউশন লোগো, স্ক্রিনশট এবং ব্র্যান্ড গাইডলাইন থাকবে, যাতে ব্লগার বা জার্নালিস্টরা সহজে ব্যবহার করতে পারে।

### সাজেশন:
প্রথমে পুরো ডকুমেন্টেশন বানানোর দরকার নেই। আপনি প্রথমে একটি সুন্দর ল্যান্ডিং পেজ (`onuron.org`) বানিয়ে সেখান থেকে গিটহাব রিডিরেক্ট দিয়ে শুরু করতে পারেন। এরপর ধীরে ধীরে `os.onuron.org` বা অন্য সাবডোমেইনগুলো লাইভ করতে পারেন। আপনার প্রজেক্টগুলোর জন্য শুভকামনা রইল!

### USER
এবং এই সমস্ত কিছুই একটা মনোরিপোতে রেখে কাজ করতে পারি?

### ASSISTANT
**হ্যাঁ, অবশ্যই!** একটি মনোরিপো (Monorepo) ব্যবহার করা আপনার "Onuron Ecosystem"-এর জন্য সবচেয়ে স্মার্ট এবং প্রফেশনাল সিদ্ধান্ত হবে। যেহেতু আপনার সবগুলো প্রজেক্ট একই ব্র্যান্ডের অংশ, তাই এদের একটি ছাদের নিচে আনা হলে ম্যানেজ করা অনেক সহজ হয়ে যাবে।

মনোরিপো ব্যবহার করলে আপনি সবগুলো ওয়েবসাইটের জন্য একটি **Shared UI Library** বানাতে পারবেন, যাতে সব সাইটের ডিজাইন, নেভবার, ফুটার এবং অ্যাপ স্টোরের বাটনগুলো হুবহু এক থাকে। 

নিচে মনোরিপো কীভাবে সাজাবেন এবং কাজ করবেন তার পূর্ণাঙ্গ গাইডলাইন দেওয়া হলো:

### ১. মনোরিপোর ধরন বেছে নিন
আপনার সামনে মূলত দুটি পথ খোলা আছে:

*   **অপশন এ: ওয়েব/মেটা মনোরিপো (সবচেয়ে বেশি রেকমেন্ডেড):** এখানে আপনি শুধু **ওয়েবসাইট, ল্যান্ডিং পেজ এবং ডকুমেন্টেশন** একসাথে রাখবেন। মূল OS, Framework বা Language-এর সোর্স কোড আলাদা রিপোতে (`joysriramsarkar/onuronOS` ইত্যাদি) থাকবে। 
*   **অপশন বি: ফুল ইকোসিস্টেম মনোরিপো:** এখানে ওয়েবসাইটের পাশাপাশি OS, Framework এবং Language-এর মূল সোর্স কোডও একই রিপোতে থাকবে। *(সতর্কতা: OS এবং Lang এর কোড সাধারণত C/C++/Rust তে হয়, আর ওয়েবসাইট JS/TS তে। ভিন্ন ভিন্ন ল্যাঙ্গুয়েজ এক রিপোতে রাখলে বিল্ড প্রসেস জটিল হতে পারে।)*

আপাতত **অপশন এ (ওয়েব মনোরিপো)** দিয়ে শুরু করা সবচেয়ে নিরাপদ এবং সহজ। 

---

### ২. ফোল্ডার স্ট্রাকচার (ওয়েব মনোরিপো)
একটি নতুন রিপোসিটরি তৈরি করুন (যেমন: `onuron-web` বা `onuron-monorepo`)। এর ফোল্ডার স্ট্রাকচার এমন হতে পারে:

```text
onuron-monorepo/
├── apps/
│   ├── main-site/       # onuron.org (মূল ল্যান্ডিং পেজ)
│   ├── os-site/         # os.onuron.org 
│   ├── alap-site/       # alap.onuron.org 
│   ├── nil-site/        # nil.onuron.org
│   └── docs/            # docs.onuron.org (সবার ডকুমেন্টেশন)
│
├── packages/
│   ├── ui/              # Shared UI Components (Navbar, Footer, App Store Badges)
│   ├── config/          # Shared ESLint, Tailwind, TypeScript configs
│   └── utils/           # Common helper functions
│
├── .github/workflows/   # CI/CD (GitHub Actions)
├── turbo.json (বা nx.json)
└── package.json
```

---

### ৩. মনোরিপো ম্যানেজ করার জন্য সেরা টুলস
যেহেতু একই রিপোতে অনেকগুলো প্রজেক্ট থাকবে, তাই বিল্ড এবং ডিপ্লয়মেন্ট ফাস্ট করার জন্য নিচের যেকোনো একটি টুল ব্যবহার করতে পারেন:

*   **Turborepo (Vercel এর টুল):** জাভাস্ক্রিপ্ট/টাইপস্ক্রিপ্ট ইকোসিস্টেমের (Astro, Next.js, React) জন্য এটি বর্তমানে সবচেয়ে জনপ্রিয়। এটি খুব দ্রুত বিল্ড নেয় এবং ক্যাশিং সাপোর্ট দেয়।
*   **Nx:** আপনি যদি ভবিষ্যতে মূল OS বা Lang-এর সোর্স কোডও এই রিপোতে আনতে চান, তবে Nx সেরা। এটি Rust, C++, Go, Python এবং JS—সব ল্যাঙ্গুয়েজ একসাথে হ্যান্ডেল করতে পারে।

---

### ৪. মোবাইল অ্যাপের লিঙ্ক এবং Shared UI-এর সুবিধা
আপনি `packages/ui` ফোল্ডারের ভেতর একটি কম্পোনেন্ট বানাতে পারেন যার নাম `DownloadButtons.tsx` (বা `.astro`)। 
*   এই কম্পোনেন্টে Google Play, Apple App Store এবং `.apk` ডাউনলোডের সুন্দর SVG ব্যাজ/বাটনগুলো থাকবে। 
*   যখনই কোনো অ্যাপের লিঙ্ক চেঞ্জ হবে, আপনাকে ৪-৫টি ওয়েবসাইটে গিয়ে কোড চেঞ্জ করতে হবে না। শুধু `packages/ui` তে চেঞ্জ করলেই `os.onuron.org` থেকে শুরু করে সব সাইটে অটোমেটিক আপডেট হয়ে যাবে।

---

### ৫. একটি রিপো থেকে কীভাবে সাবডোমেইন ডিপ্লয় করবেন?
অনেকে ভাবেন একটি রিপো থেকে বুঝি শুধু একটা ওয়েবসাইট ডিপ্লয় করা যায়। কিন্তু **Vercel**, **Netlify** বা **Cloudflare Pages** এ আপনি একটি রিপো থেকে একাধিক প্রজেক্ট ডিপ্লয় করতে পারেন। 

**Vercel-এর ক্ষেত্রে ধাপগুলো:**
1. Vercel ড্যাশবোর্ডে গিয়ে "Add New Project" এ ক্লিক করুন।
2. আপনার `onuron-monorepo` রিপোটি সিলেক্ট করুন।
3. **সবচেয়ে গুরুত্বপূর্ণ ধাপ:** সেখানে **"Root Directory"** নামে একটি অপশন পাবেন। 
    * প্রথমবার `main-site` সিলেক্ট করে ডোমেইন `onuron.org` সেট করুন।
    * আবার নতুন প্রজেক্ট ইম্পোর্ট করুন, এবার Root Directory তে `apps/os-site` দিন এবং ডোমেইন `os.onuron.org` সেট করুন।
    * এভাবে বাকি সাবডোমেইনগুলো সেটআপ করুন।
4. Vercel অটোমেটিক বুঝে নেবে রিপোর কোন ফোল্ডার চেঞ্জ হলে কোন ওয়েবসাইটটি রি-ডিপ্লয় করতে হবে। 

---

### ৬. মনোরিপো ব্যবহারের সুবিধা ও চ্যালেঞ্জ

**✅ সুবিধাসমূহ:**
*   **Single Source of Truth:** সব কনফিগারেশন, ডিজাইন সিস্টেম এবং কোড এক জায়গায়।
*   **Atomic Commits:** ধরুন আপনি নেভবারে একটি নতুন লিঙ্ক যোগ করলেন। একটি Pull Request (PR) এর মাধ্যমেই ৫টি ওয়েবসাইটেই চেঞ্জ লাইভ হয়ে যাবে।
*   **Shared Documentation:** `apps/docs` ফোল্ডারে সব প্রজেক্টের ডকুমেন্টেশন রাখা যায়, যা ডেভেলপারদের জন্য খুব কাজের।
*   **Unified CI/CD:** একটি GitHub Actions ফাইল দিয়ে সবগুলোর টেস্টিং এবং লিন্টিং (Linting) করা যায়।

**⚠️ চ্যালেঞ্জসমূহ:**
*   **Initial Setup:** প্রথমবার মনোরিপো সেটআপ করতে (Turborepo/Nx কনফিগার করতে) একটু সময় লাগে।
*   **Repo Size:** অনেকগুলো প্রজেক্ট একসাথে থাকায় গিটহাব রিপোর সাইজ বড় হতে পারে (তবে ওয়েবসাইটের ক্ষেত্রে এটি খুব একটা সমস্যা নয়)।

### আমার পরামর্শ:
আপনি **Turborepo** এবং **Astro** (বা Next.js) ব্যবহার করে `onuron-monorepo` নামে একটি রিপো তৈরি করুন। প্রথমে শুধু `apps/main-site` (onuron.org) বানিয়ে লাইভ করুন। এরপর ধীরে ধীরে `os.onuron.org` এবং `nil.onuron.org` এর ল্যান্ডিং পেজগুলো একই রিপোর ভেতর অ্যাড করে দিন। এটি আপনার ডেভেলপার লাইফ এবং প্রজেক্ট ম্যানেজমেন্ট—দুটোকেই ১০ গুণ সহজ করে দেবে!

### USER
প্রথম পদ্ধতি ব্যবহার করেই বানাতে চাইছি। সমস্ত ওয়েব প্রজেক্টটার নীল নকশা বানিয়ে দাও।

### ASSISTANT
চমৎকার! আমি আপনার জন্য সম্পূর্ণ **Onuron Web Ecosystem**-এর নীল নকশা তৈরি করে দিচ্ছি। নিচে বিস্তারিত গাইডলাইন দেওয়া হলো:

---

## 🏗️ ১. সম্পূর্ণ আর্কিটেকচার (Architecture)

```
onuron-monorepo/
│
├── apps/                          # মূল ওয়েব অ্যাপ্লিকেশনগুলো
│   ├── main/                      # onuron.org (হোমপেজ)
│   ├── os/                        # os.onuron.org (onuronOS)
│   ├── alap/                      # alap.onuron.org (alap-framework)
│   ├── nil/                       # nil.onuron.org (nilLang)
│   └── docs/                      # docs.onuron.org (ডকুমেন্টেশন)
│
├── packages/                      # শেয়ারড কোড
│   ├── ui/                        # Shared UI Components
│   ├── config/                    # Shared Configs (ESLint, Tailwind, TS)
│   └── utils/                     # Utility Functions
│
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions
│
├── turbo.json                     # Turborepo Config
├── pnpm-workspace.yaml           # PNPM Workspace
└── package.json                   # Root Package
```

---

## 🛠️ ২. টেক স্ট্যাক (Tech Stack)

| লেয়ার | টেকনোলজি | কেন? |
|-------|---------|কেন?|
| **Framework** | Astro | খুব ফাস্ট, Static Site Generator, MDX সাপোর্ট |
| **Styling** | Tailwind CSS | দ্রুত UI বানানোর জন্য |
| **Language** | TypeScript | টাইপ সেফটি |
| **Monorepo Tool** | Turborepo | Fast builds, caching |
| **Package Manager** | pnpm | Fast, disk space efficient |
| **Docs** | Starlight (Astro) | Beautiful documentation |

---

## 📁 ৩. ফোল্ডার স্ট্রাকচার (বিস্তারিত)

### Root `package.json`
```json
{
  "name": "onuron-monorepo",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "format": "prettier --write ."
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "prettier": "^3.0.0"
  }
}
```

### `turbo.json`
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false
    },
    "lint": {
      "outputs": []
    }
  }
}
```

### `pnpm-workspace.yaml`
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

---

## 🎨 ৪. Shared UI Library (`packages/ui`)

এখানে আপনি এমন কম্পোনেন্টগুলো রাখবেন যা সব ওয়েবসাইটে ব্যবহার হবে:

```
packages/ui/
├── components/
│   ├── Navbar.astro          # নেভবার
│   ├── Footer.astro          # ফুটার
│   ├── Hero.astro            # হিরো সেকশন
│   ├── AppStoreBadge.astro   # App Store Badge
│   ├── PlayStoreBadge.astro  # Play Store Badge
│   ├── DownloadButtons.astro # সমস্ত ডাউনলোড বাটন একসাথে
│   ├── FeatureCard.astro     # ফিচার কার্ড
│   └── CodeBlock.astro       # কোড স্নিপেট দেখানোর জন্য
│
├── layouts/
│   ├── BaseLayout.astro      # Base HTML Layout
│   └── DocsLayout.astro      # Docs এর জন্য Layout
│
├── styles/
│   └── global.css            # Global Styles
│
└── package.json
```

---

## 🌐 ৫. প্রতিটি ওয়েবসাইটের কন্টেন্ট প্ল্যান

### **A. `apps/main` (onuron.org)** - হোমপেজ

```
apps/main/
├── src/
│   ├── pages/
│   │   ├── index.astro       # Hero + Products Showcase
│   │   ├── about.astro       # Onuron সম্পর্কে
│   │   ├── apps.astro        # সব মোবাইল অ্যাপের লিস্ট
│   │   ├── press.astro       # Press Kit (Logos, Screenshots)
│   │   ├── privacy.astro     # Privacy Policy
│   │   └── terms.astro       # Terms of Service
│   │
│   └── components/
│       └── ProductCard.astro # Product কার্ড
│
└── public/
    ├── logos/                # সব প্রজেক্টের লোগো
    └── screenshots/          # স্ক্রিনশট
```

**কন্টেন্ট স্ট্র্যাটেজি:**
- Hero Section: "Welcome to Onuron Ecosystem"
- Products Grid: 3টি কার্ড (OS, Framework, Language)
- Mobile Apps Section: সব অ্যাপের লিঙ্ক
- Footer: সব লিঙ্ক, Social Media

---

### **B. `apps/os` (os.onuron.org)** - onuronOS

```
apps/os/
├── src/
│   ├── pages/
│   │   ├── index.astro       # Landing Page
│   │   ├── features.astro    # OS Features
│   │   ├── download.astro    # Download Links (ISO, Image)
│   │   ├── install.astro     # Installation Guide
│   │   └── docs/             # OS Documentation
│   │       ├── getting-started.md
│   │       └── api-reference.md
│   │
│   └── components/
│       ├── ScreenshotGallery.astro
│       └── SystemRequirements.astro
│
└── public/
    ├── downloads/            # ISO files (if hosting directly)
    └── screenshots/          # OS Screenshots
```

**মোবাইল অ্যাপ লিঙ্ক:**
- Hero Section-এ DownloadButtons component
- Download পেজে আলাদাভাবে App Store/Play Store badges

---

### **C. `apps/alap` (alap.onuron.org)** - alap-framework

```
apps/alap/
├── src/
│   ├── pages/
│   │   ├── index.astro       # Landing Page
│   │   ├── quickstart.astro  # Quick Start Guide
│   │   ├── examples.astro    # Code Examples
│   │   └── docs/             # Framework Documentation
│   │       ├── installation.md
│   │       └── api.md
│   │
│   └── components/
│       ├── InstallCommand.astro  # npm install alap
│       └── CodeExample.astro
│
└── public/
    └── examples/             # Example code files
```

---

### **D. `apps/nil` (nil.onuron.org)** - nilLang

```
apps/nil/
├── src/
│   ├── pages/
│   │   ├── index.astro       # Landing Page
│   │   ├── playground.astro  # Online Code Playground
│   │   ├── syntax.astro      # Syntax Guide
│   │   └── docs/             # Language Documentation
│   │       ├── tutorial.md
│   │       └── reference.md
│   │
│   └── components/
│       ├── SyntaxHighlighter.astro
│       └── Playground.astro
│
└── public/
    └── examples/             # Example nil files
```

---

### **E. `apps/docs` (docs.onuron.org)** - Centralized Docs

```
apps/docs/
├── src/
│   ├── content/
│   │   ├── docs/
│   │   │   ├── onuron-os/
│   │   │   ├── alap-framework/
│   │   │   └── nil-lang/
│   │   └── config.ts
│   └── assets/
└── astro.config.mjs          # Starlight Config
```

---

## 📱 ৬. মোবাইল অ্যাপ ইন্টিগ্রেশন স্ট্র্যাটেজি

### Shared Component: `DownloadButtons.astro`

```astro
---
// packages/ui/components/DownloadButtons.astro
interface Props {
  playStoreLink: string;
  appStoreLink: string;
  apkLink: string;
  showAPK?: boolean;
}

const { playStoreLink, appStoreLink, apkLink, showAPK = true } = Astro.props;
---

<div class="download-buttons">
  <a href={appStoreLink} target="_blank">
    <img src="/badges/appstore.svg" alt="Download on App Store" />
  </a>
  <a href={playStoreLink} target="_blank">
    <img src="/badges/playstore.svg" alt="Get it on Google Play" />
  </a>
  {showAPK && (
    <a href={apkLink} class="apk-download">
      Download APK
    </a>
  )}
</div>
```

**ব্যবহার:** প্রতিটি সাইটে `<DownloadButtons />` component দিয়ে app store links pass করবেন।

---

## 🚀 ৭. ডিপ্লয়মেন্ট প্ল্যান (Vercel/Cloudflare)

### Vercel Configuration:

| App | Root Directory | Domain |
|-----|---------------|--------|
| main | `apps/main` | `onuron.org` |
| os | `apps/os` | `os.onuron.org` |
| alap | `apps/alap` | `alap.onuron.org` |
| nil | `apps/nil` | `nil.onuron.org` |
| docs | `apps/docs` | `docs.onuron.org` |

### DNS Records:

```
Type    Name           Value
CNAME   @              cname.vercel-dns.com
CNAME   os             cname.vercel-dns.com
CNAME   alap           cname.vercel-dns.com
CNAME   nil            cname.vercel-dns.com
CNAME   docs           cname.vercel-dns.com
```

---

## 🔄 ৮. CI/CD Pipeline (`.github/workflows/ci.yml`)

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm run lint
      - run: pnpm run build
```

---

## 📋 ৯. চেকলিস্ট (শুরু করার আগে)

1. ✅ গিটহাবে `onuron-monorepo` রিপো তৈরি করুন
2. ✅ pnpm, Node.js ইনস্টল করুন
3. ✅ Turborepo ইনিশিয়ালাইজ করুন: `pnpm dlx turbo@latest init`
4. ✅ `apps/main` দিয়ে শুরু করুন (basic landing page)
5. ✅ Vercel-এ ডিপ্লয় করুন
6. ✅ Domain connect করুন
7. ✅ একটা করে সাবডোমেইন যোগ করুন
8. ✅ Shared UI components বানান
9. ✅ Mobile app links integrate করুন
10. ✅ Legal pages (Privacy, Terms) যোগ করুন

---

## 🎯 পরবর্তী পদক্ষেপ

এখন আপনি ধাপে ধাপে শুরু করতে পারেন:

1. **প্রথমে:** `apps/main` বানিয়ে `onuron.org` লাইভ করুন
2. **দ্বিতীয়:** `packages/ui` তৈরি করে shared components বানান
3. **তৃতীয়:** একটা করে সাবডোমেইন যোগ করুন (os → alap → nil)
4. **চতুর্থ:** `apps/docs` দিয়ে centralized documentation চালু করুন

এই নীল নকশা অনুসরণ করলে আপনার সম্পূর্ণ ইকোসিস্টেম প্রফেশনাল এবং স্কেলেবল হবে! কোনো নির্দিষ্ট অংশ নিয়ে আরও বিস্তারিত জানতে চাইলে বলুন। 🚀

### USER
সবগুলো দাও। আমি বলছিলাম যে অনুরণ ওএসের ভেতরে যে মোবাইল অ্যাপ্লিকেশগুলো থাকবে, যেগুলো তার অ্যাপ স্টোর থেকে ডাউনলোড হবে, তার জন্য ব্যবস্থা করতে হবে না?

সবটা ভেবেচিন্তে তৈরি করে দাও।

### ASSISTANT
# 🏗️ Onuron Web Ecosystem — চূড়ান্ত নীল নকশা (v2)

আপনার ক্লিয়ারিফিকেশনটা খুবই গুরুত্বপূর্ণ ছিল। যেহেতু অ্যাপগুলো **onuronOS-এর নিজস্ব App Store** থেকে ডাউনলোড হবে (Google Play/App Store নয়), তাই ওয়েবসাইটের ভূমিকা বদলে যায় — এখন আপনার দরকার:

1. **Web Storefront** — ব্রাউজারে অ্যাপ ব্রাউজ করার জায়গা
2. **Metadata API Feed** — যেখান থেকে OS-এর ভেতরের Store ক্লায়েন্ট অ্যাপের লিস্ট ও আপডেট টানবে
3. **Developer Portal** — ডেভেলপাররা যেখানে অ্যাপ সাবমিট করবে
4. **Package CDN** — আসল `.onp` প্যাকেজ ফাইল হোস্টিং

এই মডেলটা **Flathub / F-Droid** স্টাইলের — সম্পূর্ণ Git-ভিত্তিক, কোনো ব্যাকএন্ড সার্ভার লাগবে না, ফ্রি হোস্টিংয়েই চলবে।

---

## ১. চূড়ান্ত সাবডোমেইন ম্যাপ

| সাবডোমেইন | উদ্দেশ্য |
|---|---|
| `onuron.org` | ব্র্যান্ড হোমপেজ (সব প্রজেক্টের প্রবেশদ্বার) |
| `os.onuron.org` | onuronOS ল্যান্ডিং (ফিচার, ISO ডাউনলোড, ইনস্টল গাইড) |
| `alap.onuron.org` | alap-framework ল্যান্ডিং + ডকস |
| `nil.onuron.org` | nilLang ল্যান্ডিং + সিনট্যাক্স গাইড + Playground |
| `docs.onuron.org` | কেন্দ্রীয় ডকুমেন্টেশন (Starlight) |
| `store.onuron.org` | **App Store (Web + API Feed + Developer Portal)** |
| `cdn.onuron.org` | অ্যাপ প্যাকেজ, স্ক্রিনশট, আইকন (Cloudflare R2) |

---

## ২. মনোরিপো স্ট্রাকচার (চূড়ান্ত)

```text
onuron-monorepo/
├── apps/
│   ├── main/                  # onuron.org
│   ├── os/                    # os.onuron.org
│   ├── alap/                  # alap.onuron.org
│   ├── nil/                   # nil.onuron.org
│   ├── docs/                  # docs.onuron.org (Astro Starlight)
│   └── store/                 # store.onuron.org  ⭐
│       ├── registry/          # ⭐ সব অ্যাপের Git-based রেজিস্ট্রি
│       │   └── apps/
│       │       └── org.onuron.notes/
│       │           ├── manifest.json
│       │           ├── icon.svg
│       │           └── screenshots/
│       └── src/
│           ├── pages/
│           │   ├── index.astro              # Featured + Categories
│           │   ├── apps/index.astro         # সব অ্যাপ + সার্চ
│           │   ├── apps/[id].astro          # অ্যাপ ডিটেইল পেজ
│           │   ├── categories/[cat].astro
│           │   ├── developers/index.astro   # Developer Portal
│           │   ├── developers/submit.md     # সাবমিট গাইড
│           │   ├── developers/badge.astro   # স্টোর ব্যাজ
│           │   ├── policy/content.astro     # Content Policy
│           │   ├── policy/dmca.astro        # DMCA
│           │   ├── privacy.astro
│           │   ├── terms.astro
│           │   └── api/v1/
│           │       ├── index.json.ts        # ⭐ OS ক্লায়েন্টের ফিড
│           │       └── apps/[id].json.ts    # ⭐ প্রতি অ্যাপের manifest
│           └── lib/
│               └── registry.ts              # manifest লোডার
│
├── packages/
│   ├── ui/                  # Shared components
│   ├── store-schema/        # ⭐ manifest-এর JSON Schema + TS types + validator
│   ├── config/              # Shared TS/Tailwind/ESLint configs
│   └── utils/
│
├── .github/workflows/ci.yml
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## ৩. App Store — বিস্তারিত ডিজাইন ⭐

### ৩.১ অ্যাপ Manifest (ডেটা মডেল)

প্রতিটি অ্যাপ = একটি ফোল্ডার + একটি `manifest.json`। এটিই হলো **Single Source of Truth** — ওয়েবসাইট এবং OS-এর Store ক্লায়েন্ট দুটোই এখান থেকেই ডেটা পাবে।

```json
{
  "id": "org.onuron.notes",
  "name": "Onuron Notes",
  "summary": "দ্রুত, অফলাইন-ফার্স্ট নোট অ্যাপ",
  "version": "1.2.0",
  "minOs": "0.9.0",
  "arch": ["x86_64", "aarch64"],
  "category": "productivity",
  "tags": ["notes", "offline"],
  "license": "MIT",
  "developer": {
    "name": "Onuron Team",
    "email": "dev@onuron.org",
    "url": "https://onuron.org"
  },
  "package": {
    "url": "https://cdn.onuron.org/packages/org.onuron.notes-1.2.0.onp",
    "size": 4521984,
    "sha256": "9f86d081884c...",
    "signature": "ed25519:BASE64..."
  },
  "media": {
    "icon": "icon.svg",
    "screenshots": ["screenshots/shot-1.png", "screenshots/shot-2.png"]
  }
}
```

### ৩.২ API Feed (OS-এর Store ক্লায়েন্টের জন্য)

Astro-র static endpoint ব্যবহার করে বিল্ড টাইমেই JSON তৈরি হবে — CDN ক্যাশড, ফ্রি, স্কেলেবল:

```ts
// apps/store/src/pages/api/v1/index.json.ts
import { loadRegistry } from "../../lib/registry";

export async function GET() {
  const { apps } = await loadRegistry();
  return Response.json({
    feed: 1,
    updated: new Date().toISOString(),
    apps, // সব manifest-এর summary
  });
}
```

`registry.ts` এ `import.meta.glob("../../registry/apps/*/manifest.json", { eager: true })` দিয়ে সব manifest পড়া হবে।

### ৩.৩ OS-এর ভেতরের Store ক্লায়েন্ট যেভাবে কাজ করবে

1. বুটের সময় / প্রতিদিন `https://store.onuron.org/api/v1/index.json` ফেচ করবে
2. লোকাল ভার্সনের সাথে তুলনা করে **আপডেট ব্যাজ** দেখাবে
3. `package.url` থেকে `.onp` ডাউনলোড করবে (cdn.onuron.org থেকে)
4. `sha256` + `signature` ভেরিফাই করে ইনস্টল করবে
5. **ডিপ লিঙ্ক:** ওয়েবসাইটে "Install" বাটনে ক্লিক করলে (OS-এর ভেতরের ব্রাউজার থেকে) `onuron://store/install?id=org.onuron.notes` প্রোটোকল কল হবে → Store ক্লায়েন্ট সরাসরি খুলবে

### ৩.৪ ডেভেলপার সাবমিশন ওয়ার্কফ্লো (কোড ছাড়া রিভিউ সিস্টেম)

1. ডেভেলপার রিপো **Fork** করবে
2. `registry/apps/<app-id>/` ফোল্ডারে manifest + icon + screenshots যোগ করবে
3. `.onp` প্যাকেজ `cdn.onuron.org` এ আপলোডের জন্য রিকোয়েস্ট দেবে (অথবা নিজের R2/GitHub Release-এ হোস্ট করে URL দেবে)
4. **Pull Request** খুলবে
5. CI অটোমেটিক ভেরিফাই করবে: schema সঠিক কিনা, sha256 ফরম্যাট, আইকন সাইজ, category বৈধ কিনা
6. আপনি রিভিউ করে **Merge** করবেন
7. Merge হওয়া মাত্রই Store সাইট রিবিল্ড → অ্যাপ লাইভ (ওয়েব + OS ফিড দুটোতেই)

### ৩.৫ Package Hosting

| জিনিস | কোথায় | কেন |
|---|---|---|
| `.onp` প্যাকেজ | **Cloudflare R2** (`cdn.onuron.org`) | Egress fee নেই, আনলিমিটেড ডাউনলোড |
| আইকন/স্ক্রিনশট (ছোট) | রিপোর `registry/` ফোল্ডার | Git-এ ট্র্যাক হয়, রিভিউ সহজ |
| বড় মিডিয়া | R2 | রিপো ভারী হবে না |

### ৩.৬ Store-এর জন্য Legal পেজ (বাধ্যতামূলক)

- **Content Policy** (কী ধরনের অ্যাপ অনুমোদিত)
- **DMCA / Takedown Policy**
- **Developer Agreement**
- Privacy Policy + Terms (স্টোর ক্লায়েন্ট কী ডেটা পাঠায় — যেমন OS ভার্সন, আর্কিটেকচার — তা লিখতে হবে)

---

## ৪. Shared UI Package (`packages/ui`)

| কম্পোনেন্ট | কাজ |
|---|---|
| `BaseLayout.astro` | HTML shell, SEO meta, font |
| `Navbar.astro` / `Footer.astro` | সব সাইটে এক, ecosystem লিঙ্ক সহ |
| `StoreBadge.astro` | ⭐ "Get it on onuronOS App Store" ব্যাজ |
| `InstallButton.astro` | ⭐ ডিপ লিঙ্ক (`onuron://`) + ফলব্যাক ডাউনলোড |
| `DownloadButtons.astro` | Store badge + APK/ISO ডাউনলোড একসাথে |
| `FeatureCard.astro`, `CodeBlock.astro`, `Hero.astro` | কমন ব্লক |
| `AppCard.astro` | ⭐ Store-এর অ্যাপ কার্ড (main site-এও রিইউজ) |

---

## ৫. বাকি সাইটগুলোর পেজ প্ল্যান (সংক্ষিপ্ত)

| সাইট | পেজসমূহ |
|---|---|
| **main** | `/` (Hero + ৩ প্রজেক্ট কার্ড + Store CTA), `/about`, `/apps` (→ store লিঙ্ক), `/press`, `/privacy`, `/terms` |
| **os** | `/` (Hero + StoreBadge), `/features`, `/download` (ISO), `/install`, `/screenshots` |
| **alap** | `/`, `/quickstart`, `/examples`, `/docs/*` |
| **nil** | `/`, `/syntax`, `/playground`, `/docs/*` |
| **docs** | Starlight: `onuron-os/`, `alap-framework/`, `nil-lang/` সেকশন |

---

## ৬. DNS রেকর্ড

| Host | Type | Value |
|---|---|---|
| `@` | A | `76.76.21.21` (Vercel) |
| `www, os, alap, nil, docs, store` | CNAME | `cname.vercel-dns.com` |
| `cdn` | CNAME | R2 বাটকেটের কাস্টম ডোমেইন |

---

## ৭. ডিপ্লয়মেন্ট ম্যাপিং (Vercel)

| Vercel Project | Root Directory | ডোমেইন |
|---|---|---|
| onuron-main | `apps/main` | onuron.org, www |
| onuron-os | `apps/os` | os.onuron.org |
| onuron-alap | `apps/alap` | alap.onuron.org |
| onuron-nil | `apps/nil` | nil.onuron.org |
| onuron-docs | `apps/docs` | docs.onuron.org |
| onuron-store | `apps/store` | store.onuron.org |

Vercel অটোমেটিক শুধু সেই প্রজেক্ট রিবিল্ড করবে যার ফোল্ডারে চেঞ্জ হয়েছে — `packages/ui` চেঞ্জ হলে সবগুলো রিবিল্ড হবে (Turborepo-র `dependsOn` কনফিগে)।

---

## ৮. CI/CD (`.github/workflows/ci.yml`)

```yaml
name: CI
on:
  push: { branches: [main] }
  pull_request: { branches: [main] }

jobs:
  validate-registry:          # ⭐ অ্যাপ সাবমিশন PR-এর জন্য গেট
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm --filter @onuron/store-schema validate

  build:
    needs: validate-registry
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo build
```

---

## ৯. রোডম্যাপ (ধাপে ধাপে)

| ফেজ | কাজ |
|---|---|
| **১** | রিপো সেটআপ + `apps/main` লাইভ + DNS + SSL |
| **২** | `packages/ui` বানানো + os/alap/nil ল্যান্ডিং পেজ |
| **৩** | `apps/store` — প্রথম ৩-৫টি first-party অ্যাপ সহ registry + API feed |
| **৪** | `apps/docs` (Starlight) + Developer Portal + ব্যাজ |
| **৫** | OS-এর Store ক্লায়েন্টের সাথে feed + ডিপ লিঙ্ক ইন্টিগ্রেশন + অটো-আপডেট |

---

## ✅ ফাইনাল চেকলিস্ট

- [ ] `onuron-monorepo` রিপো + pnpm + Turborepo ইনিশিয়ালাইজ
- [ ] Vercel-এ ৬টি প্রজেক্ট + ডোমেইন কানেক্ট
- [ ] Cloudflare R2 বাটকেট + `cdn.onuron.org`
- [ ] `packages/store-schema` (JSON Schema + validator)
- [ ] প্রথম manifest লিখে feed টেস্ট করা
- [ ] Store-এর legal পেজ ৪টি
- [ ] `onuron://` প্রোটোকল হ্যান্ডলার OS-এ রেজিস্টার করা
- [ ] Press Kit + Analytics (Plausible/Umami)

এই নকশায় **ওয়েবসাইট আর App Store একে অপরের পরিপূরক** — ওয়েব হলো মানুষের জন্য শোরুম, আর API ফিড হলো OS-এর জন্য মেরুদণ্ড। কোনো ব্যাকএন্ড সার্ভার ছাড়াই পুরো সিস্টেম ফ্রি টিয়ারে চলবে। 🚀

কোনো একটি অংশ (যেমন manifest validator স্ক্রিপ্ট বা Store-এর হোমপেজ UI) এর পুরো কোড লাগলে বলুন!

### USER
দাও সবগুলো কোড।

### ASSISTANT
নিচে সম্পূর্ণ মনোরিপো-র **প্রতিটি ফাইলের কোড** দিচ্ছি। ফাইল পাথ হেডার হিসেবে দেওয়া আছে — হুবহু কপি করে নিজের রিপোতে বসাতে পারবেন।

---

## 📦 ROOT CONFIG

```json
// package.json
{
  "name": "onuron-monorepo",
  "private": true,
  "packageManager": "pnpm@9.15.0",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "validate": "pnpm --filter @onuron/store-schema validate"
  },
  "devDependencies": {
    "turbo": "^2.3.3"
  }
}
```

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "dev": { "cache": false, "persistent": true },
    "lint": {}
  }
}
```

```gitignore
# .gitignore
node_modules
dist
.turbo
.env
.DS_Store
```

```ini
# .npmrc
shamefully-hoist=true
```

```markdown
<!-- README.md -->
# Onuron Monorepo
onuron.org · os · alap · nil · docs · store

## Setup
pnpm install
pnpm dev        # সব সাইট একসাথে
pnpm build      # প্রোডাকশন বিল্ড
pnpm validate   # app registry ভ্যালিডেশন
```

---

## 🧩 packages/store-schema

```json
// packages/store-schema/package.json
{
  "name": "@onuron/store-schema",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": { ".": "./src/types.ts" },
  "scripts": { "validate": "node scripts/validate.mjs" }
}
```

```ts
// packages/store-schema/src/types.ts
export type Category =
  | "productivity" | "utilities" | "media" | "games"
  | "development" | "communication" | "education" | "security";

export interface AppManifest {
  id: string;
  name: string;
  summary: string;
  description?: string;
  version: string;
  minOs: string;
  arch: string[];
  category: Category;
  tags?: string[];
  license?: string;
  developer: { name: string; email?: string; url?: string };
  package: { url: string; size: number; sha256: string; signature?: string };
  media: {
    icon: string;
    screenshots?: string[];
    // loader থেকে অটো-জেনারেটেড:
    iconUrl?: string;
    screenshotUrls?: string[];
  };
}

export const CATEGORIES: Category[] = [
  "productivity", "utilities", "media", "games",
  "development", "communication", "education", "security",
];

export const ARCHES = ["x86_64", "aarch64", "riscv64"];
```

```js
// packages/store-schema/scripts/validate.mjs
import fs from "node:fs";
import path from "node:path";

function findRoot(dir) {
  let d = dir;
  while (d !== path.dirname(d)) {
    if (fs.existsSync(path.join(d, "pnpm-workspace.yaml"))) return d;
    d = path.dirname(d);
  }
  throw new Error("monorepo root not found");
}

const REG = path.join(findRoot(process.cwd()), "apps/store/public/registry/apps");
const CATS = ["productivity","utilities","media","games","development","communication","education","security"];
const ARCHES = ["x86_64","aarch64","riscv64"];
const errors = [];
const err = (app, msg) => errors.push(`[${app}] ${msg}`);

if (!fs.existsSync(REG)) { console.log("registry empty — nothing to validate"); process.exit(0); }

for (const dir of fs.readdirSync(REG)) {
  const appDir = path.join(REG, dir);
  if (!fs.statSync(appDir).isDirectory()) continue;
  const mFile = path.join(appDir, "manifest.json");
  if (!fs.existsSync(mFile)) { err(dir, "manifest.json missing"); continue; }

  let m;
  try { m = JSON.parse(fs.readFileSync(mFile, "utf8")); }
  catch { err(dir, "manifest.json invalid JSON"); continue; }

  if (m.id !== dir) err(dir, `id "${m.id}" must equal folder name`);
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(m.id ?? "")) err(dir, "bad id format");
  if (!m.name?.trim()) err(dir, "name required");
  if (!m.summary?.trim()) err(dir, "summary required");
  if (!/^\d+\.\d+\.\d+/.test(m.version ?? "")) err(dir, "bad version (semver)");
  if (!m.minOs) err(dir, "minOs required");
  if (!Array.isArray(m.arch) || !m.arch.length || m.arch.some(a => !ARCHES.includes(a))) err(dir, "bad arch");
  if (!CATS.includes(m.category)) err(dir, "bad category");
  if (!m.package?.url?.startsWith("https://")) err(dir, "package.url must be https");
  if (!/^[0-9a-f]{64}$/.test(m.package?.sha256 ?? "")) err(dir, "sha256 must be 64 hex chars");
  if (!(m.package?.size > 0)) err(dir, "package.size must be > 0");
  if (!m.developer?.name) err(dir, "developer.name required");
  if (!m.media?.icon || !fs.existsSync(path.join(appDir, m.media.icon))) err(dir, "icon file missing");
  for (const s of m.media?.screenshots ?? [])
    if (!fs.existsSync(path.join(appDir, s))) err(dir, `screenshot missing: ${s}`);
}

if (errors.length) { console.error("❌ Registry invalid:\n" + errors.join("\n")); process.exit(1); }
console.log("✅ Registry valid");
```

---

## 🎨 packages/ui (Shared Design System)

```json
// packages/ui/package.json
{
  "name": "@onuron/ui",
  "version": "0.1.0",
  "private": true,
  "exports": {
    "./components/*": "./components/*",
    "./styles/*": "./styles/*"
  },
  "dependencies": { "@onuron/store-schema": "workspace:*" }
}
```

```css
/* packages/ui/styles/global.css */
:root{
  --bg:#0b1020; --bg-soft:#101731; --card:#141c3a; --border:#26305a;
  --text:#e8ecff; --muted:#9aa5ce; --accent:#5b8cff; --accent-2:#22d3aa;
  --radius:14px; --mono:ui-monospace,"JetBrains Mono",monospace;
}
*{box-sizing:border-box} html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--text);
  font:16px/1.65 system-ui,"Segoe UI",sans-serif}
a{color:var(--accent);text-decoration:none} a:hover{text-decoration:underline}
.container{max-width:1080px;margin:0 auto;padding:0 20px}
.section{padding:64px 0}
h1,h2,h3{line-height:1.2}
.muted{color:var(--muted)} .small{font-size:.85rem}
.mono{font-family:var(--mono)}

.navbar{position:sticky;top:0;background:rgba(11,16,32,.85);
  backdrop-filter:blur(8px);border-bottom:1px solid var(--border);z-index:10}
.nav-inner{display:flex;align-items:center;justify-content:space-between;height:60px}
.brand{font-weight:800;color:var(--text);font-size:1.1rem}
.brand:hover{text-decoration:none}
.nav-links{display:flex;gap:18px;flex-wrap:wrap}
.nav-links a{color:var(--muted);font-size:.95rem}
.nav-links a.active,.nav-links a:hover{color:var(--text);text-decoration:none}

.hero{padding:90px 0 50px;text-align:center}
.hero h1{font-size:clamp(2rem,5vw,3.4rem);margin:0 0 14px}
.hero p{max-width:640px;margin:0 auto 28px;color:var(--muted);font-size:1.1rem}
.hero .actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}

.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 22px;
  border-radius:10px;font-weight:600;border:1px solid transparent}
.btn:hover{text-decoration:none;transform:translateY(-1px)}
.btn-primary{background:var(--accent);color:#fff}
.btn-ghost{border-color:var(--border);color:var(--text)}

.grid{display:grid;gap:20px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);
  padding:22px;display:block;color:var(--text)}
.card:hover{border-color:var(--accent);text-decoration:none}
.card h3{margin:0 0 8px}
.badge{display:inline-block;padding:3px 10px;border-radius:99px;font-size:.75rem;
  background:var(--bg-soft);border:1px solid var(--border);color:var(--muted)}

.code{background:#0a0e1d;border:1px solid var(--border);border-radius:10px;
  padding:14px 18px;font-family:var(--mono);font-size:.9rem;overflow-x:auto;
  display:flex;justify-content:space-between;gap:12px;color:#cdd6ff}

.store-badge{display:inline-flex;align-items:center;gap:12px;background:#000;
  border:1px solid var(--border);border-radius:12px;padding:10px 18px;color:#fff}
.store-badge:hover{text-decoration:none;border-color:var(--accent)}
.store-badge small{display:block;font-size:.7rem;color:var(--muted)}
.store-badge strong{font-size:1rem}

.app-card{display:flex;gap:16px;align-items:flex-start}
.app-icon{width:56px;height:56px;border-radius:12px;flex-shrink:0}
.shots{display:flex;gap:12px;overflow-x:auto;padding-bottom:8px}
.shots img{height:260px;border-radius:12px;border:1px solid var(--border)}

table.meta{width:100%;border-collapse:collapse;font-size:.92rem}
table.meta td{padding:8px 4px;border-bottom:1px solid var(--border)}
table.meta td:first-child{color:var(--muted);width:160px}

.footer{border-top:1px solid var(--border);margin-top:80px;padding:48px 0 24px;background:var(--bg-soft)}
.footer-grid{display:grid;gap:28px;grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}
.footer h4{margin:0 0 10px}
.footer a{display:block;color:var(--muted);margin-bottom:6px;font-size:.92rem}
.prose{max-width:760px;margin:0 auto}
.prose h2{margin-top:2rem}
```

```astro
---
// packages/ui/components/BaseLayout.astro
import "@onuron/ui/styles/global.css";
export interface Props { title: string; description?: string; }
const { title, description = "Onuron — open-source OS, language & framework ecosystem" } = Astro.props;
---
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>◉</text></svg>" />
</head>
<body><slot /></body>
</html>
```

```astro
---
// packages/ui/components/Navbar.astro
export interface Props { current?: string; }
const { current = "" } = Astro.props;
const links = [
  { href: "https://onuron.org", label: "Home" },
  { href: "https://os.onuron.org", label: "onuronOS" },
  { href: "https://alap.onuron.org", label: "alap" },
  { href: "https://nil.onuron.org", label: "nilLang" },
  { href: "https://store.onuron.org", label: "App Store" },
  { href: "https://docs.onuron.org", label: "Docs" },
];
---
<header class="navbar">
  <div class="container nav-inner">
    <a class="brand" href="https://onuron.org">◉ onuron</a>
    <nav class="nav-links">
      {links.map((l) => (
        <a href={l.href} class:list={{ active: current === l.label }}>{l.label}</a>
      ))}
    </nav>
  </div>
</header>
```

```astro
---
// packages/ui/components/Footer.astro
---
<footer class="footer">
  <div class="container footer-grid">
    <div>
      <p class="brand">◉ onuron</p>
      <p class="muted small">Open-source ecosystem — operating system, programming language & framework.</p>
    </div>
    <div>
      <h4>Projects</h4>
      <a href="https://os.onuron.org">onuronOS</a>
      <a href="https://alap.onuron.org">alap-framework</a>
      <a href="https://nil.onuron.org">nilLang</a>
      <a href="https://github.com/joysriramsarkar">GitHub</a>
    </div>
    <div>
      <h4>Resources</h4>
      <a href="https://store.onuron.org">App Store</a>
      <a href="https://docs.onuron.org">Documentation</a>
      <a href="https://store.onuron.org/developers">Developers</a>
    </div>
    <div>
      <h4>Legal</h4>
      <a href="https://onuron.org/privacy">Privacy</a>
      <a href="https://onuron.org/terms">Terms</a>
      <a href="https://store.onuron.org/policy/content">Content Policy</a>
      <a href="https://store.onuron.org/policy/dmca">DMCA</a>
    </div>
  </div>
  <div class="container muted small" style="margin-top:32px">
    © {new Date().getFullYear()} Onuron
  </div>
</footer>
```

```astro
---
// packages/ui/components/Hero.astro
export interface Props { title: string; subtitle?: string; }
const { title, subtitle } = Astro.props;
---
<section class="hero container">
  <h1>{title}</h1>
  {subtitle && <p>{subtitle}</p>}
  <div class="actions"><slot /></div>
</section>
```

```astro
---
// packages/ui/components/FeatureCard.astro
export interface Props { title: string; desc: string; href?: string; }
const { title, desc, href } = Astro.props;
---
<a class="card" href={href ?? "#"}>
  <h3>{title}</h3>
  <p class="muted small">{desc}</p>
</a>
```

```astro
---
// packages/ui/components/CodeBlock.astro
export interface Props { code: string; label?: string; }
const { code, label } = Astro.props;
---
<div class="code">
  <code>{label ? `${label}  ` : ""}{code}</code>
</div>
```

```astro
---
// packages/ui/components/StoreBadge.astro
export interface Props { href?: string; }
const { href = "https://store.onuron.org" } = Astro.props;
---
<a class="store-badge" href={href}>
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="#5b8cff" stroke-width="2"/>
    <path d="M12 8v6m0 0l-3-3m3 3l3-3M8 17h8" stroke="#22d3aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <span><small>Get it on</small><strong>onuronOS App Store</strong></span>
</a>
```

```astro
---
// packages/ui/components/InstallButton.astro
export interface Props { appId: string; packageUrl?: string; }
const { appId, packageUrl } = Astro.props;
const deepLink = `onuron://store/install?id=${appId}`;
---
<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
  <a class="btn btn-primary" href={deepLink}>⬇ Install on onuronOS</a>
  {packageUrl && <a class="btn btn-ghost" href={packageUrl}>Download .onp</a>}
</div>
<p class="muted small">ডিভাইসে onuronOS থাকলে বাটনে ক্লিক করলে App Store খুলবে।</p>
```

```astro
---
// packages/ui/components/AppCard.astro
import type { AppManifest } from "@onuron/store-schema";
export interface Props { app: AppManifest; }
const { app } = Astro.props;
---
<a class="card app-card" href={`https://store.onuron.org/apps/${app.id}`}
   data-search={`${app.name} ${app.summary} ${app.category} ${(app.tags ?? []).join(" ")}`.toLowerCase()}>
  <img class="app-icon" src={app.media.iconUrl} alt={`${app.name} icon`} />
  <div>
    <h3>{app.name}</h3>
    <p class="muted small" style="margin:0 0 8px">{app.summary}</p>
    <span class="badge">{app.category}</span>
    <span class="badge">v{app.version}</span>
  </div>
</a>
```

---

## 🌐 apps/main (onuron.org)

```json
// apps/main/package.json
{
  "name": "@onuron/site-main", "private": true, "type": "module",
  "scripts": { "dev": "astro dev", "build": "astro build", "preview": "astro preview" },
  "dependencies": {
    "astro": "^5.1.1",
    "@onuron/ui": "workspace:*",
    "@onuron/store-schema": "workspace:*"
  }
}
```

```js
// apps/main/astro.config.mjs
import { defineConfig } from "astro/config";
export default defineConfig({ site: "https://onuron.org" });
```

```astro
---
// apps/main/src/pages/index.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
import Hero from "@onuron/ui/components/Hero.astro";
import FeatureCard from "@onuron/ui/components/FeatureCard.astro";
import StoreBadge from "@onuron/ui/components/StoreBadge.astro";
---
<BaseLayout title="Onuron — Open Source Ecosystem">
  <Navbar current="Home" />
  <Hero title="One ecosystem. OS, Language & Framework."
        subtitle="onuronOS, nilLang এবং alap-framework — সম্পূর্ণ ওপেন-সোর্স, কমিউনিটি-চালিত।">
    <a class="btn btn-primary" href="https://os.onuron.org/download">Download onuronOS</a>
    <a class="btn btn-ghost" href="https://github.com/joysriramsarkar">GitHub ↗</a>
  </Hero>

  <section class="section container">
    <h2>The Ecosystem</h2>
    <div class="grid">
      <FeatureCard href="https://os.onuron.org" title="onuronOS"
        desc="হালকা, নিরাপদ ও মডুলার অপারেটিং সিস্টেম — নিজস্ব App Store সহ।" />
      <FeatureCard href="https://alap.onuron.org" title="alap-framework"
        desc="দ্রুত অ্যাপ ও সার্ভিস বানানোর ফ্রেমওয়ার্ক।" />
      <FeatureCard href="https://nil.onuron.org" title="nilLang"
        desc="সরল সিনট্যাক্সের আধুনিক প্রোগ্রামিং ল্যাঙ্গুয়েজ।" />
    </div>
  </section>

  <section class="section container" style="text-align:center">
    <h2>Apps for onuronOS</h2>
    <p class="muted">আমাদের নিজস্ব App Store-এ ব্রাউজ করুন অ্যাপ, গেম ও টুলস।</p>
    <div style="display:flex;justify-content:center;margin-top:18px">
      <StoreBadge />
    </div>
  </section>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/main/src/pages/about.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
---
<BaseLayout title="About — Onuron">
  <Navbar current="Home" />
  <main class="container prose section">
    <h1>About Onuron</h1>
    <p>Onuron একটি ওপেন-সোর্স ইকোসিস্টেম প্রজেক্ট — যার লক্ষ্য একটি সম্পূর্ণ কম্পিউটিং স্ট্যাক:
    অপারেটিং সিস্টেম (onuronOS), প্রোগ্রামিং ল্যাঙ্গুয়েজ (nilLang) এবং অ্যাপ ফ্রেমওয়ার্ক (alap-framework)।</p>
    <h2>ভিশন</h2>
    <p>স্বচ্ছ, শেখার-যোগ্য ও কমিউনিটির মালিকানায় থাকা সফটওয়্যার স্ট্যাক, যেখানে প্রতিটি লেয়ার
    পড়া, ফর্ক করা ও উন্নত করা যায়।</p>
    <h2>টিম</h2>
    <p>এটি বর্তমানে <a href="https://github.com/joysriramsarkar">Joysriram Sarkar</a> কর্তৃক উদ্যোচিত,
    কন্ট্রিবিউটরদের জন্য উন্মুক্ত।</p>
  </main>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/main/src/pages/apps.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
import Hero from "@onuron/ui/components/Hero.astro";
import StoreBadge from "@onuron/ui/components/StoreBadge.astro";
---
<BaseLayout title="Apps — Onuron">
  <Navbar current="App Store" />
  <Hero title="onuronOS App Store"
        subtitle="onuronOS-এর ভেতরের অ্যাপগুলো ব্রাউজ ও ইনস্টল করুন সরাসরি স্টোর থেকে।">
    <StoreBadge />
  </Hero>
  <main class="container prose section">
    <h2>কীভাবে কাজ করে?</h2>
    <p>onuronOS-এ বিল্ট-ইন App Store ক্লায়েন্ট <code class="mono">store.onuron.org</code> এর ফিড থেকে
    অ্যাপের তালিকা ও আপডেট টানে, প্যাকেজ ডাউনলোড করে checksum ও সিগনেচার ভেরিফাই করে ইনস্টল করে।</p>
    <h2>ডেভেলপার?</h2>
    <p>নিজের অ্যাপ স্টোরে আনতে <a href="https://store.onuron.org/developers">Developer Portal</a> দেখুন।</p>
  </main>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/main/src/pages/press.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
---
<BaseLayout title="Press Kit — Onuron">
  <Navbar current="Home" />
  <main class="container prose section">
    <h1>Press Kit</h1>
    <p>সংবাদমাধ্যম ও ব্লগারদের জন্য ব্র্যান্ড রিসোর্স।</p>
    <ul>
      <li>লোগো (SVG): <code class="mono">/logos/onuron.svg</code></li>
      <li>onuronOS স্ক্রিনশট: <a href="https://os.onuron.org/screenshots">os.onuron.org/screenshots</a></li>
      <li>ব্র্যান্ড কালার: <code class="mono">#5b8cff</code>, <code class="mono">#22d3aa</code></li>
    </ul>
    <p class="muted small">ব্যবহারের আগে লোগো বিকৃত করবেন না; রঙ পরিবর্তন করবেন না।</p>
  </main>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/main/src/pages/privacy.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
---
<BaseLayout title="Privacy Policy — Onuron">
  <Navbar current="Home" />
  <main class="container prose section">
    <h1>Privacy Policy</h1>
    <p>এই ওয়েবসাইটগুলো কোনো ট্র্যাকিং কুকি ব্যবহার করে না। অ্যানালিটিক্স ব্যবহৃত হলে তা anonymous।</p>
    <h2>App Store ক্লায়েন্ট</h2>
    <p>onuronOS App Store ক্লায়েন্ট শুধুমাত্র অ্যাপ ক্যাটালগ ফেচ করে। আপডেট চেকের সময় OS ভার্সন ও
    আর্কিটেকচার পাঠাতে পারে — কোনো ব্যক্তিগত তথ্য নয়।</p>
    <h2>যোগাযোগ</h2>
    <p>privacy@onuron.org</p>
  </main>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/main/src/pages/terms.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
---
<BaseLayout title="Terms of Service — Onuron">
  <Navbar current="Home" />
  <main class="container prose section">
    <h1>Terms of Service</h1>
    <p>এই সাইটের কন্টেন্ট ও সফটওয়্যার যথাক্রমে তাদের লাইসেন্স (অধিকাংশ ক্ষেত্রে MIT) এর অধীনে ব্যবহারযোগ্য।</p>
    <p>সফটওয়্যার "AS IS" ভিত্তিতে প্রদত্ত — কোনো ওয়ারেন্টি ছাড়া। ব্যবহারের দায় ব্যবহারকারীর।</p>
    <p>App Store-এর তৃতীয় পক্ষের অ্যাপের জন্য সংশ্লিষ্ট ডেভেলপার দায়ী;
    <a href="https://store.onuron.org/policy/content">Content Policy</a> প্রযোজ্য।</p>
  </main>
  <Footer />
</BaseLayout>
```

---

## 💻 apps/os (os.onuron.org)

```json
// apps/os/package.json
{
  "name": "@onuron/site-os", "private": true, "type": "module",
  "scripts": { "dev": "astro dev", "build": "astro build", "preview": "astro preview" },
  "dependencies": { "astro": "^5.1.1", "@onuron/ui": "workspace:*" }
}
```

```js
// apps/os/astro.config.mjs
import { defineConfig } from "astro/config";
export default defineConfig({ site: "https://os.onuron.org" });
```

```astro
---
// apps/os/src/pages/index.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
import Hero from "@onuron/ui/components/Hero.astro";
import FeatureCard from "@onuron/ui/components/FeatureCard.astro";
import StoreBadge from "@onuron/ui/components/StoreBadge.astro";
---
<BaseLayout title="onuronOS — A modular open-source OS">
  <Navbar current="onuronOS" />
  <Hero title="onuronOS" subtitle="হালকা, মডুলার ও নিরাপদ অপারেটিং সিস্টেম — নিজস্ব App Store সহ।">
    <a class="btn btn-primary" href="/download">Download</a>
    <a class="btn btn-ghost" href="/install">Installation Guide</a>
    <StoreBadge />
  </Hero>
  <section class="section container">
    <div class="grid">
      <FeatureCard title="Modular Kernel" desc="প্রয়োজনমতো মডিউল বাছাই করুন।" />
      <FeatureCard title="Onuron Store" desc="সাইন-ভেরিফাইড অ্যাপ, অটো আপডেট।" />
      <FeatureCard title="Lightweight" desc="কম র‍্যামে দ্রুত বুট।" />
    </div>
  </section>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/os/src/pages/features.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
---
<BaseLayout title="Features — onuronOS">
  <Navbar current="onuronOS" />
  <main class="container prose section">
    <h1>Features</h1>
    <ul>
      <li>মডুলার আর্কিটেকচার — বেস সিস্টেম + অপশনাল লেয়ার</li>
      <li>বিল্ট-ইন App Store (feed: <code class="mono">store.onuron.org/api/v1</code>)</li>
      <li>প্যাকেজ সিগনেচার ভেরিফিকেশন (ed25519)</li>
      <li>x86_64 ও aarch64 সাপোর্ট</li>
      <li>alap-framework ও nilLang-এর ফার্স্ট-পার্টি সাপোর্ট</li>
    </ul>
  </main>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/os/src/pages/download.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
---
<BaseLayout title="Download — onuronOS">
  <Navbar current="onuronOS" />
  <main class="container prose section">
    <h1>Download onuronOS</h1>
    <table class="meta">
      <tr><td>Stable ISO (x86_64)</td><td><a class="btn btn-primary" href="https://cdn.onuron.org/os/onuronos-0.9.2-x86_64.iso">Download</a></td></tr>
      <tr><td>ARM64 Image</td><td><a class="btn btn-ghost" href="https://cdn.onuron.org/os/onuronos-0.9.2-aarch64.img">Download</a></td></tr>
      <tr><td>SHA256</td><td class="mono small">প্রতি রিলিজে GitHub Releases-এ প্রকাশিত</td></tr>
    </table>
    <p class="muted small">ইনস্টলের আগে checksum অবশ্যই মিলিয়ে নিন।</p>
    <p><a href="/install">→ Installation Guide</a></p>
  </main>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/os/src/pages/install.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
import CodeBlock from "@onuron/ui/components/CodeBlock.astro";
---
<BaseLayout title="Install — onuronOS">
  <Navbar current="onuronOS" />
  <main class="container prose section">
    <h1>Installation Guide</h1>
    <ol>
      <li>ISO ডাউনলোড করে checksum ভেরিফাই করুন:</li>
    </ol>
    <CodeBlock label="$" code="sha256sum onuronos-0.9.2-x86_64.iso" />
    <ol start="2">
      <li>USB বুটেবল মিডিয়া বানান:</li>
    </ol>
    <CodeBlock label="$" code="dd if=onuronos.iso of=/dev/sdX bs=4M status=progress" />
    <ol start="3">
      <li>BIOS/UEFI থেকে বুট করে ইনস্টলার অনুসরণ করুন।</li>
      <li>প্রথম বুটে App Store খুলে অ্যাপ ইনস্টল করুন।</li>
    </ol>
  </main>
  <Footer />
</BaseLayout>
```

---

## 🧰 apps/alap (alap.onuron.org)

```json
// apps/alap/package.json
{
  "name": "@onuron/site-alap", "private": true, "type": "module",
  "scripts": { "dev": "astro dev", "build": "astro build", "preview": "astro preview" },
  "dependencies": { "astro": "^5.1.1", "@onuron/ui": "workspace:*" }
}
```

```js
// apps/alap/astro.config.mjs
import { defineConfig } from "astro/config";
export default defineConfig({ site: "https://alap.onuron.org" });
```

```astro
---
// apps/alap/src/pages/index.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
import Hero from "@onuron/ui/components/Hero.astro";
import CodeBlock from "@onuron/ui/components/CodeBlock.astro";
---
<BaseLayout title="alap-framework — Build fast apps">
  <Navbar current="alap" />
  <Hero title="alap-framework" subtitle="onuronOS ও অন্যান্য প্ল্যাটফর্মে অ্যাপ বানানোর ফ্রেমওয়ার্ক।">
    <a class="btn btn-primary" href="/quickstart">Quick Start</a>
    <a class="btn btn-ghost" href="https://github.com/joysriramsarkar/alap-framework">GitHub ↗</a>
  </Hero>
  <section class="container" style="max-width:640px">
    <CodeBlock label="$" code="alap init my-app && cd my-app && alap run" />
  </section>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/alap/src/pages/quickstart.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
import CodeBlock from "@onuron/ui/components/CodeBlock.astro";
---
<BaseLayout title="Quick Start — alap">
  <Navbar current="alap" />
  <main class="container prose section">
    <h1>Quick Start</h1>
    <CodeBlock label="$" code="alap init hello" />
    <CodeBlock code={`// hello/src/main.nil
fn main() {
  app.window("Hello", 480, 320)
  app.label("স্বাগতম, Onuron!")
  app.run()
}`} />
    <CodeBlock label="$" code="alap run" />
    <p class="muted">বিল্ড ও প্যাকেজিং:</p>
    <CodeBlock label="$" code="alap build --package onp" />
    <p>তৈরি <code class="mono">.onp</code> ফাইলটি App Store-এ সাবমিটযোগ্য।</p>
  </main>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/alap/src/pages/examples.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
---
<BaseLayout title="Examples — alap">
  <Navbar current="alap" />
  <main class="container prose section">
    <h1>Examples</h1>
    <ul>
      <li><a href="https://github.com/joysriramsarkar/alap-framework/tree/main/examples">examples/</a> — অফিসিয়াল উদাহরণ</li>
      <li>Todo অ্যাপ, ফাইল ব্রাউজার, মিউজিক প্লেয়ার</li>
    </ul>
  </main>
  <Footer />
</BaseLayout>
```

---

## 🧪 apps/nil (nil.onuron.org)

```json
// apps/nil/package.json
{
  "name": "@onuron/site-nil", "private": true, "type": "module",
  "scripts": { "dev": "astro dev", "build": "astro build", "preview": "astro preview" },
  "dependencies": { "astro": "^5.1.1", "@onuron/ui": "workspace:*" }
}
```

```js
// apps/nil/astro.config.mjs
import { defineConfig } from "astro/config";
export default defineConfig({ site: "https://nil.onuron.org" });
```

```astro
---
// apps/nil/src/pages/index.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
import Hero from "@onuron/ui/components/Hero.astro";
import CodeBlock from "@onuron/ui/components/CodeBlock.astro";
---
<BaseLayout title="nilLang — Simple. Fast. Yours.">
  <Navbar current="nilLang" />
  <Hero title="nilLang" subtitle="সরল সিনট্যাক্স, শক্তিশালী টাইপ সিস্টেম।">
    <a class="btn btn-primary" href="/playground">Playground</a>
    <a class="btn btn-ghost" href="https://github.com/joysriramsarkar/nilLang">GitHub ↗</a>
  </Hero>
  <section class="container" style="max-width:640px">
    <CodeBlock code={`fn greet(name: str) -> str {
  return "হ্যালো, " + name
}
print(greet("Onuron"))`} />
  </section>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/nil/src/pages/syntax.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
import CodeBlock from "@onuron/ui/components/CodeBlock.astro";
---
<BaseLayout title="Syntax — nilLang">
  <Navbar current="nilLang" />
  <main class="container prose section">
    <h1>Syntax Guide</h1>
    <h2>Variables</h2>
    <CodeBlock code={`let x = 10        // immutable
var y = 20        // mutable`} />
    <h2>Functions</h2>
    <CodeBlock code={`fn add(a: int, b: int) -> int { a + b }`} />
    <h2>Control flow</h2>
    <CodeBlock code={`if x > 5 { print("বড়") } else { print("ছোট") }`} />
  </main>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/nil/src/pages/playground.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
---
<BaseLayout title="Playground — nilLang">
  <Navbar current="nilLang" />
  <main class="container section" style="max-width:860px">
    <h1>Playground</h1>
    <textarea id="src" rows="10" class="code" style="width:100%">print("হ্যালো Onuron!")</textarea>
    <p><button id="run" class="btn btn-primary">▶ Run</button></p>
    <pre id="out" class="code" style="min-height:60px"></pre>
  </main>
  <script>
    document.getElementById("run")?.addEventListener("click", () => {
      // TODO: nil compiler WASM বিল্ড এখানে লোড হবে
      document.getElementById("out")!.textContent =
        "nil WASM compiler শীঘ্রই আসছে — এখনো লোকাল CLI ব্যবহার করুন: nil run";
    });
  </script>
  <Footer />
</BaseLayout>
```

---

## 📚 apps/docs (docs.onuron.org)

```json
// apps/docs/package.json
{
  "name": "@onuron/site-docs", "private": true, "type": "module",
  "scripts": { "dev": "astro dev", "build": "astro build", "preview": "astro preview" },
  "dependencies": {
    "astro": "^5.1.1",
    "@astrojs/starlight": "^0.30.3"
  }
}
```

```js
// apps/docs/astro.config.mjs
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://docs.onuron.org",
  integrations: [
    starlight({
      title: "Onuron Docs",
      social: [{ icon: "github", href: "https://github.com/joysriramsarkar" }],
      sidebar: [
        { label: "onuronOS", autogenerate: { directory: "onuron-os" } },
        { label: "alap-framework", autogenerate: { directory: "alap" } },
        { label: "nilLang", autogenerate: { directory: "nil" } },
      ],
    }),
  ],
});
```

```markdown
<!-- apps/docs/src/content/docs/onuron-os/getting-started.md -->
---
title: Getting Started
---
onuronOS ইনস্টল ও প্রথম বুটের গাইড। ISO ডাউনলোড: [os.onuron.org/download](https://os.onuron.org/download)।
```

```markdown
<!-- apps/docs/src/content/docs/alap/first-app.md -->
---
title: Your First App
---
`alap init hello` চালিয়ে প্রথম অ্যাপ তৈরি করুন। বিস্তারিত: [alap.onuron.org/quickstart](https://alap.onuron.org/quickstart)
```

```markdown
<!-- apps/docs/src/content/docs/nil/tutorial.md -->
---
title: Tutorial
---
nilLang এর বেসিক: variables, functions, control flow। Playground: [nil.onuron.org/playground](https://nil.onuron.org/playground)
```

---

## 🛍️ apps/store (store.onuron.org) ⭐

```json
// apps/store/package.json
{
  "name": "@onuron/site-store", "private": true, "type": "module",
  "scripts": { "dev": "astro dev", "build": "astro build", "preview": "astro preview" },
  "dependencies": {
    "astro": "^5.1.1",
    "@onuron/ui": "workspace:*",
    "@onuron/store-schema": "workspace:*"
  }
}
```

```js
// apps/store/astro.config.mjs
import { defineConfig } from "astro/config";
export default defineConfig({ site: "https://store.onuron.org" });
```

```ts
// apps/store/src/lib/registry.ts
import fs from "node:fs";
import path from "node:path";
import type { AppManifest } from "@onuron/store-schema";

const REGISTRY = path.join(process.cwd(), "public/registry/apps");

export function loadApps(): AppManifest[] {
  if (!fs.existsSync(REGISTRY)) return [];
  return fs
    .readdirSync(REGISTRY, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const m = JSON.parse(
        fs.readFileSync(path.join(REGISTRY, d.name, "manifest.json"), "utf8")
      ) as AppManifest;
      m.media.iconUrl = `/registry/apps/${d.name}/${m.media.icon}`;
      m.media.screenshotUrls = (m.media.screenshots ?? []).map(
        (s) => `/registry/apps/${d.name}/${s}`
      );
      return m;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getApp(id: string) {
  return loadApps().find((a) => a.id === id);
}

export function formatBytes(n: number) {
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
```

### Registry ডেটা (উদাহরণ অ্যাপ)

```json
// apps/store/public/registry/apps/org.onuron.notes/manifest.json
{
  "id": "org.onuron.notes",
  "name": "Onuron Notes",
  "summary": "দ্রুত, অফলাইন-ফার্স্ট নোট অ্যাপ",
  "description": "Onuron Notes একটি হালকা নোট অ্যাপ — মার্কডাউন সাপোর্ট, এনক্রিপ্টেড নোট ও ক্লাউড সিঙ্ক ছাড়াই সম্পূর্ণ অফলাইন অভিজ্ঞতা।",
  "version": "1.2.0",
  "minOs": "0.9.0",
  "arch": ["x86_64", "aarch64"],
  "category": "productivity",
  "tags": ["notes", "markdown", "offline"],
  "license": "MIT",
  "developer": { "name": "Onuron Team", "email": "dev@onuron.org", "url": "https://onuron.org" },
  "package": {
    "url": "https://cdn.onuron.org/packages/org.onuron.notes-1.2.0.onp",
    "size": 4521984,
    "sha256": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
  },
  "media": { "icon": "icon.svg", "screenshots": [] }
}
```

```svg
<!-- apps/store/public/registry/apps/org.onuron.notes/icon.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#5b8cff"/><path d="M20 22h24M20 32h24M20 42h14" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>
```

```json
// apps/store/public/registry/apps/org.onuron.files/manifest.json
{
  "id": "org.onuron.files",
  "name": "Onuron Files",
  "summary": "আধুনিক ফাইল ম্যানেজার",
  "description": "ট্যাবস, ডার্ক মোড ও দ্রুত সার্চসহ onuronOS-এর ডিফল্ট ফাইল ম্যানেজার।",
  "version": "2.0.1",
  "minOs": "0.9.0",
  "arch": ["x86_64", "aarch64", "riscv64"],
  "category": "utilities",
  "tags": ["files", "manager"],
  "license": "MIT",
  "developer": { "name": "Onuron Team", "email": "dev@onuron.org", "url": "https://onuron.org" },
  "package": {
    "url": "https://cdn.onuron.org/packages/org.onuron.files-2.0.1.onp",
    "size": 8126464,
    "sha256": "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"
  },
  "media": { "icon": "icon.svg", "screenshots": [] }
}
```

```svg
<!-- apps/store/public/registry/apps/org.onuron.files/icon.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#22d3aa"/><path d="M16 24h12l4 5h16v19H16z" fill="#fff"/></svg>
```

### Store পেজসমূহ

```astro
---
// apps/store/src/pages/index.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
import Hero from "@onuron/ui/components/Hero.astro";
import AppCard from "@onuron/ui/components/AppCard.astro";
import { loadApps } from "../lib/registry";
const apps = loadApps();
---
<BaseLayout title="onuronOS App Store">
  <Navbar current="App Store" />
  <Hero title="onuronOS App Store"
        subtitle="ভেরিফাইড, সাইন-করা অ্যাপ — আপনার Onuron ডিভাইসের জন্য।">
    <a class="btn btn-primary" href="/apps">Browse all apps</a>
    <a class="btn btn-ghost" href="/developers">Developer Portal</a>
  </Hero>
  <section class="section container">
    <h2>Featured Apps</h2>
    <div class="grid">
      {apps.map((app) => <AppCard app={app} />)}
    </div>
  </section>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/store/src/pages/apps/index.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
import AppCard from "@onuron/ui/components/AppCard.astro";
import { loadApps } from "../../lib/registry";
const apps = loadApps();
---
<BaseLayout title="All Apps — onuronOS App Store">
  <Navbar current="App Store" />
  <main class="container section">
    <h1>All Apps</h1>
    <input id="q" class="code" style="width:100%;margin-bottom:24px"
           placeholder="অ্যাপ খুঁজুন…" />
    <div class="grid" id="grid">
      {apps.map((app) => <AppCard app={app} />)}
    </div>
  </main>
  <script>
    const input = document.querySelector<HTMLInputElement>("#q")!;
    input.addEventListener("input", () => {
      const q = input.value.toLowerCase();
      document.querySelectorAll<HTMLElement>(".app-card").forEach((c) => {
        c.style.display = (c.dataset.search ?? "").includes(q) ? "" : "none";
      });
    });
  </script>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/store/src/pages/apps/[id].astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
import InstallButton from "@onuron/ui/components/InstallButton.astro";
import { loadApps, getApp, formatBytes } from "../../lib/registry";

export function getStaticPaths() {
  return loadApps().map((app) => ({ params: { id: app.id } }));
}
const app = getApp(Astro.params.id)!;
---
<BaseLayout title={`${app.name} — onuronOS App Store`} description={app.summary}>
  <Navbar current="App Store" />
  <main class="container section">
    <div class="app-card" style="gap:24px;align-items:center;display:flex;flex-wrap:wrap">
      <img class="app-icon" style="width:96px;height:96px" src={app.media.iconUrl} alt="" />
      <div style="flex:1;min-width:240px">
        <h1 style="margin:0">{app.name}</h1>
        <p class="muted">{app.summary}</p>
        <span class="badge">{app.category}</span>
        {app.tags?.map(t => <span class="badge">#{t}</span>)}
      </div>
      <InstallButton appId={app.id} packageUrl={app.package.url} />
    </div>

    {app.media.screenshotUrls?.length && (
      <div class="shots" style="margin-top:28px">
        {app.media.screenshotUrls.map(s => <img src={s} alt="screenshot" />)}
      </div>
    )}

    <div style="display:grid;grid-template-columns:2fr 1fr;gap:32px;margin-top:36px" class="store-detail">
      <div>
        <h2>About</h2>
        <p>{app.description ?? app.summary}</p>
      </div>
      <div>
        <h2>Info</h2>
        <table class="meta">
          <tr><td>Version</td><td class="mono">v{app.version}</td></tr>
          <tr><td>Requires</td><td class="mono">onuronOS ≥ {app.minOs}</td></tr>
          <tr><td>Arch</td><td class="mono">{app.arch.join(", ")}</td></tr>
          <tr><td>Size</td><td>{formatBytes(app.package.size)}</td></tr>
          <tr><td>License</td><td>{app.license ?? "—"}</td></tr>
          <tr><td>Developer</td><td>{app.developer.name}</td></tr>
          <tr><td>SHA256</td><td class="mono small" style="word-break:break-all">{app.package.sha256}</td></tr>
        </table>
      </div>
    </div>
  </main>
  <style>
    @media (max-width: 760px) { .store-detail { grid-template-columns: 1fr !important; } }
  </style>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/store/src/pages/categories/[category].astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
import AppCard from "@onuron/ui/components/AppCard.astro";
import { loadApps } from "../../lib/registry";

export function getStaticPaths() {
  const apps = loadApps();
  return [...new Set(apps.map(a => a.category))].map(category => ({
    params: { category },
    props: { apps: apps.filter(a => a.category === category) },
  }));
}
const { apps } = Astro.props as { apps: ReturnType<typeof loadApps> };
---
<BaseLayout title={`${Astro.params.category} — App Store`}>
  <Navbar current="App Store" />
  <main class="container section">
    <h1 style="text-transform:capitalize">{Astro.params.category}</h1>
    <div class="grid">{apps.map(a => <AppCard app={a} />)}</div>
  </main>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/store/src/pages/developers/index.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
import CodeBlock from "@onuron/ui/components/CodeBlock.astro";
---
<BaseLayout title="Developer Portal — onuronOS App Store">
  <Navbar current="App Store" />
  <main class="container prose section">
    <h1>Developer Portal</h1>
    <p>আপনার অ্যাপ onuronOS App Store-এ আনুন — সম্পূর্ণ Git-ভিত্তিক, স্বচ্ছ প্রসেস।</p>
    <ol>
      <li><code class="mono">alap build --package onp</code> দিয়ে প্যাকেজ বানান</li>
      <li>প্যাকেজ আপলোড করুন (R2 / GitHub Release)</li>
      <li>রিপো Fork করে <code class="mono">registry/apps/&lt;id&gt;/</code> এ manifest + icon যোগ করুন</li>
      <li>Pull Request খুলুন — CI অটো-ভ্যালিডেট করবে</li>
      <li>রিভিউ শেষে merge → অ্যাপ লাইভ (ওয়েব + OS ফিড)</li>
    </ol>
    <CodeBlock label="$" code="sha256sum my-app-1.0.0.onp" />
    <p><a class="btn btn-primary" href="/developers/submit">Submission Guide</a>
       <a class="btn btn-ghost" href="/developers/badge">Store Badge</a></p>
  </main>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/store/src/pages/developers/submit.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
import CodeBlock from "@onuron/ui/components/CodeBlock.astro";
---
<BaseLayout title="Submit your app — onuronOS App Store">
  <Navbar current="App Store" />
  <main class="container prose section">
    <h1>Submission Guide</h1>
    <h2>Manifest উদাহরণ</h2>
    <CodeBlock code={`{
  "id": "com.example.myapp",
  "name": "My App",
  "summary": "এক লাইনের পরিচিতি",
  "version": "1.0.0",
  "minOs": "0.9.0",
  "arch": ["x86_64"],
  "category": "utilities",
  "developer": { "name": "You" },
  "package": { "url": "https://…/myapp-1.0.0.onp", "size": 123456, "sha256": "…" },
  "media": { "icon": "icon.svg" }
}`} />
    <h2>নিয়মাবলী</h2>
    <ul>
      <li>id ফোল্ডার নেমের সাথে হুবহু মিলতে হবে</li>
      <li>আইকন SVG, ন্যূনতম ৫১২×৫১২ viewBox</li>
      <li><a href="/policy/content">Content Policy</a> মেনে চলতে হবে</li>
    </ul>
  </main>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/store/src/pages/developers/badge.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
import StoreBadge from "@onuron/ui/components/StoreBadge.astro";
---
<BaseLayout title="Badge — onuronOS App Store">
  <Navbar current="App Store" />
  <main class="container prose section">
    <h1>Store Badge</h1>
    <p>আপনার অ্যাপের README বা ওয়েবসাইটে ব্যাজটি ব্যবহার করুন:</p>
    <StoreBadge href="https://store.onuron.org/apps/org.onuron.notes" />
    <h2>Markdown</h2>
    <pre class="code">[![Get it on onuronOS App Store](https://store.onuron.org/badge.svg)](https://store.onuron.org/apps/YOUR_APP_ID)</pre>
  </main>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/store/src/pages/policy/content.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
---
<BaseLayout title="Content Policy — onuronOS App Store">
  <Navbar current="App Store" />
  <main class="container prose section">
    <h1>Content Policy</h1>
    <ul>
      <li>ম্যালওয়্যার, গোপন তথ্য চুরি বা অনুমতিহীন নেটওয়ার্ক অ্যাক্সেস নিষিদ্ধ</li>
      <li>বিদ্বেষমূলক বা বেআইনি কন্টেন্ট নিষিদ্ধ</li>
      <li>অ্যাপকে অবশ্যই ঘোষিত পারমিশন অনুযায়ী চলতে হবে</li>
      <li>নীতি লঙ্ঘনে অ্যাপ স্টোর থেকে অপসারণ করা হবে</li>
    </ul>
  </main>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/store/src/pages/policy/dmca.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
---
<BaseLayout title="DMCA — onuronOS App Store">
  <Navbar current="App Store" />
  <main class="container prose section">
    <h1>DMCA / Takedown</h1>
    <p>কপিরাইট লঙ্ঘনের অভিযোগ পাঠান: <strong>dmca@onuron.org</strong></p>
    <p>অভিযোগে থাকতে হবে: লঙ্ঘিত কন্টেন্টের লিঙ্ক, আপনার পরিচয় ও good-faith বিবৃতি।
    বৈধ অভিযোগে সংশ্লিষ্ট অ্যাপ ৭২ ঘণ্টার মধ্যে সরানো হবে।</p>
  </main>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/store/src/pages/privacy.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
---
<BaseLayout title="Privacy — App Store">
  <Navbar current="App Store" />
  <main class="container prose section">
    <h1>Privacy (Store)</h1>
    <p>Store ক্লায়েন্ট অ্যাপ ক্যাটালগ ও আপডেট চেকের জন্য OS ভার্সন + আর্কিটেকচার পাঠায়।
    কোনো ব্যক্তিগত শনাক্তযোগ্য তথ্য সংগ্রহ করা হয় না। ডাউনলোড CDN লগ শুধু টেকনিক্যাল মেট্রিকের জন্য।</p>
  </main>
  <Footer />
</BaseLayout>
```

```astro
---
// apps/store/src/pages/terms.astro
import BaseLayout from "@onuron/ui/components/BaseLayout.astro";
import Navbar from "@onuron/ui/components/Navbar.astro";
import Footer from "@onuron/ui/components/Footer.astro";
---
<BaseLayout title="Terms — App Store">
  <Navbar current="App Store" />
  <main class="container prose section">
    <h1>Terms (Store)</h1>
    <p>তৃতীয় পক্ষের অ্যাপের দায় সংশ্লিষ্ট ডেভেলপারের। Onuron শুধু ডিস্ট্রিবিউশন প্ল্যাটফর্ম।
    ডেভেলপাররা <a href="/policy/content">Content Policy</a> ও লাইসেন্স নীতি মেনে চলতে বাধ্য।</p>
  </main>
  <Footer />
</BaseLayout>
```

### API Feed (OS ক্লায়েন্টের জন্য)

```ts
// apps/store/src/pages/api/v1/index.json.ts
import { loadApps } from "../../../lib/registry";

export async function GET() {
  return Response.json({
    feed: 1,
    updated: new Date().toISOString(),
    apps: loadApps(),
  });
}
```

```ts
// apps/store/src/pages/api/v1/apps/[id].json.ts
import type { APIContext } from "astro";
import { getApp } from "../../../../lib/registry";

export function getStaticPaths() {
  // dynamic নয় — সব app এর static JSON বিল্ড হবে
  return import("../../../../lib/registry").then(({ loadApps }) =>
    loadApps().map((a) => ({ params: { id: a.id } }))
  );
}

export async function GET({ params }: APIContext) {
  const app = getApp(params.id!);
  if (!app) return new Response(JSON.stringify({ error: "not found" }), { status: 404 });
  return Response.json(app);
}
```

---

## ⚙️ CI/CD

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate-registry:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm validate

  build:
    needs: validate-registry
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
```

---

## 🚀 চালু করার ধাপ

```bash
git init && pnpm install
pnpm validate     # ✅ Registry valid
pnpm dev          # সব সাইট লোকালে
pnpm build
```

এরপর Vercel-এ আগের ম্যাপিং টেবিল অনুযায়ী ৬টি প্রজেক্ট ইম্পোর্ট করে Root Directory সেট করুন, ডোমেইন কানেক্ট করুন — ব্যস, পুরো ইকোসিস্টেম লাইভ! 🎉

নতুন অ্যাপ যোগ করতে চাইলে শুধু `public/registry/apps/` এ ফোল্ডার যোগ করে PR খুলবেন — বাকি সব অটোমেটিক।