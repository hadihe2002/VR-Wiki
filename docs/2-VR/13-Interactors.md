---
sidebar_position: 13
title: نحوه‌ی تعامل با اشیا (Direct & Ray Interactors)
---

# راهنمای جامع تعامل‌گرهای مستقیم و پرتویی در Unity VR

سیستم **Interactors** در Unity XR Interaction Toolkit هسته اصلی تجربه تعاملی کاربران در محیط واقعیت مجازی محسوب می‌شود و شامل دو رویکرد بنیادی Direct و Ray Interaction است.

:::info منابع یادگیری تخصصی

- **آموزش رسمی Unity**: [Direct and Ray Interactors Tutorial](https://learn.unity.com/pathway/vr-development/unit/events-and-interactions/tutorial/2-3-direct-and-ray-interactors?version=2022.3)
- **راه‌حل‌های عملی**: [کانال آموزشی YouTube](https://www.youtube.com/@garlicsuter)
  :::

## مبانی نظری Interaction Systems

### تعریف و طبقه‌بندی Interactors

XR Interaction Toolkit بر اساس معماری مدولار طراحی شده که دو نوع اصلی تعامل‌گر را پشتیبانی می‌کند:

#### **XR Direct Interactor** (تعامل‌گر مستقیم)

نوعی تعامل‌گر است که بر پایه **فیزیک تماس مستقیم** عمل می‌کند و برای شبیه‌سازی تعاملات طبیعی دست انسان در فضای نزدیک طراحی شده است. این سیستم از **Sphere Collider Detection** استفاده می‌کند و امکان گرفتن، هل دادن و دستکاری مستقیم اشیا را فراهم می‌آورد.

#### **XR Ray Interactor** (تعامل‌گر پرتویی)

مکانیسمی است که بر اساس **Raycast Technology** کار می‌کند و امکان تعامل از راه دور با اشیا را فراهم می‌آورد. این سیستم مشابه **laser pointer** عمل کرده و برای تعامل با اشیا در فواصل دور، رابط‌های کاربری، و کنترل دستگاه‌های پیچیده مناسب است.

### اصول معماری تعاملی

**Priority Management System**: هر دو نوع تعامل‌گر می‌توانند به طور همزمان روی یک کنترلر فعال باشند، اما سیستم اولویت‌بندی تعیین می‌کند کدام تعامل در هر لحظه غالب باشد.

**Layer-Based Interaction**: استفاده از Unity Layer System برای تعیین اینکه کدام اشیا با کدام نوع تعامل‌گر قابل تعامل هستند.

## پیکربندی پیشرفته Direct Interactor

### تنظیمات هسته‌ای

Direct Interactor برای **تعاملات هپتیک** و تجربه لمسی طراحی شده و نیازمند تنظیمات دقیق زیر است:

#### **Attach Transform Configuration**

این پارامتر **موقعیت نسبی** و **چرخش** شیء گرفته شده نسبت به کنترلر را تعیین می‌کند:

- **Position Offset**: تعیین فاصله شیء از مرکز کنترلر
- **Rotation Offset**: زاویه قرارگیری شیء در دست
- **Scale Compatibility**: نحوه تطبیق اندازه شیء با دست

#### **Collision Detection System**

سیستم تشخیص برخورد Direct Interactor شامل:

- **Trigger Collider**: برای شناسایی اشیا در محدوده دست
- **Contact Distance**: حداکثر فاصله برای شروع تعامل
- **Hand Tracking Integration**: تطبیق با سیستم‌های ردیابی دست

#### **گزینه‌های پیشرفته**

- **Force Grab**: امکان کشیدن اشیا از فاصله کوتاه به دست
- **Hand Pose Matching**: تطبیق شکل دست با هندسه شیء
- **Physics Integration**: یکپارچگی با سیستم فیزیک Unity
- **Multi-Hand Support**: پشتیبانی از تعامل با دو دست همزمان

### بهینه‌سازی Performance

```csharp
// مثال تنظیم Direct Interactor
public class OptimizedDirectInteractor : XRDirectInteractor
{
    [Header("Performance Settings")]
    public LayerMask interactionLayers;
    public float maxInteractionDistance = 0.1f;

    protected override void OnTriggerStay(Collider other)
    {
        // بهینه‌سازی با محدود کردن بررسی‌های غیرضروری
        if (IsLayerInMask(other.gameObject.layer, interactionLayers))
        {
            base.OnTriggerStay(other);
        }
    }
}
```

## طراحی سیستم Ray Interactor

### مفاهیم بنیادی Ray Casting

Ray Interactor بر پایه **الگوریتم Raycast** Unity عمل می‌کند و شامل عناصر زیر است:

#### **Line Rendering System**

- **Visual Ray**: نمایش بصری پرتو با استفاده از Line Renderer
- **Dynamic Color**: تغییر رنگ بر اساس وضعیت تعامل
- **Curve Support**: امکان پرتو خمیده برای تعاملات پیچیده
- **Transparency Effects**: جلوه‌های شفافیت برای بهبود UX

#### **Hit Detection Algorithm**

```csharp
// الگوریتم تشخیص برخورد Ray
public class AdvancedRayInteractor : XRRayInteractor
{
    [Header("Ray Configuration")]
    public float maxRaycastDistance = 10f;
    public AnimationCurve falloffCurve;

    protected override bool TryGetRaycastHit(out RaycastHit raycastHit)
    {
        // پیاده‌سازی ray casting بهینه شده
        return Physics.Raycast(
            transform.position,
            transform.forward,
            out raycastHit,
            maxRaycastDistance,
            raycastMask
        );
    }
}
```

### ویژگی‌های پیشرفته Ray System

#### **Adaptive Ray Length**

سیستم تنظیم خودکار طول پرتو بر اساس:

- فاصله تا نزدیک‌ترین مانع
- نوع شیء هدف
- سرعت حرکت کنترلر
- تراکم اشیا در صحنه

#### **Multi-Sample Ray Casting**

برای دقت بالاتر در تشخیص:

- **Primary Ray**: پرتو اصلی
- **Secondary Rays**: پرتوهای فرعی برای coverage بهتر
- **Temporal Sampling**: نمونه‌برداری در زمان‌های مختلف

<video width="620" controls>
  <source src="/13-Interactors.mp4" type="video/mp4" />
</video>

## مدیریت هوشمند تداخل Interactors

### الگوریتم Priority Management

سیستم مدیریت اولویت بر اساس معیارهای زیر عمل می‌کند:

#### **Distance-Based Priority**

```csharp
public class InteractionPriorityManager : MonoBehaviour
{
    public float directInteractionThreshold = 0.2f;

    void Update()
    {
        float distanceToNearestObject = GetNearestInteractableDistance();

        if (distanceToNearestObject < directInteractionThreshold)
        {
            EnableDirectInteractor();
            DisableRayInteractor();
        }
        else
        {
            DisableDirectInteractor();
            EnableRayInteractor();
        }
    }
}
```

#### **Context-Sensitive Switching**

- **Object Type**: نوع شیء تعیین‌کننده نوع تعامل
- **Interaction History**: تاریخچه تعاملات کاربر
- **Environmental Factors**: عوامل محیطی مؤثر بر تصمیم‌گیری

### پیاده‌سازی Hybrid System

#### **Smart Mode Detection**

سیستم تشخیص هوشمند حالت تعامل:

- تحلیل وضعیت دست کاربر
- بررسی محتوای صحنه
- پیش‌بینی نیت کاربر

#### **Seamless Transition**

```csharp
public class HybridInteractionController : MonoBehaviour
{
    [Header("Transition Settings")]
    public float transitionDuration = 0.3f;
    public AnimationCurve transitionCurve;

    IEnumerator SmoothTransition(InteractionType from, InteractionType to)
    {
        float elapsed = 0f;

        while (elapsed < transitionDuration)
        {
            float progress = transitionCurve.Evaluate(elapsed / transitionDuration);
            ApplyTransitionEffect(from, to, progress);
            elapsed += Time.deltaTime;
            yield return null;
        }
    }
}
```

## بهینه‌سازی Ray Casting Performance

### الگوریتم‌های بهینه‌سازی

#### **Temporal Ray Casting**

```csharp
public class OptimizedRaycastManager : MonoBehaviour
{
    private Queue<RaycastRequest> raycastQueue;
    private int maxRaycastsPerFrame = 5;

    void Update()
    {
        ProcessRaycastQueue();
    }

    void ProcessRaycastQueue()
    {
        int processed = 0;
        while (raycastQueue.Count > 0 && processed < maxRaycastsPerFrame)
        {
            var request = raycastQueue.Dequeue();
            ExecuteRaycast(request);
            processed++;
        }
    }
}
```

#### **Spatial Partitioning**

- استفاده از **Octree** برای تقسیم‌بندی فضایی
- **Frustum Culling** برای حذف اشیا خارج از دید
- **Distance-Based LOD** برای تنظیم quality

#### **Multi-Threading Support**

```csharp
public class AsyncRaycastSystem : MonoBehaviour
{
    private JobHandle raycastJob;

    void ScheduleRaycastJobs()
    {
        var raycastCommands = new NativeArray<RaycastCommand>(
            raycastCount, Allocator.TempJob
        );

        raycastJob = RaycastCommand.ScheduleBatch(
            raycastCommands, results, batchSize
        );
    }
}
```

## سیستم‌های Feedback پیشرفته

### طراحی Multi-Modal Feedback

#### **Haptic Feedback Integration**

```csharp
public class AdvancedHapticFeedback : MonoBehaviour
{
    [Header("Haptic Patterns")]
    public HapticPattern directGrabPattern;
    public HapticPattern rayHoverPattern;
    public HapticPattern selectionConfirmPattern;

    public void TriggerContextualHaptic(InteractionType type, float intensity)
    {
        var pattern = GetPatternForInteraction(type);
        pattern.amplitude *= intensity;
        XRHapticInterface.SendHapticImpulse(pattern);
    }
}
```

#### **Visual Feedback System**

- **Progressive Highlighting**: تدریجی روشن شدن اشیا
- **Dynamic Cursor**: تغییر شکل cursor بر اساس context
- **Particle Effects**: جلوه‌های ذرات برای emphasis
- **UI Animation**: انیمیشن‌های رابط کاربری

#### **Audio Feedback Architecture**

```csharp
public class SpatialAudioFeedback : MonoBehaviour
{
    [Header("Audio Configuration")]
    public AudioSource spatialAudioSource;
    public AudioMixerGroup interactionMixer;

    public void PlayContextualAudio(InteractionEvent interactionEvent)
    {
        var clip = GetAudioClipForEvent(interactionEvent);
        spatialAudioSource.PlayOneShot(clip, CalculateVolumeBasedOnDistance());
    }
}
```

## Case Studies و کاربردهای صنعتی

### کاربردهای آموزشی

- **شبیه‌سازی آزمایشگاه**: ترکیب Direct برای دستکاری ابزار و Ray برای کنترل تجهیزات
- **آموزش جراحی**: Direct برای دستکاری بافت و Ray برای navigation
- **معماری و ساختمان**: Ray برای navigation فضایی و Direct برای تغییر جزئیات

### صنایع سنگین

- **کنترل ماشین‌آلات**: Ray برای کنترل از راه دور و Direct برای تنظیمات دقیق
- **نگهداری و تعمیرات**: Hybrid approach برای دسترسی به قطعات در فضاهای محدود

## رفع مشکلات متداول

### مشکلات Direct Interactor

- **Object Sticking**: حل با تنظیم صحیح Release Threshold
- **Hand Collision**: استفاده از Ignore Collision در موارد ضروری
- **Physics Interference**: تنظیم Mass و Drag مناسب

### مشکلات Ray Interactor

- **Ray Flickering**: پیاده‌سازی Temporal Smoothing
- **Performance Issues**: محدود کردن Raycast Frequency
- **Inaccurate Selection**: بهبود Cursor Positioning Algorithm
