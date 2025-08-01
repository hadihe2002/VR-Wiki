---
sidebar_position: 9

title: تعامل با اشیا (Grabbable Objects)
---

# راهنمای Grabbable Objects در Unity

- این آموزش را می‌توانید در [این لینک](https://learn.unity.com/pathway/vr-development/unit/vr-basics/tutorial/grabbable-objects?version=2022.3) مشاهده کنید.

- توصیه می‌شود تا این آموزش را از داخل سایت Unity به صورت ویدیویی پیش ببرید. راه حل چالش‌های این بخش را می‌توانید در [این کانال یوتیوب](https://www.youtube.com/@garlicsuter) مشاهده کنید.

## انتخاب مدل‌های دست

- در این مرحله، مدل‌های دست مناسب برای VR تجربه انتخاب می‌کنیم. XR Toolkit مدل‌های پیش‌فرض دست ارائه می‌دهد که می‌توانید آن‌ها را سفارشی کنید. در **XR Direct Interactor** تنظیمات مربوط به Hand Model را پیکربندی کنید. مطمئن شوید که Hand Tracking و Hand Animation به درستی تنظیم شده‌اند. مدل‌های دست باید با انیمیشن‌های grab و release همگام باشند. Hand Pose های مختلف را برای انواع مختلف اشیاء تعریف کنید تا تعامل طبیعی‌تری ایجاد شود.

## اضافه کردن شیء قابل گرفتن

- برای ایجاد یک شیء قابل گرفتن، **XR Grab Interactable** component را به object مورد نظر اضافه کنید. مطمئن شوید که object دارای Rigidbody و Collider است. Interaction Layer Mask را تنظیم کنید تا مشخص کنید کدام Interactor ها می‌توانند با این object تعامل کنند. Movement Type را بر اساس نیاز تنظیم کنید (Kinematic، VelocityTracking، یا Instantaneous). Track Position و Track Rotation را فعال کنید تا object حرکات دست را دنبال کند. Attach Transform را تعیین کنید تا مشخص کنید object کجا به دست متصل شود.

## مخفی کردن دست‌ها و غیرفعال کردن کنترل anchor

- هنگامی که کاربر شیء‌ای را می‌گیرد، معمولاً بهتر است مدل دست مخفی شود تا تداخل visual ایجاد نشود. در **XR Grab Interactable** تنظیمات Hide Controller On Select را فعال کنید. همچنین برای جلوگیری از تداخل با anchor control (مثل teleportation)، می‌توانید Select Action Trigger را تنظیم کنید. Interaction Events مثل Select Entered و Select Exited را برای کنترل بهتر رفتار object استفاده کنید. Hand Model Visibility را با grabbed state همگام کنید.

## تنظیم دقیق تجربه پرتاب

- برای تجربه پرتاب واقعی‌تر، Throw On Detach را فعال کنید و پارامترهای مربوطه را تنظیم کنید. **Throw Velocity Scale** قدرت پرتاب را کنترل می‌کند. Throw Angular Velocity Scale برای چرخش شیء هنگام پرتاب استفاده می‌شود. Force Gravity On Detach را فعال کنید تا gravity بلافاصله پس از رها کردن object اعمال شود. Velocity samples و Angular velocity samples را تنظیم کنید تا محاسبه سرعت دقیق‌تر باشد. Physics material مناسب برای bounce و friction اضافه کنید.

## اضافه کردن شیء با دسته

- برای اشیائی که دسته دارند (مثل چکش، شمشیر)، باید Attach Transform را دقیق تنظیم کنید. یک Empty GameObject در موقعیت دسته ایجاد کنید و آن را به عنوان Attach Transform تعیین کنید. **Multiple Attach Transform** برای grip های مختلف تعریف کنید. Hand Pose های خاص برای نحوه گرفتن دسته ایجاد کنید. Select Mode را روی Multiple تنظیم کنید اگر می‌خواهید هر دو دست بتوانند object را بگیرند. Two-handed interaction برای اشیاء بزرگ‌تر پیاده‌سازی کنید.
  ![توضیح تصویر](./img/9-Grabbable-Objects-1.avif)

## سازماندهی Hierarchy

- پروژه خود را منظم نگه دارید با ایجاد parent object هایی مثل "Grabbable Objects"، "Interactables"، یا "Physics Objects". Layer های مختلف برای انواع مختلف grabbable objects تعریف کنید. Tag های مناسب برای دسته‌بندی اشیاء استفاده کنید. Prefab هایی از grabbable objects ایجاد کنید تا بتوانید به راحتی آن‌ها را در صحنه‌های مختلف استفاده کنید. Manager script برای مدیریت کلی interaction events و statistics ایجاد کنید. Naming convention مناسبی برای object ها و component ها رعایت کنید.
