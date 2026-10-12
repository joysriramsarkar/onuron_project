---
title: অথেনটিকেশন ও সিকিউরিটি
description: alap-framework-এর auth প্যাকেজ (JWT, password hashing) এবং web middleware নিরাপত্তা।
---

alap-framework `auth` প্যাকেজে মৌলিক অথেনটিকেশন হেল্পার এবং `web/middleware`-এ
নিরাপত্তা মিডলওয়্যার দেয়।

> **সীমাবদ্ধতা:** `auth` একটি প্রাথমিক (early-alpha) সেট। এতে session store,
> refresh-token rotation বা সম্পূর্ণ RBAC ইঞ্জিন নেই — প্রয়োজনে অ্যাপ নিজে তৈরি করবে।

---

## ১. JWT (`auth`)

```go
claims := auth.Claims{ /* sub, roles, exp ... */ }
token, err := auth.SignJWT(claims, "SECRET_KEY")

parsed, err := auth.VerifyJWT(token, "SECRET_KEY")
```

`SignJWT(claims, secret)` টোকেন তৈরি করে; `VerifyJWT(token, secret)` যাচাই করে ও
`*Claims` ফেরায়; ব্যর্থ হলে error।

> HMAC secret কখনো সোর্সে হার্ডকোড করবেন না; env/secret-manager ব্যবহার করুন।

---

## ২. Password hashing (bcrypt)

```go
stored := auth.HashPassword("correct horse battery staple")
ok     := auth.CheckPassword("correct horse battery staple", stored)
```

`HashPassword` সুরক্ষিত ডাইজেস্ট ফেরায় (salted); `CheckPassword` যাচাই করে।

---

## ৩. RBAC (মিডলওয়্যার-ভিত্তিক)

এখনো নেটিভ RBAC ইঞ্জিন নেই — route group-এ middleware দিয়ে অনুমোদন যোগ করুন:

```go
requireRole := func(role string) middleware.Middleware {
    return func(next router.HandlerFunc) router.HandlerFunc {
        return func(ctx *router.Context) (interface{}, error) {
            claims, err := verifyFromRequest(ctx)
            if err != nil { return nil, err }
            // claims.roles-এ role আছে কি না পরীক্ষা
            return next(ctx)
        }
    }
}

admin := r.Group("/admin", requireRole("admin"))
admin.GET("/dashboard", dashboardHandler)
```

---

## ৪. নিরাপত্তা মিডলওয়্যার

| Middleware | কাজ |
|---|---|
| `SecurityHeaders()` | HSTS, X-Content-Type-Options, Frame-Options ইত্যাদি hardening হেডার |
| `CORS(CORSConfig{...})` | অনুমোদিত origin নিয়ন্ত্রণ |
| `RateLimit(requestsPerMin)` | brute-force/DoS প্রশমন |
| `Recovery()` | panic → 500 (stack leak ছাড়া) |
| `RequestID()` | নিরীক্ষা/ট্রেসিং |

ইনপুট যাচাই, output এস্কেপিং ([SSR](/alap/ssr-and-hydration/)) ও TLS termination
উপরে যোগ করা প্রয়োজন — alap নিজে TLS প্রোডাকশন-হার্ডেনড নয়।

---

## ৫. নিরাপত্তা চেকলিস্ট

- [ ] secret env/secret-manager-এ, কখনো repo-তে নয়।
- [ ] `SecurityHeaders()`, `CORS`, `RateLimit` সব public route-এ।
- [ ] পাসওয়ার্ড `auth.HashPassword` দিয়ে, plaintext নয়।
- [ ] JWT `exp` ছোট; refresh আলাদা, rotation-সহ।
- [ ] সব mutating/sensitive request লগ করুন, কিন্তু secret লগ করবেন না।

---

## ৬. পরবর্তী পড়ুন

- [ওয়েব ফ্রেমওয়ার্ক](/alap/web-framework/)
- [SSR ও হাইড্রেশন](/alap/ssr-and-hydration/)
- OS স্তরের নিরাপত্তা: [নিরাপত্তা ও স্যান্ডবক্সিং](/os/security/)
