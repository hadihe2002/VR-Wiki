---
sidebar_position: 4

title: شروع پروژه از صفر
---

# راهنمای ایجاد پروژه VR از ابتدا در Unity

این آموزش را می‌توانید در این [لینک](https://learn.unity.com/tutorial/create-a-vr-starter-project-from-scratch) مشاهده کنید.

## 1. مرور کلی (Overview)

این آموزش شما را قدم به قدم در ایجاد یک پروژه VR کاملاً عملکردی راهنمایی می‌کند. پس از طی این مراحل، یک محیط VR خواهید داشت که قابلیت تعامل با دست‌ها، حرکت در فضا و اجرا روی انواع هدست‌های VR را دارا است. این آموزش برای Unity 2022.3 LTS طراحی شده و حدود 60 دقیقه زمان می‌برد. پیش از شروع اطمینان حاصل کنید که Unity Hub نصب شده و اتصال اینترنت پایدار دارید. ⚠️ **نکته مهم**: برای دانلود برخی پکیج‌ها ممکن است نیاز به VPN باشد.

---

## 2. نصب نسخه مناسب Unity

Unity Hub را باز کنید و به تب "Installs" بروید. روی "Install Editor" کلیک کرده و Unity 2022.3 LTS را انتخاب کنید. در مرحله انتخاب ماژول‌ها، حتماً Visual Studio (در صورت عدم نصب قبلی)، Android Build Support (برای خروجی APK) و WebGL Build Support (برای خروجی وب) را تیک بزنید. فرایند نصب ممکن است 30-60 دقیقه طول بکشد. در صورت بروز خطای دانلود، VPN خود را تغییر داده یا Unity Hub را به‌عنوان Administrator اجرا کنید. پس از تکمیل نصب، می‌توانید به مرحله بعد بروید.

---

## 3. ایجاد پروژه URP جدید

در Unity Hub روی "New Project" کلیک کنید و Unity Version را روی 2022.3.x تنظیم کنید. از لیست Template ها، "3D (URP)" را انتخاب کنید زیرا Universal Render Pipeline برای VR بهینه‌سازی شده و عملکرد بهتری نسبت به Built-in Render Pipeline دارد. نام پروژه را وارد کرده (مثل MyVRProject) و مسیر ذخیره‌سازی را انتخاب کنید. پس از کلیک روی "Create Project"، Unity پروژه را ایجاد و تنظیمات اولیه را انجام می‌دهد که چند دقیقه طول می‌کشد. برای بررسی صحت نصب URP، به `Edit > Project Settings > Graphics` بروید و باید "UniversalRenderPipelineAsset" در قسمت Scriptable Render Pipeline Settings دیده شود.

---

## 4. ایجاد صحنه خالی جدید

`File > New Scene` را انتخاب کرده و "Basic (URP)" Template را انتخاب کنید. سپس `Ctrl + S` را فشار داده و صحنه را با نام `VRScene` در پوشه `Assets/Scenes` ذخیره کنید. حال باید Main Camera موجود در صحنه را حذف کنید زیرا XR Origin دوربین اختصاصی خودش را دارد. Directional Light را نگه دارید تا صحنه نورپردازی مناسب داشته باشد. اگر Directional Light وجود ندارد، با کلیک راست در Hierarchy و انتخاب `GameObject > Light > Directional Light` آن را اضافه کنید و Position را روی (0, 3, 0) و Rotation را روی (50, -30, 0) قرار دهید.

---

## 5. نصب پکیج‌های XR Plugin

`Window > Package Manager` را باز کرده و در قسمت بالا "Unity Registry" را انتخاب کنید. در کادر جستجو "XR Plugin Management" را تایپ کرده و پس از یافتن آن را Install کنید. سپس بسته به هدست مورد استفاده خود، پکیج‌های اضافی مورد نیاز را نصب کنید: برای Oculus/Meta Quest پکیج "Oculus XR Plugin"، برای HTC Vive پکیج "OpenXR Plugin" و برای تست بدون هدست حتماً "XR Device Simulator" را نصب کنید. پس از نصب، به `Edit > Project Settings > XR Plug-in Management` بروید و در تب "PC, Mac & Linux Standalone" پلاگین مربوط به هدست خود را تیک بزنید. اگر OpenXR را انتخاب کردید، به قسمت "OpenXR" رفته و "Microsoft Mixed Reality" یا "Oculus Touch" را به‌عنوان Interaction Profile اضافه کنید.

---

## 6. نصب XR Interaction Toolkit و نمونه‌ها

در Package Manager، "XR Interaction Toolkit" را جستجو کرده و Install کنید. این ابزار قدرتمند امکان تعامل با اشیاء در محیط VR، سیستم‌های grab، teleport و UI interaction را فراهم می‌کند. پس از نصب، در Package Manager روی "XR Interaction Toolkit" کلیک کنید و تب "Samples" را انتخاب کنید. نمونه‌های "Starter Assets"، "Default Input Actions" و "XR Device Simulator" را حتماً Import کنید و "Hands Interaction Demo" را به‌صورت اختیاری می‌توانید اضافه کنید. ممکن است پیغامی برای تغییر Input System نمایش داده شود که باید "Yes" را انتخاب کنید و Unity خودکار Restart می‌شود. در نهایت، در پوشه `Assets/Samples/XR Interaction Toolkit/.../Default Input Actions` فایل "XRI Default Input Actions" را کپی کرده و در پوشه اصلی Assets پیست کنید.

---

## 7. افزودن Action-based XR Origin به صحنه

ابتدا Main Camera موجود در Hierarchy را حذف کنید. سپس در Hierarchy کلیک راست کرده و `XR > XR Origin (Action-based)` را انتخاب کنید. XR Origin جایگزین Main Camera در پروژه‌های VR است و شامل سیستم ردیابی، کنترلرها و دوربین VR می‌باشد. پس از اضافه کردن باید ساختاری شامل XR Origin (Action-based) که زیرمجموعه‌های Camera Offset (با Main Camera درونش) و کنترلرهای چپ و راست را داشته باشد در Hierarchy ببینید. حال XR Origin را انتخاب کرده و در Inspector قسمت "Input Action Manager" را پیدا کنید. در قسمت "Action Assets" روی دایره کوچک کلیک کرده و "XRI Default Input Actions" را انتخاب کنید. برای هر کنترلر (Left و Right) نیز تمام Action ها را از همین فایل تخصیص دهید.

---

## 8. پیکربندی سایر تنظیمات پروژه

به `Edit > Project Settings > Quality` بروید و Default Quality Level را روی "Medium" یا "High" تنظیم کنید و "Realtime Reflection Probes" را فعال کنید. در Project window فایل "UniversalRenderPipelineAsset" را پیدا کرده و روی آن دوبار کلیک کنید. Rendering Path را روی Forward، Depth Texture و Opaque Texture را فعال و MSAA را روی 4x تنظیم کنید. در `Edit > Project Settings > Player` نیز Color Space را روی Linear، Graphics APIs را روی Direct3D11 و OpenGLCore و برای Android Scripting Backend را روی IL2CPP تنظیم کنید. اگر قصد Build برای Quest دارید، در تب Android Settings مقادیر Minimum API Level را 23، Target API Level را 32 یا بالاتر و Target Architectures را ARM64 انتخاب کنید.

---

## 9. وارد کردن دارایی‌های دوره

فایل "Create-with-VR_Course-Library.zip" را از لینک آموزش Unity دانلود کرده و در مکان مناسب Extract کنید. در Unity به `Assets > Import Package > Custom Package` بروید و فایل .unitypackage موجود در فولدر extract شده را انتخاب کنید. در پنجره Import گزینه "All" را انتخاب کرده و روی "Import" کلیک کنید. پس از import باید پوشه‌های Materials (متریال‌های آماده)، Models (مدل‌های سه‌بعدی)، Prefabs (آبجکت‌های آماده)، Scripts (اسکریپت‌های مفید) و Scenes (صحنه‌های نمونه) را در Assets ببینید. برای تست اولیه، به پوشه Scenes بروید و صحنه "Demo Scene" را باز کرده و Play بزنید تا مطمئن شوید همه‌چیز صحیح کار می‌کند.

---

## 10. مراحل بعدی و تست پروژه

برای تست بدون هدست، `Window > XR > XR Device Simulator` را انتخاب کنید تا پنجره Device Simulator باز شود. سپس Play را بزنید و با WASD حرکت کنید، QE برای چرخش، Shift + موس برای نگاه کردن و Space برای Reset position استفاده کنید. برای تست با هدست واقعی، هدست را به کامپیوتر وصل کرده و SteamVR یا Oculus را اجرا کنید. سپس `File > Build Settings` بروید، "PC, Mac & Linux Standalone" را انتخاب کرده و روی "Build And Run" کلیک کنید. اگر با مشکلاتی مواجه شدید: برای صفحه سیاه XR Origin Position را روی (0,0,0) تنظیم کنید، برای مشکل کنترلرها Input Actions را دوباره تخصیص دهید و برای عملکرد ضعیف Quality Settings را کاهش داده یا MSAA را غیرفعال کنید. 🎯 **نکته نهایی**: همیشه پروژه خود را backup کنید و با اشیاء ساده شروع کرده و به تدریج پیچیدگی را افزایش دهید.

## اجرای برنامه با XR Device Simulator

- از داخل مسیر `Assets/Samples/XR Interaction Toolkit/2.6.4/XR Device Simulator`، آبجکت XR Device Simulator را به داخل صحنه بکشید. **پس از انجام این کار، روی XR Device Simulator کلیک کنید. قسمت Simulator Setting را در Inspector (سمت راست) باز کنید. از سمت چپ XR Origin > Camera Offset > Main Camera را Drag کنید و داخل Camera Transform قرار دهید.**
- پس از اجرای برنامه، شما قادر به حرکت در صحبه با کمک mouse و keyboard هستید. نحوه‌ی کار با دست‌ها در سمت چپ صفحه همچنین در pdf موجود در اول صفحه توضیح داده شده است.

* در صورتی که امکان حرکت در صحنه را ندارید و مشکلی وجود دارد، به بخش `Edit > Project Setting`در بالای صفحه بروید. با scroll به سمت پایین، `XR Plug-in Management` را انتخاب کرده و روی `OpenXR` کلیک کنید تا در صورتی که افزونه فعال نیست، فعال شود. سپس از بخش XR Plug-in Management > OpenXR مطمئن شوید که **بخش Enabled Interaction Profiles خالی است و همچنین فقط دو گزینه‌ی Mock Runtime و XR Performance Settings فعال هستند.**
