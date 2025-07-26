---
sidebar_position: 10

title: Sockets
---

# راهنمای Sockets در Unity

این آموزش را می‌توان در [این لینک](https://learn.unity.com/pathway/vr-development/unit/vr-basics/tutorial/sockets-g?version=2022.3) مشاهده کرد.

---

## ایجاد socket برای نگهداری اشیاء

Socket ها مکان‌های خاصی هستند که اشیاء می‌توانند در آن‌ها قرار گیرند و ثابت بمانند. برای ایجاد socket، **XR Socket Interactor** component را به یک Empty GameObject اضافه کنید. موقعیت و چرخش socket را دقیق تنظیم کنید تا object به درستی در آن قرار گیرد. Interaction Layer Mask را تنظیم کنید تا فقط اشیاء مشخصی بتوانند در socket قرار گیرند. Socket Active و Show Interactable Hover Meshes را برای visual feedback فعال کنید. Starting Selected Interactable برای تعیین object پیش‌فرض socket استفاده کنید.

---

## سفارشی‌سازی المان‌های بصری socket

برای بهبود تجربه کاربر، visual indicator برای socket ایجاد کنید. یک material یا particle effect برای نشان دادن موقعیت socket اضافه کنید. **Hover Mesh** و **Socket Mesh** را تنظیم کنید تا نشان دهند object کجا قرار خواهد گرفت. Color coding برای انواع مختلف socket ها استفاده کنید. Animation یا glow effect هنگام hover کردن object روی socket اضافه کنید. Outline shader برای highlight کردن socket های فعال استفاده کنید.

---

## پیکربندی تعاملات socket

Socket Interaction Events را تنظیم کنید تا رفتارهای مختلف را کنترل کنید. **Socket Snapping** را فعال کنید تا object ها به موقعیت دقیق socket بروند. Recycle Delay Time را تنظیم کنید تا مشخص کنید object چه مدت در socket باقی بماند. Socket Selection Policy را برای تعیین نحوه انتخاب object در socket تنظیم کنید. Hover Socket Snapping برای snap کردن موقت هنگام hover فعال کنید. Force Grab را برای کنترل نحوه گرفتن object از socket تنظیم کنید.

---

## اضافه کردن اعتبارسنجی object

برای کنترل این که کدام object ها می‌توانند در socket قرار گیرند، **Socket Filter** یا Custom Validation استفاده کنید. Tag-based filtering برای محدود کردن object ها به tag های خاص پیاده‌سازی کنید. Size validation برای اطمینان از اندازه مناسب object اضافه کنید. Shape matching algorithm برای بررسی تطابق شکل object با socket استفاده کنید. Script-based validation برای منطق پیچیده‌تر نوشته کنید. Error feedback برای نمایش دلیل عدم پذیرش object در socket ارائه دهید.

---

## ایجاد انواع خاص socket

انواع مختلف socket برای کاربردهای متفاوت ایجاد کنید. **Key Socket** برای قرار دادن کلید در قفل پیاده‌سازی کنید. Tool Socket برای نگهداری ابزارها در جعبه ابزار ایجاد کنید. Weapon Socket برای mounting سلاح‌ها روی wall rack استفاده کنید. Battery Socket برای قرار دادن باتری در دستگاه‌ها ایجاد کنید. Puzzle Socket برای puzzle piece ها و mini-game ها استفاده کنید. Each socket type باید validation و behavior مخصوص خود را داشته باشد.

---

## پیاده‌سازی سیستم‌های بازخورد socket

سیستم‌های مختلف feedback برای بهبود تجربه کاربر اضافه کنید. **Audio Feedback** برای صدای snap کردن object در socket پیاده‌سازی کنید. Haptic Feedback برای لرزش controller هنگام قرار گرفتن object در socket اضافه کنید. Visual Animation برای smooth transition object به موقعیت socket ایجاد کنید. Particle Effects برای جلوه‌های visual هنگام successful socket operation استفاده کنید. UI Notifications برای اطلاع‌رسانی موفقیت یا شکست عملیات نمایش دهید.

---

## بهینه‌سازی عملکرد socket ها

برای حفظ فریم ریت مناسب، socket ها را بهینه کنید. **Distance-based Activation** برای فعال کردن socket ها فقط در صورت نزدیکی object پیاده‌سازی کنید. LOD System برای socket visual effects بر اساس فاصله از player استفاده کنید. Object Pooling برای socket effects و particles به کار بگیرید. Raycast Optimization برای کاهش تعداد physics query ها اعمال کنید. Update Frequency را برای socket detection بر اساس نیاز تنظیم کنید. Memory Management برای جلوگیری از garbage collection مناسب پیاده‌سازی کنید.
