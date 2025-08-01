---
sidebar_position: 5

title: راه اندازی و شروع کار با هدست
---

# راهنمای تنظیم VR برای HTC Vive Pro 2

## 1. مدیریت پروژه با Git و GitHub

### راه‌اندازی Git Repository

- ابتدا Git را روی سیستم خود نصب کنید و سپس در پوشه پروژه Unity خود ترمینال یا با کمک VS Code باز کنید. دستورات `git init` برای ایجاد repository محلی، `git add .` برای اضافه کردن تمام فایل‌ها و `git commit -m "Initial VR project setup"` برای اولین commit را اجرا کنید. سپس در GitHub یک repository جدید ایجاد کرده و با دستورات `git remote add origin [URL مخزن شما]` و `git push -u origin main` پروژه را آپلود کنید.

- ⚠️ **نکته خیلی خیلی مهم**: فایل `.gitignore` مخصوص Unity را از [gitignore.io](https://www.toptal.com/developers/gitignore/api/unity) دانلود کرده و در root پروژه قرار دهید تا فایل‌های غیرضروری مثل Library و Temp آپلود نشوند. همچنین پس از هر تغییر مهم با `git add .`، `git commit -m "توضیح تغییرات"` و `git push` تغییرات را ذخیره کنید. با این کار به جای جا به جایی حدود 2 گیگابایت فایل، 100 مگابایت فایل را روی github قرار می‌دهید و سایر بخش‌ها موقع اجرای پروژه دوباره به طور خودکار ایجاد می‌شوند.

## 2. دانلود و تنظیم پروژه در کامپیوتر دانشگاه

### کلون کردن پروژه از GitHub

- روی کامپیوتر آزمایشگاه، VsCode یا Terminal را پوشه‌ی دلخواه (ترجیحا drive D) باز کرده و با دستور `git clone [URL مخزن شما]` پروژه را دانلود کنید. سپس Unity Hub را باز کرده و "Add project from disk" را انتخاب کنید تا پوشه clone شده را به Unity Hub اضافه کنید. Unity را باز کنید و منتظر بمانید تا تمام Package ها دانلود و نصب شوند. حتما **فیلترشکن شما روشن باشد تا خطایی رخ ندهد.** ممکن است برخی خطاها نمایش داده شود که پس از تکمیل فرایند دانلود Package ها برطرف می‌شوند. در صورت مواجهه با خطاهای مربوط به Package ها، به Package Manager بروید و پکیج‌های مورد نیاز (XR Plugin Management، XR Interaction Toolkit و OpenXR Plugin) را دوباره نصب کنید.

## 3. تنظیم OpenXR برای HTC Vive Pro 2

### فعال‌سازی OpenXR و Interaction Profiles

- در کامپیوتر دانشگاه، به `Edit > Project Settings > XR Plug-in Management` بروید و اطمینان حاصل کنید که OpenXR فعال است. سپس به قسمت OpenXR رفته و در بخش **Interaction Profiles، HTC Vive Controller Profile** را اضافه کنید. این کار با کلیک روی "+" و انتخاب "HTC Vive Controller Profile" انجام می‌شود. Runtime Selection را روی "System Default" قرار دهید تا OpenXR بتواند بهترین runtime موجود (معمولاً SteamVR) را انتخاب کند.

  ![تصویر](./img/5-Start-With-Heaset-1.avif)

## 4. غیرفعال‌سازی Mock Runtime و فعال‌سازی SteamVR

### تنظیم Runtime برای هدست

- در قسمت OpenXR Settings، **Mock Runtime** و یا گزینه‌هایی مانند **Mock HMD را غیرفعال** کنید زیرا این گزینه فقط برای شبیه‌سازی بدون هدست استفاده می‌شود. **آبجکت XR Device Simulator در صحنه را غیر فعال کنید.** اطمینان حاصل کنید که SteamVR روی سیستم نصب و به‌روزرسانی شده است. SteamVR را اجرا کنید و هدست HTC Vive Pro 2 را وصل کنید. در SteamVR Settings به Developer بروید و "Enable OpenXR" را فعال کنید. همچنین در همین بخش "Set SteamVR as OpenXR Runtime" را کلیک کنید تا SteamVR به‌عنوان runtime اصلی OpenXR تنظیم شود. اگر Room Setup انجام نشده، حتماً آن را تکمیل کنید تا Tracking به درستی کار کند. گاهی ممکن است لازم باشد نرم افزار SteamVR را دوباره راه اندازی کنید و یا هدست را خاموش و روشن کنید**. رعایت نکردن هر کدام از این موارد باعث می‌شود برنامه به طور کامل کار نکند!**

## 5. مدیریت تغییرات بین محیط‌های مختلف

### هماهنگ‌سازی تنظیمات

-هر بار که تغییرات مهمی انجام می‌دهید، آن‌ها را commit کرده و به GitHub push کنید و دوباره آپدیت را در کامپیوتر شخصی خود pull بگیرید. هنگام کار بین کامپیوتر شخصی و دانشگاه، فایل‌های مهم که باید هماهنگ شوند عبارتند از: Scene ها، Prefab ها، Scripts و Input Action Assets. **تنظیمات مربوط به XR Plugin Management در ProjectSettings همیشه local هستند و نیاز به تنظیم مجدد دارند.** بنابراین یک checklist ایجاد کنید که شامل: فعال/غیرفعال کردن XR Device Simulator، تنظیم Mock Runtime، اضافه/حذف Interaction Profiles و تغییر Runtime Selection باشد.
