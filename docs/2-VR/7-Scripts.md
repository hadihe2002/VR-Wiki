---
sidebar_position: 7

title: کد‌های آماده
---

# راهنمای تحلیل Scripts آماده Unity VR

در پروژه‌ی آماده‌ای که Unity در اختیار می‌گذارد، فایل‌های کدی قرار دارد که در طول آموزش از آنها استفاده می‌شود.

## 1. ساختار کلی Scripts

### سازماندهی پوشه‌ها

Scripts پروژه در چهار دسته اصلی تقسیم شده‌اند: **Actions** (اعمال و رفتارها)، **Conditions** (شرایط و trigger ها)، **Controls** (کنترل‌های VR) و **Testing** (ابزارهای تست و debugging). این ساختار modular امکان ترکیب مختلف script ها را فراهم می‌کند تا رفتارهای پیچیده‌ای ایجاد شود. پوشه Actions شامل 41 script است که اعمال مختلف مثل حرکت، چرخش، صدا و جلوه‌های بصری را مدیریت می‌کند. پوشه Conditions شامل 11 script برای تشخیص رویدادها مثل کلیک، برخورد و حرکت است. Controls دارای 5 script برای interface های VR مثل دکمه، اهرم و slider است. در نهایت Testing شامل 4 script کمکی برای نمایش FPS، یادداشت‌ها و تله‌پورت بهبود یافته است.

---

## 2. دسته Actions - اعمال اصلی

### Script های حرکتی و تغییر موقعیت

- **MoveWithVelocity.cs**: این script امکان حرکت آبجکت با سرعت مشخص را فراهم می‌کند. متغیرهای velocity (Vector3) برای تعیین جهت و سرعت، space (local یا world) برای نوع حرکت و useRigidbody (bool) برای استفاده از فیزیک موجود است.

- **TranslateObject.cs**: برای جابجایی آبجکت به موقعیت خاص استفاده می‌شود. **RotateObject.cs**: چرخش آبجکت با angle و axis مشخص.

- **ScaleObject.cs**: تغییر اندازه آبجکت با scale factor.

- **TeleportPlayer.cs**: انتقال فوری بازیکن به نقطه مشخص.

- **MatchRotation.cs**: تطبیق rotation یک آبجکت با آبجکت دیگر.

- **StickToObject.cs**: چسباندن آبجکت به آبجکت دیگر و حرکت همزمان آن‌ها. این script ها معمولاً در متد Start() یا Update() اجرا می‌شوند و از Transform component استفاده می‌کند.

### Script های فیزیک و تعامل

- **ApplyPhysics.cs**: این script فیزیک Rigidbody را به آبجکت اعمال می‌کند. شامل متغیرهای force (Vector3) برای نیرو، forceMode (Impulse، Acceleration، Force، VelocityChange) و mass برای تعیین جرم است.

- **LaunchProjectile.cs**: برای پرتاب آبجکت‌ها با فیزیک واقعی استفاده می‌شود، شامل projectilePrefab، launchForce و launchDirection.

- **SpawnFromList.cs**: انتخاب تصادفی از لیست prefab ها و spawn آن‌ها.

- **RemoveObjectsWithTag.cs**: حذف تمام آبجکت‌هایی که tag خاصی دارند.

- **ManuallySelectObject.cs**: انتخاب manual آبجکت برای اعمال عملیات بعدی.

## 3. دسته Actions - جلوه‌های بصری و صوتی

### مدیریت صدا و موسیقی

- **PlayQuickSound.cs**: پخش صدای کوتاه با AudioSource.PlayOneShot() - مناسب برای effect های کوتاه مثل کلیک.

- **PlayContinuousSound.cs**: پخش صدای طولانی با قابلیت loop، شامل متغیرهای audioClip، volume، pitch و loop.

- **PlaySoundsFromList.cs**: انتخاب تصادفی از لیست صداها و پخش آن‌ها.

- **SetVolume.cs**: تنظیم volume AudioSource به صورت dynamic.

- **VibrateController.cs**: ایجاد vibration در کنترلر VR با amplitude و duration مشخص. این script ها از AudioSource component استفاده می‌کنند و معمولاً در response به action های کاربر فراخوانی می‌شوند.

### مدیریت نور و رنگ

- **ToggleLight.cs**: روشن/خاموش کردن Light component.

- **SetLightColor.cs**: تغییر رنگ نور با Color value.

- **SetLightIntensity.cs**: تنظیم شدت نور.

- **ChangeMaterial.cs**: تعویض Material آبجکت.

- **SetMaterialColor.cs**: تغییر رنگ Material.

- **ConvertValueToHue.cs**: تبدیل مقدار عددی به رنگ در طیف Hue. این script ها از Light component و Renderer.material استفاده می‌کنند. معمولاً برای ایجاد feedback بصری در response به تعاملات کاربر استفاده می‌شوند.

## 4. دسته Actions - Interface و Particles

### مدیریت Canvas و UI

- **FadeCanvas.cs**: فید in/out کردن Canvas با CanvasGroup.alpha. شامل متغیرهای targetAlpha، fadeSpeed و fadeDirection است.

- **FadeCanvasOnOverlap.cs**: فید خودکار هنگام overlap با آبجکت دیگر.

- **ToggleInterface.cs**: نمایش/مخفی کردن UI elements.

- **ShowMessageFromList.cs**: نمایش پیام‌های متنی از لیست.

- **LoadScene.cs**: بارگذاری scene جدید با SceneManager.LoadScene().

- **ToggleVisibility.cs**: کنترل visibility آبجکت‌ها با Renderer.enabled. این script ها برای مدیریت interface و تجربه کاربری در VR استفاده می‌شوند.

### سیستم Particle و جلوه‌ها

- **ToggleParticle.cs**: روشن/خاموش کردن Particle System.

- **SetParticleRate.cs**: تنظیم emission rate ذرات.

- **ToggleRay.cs**: نمایش/مخفی کردن ray ها (مثل laser pointer).

- **PlayAnimation.cs**: اجرای Animation Clip ها.

- **PlayVideo.cs**: پخش ویدئو با VideoPlayer component. این script ها برای ایجاد جلوه‌های بصری و تعاملی در محیط VR استفاده می‌شوند.

## 5. دسته Conditions - تشخیص رویدادها

### تشخیص تعاملات فیزیکی

- **OnCollision.cs**: تشخیص برخورد دو آبجکت با OnCollisionEnter/Stay/Exit. شامل متغیرهای targetTag برای فیلتر کردن برخوردها و events برای response است.

- **OnTrigger.cs**: تشخیص ورود/خروج از Trigger Collider.

- **OnTriggerActivate.cs**: فعال کردن trigger با شرایط خاص.

- **OnVelocity.cs**: تشخیص سرعت آبجکت و فراخوانی event هنگام رسیدن به threshold مشخص.

- **OnPull.cs**: تشخیص کشیده شدن آبجکت. این script ها از Rigidbody و Collider component ها استفاده می‌کنند.

### تشخیص Input و زمان‌بندی

- **OnButtonPress.cs**: تشخیص فشار دادن دکمه‌های کنترلر با Input System.

- **OnJoystickMove.cs**: تشخیص حرکت joystick یا trackpad.

- **OnTimedInterval.cs**: اجرای action در بازه‌های زمانی مشخص با InvokeRepeating().

- **OnSceneLoad.cs**: اجرای action هنگام بارگذاری scene جدید.

- **GrabSettings.cs** و **GrabSwitcher.cs**: مدیریت grab interaction و تنظیمات آن.

- **SetInteractionLayer.cs**: تنظیم interaction layer برای XR Interaction Toolkit. این script ها event-driven هستند و معمولاً trigger هایی برای Actions فراهم
  می‌کنند.

---

## 6. دسته Controls - کنترل‌های VR

### Interface های تعاملی

- **XRButton.cs**: پیاده‌سازی دکمه VR که با grab یا touch فعال می‌شود. شامل متغیرهای pressThreshold، pressedPosition، buttonEvents و haptic feedback است.

- **XRSlider.cs**: slider برای تنظیم مقادیر float با drag interaction.

- **XRKnob.cs**: knob دایره‌ای برای تنظیم rotation value.

- **XRLever.cs**: اهرم برای تغییر state بین دو حالت.

- **XRJoystick.cs**: جوی‌استیک دو محوره برای کنترل Vector2 values. این script ها از XR Interaction Toolkit استفاده می‌کنند و IXRSelectInteractable و
  IXRHoverInteractable را پیاده‌سازی می‌کنند. همه آن‌ها UnityEvent هایی برای OnValueChanged و OnInteraction دارند.

---

## 7. دسته Testing و ابزارهای کمکی

### ابزارهای Debugging

- **DisplayFPS.cs**: نمایش FPS در real-time روی UI Text. این script در Update() مقدار 1.0f / Time.unscaledDeltaTime را محاسبه می‌کند.

- **Notes.cs**: نگهداری یادداشت‌های توسعه‌دهنده در Inspector.

- **TeleportAnchorWithFade.cs**: نسخه بهبود یافته TeleportationAnchor با fade effect.

- **TeleportAreaWithFade.cs**: نسخه بهبود یافته TeleportationArea با fade smooth. این script ها معمولاً برای debugging و بهبود تجربه کاربری استفاده می‌شوند.

## 8. یک کد اضافه‌تر!

### تحلیل عملکرد ButtonsTogether

- این script برای حل مشکل trackpad کنترلر HTC Vive طراحی شده است. گاهی اوقات نیاز دارید که دو کلید به طور همزمان فشار داده بشوند. Script OnButtonPress که توسط Unity طراحی شده است، به این صورت کار می‌کند که اگر هر یک از action ها perform باشد، function اجرا می‌شود. اما این کد چک می‌کند که تمام اکشن ها همزمان اجرا شوند.
- کنترلر HTC Vive از trackpad استفاده می‌کند که کلیک در جهت خاص را شناسایی نمی‌کند و به جای آن جهت لمس را تشخیص می‌دهد و کلیک کنترلر را به صورت یک اکشن جدا تشخیص می‌دهد! جزییات بیشتر در این [لینک](https://docs.unity3d.com/Packages/com.unity.xr.openxr@1.15/manual/features/htcvivecontrollerprofile.html) قرار دارد. برای مثال نیاز دارید که کلیک در جهت بالا روی trackpad کنترلر شناسایی شود. در اینجا نیاز به ترکیب دو action دارید: یکی برای /input/trackpad/click و دیگری برای /input/trackpad. در Input Actions این Script، شما باید دو action تعریف کنید که هم‌زمان رخ دهند. در اینجا input/trackpad، باید دارای interaction direction باشد تا جهت لمس trackpad مشخص شود. Script مجموعه‌ای از InputAction ها را دریافت می‌کند و فقط زمانی onAllPressed.Invoke() را فراخوانی می‌کند که همه actions در حالت [Performed](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.14/api/UnityEngine.InputSystem.InputActionPhase.html) باشند، یعنی Interaction ها هم برآورده شده باشند.

### پیاده‌سازی چند دکمه همزمان

```csharp

using UnityEngine;

using UnityEngine.Events;

using UnityEngine.InputSystem;

using UnityEngine.XR.Interaction.Toolkit.Inputs.Interactions;

public class ButtonsTogether : MonoBehaviour

{

    [Tooltip("Add two or more Button-type actions here (embedded in this component).")]

    [SerializeField] private InputAction[] actions;

    public UnityEvent onAllPressed;     // fires once when every button is down

    public UnityEvent onAnyReleased;    // fires once when the combo breaks

    /* ------------------ life-cycle ------------------ */

    private void OnEnable()

    {

        foreach (var a in actions)

        {

            a.performed += OnPerformed;   // button crossed the press threshold

            a.canceled += OnCanceled;    // button released

            a.Enable();                   // IMPORTANT - start listening

        }

    }

    private void OnDisable()

    {

        foreach (var a in actions)

        {

            a.performed -= OnPerformed;

            a.canceled -= OnCanceled;

            a.Disable();

        }

    }

    /* ------------------ callbacks ------------------- */

    private void OnPerformed(InputAction.CallbackContext _)

    {

        if (AllPressed())           // have we just reached the full set?

            onAllPressed.Invoke();

    }

    private void OnCanceled(InputAction.CallbackContext _)

    {

        if (!AllPressed())          // have we just LEFT the full set?

            onAnyReleased.Invoke();

    }

    private bool AllPressed()

    {

        foreach (var a in actions)

        {

            if (a.phase != InputActionPhase.Performed)     // IsPressed() works for any button interaction

                return false;

        }

        return true;

    }

}

```

## 9. الگوهای طراحی و بهترین شیوه‌ها

تمام script ها بر اساس الگوی Component-based طراحی شده‌اند که امکان ترکیب آزاد آن‌ها را فراهم می‌کند. هر script یک مسئولیت خاص دارد (Single Responsibility Principle) و از UnityEvent برای ارتباط با script های دیگر استفاده می‌کند. این روش امکان ایجاد رفتارهای پیچیده بدون کدنویسی اضافی را فراهم می‌کند. مثلاً می‌توانید OnButtonPress + PlayQuickSound + VibrateController + SpawnObject را ترکیب کنید تا یک دکمه کامل ایجاد کنید. در Inspector می‌توانید UnityEvent های مختلف را به هم وصل کنید.
