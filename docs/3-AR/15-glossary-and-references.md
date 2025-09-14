# 15 — واژه‌نامه، تقلب‌نامه و منابع پیشنهادی (عمومی)
> این فصل نقش یک «مرجع سریع» را دارد: واژه‌نامهٔ دو‌زبانه، تقلب‌نامهٔ واحدها/فرمول‌ها/الگوها، چک‌لیست‌های نهایی، و فهرست منابع باکیفیت دربارهٔ AR و Unity—کاملاً عمومی و بدون اشاره به اپلیکیشن خاص.

- **چکیده:** اگر تازه‌کار باشید، اصطلاحات AR (مثل Pose/Anchor/Plane/Raycast/VIO) در ابتدا گیج‌کننده‌اند. این فصل با تعریف‌های کوتاه، مثال‌های کاربردی، و ارجاع به منابع معتبر، منحنی یادگیری را هموار می‌کند.
- **کاربرد:** در طول توسعه به‌عنوان **مرجع کنار دست** استفاده کنید؛ هنگام مرور فصل‌های دیگر، سریع به اینجا سر بزنید.

---

## 1) واژه‌نامهٔ دو‌زبانهٔ AR/Unity (A–Z)
> تعریف‌ها کوتاه و قابل‌عمل‌اند. ستون «یادداشت» کاربرد یا نکتهٔ رایج را می‌گوید.

| اصطلاح (EN) | فارسی/توضیح کوتاه | یادداشت عملی |
|---|---|---|
| **AR (Augmented Reality)** | واقعیت افزوده؛ افزودن لایهٔ دیجیتال روی جهان واقعی | با دوربین/سنسور کار می‌کند |
| **VR / MR / XR** | واقعیت مجازی / ترکیبی / چتری برای همه | MR ترکیب AR و تعامل‌های فضایی عمیق‌تر |
| **VIO / SLAM** | برآورد حرکت با «دیداری–اینرسیایی» / مکان‌یابی هم‌زمان | مبنای Pose؛ به نور/بافت حساس است |
| **IMU** | سنسور شتاب/ژیروسکوپ | دادهٔ کمکی برای VIO |
| **Pose** | موقعیت + چرخش (Quaternion/Euler) | هر فریم به‌روزرسانی می‌شود |
| **Plane** | سطح تشخیص‌داده‌شده (افقی/عمودی) | برای قراردهی تکیه‌گاه خوبی است |
| **Point Cloud / Feature Points** | نقاطِ بافت‌دار قابل‌پیگیری | ناپایدار؛ برای نمایش کیفیت Tracking |
| **Raycast** | پرتو از صفحه به جهان برای یافتن برخورد | پایهٔ Reticle/Placement |
| **Anchor** | مرجع مکانی پایدار قفل‌شده به Trackable | پس از تأیید جای‌گذاری بسازید |
| **Trackable** | چیزی که موتور ردیابی دنبال می‌کند (Plane/Point/…) | رویدادهای added/updated/removed دارد |
| **Reticle** | نشانکِ محل پیشنهادی قراردهی | حالت‌های «قابل/غیرقابل» |
| **World-space / Screen-space** | دستگاه مختصات جهان / صفحه | اطلاعات مکانی ↔ World؛ کنترل‌ها ↔ Screen |
| **Occlusion / Depth** | پنهان‌سازی پشت اشیای واقعی / نقشهٔ عمق | روی برخی دستگاه‌ها/پکیج‌ها |
| **URP / SRP** | رندر پایپ‌لاین سبک / قابل‌برنامه‌نویسی | SRP Batcher برای Draw Call کمتر |
| **Draw Call / SetPass** | درخواست رندر / تغییر متریال/Shader | زیاد بودنشان = FPS پایین |
| **Overdraw** | چندبارکشیدن پیکسل‌ها (اغلب به‌دلیل شفافیت) | دشمنِ موبایل؛ کمش کنید |
| **GPU Instancing** | رندر Meshهای یکسان با یک Draw Call | با MaterialPropertyBlock رنگ متفاوت دهید |
| **LOD / Culling** | سطح جزئیات / حذف خارج قاب | برای مقیاس‌پذیری عملکرد |
| **Z-Fighting / Render Queue** | لرزش لبه‌ها / ترتیب ترسیم | با ZOffset/مرتب‌سازی حل می‌شود |
| **MSAA / Render Scale** | آنتی‌الیاسینگ چندنمونه‌ای / مقیاس رندر | تعادل کیفیت/عملکرد |
| **TMP (TextMeshPro)** | سیستم متن پیشرفته | برای RTL از راهکار سازگار استفاده کنید |
| **Input System** | سیستم ورودی جدید Unity | ژست‌ها/لمس/دستگاه‌ها |
| **Prefab / Pooling** | قالب شیء / نگه‌داری اشیای آماده | به‌جای Instantiate/Destroy مکرر |
| **AAB / APK / IPA** | بستهٔ اندروید برای فروشگاه / نصبی / بستهٔ iOS | AAB برای انتشار، APK برای تست |
| **SUS / UMUX-Lite / NPS** | سنجه‌های UX | برای ارزیابی تجربهٔ کاربری |
| **KPI** | شاخص کلیدی عملکرد | زمان، خطا، FPS، دقت مقیاس و… |

---

## 2) تقلب‌نامهٔ واحدها و تبدیل‌ها
- **واحد جهان Unity:** `1.0 = 1 متر`
- **تبدیل mm → m:** `m = mm × meters_per_mm`
- **تبدیل cm → m:** `m = cm × meters_per_cm`
- **نسبت تبدیل (کالیبراسیون دو‌نقطه):** `meters_per_mm = measured_m / true_mm`

> یک «منبع حقیقت» برای نسبت تبدیل نگه دارید و همه‌جا از همان استفاده کنید.

---

## 3) تقلب‌نامهٔ کدهای کوتاه (Snippets)
### 3.1 Raycast حداقلی
```csharp
if (raycastManager.Raycast(screenPoint, hits, TrackableType.PlaneWithinPolygon)) {
    var pose = hits[0].pose;
}
```

### 3.2 اسنپ زاویه‌ای و شبکه‌ای
```csharp
e.y = Mathf.Round(e.y / 15f) * 15f; // yaw
pos.x = Mathf.Round(pos.x / 0.05f) * 0.05f; // grid 5cm
```

### 3.3 Anchor روی Plane
```csharp
var anchor = anchorManager.AttachAnchor(plane, pose);
if (anchor) myObj.transform.SetParent(anchor.transform, worldPositionStays:true);
```

### 3.4 FPS‌متر ساده
```csharp
acc += Time.unscaledDeltaTime; frames++;
if (acc>=2f){ Debug.Log(frames/acc); acc=0; frames=0; }
```

### 3.5 نوشتن اتمیک فایل
```csharp
File.WriteAllText(tmp, text);
File.Replace(tmp, path, null);
```

---

## 4) الگوهای رایجِ «بهترین تجربه» (Best Practices)
- **Raycast → Preview → Validate → Anchor** را استاندارد کنید.
- Visualization (Plane/Points) را برای کشف روشن و پس از تأیید خاموش کنید.
- تعامل‌ها را **ساده و قابل‌کشف** نگه دارید: ۲–۳ ژست بیشتر نه.
- **Outline سبک + سایهٔ تماس** به باورپذیری کمک می‌کند.
- **Pooling، Instancing، SRP Batcher** = سه‌گانهٔ کاهش Draw Call/GC.
- **Log سبک و قابل‌Export** از روز اول فعال باشد.

---

## 5) چک‌لیست‌های نهایی
### 5.1 قبل از بیلد
- [ ] XR Plugin Mgmt فعال (ARCore/ARKit).
- [ ] Player Settings: IL2CPP + ARM64، API Level مناسب.
- [ ] Scenes In Build تنظیم.
- [ ] Camera Usage (iOS) و Permission (Android) روشن.
- [ ] Device واقعی متصل و تست اولیه انجام شده.

### 5.2 قبل از دمو
- [ ] نور/بافت محیط مناسب، سطح مات.
- [ ] Reticle/Placement/Anchor تست شد.
- [ ] FPS ≥ 30 پایدار؛ Visualization اضافی خاموش.
- [ ] پیام‌های خطا/راهنما کوتاه و واضح.
- [ ] باتری کافی + Do Not Disturb.

### 5.3 نگه‌داری
- [ ] نسخهٔ پکیج‌ها مستندسازی شد.
- [ ] Schema نسخه‌گذاری و مهاجرت دارد.
- [ ] لاگ‌ها به‌صورت دوره‌ای صادرات/بازبینی می‌شوند.

---

## 6) نقاط شروع برای مطالعهٔ بیشتر (منابع پیشنهادی)
> عناوین کلیدی برای جست‌وجو در وب/مستندات رسمی. (لیست بدون لینک مستقیم؛ با نام کامل جست‌وجو کنید.)

- **Unity Manual — AR Foundation** (راهنمای رسمی و API Reference)  
- **Unity AR Foundation Samples** (نمونه‌کدها در مخزن رسمی)  
- **ARCore Developer Guide** (مستندات رسمی گوگل)  
- **ARKit Developer Documentation** (مستندات رسمی اپل)  
- **Unity Manual — Universal Render Pipeline (URP)** و **SRP Batcher**  
- **Unity — Mobile Performance recommendations** (راهنمای بهینه‌سازی موبایل)  
- **TextMeshPro — Documentation** (فونت SDF، استایل، RTL-friendly)  
- **Unity Input System — Manual** (لمس/ژست/دستگاه‌ها)  
- **Human Interface Guidelines (HIG) — Apple: Augmented Reality** (اصول UX در AR)  
- **Google — AR UX Guidelines** (راهنمای تعامل و راهنمایی کاربر)  
- **Nielsen Norman Group — AR UX** (مقالات تجربهٔ کاربری در AR)  
- **Papers/Blogs on VIO/SLAM basics** (برای درک عمیق‌تر ردیابی)

---

## 7) کلیدواژه‌های مفید برای جست‌وجو
- “Unity AR Foundation plane detection best practices”  
- “ARCore vs ARKit differences 2025”  
- “Unity URP mobile optimization SRP Batcher GPU instancing”  
- “AR UX guidelines onboarding reticle wayfinding”  
- “TextMeshPro SDF RTL support”  
- “NonAlloc patterns Unity mobile pooling”

---

## 8) پرسش‌های مرور سریع (Self‑check)
- تفاوت **Pose** و **Anchor** چیست و هرکدام چه زمانی استفاده می‌شوند؟  
- چرا **PlaneWithinPolygon** برای جای‌گذاری امن مهم است؟  
- سه راه **کالیبراسیون مقیاس** را نام ببرید و مزیت/ریسک هرکدام چیست؟  
- چه چیزهایی معمولاً **Overdraw** را بالا می‌برد و راه‌حل‌هایش چیست؟  
- چطور **لاگ سبک و تحلیل‌پذیر** طراحی می‌کنید؟
- در زبان‌های **RTL** چه نکات UI باید رعایت شود؟

---

## 9) الگوی مستندسازی تیم (قابل کپی)
```
# یادداشت انتشار (Release Notes)
- نسخهٔ یونیتی/پکیج‌ها:
  - Unity: 2022.3.x
  - AR Foundation: 5.x
  - ARCore XR Plugin: 5.x
  - (اختیاری) ARKit XR Plugin: 5.x
- تغییرات کلیدی:
- ریسک‌های شناخته‌شده:
- دستگاه‌های تست‌شده: (مدل/OS)

# چک‌لیست کیفیت
- [ ] FPS میانگین/کمینه
- [ ] پایداری Tracking
- [ ] دقت مقیاس (درصد خطا)
- [ ] صحت RTL/فونت‌ها
- [ ] لاگ/Export
```

---

## 10) نکات کلیدی فصل
- واژه‌ها را دقیق و یکسان استفاده کنید؛ ابهام زبانی منبع خطاست.
- یک «برگهٔ تقلب» کناری بسازید و در طول توسعه به‌روزش کنید.
- برای منابع، همیشه **مستندات رسمی** را اولویت دهید؛ سپس مقالات معتبر.
- تمرین و تست واقعی روی دستگاه، بهترین معلم شماست.
