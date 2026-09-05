---
title: Onuron Ecosystem Documentation
description: Complete guides, specifications, and tutorials for onuronOS, alap-framework, and nilLang.
template: splash
hero:
  tagline: সার্বভৌম উন্মুক্ত কম্পিউটিং ইকোসিস্টেম — আধুনিক অপারেটিং সিস্টেম, মেমরি-নিরাপদ প্রোগ্রামিং ভাষা এবং রিঅ্যাক্টিভ অ্যাপ্লিকেশন ফ্রেমওয়ার্ক।
  actions:
    - text: onuronOS গাইড
      link: /os/getting-started/
      icon: right-arrow
      variant: primary
    - text: nilLang টিউটোরিয়াল
      link: /nil/tutorial/
      icon: open-book
    - text: alap-framework
      link: /alap/first-app/
      icon: document
---

## 🧭 ইকোসিস্টেমের মূল উপাদানসমূহ

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin: 32px 0;">
  <div style="background: rgba(18, 27, 58, 0.6); border: 1px solid rgba(79, 139, 249, 0.35); border-radius: 14px; padding: 24px; backdrop-filter: blur(12px);">
    <h3 style="margin-top: 0; color: #60a5fa;">💻 onuronOS (অপারেটিং সিস্টেম)</h3>
    <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6;">
      হালকা, নিরাপদ এবং আধুনিক মাইক্রোকার্নেল-ভিত্তিক অপারেটিং সিস্টেম। টেলিমেট্রি-মুক্ত ও নিজস্ব ক্রিপ্টোগ্রাফিকালি সাইনড App Store সহ।
    </p>
    <a href="/os/getting-started/" style="color: #60a5fa; font-weight: 600;">onuronOS ডকস পড়ুন →</a>
  </div>

  <div style="background: rgba(18, 27, 58, 0.6); border: 1px solid rgba(157, 92, 255, 0.35); border-radius: 14px; padding: 24px; backdrop-filter: blur(12px);">
    <h3 style="margin-top: 0; color: #c084fc;">💎 nilLang (সিস্টেম ল্যাঙ্গুয়েজ)</h3>
    <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6;">
      জিরো-কস্ট অ্যাবস্ট্রাকশন, কম্পাইল-টাইম মেমরি সেফটি ও দ্রুত এক্সিকিউশন নিশ্চয়তাদানকারী আধুনিক প্রোগ্রামিং ভাষা।
    </p>
    <a href="/nil/tutorial/" style="color: #c084fc; font-weight: 600;">nilLang গাইড পড়ুন →</a>
  </div>

  <div style="background: rgba(18, 27, 58, 0.6); border: 1px solid rgba(16, 229, 178, 0.35); border-radius: 14px; padding: 24px; backdrop-filter: blur(12px);">
    <h3 style="margin-top: 0; color: #2dd4bf;">🎨 alap-framework (অ্যাপ ফ্রেমওয়ার্ক)</h3>
    <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6;">
      ডিক্লোরেটিভ কম্পোনেন্ট আর্কিটেকচার ও 60 FPS হার্ডওয়্যার অ্যাক্সিলারেটেড ডেস্কটপ অ্যাপ তৈরির আধুনিক ইউআই ফ্রেমওয়ার্ক।
    </p>
    <a href="/alap/first-app/" style="color: #2dd4bf; font-weight: 600;">alap ফ্রেমওয়ার্ক ডকস পড়ুন →</a>
  </div>

  <div style="background: rgba(18, 27, 58, 0.6); border: 1px solid rgba(251, 191, 36, 0.35); border-radius: 14px; padding: 24px; backdrop-filter: blur(12px);">
    <h3 style="margin-top: 0; color: #fbbf24;">📦 Onuron App Store & Registry</h3>
    <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6;">
      Git-চালিত উন্মুক্ত অ্যাপ্লিকেশন রেজিস্ট্রি। `.onp` প্যাকেজ ফরম্যাট, ভেরিফিকেশন ও ডেভেলপার সাবমিশন নির্দেশিকা।
    </p>
    <a href="/store/developer-guide/" style="color: #fbbf24; font-weight: 600;">ডেভেলপার গাইড পড়ুন →</a>
  </div>
</div>

---

## 🚀 দ্রুত শুরু করার উপায়

### ১. onuronOS ইনস্টলেশন
ন্যূনতম ১ জিবি র‍্যাম এবং ৮ জিবি স্টোরেজ সহ যেকোনো x86_64 অথবা aarch64 মেশিনে onuronOS ইনস্টল করা সম্ভব। বিস্তারিত জানতে দেখুন:
- [onuronOS ইনস্টলেশন গাইড](/os/getting-started/)
- [মাইক্রোকার্নেল আর্কিটেকচার](/os/architecture/)
- [প্যাকেজ ম্যানেজার (`onp` CLI)](/os/package-manager/)

### ২. nilLang-এ প্রথম প্রোগ্রাম
```rust
fn main() {
    let message = "স্বাগতম Onuron কম্পিউটিং ইকোসিস্টেমে!"
    print(message)
}
main()
```
সরাসরি ব্রাউজারে কোড লিখে পরীক্ষা করতে ভিজিট করুন [nilLang Live Playground](http://localhost:4324/playground) অথবা পড়ুন:
- [nilLang সম্পূর্ণ টিউটোরিয়াল](/nil/tutorial/)
- [টাইপ সিস্টেম ও ওনারশিপ](/nil/types-and-memory/)
- [স্ট্যান্ডার্ড লাইব্রেরি এপিআই](/nil/standard-library/)

### ৩. alap-framework দিয়ে ডেস্কটপ অ্যাপ তৈরি
```rust
component App() {
    state counter = 0

    view {
        <Window title="My First App" width={600}>
            <Header label="Hello Onuron!" />
            <Button onClick={() => counter++}>
                ক্লিক সংখ্যা: {counter}
            </Button>
        </Window>
    }
}
```
বিস্তারিত টিউটোরিয়ালের জন্য দেখুন:
- [প্রথম অ্যাপ তৈরি](/alap/first-app/)
- [কম্পোনেন্টস ও স্টাইলিং](/alap/components-and-styling/)
- [Alap Web ফ্রেমওয়ার্ক ও রাউটিং](/alap/web-framework/)
- [SSR ও স্টেট হাইড্রেশন](/alap/ssr-and-hydration/)
- [এন্টারপ্রাইজ ORM ও ডেটাবেস](/alap/orm-and-database/)
- [অথেন্টিকেশন ও সিকিউরিটি আর্কিটেকচার](/alap/auth-and-security/)

---

## 🏛️ প্রযুক্তিগত মূলনীতি

1. **সার্বভৌমত্ব ও স্বাধীনতা (Sovereignty)**: কোনো বিগ-টেক নির্ভরতা বা ক্লাউড ট্র্যাকিং নেই। অপারেটিং সিস্টেমের প্রতিটি বাইট আপনার সম্পূর্ণ নিয়ন্ত্রণে।
2. **স্মৃতি নিরাপত্তা (Memory Safety)**: nilLang এর কম্পাইল-টাইম ওনারশিপ এবং ধার-নেওয়ার (borrowing) নিয়মের ফলে নাল পয়েন্টার বা বাফার ওভারফ্লোর কোনো ঝুঁকি থাকে না।
3. **ক্রিপ্টোগ্রাফিক সুরক্ষা (Cryptographic Verification)**: অ্যাপ স্টোরের প্রতিটি সফটওয়্যার `ed25519` অ্যালগরিদম দ্বারা ডিজিটাল স্বাক্ষরযুক্ত।
