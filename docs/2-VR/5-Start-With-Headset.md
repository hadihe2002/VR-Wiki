---
sidebar_position: 5

title: راه‌اندازی و شروع کار با هدست
---

# راهنمای جامع تنظیم VR برای HTC Vive Pro 2

## بخش ۱: مدیریت پروژه با Git

### راه‌اندازی Repository محلی

#### مراحل اولیه Git

1. **نصب Git** روی سیستم
2. باز کردن ترمینال در پوشه پروژه Unity (یا از طریق VS Code)
3. اجرای دستورات پایه:

```bash
git init
git add .
git commit -m "Initial VR project setup"
```

#### اتصال به GitHub

```bash
git remote add origin [URL مخزن شما]
git push -u origin master
```

### تنظیمات .gitignore

:::warning نکته بحرانی
**حتماً** فایل `.gitignore` مخصوص Unity را از [gitignore.io](https://www.toptal.com/developers/gitignore/api/unity) دانلود کنید و در root پروژه قرار دهید.
:::

#### مزایای استفاده از .gitignore:

- حذف فایل‌های غیرضروری (`Library`، `Temp`)
- کاهش حجم از **~2 GB** به **~100 MB**
- بازسازی خودکار فایل‌های حذف شده هنگام باز کردن پروژه

#### دستورات مدیریت تغییرات

```bash
git add .
git commit -m "توضیح تغییرات"
git push
```

## بخش ۲: نصب پروژه در آزمایشگاه

### کلون کردن پروژه

#### مراحل دانلود

1. باز کردن VS Code یا Terminal در درایو مطلوب (ترجیحاً **Drive D**)
2. اجرای دستور:

```bash
git clone [URL مخزن شما]
```

### افزودن به Unity Hub

1. باز کردن **Unity Hub**
2. انتخاب **"Add project from disk"**
3. انتخاب پوشه کلون شده
4. باز کردن پروژه در Unity

:::caution پیش‌نیاز شبکه
**حتماً فیلترشکن روشن باشد** تا Package‌ها بدون خطا دانلود شوند.
:::

### رفع مشکلات Package

در صورت بروز خطا:

1. `Window > Package Manager` را باز کنید
2. Package‌های زیر را مجدداً نصب کنید:
   - **XR Plugin Management**
   - **XR Interaction Toolkit**
   - **OpenXR Plugin**

## بخش ۳: پیکربندی OpenXR

### فعال‌سازی OpenXR

**مسیر**: `Edit > Project Settings > XR Plug-in Management`

1. اطمینان از فعال بودن **OpenXR**
2. ورود به بخش **OpenXR Settings**

### تنظیم Interaction Profiles

در بخش **Interaction Profiles**:

1. کلیک روی **"+"**
2. انتخاب **"HTC Vive Controller Profile"**
3. تنظیم **Runtime Selection** روی **"System Default"**

![تنظیمات OpenXR](./img/5-Start-With-Heaset-1.avif)

### جدول Interaction Profiles

| هدست               | Interaction Profile مورد نیاز   |
| ------------------ | ------------------------------- |
| **HTC Vive Pro 2** | HTC Vive Controller Profile     |
| **Valve Index**    | Valve Index Controller Profile  |
| **Oculus/Meta**    | Oculus Touch Controller Profile |

## بخش ۴: تنظیمات SteamVR

### غیرفعال‌سازی Mock Runtime

در **OpenXR Settings**:

- ❌ **Mock Runtime** را غیرفعال کنید
- ❌ **Mock HMD** را غیرفعال کنید
- ❌ **XR Device Simulator** را در صحنه غیرفعال کنید

:::info دلیل غیرفعال‌سازی
این گزینه‌ها فقط برای شبیه‌سازی بدون هدست استفاده می‌شوند.
:::

### راه‌اندازی SteamVR

#### مراحل تنظیم:

1. **نصب و به‌روزرسانی SteamVR**
2. **اجرای SteamVR**
3. **اتصال هدست HTC Vive Pro 2**

#### تنظیمات OpenXR در SteamVR:

**مسیر**: `SteamVR Settings > Developer`

- ✅ **"Enable OpenXR"** را فعال کنید
- ✅ **"Set SteamVR as OpenXR Runtime"** را کلیک کنید

#### Room Setup

:::warning الزامی
**حتماً Room Setup را تکمیل کنید** تا سیستم Tracking به درستی کار کند.
:::

### رفع مشکلات SteamVR

در صورت عدم کارکرد:

1. **راه‌اندازی مجدد SteamVR**
2. **خاموش/روشن کردن هدست**
3. **بررسی اتصالات USB و DisplayPort**
4. **بازنشانی Room Setup**

## بخش ۵: مدیریت تغییرات میان محیط‌ها

### فایل‌های قابل هماهنگ‌سازی

| نوع فایل                | وضعیت هماهنگ‌سازی            |
| ----------------------- | ---------------------------- |
| **Scene‌ها**            | ✅ قابل sync                 |
| **Prefab‌ها**           | ✅ قابل sync                 |
| **Script‌ها**           | ✅ قابل sync                 |
| **Input Action Assets** | ✅ قابل sync                 |
| **XR Plugin Settings**  | ❌ محلی - نیاز به تنظیم مجدد |

### Checklist تنظیمات محیط

قبل از تست پروژه در هر محیط:

#### محیط شخصی (Development):

- ✅ **XR Device Simulator** فعال
- ✅ **Mock Runtime** فعال
- ❌ **Interaction Profiles** غیرضروری

#### محیط آزمایشگاه (Production):

- ❌ **XR Device Simulator** غیرفعال
- ❌ **Mock Runtime** غیرفعال
- ✅ **HTC Vive Controller Profile** فعال
- ✅ **SteamVR Runtime** تنظیم شده

### روند کاری پیشنهادی

#### در محیط Development:

```bash
git add .
git commit -m "Feature: [توضیح تغییرات]"
git push origin master
```

#### در محیط Production:

```bash
git pull origin master
# اعمال تنظیمات XR مطابق Checklist
# تست پروژه با هدست
```
