---
title: ডেটা লেয়ার, ORM ও ডেটাবেস
description: alap-framework-এর query builder, transaction, migration এবং embedded JSON database।
---

alap-framework তিনটি ডেটা সুবিধা দেয়:

| প্যাকেজ | উদ্দেশ্য |
|---|---|
| `data/orm` | SQL query builder, connection pool, transaction |
| `data/migration` | ভার্সনড, ক্রমানুসারে প্রযুক্ত schema migration |
| `stdlib/database` | হালকা in-process JSON-backed ডেটাবেস |

> **নোট:** এটি production database নয় — network driver, real-server pooling বা
> schema introspection নেই।

---

## ১. Query builder (`data/orm`)

`Table(name)` একটি fluent builder শুরু করে। মান সবসময় parameterised (string
interpolation নয়), তাই generated SQL injection-safe।

```go
sql, params := orm.Table("orders").
    Select("id", "customer_id", "total", "status").
    Where("status", "=", "completed").
    Where("total", ">=", 500).
    Limit(20).
    ToSQL()
```

Generated shape:

```sql
SELECT id, customer_id, total, status FROM orders WHERE status = $1 AND total >= $2 LIMIT 20
```

| মেথড | বর্ণনা |
|---|---|
| `Table(name)` | টেবিলে query শুরু |
| `Select(cols...)` | Projection (ডিফল্ট `*`) |
| `Where(col, op, val)` | predicate (`=`, `>=`, `<`, …) |
| `Limit(n)` | সারি সীমা |
| `ToSQL()` | `(sql, params)` ফেরায় |

> `Where` operator ও মান সংরক্ষণ করে; সঠিক emitted SQL দেখতে `ToSQL()`-এর output-ই
> contract ধরে নিন।

---

## ২. Transaction (`data/orm`)

```go
pool := orm.NewDBPool()
err := pool.Transaction(func(tx *orm.Tx) error {
    // tx দিয়ে কাজ
    return tx.Commit()
})
```

`DBPool.Transaction` atomic কাজের সীমানা।

---

## ৩. Migration (`data/migration`)

```go
runner := migration.NewRunner().
    Register(migration.Migration{Version: 1, Name: "create_users", Up: createUsers}).
    Register(migration.Migration{Version: 2, Name: "add_index",    Up: addIndex})

applied := runner.Up()   // ক্রমানুসারে প্রযুক্ত ভার্সন ফেরায়
```

`Up()` ভার্সন-ক্রমে migration প্রয়োগ করে ও প্রযুক্ত ভার্সন তালিকা ফেরায় (টেস্টে
assert করার উপযোগী)।

---

## ৪. Embedded database (`stdlib/database`)

উদাহরণ, টেস্ট ও ছোট টুলের জন্য file-backed in-process DB — টেবিল রেকর্ড আকারে
JSON ফাইলে persist করে।

```go
db, err := database.New("pos.db")
if err != nil { /* ... */ }
defer db.Close()

db.CreateTable("orders")
db.Insert("orders", database.Record{"id": 1, "total": 99})

rows  := db.Query("orders", map[string]interface{}{"total": 99}, 10)
count := db.Count("orders", nil)

db.Update("orders", map[string]interface{}{"id": 1}, database.Record{"total": 120})
db.Delete("orders", map[string]interface{}{"id": 1})

names := db.TableNames()
```

| মেথড | বর্ণনা |
|---|---|
| `New(path)` | DB ফাইল খোলা/তৈরি |
| `CreateTable(name)` | টেবিল তৈরি |
| `Insert(table, rec)` | রেকর্ড যোগ |
| `Update(table, where, updates)` | ম্যাচিং রেকর্ড আপডেট; count ফেরায় |
| `Delete(table, where)` | ম্যাচিং রেকর্ড মুছে; count ফেরায় |
| `Query(table, where, limit)` | ম্যাচিং রেকর্ড পড়া |
| `Count(table, where)` | রেকর্ড গণনা |
| `GetRecord(table, where)` | একটি রেকর্ড |
| `TableNames()` / `Table(name)` | introspection |
| `Close()` | persist ও বন্ধ |

---

## ৫. ফাইল ও HTTP client

```go
_ = fs.WriteTextFile("notes.txt", "hello")
content, _ := fs.ReadTextFile("notes.txt")
exists := fs.Exists("notes.txt")

body, _ := net.Get("https://example.com")
_ = net.Post(url, "application/json", `{"ok":true}`)
resp, _ := net.Fetch("GET", url, map[string]string{"Accept": "application/json"}, "")
```

উপলব্ধ `stdlib/fs`: `ReadTextFile`, `WriteTextFile`, `AppendTextFile`, `Exists`,
`Remove`, `RemoveAll`, `Mkdir`, `ReadDir`।

---

## ৬. পরবর্তী পড়ুন

- [অথেনটিকেশন ও সিকিউরিটি](/alap/auth-and-security/)
- canonical ডেটা/ORM: `nilLang/std/db.nil`, `nilLang/std/README.md`
- রেফারেন্স: `alap-framework/docs/DATA.md`
