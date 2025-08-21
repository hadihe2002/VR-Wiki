---
sidebar_position: 10

title: Sockets
---

# راهنمای جامع Socket System در Unity XR

Socket System امکان قرار دادن و نگه‌داری اشیاء در موقعیت‌های مشخص را فراهم می‌کند و پایه‌ای قوی برای puzzle ها، inventory system ها و تعاملات پیچیده VR محسوب می‌شود.

:::info منابع یادگیری

- **آموزش Unity**: [Sockets Tutorial](https://learn.unity.com/pathway/vr-development/unit/vr-basics/tutorial/sockets-g?version=2022.3)
- **راه‌حل چالش‌ها**: [کانال YouTube](https://www.youtube.com/@garlicsuter)
  :::

## بخش ۱: مبانی Socket System

### تعریف و کاربردهای Socket

Socket مکان‌های تعریف‌شده‌ای هستند که اشیاء می‌توانند در آن‌ها **قرار گیرند**، **ثابت بمانند** و **عملکردهای خاصی** انجام دهند.

#### کاربردهای اصلی:

| نوع کاربرد           | مثال         | فایده           |
| -------------------- | ------------ | --------------- |
| **Inventory System** | کیف ابزار    | سازماندهی اشیاء |
| **Puzzle Games**     | جورچین       | چالش‌های منطقی  |
| **Tool Management**  | پنل کنترل    | دسترسی آسان     |
| **Assembly Tasks**   | مونتاژ قطعات | آموزش صنعتی     |

### ساختار فنی Socket

```
Socket GameObject:
├── XR Socket Interactor (اصلی)
├── Collider (Trigger)
├── Visual Mesh (نمایش)
└── Audio Source (بازخورد)
```

:::tip ساختار بهینه
همیشه از Trigger Collider برای detection و Mesh Collider جداگانه برای visual representation استفاده کنید.
:::

## بخش ۲: ایجاد Socket پایه

### تنظیم XR Socket Interactor

#### مراحل پیکربندی:

1. **ایجاد Empty GameObject** با نام **"Socket\_[نوع]"**
2. **اضافه کردن Component**:
   Add Component > XR Socket Interactor

#### پارامترهای کلیدی:

| تنظیم                              | مقدار | کاربرد           |
| ---------------------------------- | ----- | ---------------- |
| **Socket Active**                  | ✅    | فعال‌بودن Socket |
| **Show Interactable Hover Meshes** | ✅    | نمایش preview    |
| **Socket Snapping**                | ✅    | جابجایی دقیق     |
| **Recycle Delay Time**             | 0.0s  | زمان نگهداری     |

### تنظیم Interaction Layer

Interaction Layer Mask: Default, Socket
Starting Selected Interactable: [Optional]

### موقعیت‌یابی دقیق

#### نکات تنظیم Transform:

- **Position**: دقیقاً در محل قرارگیری شیء
- **Rotation**: جهت مطلوب شیء در socket
- **Scale**: معمولاً (1,1,1)

:::caution دقت در موقعیت
Transform socket باید دقیقاً در مرکز محل قرارگیری شیء تنظیم شود.
:::

## بخش ۳: طراحی Visual Feedback

### اجزای بصری Socket

#### نوع‌های مختلف Mesh:

| نوع Mesh        | نقش                  | مثال         |
| --------------- | -------------------- | ------------ |
| **Socket Mesh** | نشان‌دهنده محل       | دایره، مربع  |
| **Hover Mesh**  | preview هنگام نزدیکی | outline شیء  |
| **Snap Mesh**   | وضعیت نهایی          | ghost object |

### پیاده‌سازی Color Coding

#### سیستم رنگ‌بندی:

```csharp
// Material Socket States
Empty Socket: آبی (#4A90E2)
Hovering: زرد (#F5A623)
Occupied: سبز (#50E3C2)
Invalid: قرمز (#D0021B)
```

### انیمیشن و جلوه‌های بصری

#### نوع‌های انیمیشن:

| انیمیشن    | زمان اجرا    | مدت        |
| ---------- | ------------ | ---------- |
| **Pulse**  | حالت خالی    | 2s loop    |
| **Glow**   | هنگام hover  | 0.5s       |
| **Snap**   | قرارگیری شیء | 0.3s       |
| **Reject** | شیء نامعتبر  | 0.2s shake |

:::info جلوه‌های بصری
از Shader Graph برای ایجاد جلوه‌های پیشرفته‌تر استفاده کنید.
:::

## بخش ۴: Socket Validation System

### فیلتر کردن اشیاء مجاز

#### روش‌های اعتبارسنجی:

| روش                 | پیاده‌سازی           | مناسب برای      |
| ------------------- | -------------------- | --------------- |
| **Tag-based**       | بررسی GameObject.tag | دسته‌بندی ساده  |
| **Component-based** | وجود component خاص   | منطق پیچیده     |
| **Size-based**      | اندازه Collider      | محدودیت فیزیکی  |
| **Custom Script**   | منطق سفارشی          | الگوریتم پیچیده |

### نمونه کد Socket Filter

```csharp
public class SocketValidator : MonoBehaviour
{
[Header("Validation Rules")]
public string[] allowedTags;
public Vector3 maxSize = Vector3.one;
public Component requiredComponent;

    public bool CanAcceptObject(XRGrabInteractable obj)
    {
        // Tag validation
        if (!System.Array.Exists(allowedTags,
            tag => tag == obj.gameObject.tag))
            return false;

        // Size validation
        Bounds bounds = obj.GetComponent<Collider>().bounds;
        if (bounds.size.x > maxSize.x ||
            bounds.size.y > maxSize.y ||
            bounds.size.z > maxSize.z)
            return false;

        // Component validation
        if (requiredComponent != null &&
            !obj.GetComponent(requiredComponent.GetType()))
            return false;

        return true;
    }

}
```

### Error Feedback System

#### انواع بازخورد خطا:

```
Invalid Object Feedback:
├── Visual: Red flash/shake
├── Audio: Error beep
├── Haptic: Short vibration
└── UI: Error message
```

:::tip تجربه کاربری
همیشه دلیل عدم پذیرش شیء را به کاربر نشان دهید.
:::

## بخش ۵: انواع تخصصی Socket

### Key-Lock Socket

برای simulation قفل و کلید:

```csharp
public class KeySocket : MonoBehaviour
{
[Header("Lock Settings")]
public string requiredKeyID;
public bool unlockOnInsert = true;
public UnityEvent OnUnlocked;

    private void ValidateKey(XRGrabInteractable key)
    {
        KeyItem keyComponent = key.GetComponent<KeyItem>();
        if (keyComponent?.keyID == requiredKeyID)
        {
            if (unlockOnInsert)
                OnUnlocked?.Invoke();
        }
    }

}
```

### Tool Rack Socket

برای سازماندهی ابزارها:

```csharp
public class ToolSocket : MonoBehaviour
{
[Header("Tool Specification")]
public ToolType acceptedToolType;
public bool returnToSocketOnDrop = true;
public Transform originalPosition;

    // Auto-return mechanism
    private IEnumerator ReturnToolToSocket(GameObject tool, float delay)
    {
        yield return new WaitForSeconds(delay);
        tool.transform.position = originalPosition.position;
        tool.transform.rotation = originalPosition.rotation;
    }

}
```

### Battery Socket

برای سیستم‌های انرژی:

```csharp
public class BatterySocket : MonoBehaviour
{
[Header("Power System")]
public float requiredVoltage = 9.0f;
public PowerDevice connectedDevice;

    public void OnBatteryInserted(BatteryItem battery)
    {
        if (battery.voltage >= requiredVoltage)
        {
            connectedDevice?.PowerOn(battery.charge);
        }
    }

}
```

:::info Socket Types
هر نوع socket نیازمند منطق validation و behavior مخصوص خود است.
:::

## بخش ۶: سیستم‌های بازخورد

### Audio Feedback

#### انواع صداهای Socket:

| حالت             | نوع صدا    | مدت  |
| ---------------- | ---------- | ---- |
| **Snap Success** | Click/Pop  | 0.1s |
| **Hover**        | Soft chime | 0.2s |
| **Reject**       | Error beep | 0.3s |
| **Release**      | Soft click | 0.1s |

### Haptic Feedback

```csharp
public void TriggerHapticFeedback(HapticType type)
{
switch (type)
{
case HapticType.SnapSuccess:
// Sharp, short vibration
controller.SendHapticImpulse(0.8f, 0.1f);
break;

        case HapticType.Hover:
            // Gentle pulse
            controller.SendHapticImpulse(0.3f, 0.05f);
            break;

        case HapticType.Reject:
            // Double pulse
            StartCoroutine(DoubleHapticPulse(0.6f, 0.1f));
            break;
    }

}
```

### Visual Animation System

#### تنظیمات انیمیشن:

csharp
[Header("Animation Settings")]
public AnimationCurve snapCurve = AnimationCurve.EaseInOut(0,0,1,1);
public float snapDuration = 0.3f;
public Vector3 hoverScale = Vector3.one \* 1.1f;

<video width="620" controls>
  <source src="/10-Sockets-1.mp4" type="video/mp4" />
</video>

## بخش ۷: بهینه‌سازی Performance

### Distance-Based Activation

```csharp
public class SocketOptimizer : MonoBehaviour
{
[Header("Performance Settings")]
 public float activationRange = 2.0f;
public int updateFrequency = 10; // Hz

    private Transform playerTransform;
    private Coroutine optimizationCoroutine;

    private IEnumerator OptimizeSocketActivation()
    {
        while (true)
        {
            float distance = Vector3.Distance(
                transform.position,
                playerTransform.position);

            bool shouldBeActive = distance <= activationRange;

            if (socketInteractor.enabled != shouldBeActive)
            {
                socketInteractor.enabled = shouldBeActive;
                visualEffects.SetActive(shouldBeActive);
            }

            yield return new WaitForSeconds(1f / updateFrequency);
        }
    }

}
```

### Object Pooling برای Effects

```csharp
public class SocketEffectPool : MonoBehaviour
{
[Header("Pool Settings")]
public GameObject particleEffectPrefab;
public int poolSize = 10;

    private Queue<GameObject> effectPool = new Queue<GameObject>();

    private void InitializePool()
    {
        for (int i = 0; i < poolSize; i++)
        {
            GameObject effect = Instantiate(particleEffectPrefab);
            effect.SetActive(false);
            effectPool.Enqueue(effect);
        }
    }

    public GameObject GetPooledEffect()
    {
        if (effectPool.Count > 0)
        {
            GameObject effect = effectPool.Dequeue();
            effect.SetActive(true);
            return effect;
        }

        return Instantiate(particleEffectPrefab);
    }

}
```

:::tip Performance
برای scene های بزرگ، حتماً از Distance-based activation استفاده کنید.
:::

## بخش ۸: پیشرفته - Multi-Socket Systems

### Socket Chain System

برای puzzle های پیچیده:

```csharp
public class SocketChain : MonoBehaviour
{
[Header("Chain Configuration")]
public SocketInteractor[] chainSockets;
public bool requireSequentialFill = true;
public UnityEvent OnChainComplete;

    public void CheckChainCompletion()
    {
        bool allFilled = System.Array.TrueForAll(
            chainSockets,
            socket => socket.hasSelection);

        if (allFilled)
        {
            OnChainComplete?.Invoke();
        }
    }

}
```

### Inventory Grid Socket

```csharp
public class InventoryGrid : MonoBehaviour
{
[Header("Grid Settings")]
 public int gridWidth = 4;
public int gridHeight = 4;
public float slotSize = 0.1f;

    private SocketInteractor[,] socketGrid;

    private void GenerateSocketGrid()
    {
        socketGrid = new SocketInteractor[gridWidth, gridHeight];

        for (int x = 0; x < gridWidth; x++)
        {
            for (int y = 0; y < gridHeight; y++)
            {
                Vector3 position = new Vector3(
                    x * slotSize, 0, y * slotSize);

                GameObject slot = CreateSocket(position);
                socketGrid[x, y] = slot.GetComponent<SocketInteractor>();
            }
        }
    }

}
```

## بخش ۹: Debugging و Testing

### Socket Debug Tools

```csharp
public class SocketDebugger : MonoBehaviour
{
[Header("Debug Settings")]
public bool showDebugGizmos = true;
public bool logSocketEvents = true;
public Color gizmosColor = Color.yellow;

    private void OnDrawGizmos()
    {
        if (!showDebugGizmos) return;

        Gizmos.color = gizmosColor;
        Gizmos.DrawWireCube(transform.position, Vector3.one * 0.1f);

        // Show interaction range
        Gizmos.DrawWireSphere(transform.position, activationRange);
    }

    public void LogSocketEvent(string eventType, GameObject obj)
    {
        if (logSocketEvents)
        {
            Debug.Log($"Socket {name}: {eventType} - Object: {obj?.name}");
        }
    }

}
```

### Testing Checklist

#### آزمون‌های ضروری:

- ✅ قرارگیری صحیح اشیاء مجاز
- ✅ رد شدن اشیاء نامجاز
- ✅ Visual feedback در تمام حالات
- ✅ Audio feedback مناسب
- ✅ Performance در scene های بزرگ
- ✅ Edge case ها (اشیاء چندگانه، تداخل)

:::caution Test Cases
همیشه edge case های مختلف مانند اشیاء بزرگ، چرخش نادرست، و تداخل socket ها را تست کنید.
:::

## جمع‌بندی سیستم

### اجزای پیاده‌سازی شده:

| بخش                          | وضعیت | فایده         |
| ---------------------------- | ----- | ------------- |
| **Basic Socket**             | ✅    | قرارگیری ساده |
| **Visual Feedback**          | ✅    | تجربه بهتر    |
| **Validation System**        | ✅    | کنترل دقیق    |
| **Specialized Types**        | ✅    | کاربردهای خاص |
| **Performance Optimization** | ✅    | اجرای روان    |

### نتیجه نهایی

Socket System ابزاری قدرتمند برای ایجاد **تعاملات پیچیده** و **سازماندهی اشیاء** در محیط VR است که می‌تواند پایه‌ای برای **puzzle game ها**، **training simulator ها** و **inventory system های** پیشرفته باشد.
