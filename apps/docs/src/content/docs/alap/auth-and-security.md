---
title: Authentication & Security Architecture
description: JWT, Signed Cookies, Password Hashing, CSRF, and RBAC in Alap.
---

# Authentication & Security Architecture

এন্টারপ্রাইজ ওয়েব সিস্টেমের অন্যতম পূর্বশর্ত আইডেন্টিটি এবং অ্যাক্সেস কন্ট্রোল। Alap ফ্রেমওয়ার্কে রয়েছে নেটিভ সিকিউরিটি স্যুট।

---

## ১. JSON Web Tokens (JWT)

HS256 অ্যালগরিদম ভিত্তিক টোকেন তৈরি ও ভ্যালিডেশন:

```nil
import { GenerateJWT, VerifyJWT } from "alap/security"

let token = GenerateJWT({
    sub: "user-42",
    roles: ["admin", "editor"],
    exp: time.now() + 3600
}, "SECRET_KEY")

let claims = VerifyJWT(token, "SECRET_KEY")
```

---

## ২. রোল-বেসড অ্যাক্সেস কন্ট্রোল (RBAC Middleware)

```nil
let adminRoute = app.group("/admin")
adminRoute.use(RequireRole("admin"))

adminRoute.get("/dashboard", adminDashboardHandler)
```

---

## ৩. সুরক্ষিত সাইনড সেশন কুকিজ ও CSRF প্রটেকশন

- **Signed Cookies**: কুকি ট্যাম্পারিং রোধে ক্রিপ্টোগ্রাফিক সিগনেচার।
- **CSRF Token Middleware**: POST, PUT, DELETE ইত্যাদি মিউটেটিং মেথডে `X-CSRF-Token` যাচাই।
