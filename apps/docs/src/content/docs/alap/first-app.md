---
title: প্রথম ডেস্কটপ অ্যাপ তৈরি (First App with alap)
description: alap-framework দিয়ে আপনার প্রথম রিঅ্যাক্টিভ ডেস্কটপ অ্যাপ্লিকেশন বানানোর পূর্ণাঙ্গ গাইড।
---

**alap-framework** হলো onuronOS ও ক্রস-প্ল্যাটফর্ম ডেস্কটপের জন্য নির্মিত একটি ডিক্লোরেটিভ ইউআই ও অ্যাপ্লিকেশন ফ্রেমওয়ার্ক।

## নতুন প্রজেক্ট শুরু করা

টার্মিনাল থেকে `alap` সিএলআই ব্যবহার করে একটি নতুন প্রজেক্ট তৈরি করুন:

```bash
alap init my-notes-app
cd my-notes-app
alap dev
```

প্রজেক্ট ফোল্ডার কাঠামো দেখতে নিচের মতো হবে:
```text
my-notes-app/
├── package.json
├── manifest.json
└── src/
    └── App.alap
```

---

## কোড লেখা: `src/App.alap`

একটি সাধারণ কাউন্টার ও নোটস অ্যাপ্লিকেশন লিখুন:

```rust
component App() {
    state counter = 0
    state status = "রেডি"

    fn increment() {
        counter = counter + 1
        status = "কাউন্টার আপডেট করা হয়েছে"
    }

    view {
        <Window title="My Notes App" width={700} height={500}>
            <Header 
                title="onuronOS নোটপ্যাড" 
                subtitle="alap-framework দ্বারা চালিত" 
            />

            <Container padding={24}>
                <Card>
                    <Text size="large">বর্তমান গণনা: {counter}</Text>
                    <Text color="muted">স্ট্যাটাস: {status}</Text>
                    
                    <Button variant="primary" onClick={increment}>
                        গণনা বাড়ান (+)
                    </Button>
                </Card>
            </Container>
        </Window>
    }
}
```

---

## অ্যাপ চালানো ও লাইভ প্রিভিউ

```bash
alap dev
```
ডেভেলপমেন্ট মোডে হট-মডিউল রিলোড (HMR) সক্রিয় থাকবে, যার ফলে কোনো ফাইল সেভ করলেই পরিবর্তনটি নিমেষেই উইন্ডোতে প্রতিফলিত হবে।

---

## প্রোডাকশন প্যাকেজ তৈরি (`.onp`)

onuronOS এ রান এবং App Store এ সাবমিট করার জন্য অ্যাপটি বিল্ড ও প্যাকেজ করুন:

```bash
alap build --release
alap pack
```
উৎপন্ন ফাইল: `dist/my-notes-app.onp` যা আপনি সরাসরি App Store এ আপলোড করতে পারেন।
