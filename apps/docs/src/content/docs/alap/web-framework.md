---
title: Alap Web Framework Architecture
description: Comprehensive guide to the Alap Web Framework, Radix Tree Routing, and Middleware Pipeline.
---

# Alap Web Framework

**Alap Web Framework** হলো Nilang ল্যাঙ্গুয়েজের অফিসিয়াল এন্টারপ্রাইজ ওয়েব অ্যাপ্লিকেশন ফ্রেমওয়ার্ক। এটি হাই-পারফরম্যান্স Radix Tree রাউটিং, মিডলওয়্যার অনিয়ন আর্কিটেকচার, ফুল-স্ট্যাক SSR এবং রিয়েলটাইম ওয়েব প্রযুক্তির সমন্বয়ে তৈরি।

---

## ১. কোর সার্ভার ও Radix Tree রাউটিং

Alap রাউটার লিনিয়ার স্ক্যানিং পরিহার করে **Radix Tree (Trie)** অ্যালগরিদম ব্যবহার করে। ফলে হাজার হাজার প্যারামেট্রিক রাউটেও $O(k)$ টাইম কমপ্লেক্সিটিতে ম্যাচিং সম্পন্ন হয়।

### রাউট নিবন্ধন ও প্যারামিটার কনস্ট্রেইন্ট

```nil
import { App, route, json } from "alap/web"

let app = App.new("UserService")

// সাধারণ প্যারামিটার
app.get("/users/:id", getUserHandler)

// টাইপ কনস্ট্রেইন্ট সহ প্যারামিটার
app.get("/items/{id:int}", getItemById)
app.get("/orders/{id:uuid}", getOrderByUUID)

// ওয়াইল্ডকার্ড রাউট (Static Assets)
app.get("/static/*filepath", staticHandler)
```

### রাউট গ্রুপ (Route Groups)

```nil
let api = app.group("/api/v1")
api.use(authMiddleware)

api.get("/profile", getProfile)
api.post("/settings", updateSettings)
```

---

## ২. মিডলওয়্যার অনিয়ন আর্কিটেকচার (Middleware Onion Pipeline)

রিকোয়েস্ট প্রসেসিংয়ের প্রতিটি স্তরে নিরাপত্তা ও পর্যবেক্ষণ নিশ্চিত করার জন্য স্ট্যান্ডার্ড মিডলওয়্যার চেইন উপস্থিত:

1. **Recovery Middleware**: অ্যাপ্লিকেশন ক্র্যাশ বা প্যানিক থেকে স্বয়ংক্রিয় রিকভারি ও ৫০০ রেসপন্স রিটার্ন।
2. **Request ID Injection**: ট্রেস করার জন্য প্রতিটি রিকোয়েস্টে ইউনিক `X-Request-ID` ইনজেকশন।
3. **Auto Security Headers**:
   - `Content-Security-Policy: default-src 'self'`
   - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: SAMEORIGIN`
   - `Referrer-Policy: strict-origin-when-cross-origin`
4. **CORS Middleware**: ক্রস-অরিজিন পলিসি ও প্রি-ফ্লাইট OPTIONS অনুরোধ হ্যান্ডলিং।
5. **Rate Limiter**: ক্লায়েন্ট IP অনুযায়ী স্লাইডিং উইন্ডো রেট লিমিটিং।

---

## ৩. লাইভ HTTP সার্ভার চালানো

```bash
# ডেভেলপমেন্ট সার্ভার
nil dev --port 8080

# নিবন্ধিত রাউট টেবিল পরিদর্শন
nil routes
```
