---
sidebar_position: 3

title: شروع پروژه آماده
---

# شروع پروژه آماده

- این راهنما با توجه به صفحه ی [VR Project Setup - Unity Learn](https://learn.unity.com/pathway/vr-development/unit/vr-basics/tutorial/vr-project-setup?version=2022.3) نوشته شده است.

- **در این آموزش و آموزش بعدی، فقط به کمک XR Device Simulator کار می‌کنید. در آموزش بعد از آن، راه اندازی پروژه با کمک هدست به طور کامل آموزش داده خواهد شد.**

- این آموزش با استفاده از پروژه‌ی آماده موجود در آموزش توضیح داده می‌شود.

- پروژه را می‌توانید از این لینک دریافت کنید: [`Create-with‑VR_2022LTS.zip`](https://unity-connect-prd.storage.googleapis.com/20240215/d39c8bf6-4913-43da-80a7-137b06275884/Create-with-VR_2022LTS.zip)

- همچنین آموزش شبیه‌ساز دستگاه را می‌توانید از این [لینک](https://unity-connect-prd.storage.googleapis.com/20210604/28db6ca9-aba1-4ac3-a15a-24664daff3ea/Rig%20Simulator%20Keyboard%20Shortcuts.pdf#page=1&zoom=auto,-152,792) پیدا کنید.

## باز کردن و بررسی صحنهٔ نمونه

- فایل Create-with‑VR.zip فشردهٔ را در پوشه پروژه استخراج کنید. از Unity Hub، گزینه ی Add و سپس Add From Disk را انتخاب و پروژه را به Unity Hub خود اضافه کنید. سپس Editor Version را به ورژن نصب شده‌ی خود قرار دهید و در صورت مواجهه با ارور، Continue را انتخاب کنید. ** حتما از فیلتر شکن قوی استفاده کنید تا هنگام نصب Package ها به مشکل نخورید.**

- پس از نصب package ها و باز شدن پروژه، از Project، داخل پوشه‌ی Scenes، Sample Scene را انتخاب کنید. سپس می‌توانید طبق آموزش از پوشه‌های آماده Prefab، Audio و Scripts استفاده کنید. برای مثال پوشه `Prefab > Environment` را باز کرده و Prefab (Foreground_Hills) را به صحنه بکشید.

![توضیح تصویر](./img/3-setup-from-existing-1.avif)

## اجرای برنامه با XR Device Simulator

- از داخل مسیر `Assets/Samples/XR Interaction Toolkit/2.6.4/XR Device Simulator`، آبجکت XR Device Simulator را به داخل صحنه بکشید. **پس از انجام این کار، روی XR Device Simulator کلیک کنید. قسمت Simulator Setting را در Inspector (سمت راست) باز کنید. از سمت چپ XR Origin > Camera Offset > Main Camera را Drag کنید و داخل Camera Transform قرار دهید.**

- پس از اجرای برنامه، شما قادر به حرکت در صحنه با کمک mouse و keyboard هستید. نحوه‌ی کار با دست‌ها در سمت چپ صفحه همچنین در pdf موجود در اول صفحه توضیح داده شده است.

\* در صورتی که امکان حرکت در صحنه را ندارید و مشکلی وجود دارد، به بخش `Edit > Project Setting`در بالای صفحه بروید. با scroll به سمت پایین، `XR Plug-in Management` را انتخاب کرده و روی `OpenXR` کلیک کنید تا در صورتی که افزونه فعال نیست، فعال شود. سپس از بخش XR Plug-in Management > OpenXR مطمئن شوید که **بخش Enabled Interaction Profiles خالی است و همچنین فقط دو گزینه‌ی Mock Runtime و XR Performance Settings فعال هستند.**

![توضیح تصویر](./img/3-setup-from-existing-2.avif)
