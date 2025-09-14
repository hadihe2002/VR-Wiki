# 05 — ساخت اولین صحنهٔ AR (گام‌به‌گام)
> هدف این فصل: در کمترین زمان، یک صحنهٔ پایهٔ AR بسازید که روی دستگاه واقعی اجرا می‌شود—با **قراردهی یک شیء ساده روی Plane**، **نشانک (Reticle)**، و **Anchor** برای پایداری. همه‌چیز عمومی است و به اپلیکیشن خاصی ارجاع نمی‌دهد.

- **چکیده:** اجزای اصلی صحنهٔ AR شما عبارت‌اند از **AR Session**، **AR Session Origin + AR Camera** و چند **Manager** (Raycast/Plane/Anchor). با Tap کاربر، Raycast می‌زنیم، نقطهٔ معتبر پیدا می‌کنیم، یک Anchor می‌سازیم و Prefab را آنجا قرار می‌دهیم. برای بازخورد، یک Reticle سبک نمایش می‌دهیم.

---

## 1) پیش‌نیازهای فوری (مرور)
- Unity 2022 LTS + پکیج‌های فصل 04 نصب باشد (AR Foundation 5.x، ARCore/ARKit، XR Plugin Management، Input System، TextMeshPro).
- XR Plugin Management برای پلتفرم هدف شما فعال شده باشد.
- یک دستگاه آزمایشی واقعی (Android یا iOS) در دسترس باشد.

---

## 2) ساخت صحنه: سلسله‌مراتب پیشنهادی
**Hierarchy پیشنهادی:**

```mermaid
flowchart TD
  A[AR Session]
  B[AR Session Origin]
  C[AR Camera]
  D[Managers]
  E[UI Canvas (Overlay)]
  F[Reticle (Prefab)]
  B --> C
  B --> D
  D -->|"ARRaycastManager"| D1[Raycast]
  D -->|"ARPlaneManager"| D2[Plane]
  D -->|"ARAnchorManager"| D3[Anchor]
  C -.->|"Camera Feed"| E
  E -->|"Buttons/Help"| E1[Help Text]
  B -->|"Child in runtime"| F
```

**جدول نقش اجزا**

| جزء | نقش | نکته |
|---|---|---|
| AR Session | چرخهٔ حیات تجربهٔ AR | شروع/توقف/بررسی پشتیبانی |
| AR Session Origin | تبدیل بین فضای AR و محتوای شما | والد AR Camera و Managers |
| AR Camera | دوربین با جریان AR | می‌تواند Light Estimation داشته باشد |
| ARRaycastManager | Raycast به Plane/نقاط | برای Tap/Reticle |
| ARPlaneManager | کشف و تجسم Planeها | در دموی نخست روشن بماند |
| ARAnchorManager | ایجاد Anchor پایدار | محتوای ثابت را Child کنید |
| UI Canvas | متن راهنما/دکمه‌ها | Scale With Screen Size |

---

## 3) تنظیم صحنه در یونیتی (قدم‌به‌قدم)
1. در **Hierarchy**:
   - GameObject → **XR → AR Session**
   - GameObject → **XR → AR Session Origin** (زیرمجموعه‌اش **AR Camera** ایجاد می‌شود)
2. روی **AR Session Origin** کامپوننت‌های زیر را اضافه کنید:
   - **ARRaycastManager**
   - **ARPlaneManager**
   - **ARAnchorManager**
3. (اختیاری) برای نمایش نقاط شاخص: **ARPointCloudManager**.
4. یک **Canvas** بسازید (Screen Space - Overlay) و **Canvas Scaler** را روی *Scale With Screen Size* قرار دهید؛ یک TextMeshPro برای راهنمای کوتاه اضافه کنید.
5. پوشهٔ `Prefabs/` بسازید و دو Prefab اضافه کنید:
   - **Reticle**: یک Quad کوچک با متریال ساده، یا یک آیکون تخت. Scale کوچک (مثلاً 0.05).
   - **PlaceableObject**: یک Cube سبک با متریال خنثی.

---

## 4) اسکریپت نشانک (Reticle): ردگیری مداومِ نقطهٔ قابل‌قراردهی
این اسکریپت روی یک GameObject خالی (مثلاً `ReticleController`) قرار می‌گیرد؛ Prefab Reticle را از Inspector وصل کنید.

```csharp
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

public class ReticleController : MonoBehaviour
{
    public ARRaycastManager raycastManager;
    public GameObject reticlePrefab;
    public TrackableType trackables = TrackableType.PlaneWithinPolygon;
    public float reticleYOffset = 0.0f;

    static readonly List<ARRaycastHit> hits = new();

    GameObject _reticleInstance;

    void Start()
    {
        _reticleInstance = Instantiate(reticlePrefab);
        _reticleInstance.SetActive(false);
    }

    void Update()
    {
        Vector2 screenPoint = new Vector2(Screen.width / 2f, Screen.height / 2f);
        if (raycastManager.Raycast(screenPoint, hits, trackables))
        {
            var pose = hits[0].pose;
            _reticleInstance.SetActive(true);
            _reticleInstance.transform.SetPositionAndRotation(
                pose.position + Vector3.up * reticleYOffset, pose.rotation);
        }
        else
        {
            _reticleInstance.SetActive(false);
        }
    }
}
```

> اگر می‌خواهید Reticle بر اساس زاویهٔ سطح «سبز/قرمز» شود، زاویهٔ نرمال سطح با محور جهانی را چک کنید.

---

## 5) اسکریپت Tap → Anchor → قراردهی Prefab
این اسکریپت روی یک GameObject خالی (مثلاً `TapToPlace`) قرار می‌گیرد. Prefab قابل‌قراردهی، RaycastManager و AnchorManager را وصل کنید.

```csharp
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

public class TapToPlace : MonoBehaviour
{
    public GameObject placeablePrefab;
    public ARRaycastManager raycastManager;
    public ARAnchorManager anchorManager;

    static readonly List<ARRaycastHit> hits = new();

    void Update()
    {
#if UNITY_EDITOR
        if (Input.GetMouseButtonDown(0))
            TryPlace(Input.mousePosition);
#else
        if (Input.touchCount > 0 && Input.touches[0].phase == TouchPhase.Began)
            TryPlace(Input.touches[0].position);
#endif
    }

    void TryPlace(Vector2 screenPoint)
    {
        if (!raycastManager.Raycast(screenPoint, hits, TrackableType.PlaneWithinPolygon))
            return;

        var hit = hits[0];
        var plane = hit.trackable as ARPlane;
        if (plane == null) return;

        // Anchor پایدار روی همان Plane
        var anchor = anchorManager.AttachAnchor(plane, hit.pose);
        if (anchor == null) return;

        Instantiate(placeablePrefab, anchor.transform);
    }
}
```

نکات:
- با `AttachAnchor` محتوای شما به Plane قفل می‌شود؛ در نتیجه با تغییرات جزئی Tracking «سر نمی‌خورد».
- اگر می‌خواهید جابه‌جایی/حذف داشته باشید، به‌جای Instantiate مکرر، از **Object Pooling** و مدیریت Anchorها استفاده کنید.

---

## 6) تجسم Planeها و نقاط شاخص (اختیاری ولی مفید)
- روی **ARPlaneManager** فیلد «Plane Prefab» را به یک Prefab سبک وصل کنید (رنگ ملایم + شفافیت کم).
- (اختیاری) **ARPointCloudManager** را اضافه کنید و برای نمایش نقاط از Particles سبک استفاده کنید.

> پس از آنکه کاربر مکان را انتخاب کرد، می‌توانید Visualization را خاموش کنید تا صحنه تمیزتر شود.

---

## 7) نور و برآورد روشنایی (اختیاری)
برای طبیعی‌تر شدن، روی **AR Camera** کامپوننت **ARCameraManager** را اضافه و گزینهٔ **Light Estimation** را فعال کنید. سپس یک اسکریپت ساده شدت نور را روی متریال/نور صحنه اعمال کند. این کار اختیاری است و برای نمونهٔ ساده ضروری نیست.

---

## 8) UI راهنما و قابلیت دسترسی
- یک متن ۱–۲ خطی با وضعیت «Tap کنید تا قرار دهید» یا «سطح قابل‌تشخیص نیست—نور را بهبود دهید» نمایش دهید.
- اندازهٔ متن ≥ 16sp، دکمه‌ها ≥ 44dp، کنتراست بالا.
- اگر زبان RTL (راست‌به‌چپ) دارید، از TextMeshPro با پشتیبانی RTL استفاده کنید.

---

## 9) تست روی دستگاه: چک‌لیست سریع
- [ ] **Plane**ها در محیط بافت‌دار به‌خوبی ظاهر می‌شوند.
- [ ] Reticle روی سطح معتبر دیده می‌شود (مرکز صفحه).
- [ ] با **Tap**، Prefab دقیقاً روی سطح قرار می‌گیرد و **پایدار** می‌ماند.
- [ ] با حرکت دستگاه، شیء «نمی‌لغزد/نمی‌پرد» (Anchor کار می‌کند).
- [ ] FPS قابل‌قبول است (۳۰+ روی میان‌رده‌ها).

**نکتهٔ محیطی:** نور خیلی کم/شدید یا سطوح براق/شفاف می‌تواند تشخیص را مختل کند؛ روی سطوح مات تست کنید.

---

## 10) بهینه‌سازی‌های کوچک اما مؤثر
- Prefabها را **سبک** نگه دارید (Polygon کم، بدون سایه‌های سنگین).
- از شفافیت زیاد پرهیز کنید؛ باعث Draw Call و هزینهٔ Blending می‌شود.
- Instantiate مکرر را کم کنید؛ در صورت نیاز **Pooling** اضافه کنید.
- Visualizationهای اضافی را پس از قراردهی خاموش کنید.

---

## 11) خطاهای رایج و رفع سریع
| نشانه | علت محتمل | راهکار سریع |
|---|---|---|
| Reticle دیده نمی‌شود | Raycast به نوع اشتباه/سطح نیست | TrackableType را روی PlaneWithinPolygon بگذارید |
| Tap کار نمی‌کند | Referenceها ست نشده | فیلدهای Inspector را پر کنید (Managers/Prefabs) |
| شیء می‌لغزد/جابه‌جا می‌شود | Anchor استفاده نشده | از AnchorManager.AttachAnchor استفاده کنید |
| FPS پایین | Prefab سنگین/Visualization زیاد | Prefab ساده‌تر؛ Visualization خاموش |
| Plane ظاهر نمی‌شود | نور/بافت نامناسب | نور یکنواخت بیشتر؛ سطح مات/دارای بافت |

---

## 12) الگوی پوشه‌ها برای این فصل (پیشنهادی)
```
Assets/
  Scripts/
    AR/
      ReticleController.cs
      TapToPlace.cs
  Prefabs/
    Reticle.prefab
    PlaceableObject.prefab
  Materials/
    Reticle.mat
    PlaneViz.mat
  Scenes/
    ARBasic.unity
```

---

## 13) نکات کلیدی فصل
- الگوی «**Raycast → Anchor → Place**» را ملکهٔ ذهن کنید؛ این پایهٔ اکثر سناریوهای AR است.
- **Reticle** به کاربر اطمینان می‌دهد که مکان مناسبی انتخاب شده است.
- Visualization را برای کشف بهتر روشن کنید، اما برای عملکرد/پاکیزگی نهایی می‌توانید خاموشش کنید.
- همیشه روی **دستگاه واقعی** تست کنید؛ Play Mode معیار دقیقی برای AR نیست.
