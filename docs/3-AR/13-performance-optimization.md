# 13 — بهینه‌سازی عملکرد در AR (موبایل، Unity 2022 LTS)
> این فصل یک نقشهٔ عملی برای رسیدن به **۳۰–۶۰ FPS پایدار** در تجربه‌های AR موبایل است—از پروفایلینگ سیستماتیک تا کاهش Draw Call/Overdraw، مدیریت GC/Memory، ساده‌سازی فیزیک و نکات ویژهٔ AR Foundation. مثال‌ها کاملاً **عمومی**‌اند و به اپ خاصی ارجاع نمی‌دهند.

- **چکیده:** عملکرد خوب در AR یعنی تعادل **GPU (رندر)**، **CPU (منطق/فیزیک/AR)**، **حافظه/GC** و **حرارت/باتری**. با یک حلقهٔ پروفایلینگ تکرارشونده و چند «برد سریع» (Quick Win)، اغلب به هدف می‌رسید.
- **پس از مطالعه:** می‌توانید گلوگاه را تشخیص دهید، SRP Batcher/Instancing/Batching را درست به‌کار بگیرید، شفافیت/Outline را مدیریت کنید، Raycast/Managers را Throttle کنید، GC را کاهش دهید و بیلد را برای موبایل تنظیم کنید.

---

## 1) بودجهٔ عملکرد و اهداف
| محور | هدف واقع‌بینانه روی میان‌رده |
|---|---|
| **FPS** | ۳۰–۶۰ پایدار، بدون افت‌های ناگهانی |
| **CPU Render Thread** | < 8–10 ms |
| **GPU Frame** | < 16–20 ms (برای ۵۰–۶۰ FPS) |
| **GC Alloc/frame** | ≈ صفر در مسیرهای داغ |
| **Memory Peak** | متناسب با دستگاه (تست میدانی) |

**نکته:** AR هزینهٔ پایهٔ حسگر/ردیابی را دارد؛ صحنهٔ خود را سبک نگه دارید.

---

## 2) گردش‌کار پروفایلینگ (Loop)
```mermaid
flowchart LR
  A[بازکردن Profiler/Frame Debugger] --> B[تشخیص گلوگاه (CPU/GPU/Memory)]
  B --> C[آزمایش تغییر هدفمند (1 متغیر)]
  C --> D[اندازه‌گیری دوباره]
  D -->|بهبود داشت؟| E[تثبیت تغییر و مستندسازی]
  D -->|نه| B
```
ابزارهای کلیدی:
- **Unity Profiler** (CPU/GPU/GC/Memory)، **Frame Debugger** (Draw Calls/Overdraw)
- **Android Logcat** برای پیام‌ها/ANR
- (اختیاری) ابزارهای GPU دستگاه (AGI/GPU Profiler)

---

## 3) تشخیص: GPU-بسته یا CPU-بسته؟
| نشانه | بیشتر GPU | بیشتر CPU |
|---|---|---|
| Overdraw بالا، شفافیت زیاد، پست‌پروسس سنگین | ✅ | — |
| Draw Calls خیلی زیاد، SetPass زیاد | ✅ | ✅ |
| اسکریپت‌ها/فیزیک/GC زمان‌بر | — | ✅ |
| کاهش FPS با رزولوشن بالاتر | ✅ | — |
| کاهش FPS با اشیای منطقی بیشتر (نه گرافیک) | — | ✅ |

**عمل:** ابتدا با **Frame Debugger** ببینید چند Draw Call دارید و چه چیزی Overdraw ایجاد می‌کند؛ سپس Profiler برای CPU/GC.

---

## 4) رندر: کاهش Draw Call و Overdraw
### 4.1 مواد و Batching
- **یکسان‌سازی متریال‌ها**: هر متریال یکتا = یک SetPass بیشتر.
- **SRP Batcher (URP)**: در **Project Settings → Graphics** فعال باشد؛ Shaderهای سازگار استفاده کنید.
- **GPU Instancing**: برای ده‌ها Mesh یکسان با پارامتر متفاوت (رنگ/مقیاس) → با **MaterialPropertyBlock** رنگ را تغییر دهید بدون ساخت متریال جدید.

```csharp
// تغییر رنگ بدون متریال جدید
static readonly int _ColorId = Shader.PropertyToID("_BaseColor");
var mpb = new MaterialPropertyBlock();
mpb.SetColor(_ColorId, myColor);
renderer.SetPropertyBlock(mpb);
```

- **Static/Dynamic Batching**: برای Meshهای کوچک/ثابت مفید است؛ اما در AR اشیا اغلب پویا هستند.

### 4.2 شفافیت و Outline
- شفافیت دشمن FPS است (Overdraw/Sort). تا می‌توانید **Opaque + Outline** یا **Cutout** استفاده کنید.
- اگر لازم است **Translucent** باشید: **آلفای کم، سطوح هم‌پوشان کم، Render Queue مدیریت‌شده**.
- Outline با **دو-مش کمی بزرگ‌تر** از شیء (ZOffset مناسب) سبک‌تر از Shaderهای سنگین است.

### 4.3 نور، سایه، پست‌پروسس
- **سایهٔ واقعی** را در موبایل حذف یا کمینه کنید؛ به‌جایش **Contact Shadow** (Quad با تکسچر نرم).
- **Post Processing**: حداقل (ToneMapping ساده/Bloom بسیار کم یا هیچ).
- **URP Render Scale**: 0.8–0.9 برای کاهش رزولوشن داخلی اگر GPU محدود است.
- **MSAA**: ×2 یا خاموش؛ شفافیت زیاد باشد MSAA کمک کمی می‌کند.

### 4.4 UI و Overdraw
- **Canvas**‌های کوچک و مجزا بسازید؛ از یک Canvas عظیم تمام‌صفحه پرهیز کنید.
- پس‌زمینه‌های نیمه‌شفاف را حداقل کنید؛ عناصر UI را **clip** کنید.

---

## 5) مش/تکسچر/Asset
- **Proxy سبک** با چندضلعی کم بسازید؛ در فاصلهٔ دور LOD ساده (خاموش‌کردن Outline/Label).
- **Texture Compression**: Android → **ASTC** (کیفیت بهتر/حجم کمتر)، **ETC2** حداقل؛ iOS → ASTC/PNGC.
- **Optimize Mesh Data** (Player Settings): کانال‌های بلااستفادهٔ نرمال/تانجنت/رنگ برداشته شوند.

---

## 6) فیزیک و زمان‌بندی
- **FixedUpdate** را کم‌استفاده کنید؛ فیزیک سنگین مناسب AR موبایل نیست.
- **LayerMask**ها را محدود کنید؛ برخورد/جست‌وجو فقط در لایه‌های ضروری.
- از **OverlapBox/Sphere** با حجم کم و **Throttle** استفاده کنید (نه هر فریم).
- **Time.fixedDeltaTime** را به پیش‌فرض بگذارید مگر دلیل قوی.
- در مسیرهای UI/AR از **Update** با Throttle استفاده کنید.

---

## 7) AR Foundation: نکات بهینه‌سازی
- **Raycast Throttling**: در حالت Preview هر 2–3 فریم؛ در Drag پیوسته.
- **Managers**: فقط مورد نیازها (Plane/Raycast/Anchor). نمایش **Plane/Point Cloud** را پس از انتخاب خاموش کنید.
- **Anchor**‌ها را مدیریت کنید؛ انباشت نکنید. در تغییر Plane، **بازاتصال** منطقی.
- **Light Estimation** را فقط در صورت استفاده فعال کنید.
- **TrackableType** را محدود کنید (مثلاً فقط `PlaneWithinPolygon`).

نمونهٔ Throttle ساده:
```csharp
int _frame;
void Update() {
    _frame++;
    if (_frame % 3 != 0) return; // هر 3 فریم یک بار
    // Raycast/Reticle ...
}
```

---

## 8) حافظه و GC (صفر کردن Alloc در مسیر داغ)
- **لیست‌های استاتیک/Reusable** (مثل `List<ARRaycastHit>`) را از قبل تخصیص دهید.
- از **LINQ** و **string.Format/Concat** در حلقه‌های فریم پرهیز کنید؛ از **StringBuilder** و **for** استفاده کنید.
- **GetComponent** را کش کنید؛ از **TryGetComponent** و مرجع‌دهی Inspector بهره ببرید.
- **Pooling** برای Prefabها: Instantiate/Destroy گران است.

### 8.1 الگوی Object Pool سبک
```csharp
using System.Collections.Generic;
using UnityEngine;

public class SimplePool<T> where T : Component
{
    readonly T prefab;
    readonly Transform parent;
    readonly Stack<T> stack = new();

    public SimplePool(T prefab, Transform parent=null) { this.prefab=prefab; this.parent=parent; }

    public T Get()
    {
        var t = stack.Count>0 ? stack.Pop() : Object.Instantiate(prefab, parent);
        t.gameObject.SetActive(true);
        return t;
    }
    public void Release(T t)
    {
        t.gameObject.SetActive(false);
        stack.Push(t);
    }
}
```

### 8.2 NonAlloc Pattern (Physics/Raycast)
- از نسخه‌های **NonAlloc** APIها یا **لیست‌های مشترک** استفاده کنید تا هر فراخوانی حافظه تخصیص ندهد.

---

## 9) تنظیمات بیلد/پلیر (Android/iOS)
- **IL2CPP + ARM64** (Android/iOS)؛ **Managed Stripping Level** متوسط/پایین (با دقت به Plugins/Reflection).
- **Remove Unused Mesh Components** (Optimize Mesh Data).
- **Strip Engine Code** با احتیاط؛ روی Device تست کنید.
- **Minimum/Target API** را مطابق توصیهٔ Editor بگذارید.
- **Quality Settings**: Disable **Realtime Shadows**, **VSync** (روی موبایل معمولاً `vSyncCount=0` و کنترل توسط `Application.targetFrameRate`).

کد نمونه:
```csharp
void Start() {
    QualitySettings.vSyncCount = 0;
    Application.targetFrameRate = 60; // یا 30 برای پایداری حرارتی
}
```

---

## 10) حرارت و باتری
- **TargetFrameRate = 30** در دستگاه‌های ضعیف/محیط گرم.
- **Dynamic/Adaptive Quality**: کاهش Render Scale/افکت‌ها وقتی FPS افت می‌کند.
- زمان‌بندی **SleepTimeout** را مدیریت کنید (در نیاز واقعی افزایش ندهید).

---

## 11) جدول «نشانه ↔ علت ↔ راهکار سریع»
| نشانه | علت محتمل | راهکار سریع |
|---|---|---|
| FPS پایین با اشیای شفاف | Overdraw/Sort | کاهش شفافیت، Opaque+Outline، Render Scale 0.9 |
| SetPass زیاد | متریال‌های یکتا | اشتراک متریال، SRP Batcher، Instancing + MPB |
| جهش‌های FPS دوره‌ای | GC Collect | حذف LINQ/boxing، Pooling، لیست‌های بازاستفاده |
| لگ هنگام قراردهی | Instantiate/Destroy | Object Pool، پیش‌گرم‌کردن Prefabها |
| متن/UI سنگین | Canvas عظیم | تقسیم Canvas، کاهش آلفای تمام‌صفحه |
| مصرف باتری/گرما | نرخ فریم/رزولوشن بالا | کاهش TargetFrameRate/Render Scale |
| پرش محتوای AR | Visualization سنگین/Anchor ضعیف | خاموش‌کردن Viz پس از انتخاب، بازاتصال Anchor |

---

## 12) چک‌لیست سریعِ بردهای آسان (Quick Wins)
- [ ] Visualization Plane/Point فقط در کشف فعال است.
- [ ] تمام Proxyها **یک متریال مشترک** دارند + SRP Batcher/Instancing روشن.
- [ ] Outline از **دو-مش سبک** استفاده می‌کند، نه Shader سنگین.
- [ ] Raycast و Physics **Throttle** شده‌اند، نه هر فریم در همه‌جا.
- [ ] **Pooling** برای Prefabهای مکرر فعال است.
- [ ] **GC Alloc/frame ≈ 0** در مسیرهای داغ (Profiler بررسی شد).
- [ ] URP Render Scale ≤ 0.9 در دستگاه‌های ضعیف.
- [ ] TargetFrameRate بر اساس دستگاه (۳۰ یا ۶۰) تنظیم است.

---

## 13) نمونهٔ «پروفایلینگ سریع» در کد
```csharp
using UnityEngine;
public class QuickFpsMeter : MonoBehaviour
{
    float acc; int frames;
    void Update() {
        acc += Time.unscaledDeltaTime; frames++;
        if (acc >= 2f) {
            var fps = frames / acc;
            Debug.Log($"FPS ~ {fps:F1}");
            acc = 0; frames = 0;
        }
    }
}
```

---

## 14) نکات کلیدی فصل
- ابتدا **گلوگاه** را با Profiler/Frame Debugger مشخص کنید؛ حدس نزنید.
- شفافیت/Outline/Canvas بزرگ، قاتلان معمول FPS در موبایل‌اند.
- **SRP Batcher + Instancing + MaterialPropertyBlock** ترکیب برنده برای Draw Call است.
- **Throttle** برای Raycast/Physics/Log/IO و **Pooling** برای Prefabها را از روز اول داشته باشید.
- با **TargetFrameRate تطبیقی** و **Render Scale** پایداری حرارتی را حفظ کنید.
