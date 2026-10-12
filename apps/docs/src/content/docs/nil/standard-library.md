---
title: nilLang স্ট্যান্ডার্ড লাইব্রেরি (Standard Library)
description: std মডিউলের বিস্তারিত রেফারেন্স — math, collections, crypto, io, net, time, concurrency, text, db, device, mobile।
---

nilLang-এর অফিসিয়াল স্ট্যান্ডার্ড লাইব্রেরি `std` মডিউল নামস্থানে থাকে এবং
বান্ডেল-কপি `pkg/stdlib/modules/`-এ `std/`-এর সাথে সিঙ্ক করা থাকে।

ইমপোর্ট সিনট্যাক্স:

```nil
import "std/math" as math;
import "std/math/decimal" as decimal;
import "std/data/json" as json;
import "std/crypto" as crypto;
```

---

## ১. Core & Base Types — `std/core`

Identity, default মান, `clamp`, `repeat`, `swap`, এবং Result/Option হেল্পার:
`ok`, `err`, `mapResult`, `mapResultErr`, `andThen`, `okOr`, `expectResult`,
`some`, `none`, `mapOption`, `unwrapOrDefault`, `expectOption`, `pipeline`।

```nil
import "std/core" as core;
let r = core.ok(42);
let v = core.unwrapOrDefault(core.none(), 0);
```

---

## ২. গণিত ও অর্থ — `std/math`, `std/money`, `std/pos`

```nil
import "std/math" as math;
math.abs(-5); math.min(3, 7); math.max(3, 7); math.clamp(12, 0, 10);
math.gcd(12, 18); math.factorial(5); math.fibonacci(10);
math.PI; math.E;
```

- **`std/math/decimal`** — সঠিক fixed-point: `new`, `alignScales`, `add`, `sub`,
  `mul`, `div`, `toString`, `fromInt`, `fromMinor`।
- **`std/money`** — কারেন্সি-সচেতন: `new`, `ofMinor`, `ofMajor`, `add`, `sub`,
  `mulQty`, `format`।
- **`std/pos`** — POS হেল্পার: `newCatalog`, `addItem`, `newCart`, `addToCart`,
  `subtotal`, `discountOf`, `taxOf`, `checkout`, `formatReceipt` (বাংলা রসিদ)।

---

## ৩. Collections ও Strings — `std/collections`, `std/strings`

```nil
import "std/collections" as col;
col.map([1,2,3], fn(x){ return x*2; });
col.filter([1,2,3,4], fn(x){ return x % 2 == 0; });
col.reduce([1,2,3], 0, fn(a,b){ return a+b; });
col.sum([1,2,3]); col.take([1,2,3,4], 2); col.reverse([1,2,3]);
```

`std/strings`: `length`, `startsWith`, `endsWith`, `includes`, `capitalize`,
`lowercase`, `uppercase`, `reverse`, `repeat`, `replaceAll`, `lines`, `words`,
`padLeft`, `padRight`, `truncate`।

---

## ৪. ডেটা ও সিরিয়ালাইজেশন — `std/data/*`, `std/json`

```nil
import "std/data/json" as json;
let s = json.encode({"id": 1, "ok": true});
let v = json.decode(s);
```

- `std/data/base64` — Base64 encode/decode।
- `std/data/csv` — `parse`, `parseLine`, `encodeRow`।
- `std/json` — same API-এর convenience alias।

---

## ৫. ক্রিপ্টোগ্রাফি — `std/crypto/*`

| মডিউল | ফাংশন |
|---|---|
| `std/crypto/hash` | SHA-256, SHA-512 |
| `std/crypto/hmac` | `sha256`, `verify` |
| `std/crypto/random` | `bytes`, `hex`, `key32` (AES-256), `nonce12` (GCM) |
| `std/crypto/aes` | `encrypt`, `decrypt`, `roundTrip` (AES-GCM) |
| `std/crypto/ed25519` | `keypair`, `sign`, `verify`, `signText`, `verifyEnvelope` |
| `std/crypto` | উপরের সব + Base64 |

```nil
import "std/crypto" as crypto;
let digest = crypto.sha256("onuron-secure-payload");
```

---

## ৬. I/O ও ফাইলসিস্টেম — `std/io`, `std/fs`, `std/process`

```nil
import "std/io" as io;
io.appendText("config.txt", "port=4321\n");
let text = io.readText("config.txt");
let cfg = io.readJson("config.json");
```

- `std/io/path` — `joinPath`, `joinAll`, `basename`, `dirname`, `extName`,
  `withoutExt`, `isAbsolute`।
- `std/fs` — ফাইল পড়া/লেখা, উপস্থিতি চেক, ডিরেক্টরি ট্রাভার্সাল।
- `std/process` — কমান্ড এক্সিকিউশন ও exit code।

---

## ৭. নেটওয়ার্কিং — `std/net/*`, `std/http`

```nil
import "std/net/http" as http;
let body = http.get("https://example.com");
let data = http.getJson("https://api.example.com/v1/status");
http.postJson("https://api.example.com/v1/items", {"name": "চা"});
```

- `std/net/http/router` — `new`, `get`, `post`, `handle`, `response`,
  `responseJson`, `responseText`।
- `std/net/url` — scheme/host/path/query parsing, `encode`/`decode`, `buildQuery`।
- `std/net/socket` — আসল TCP: `connect`, `send`, `receive`, `close`।
- `std/net/tls` — `connect`, `connectDefault` (system roots)।

---

## ৮. ডেটাবেস ও ORM — `std/db`, `std/db/query_builder`, `std/data/migrate`

```nil
import "std/db" as db;
let conn = db.connect("postgres://...");
db.exec(conn, "INSERT INTO logs ...", []);
let rows = db.query(conn, "SELECT * FROM orders WHERE status = $1", ["completed"]);
```

- `std/db/query_builder` — `select`, `distinct`, `where`, `whereIn`, `limit`,
  `offset`, `order`, `buildSql` (postgres `$n` placeholder), `countSql`, `execute`।
- `std/data/migrate` — `entry`, `up`, `pending`, `appliedVersions`, `statusText`।

---

## ৯. সময় ও কনকারেন্সি — `std/time`, `std/concurrency/*`

```nil
import "std/time" as time;
let now = time.now();
time.sleep(100);
```

- `std/time/instant`, `std/time/duration`, `std/time/date` — উচ্চ-নির্ভুলতা সময়,
  `formatBn` (বাংলা), UTC `format`।
- `std/concurrency/task` — `spawn`, `spawnWith`, `wait`, `waitAll`, `mapAsync`।
- `std/concurrency/channel` — `create`, `sendValue`, `receiveValue`, `selectRecv`,
  `pipeline`।
- `std/concurrency/sync` — channel-ভিত্তিক `newMutex`/`lock`/`withLock`, `newOnce`।
- `std/concurrency/pool` — bounded worker pool `map`, `runEach`।

---

## ১০. বাংলা টেক্সট — `std/text/bn`, `std/text/unicode`, `std/text/encoding`

```nil
import "std/text/bn" as bn;
bn.toBnDigits("2026");            // "২০২৬"
bn.banglaYearText(2026, 10, 12);  // "১৪৩৩ বঙ্গাব্দ"
```

`std/text/unicode` — rune-safe `firstChar`, `lastChar`, `reverseText`।
`std/text/encoding` — UTF-8 রূপান্তর, `lines`, `words`, `wordCount`।

---

## ১১. ডিভাইস ও মোবাইল — `std/device`, `std/mobile`

- `std/device` (+ `camera`/`location`/`sensors`/`biometric`) — FFI-ভিত্তিক
  **stub**: ব্যাকএন্ড না থাকলে কখনো ক্র্যাশ করে না, বরং `Err("E_NOSUPPORT…")`
  ফেরায়; `info()` সবসময় কাজ করে।
- `std/mobile` (+ `lifecycle`/`deeplink`/`notify`/`share`) — অ্যাপ লাইফসাইকেল
  স্টেট-মেশিন, ডিপ-লিংক রাউটিং, নোটিফিকেশন কিউ, share sheet।

---

## ১২. টেস্টিং — `std/testing`

Assertions (`assertTrue`, `assertEqual`, `assertNull`, `assertOk`, `assertErr`,
`assertLen` …), mocks (`mockFn`, `mockCalls`), `benchmark`, golden files
(`goldenStore`, `assertGolden`)।

পূর্ণ API: `nilLang/std/README.md`।
