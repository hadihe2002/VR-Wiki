---
sidebar_position: 8

title: جا به جایی (Locomotion)
---

# راهنمای جامع VR Locomotion در Unity

Locomotion یکی از مهم‌ترین اجزای تجربه VR است که به کاربران امکان حرکت در فضای مجازی را می‌دهد، بدون اینکه نیاز به حرکت فیزیکی در دنیای واقعی باشد.

:::info منابع یادگیری

- **آموزش Unity**: [VR Locomotion Tutorial](https://learn.unity.com/pathway/vr-development/unit/vr-basics/tutorial/vr-locomotion?version=2022.3)
- **راه‌حل چالش‌ها**: [کانال YouTube](https://www.youtube.com/@garlicsuter)
  :::

## بخش ۱: آماده‌سازی محیط

### پر کردن اتاق با مبلمان

#### اهداف محیطی:

- **ایجاد فضای واقعی‌تر** با اشیاء متنوع
- **بهبود Spatial Awareness** کاربر
- **تست کامل Locomotion System**

#### عناصر پیشنهادی:

| نوع شیء         | تعداد   | نقش            |
| --------------- | ------- | -------------- |
| **میز و صندلی** | 2-3 ست  | نقاط مرجع      |
| **کتابخانه**    | 1-2 عدد | مانع عمودی     |
| **فرش**         | چندین   | منطقه تله‌پورت |
| **لامپ/تابلو**  | 3-4 عدد | جزئیات محیطی   |

:::caution تنظیمات Collider
مطمئن شوید تمام اشیاء دارای Collider مناسب هستند تا با Locomotion System تداخل ایجاد نکنند.
:::

## بخش ۲: چرخش گام‌به‌گام (Snap Turning)

### مزایای Snap Turning

- **کاهش Motion Sickness**
- **کنترل دقیق‌تر جهت**
- **سازگاری با انواع کنترلرها**

### پیاده‌سازی Snap Turn Provider

#### مراحل تنظیم:

1. **اضافه کردن Component**:
   XR Origin > Locomotion System > Add Component > Snap Turn Provider

   ```

   ```

2. **تنظیمات کلیدی**:

| پارامتر                | مقدار توصیه‌شده | توضیح             |
| ---------------------- | --------------- | ----------------- |
| **Turn Amount**        | 30-45°          | زاویه هر چرخش     |
| **Debounce Time**      | 0.5s            | فاصله بین چرخش‌ها |
| **Enable Turn Around** | ✅              | چرخش 180°         |

### تنظیم Input Actions

در **Input Action Asset**:

Right Hand Controller > Primary 2D Axis → Snap Turn

:::tip بهینه‌سازی
برای تجربه بهتر، Turn Amount را بین 30-45 درجه تنظیم کنید.
:::

## بخش ۳: تله‌پورت به نواحی (Teleportation Areas)

### مفهوم Teleportation Area

نواحی که کاربر می‌تواند به **هر نقطه‌ای** از آن‌ها تله‌پورت کند.

### تنظیم روی فرش

#### مراحل پیکربندی:

1. **انتخاب فرش یا سطح مناسب**
2. **اضافه کردن Component**:
   ```
   GameObject > Add Component > Teleportation Area
   ```

#### تنظیمات ضروری:

| جزء                   | تنظیم          | مقدار                |
| --------------------- | -------------- | -------------------- |
| **Collider**          | isTrigger      | ✅ فعال              |
| **Layer**             | Teleportation  | مخصوص Ray Interactor |
| **Match Orientation** | World Space Up | جهت ثابت             |

### Visual Feedback

برای نمایش بهتر منطقه:

- **Material شفاف** با رنگ مشخص
- **Outline Effect** روی لبه‌ها
- **Particle Effects** هنگام تله‌پورت

:::info انعطاف‌پذیری
Teleportation Area برای فضاهای باز و نواحی بزرگ مناسب است.
:::

## بخش ۴: نقاط ثابت تله‌پورت (Teleportation Anchors)

### مزیت‌های Teleportation Anchor

- **کنترل دقیق موقعیت**
- **جلوگیری از تله‌پورت نامناسب**
- **هدایت تجربه کاربر**

### پیاده‌سازی روی پادری‌ها

#### تنظیم Component:

GameObject (Pedestal) > Add Component > Teleportation Anchor

#### پارامترهای کلیدی:

| تنظیم                         | حالت           | کاربرد       |
| ----------------------------- | -------------- | ------------ |
| **Teleport Anchor Transform** | دقیق           | موقعیت نهایی |
| **Match Orientation**         | Target Forward | جهت مشخص     |
| **Match Directional Input**   | ✅             | کنترل جهت    |

### مقایسه Area vs Anchor

| ویژگی             | Teleportation Area | Teleportation Anchor |
| ----------------- | ------------------ | -------------------- |
| **انعطاف موقعیت** | ✅ بالا            | ❌ ثابت              |
| **کنترل دقیق**    | ❌ محدود           | ✅ کامل              |
| **کاربرد**        | فضای باز           | نقاط خاص             |

## بخش ۵: سفارشی‌سازی نشانگرها

### انواع Reticle

#### Valid Reticle (نواحی قابل تله‌پورت):

- **رنگ سبز** یا آبی
- **انیمیشن نبض**
- **شکل دایره یا فلش**

#### Invalid Reticle (نواحی غیرقابل تله‌پورت):

- **رنگ قرمز**
- **شکل X یا علامت ممنوع**
- **انیمیشن لرزش**

### تنظیمات XR Ray Interactor

#### پیکربندی Reticle:

| پارامتر             | توصیف          | مثال                |
| ------------------- | -------------- | ------------------- |
| **Valid Reticle**   | Prefab مجاز    | CircleReticle_Green |
| **Invalid Reticle** | Prefab غیرمجاز | XReticle_Red        |
| **Reticle Scale**   | اندازه         | 0.1 - 0.3           |

#### تنظیمات Ray:

Line Type: Projectile Curve
Line Material: TeleportRay_Material  
Line Width: 0.02
Sample Frequency: 20

### انیمیشن و جلوه‌های ویژه

#### Particle Systems:

- **Spawn Effect**: هنگام ظاهر شدن ray
- **Travel Effect**: حین حرکت ray
- **Impact Effect**: هنگام برخورد با سطح

:::tip بهبود UX
از انیمیشن‌های ملایم و رنگ‌های متضاد برای Visual Feedback استفاده کنید.
:::

## بخش ۶: بهینه‌سازی Performance

### تنظیمات Ray Casting

| پارامتر                  | مقدار بهینه        | تأثیر             |
| ------------------------ | ------------------ | ----------------- |
| **Max Raycast Distance** | 10-15 متر          | کاهش محاسبات      |
| **Raycast Mask**         | فقط لایه‌های ضروری | بهبود Performance |
| **Sample Frequency**     | 15-20              | تعادل کیفیت/سرعت  |

### مدیریت حافظه

- **Object Pooling** برای Reticle ها
- **LOD System** برای Visual Effects
- **Culling** اشیاء دور از کاربر

## بخش ۷: رفع مشکلات رایج

### مشکلات Teleportation

| مشکل                       | علت احتمالی    | راه‌حل                       |
| -------------------------- | -------------- | ---------------------------- |
| **Ray نمایش داده نمی‌شود** | Layer غلط      | بررسی Interaction Layer Mask |
| **تله‌پورت کار نمی‌کند**   | Input Action   | بررسی Binding کنترلر         |
| **Reticle نادرست**         | Prefab نامعتبر | جایگزینی Reticle Asset       |

### تست کیفیت

#### Checklist آزمون:

- ✅ تله‌پورت به تمام نقاط مجاز
- ✅ عدم تله‌پورت به نقاط نامناسب
- ✅ Snap Turn در تمام جهات
- ✅ Visual Feedback واضح
- ✅ عدم Motion Sickness

:::caution نکات ایمنی
همیشه Guardian/Chaperone System را فعال نگه دارید تا از برخورد کاربر با اشیاء واقعی جلوگیری شود.
:::

## جمع‌بندی سیستم

### اجزای پیاده‌سازی شده:

| بخش                       | وضعیت | فایده                |
| ------------------------- | ----- | -------------------- |
| **Room Setup**            | ✅    | محیط واقعی‌تر        |
| **Snap Turning**          | ✅    | کاهش Motion Sickness |
| **Teleportation Areas**   | ✅    | انعطاف‌پذیری بالا    |
| **Teleportation Anchors** | ✅    | کنترل دقیق           |
| **Visual Feedback**       | ✅    | تجربه بهتر           |
