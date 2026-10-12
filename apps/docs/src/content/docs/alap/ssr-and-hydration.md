---
title: SSR ও স্টেট হাইড্রেশন
description: alap-framework-এ server-side rendering, XSS-নিরাপদ এস্কেপিং এবং ক্লায়েন্ট হাইড্রেশন।
---

alap-framework `web/ssr` প্যাকেজে server-side rendering (SSR) ও state hydration
সরবরাহ করে, যাতে প্রথম meaningful পেইন্ট দ্রুত হয়।

---

## ১. SSR রেন্ডার

```go
renderer := ssr.New("My App")
html := renderer.RenderPage(content, map[string]interface{}{
    "user": "Sarkar",
    "roles": []string{"admin"},
})
```

`RenderPage` দুটি কাজ করে:

1. **টেক্সট এস্কেপিং** — ব্যবহারকারীর টেক্সট HTML-এ সুরক্ষিতভাবে রাখে (XSS প্রতিরোধ)।
2. **Hydration state পেজে সিরিয়ালাইজ** — `__NILANG_STATE__` পেলোডে state বসায়।

---

## ২. হাইড্রেশন পেলোড

সার্ভার-রেন্ডারড পেজে state JSON এম্বেড হয়:

```html
<script id="__NILANG_STATE__" type="application/json">
  {"user":"Sarkar","roles":["admin"]}
</script>
```

পেজ লোড হওয়ার সাথে সাথে client runtime এই state গ্রহণ করে এবং ইন্টারঅ্যাকটিভ
ইভেন্ট হ্যান্ডলার যুক্ত করে।

> **সীমাবদ্ধতা:** client runtime (`platform/web` + `web/*`) routing/middleware/SSR
> স্তরে functional, কিন্তু production load test ও সম্পূর্ণ WebSocket upgrade
> hardened নয়। দেখুন [ওয়েব ফ্রেমওয়ার্ক](/alap/web-framework/#৭-বর্তমান-সীমাবদ্ধতা-সৎভাবে)।

---

## ৩. XSS নিরাপত্তা — কেন গুরুত্বপূর্ণ

SSR-এ টেমপ্লেটে ভারসাম্যহীন বা এস্কেপ-না-করা user input সরাসরি script execution
ঘটাতে পারে। alap-এর `RenderPage` টেক্সট কন্টেন্ট ও অ্যাট্রিবিউট এস্কেপ করে, তাই:

```text
ইনপুট:  <script>alert('xss')</script>
আউটপুট: &lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;
```

তবে **নিজের হাতে raw HTML ইনজেক্ট করা এড়িয়ে চলুন**; শুধু API-র এস্কেপড পথ ব্যবহার করুন।

---

## ৪. নিরাপত্তা হেডার

`middleware.SecurityHeaders()` SSR পেজে hardening হেডার যোগ করে। CORS ও
rate-limit মিডলওয়্যারসহ স্ট্যাক তৈরি করুন:

```go
r.Use(
    middleware.Recovery(),
    middleware.SecurityHeaders(),
    middleware.CORS(middleware.CORSConfig{ /* ... */ }),
)
```

---

## ৫. পরবর্তী পড়ুন

- [ওয়েব ফ্রেমওয়ার্ক](/alap/web-framework/)
- [অথেনটিকেশন ও সিকিউরিটি](/alap/auth-and-security/)
- canonical UI রেন্ডার মডেল: `nilLang/docs/spec/UI_SPEC.md`
