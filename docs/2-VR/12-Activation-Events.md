---
sidebar_position: 12

title: فعال و غیرفعال سازی اشیا (Activation Events)
---

# راهنمای رویدادهای فعال‌سازی در Unity

- این آموزش را می‌توانید در [این لینک](https://learn.unity.com/pathway/vr-development/unit/events-and-interactions/tutorial/2-2-activation-events?version=2022.3) مشاهده کنید.
- توصیه می‌شود تا این آموزش را از داخل سایت Unity به صورت ویدیویی پیش ببرید. راه حل چالش‌های این بخش را می‌توانید در [این کانال یوتیوب](https://www.youtube.com/@garlicsuter) مشاهده کنید.

## راه‌اندازی رویدادهای پایه

- رویدادهای فعال‌سازی به شما امکان پاسخ به تعاملات کاربر را می‌دهند. **UnityEvent** system را برای ایجاد ارتباط بین component ها استفاده کنید. در **XR Grab Interactable** بخش Events را پیدا کنید و Select Entered، Select Exited، Hover Entered و Hover Exited را تنظیم کنید. Method های target object را به این event ها assign کنید تا هنگام تعامل اجرا شوند. Inspector window برای drag & drop کردن object ها و انتخاب method مناسب استفاده کنید.

## تنظیم event های متنوع برای object های مختلف

- هر object می‌تواند رفتار منحصر به فردی داشته باشد. **Light Toggle** برای روشن/خاموش کردن چراغ با grab event پیاده‌سازی کنید. Door Opening mechanism با activate event روی door handle ایجاد کنید. **Animation Trigger** برای شروع انیمیشن هنگام hover کردن روی object استفاده کنید. Sound Effect playback را با interaction event های مختلف sync کنید. Color Change برای نشان دادن وضعیت active/inactive object ها اعمال کنید.

## برنامه‌نویسی رویدادهای پیشرفته

- برای منطق پیچیده‌تر، C# script نویسی ضروری است. **Event Listener** script ایجاد کنید که به چندین interaction event گوش دهد. State Management برای ردیابی وضعیت object ها و شرطی کردن action ها پیاده‌سازی کنید. **Coroutine** برای action هایی که در طول زمان رخ می‌دهند استفاده کنید. Timer-based Events برای delay در response یا auto-reset functionality ایجاد کنید. Multi-step Activation sequence برای puzzle ها یا complex machinery پیاده‌سازی کنید.

## پیوند رویدادها برای سکانس‌های پیچیده

- رویدادهای زنجیره‌ای امکان ایجاد سکانس‌های جذاب را فراهم می‌کنند. **Sequential Activation** برای فعال کردن object ها به ترتیب خاص پیاده‌سازی کنید. Domino Effect که فعال کردن یک object باعث فعال شدن object بعدی شود ایجاد کنید. **Condition-based Chains** برای فعال شدن event بعدی فقط در صورت برآورده شدن شرایط خاص استفاده کنید. Branching Logic برای مسیرهای مختلف بر اساس انتخاب کاربر پیاده‌سازی کنید. Reset Mechanism برای بازگشت زنجیره به حالت اولیه اضافه کنید.

## مدیریت زمان‌بندی رویدادها

- کنترل زمان‌بندی برای تجربه مناسب ضروری است. **Invoke** و **InvokeRepeating** method ها برای delay ساده در action ها استفاده کنید. Countdown Timer برای نمایش زمان باقی‌مانده تا event اضافه کنید. **Coroutine with WaitForSeconds** برای timing control دقیق‌تر پیاده‌سازی کنید. Auto-Reset Timer برای بازگشت object ها به حالت اولیه پس از مدت معین ایجاد کنید. Progress Indicator برای نشان دادن میزان پیشرفت تا فعال شدن event نمایش دهید.

## ردیابی و کنترل state های مختلف

- مدیریت صحیح state برای رفتار قابل اعتماد ضروری است. **Boolean State Variables** برای ردیابی وضعیت فعال/غیرفعال object ها استفاده کنید. Enum-based State Machine برای object هایی با state های متعدد پیاده‌سازی کنید. **Persistent State** برای حفظ وضعیت object ها بین session ها ایجاد کنید. Visual State Indicators مثل material change یا particle effect برای نمایش وضعیت فعلی اضافه کنید. State Validation برای جلوگیری از invalid state transition ها پیاده‌سازی کنید.

## کاهش overhead و بهبود performance

- مدیریت بهینه رویدادها برای حفظ فریم ریت VR مهم است. **Event Pooling** برای کاهش garbage collection در event های مکرر استفاده کنید. Distance-based Event Activation برای فعال کردن event listener ها فقط در صورت نزدیکی player پیاده‌سازی کنید. **Batch Processing** برای اجرای چندین event همزمان به جای sequential execution استفاده کنید. Memory-efficient Event Storage برای object هایی با event های زیاد پیاده‌سازی کنید. Performance Profiling برای شناسایی bottleneck ها در event system انجام دهید.

![](./img/12-activition-event-1.avif)
