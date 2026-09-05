---
title: Enterprise ORM & Database Layer
description: Type-safe SQL Query Builder, Connection Pooling, and Migrations in Alap.
---

# Enterprise ORM & Database Layer

Alap ফ্রেমওয়ার্কে এন্টারপ্রাইজ গ্রেড ডেটা অ্যাক্সেসের জন্য টাইপ-সেফ কুয়েরি বিল্ডার এবং ভার্সনড মাইগ্রেশন সিস্টেম অন্তর্ভুক্ত।

---

## ১. টাইপ-সেফ কুয়েরি বিল্ডার (Query Builder)

PostgreSQL এবং SQLite ডায়ালেক্টের জন্য সম্পূর্ণ প্যারামিটারাইজড SQL কুয়েরি তৈরি করুন:

```nil
import { Table, DriverPostgres } from "alap/data"

let (sql, params) = Table("orders")
    .select(["id", "customer_id", "total", "status"])
    .where("status", "=", "completed")
    .where("total", ">=", 500)
    .orderBy("created_at", "DESC")
    .limit(20)
    .toSQL()
```

### জেনারেটেড SQL:
```sql
SELECT id, customer_id, total, status FROM orders WHERE status = $1 AND total >= $2 ORDER BY created_at DESC LIMIT 20
```

---

## ২. ডেটাবেস ট্রানজাকশন (ACID Transactions)

স্বয়ংক্রিয় রোলব্যাক নিশ্চিত করে ট্রানজাকশন পরিচালনা করুন:

```nil
db.transaction(|tx| {
    tx.execute("INSERT INTO accounts ...")
    tx.execute("INSERT INTO logs ...")
    // কোনো এরর বা এক্সেপশন দেখা দিলে স্বয়ংক্রিয় Rollback হবে
})
```

---

## ৩. ভার্সনড স্কিমা মাইগ্রেশন

CLI দিয়ে ডেটাবেস স্কিমা ভার্সনিং পরিচালনা করুন:

```bash
# পেন্ডিং মাইগ্রেশন আপগ্রেড করুন
nil db migrate

# শেষ মাইগ্রেশন রোলব্যাক করুন
nil db rollback

# বর্তমান মাইগ্রেশন স্ট্যাটাস দেখুন
nil db status
```
