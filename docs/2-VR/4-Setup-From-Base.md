---
sidebar_position: 4

title: شروع پروژه از صفر
---

# راهنمای جامع ایجاد پروژه VR در Unity

:::info آموزش مرجع
آموزش کامل این بخش در [لینک رسمی Unity](https://learn.unity.com/tutorial/create-a-vr-starter-project-from-scratch) قابل مشاهده است.
:::

## مرحله ۱: ایجاد پروژه URP

### تنظیمات اولیه پروژه

1. در **Unity Hub** روی **"New Project"** کلیک کنید
2. **Unity Version** را روی `2022.3.x` (آخرین LTS) تنظیم کنید
3. از لیست Template‌ها، **"3D (URP)"** را انتخاب کنید

:::tip چرا URP؟
Universal Render Pipeline (URP) برای VR بهینه‌سازی شده و عملکرد بهتری نسبت به Built-in Render Pipeline دارد.
:::

4. نام پروژه را وارد کنید (مثال: `MyVRProject`)
5. مسیر ذخیره‌سازی را انتخاب کنید
6. روی **"Create Project"** کلیک کنید

### تأیید نصب صحیح URP

پس از بارگذاری پروژه، برای بررسی صحت تنظیمات:

- `Edit > Project Settings > Graphics` را باز کنید
- در قسمت **Scriptable Render Pipeline Settings** باید **"UniversalRenderPipelineAsset"** نمایش داده شود

## مرحله ۲: ایجاد صحنه VR

### ساخت صحنه جدید

1. `File > New Scene` را انتخاب کنید
2. **"Basic (URP)"** Template را انتخاب کنید
3. `Ctrl + S` را فشار داده و صحنه را با نام `VRScene` در مسیر `Assets/Scenes` ذخیره کنید

### پیکربندی صحنه

:::warning حذف Main Camera
**حتماً** Main Camera موجود در Hierarchy را حذف کنید زیرا XR Origin دوربین اختصاصی خودش را دارد.
:::

- **Directional Light** را نگه دارید برای نورپردازی مناسب
- در صورت عدم وجود: `GameObject > Light > Directional Light`

## مرحله ۳: نصب پکیج‌های XR

### نصب XR Plugin Management

1. `Window > Package Manager` را باز کنید
2. در قسمت بالا **"Unity Registry"** را انتخاب کنید
3. **"XR Plugin Management"** را جستجو و Install کنید

### نصب پلاگین‌های هدست

بسته به هدست مورد استفاده، پکیج مناسب را نصب کنید:

| هدست                  | پکیج مورد نیاز         |
| --------------------- | ---------------------- |
| **Oculus/Meta Quest** | Oculus XR Plugin       |
| **HTC Vive/Index**    | OpenXR Plugin          |
| **تست بدون هدست**     | XR Device Simulator ⭐ |

### فعال‌سازی پلاگین

1. `Edit > Project Settings > XR Plug-in Management` را باز کنید
2. در تب **"PC, Mac & Linux Standalone"** پلاگین مربوطه را تیک بزنید

![تنظیمات XR Plugin Management](./img/4-setup-from-scratch-1.avif)

## مرحله ۴: نصب XR Interaction Toolkit

### نصب پکیج اصلی

1. در Package Manager، **"XR Interaction Toolkit"** را جستجو و Install کنید
2. این ابزار شامل قابلیت‌های زیر است:
   - تعامل با اشیاء (Object Interaction)
   - سیستم Grab و Teleport
   - رابط کاربری VR (UI Interaction)

### Import نمونه‌ها

پس از نصب، در Package Manager روی "XR Interaction Toolkit" کلیک کنید:

#### Sample‌های ضروری:

- ✅ **Starter Assets**
- ✅ **Default Input Actions**
- ✅ **XR Device Simulator**

#### Sample‌های اختیاری:

- 🔄 **Hands Interaction Demo**

:::caution تغییر Input System
ممکن است پیغام تغییر Input System نمایش داده شود. **"Yes"** را انتخاب کنید و اجازه دهید Unity مجدداً راه‌اندازی شود.
:::

## مرحله ۵: تنظیم XR Origin

### افزودن به صحنه

1. **Main Camera** موجود را از Hierarchy حذف کنید
2. کلیک راست در Hierarchy > `XR > XR Origin (Action-based)`

XR Origin شامل اجزای زیر است:

- سیستم ردیابی (Tracking System)
- کنترلرهای چپ و راست
- دوربین VR (Camera Offset)

### تنظیم کنترلرها

#### مرحله ۱: تنظیم فیلترها

- **XRI Default Right Controller**: فیلتر = `Right`
- **XRI Default Left Controller**: فیلتر = `Left`

#### مرحله ۲: اعمال Presets

مسیر: `Samples > XR Interaction Toolkit > [version] > Starter Assets`

برای هر **default action preset**:

1. آن را انتخاب کنید
2. در Inspector روی **"Add to [component] Default"** کلیک کنید

![تنظیم Action Presets](./img/4-setup-from-scratch-3.avif)

### پیکربندی Input Actions

1. **XR Origin** را انتخاب کنید
2. در Inspector، قسمت **"Input Action Manager"** را پیدا کنید
3. در **"Action Assets"** روی دایره کوچک کلیک کنید
4. **"XRI Default Input Actions"** را انتخاب کنید
5. برای هر کنترلر (Left و Right) تمام Action ها را تخصیص دهید

![تنظیم Input Actions](./img/4-setup-from-scratch-2.avif)

## مرحله ۶: Import Assets دوره

### دانلود و استخراج

1. فایل [Create-with-VR_Course-Library.zip](https://connect-prd-cdn.unity.com/20220610/d638c93b-31c9-4de8-ba2f-4074bab8f1e7/Create-with-VR_Course-Library.zip) را دانلود کنید
2. در مکان مناسب Extract کنید

### Import به پروژه

1. `Assets > Import Package > Custom Package`
2. فایل `.unitypackage` را انتخاب کنید
3. **"All"** را انتخاب کرده و **"Import"** کنید

### محتویات Import شده

پس از Import شامل پوشه‌های زیر خواهد بود:

| پوشه          | محتوا            |
| ------------- | ---------------- |
| **Materials** | متریال‌های آماده |
| **Models**    | مدل‌های سه‌بعدی  |
| **Prefabs**   | آبجکت‌های آماده  |
| **Scripts**   | اسکریپت‌های مفید |
| **Scenes**    | صحنه‌های نمونه   |

## مرحله ۷: تست با XR Device Simulator

### راه‌اندازی Simulator

1. از مسیر `Assets/Samples/XR Interaction Toolkit/2.6.4/XR Device Simulator`
2. آبجکت **XR Device Simulator** را به صحنه بکشید

### پیکربندی Camera Transform

:::important تنظیم مهم

1. روی **XR Device Simulator** کلیک کنید
2. قسمت **Simulator Settings** را در Inspector باز کنید
3. از `XR Origin > Camera Offset > Main Camera` را Drag کرده و در **Camera Transform** قرار دهید
   :::

### کنترل‌های Simulator

پس از اجرای برنامه:

- **حرکت**: Mouse + Keyboard
- **کنترل دست‌ها**: راهنمای کامل در سمت چپ صفحه
- **مستندات**: PDF موجود در ابتدای آموزش

## رفع مشکلات رایج

### مشکل عدم حرکت در صحنه

در صورت بروز مشکل:

1. `Edit > Project Settings` را باز کنید
2. به **XR Plug-in Management** بروید
3. روی **OpenXR** کلیک کنید تا فعال شود

### تنظیمات OpenXR

مسیر: `XR Plug-in Management > OpenXR`

**تنظیمات صحیح:**

- ✅ **Enabled Interaction Profiles**: خالی باشد
- ✅ فقط **Mock Runtime** فعال
- ✅ فقط **XR Performance Settings** فعال
- ❌ سایر گزینه‌ها غیرفعال

---

:::tip نکته مهم
این راهنما بر اساس Unity 2022.3 LTS تنظیم شده است. نسخه‌های جدیدتر ممکن است تغییرات جزئی داشته باشند.
:::
