---
sidebar_position: 8

title: جا به جایی (Locomotion)
---

# راهنمای VR Locomotion در Unity

این آموزش را می‌توانید در [این لینک](https://learn.unity.com/pathway/vr-development/unit/vr-basics/tutorial/vr-locomotion?version=2022.3) مشاهده کنید.

---

## پر کردن اتاق با مبلمان

در این مرحله، محیط VR خود را با اشیاء مختلف پر می‌کنیم تا فضای واقعی‌تری ایجاد شود. مبلمان و اشیاء مختلف کمک می‌کنند تا کاربر بتواند spatial awareness بهتری داشته باشد و locomotion system را بهتر تست کند. اشیاء مختلف مثل میز، صندلی، کتابخانه و... را در صحنه قرار دهید. مطمئن شوید که collider های مناسبی برای این اشیاء تنظیم شده تا با locomotion system تداخل نداشته باشند.

---

## اضافه کردن قابلیت چرخش گام‌به‌گام

Snap turning روشی برای چرخش در VR است که motion sickness را کاهش می‌دهد. برای پیاده‌سازی این قابلیت، **Snap Turn Provider** را به Locomotion System اضافه کنید. در تنظیمات این component، Turn Amount را روی 30 یا 45 درجه تنظیم کنید. سپس در Input Action Asset، action مربوط به چرخش را به Right Hand Controller bind کنید. معمولاً از Primary 2D Axis (thumbstick یا trackpad) برای این منظور استفاده می‌شود. Debounce Time را تنظیم کنید تا بین هر چرخش فاصله زمانی مناسبی وجود داشته باشد.

---

## ایجاد منطقه تله‌پورت روی فرش

Teleportation Area نواحی هستند که کاربر می‌تواند به هر نقطه‌ای از آن‌ها تله‌پورت کند. یک فرش یا سطح مناسب انتخاب کنید و **Teleportation Area** component را به آن اضافه کنید. مطمئن شوید که این object دارای Collider است و isTrigger فعال است. در layer مناسبی قرار دهید که توسط Ray Interactor شناسایی شود. Match Orientation را تنظیم کنید تا مشخص کنید آیا جهت کاربر هنگام تله‌پورت تغییر کند یا خیر. Visual feedback مناسبی برای نشان دادن قابلیت تله‌پورت اضافه کنید.

---

## ایجاد نقاط ثابت تله‌پورت روی پادری‌ها

برخلاف Teleportation Area که اجازه تله‌پورت به هر نقطه را می‌دهد، **Teleportation Anchor** نقاط ثابت و از پیش تعریف شده برای تله‌پورت هستند. پادری‌ها یا نقاط خاصی در صحنه انتخاب کنید و Teleportation Anchor component را اضافه کنید. موقعیت دقیق تله‌پورت را با Teleport Anchor Transform تنظیم کنید. Match Orientation و Match Directional Input را بر اساس نیاز پروژه تنظیم کنید. این روش کنترل بیشتری روی مکان‌های قابل دسترس به کاربر می‌دهد.

---

## سفارشی‌سازی نشانگرهای تله‌پورت

Reticle ها visual feedback هایی هستند که نشان می‌دهند کاربر کجا تله‌پورت خواهد شد. در **XR Ray Interactor** تنظیمات Reticle را سفارشی کنید. Valid Reticle برای نواحی قابل تله‌پورت و Invalid Reticle برای نواحی غیرقابل تله‌پورت تنظیم کنید. می‌توانید از Prefab های مختلف، Material های متفاوت یا حتی انیمیشن برای reticle ها استفاده کنید. Ray Origin و Ray End Point را نیز تنظیم کنید تا ray مناسبی نمایش داده شود. Line Material و Line Width را برای بهبود visual feedback تنظیم کنید.

---

## جمع‌بندی

در این آموزش locomotion system کاملی برای VR پیاده‌سازی کردیم که شامل موارد زیر بود:

- **Room Setup**: پر کردن محیط با مبلمان برای تست بهتر
- **Snap Turning**: چرخش گام‌به‌گام برای کاهش motion sickness
- **Teleportation Areas**: نواحی قابل تله‌پورت با انعطاف‌پذیری بالا
- **Teleportation Anchors**: نقاط ثابت تله‌پورت برای کنترل دقیق‌تر
- **Visual Feedback**: سفارشی‌سازی reticle ها برای تجربه بهتر

این سیستم ترکیب مناسبی از راحتی و قابلیت کنترل برای کاربران VR فراهم می‌کند.
