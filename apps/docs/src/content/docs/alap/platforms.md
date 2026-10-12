---
title: প্ল্যাটফর্ম অ্যাডাপ্টার ও C ABI
description: alap-framework-এর onuron/android/ios/linux/web টার্গেট এবং নেটিভ এমবেডিংয়ের C ABI।
---

alap একটি প্রকল্পকে portable **NABC bytecode**-এ কম্পাইল করে, তারপর সেটি একটি
**প্ল্যাটফর্ম অ্যাডাপ্টার**-এ দেয়। প্রতিটি single-target অ্যাডাপ্টার একই আকারের:

```go
adapter := pkg.New()
err := adapter.GenerateProject(outputDir, bytecode)
```

CLI `nil build <platform>` দিয়ে অ্যাডাপ্টার নির্বাচন করে।

---

## ১. টার্গেট টেবিল

| টার্গেট | প্যাকেজ | আউটপুট |
|---|---|---|
| `onuron` / `nilos` | `platform/onuron` | Onuron `.nilax` বান্ডল + native runtime hook |
| `android` | `platform/android` | Gradle প্রকল্প + JNI ব্রিজ |
| `ios` | `platform/ios` | Swift/Metal প্রকল্প |
| `linux` | `platform/linux` | AppImage/Flatpak-শৈলীর ডেস্কটপ বান্ডল |
| `web` | `platform/web` | Web হোস্ট বান্ডল |

---

## ২. Onuron (`platform/onuron`)

সবচেয়ে সমৃদ্ধ অ্যাডাপ্টার — একটি লাইভ Onuron হোস্ট চালায় ও বান্ডল তৈরি করে:

```go
a := onuron.New()
_ = a.Init()
_ = a.CreateWindow("My App", 1080, 1920)

if a.CheckCapability("storage.read") {
    _ = a.SendNotification("Alap", "running")
}

sensors, _ := a.ReadSensorData(1)
_ = a.DispatchTouchEvent(120, 340)
frame, _ := a.RenderCurrentFrame()
_ = a.RunApp("build/my-app.nilax")

_ = a.GenerateProject("out/onuron", bytecode)
a.Shutdown()
```

উপ-প্যাকেজ:

| প্যাকেজ | দায়িত্ব |
|---|---|
| `platform/onuron/nilhal` | হার্ডওয়্যার অ্যাবস্ট্রাকশন (sensors, display, touch, audio, power) |
| `platform/onuron/nilui` | `engine.UITree` → Onuron surface রেন্ডার |
| `platform/onuron/nilbus` | Onuron মেসেজ বাস IPC ক্লায়েন্ট |

---

## ৩. Android (`platform/android`)

```bash
nil build android
```

Gradle প্রকল্প (Java/Kotlin host, JNI/NDK glue, `assets/`-এ bytecode+resources,
Android manifest) তৈরি করে। হোস্ট C ABI দিয়ে bytecode লোড করে ও `alap.yaml`-এর
permissions মানে।

---

## ৪. iOS (`platform/ios`)

```bash
nil build ios
```

Swift/Metal view hierarchy + embedded bytecode + C ABI bridging header তৈরি করে।
ডিভাইসে পরীক্ষিত নয়।

---

## ৫. Linux (`platform/linux`)

```bash
nil build linux
```

AppDir + launcher ডেস্কটপ বান্ডল (AppImage/Flatpak-শৈলী), Wayland বা X11 টার্গেট।

---

## ৬. Web (`platform/web`)

একটি web host বান্ডল তৈরি করে; runtime লজিক `web/*`-এ
([ওয়েব ফ্রেমওয়ার্ক](/alap/web-framework/))।

---

## ৭. C ABI (সব native টার্গেট)

```c
NilContext ctx = nilx_runtime_create();
NilResult  r   = nilx_runtime_run(ctx, bytecode, size);
if (!r.ok) { /* r.err.message */ }

bool handled = nilx_runtime_dispatch_touch(ctx, x, y);
char *json   = nilx_runtime_get_ui_json(ctx);
/* ... */
nilx_runtime_destroy(ctx);
```

Go দিক integer handle C মেমরিতে box করে, যাতে কখনো `uintptr` → `unsafe.Pointer`
রূপান্তর না লাগে।

---

## ৮. পরিপক্বতা (সৎভাবে)

| অ্যাডাপ্টার | পরিপক্বতা |
|---|---|
| Onuron | Functional prototype (host simulation) |
| Android | Project generator + JNI bridge (buildable, store-ready নয়) |
| iOS | Project generator (ডিভাইসে পরীক্ষিত নয়) |
| Linux | Project generator (রিলিজের জন্য প্যাকেজড নয়) |
| Web | Functional (routing/middleware/SSR) |

হার্ডওয়্যার ব্যাকএন্ড **production-ready নয়**। বিস্তারিত:
`alap-framework/docs/PLATFORMS.md`।
