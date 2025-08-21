---
sidebar_position: 9

title: تعامل با اشیا (Grabbable Objects)
---

# راهنمای جامع Grabbable Objects در Unity XR

سیستم Grabbable Objects امکان تعامل فیزیکی کاربر با محیط مجازی را فراهم می‌کند و یکی از بنیادی‌ترین اجزای تجربه VR محسوب می‌شود.

:::info منابع یادگیری

- **آموزش Unity**: [Grabbable Objects Tutorial](https://learn.unity.com/pathway/vr-development/unit/vr-basics/tutorial/grabbable-objects?version=2022.3)
- **راه‌حل چالش‌ها**: [کانال YouTube](https://www.youtube.com/@garlicsuter)
  :::

## بخش ۱: مدل‌های دست (Hand Models)

### اهمیت مدل‌های دست در VR

- **بازخورد بصری** طبیعی برای کاربر
- **افزایش احساس حضور** در محیط مجازی
- **نمایش دقیق** حالات تعامل

### تنظیم XR Direct Interactor

#### مراحل پیکربندی:

1. **انتخاب مدل دست**:
   XR Direct Interactor > Model Parent > Hand Model

2. **تنظیمات کلیدی**:

| پارامتر            | تنظیم         | کاربرد        |
| ------------------ | ------------- | ------------- |
| **Hand Tracking**  | ✅ فعال       | ردیابی حرکت   |
| **Hand Animation** | Grab/Release  | انیمیشن طبیعی |
| **Model Prefab**   | DefaultXRHand | مدل پیش‌فرض   |

### سفارشی‌سازی Hand Poses

#### انواع Pose های مهم:

| نوع Pose       | کاربرد                 | مثال       |
| -------------- | ---------------------- | ---------- |
| **Grip Pose**  | گرفتن اشیاء استوانه‌ای | چکش، بطری  |
| **Pinch Pose** | گرفتن اشیاء کوچک       | سکه، دکمه  |
| **Palm Pose**  | نگه‌داری اشیاء تخت     | کتاب، تبلت |

:::tip بهبود تجربه
برای هر شیء، Hand Pose مخصوصی تعریف کنید تا تعامل طبیعی‌تر شود.
:::

## بخش ۲: ایجاد اشیاء قابل گرفتن

### پیش‌نیازهای فنی

هر Grabbable Object نیاز به اجزای زیر دارد:

#### Component های ضروری:

```
GameObject:
├── XR Grab Interactable
├── Rigidbody
└── Collider (Box/Sphere/Mesh)
```

### تنظیم XR Grab Interactable

#### پارامترهای اصلی:

| تنظیم               | مقدار             | توضیح             |
| ------------------- | ----------------- | ----------------- |
| **Movement Type**   | Velocity Tracking | حرکت طبیعی        |
| **Track Position**  | ✅                | دنبال کردن موقعیت |
| **Track Rotation**  | ✅                | دنبال کردن چرخش   |
| **Smooth Position** | ✅                | حرکت نرم          |
| **Smooth Rotation** | ✅                | چرخش نرم          |

#### انواع Movement Type:

| حالت                  | ویژگی       | مناسب برای    |
| --------------------- | ----------- | ------------- |
| **Kinematic**         | حرکت فوری   | UI Elements   |
| **Velocity Tracking** | حرکت فیزیکی | اشیاء معمولی  |
| **Instantaneous**     | حرکت آنی    | ابزارهای دقیق |

### تنظیمات Interaction Layer

Interaction Layer Mask: Default, Grab

:::caution نکته مهم
همیشه Interaction Layer Mask را بررسی کنید تا Interactor ها بتوانند با شیء تعامل کنند.
:::

## بخش ۳: مدیریت نمایش دست‌ها

### مخفی کردن خودکار

هنگام گرفتن شیء، مدل دست باید مخفی شود تا تداخل بصری جلوگیری شود.

#### تنظیمات Hide Controller:

```
XR Grab Interactable:
├── Hide Controller On Select: ✅
├── Hide Controller Material: Transparent
└── Hide Controller Delay: 0.1s
```

### مدیریت Anchor Control

#### غیرفعال کردن Teleportation:

| Event              | Action                 | هدف                 |
| ------------------ | ---------------------- | ------------------- |
| **Select Entered** | Disable Ray Interactor | جلوگیری از تله‌پورت |
| **Select Exited**  | Enable Ray Interactor  | بازگشت عملکرد       |

:::info کنترل پیشرفته
از Unity Events برای کنترل دقیق‌تر رفتار سیستم استفاده کنید.
:::

## بخش ۴: سیستم پرتاب (Throwing)

### فیزیک پرتاب واقعی

#### تنظیمات Throw On Detach:

```
XR Grab Interactable:
├── Throw On Detach: ✅
├── Throw Velocity Scale: 1.5
├── Throw Angular Velocity Scale: 1.0
├── Force Gravity On Detach: ✅
```

### پارامترهای تنظیم دقیق

| پارامتر                      | مقدار پیشنهادی | تأثیر           |
| ---------------------------- | -------------- | --------------- |
| **Velocity Samples**         | 5-10           | دقت محاسبه سرعت |
| **Angular Velocity Samples** | 5-10           | دقت چرخش        |
| **Throw Smoothing**          | 0.1-0.3        | نرمی پرتاب      |

### Physics Material

برای پرتاب بهتر، Physics Material مناسب اضافه کنید:

```
Physics Material:
├── Dynamic Friction: 0.6
├── Static Friction: 0.8
├── Bounciness: 0.3
└── Bounce Combine: Average
```

:::tip بهینه‌سازی
Velocity Scale را بر اساس وزن و اندازه شیء تنظیم کنید.
:::

## بخش ۵: اشیاء با دسته

### مفهوم Attach Transform

برای اشیائی با دسته‌های مشخص، نقطه اتصال دقیق ضروری است.

![تنظیم Attach Transform](./img/9-Grabbable-Objects-1.avif)

#### ایجاد Attach Point:

```
Tool GameObject:
├── Handle (Empty GameObject) ← Attach Transform
├── Mesh Renderer
├── Collider
└── XR Grab Interactable
```

### Multiple Attach Transforms

برای ابزارهای پیچیده:

| نوع گرفتن          | موقعیت      | استفاده     |
| ------------------ | ----------- | ----------- |
| **Primary Grip**   | انتهای دسته | گرفتن اصلی  |
| **Secondary Grip** | وسط ابزار   | کنترل دوم   |
| **Guard Grip**     | محافظ دست   | گرفتن دفاعی |

### Two-Handed Interaction

برای اشیاء بزرگ:

Select Mode: Multiple
Max Interactors Selecting: 2

:::info کاربرد دو دستی
برای شمشیرها، چکش‌های بزرگ، و ابزارهای سنگین مناسب است.
:::

## بخش ۶: سازماندهی پروژه

### ساختار Hierarchy

```
Scene:
├── Grabbable Objects
│ ├── Tools
│ │ ├── Hammer
│ │ ├── Screwdriver
│ │ └── Wrench
│ ├── Containers
│ │ ├── Box
│ │ ├── Bottle
│ │ └── Cup
│ └── Electronics
│ ├── Phone
│ ├── Remote
│ └── Tablet
```

### Layer Organization

| Layer                | محتوا             | استفاده |
| -------------------- | ----------------- | ------- |
| **Grabbable**        | اشیاء قابل گرفتن  | اصلی    |
| **GrabbableUI**      | عناصر رابط کاربری | ثانویه  |
| **GrabbablePhysics** | اشیاء فیزیکی      | پیشرفته |

### Prefab Management

#### ایجاد Prefab Library:

```
Assets/Prefabs/Grabbables/
├── BasicShapes/
├── Tools/
├── Furniture/
├── Electronics/
└── CustomObjects/
```

:::tip مدیریت
از Variant Prefab ها برای اشیاء مشابه با تفاوت‌های جزئی استفاده کنید.
:::

## بخش ۷: Events و Programming

### Unity Events مهم

| Event              | زمان فراخوانی | کاربرد       |
| ------------------ | ------------- | ------------ |
| **Select Entered** | شروع گرفتن    | صدا، انیمیشن |
| **Select Exited**  | پایان گرفتن   | بازگشت حالت  |
| **Activate**       | فعال‌سازی     | عملکرد ویژه  |
| **Deactivate**     | غیرفعال‌سازی  | توقف عملکرد  |

### نمونه کد Manager:

```csharp
public class GrabbableManager : MonoBehaviour
{
    [Header("Statistics")]
    public int totalGrabs = 0;
    public int currentGrabbedObjects = 0;

    public void OnObjectGrabbed()
    {
        totalGrabs++;
        currentGrabbedObjects++;
    }

    public void OnObjectReleased()
    {
        currentGrabbedObjects--;
    }
}
```

## بخش ۸: بهینه‌سازی Performance

### تنظیمات Rigidbody

| پارامتر          | مقدار بهینه | دلیل         |
| ---------------- | ----------- | ------------ |
| **Mass**         | 0.1-2.0     | کنترل سنگینی |
| **Drag**         | 1-5         | مقاومت هوا   |
| **Angular Drag** | 5-10        | مقاومت چرخشی |

### Collider Optimization

- **Primitive Collider ها** بر **Mesh Collider** ارجحیت دارند
- **Convex Mesh** برای Mesh Collider های پیچیده
- **Compound Collider** برای اشکال پیچیده

:::caution هشدار Performance
از Mesh Collider های Non-Convex برای Grabbable Object ها استفاده نکنید.
:::

## جمع‌بندی سیستم

### اجزای پیاده‌سازی شده:

| بخش                | وضعیت | فایده           |
| ------------------ | ----- | --------------- |
| **Hand Models**    | ✅    | بازخورد بصری    |
| **Grab Mechanics** | ✅    | تعامل پایه      |
| **Throw Physics**  | ✅    | فیزیک واقعی     |
| **Handle Support** | ✅    | ابزارهای پیچیده |
| **Organization**   | ✅    | مدیریت پروژه    |
