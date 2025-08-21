---
sidebar_position: 14
title: رابط کاربری (UI)
---

# راهنمای جامع طراحی رابط کاربری در محیط‌های Unity VR

رابط کاربری در محیط‌های **واقعیت مجازی** نیازمند رویکردی کاملاً متفاوت از UI سنتی است و باید با اصول **طراحی فضایی** و **تعامل سه‌بعدی** سازگار باشد.

:::info منابع تخصصی

- **مستندات رسمی Unity**: [User Interface Tutorial](https://learn.unity.com/pathway/vr-development/unit/events-and-interactions/tutorial/2-4-user-interface?version=2022.3)
- **راه‌حل‌های عملی**: [کانال آموزشی تخصصی](https://www.youtube.com/@garlicsuter)
  :::

## مبانی نظری UI در واقعیت مجازی

### پارادایم World Space Interface

برخلاف رابط‌های کاربری سنتی که در **Screen Space** قرار می‌گیرند، UI واقعیت مجازی باید در **World Space** پیاده‌سازی شود تا با محیط سه‌بعدی هماهنگ باشد و تجربه **몰입감** (Immersion) را حفظ کند.

#### **مزایای World Space UI:**

- **یکپارچگی فضایی**: UI بخشی از محیط واقعی می‌شود
- **عمق بصری**: امکان استفاده از Depth Cues طبیعی
- **تعامل طبیعی**: سازگاری با Ray و Direct Interactors
- **انعطاف‌پذیری**: امکان قرارگیری در موقعیت‌های مختلف فضایی

### اصول طراحی VR-First

#### **Ergonomic Considerations**

```csharp
public class VRUIPositioning : MonoBehaviour
{
    [Header("Ergonomic Settings")]
    [Range(1.0f, 3.0f)]
    public float optimalDistance = 1.5f;

    [Range(-30f, 30f)]
    public float verticalAngleOffset = -15f;

    void Start()
    {
        PositionUIForOptimalViewing();
    }

    void PositionUIForOptimalViewing()
    {
        // محاسبه موقعیت بهینه بر اساس ارگونومی
        Vector3 userForward = Camera.main.transform.forward;
        Vector3 optimalPosition = Camera.main.transform.position +
                                 userForward * optimalDistance;

        // تنظیم زاویه عمودی برای راحتی گردن
        transform.position = optimalPosition;
        transform.rotation = Quaternion.LookRotation(userForward) *
                           Quaternion.Euler(verticalAngleOffset, 0, 0);
    }
}
```

## پیاده‌سازی World Space Canvas

### تنظیمات بنیادی Canvas

Canvas در VR نیازمند پیکربندی دقیق برای عملکرد بهینه است:

#### **Canvas Component Configuration**

```csharp
public class VRCanvasSetup : MonoBehaviour
{
    [Header("Canvas Configuration")]
    public RenderMode renderMode = RenderMode.WorldSpace;
    public Camera vrCamera;
    public float canvasScale = 0.001f;

    void Awake()
    {
        SetupWorldSpaceCanvas();
    }

    void SetupWorldSpaceCanvas()
    {
        Canvas canvas = GetComponent<Canvas>();
        canvas.renderMode = renderMode;
        canvas.worldCamera = vrCamera;

        // تنظیم مقیاس برای VR
        transform.localScale = Vector3.one * canvasScale;

        // اضافه کردن Graphic Raycaster برای تعامل
        if (GetComponent<GraphicRaycaster>() == null)
        {
            gameObject.AddComponent<GraphicRaycaster>();
        }
    }
}
```

#### **Canvas Scaler Optimization**

```csharp
[System.Serializable]
public class VRCanvasScalerSettings
{
    public CanvasScaler.ScaleMode scaleMode = CanvasScaler.ScaleMode.ConstantPixelSize;
    public float scaleFactor = 1.0f;
    public Vector2 referenceResolution = new Vector2(1920, 1080);

    public void ApplyToCanvas(CanvasScaler scaler)
    {
        scaler.uiScaleMode = scaleMode;
        scaler.scaleFactor = scaleFactor;
        scaler.referenceResolution = referenceResolution;
    }
}
```

### Event System Integration

#### **VR-Compatible Event System**

```csharp
public class VREventSystemManager : MonoBehaviour
{
    [Header("XR Configuration")]
    public XRUIInputModule xrInputModule;
    public StandaloneInputModule fallbackInputModule;

    void Start()
    {
        ConfigureEventSystem();
    }

    void ConfigureEventSystem()
    {
        EventSystem eventSystem = FindObjectOfType<EventSystem>();

        if (eventSystem == null)
        {
            GameObject eventSystemGO = new GameObject("VR Event System");
            eventSystem = eventSystemGO.AddComponent<EventSystem>();
        }

        // حذف input module های قدیمی
        var oldModules = eventSystem.GetComponents<BaseInputModule>();
        foreach (var module in oldModules)
        {
            DestroyImmediate(module);
        }

        // اضافه کردن XR Input Module
        if (xrInputModule == null)
        {
            xrInputModule = eventSystem.gameObject.AddComponent<XRUIInputModule>();
        }
    }
}
```

![VR UI Canvas Setup](./img/14-User-Interface-1.avif)

## طراحی سیستم متن خوشامدگویی

### پیاده‌سازی TextMeshPro VR-Optimized

#### **Advanced Text Configuration**

```csharp
public class VRTextOptimizer : MonoBehaviour
{
    [Header("VR Text Settings")]
    public TextMeshProUGUI textComponent;
    public float optimalFontSize = 36f;
    public Color highContrastColor = Color.white;
    public Material vrTextMaterial;

    [Header("Readability Settings")]
    [Range(0f, 1f)]
    public float characterSpacing = 0.05f;
    [Range(0f, 1f)]
    public float lineSpacing = 0.2f;

    void Start()
    {
        OptimizeTextForVR();
    }

    void OptimizeTextForVR()
    {
        if (textComponent == null) return;

        // تنظیم font size بهینه
        textComponent.fontSize = CalculateOptimalFontSize();

        // بهبود خوانایی
        textComponent.characterSpacing = characterSpacing;
        textComponent.lineSpacing = lineSpacing;

        // تنظیم material برای VR
        if (vrTextMaterial != null)
        {
            textComponent.fontMaterial = vrTextMaterial;
        }

        // بهینه‌سازی رنگ برای contrast
        textComponent.color = highContrastColor;
    }

    float CalculateOptimalFontSize()
    {
        float distanceToCamera = Vector3.Distance(
            transform.position,
            Camera.main.transform.position
        );

        // محاسبه font size بر اساس فاصله
        return Mathf.Clamp(optimalFontSize * (distanceToCamera / 1.5f), 24f, 72f);
    }
}
```

### سیستم Localization Integration

#### **Multi-Language Support**

```csharp
[System.Serializable]
public class LocalizedText
{
    public SystemLanguage language;
    [TextArea(3, 10)]
    public string text;
}

public class VRLocalizationManager : MonoBehaviour
{
    [Header("Localized Content")]
    public LocalizedText[] localizedTexts;
    public TextMeshProUGUI targetText;

    void Start()
    {
        ApplyCurrentLanguage();
    }

    void ApplyCurrentLanguage()
    {
        SystemLanguage currentLanguage = Application.systemLanguage;

        foreach (var localizedText in localizedTexts)
        {
            if (localizedText.language == currentLanguage)
            {
                targetText.text = localizedText.text;
                return;
            }
        }

        // Fallback to first available language
        if (localizedTexts.Length > 0)
        {
            targetText.text = localizedTexts[0].text;
        }
    }
}
```

## سیستم Button و تعاملات

### طراحی VR-Optimized Buttons

#### **Enhanced Button Component**

```csharp
public class VRButton : Button
{
    [Header("VR Enhancements")]
    public float hapticIntensity = 0.5f;
    public float hapticDuration = 0.1f;
    public AudioClip hoverSound;
    public AudioClip clickSound;

    [Header("Visual Feedback")]
    public float hoverScale = 1.1f;
    public Color hoverGlow = Color.cyan;
    public ParticleSystem clickEffect;

    private Vector3 originalScale;
    private AudioSource audioSource;

    protected override void Start()
    {
        base.Start();
        originalScale = transform.localScale;
        audioSource = GetComponent<AudioSource>() ?? gameObject.AddComponent<AudioSource>();

        SetupVRInteractions();
    }

    void SetupVRInteractions()
    {
        // اضافه کردن event handlers
        onEnter.AddListener(OnVRHoverEnter);
        onExit.AddListener(OnVRHoverExit);
        onClick.AddListener(OnVRClick);
    }

    void OnVRHoverEnter()
    {
        // Visual feedback
        transform.DOScale(originalScale * hoverScale, 0.2f);

        // Audio feedback
        if (hoverSound != null)
        {
            audioSource.PlayOneShot(hoverSound);
        }

        // Haptic feedback
        TriggerHapticFeedback(hapticIntensity * 0.5f, hapticDuration * 0.5f);
    }

    void OnVRHoverExit()
    {
        transform.DOScale(originalScale, 0.2f);
    }

    void OnVRClick()
    {
        // Audio feedback
        if (clickSound != null)
        {
            audioSource.PlayOneShot(clickSound);
        }

        // Particle effect
        if (clickEffect != null)
        {
            clickEffect.Play();
        }

        // Strong haptic feedback
        TriggerHapticFeedback(hapticIntensity, hapticDuration);
    }

    void TriggerHapticFeedback(float intensity, float duration)
    {
        // پیاده‌سازی haptic feedback برای controllers
        StartCoroutine(HapticPulse(intensity, duration));
    }

    IEnumerator HapticPulse(float intensity, float duration)
    {
        float elapsed = 0f;
        while (elapsed < duration)
        {
            // ارسال haptic signal
            XRInput.SendHapticImpulse(intensity);
            elapsed += Time.deltaTime;
            yield return null;
        }
    }
}
```

### سیستم Panel Management

#### **Advanced Panel Controller**

```csharp
public class VRPanelController : MonoBehaviour
{
    [Header("Panel Configuration")]
    public GameObject welcomePanel;
    public GameObject resetPanel;
    public CanvasGroup panelCanvasGroup;

    [Header("Animation Settings")]
    public float fadeInDuration = 0.5f;
    public float fadeOutDuration = 0.3f;
    public AnimationCurve fadeCurve = AnimationCurve.EaseInOut(0, 0, 1, 1);

    [Header("Audio")]
    public AudioClip panelOpenSound;
    public AudioClip panelCloseSound;

    private AudioSource audioSource;
    private Coroutine currentAnimation;

    void Start()
    {
        audioSource = GetComponent<AudioSource>() ?? gameObject.AddComponent<AudioSource>();
        InitializePanels();
    }

    void InitializePanels()
    {
        if (panelCanvasGroup == null)
        {
            panelCanvasGroup = GetComponent<CanvasGroup>() ?? gameObject.AddComponent<CanvasGroup>();
        }

        // تنظیم اولیه panels
        if (welcomePanel != null)
        {
            ShowPanel(welcomePanel, false);
        }

        if (resetPanel != null)
        {
            resetPanel.SetActive(false);
        }
    }

    public void ShowWelcomePanel()
    {
        ShowPanel(welcomePanel, true);
    }

    public void HideWelcomePanel()
    {
        HidePanel(welcomePanel);
    }

    public void ToggleResetPanel()
    {
        if (resetPanel.activeInHierarchy)
        {
            HidePanel(resetPanel);
        }
        else
        {
            ShowPanel(resetPanel, true);
        }
    }

    void ShowPanel(GameObject panel, bool animate)
    {
        if (panel == null) return;

        panel.SetActive(true);

        if (animate)
        {
            if (currentAnimation != null) StopCoroutine(currentAnimation);
            currentAnimation = StartCoroutine(FadePanel(0f, 1f, fadeInDuration, panelOpenSound));
        }
        else
        {
            panelCanvasGroup.alpha = 1f;
        }
    }

    void HidePanel(GameObject panel)
    {
        if (panel == null || !panel.activeInHierarchy) return;

        if (currentAnimation != null) StopCoroutine(currentAnimation);
        currentAnimation = StartCoroutine(FadePanelAndDeactivate(panel));
    }

    IEnumerator FadePanel(float startAlpha, float endAlpha, float duration, AudioClip sound)
    {
        panelCanvasGroup.alpha = startAlpha;

        if (sound != null)
        {
            audioSource.PlayOneShot(sound);
        }

        float elapsed = 0f;

        while (elapsed < duration)
        {
            float progress = elapsed / duration;
            float curveValue = fadeCurve.Evaluate(progress);
            panelCanvasGroup.alpha = Mathf.Lerp(startAlpha, endAlpha, curveValue);

            elapsed += Time.deltaTime;
            yield return null;
        }

        panelCanvasGroup.alpha = endAlpha;
        currentAnimation = null;
    }

    IEnumerator FadePanelAndDeactivate(GameObject panel)
    {
        yield return StartCoroutine(FadePanel(1f, 0f, fadeOutDuration, panelCloseSound));
        panel.SetActive(false);
    }
}
```

## سیستم Reset و State Management

### پیاده‌سازی Intelligent Reset System

#### **Comprehensive Reset Manager**

```csharp
public class VRSceneResetManager : MonoBehaviour
{
    [Header("Reset Configuration")]
    public Transform playerStartPosition;
    public XROrigin xrOrigin;

    [Header("Object Reset")]
    public ResetableObject[] resetableObjects;

    [Header("Input Configuration")]
    public InputActionReference resetInputAction;

    [Header("Teleport Settings")]
    public float teleportFadeDuration = 0.5f;
    public Color fadeColor = Color.black;

    private Dictionary<GameObject, ObjectState> originalStates;
    private ScreenFade screenFader;

    [System.Serializable]
    public class ObjectState
    {
        public Vector3 position;
        public Quaternion rotation;
        public Vector3 scale;
        public bool isActive;
    }

    [System.Serializable]
    public class ResetableObject
    {
        public GameObject gameObject;
        public bool resetPosition = true;
        public bool resetRotation = true;
        public bool resetScale = false;
        public bool resetActiveState = true;
    }

    void Start()
    {
        InitializeResetSystem();
        StorOriginalStates();
    }

    void InitializeResetSystem()
    {
        screenFader = GetComponent<ScreenFade>() ?? gameObject.AddComponent<ScreenFade>();
        originalStates = new Dictionary<GameObject, ObjectState>();

        // تنظیم input actions
        if (resetInputAction != null)
        {
            resetInputAction.action.performed += OnResetRequested;
            resetInputAction.action.Enable();
        }
    }

    void StorOriginalStates()
    {
        foreach (var resetable in resetableObjects)
        {
            if (resetable.gameObject == null) continue;

            ObjectState state = new ObjectState
            {
                position = resetable.gameObject.transform.position,
                rotation = resetable.gameObject.transform.rotation,
                scale = resetable.gameObject.transform.localScale,
                isActive = resetable.gameObject.activeInHierarchy
            };

            originalStates[resetable.gameObject] = state;
        }
    }

    void OnResetRequested(InputAction.CallbackContext context)
    {
        StartCoroutine(PerformCompleteReset());
    }

    public IEnumerator PerformCompleteReset()
    {
        // شروع fade out
        yield return screenFader.FadeOut(teleportFadeDuration, fadeColor);

        // انجام reset
        ResetPlayerPosition();
        ResetAllObjects();
        ResetInteractionStates();

        // کمی انتظار برای stabilization
        yield return new WaitForSeconds(0.1f);

        // fade in
        yield return screenFader.FadeIn(teleportFadeDuration);
    }

    void ResetPlayerPosition()
    {
        if (xrOrigin != null && playerStartPosition != null)
        {
            xrOrigin.transform.position = playerStartPosition.position;
            xrOrigin.transform.rotation = playerStartPosition.rotation;
        }
    }

    void ResetAllObjects()
    {
        foreach (var resetable in resetableObjects)
        {
            if (resetable.gameObject == null || !originalStates.ContainsKey(resetable.gameObject))
                continue;

            ObjectState originalState = originalStates[resetable.gameObject];
            Transform objTransform = resetable.gameObject.transform;

            if (resetable.resetPosition)
                objTransform.position = originalState.position;

            if (resetable.resetRotation)
                objTransform.rotation = originalState.rotation;

            if (resetable.resetScale)
                objTransform.localScale = originalState.scale;

            if (resetable.resetActiveState)
                resetable.gameObject.SetActive(originalState.isActive);
        }
    }

    void ResetInteractionStates()
    {
        // reset grabbed objects
        var interactors = FindObjectsOfType<XRBaseInteractor>();
        foreach (var interactor in interactors)
        {
            if (interactor.hasSelection)
            {
                interactor.EndManualInteraction();
            }
        }
    }

    void OnDestroy()
    {
        if (resetInputAction != null)
        {
            resetInputAction.action.performed -= OnResetRequested;
        }
    }
}
```

### Screen Fade System

#### **Smooth Transition Effects**

```csharp
public class ScreenFade : MonoBehaviour
{
    [Header("Fade Configuration")]
    public Image fadeImage;
    public Canvas fadeCanvas;

    void Start()
    {
        SetupFadeSystem();
    }

    void SetupFadeSystem()
    {
        if (fadeCanvas == null)
        {
            GameObject fadeGO = new GameObject("Screen Fade Canvas");
            fadeCanvas = fadeGO.AddComponent<Canvas>();
            fadeCanvas.renderMode = RenderMode.ScreenSpaceOverlay;
            fadeCanvas.sortingOrder = 1000;
        }

        if (fadeImage == null)
        {
            GameObject imageGO = new GameObject("Fade Image");
            imageGO.transform.SetParent(fadeCanvas.transform);
            fadeImage = imageGO.AddComponent<Image>();

            RectTransform rect = fadeImage.GetComponent<RectTransform>();
            rect.anchorMin = Vector2.zero;
            rect.anchorMax = Vector2.one;
            rect.sizeDelta = Vector2.zero;
            rect.anchoredPosition = Vector2.zero;
        }

        // شروع با شفافیت کامل
        Color color = fadeImage.color;
        color.a = 0f;
        fadeImage.color = color;
    }

    public IEnumerator FadeOut(float duration, Color fadeColor)
    {
        fadeImage.color = new Color(fadeColor.r, fadeColor.g, fadeColor.b, 0f);

        float elapsed = 0f;
        while (elapsed < duration)
        {
            float alpha = Mathf.Lerp(0f, 1f, elapsed / duration);
            fadeImage.color = new Color(fadeColor.r, fadeColor.g, fadeColor.b, alpha);
            elapsed += Time.deltaTime;
            yield return null;
        }

        fadeImage.color = new Color(fadeColor.r, fadeColor.g, fadeColor.b, 1f);
    }

    public IEnumerator FadeIn(float duration)
    {
        Color startColor = fadeImage.color;

        float elapsed = 0f;
        while (elapsed < duration)
        {
            float alpha = Mathf.Lerp(1f, 0f, elapsed / duration);
            fadeImage.color = new Color(startColor.r, startColor.g, startColor.b, alpha);
            elapsed += Time.deltaTime;
            yield return null;
        }

        fadeImage.color = new Color(startColor.r, startColor.g, startColor.b, 0f);
    }
}
```

## بهینه‌سازی Performance و UX

### Culling و LOD Systems

#### **UI Performance Optimization**

```csharp
public class VRUIPerformanceManager : MonoBehaviour
{
    [Header("Performance Settings")]
    public float maxUIDistance = 10f;
    public int maxActiveUIPanels = 3;

    [Header("LOD Settings")]
    public float highQualityDistance = 2f;
    public float mediumQualityDistance = 5f;

    private List<VRUIPanel> allUIPanels;
    private Camera vrCamera;

    void Start()
    {
        vrCamera = Camera.main;
        allUIPanels = FindObjectsOfType<VRUIPanel>().ToList();

        InvokeRepeating(nameof(UpdateUILOD), 0f, 0.1f);
    }

    void UpdateUILOD()
    {
        foreach (var panel in allUIPanels)
        {
            float distance = Vector3.Distance(
                panel.transform.position,
                vrCamera.transform.position
            );

            if (distance > maxUIDistance)
            {
                panel.gameObject.SetActive(false);
                continue;
            }

            // تنظیم LOD بر اساس فاصله
            UIQualityLevel quality = GetQualityLevel(distance);
            panel.SetQualityLevel(quality);
        }
    }

    UIQualityLevel GetQualityLevel(float distance)
    {
        if (distance <= highQualityDistance) return UIQualityLevel.High;
        if (distance <= mediumQualityDistance) return UIQualityLevel.Medium;
        return UIQualityLevel.Low;
    }
}

public enum UIQualityLevel
{
    High,
    Medium,
    Low
}
```

## نتیجه‌گیری و بهترین practices

### اصول طراحی VR UI

1. **Spatial Integration**: UI باید با محیط یکپارچه باشد
2. **Ergonomic Positioning**: موقعیت‌یابی بر اساس راحتی کاربر
3. **Clear Visual Hierarchy**: سلسله‌مراتب واضح اطلاعات
4. **Responsive Feedback**: بازخورد فوری و مناسب
5. **Performance First**: بهینه‌سازی برای VR hardware

### نکات پیشرفته

- استفاده از **Adaptive UI** که با behavior کاربر تطبیق می‌یابد
- پیاده‌سازی **Context-Aware Interfaces** برای تجربه هوشمندتر
- ترکیب **Multi-Modal Feedback** برای engagement بهتر
