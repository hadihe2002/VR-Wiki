---
sidebar_position: 13

title: نحوه‌ی تعامل با اشیا (Direct & Ray Interactors)
---

# راهنمای تعامل‌گرهای مستقیم و پرتویی در Unity

- این آموزش را در [این لینک](https://learn.unity.com/pathway/vr-development/unit/events-and-interactions/tutorial/2-3-direct-and-ray-interactors?version=2022.3) مشاهده کنید.
- توصیه می‌شود تا این آموزش را از داخل سایت Unity به صورت ویدیویی پیش ببرید. راه حل چالش‌های این بخش را می‌توانید در [این کانال یوتیوب](https://www.youtube.com/@garlicsuter) مشاهده کنید.

## درک انواع Interactor ها

### آشنایی با Direct و Ray Interactor

- XR Interaction Toolkit دو نوع اصلی interactor ارائه می‌دهد. **XR Direct Interactor** برای تعامل نزدیک و لمسی object ها استفاده می‌شود، مانند گرفتن جسم با دست. **XR Ray Interactor** برای تعامل از راه دور با پرتاب پرتو استفاده می‌شود، مشابه laser pointer. هر کدام Collider مخصوص خود دارند - Direct از Sphere Collider و Ray از Raycast استفاده می‌کند. این دو می‌توانند همزمان روی یک controller فعال باشند و priority مختلف داشته باشند.

## پیکربندی Direct Interactor

### تنظیم تعامل‌گر مستقیم

- Direct Interactor برای grab کردن object هایی که در دسترس فیزیکی قرار دارند طراحی شده است. **Attach Transform** موقعیت و چرخش object گرفته شده را نسبت به controller تعیین می‌کند. Collider Detection برای شناسایی object های قابل grab در محدوده دست استفاده می‌شود. **Selection Filtering** برای محدود کردن object هایی که قابل grab هستند پیاده‌سازی کنید. Force Grab برای کشیدن object از فاصله کم به دست فعال کنید. Hand Pose matching برای تطبیق دست با شکل object گرفته شده تنظیم کنید.

## تنظیم Ray Interactor

### پیکربندی تعامل‌گر پرتویی

- Ray Interactor امکان تعامل از راه دور را فراهم می‌کند. **Line Renderer** برای نمایش visual ray که از controller خارج می‌شود استفاده کنید. Ray Length برای تعیین حداکثر فاصله تعامل تنظیم کنید. **Hit Detection** برای شناسایی object های قابل تعامل در مسیر ray پیاده‌سازی کنید. Curve Line Renderer برای ray خمیده که با فیزیک جهان سازگار است استفاده کنید. Visual Feedback مثل reticle یا highlighting هنگام hover روی object اضافه کنید.

## مدیریت تداخل Interactor ها

### حل تعارض بین Direct و Ray

- زمانی که هر دو interactor فعال هستند، نیاز به مدیریت priority دارید. **Interaction Layer Mask** برای تعیین کدام object ها با کدام interactor تعامل داشته باشند استفاده کنید. Selection Priority برای تعیین اولویت Direct نسبت به Ray یا برعکس تنظیم کنید. **Distance-based Switching** برای خودکار تغییر بین Direct و Ray بر اساس فاصله پیاده‌سازی کنید. Context-sensitive Activation برای فعال کردن interactor مناسب بر اساس نوع object یا situation استفاده کنید. Visual Indicator برای نمایش کدام interactor فعال است اضافه کنید.

## بهینه‌سازی Ray Casting

### کارایی مناسب برای Ray Detection

- Ray casting می‌تواند performance intensive باشد بنابراین بهینه‌سازی ضروری است. **Raycast Frequency** را کاهش دهید تا هر فریم ray cast نشود. Layer-based Filtering برای محدود کردن ray detection به layer های خاص استفاده کنید. **Max Distance Limitation** برای جلوگیری از ray casting غیرضروری در فواصل دور تنظیم کنید. Adaptive Quality برای کاهش ray resolution هنگام حرکت سریع controller پیاده‌سازی کنید. Object Culling برای حذف object های خارج از field of view از ray detection استفاده کنید.

## ایجاد Hybrid Interaction System

### ترکیب هوشمند Direct و Ray

- سیستم hybrid تجربه کاربری بهتری ارائه می‌دهد. **Automatic Mode Switching** بر اساس proximity به object ها پیاده‌سازی کنید. Gesture-based Activation برای تغییر بین mode ها با حرکت controller استفاده کنید. **Object-specific Interaction** برای استفاده از interactor مناسب بر اساس نوع object پیاده‌سازی کنید. Fallback Mechanism برای استفاده از Ray هنگامی که Direct ممکن نیست ایجاد کنید. Seamless Transition برای نرم بودن تغییر بین interaction mode ها تنظیم کنید.

## پیاده‌سازی Feedback سیستم‌ها

### بازخورد مناسب برای هر نوع تعامل

- هر interactor نیاز به feedback مخصوص خود دارد. **Haptic Feedback** متفاوت برای Direct grab و Ray selection پیاده‌سازی کنید. Visual Cues مثل glow effect برای object های hoverable اضافه کنید. **Audio Feedback** متمایز برای هر نوع interaction ایجاد کنید. Cursor Animation برای نمایش وضعیت ray interactor استفاده کنید. Progress Indicators برای action هایی که زمان می‌برند نمایش دهید. Error Feedback برای موقعیت‌هایی که تعامل ممکن نیست ارائه دهید.

<video   width="620" controls>
  <source  src="/13-Interactors.mp4" type="video/mp4" />
</video>
