# README-FINAL — ویکی فشردهٔ «AR برای تازه‌کارها با Unity»
> این سند «نقشهٔ راه + فهرست جامع» کل ویکی است. تمرکز روی آموزش عمومیِ AR با Unity 2022 LTS و AR Foundation 5.x و اجرای آفلاین روی موبایل—بدون اشاره به هیچ اپلیکیشن/دامنهٔ خاص.

## 🎯 مخاطب و هدف
- **مخاطب:** دانشجویان/تازه‌کارها و تیم‌های کوچک.
- **هدف:** صفر تا اجرای یک نمونهٔ سادهٔ AR روی دستگاه واقعی، به‌همراه مباحث پایه تا بهینه‌سازی و عیب‌یابی.

## 🚀 شروع سریع (Quickstart)
1) **نصب ابزارها:** Unity Hub + Unity 2022 LTS (سری 2022.3.x)، Android Build Support (و iOS اختیاری).  
2) **پکیج‌ها:** از Package Manager نصب کنید → AR Foundation 5.x، ARCore XR Plugin (iOS اختیاری: ARKit XR Plugin)، XR Plugin Management، Input System، TextMeshPro.  
3) **پیکربندی XR:** Project Settings → XR Plugin Management → Android: ARCore (iOS اختیاری: ARKit).  
4) **صحنهٔ پایه:** AR Session + AR Session Origin (با AR Camera) + ARRaycast/Plane/Anchor Manager.  
5) **قراردهی شیء:** اسکریپت Tap→Raycast→Anchor (نمونهٔ کامل در فصل‌های 04–05).  
6) **بیلد موبایل:** Android: IL2CPP + ARM64، Scenes In Build اضافه، Build & Run. (iOS اختیاری: Build به Xcode).

## 🧭 فهرست فصل‌ها (به‌ترتیب پیشنهادی مطالعه)
1. [01-what-is-ar.md](01-what-is-ar.md) — AR چیست؟ مفاهیم پایه و تاریخچهٔ کوتاه  
2. [02-ar-use-cases.md](02-ar-use-cases.md) — کاربردها، الگوهای تعامل، KPI و ریسک‌ها  
3. [03-ar-building-blocks.md](03-ar-building-blocks.md) — آجرهای سازنده: Pose/Plane/Anchor/Raycast/Scale  
4. [04-unity-ar-foundation-basics.md](04-unity-ar-foundation-basics.md) — مقدمات Unity + AR Foundation 5.x  
5. [05-first-ar-scene.md](05-first-ar-scene.md) — ساخت اولین صحنهٔ AR (Reticle/Anchor/Placement)  
6. [06-android-ios-build.md](06-android-ios-build.md) — بیلد پایدار Android + نکات iOS  
7. [07-ar-ux-guidelines.md](07-ar-ux-guidelines.md) — اصول UX در AR + نکات RTL  
8. [08-data-and-persistence.md](08-data-and-persistence.md) — داده و ذخیره‌سازی آفلاین (JSON + مسیرهای محلی)  
9. [09-calibration-and-scale.md](09-calibration-and-scale.md) — کالیبراسیون و مقیاس واقعی  
10. [10-virtual-objects-and-labels.md](10-virtual-objects-and-labels.md) — اشیای مجازی سبک و برچسب‌ها  
11. [11-object-placement-basics.md](11-object-placement-basics.md) — اصول جای‌گذاری/هم‌ترازی و اعتبارسنجی  
12. [12-testing-and-logging.md](12-testing-and-logging.md) — تست، لاگ و معیارهای پذیرش  
13. [13-performance-optimization.md](13-performance-optimization.md) — بهینه‌سازی عملکرد روی موبایل  
14. [14-troubleshooting-and-faq.md](14-troubleshooting-and-faq.md) — عیب‌یابی و FAQ  
15. [15-glossary-and-references.md](15-glossary-and-references.md) — واژه‌نامه، تقلب‌نامه و منابع

## ✅ معیارهای پذیرش (چک‌لیست خلاصه)
- اجرای پایدار روی دستگاه واقعی (Android الزامی؛ iOS اختیاری)  
- کشف سطح، Reticle و قراردهی Anchor صحیح  
- نرخ فریم ۳۰+ روی گوشی‌های میان‌رده  
- UX خوانا (متن ≥16sp، لمس ≥44dp)، پشتیبانی RTL در صورت نیاز  
- داده و لاگ سبک (JSON/CSV) با Export  
- اجرای آفلاین کامل

## 🛠️ ساختار پیشنهادی پروژه (برای نمونه‌ها/تمرین‌ها)
```
Assets/
  Scripts/ (AR, UI, Data, Utils)
  Prefabs/ (Reticle, Placeable)
  Scenes/  (ARBasic, Tests)
  Fonts/   (TMP SDF)
  Materials/
  StreamingAssets/ (نمونه‌های JSON)
```

## 🔒 حریم خصوصی و ایمنی
- کمینه‌سازی دادهٔ ذخیره‌شده، پیام شفاف برای مجوز دوربین، هشدار ایمنی هنگام استفادهٔ در حال حرکت.

## 📦 پیش‌نیازهای نرم‌افزار
- Unity 2022 LTS (2022.3.x)  
- AR Foundation 5.x، ARCore XR Plugin (و ARKit اختیاری)  
- XR Plugin Management، Input System، TextMeshPro

## 🧪 تست و پروفایلینگ (خلاصه)
- دستگاه میان‌ردهٔ Android + یک دستگاه قوی‌تر (اختیاری iOS)  
- سناریوهای نور/بافت متنوع، Benchmark با Profiler/Logcat/Xcode  
- اهداف: FPS ۳۰–۶۰، دقت مقیاس ≤ ۳٪ (در صورت کالیبراسیون)

## 📝 سبک نگارش و ساختار
- فارسی‌محور، کمینه‌سازی اصطلاحات انگلیسی در متن، کدها انگلیسی.  
- نمودارهای Mermaid، جدول‌ها، و Snippetهای C# کوتاه و قابل استفاده.

## 📄 مجوز / مشارکت
- (جای خالی برای روند انتشار یا مجوز کلاس/پروژه)  
- Pull Request/Issue: پیشنهاد اصلاح، نمونهٔ کد یا بهبود فصل‌ها

---

### نسخه‌بندی و تغییرات
- **ویکی 1.0** — تکمیل ۱۵ فصل عمومی، بهینه‌سازی متن برای مبتدی‌ها، بدون اشاره به اپ خاص.

