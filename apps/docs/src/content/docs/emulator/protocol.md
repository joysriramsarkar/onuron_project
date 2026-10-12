---
title: NilHost Protocol (v1)
description: এমুলেটর হোস্ট ও NilLang runtime worker-এর মধ্যে versioned JSON কনট্রাক্ট।
---

**NilHost Protocol** হলো এমুলেটর হোস্ট (`nilemu`) ও NilLang runtime worker ("VM")-এর
মধ্যবর্তী versioned, newline-delimited JSON চুক্তি। এমুলেটরে অ্যাপ-লজিক নেই — সে শুধু
ইভেন্ট পাঠায় ও ফ্রেম রেন্ডার করে।

- **Transport:** ডিফল্টে stdin/stdout পাইপ। `stdout` শুধু প্রোটোকল বার্তা বহন করে;
  সব `println`/debug আউটপুট `stderr` বা `log` বার্তায় যায়। (`Codec` transport-agnostic;
  loopback WebSocket ভবিষ্যতের।)
- **Framing:** প্রতি লাইনে একটি JSON অবজেক্ট (`\n`)।
- **Version:** `proto` একটি integer; host `proto: 1` বলে। mismatch হলে host পরিষ্কার
  এররে abort করে।
- **Capabilities:** VM `caps` ঘোষণা করে; host অজানা ফিচার উপেক্ষা করে graceful fallback করে।

---

## ১. হ্যান্ডশেক

VM প্রথমে `hello` পাঠায়:

```json
{"t":"hello","proto":1,"runtime":"nil 0.9.2","app":"com.nilang.notes","caps":["ui.tree.patch","hal.v1","debug.dap"]}
```

Host `init` দিয়ে উত্তর দেয় — এতে **সব** ডিভাইস তথ্য থাকে, যাতে VM কখনোscreen size ধরে না নেয়:

```json
{"t":"init","proto":1,
 "device":{"profile":"nilphone-ultra","w":390,"h":844,"dpr":3,
           "safe":{"t":47,"b":34,"l":0,"r":0},"refresh_hz":120,
           "orientation":"portrait","inputs":["touch","keyboard"]},
 "locale":"bn-BD","theme":"dark","font_scale":1,
 "hal":{"battery":{"level":80,"charging":false},"net":{"type":"wifi","online":true}},
 "permissions":["filesystem","printer"],
 "app_data":"/data/apps/com.nilang.notes/data",
 "saved_state":null}
```

ডিভাইস profile বদলাতে নতুন `init` (বা `config`) পাঠানো হয়।

---

## ২. Host → VM

| `t` | কাজ |
|---|---|
| `input` | touch/key/text/scroll/back/home। যেমন `{"t":"input","kind":"touch","phase":"down","id":0,"x":120.5,"y":300,"ts":183422}` |
| `ime` | input-method editor: `show`,`hide`,`commit`,`compose`,`delete` |
| `hal.event` | ডিভাইস পরিবর্তন, যেমন `{"t":"hal.event","dev":"battery","level":15}` |
| `lifecycle` | `create`,`start`,`resume`,`pause`,`stop`,`destroy` |
| `config` | rotation, theme, locale, font scale, size |
| `vsync` | frame credit / tick |
| `reload` | `restart` বা `reload` |
| `debug` | debugger command (breakpoint, step, continue …) |

---

## ৩. VM → Host

| `t` | কাজ |
|---|---|
| `frame` | পূর্ণ UI tree (প্রথম paint) |
| `patch` | tree diff অপারেশন |
| `hal.call` | ডিভাইস অনুরোধ: `{"t":"hal.call","id":42,"dev":"printer","op":"print","args":{...}}` |
| `bus` | NilBus বার্তা |
| `log` | `{"t":"log","level":"info","tag":"app","msg":"..."}` |
| `trace` | DevTools timing: frame ms, GC, bytecode |
| `state` | restart/restore-এর saved-state blob |
| `exit` | `{"t":"exit","code":0,"reason":"..."}` |
| `error` | `{"t":"error","code":"E_RUNTIME","msg":"...","stack":[...]}` |

প্রতিটি `hal.call`-এর উত্তর host অবশ্যই `hal.result` দেয়:

```json
{"t":"hal.result","id":42,"ok":true,"data":{"printed":6}}
```

---

## ৪. UI tree ও প্যাচ

```json
{"id":"root","type":"Column","props":{"gap":8,"padding":16},
 "children":[
   {"id":"title","type":"Text","props":{"text":"নতুন নোট","style":"title"}},
   {"id":"save","type":"Button","props":{"label":"সংরক্ষণ","onTap":"h:42"}}
 ]}
```

- Node `id` **রেন্ডার জুড়ে স্থিতিশীল** — না হলে diff/animation অসম্ভব।
- ইভেন্ট হ্যান্ডলার **রেফারেন্স** (`"h:42"`), কখনো function নয়। tap-এ host
  `{"t":"input","kind":"tap","code":"h:42"}` পাঠায়।
- সব prop serializable; VM-অভ্যন্তরীণ কিছু VM-এ থাকে।

```json
{"t":"patch","ops":[
  {"op":"set","id":"title","prop":"text","value":"সংরক্ষিত"},
  {"op":"insert","parent":"root","index":2,"node":{}},
  {"op":"remove","id":"note.3"},
  {"op":"move","id":"note.1","parent":"root","index":0}
]}
```

diff করা runtime-এর দায়িত্ব; এমুলেটর শুধু প্যাচ প্রয়োগ করে।

---

## ৫. Backpressure ও frame pacing

Host display refresh rate-এ **frame credit** (`vsync`) দেয়। VM প্রতি credit-এ সর্বোচ্চ
একটি `patch` পাঠায় (মধ্যবর্তী পরিবর্তন coalesce করে)। ইনপুটও coalesce হয়: `touch`
`move` merge হয়, কিন্তু `down`/`up` কখনো drop হয় না।

---

## ৬. এরর ও ক্র্যাশ

VM ক্র্যাশ হলে clean `exit` ছাড়াও process exit দিয়ে শনাক্ত হয়; supervisor একটি
synthesized `exit` দেয় এবং frontend "App has stopped. Restart?" দেখায়।

---

## ৭. পরবর্তী পড়ুন

- [ভার্চুয়াল হার্ডওয়্যার](/emulator/hal/)
- [ডিবাগিং](/emulator/debugging/)
- রেফারেন্স: `nilos-emulator/docs/protocol.md`
