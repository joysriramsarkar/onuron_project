---
title: Server-Side Rendering (SSR) & State Hydration
description: How Alap handles secure HTML rendering and browser hydration.
---

# Server-Side Rendering (SSR) & State Hydration

ওয়েব অ্যাপ্লিকেশনে ফার্স্ট কনটেন্টফুল পেইন্ট (FCP) এবং সার্চ ইঞ্জিন অপ্টিমাইজেশনের (SEO) জন্য Alap একটি ইউনিফাইড SSR এবং ব্রাউজার হাইড্রেশন পাইপলাইন সরবরাহ করে।

---

## ১. XSS-সুরক্ষিত HTML এসকেপিং

Alap রেন্ডারার স্বয়ংক্রিয়ভাবে সমস্ত টেক্সট কন্টেন্ট এবং HTML অ্যাট্রিবিউট স্যানিটাইজ করে:

```nil
let card = Card.new("<script>alert('xss')</script>", "Safe Content")
let html = card.renderHTML()
// আউটপুটে &lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt; হিসেবে সুরক্ষিত থাকবে
```

---

## ২. স্টেট হাইড্রেশন প্যাটার্ন

সার্ভারে রেন্ডার হওয়া প্রারম্ভিক ডেটা ক্লায়েন্টে প্রেরণ করা হয়:

```html
<script id="__NILANG_STATE__" type="application/json">
  {"user":"Sarkar","roles":["admin"]}
</script>
<script>
  window.__NILANG_INITIAL_STATE__ = JSON.parse(document.getElementById('__NILANG_STATE__').textContent);
</script>
```

ব্রাউজারে পেজ লোড হওয়ার সাথে সাথে Alap Web ক্লায়েন্ট রানটাইম (`runtime.js`) স্বয়ংক্রিয়ভাবে গ্লোবাল স্টেট হাইড্রেশন সম্পন্ন করে এবং `data-alap-id` ও `data-alap-event` চিহ্নিত এলিমেন্টগুলোতে ইভেন্ট ডেলিগেশন সংযুক্ত করে।

---

## ৩. রিঅ্যাক্টিভ সিগন্যালস (Reactive Signals)

```nil
let count = Signal.new(0)
let doubled = Computed.new(|| count.get() * 2)

count.set(5)
print(doubled.get()) // 10
```
