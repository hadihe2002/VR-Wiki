---
sidebar_position: 15

title: فارسی نویسی
---

# راهنمای رابط کاربری در Unity VR

- این آموزش در این [لینک](https://learn.unity.com/pathway/vr-development/unit/events-and-interactions/tutorial/2-4-user-interface?version=2022.3) قرار دارد.
- توصیه می‌شود تا این آموزش را از داخل سایت Unity به صورت ویدیویی پیش ببرید. راه حل چالش‌های این بخش را می‌توانید در [این کانال یوتیوب](https://www.youtube.com/@garlicsuter) مشاهده کنید.

## اضافه کردن UI فضای جهانی به اتاق

### ایجاد World Space Canvas

- رابط کاربری در VR باید در فضای سه‌بعدی قرار گیرد تا با محیط هماهنگ باشد. **Canvas** component را روی **World Space** تنظیم کنید تا UI در دنیای بازی قرار گیرد. Event Camera را به XR Camera assign کنید تا تعاملات درست کار کنند. **Canvas Scaler** برای تنظیم اندازه مناسب UI در فضای VR استفاده کنید. Position و Scale را طوری تنظیم کنید که راحت قابل مشاهده و دسترسی باشد. Graphic Raycaster component برای تشخیص تعامل Ray Interactor با UI elements اضافه کنید.-

## ویرایش متن خوشامدگویی

### تنظیم Welcome Text

- متن خوشامدگویی اولین تجربه کاربر از UI شماست. **Text Mesh Pro** برای کیفیت بهتر متن در VR استفاده کنید. Font Size را به اندازه مناسبی تنظیم کنید که از فاصله مناسب قابل خواندن باشد. **Color Contrast** بالا برای خوانایی بهتر در محیط VR انتخاب کنید. Text Alignment و Layout برای ظاهر حرفه‌ای تنظیم کنید. Localization support برای پشتیبانی از زبان‌های مختلف در نظر بگیرید. Animation Effect برای جذاب‌تر کردن ظاهور متن اضافه کنید.

## اضافه کردن دکمه OK به پنل

### پیاده‌سازی OK Button

- دکمه‌ها رابط اصلی تعامل کاربر با UI هستند. **UI Button** component اضافه کرده و آن را برای تعامل با Ray Interactor تنظیم کنید. Button Graphics و Visual State برای Normal، Highlighted و Pressed حالت‌ها طراحی کنید. **OnClick Event** را برای واکنش به فشردن دکمه پیکربندی کنید. Haptic Feedback برای تأیید فشردن دکمه در VR اضافه کنید. Button Size را به اندازه مناسبی تنظیم کنید که با Ray Interactor راحت قابل انتخاب باشد.

![](./img/14-User-Interface-1.avif)

## حذف پنل خوشامدگویی با دکمه OK

### پیاده‌سازی Panel Removal

- دکمه OK باید قابلیت بستن پنل را داشته باشد. **SetActive(false)** method برای مخفی کردن welcome panel استفاده کنید. Animation Transition برای نرم بودن ناپدید شدن پنل اضافه کنید. **Fade Out Effect** برای تجربه visual بهتر پیاده‌سازی کنید. Sound Effect برای تأیید بستن پنل پخش کنید. State Management برای جلوگیری از فعال شدن مجدد panel در همان session ایجاد کنید. Cleanup Logic برای آزاد کردن منابع پس از بستن پنل اضافه کنید.

## ایجاد Canvas تنظیمات مجدد

### ساخت Reset UI Canvas

- Canvas جداگانه برای عملکردهای reset نیاز است. **Secondary Canvas** برای reset functionality ایجاد کنید که ابتدا غیرفعال باشد. Layout و Design را طوری تنظیم کنید که با welcome panel متمایز باشد. **Reset Button** و **Cancel Button** برای کنترل کامل کاربر اضافه کنید. Warning Message برای اطلاع‌رسانی عواقب reset نمایش دهید. Confirmation Dialog برای جلوگیری از reset تصادفی پیاده‌سازی کنید. Position Adjustment برای قرارگیری در محل مناسب و قابل دسترس.

---

## نمایش پنل reset با فشردن دکمه ثانویه

### فعال‌سازی Reset Panel

- دکمه ثانویه controller برای دسترسی سریع به reset استفاده می‌شود. **Input Action** برای secondary button press در XR Input System تنظیم کنید. Event Listener برای تشخیص فشردن دکمه و فعال کردن reset panel ایجاد کنید. **Toggle Behavior** برای باز و بسته کردن panel با همان دکمه پیاده‌سازی کنید. Cooldown Timer برای جلوگیری از فعال‌سازی مکرر سریع اضافه کنید. Visual Indicator برای نشان دادن کدام دکمه برای reset استفاده می‌شود ارائه دهید.

## بازگشت به موقعیت شروع با فشردن دکمه

### پیاده‌سازی Teleport Reset

- قابلیت بازگشت به موقعیت اولیه برای راحتی کاربر ضروری است. **Transform.position** و **Transform.rotation** کاربر را به مقادیر اولیه بازگردانید. Fade Transition برای smooth teleportation بدون motion sickness اضافه کنید. **Reference Point** برای ذخیره موقعیت و جهت اولیه تعریف کنید. Validation Check برای اطمینان از ایمنی موقعیت مقصد انجام دهید. Animation Effect برای نشان دادن teleportation به کاربر ایجاد کنید. State Reset برای بازگردانی تمام object های moved یا grabbed به حالت اولیه.
