# 10 — اشیای مجازی (Proxy) و برچسب‌ها در AR
> این فصل روی ساخت و نمایش اشیای مجازی سبک (Proxy/Bounding) و برچسب‌های خوانا در جهان AR تمرکز دارد—با رویکردی **عمومی** و بدون اشاره به اپلیکیشن خاص. از متریال شفاف تا برچسب‌های World-space، از عملکرد تا خوانایی RTL را پوشش می‌دهیم.

- **چکیده:** برای نمونه‌های AR، اغلب به‌جای مدل‌های دقیق، از **Proxy**‌های سبک (جعبه/حجم ساده) استفاده می‌کنیم. این اشیا باید با **مقیاس واقعی** رندر شوند، **Outline/سایهٔ تماس** داشته باشند، و **برچسب‌های TMP**‌شان در هر نور/زاویه‌ای خوانا باشد.
- **پس از مطالعه:** می‌توانید Proxy بسازید، آن را با مقیاس کالیبره کنید، Outline و Label اضافه کنید، و مسائل رایج شفافیت/ترتیب ترسیم/عملکرد را مدیریت کنید.

---

## 1) چرا Proxy؟ (به‌جای مدل‌های سنگین)
| رویکرد | مزایا | معایب | مناسب برای |
|---|---|---|---|
| مدل دقیق (CAD/Hi-poly) | واقع‌گرایی بالا | سنگین، نیازمند بهینه‌سازی | دموهای بصری/بازاریابی |
| **Proxy/Bounding (مکعب/حجم ساده)** | سبک، سریع، مقیاس‌پذیر | جزئیات کم | نمونه‌سازی/آموزش/راهنمایی |
| ترکیبی (Proxy + جزئیات کلیدی) | تعادل کیفیت/هزینه | آماده‌سازی محتوا می‌خواهد | اغلب MVPها |

> Proxy اجازه می‌دهد روی **تعامل و UX** تمرکز کنید و بعداً جزئیات را اضافه کنید.

---

## 2) ایجاد جعبهٔ Proxy با مقیاس واقعی
### 2.1 معادلهٔ تبدیل (از فصل 09)
```
world_m = real_mm * meters_per_mm
```
**نکته:** از یک منبع حقیقت (Singleton/ScriptableObject) برای `meters_per_mm` استفاده کنید.

### 2.2 اسکریپت نمونه: ساخت Proxy Boxِ مقیاس‌دار
```csharp
using UnityEngine;

public class ProxyBoxFactory : MonoBehaviour
{
    [Header("ابعاد واقعی (میلی‌متر)")]
    public float sizeX_mm = 100, sizeY_mm = 100, sizeZ_mm = 100;

    [Header("مرجع نسبت تبدیل")]
    public float metersPerMm = 0.001f; // از CalibrationContext بگیرید

    [Header("متریال‌ها")]
    public Material translucentMat;
    public Material outlineMat; // برای تکنیک دو-مش (اختیاری)

    public bool addOutline = true;
    public bool addContactShadow = true;

    public GameObject Build()
    {
        var go = GameObject.CreatePrimitive(PrimitiveType.Cube);
        go.name = "ProxyBox";

        var sx = sizeX_mm * metersPerMm;
        var sy = sizeY_mm * metersPerMm;
        var sz = sizeZ_mm * metersPerMm;
        go.transform.localScale = new Vector3(sx, sy, sz);

        var mr = go.GetComponent<MeshRenderer>();
        if (translucentMat) mr.material = translucentMat;

        if (addOutline && outlineMat) AddOutline(go);
        if (addContactShadow) AddContactShadow(go);

        return go;
    }

    void AddOutline(GameObject target)
    {
        // تکنیک ساده: یک Mesh هم‌مرکز اما کمی بزرگ‌تر با متریال outline
        var outline = Instantiate(target, target.transform);
        outline.name = "Outline";
        outline.transform.localScale *= 1.02f; // کمی بزرگ‌تر
        var rend = outline.GetComponent<MeshRenderer>();
        rend.material = outlineMat;
        // برای جلوگیری از تداخل عمقی، ZTest/Offset در shader outline مناسب باشد
    }

    void AddContactShadow(GameObject target)
    {
        // یک Quad کوچک زیر جعبه برای سایهٔ تماس ساده
        var quad = GameObject.CreatePrimitive(PrimitiveType.Quad);
        quad.name = "ContactShadow";
        Destroy(quad.GetComponent<Collider>());
        quad.transform.SetParent(target.transform, false);
        quad.transform.localRotation = Quaternion.Euler(90, 0, 0);
        var s = Mathf.Max(target.transform.localScale.x, target.transform.localScale.z) * 1.1f;
        quad.transform.localScale = new Vector3(s, s, 1);
        // متریال سایه: دایره‌ای نرم با آلفای پایین (Blend: Alpha)
    }
}
```

**یادداشت‌های عملکردی:**
- از **GPU Instancing** برای ده‌ها Proxy مشابه استفاده کنید.
- شفافیت (Transparent) → ترتیب ترسیم مشکل‌ساز است؛ تا حد امکان **Cutout** یا **Opaque+Outline** را ترجیح دهید.

---

## 3) متریال شفاف و Outline سبک
### 3.1 شفافیت (Translucent)
- Shader سبک (URP/Lit یا Unlit) با **Alpha ~0.2–0.4**.
- **Depth Write** معمولاً خاموش؛ اما برای ترتیب ترسیم مراقب باشید (Sort Priority/Render Queue).

### 3.2 Outline
- **دو-مش** (مثل کد بالا) یا Shaderهای **Fresnel/Edge**.
- اگر دو-مش:  
  - زرهٔ بیرونی را **کمی بزرگ‌تر** کنید (۱–۳٪).  
  - Shader با **ZTest LessEqual** و **ZOffset** کوچک تا لرزش لبه کم شود.

### 3.3 سایهٔ تماس (Contact Shadow)
- یک Quad با تکسچر دایرهٔ نرم (Blur)؛ **Unlit** و **Alpha** پایین.
- از Shadow حقیقی تا حد امکان در موبایل پرهیز کنید (هزینهٔ بالا).

---

## 4) برچسب‌های World-space (TextMeshPro)
### 4.1 قواعد خوانایی
- **اندازهٔ متن در جهان** تابع فاصله است (جدول فصل 07).  
- **پس‌زمینهٔ نیمه‌شفاف** و **Outline** نازک برای متن.  
- از **Billboard** (چرخش به سمت دوربین) استفاده کنید، اما زاویهٔ محدود (±60°) تا افراط نشود.

### 4.2 کامپوننت نمونه: WorldLabel
```csharp
using UnityEngine;
using TMPro;

public class WorldLabel : MonoBehaviour
{
    public string text = "برچسب";
    public float worldHeight = 0.04f;
    public bool billboard = true;
    public Camera targetCam;

    [Header("پیوند به TMP")]
    public TextMeshPro tmp;
    public RectTransform bg;

    void Awake()
    {
        if (!targetCam) targetCam = Camera.main;
        if (tmp) tmp.text = text;
        ResizeByHeight(worldHeight);
    }

    void LateUpdate()
    {
        if (billboard && targetCam)
        {
            var dir = (transform.position - targetCam.transform.position).normalized;
            var look = Quaternion.LookRotation(dir, Vector3.up);
            transform.rotation = look;
        }
    }

    public void ResizeByHeight(float h)
    {
        // نگاشت ارتفاع برچسب به Scale جهانی (ساده‌سازی)
        var s = h;
        transform.localScale = new Vector3(s, s, s);
    }
}
```

### 4.3 پس‌زمینه و خط راهنما (Leader Line)
- زیر TMP یک **Panel** نیمه‌شفاف قرار دهید (World-space Canvas یا Quad).
- برای اتصال برچسب به شیء، یک **خط نازک** (LineRenderer) از برچسب تا گوشهٔ شیء رسم کنید.

**چیدمان شماتیک:**
```
[Label BG + TMP]───╲
                    ╲ (Leader Line)
                 [Proxy Box]
```

### 4.4 RTL و چندزبانه
- TMP + پشتیبانی RTL (حروف‌چینی درست، اعداد، علائم).  
- در برچسب‌های World-space، **جهت متن** را مطابق زبان تنظیم کنید و شکست خطوط را تست کنید.

---

## 5) انتخاب و تعامل با اشیا
### 5.1 انتخاب با Raycast از صفحه
- از مرکز صفحه یا نقطهٔ لمس، **Physics.Raycast** به Collider اشیا بزنید.
- برگزیده را با **Outline/Glow** موقت مشخص کنید.

### 5.2 جابه‌جایی/چرخش/مقیاس
- **Drag** روی سطح: نگاشت حرکت صفحه به Plane در جهان.  
- **Pinch**: تغییر Scale (محدودیت حداقل/حداکثر).  
- **Rotate**: چرخش حول نرمال سطح یا محور جهانی Y.

> برای پایدارماندن روی سطح، پس از تأیید، شیء را به **Anchor** متصل کنید.

---

## 6) ترتیب ترسیم، Z-Fighting و عمق
| مشکل | علت | راهکار |
|---|---|---|
| ظاهر شدن/نشدن تصادفی اشیای شفاف | Sorting شفافیت | کاهش شفافیت/نواحی هم‌پوشان؛ استفاده از Cutout یا بخش‌بندی |
| لرزش لبهٔ Outline | هم‌پوشانی دو Mesh | Scale بیرونی کمی بیشتر + ZOffset در Shader |
| سوسوزدن متن World-space | فاصلهٔ کم با سطوح | Offset کوچک، فاصلهٔ امن از سطح، استفاده از Depth Test مناسب |

---

## 7) عملکرد: بودجه‌بندی روی موبایل
- **Draw Call**ها را کم کنید: متریال مشترک، **GPU Instancing**، **Static/Dynamic Batching**.
- از **Transparent** زیاد بپرهیزید؛ تا می‌توانید **Opaque** + **Outline** استفاده کنید.
- Prefabها را **سبک** نگه دارید؛ مش‌های بی‌استفاده را حذف کنید.
- **Object Pooling** به‌جای Instantiate/Destroy مکرر.
- **LOD** ساده: در فاصلهٔ زیاد، جزئیات (برچسب/Outline) را کم کنید.

جدول اثر تقریبی (راهنمای شهودی):
| تکنیک | اثر بر FPS (کیفی) |
|---|---|
| حذف سایهٔ واقعی → سایهٔ تماس | ↑↑ |
| Instancing برای Proxyهای مشابه | ↑ |
| کاهش شفافیت/هم‌پوشانی | ↑ |
| Pooling به‌جای Instantiate | ↑ |
| خاموش‌کردن برچسب‌های دور | ↑ |

---

## 8) ساخت Prefab ماژولار
```
ProxyObject (Empty)
 ├─ ProxyBox (MeshRenderer, translucent)
 ├─ Outline   (MeshRenderer, outline)      [اختیاری]
 ├─ ContactShadow (Quad, unlit alpha)      [اختیاری]
 └─ LabelRoot (World-space Canvas)
     └─ TMP Text + BG + LeaderLine
```
- هر زیرمولفه **فعال/غیرفعال**‌شدنی باشد.
- پارامترها (رنگ، ضخامت Outline، اندازهٔ متن) از یک **ScriptableObject Style** خوانده شوند.

---

## 9) استایل و Theme (ScriptableObject)
```csharp
using UnityEngine;
using TMPro;

[CreateAssetMenu(menuName="AR/VisualStyle")]
public class VisualStyle : ScriptableObject
{
    public Material proxyMat;
    public Material outlineMat;
    public Material contactShadowMat;

    [Header("Label")]
    public TMP_FontAsset font;
    public float labelWorldHeight = 0.04f;
    public Color labelText = Color.white;
    public Color labelBg = new Color(0,0,0,0.35f);
}
```
- در اجرا می‌توانید **Theme** را تعویض کنید (روشن/تاریک).

---

## 10) نمونهٔ ایجاد و الصاق برچسب در زمان اجرا
```csharp
public class LabelSpawner : MonoBehaviour
{
    public GameObject labelPrefab; // شامل TMP و BG
    public Transform attachTo;
    public Vector3 localOffset = new Vector3(0, 0.1f, 0);

    public GameObject Spawn(string text)
    {
        var go = Instantiate(labelPrefab, attachTo);
        go.transform.localPosition = localOffset;
        var wl = go.GetComponent<WorldLabel>();
        if (wl && wl.tmp) wl.tmp.text = text;
        return go;
    }
}
```

---

## 11) طراحی آیکون‌ها و معناسازی
- از **آیکون‌های ساده و جهانی** استفاده کنید (تیک، اخطار، اطلاعات).  
- متن کوتاه + آیکون = فهم سریع‌تر.  
- رنگ‌ها را با **دستیابی/کنتراست** وفق دهید (سبز/زرد/قرمز استاندارد).

---

## 12) عیب‌یابی رایج
| نشانه | علت محتمل | راهکار |
|---|---|---|
| متن فارسی برعکس/جدا | نبود پشتیبانی RTL | موتور/پلاگین سازگار با RTL و TMP |
| برچسب از شیء جدا می‌افتد | Parent/Anchor نادرست | برچسب را Child شیء یا Anchor درست کنید |
| Proxy در نور زیاد محو است | شفافیت زیاد/کنتراست کم | متریال را پررنگ‌تر و آلفا را بیشتر کنید |
| هم‌پوشانی شفافیت‌ها | Sorting مشکل | ساختار لایه‌ها را تغییر دهید؛ از Cutout بهره ببرید |
| FPS افت می‌کند | شفافیت/Outline/Instantiate زیاد | سبک‌سازی، Pooling، Instancing |

---

## 13) چک‌لیست پیاده‌سازی
- [ ] `meters_per_mm` از کالیبراسیون اعمال شده است.
- [ ] Proxy سبک با متریال مشترک/Instancing.
- [ ] Outline و سایهٔ تماس اختیاری و سبک.
- [ ] Label World-space با TMP/RTL و BG نیمه‌شفاف.
- [ ] Billboard با محدودیت زاویه‌ای؛ Leader Line در صورت نیاز.
- [ ] بهینه‌سازی شفافیت/ترتیب ترسیم؛ جلوگیری از Z-Fighting.
- [ ] Pooling و غیرفعال‌سازی Labelهای دور.

---

## 14) نکات کلیدی فصل
- **Proxy سبک + مقیاس واقعی** سریع‌ترین راه رسیدن به تجربهٔ باورپذیر در AR است.
- **برچسب‌های World-space** باید همیشه خوانا و کم‌مزاحمت باشند—پس‌زمینهٔ نیمه‌شفاف و Billboard کنترل‌شده کمک می‌کند.
- **شفافیت دشمن FPS است**؛ تا می‌توانید به Opaque/Outline مهاجرت کنید.
- Theme و Style را ماژولار کنید تا نگهداری ساده شود.
