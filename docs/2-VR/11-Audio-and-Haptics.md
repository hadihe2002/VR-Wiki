---
sidebar_position: 11

title: صدا و افکت‌های کنترلر (Audio & Haptics)
---

# راهنمای Audio and Haptics در Unity

- این آموزش از در [این لینک](https://learn.unity.com/pathway/vr-development/unit/events-and-interactions/tutorial/2-1-audio-and-haptics?version=2022.3) قرار دارد.

- توصیه می‌شود تا این آموزش را از داخل سایت Unity به صورت ویدیویی پیش ببرید. راه حل چالش‌های این بخش را می‌توانید در [این کانال یوتیوب](https://www.youtube.com/@garlicsuter) مشاهده کنید.

## راه‌اندازی صدای سه‌بعدی در VR

- صدای سه‌بعدی یکی از مهم‌ترین عناصر برای ایجاد immersion در VR است. **Audio Source** component را به object های مختلف اضافه کنید و Spatial Blend را روی 3D تنظیم کنید. Audio Listener که روی Main Camera قرار دارد، موقعیت گوش شنونده را تعیین می‌کند. Volume Rolloff را برای کنترل نحوه کاهش صدا با فاصله تنظیم کنید. Doppler Effect برای شبیه‌سازی تغییر pitch هنگام حرکت object ها فعال کنید. Audio Mixer برای کنترل کلی volume و effect ها استفاده کنید.

## پیاده‌سازی صدای محیطی

- صداهای محیطی فضای VR را زنده و واقعی‌تر می‌کنند. **Ambient Audio Sources** را در نقاط مختلف صحنه قرار دهید تا صدای پس‌زمینه ایجاد کنند. Audio Reverb Zone ها برای شبیه‌سازی echo و reverb در فضاهای مختلف استفاده کنید. Wind Sound، Birds Chirping، و Machine Humming برای ایجاد atmosphere مناسب اضافه کنید. Audio Occlusion برای مسدود شدن صدا توسط دیوارها پیاده‌سازی کنید. Dynamic Audio که بر اساس weather یا time of day تغییر کند ایجاد کنید.

## اضافه کردن بازخورد صوتی تعاملات

- هر تعامل در VR باید بازخورد صوتی مناسبی داشته باشد. **Button Click Sounds** برای UI interaction ها اضافه کنید. Grab Sound Effect هنگام گرفتن object ها پخش کنید. Drop Sound بر اساس material و surface مختلف متفاوت باشد. Collision Audio برای برخورد object ها با یکدیگر پیاده‌سازی کنید. **Audio Events** را با Interaction Events همگام کنید تا timing دقیق داشته باشند. Volume و pitch را بر اساس force و speed تعامل تنظیم کنید.

## پیکربندی بازخورد لمسی

- Haptic feedback حس لمس را در VR شبیه‌سازی می‌کند. **XR Controller** script را برای ارسال vibration به controller ها استفاده کنید. Haptic patterns مختلف برای action های متفاوت تعریف کنید - کوتاه برای button press، طولانی برای collision. Intensity و Duration را بر اساس نوع تعامل تنظیم کنید. **Coroutine** برای ایجاد haptic pattern های پیچیده استفاده کنید. Haptic feedback را با audio synchronize کنید تا تجربه یکپارچه‌ای ایجاد شود.

## ایجاد ترکیب صدا و لمس

- ترکیب مناسب audio و haptic، realism بیشتری به VR می‌بخشد. **Synchronized Events** برای همزمان کردن صدا و vibration ایجاد کنید. Texture Simulation با ترکیب audio pitch changes و haptic frequency variations پیاده‌سازی کنید. Impact feedback که هم صدای برخورد و هم لرزش مناسب داشته باشد ایجاد کنید. **Material-based Response** برای surface های مختلف (چوب، فلز، شیشه) تعریف کنید. Intensity scaling برای object های سنگین‌تر یا collision های قوی‌تر اعمال کنید.

## بهینه‌سازی عملکرد صوتی

- مدیریت منابع صوتی برای حفظ فریم ریت VR ضروری است. **Audio Source Pooling** برای جلوگیری از instantiate مکرر پیاده‌سازی کنید. Distance-based Audio LOD برای کاهش quality صداهای دور استفاده کنید. Audio Compression settings را برای balance بین quality و performance تنظیم کنید. **Max Voices** را محدود کنید تا از audio system overload جلوگیری شود. Background Loading برای audio clip های بزرگ استفاده کنید. Memory management برای unload کردن audio clip های غیرضروری پیاده‌سازی کنید.

## پیاده‌سازی ویژگی‌های صدای فضایی

- ویژگی‌های پیشرفته spatial audio برای تجربه واقعی‌تر اضافه کنید. **HRTF (Head-Related Transfer Function)** برای شبیه‌سازی دقیق‌تر مکان صدا فعال کنید. Binaural Audio برای headphone optimization پیاده‌سازی کنید. Audio Ray Casting برای تشخیص مسیر صدا از منبع تا گوش استفاده کنید. **Reflection** و **Diffraction** برای شبیه‌سازی انعکاس صدا از سطوح پیاده‌سازی کنید. Room Scale Audio که با اندازه واقعی اتاق player تطبیق پیدا کند ایجاد کنید..
  ![توضیح تصویر](./img/11-audio-and-haptics.avif)
