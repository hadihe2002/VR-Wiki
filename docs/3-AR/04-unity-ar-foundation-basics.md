# 04 — مقدمات Unity برای AR (AR Foundation 5.x)
> این فصل قدم‌به‌قدم شما را از نصب Unity 2022 LTS تا ساخت یک پروژهٔ تمیزِ سازگار با AR Foundation 5.x جلو می‌برد—بدون ارجاع به هیچ اپلیکیشن یا دامنهٔ خاص. خروجی فصل: یک پروژهٔ آمادهٔ «صحنهٔ AR پایه» که روی دستگاه اجرا می‌شود.

- **چکیده:** با نصب درست Unity + پکیج‌ها، فعال‌سازی XR Plugin Management، تنظیم Player Settings (IL2CPP/ARM64)، و افزودن اجزای اصلی AR (ARSession/ARSessionOrigin/AR Camera/Managers)، می‌توانید یک نمونهٔ سادهٔ AR را روی دستگاه اجرا کنید.
- **پس از مطالعه:** می‌توانید پروژه بسازید، پکیج‌ها را نصب کنید، صحنهٔ پایهٔ AR را آماده کنید و برای Android (و iOS اختیاری) بیلد بگیرید.

---

## 1) نصب Unity 2022 LTS و مؤلفه‌ها
### 1.1 Unity Hub
- آخرین نسخهٔ **Unity 2022 LTS (سری 2022.3.x)** را از طریق Unity Hub نصب کنید.

### 1.2 مؤلفه‌های نصب (پیشنهادی)
- **Android Build Support** (+ **Android SDK & NDK Tools** + **OpenJDK**).
- (اختیاری برای iOS) **iOS Build Support** (نیازمند macOS + Xcode).
- **Mono/IL2CPP** هر دو نصب شوند (برای Editor و بیلد).

> اگر از قبل نصب کرده‌اید اما Android SDK/NDK ندارید، می‌توانید از Hub → Installs → سه‌نقطه → Add Modules اضافه کنید.

---

## 2) ساخت پروژهٔ تمیز
- **Template:** 3D (URP یا Built-in؛ برای شروع Built-in ساده‌تر است).
- **اسم و مسیر:** فقط حروف لاتین/اعداد (از فواصل و کاراکترهای خاص پرهیز کنید).

پروژه که باز شد:
- Window → **Package Manager** را باز کنید.

---

## 3) نصب پکیج‌های ضروری
در Package Manager (Unity Registry):
- **AR Foundation** (نسخهٔ 5.x)
- **ARCore XR Plugin** (برای Android) — 5.x
- **(اختیاری iOS)** **ARKit XR Plugin** — 5.x
- **XR Plugin Management** — 4.x
- **Input System** — 1.x
- **TextMeshPro** (معمولاً از قبل هست؛ اگر نبود فعال کنید)
- (پیشنهادی) **Newtonsoft Json** — برای کار راحت با JSON

> اگر تمایل دارید به‌صورت دستی تنظیم کنید، بخشی از `Packages/manifest.json` می‌تواند شبیه زیر باشد (نسخه‌ها نمونه‌اند):
```json
{
  "dependencies": {
    "com.unity.xr.arfoundation": "5.0.0",
    "com.unity.xr.arcore": "5.0.0",
    "com.unity.xr.arkit": "5.0.0",
    "com.unity.xr.management": "4.4.0",
    "com.unity.inputsystem": "1.7.0",
    "com.unity.textmeshpro": "3.0.6",
    "com.unity.nuget.newtonsoft-json": "3.2.1"
  }
}
```

---

## 4) فعال‌سازی XR Plugin Management
- Edit → **Project Settings** → **XR Plugin Management**
  - **Android**: تیک **ARCore** را بزنید.
  - **iOS** (اختیاری): تیک **ARKit** را بزنید.
- اگر پیغام Restart/Reload داد، تأیید کنید.

> این مرحله «پیوند» بین Unity و قابلیت‌های AR سیستم‌عامل است؛ بدون آن، ردیابی فعال نمی‌شود.

---

## 5) Player Settings (پیکربندی‌های حیاتی)
Edit → **Project Settings** → **Player**

### 5.1 Other Settings (Android)
- **Scripting Backend**: **IL2CPP**
- **Target Architectures**: **ARM64** (فقط ARM64 کافی است)
- **Graphics Jobs**: روشن (در صورت مشکل خاموش کنید)
- **Multithreaded Rendering**: روشن
- **Color Space**: Linear (در Graphics Settings هم قابل تغییر است)
- **Auto Graphics API**: فعال (برای شروع)
- **Minimum API Level**: یک نسخهٔ نسبتاً جدید (مثلاً Android 8/9 یا بالاتر بسته به نیاز)
- **Target API Level**: مقدار توصیه‌شدهٔ Editor (Latest Installed / Highest Supported)
- **Camera Usage Description** (برای iOS ضروری؛ برای اندروید توضیح اختیاری)

### 5.2 Resolution & Presentation
- **Run in Background**: خاموش (برای بهینه‌سازی مصرف)
- **Allowed Orientations**: معمولاً Portrait (یا بر حسب نیاز Landscape)

> در Android → Publishing Settings اگر keystore ساختید، مشخصات امضا را تنظیم کنید (برای نصب خارج از Play لازم است).

---

## 6) ساخت «صحنهٔ AR پایه»
### 6.1 اجزای اصلی
در Hierarchy:
1. **AR Session** (GameObject → XR → AR Session)
2. **AR Session Origin** (GameObject → XR → AR Session Origin)
   - زیرمجموعهٔ آن: **AR Camera** (به‌صورت خودکار ایجاد می‌شود)

### 6.2 مدیرها (Managers)
به **AR Session Origin** یا آبجکت‌های مرتبط اضافه کنید:
- **ARRaycastManager**
- **ARPlaneManager**
- **ARAnchorManager**
- (اختیاری) **ARPointCloudManager** (برای نمایش نقاط شاخص)

### 6.3 تجسم Planeها (Visualization)
برای بازخورد بهتر به کاربر، یک Prefab ساده برای **Plane** بسازید یا از نمونه‌های سبک استفاده کنید (رنگ ملایم + Outline).

> Plane Visualization را در Demo روشن بگذارید تا کاربر سطح‌ها را ببیند؛ بعداً می‌توانید خاموش کنید.

---

## 7) اسکریپت ساده: Tap → Raycast → قراردهی یک Prefab
یک Prefab سادهٔ مکعب (Cube) با متریال سبک بسازید و در پوشهٔ `Prefabs/` قرار دهید. سپس اسکریپت زیر را اضافه کنید:

```csharp
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

public class TapToPlace : MonoBehaviour
{
    public GameObject placePrefab;
    public ARRaycastManager raycastManager;
    static List<ARRaycastHit> s_Hits = new List<ARRaycastHit>();

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
        if (raycastManager.Raycast(screenPoint, s_Hits, TrackableType.PlaneWithinPolygon))
        {
            var hitPose = s_Hits[0].pose;
            Instantiate(placePrefab, hitPose.position, hitPose.rotation);
        }
    }
}
```
- این اسکریپت روی یک GameObject خالی قرار می‌گیرد و مرجع `ARRaycastManager` و `placePrefab` را از Inspector می‌گیرد.
- برای عملکرد بهینه، به‌جای `Instantiate`های مکرر بعدها **Pooling** اضافه کنید.

### 7.1 نشانک (Reticle) اختیاری
برای بازخورد بهتر، یک Reticle کم‌هزینه بسازید که روی محل Raycast ظاهر شود و رنگ/حالت آن بین «قابل/غیرقابل قراردهی» تغییر کند.

---

## 8) بررسی پشتیبانی دستگاه و اجازهٔ دوربین
### 8.1 چک در زمان اجرا (اختیاری اما مفید)
```csharp
using System.Collections;
using UnityEngine;
using UnityEngine.XR.ARFoundation;

public class ARSupportChecker : MonoBehaviour
{
    IEnumerator Start()
    {
        yield return ARSession.CheckAvailability();
        if (ARSession.state == ARSessionState.Unsupported)
        {
            Debug.LogWarning("AR not supported on this device.");
            // پیام مناسب به کاربر نمایش دهید
        }
        else
        {
            // در صورت لازم ARSession را آغاز کنید
            GetComponent<ARSession>()?.enabled.Equals(true);
        }
    }
}
```

### 8.2 مجوز دوربین
- **Android**: Unity به‌صورت خودکار مجوز Camera را اضافه می‌کند؛ اگر Plug-in خاصی استفاده می‌کنید که دستی Permission می‌خواهد، حتماً پیام مناسب به کاربر نشان دهید.
- **iOS**: در Player Settings → iOS → **Camera Usage Description** را با متن روشن تنظیم کنید (بدون آن بیلد رد می‌شود).

---

## 9) آماده‌سازی فونت/زبان (RTL و خوانایی)
- **TextMeshPro** را نصب/فعال کنید؛ فونت‌های SDF با کیفیت بسازید.
- اگر زبان‌های راست‌به‌چپ (RTL) دارید، از بسته‌های سازگار با RTL استفاده کنید.
- **Canvas Scaler**: «Scale With Screen Size»؛ حداقل اندازهٔ لمس ≥ 44dp، متن ≥ 16sp.

> خوانایی و کنتراست را با نور محیط واقعی بسنجید؛ در AR محیط تاریک/روشن تفاوت ایجاد می‌کند.

---

## 10) بیلد روی Android (گام‌به‌گام)
1. File → **Build Settings** → **Android** → **Switch Platform**
2. **Scenes In Build**: صحنهٔ AR پایه را اضافه کنید.
3. **Player Settings** (مرور سریع):
   - Other Settings → IL2CPP/ARM64، Minimum/Target API Level مناسب
   - Graphics APIs Auto (برای شروع)
4. **Build And Run** روی دستگاه متصل (USB Debugging فعال).
5. اگر نصب نشد: از **ADB** لاگ بگیرید (Logcat) و پیام خطا را بررسی کنید.

**خطاهای رایج و راهکار سریع:**
- *Gradle/SDK mismatch*: Android SDK/NDK/Gradle را از Hub نصب کنید و از External سفارشی پرهیز کنید.
- *INSTALL_FAILED_VERSION_DOWNGRADE*: نسخهٔ `Version Code` را افزایش دهید.
- *Camera permission denied*: تنظیمات Permission را بررسی کنید.

---

## 11) (اختیاری) بیلد روی iOS
- Platform را به **iOS** سوییچ کنید.
- Player Settings → Camera Usage Description بنویسید.
- Build → پروژهٔ Xcode تولید می‌شود → در macOS با Xcode روی دستگاه تست امضا/نصب کنید.
- روی iOS واقعی تست کنید (شبیه‌ساز iOS دوربین واقعی ندارد).

---

## 12) عیب‌یابی اولیهٔ صحنهٔ AR
| نشانه | علت محتمل | راهکار |
|---|---|---|
| هیچ Plane دیده نمی‌شود | محیط کم‌بافت/نور نامناسب | نور یکنواخت بیشتر؛ روی سطوح بافت‌دار هدف بگیرید |
| Tap کار نمی‌کند | RaycastManager مرجع ندارد | Script/Inspector را چک کنید؛ TrackableType مناسب |
| اشیا می‌پرند/می‌لغزند | Anchor ندارید/دیر می‌سازید | پس از تایید قراردهی، Anchor اضافه کنید |
| FPS پایین | شفافیت/Outline سنگین | Prefab سبک؛ غیرفعال‌کردن Visualization اضافه |
| نصب روی دستگاه ناموفق | API Level/امضا/SDK | Player Settings و Logcat را بررسی کنید |

---

## 13) الگوی حداقلی پوشه‌ها (پیشنهادی)
```
Assets/
  Scripts/
    AR/           (TapToPlace, ARSupportChecker, ...)
    UI/           (نمایش پیام‌ها/Reticle)
  Prefabs/
    Reticle/
    SimpleCube/
  Materials/
  Fonts/
  Scenes/
    ARBasic.unity
```

---

## 14) چک‌لیست پایان فصل
- [ ] Unity 2022 LTS نصب و Android Build Support فعال است.
- [ ] پکیج‌های AR Foundation/XR Plugins/Input System نصب شده‌اند.
- [ ] XR Plugin Management برای Android (و iOS اختیاری) فعال است.
- [ ] Player Settings: IL2CPP + ARM64 + API Levels مناسب.
- [ ] صحنهٔ پایه با ARSession/Origin/Camera/Managers ساخته شده است.
- [ ] اسکریپت TapToPlace کار می‌کند و روی Plane قراردهی انجام می‌شود.
- [ ] بیلد Android گرفته و روی دستگاه اجرا شده است.

---

## 15) نکات کلیدی فصل
- تنظیم درست **XR Plugin Management** و **Player Settings** شرط لازم اجرای AR است.
- صحنهٔ پایه را **ساده و سبک** نگه دارید؛ بعداً قابلیت‌ها را افزوده کنید.
- از همان ابتدا روی **دستگاه واقعی** تست کنید—Play Mode معیار خوبی برای AR نیست.
- عیب‌یابی را با Logcat/Xcode و «حذف پیچیدگی‌ها» شروع کنید: یک Prefab سبک، یک Raycast، یک روال ساده.
