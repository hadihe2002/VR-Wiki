---
sidebar_position: 16
title: خروجی گرفتن (Build)
---

# راهنمای جامع Build و Distribution در Unity VR

ساخت و توزیع پروژه‌های **واقعیت مجازی** نیازمند تنظیمات دقیق برای پلتفرم‌های مختلف و بهینه‌سازی‌های خاص VR است.

:::info مرجع رسمی
راهنمای کامل Unity برای Build و اشتراک‌گذاری: [Building and Sharing VR Projects](https://learn.unity.com/pathway/vr-development/unit/ergonomics-and-optimization/tutorial/3-4-building-and-sharing?version=2022.3)
:::

## تنظیمات بنیادی OpenXR

### پیکربندی XR Plugin Management

برای دسترسی به تنظیمات OpenXR:
**Edit > Project Settings > XR Plug-in Management > OpenXR**

#### **Interaction Profiles**

تنها پروفایل‌های مربوط به هدست هدف را فعال کنید:

| هدست                | پروفایل مورد نیاز               |
| ------------------- | ------------------------------- |
| **Meta Quest 2/3**  | Oculus Touch Controller Profile |
| **HTC Vive Series** | HTC Vive Controller Profile     |
| **Valve Index**     | Valve Index Controller Profile  |
| **Pico Series**     | Pico Controller Profile         |

#### **تنظیمات حیاتی**

- ✅ **Mock Runtime**: حتماً **غیرفعال** باشد
- ✅ **XR Device Simulator**: برای build نهایی **غیرفعال** کنید

:::warning هشدار مهم
فعال بودن Mock Runtime و XR Device Simulator در build نهایی باعث عدم عملکرد صحیح روی هدست واقعی خواهد شد.
:::

## تنظیمات Player Settings

### اطلاعات پروژه

**Player Settings** را از طریق **Edit > Project Settings > Player** باز کنید:

✓ Product Name: نام نمایشی اپلیکیشن
✓ Company Name: نام شرکت/سازنده  
✓ Version: شماره نسخه (مثال: 1.0.0)
✓ Default Icon: آیکون 512×512 پیکسل

### پیکربندی Android (Quest/Pico)

در تب **Android Settings**:

| تنظیم                    | مقدار توصیه‌شده             |
| ------------------------ | --------------------------- |
| **Configuration**        | Release                     |
| **Scripting Backend**    | IL2CPP                      |
| **Target Architectures** | ✅ ARM64 فقط                |
| **Minimum API Level**    | API Level 29 (Android 10)   |
| **Target API Level**     | Automatic (Highest)         |
| **Bundle Identifier**    | com.companyname.productname |

### پیکربندی Windows (PC VR)

در تب **PC, Mac & Linux Standalone**:

Architecture: x86_64
Configuration: Master  
Scripting Backend: Mono
API Compatibility: .NET Framework

### پیکربندی WebGL (Browser VR)

در تب **WebGL Settings**:

| تنظیم                  | مقدار           |
| ---------------------- | --------------- |
| **Memory Size**        | 2048 MB (حداقل) |
| **Compression Format** | Gzip (پیش‌فرض)  |
| **Exception Support**  | None            |
| **Code Optimization**  | Speed           |
| **Managed Stripping**  | Medium          |

## تنظیمات Quality برای پلتفرم‌ها

**Edit > Project Settings > Quality** را باز کنید:

### Android/Quest Optimization

Quality Level: Medium/Low
Texture Quality: Half Res
Anti Aliasing: 2x Multi Sampling
Shadow Resolution: Medium Shadows

### PC VR Settings

Quality Level: High/Ultra
Texture Quality: Full Res  
Anti Aliasing: 4x Multi Sampling
Shadow Resolution: High Shadows

### WebGL Performance

Quality Level: Low/Medium
Texture Quality: Half Res
Anti Aliasing: Disabled یا 2x
Shadow Resolution: Disable Shadows

![Build Settings Configuration](./img/16-Build-2.png)

## نصب و پیکربندی WebXR

### نصب WebXR Export Package

برای اجرای VR در مرورگر، باید **WebXR Export** را نصب کنید:

#### مراحل نصب:

1. **Edit > Project Settings > Package Manager** باز کنید
2. **Scoped Registry** جدید اضافه کنید:

- Name: OpenUPM
- URL: https://package.openupm.com
- Scope(s): com.de-panther

3. **Window > Package Manager** باز کنید
4. **Packages: My Registries** انتخاب کنید
5. **WebXR Export** را پیدا کرده و Install کنید

#### تنظیم WebGL Template:

- **Window > WebXR > Copy WebGLTemplates** را اجرا کنید
- در **Player Settings > WebGL**: Template را **WebXR2020** تنظیم کنید

:::tip نکته WebXR
برای تست بدون هدست، می‌توانید Mock Runtime و XR Device Simulator را فعال نگه دارید و با موس/کیبورد صحنه را کنترل کنید.
:::

:::warning پیش‌نیاز WebXR برای Chrome
برای اجرای WebXR در مرورگر Chrome، باید **Chrome Canary** یا **Chrome Beta** را دانلود کنید و **WebXR Device API** را در experimental features فعال کنید. مرورگر معمولی Chrome این قابلیت را به‌طور پیش‌فرض پشتیبانی نمی‌کند.
:::

## فرآیند Build

### انتخاب Platform

**File > Build Settings** باز کنید و پلتفرم مناسب را انتخاب کنید:

| پلتفرم      | کاربرد                         |
| ----------- | ------------------------------ |
| **Android** | Quest 2/3, Pico, VIVE XR Elite |
| **Windows** | PC VR (Rift, Vive, Index, WMR) |
| **WebGL**   | مرورگر با پشتیبانی WebXR       |

### Switch Platform

اگر پلتفرم فعلی متفاوت است:

1. **Switch Platform** کلیک کنید
2. منتظر re-import کامل assets بمانید
3. تنظیمات مخصوص پلتفرم را اعمال کنید

### تنظیمات نهایی Build

- ✓ Development Build: فقط برای debug
- ✓ Compression Method: بر اساس پلتفرم
- ✓ Architecture: مطابق تنظیمات Player

![Build Platform Selection](./img/16-Build-1.png)

:::note یادداشت مهم
همواره build تست را روی دستگاه هدف انجام دهید. تنظیمات Editor با عملکرد واقعی متفاوت است.
:::

## بهینه‌سازی Build Size

### کاهش حجم Assets

- **Texture Compression**: فعال کنید
- **Audio Compression**: MP3/Vorbis استفاده کنید
- **Unused Assets**: حذف کنید
- **Code Stripping**: Medium/High تنظیم کنید

### تنظیمات پیشرفته

```csharp
// در PlayerSettings از کد:
PlayerSettings.stripUnusedMeshComponents = true;
PlayerSettings.stripEngineCode = true;
```
