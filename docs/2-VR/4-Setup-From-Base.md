---
sidebar_position: 4

title: شروع پروژه از صفر
---

# راهنمای ایجاد پروژه VR از ابتدا در Unity

- این آموزش را می‌توانید در این [لینک](https://learn.unity.com/tutorial/create-a-vr-starter-project-from-scratch) مشاهده کنید.

## 1. ایجاد پروژه URP جدید

- در Unity Hub روی "New Project" کلیک کنید و Unity Version را روی 2022.3.x تنظیم کنید. از لیست Template ها، "3D (URP)" را انتخاب کنید زیرا Universal Render Pipeline برای VR بهینه‌سازی شده و عملکرد بهتری نسبت به Built-in Render Pipeline دارد. نام پروژه را وارد کرده (مثل MyVRProject) و مسیر ذخیره‌سازی را انتخاب کنید. پس از کلیک روی "Create Project"، Unity پروژه را ایجاد و تنظیمات اولیه را انجام می‌دهد که چند دقیقه طول می‌کشد. برای بررسی صحت نصب URP، به `Edit > Project Settings > Graphics` بروید و باید "UniversalRenderPipelineAsset" در قسمت Scriptable Render Pipeline Settings دیده شود.

## 2. ایجاد صحنه خالی جدید

- `File > New Scene` را انتخاب کرده و "Basic (URP)" Template را انتخاب کنید. سپس `Ctrl + S` را فشار داده و صحنه را با نام `VRScene` در پوشه `Assets/Scenes` ذخیره کنید. حال باید Main Camera موجود در صحنه را حذف کنید زیرا XR Origin دوربین اختصاصی خودش را دارد. Directional Light را نگه دارید تا صحنه نورپردازی مناسب داشته باشد. اگر Directional Light وجود ندارد، با کلیک راست در Hierarchy و انتخاب `GameObject > Light > Directional Light` آن را اضافه کنید.

## 3. نصب پکیج‌های XR Plugin

- `Window > Package Manager` را باز کرده و در قسمت بالا "Unity Registry" را انتخاب کنید. در کادر جستجو "XR Plugin Management" را تایپ کرده و پس از یافتن آن را Install کنید. سپس بسته به هدست مورد استفاده خود، پکیج‌های اضافی مورد نیاز را نصب کنید: برای Oculus/Meta Quest پکیج "Oculus XR Plugin"، برای HTC Vive پکیج "OpenXR Plugin" و برای تست بدون هدست حتماً "XR Device Simulator" را نصب کنید. پس از نصب، به `Edit > Project Settings > XR Plug-in Management` بروید و در تب "PC, Mac & Linux Standalone" پلاگین مربوط به هدست خود را تیک بزنید.

![توضیح تصویر](./img/4-setup-from-scratch-1.avif)

## 4. نصب XR Interaction Toolkit و نمونه‌ها

- در Package Manager، "XR Interaction Toolkit" را جستجو کرده و Install کنید. این ابزار قدرتمند امکان تعامل با اشیاء در محیط VR، سیستم‌های grab، teleport و UI interaction را فراهم می‌کند. پس از نصب، در Package Manager روی "XR Interaction Toolkit" کلیک کنید و تب "Samples" را انتخاب کنید. نمونه‌های "Starter Assets"، "Default Input Actions" و "XR Device Simulator" را حتماً Import کنید و "Hands Interaction Demo" را به‌صورت اختیاری می‌توانید اضافه کنید. ممکن است پیغامی برای تغییر Input System نمایش داده شود که باید "Yes" را انتخاب کنید و Unity خودکار Restart می‌شود

## 5. افزودن Action-based XR Origin به صحنه

- ابتدا Main Camera موجود در Hierarchy را حذف کنید. سپس در Hierarchy کلیک راست کرده و `XR > XR Origin (Action-based)` را انتخاب کنید. XR Origin جایگزین Main Camera در پروژه‌های VR است و شامل سیستم ردیابی، کنترلرها و دوربین VR می‌باشد. پس از اضافه کردن باید ساختاری شامل XR Origin (Action-based) که زیرمجموعه‌های Camera Offset (با Main Camera درونش) و کنترلرهای چپ و راست را داشته باشد در Hierarchy ببینید.

- از تنظیمات پروژه، پنل مدیریت تنظیمات را باز کنید، سپس بخش ActionBasedController را پیدا کنید. برای XRI Default Right Controller، مقدار فیلتر را «Right» تایپ کنید. برای XRI Default Left Controller، مقدار فیلتر را «Left» تایپ کنید.

- در پنجره پروژه، به Samples > XR Interaction Toolkit > [version] > Starter Assets بروید. هر default action preset را در این پوشه انتخاب کنید و در بالای Inspector برای هر کدام، Add to [component] Default را انتخاب کنید. اکنون، هر زمان که یک کامپوننت XR جدید اضافه کنید، این پیش‌تنظیمات اعمال خواهند شد.
  ![توضیح تصویر](./img/4-setup-from-scratch-3.avif)

- حال XR Origin را انتخاب کرده و در Inspector قسمت "Input Action Manager" را پیدا کنید. در قسمت "Action Assets" روی دایره کوچک کلیک کرده و "XRI Default Input Actions" را انتخاب کنید. برای هر کنترلر (Left و Right) نیز تمام Action ها را از همین فایل تخصیص دهید.

![توضیح تصویر](./img/4-setup-from-scratch-2.avif)

## 6. وارد کردن Asset دوره

- فایل "Create-with-VR_Course-Library.zip" را از [لینک](https://connect-prd-cdn.unity.com/20220610/d638c93b-31c9-4de8-ba2f-4074bab8f1e7/Create-with-VR_Course-Library.zip) آموزش Unity دانلود کرده و در مکان مناسب Extract کنید. در Unity به `Assets > Import Package > Custom Package` بروید و فایل .unitypackage موجود در فولدر extract شده را انتخاب کنید. در پنجره Import گزینه "All" را انتخاب کرده و روی "Import" کلیک کنید.

- پس از import باید پوشه‌های Materials (متریال‌های آماده)، Models (مدل‌های سه‌بعدی)، Prefabs (آبجکت‌های آماده)، Scripts (اسکریپت‌های مفید) و Scenes (صحنه‌های نمونه) را در Assets ببینید. برای تست اولیه، به پوشه Scenes بروید و صحنه "Demo Scene" را باز کرده و Play بزنید تا مطمئن شوید همه‌چیز صحیح کار می‌کند.

## اجرای برنامه با XR Device Simulator

- از داخل مسیر `Assets/Samples/XR Interaction Toolkit/2.6.4/XR Device Simulator`، آبجکت XR Device Simulator را به داخل صحنه بکشید. **پس از انجام این کار، روی XR Device Simulator کلیک کنید. قسمت Simulator Setting را در Inspector (سمت راست) باز کنید. از سمت چپ XR Origin > Camera Offset > Main Camera را Drag کنید و داخل Camera Transform قرار دهید.**

- پس از اجرای برنامه، شما قادر به حرکت در صحبه با کمک mouse و keyboard هستید. نحوه‌ی کار با دست‌ها در سمت چپ صفحه همچنین در pdf موجود در اول صفحه توضیح داده شده است.

- در صورتی که امکان حرکت در صحنه را ندارید و مشکلی وجود دارد، به بخش `Edit > Project Setting`در بالای صفحه بروید. با scroll به سمت پایین، `XR Plug-in Management` را انتخاب کرده و روی `OpenXR` کلیک کنید تا در صورتی که افزونه فعال نیست، فعال شود. سپس از بخش XR Plug-in Management > OpenXR مطمئن شوید که **بخش Enabled Interaction Profiles خالی است و همچنین فقط دو گزینه‌ی Mock Runtime و XR Performance Settings فعال هستند.**
