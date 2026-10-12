---
title: alap ওয়েব ফ্রেমওয়ার্ক
description: alap-framework-এর HTTP স্ট্যাক — radix router, middleware, SSR, SSE ও WebSocket।
---

alap-framework একটি HTTP স্ট্যাক সরবরাহ করে: radix-tree (trie) router, middleware
chain, server-side rendering, Server-Sent Events ও WebSocket manager।

```text
web/
├── server/     # net/http সার্ভার wrapper
├── router/     # radix-tree router, Context, groups
├── middleware/ # Recovery, RequestID, SecurityHeaders, CORS, RateLimit
├── ssr/        # server-side rendering + state hydration
├── sse/        # Server-Sent Events stream
└── websocket/  # WebSocket client manager
```

> **নোট:** নিচের উদাহরণগুলো alap-prototype-এর Go API (হোস্ট-সাইড)।

---

## ১. সার্ভার

```go
srv := server.New("UserService")
_ = srv.Listen(":4324")            // blocks
_ = srv.Shutdown(ctx)
```

`server.Server` `http.Handler` implements করে (`ServeHTTP`), তাই বিদ্যমান Go
সার্ভারের ভিতরে মাউন্টও করা যায়।

---

## ২. Router

`router.New()` একটি radix-tree (trie) router দেয়, যা path segment-এ `O(k)`-এ ম্যাচ করে।

```go
r := router.New()
r.Use(middleware.Recovery(), middleware.SecurityHeaders())

r.GET("/users/:id", func(ctx *router.Context) (interface{}, error) {
    id := ctx.Param("id")
    return map[string]string{"id": id}, nil
})

// সীমাবদ্ধ প্যারামিটার: {name:type}
r.GET("/items/{id:int}", getItem)
r.GET("/orders/{id:uuid}", getOrder)
```

| ধরন | উদাহরণ | নোট |
|---|---|---|
| Static | `/health` | Literal segment |
| Named param | `/users/:id` | `ctx.Param("id")` / `ctx.ParamInt("id")` |
| Constrained | `/items/{id:int}` | `int` / `uuid` constraint |
| Method | `GET POST PUT DELETE` | এছাড়া `AddRoute(method, pattern, …)` |

Route group prefix ও shared middleware প্রয়োগ করে:

```go
admin := r.Group("/admin", requireRole("admin"))
admin.GET("/dashboard", dashboardHandler)
```

`r.Routes()` → `[]RouteInfo` (introspection ও টেস্টের জন্য)।

---

## ৩. Middleware

```go
type Middleware func(next router.HandlerFunc) router.HandlerFunc
```

| Middleware | কাজ |
|---|---|
| `Recovery()` | panic → 500 রেসপন্স |
| `RequestID()` | প্রতি রিকোয়েস্টে unique ID |
| `SecurityHeaders()` | hardening হেডার |
| `CORS(CORSConfig{...})` | কনফিগারেবল CORS |
| `RateLimit(requestsPerMin)` | per-key rate limiting |

---

## ৪. Server-Side Rendering (`web/ssr`)

```go
renderer := ssr.New("My App")
html := renderer.RenderPage(content, map[string]interface{}{
    "user": "Sarkar",
})
```

`RenderPage` টেক্সট এস্কেপ করে এবং hydration state পেজে সিরিয়ালাইজ করে
(`__NILANG_STATE__`)। বিস্তারিত: [SSR ও হাইড্রেশন](/alap/ssr-and-hydration/)।

---

## ৫. Server-Sent Events (`web/sse`)

```go
stream, err := sse.NewStream(w)
if err == nil {
    _ = stream.Emit("tick", map[string]int{"n": 1})
}
```

---

## ৬. WebSocket (`web/websocket`)

```go
m := websocket.NewManager()
m.Register(client)
m.Broadcast(map[string]string{"type": "update"})
m.Unregister(client)
```

---

## ৭. বর্তমান সীমাবদ্ধতা (সৎভাবে)

- routing/middleware স্তর unit-tested ও functional।
- **TLS termination, production load test এবং পূর্ণ WebSocket upgrade handling
  এখনো hardened নয়।**
- নিরাপত্তা হেডার/CORS মিডলওয়্যার আছে, কিন্তু এন্টারপ্রাইজ-গ্রেড WAF নয়।

রেফারেন্স: `alap-framework/docs/WEB.md`।
