---
sidebar_position: 12
title: فعال و غیرفعال سازی اشیا (Activation Events)
---

# راهنمای جامع سیستم رویدادهای فعال‌سازی در Unity VR

سیستم **Activation Events** یکی از بنیادی‌ترین مکانیسم‌های تعامل در محیط‌های VR محسوب می‌شود که امکان پاسخ‌دهی هوشمند به اعمال کاربر را فراهم می‌کند.

:::info منابع یادگیری

- **آموزش Unity**: [Activation Events Tutorial](https://learn.unity.com/pathway/vr-development/unit/events-and-interactions/tutorial/2-2-activation-events?version=2022.3)
- **راه‌حل چالش‌ها**: [کانال YouTube](https://www.youtube.com/@garlicsuter)
  :::

## بخش ۱: مبانی UnityEvent System

### ساختار Event System

```
VR Event Architecture:
├── XR Interaction System
│ ├── XR Grab Interactable
│ ├── XR Socket Interactor
│ └── XR Ray Interactor
├── UnityEvent Framework
│ ├── Select Events
│ ├── Hover Events
│ └── Activate Events
└── Custom Event Handlers
├── State Managers
├── Animation Controllers
└── Audio/Visual Feedback
```

### پیاده‌سازی پایه UnityEvent

```csharp
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.XR.Interaction.Toolkit;

public class BasicActivationHandler : MonoBehaviour
{
    [System.Serializable]
    public class ActivationEvent : UnityEvent<bool> { }

    [Header("Event Configuration")]
    public ActivationEvent onActivated;
    public ActivationEvent onDeactivated;

    [Header("State Management")]
    public bool isActive = false;
    public bool allowToggle = true;
    public float cooldownTime = 0.5f;

    private bool canActivate = true;
    private XRGrabInteractable grabInteractable;

    void Start()
    {
        SetupInteractionEvents();
    }

    private void SetupInteractionEvents()
    {
        grabInteractable = GetComponent<XRGrabInteractable>();

        if (grabInteractable != null)
        {
            grabInteractable.selectEntered.AddListener(OnSelectEntered);
            grabInteractable.selectExited.AddListener(OnSelectExited);
            grabInteractable.hoverEntered.AddListener(OnHoverEntered);
            grabInteractable.hoverExited.AddListener(OnHoverExited);
            grabInteractable.activated.AddListener(OnActivated);
        }
    }

    private void OnSelectEntered(SelectEnterEventArgs args)
    {
        Debug.Log($"{gameObject.name} grabbed by {args.interactorObject.transform.name}");
        // Trigger grab-specific events
    }

    private void OnSelectExited(SelectExitEventArgs args)
    {
        Debug.Log($"{gameObject.name} released");
        // Trigger release-specific events
    }

    private void OnHoverEntered(HoverEnterEventArgs args)
    {
        Debug.Log($"{gameObject.name} hovered");
        // Visual feedback for hover state
        ApplyHoverEffect(true);
    }

    private void OnHoverExited(HoverExitEventArgs args)
    {
        Debug.Log($"{gameObject.name} hover ended");
        ApplyHoverEffect(false);
    }

    private void OnActivated(ActivateEventArgs args)
    {
        if (canActivate)
        {
            ToggleActivation();
        }
    }

    public void ToggleActivation()
    {
        if (!canActivate) return;

        isActive = allowToggle ? !isActive : true;

        if (isActive)
        {
            onActivated?.Invoke(true);
        }
        else
        {
            onDeactivated?.Invoke(false);
        }

        StartCoroutine(CooldownCoroutine());
    }

    private System.Collections.IEnumerator CooldownCoroutine()
    {
        canActivate = false;
        yield return new WaitForSeconds(cooldownTime);
        canActivate = true;
    }

    private void ApplyHoverEffect(bool isHovering)
    {
        Renderer renderer = GetComponent<Renderer>();
        if (renderer != null)
        {
            Color baseColor = isHovering ? Color.yellow : Color.white;
            renderer.material.color = baseColor;
        }
    }
}
```

## بخش ۲: تنظیم Events برای Objects مختلف

### Light Toggle System

```csharp
public class VRLightToggle : MonoBehaviour
{
    [Header("Light Configuration")]
    public Light targetLight;
    public Material onMaterial;
    public Material offMaterial;
    public AudioClip toggleSound;

    [Header("Animation Settings")]
    public AnimationCurve intensityCurve = AnimationCurve.EaseInOut(0, 0, 1, 1);
    public float transitionDuration = 0.5f;

    private bool isLightOn = false;
    private Renderer switchRenderer;
    private AudioSource audioSource;

    void Start()
    {
        Initialize();
    }

    private void Initialize()
    {
        if (targetLight == null)
            targetLight = GetComponentInChildren<Light>();

        switchRenderer = GetComponent<Renderer>();
        audioSource = GetComponent<AudioSource>();

        // Set initial state
        SetLightState(isLightOn, true);
    }

    public void ToggleLight()
    {
        isLightOn = !isLightOn;
        StartCoroutine(AnimatedLightToggle());
    }

    private System.Collections.IEnumerator AnimatedLightToggle()
    {
        float startIntensity = targetLight.intensity;
        float targetIntensity = isLightOn ? 1f : 0f;
        float elapsed = 0f;

        // Play sound effect
        if (toggleSound != null && audioSource != null)
        {
            audioSource.PlayOneShot(toggleSound);
        }

        // Animate light intensity
        while (elapsed < transitionDuration)
        {
            elapsed += Time.deltaTime;
            float progress = elapsed / transitionDuration;
            float curveValue = intensityCurve.Evaluate(progress);

            targetLight.intensity = Mathf.Lerp(startIntensity, targetIntensity, curveValue);
            yield return null;
        }

        targetLight.intensity = targetIntensity;
        targetLight.enabled = isLightOn;

        // Update switch material
        if (switchRenderer != null)
        {
            switchRenderer.material = isLightOn ? onMaterial : offMaterial;
        }
    }

    private void SetLightState(bool state, bool immediate = false)
    {
        isLightOn = state;
        targetLight.enabled = state;

        if (immediate)
        {
            targetLight.intensity = state ? 1f : 0f;
            if (switchRenderer != null)
            {
                switchRenderer.material = state ? onMaterial : offMaterial;
            }
        }
        else
        {
            StartCoroutine(AnimatedLightToggle());
        }
    }
}
```

### Door Opening Mechanism

```csharp
public class VRDoorController : MonoBehaviour
{
    [Header("Door Configuration")]
    public Transform doorPivot;
    public float openAngle = 90f;
    public float openDuration = 2f;
    public AnimationCurve openCurve = AnimationCurve.EaseInOut(0, 0, 1, 1);

    [Header("Door States")]
    public bool isOpen = false;
    public bool requiresKey = false;
    public string requiredKeyTag = "Key";

    [Header("Audio Configuration")]
    public AudioClip doorOpenSound;
    public AudioClip doorCloseSound;
    public AudioClip lockedSound;

    private Vector3 closedRotation;
    private Vector3 openRotation;
    private bool isAnimating = false;
    private AudioSource audioSource;

    void Start()
    {
        SetupDoor();
    }

    private void SetupDoor()
    {
        if (doorPivot == null)
            doorPivot = transform;

        audioSource = GetComponent<AudioSource>();

        closedRotation = doorPivot.localEulerAngles;
        openRotation = closedRotation + new Vector3(0, openAngle, 0);
    }

    public void AttemptDoorToggle(GameObject interactor = null)
    {
        if (isAnimating) return;

        if (requiresKey && !isOpen)
        {
            if (!HasRequiredKey(interactor))
            {
                PlayLockedSound();
                return;
            }
        }

        ToggleDoor();
    }

    private bool HasRequiredKey(GameObject interactor)
    {
        if (interactor == null) return false;

        // Check if interactor has required key
        GameObject key = GameObject.FindGameObjectWithTag(requiredKeyTag);
        if (key != null)
        {
            XRGrabInteractable keyInteractable = key.GetComponent<XRGrabInteractable>();
            return keyInteractable != null && keyInteractable.isSelected;
        }

        return false;
    }

    public void ToggleDoor()
    {
        if (!isAnimating)
        {
            StartCoroutine(AnimateDoor(!isOpen));
        }
    }

    private System.Collections.IEnumerator AnimateDoor(bool opening)
    {
        isAnimating = true;
        isOpen = opening;

        Vector3 startRotation = doorPivot.localEulerAngles;
        Vector3 endRotation = opening ? openRotation : closedRotation;

        // Play appropriate sound
        AudioClip soundToPlay = opening ? doorOpenSound : doorCloseSound;
        if (soundToPlay != null && audioSource != null)
        {
            audioSource.PlayOneShot(soundToPlay);
        }

        float elapsed = 0f;

        while (elapsed < openDuration)
        {
            elapsed += Time.deltaTime;
            float progress = elapsed / openDuration;
            float curveValue = openCurve.Evaluate(progress);

            Vector3 currentRotation = Vector3.Lerp(startRotation, endRotation, curveValue);
            doorPivot.localEulerAngles = currentRotation;

            yield return null;
        }

        doorPivot.localEulerAngles = endRotation;
        isAnimating = false;
    }

    private void PlayLockedSound()
    {
        if (lockedSound != null && audioSource != null)
        {
            audioSource.PlayOneShot(lockedSound);
        }
    }
}
```

### Animation Trigger System

```csharp
public class VRAnimationTrigger : MonoBehaviour
{
    [Header("Animation Configuration")]
    public Animator targetAnimator;
    public string animationTriggerName = "Activate";
    public string resetTriggerName = "Reset";

    [Header("Trigger Settings")]
    public TriggerType triggerType = TriggerType.OnGrab;
    public bool autoReset = true;
    public float resetDelay = 3f;

    [Header("Multi-State Animation")]
    public AnimationState[] animationStates;
    private int currentStateIndex = 0;

    public enum TriggerType
    {
        OnGrab,
        OnHover,
        OnActivate,
        OnProximity
    }

    [System.Serializable]
    public class AnimationState
    {
        public string stateName;
        public string triggerName;
        public float duration;
        public bool looping;
    }

    void Start()
    {
        SetupAnimationTrigger();
    }

    private void SetupAnimationTrigger()
    {
        if (targetAnimator == null)
            targetAnimator = GetComponent<Animator>();

        XRBaseInteractable interactable = GetComponent<XRBaseInteractable>();
        if (interactable != null)
        {
            switch (triggerType)
            {
                case TriggerType.OnGrab:
                    if (interactable is XRGrabInteractable grabInteractable)
                    {
                        grabInteractable.selectEntered.AddListener(OnInteractionTriggered);
                    }
                    break;

                case TriggerType.OnHover:
                    interactable.hoverEntered.AddListener(OnInteractionTriggered);
                    break;

                case TriggerType.OnActivate:
                    if (interactable is XRGrabInteractable activateInteractable)
                    {
                        activateInteractable.activated.AddListener(OnActivateTriggered);
                    }
                    break;
            }
        }
    }

    private void OnInteractionTriggered(BaseInteractionEventArgs args)
    {
        TriggerAnimation();
    }

    private void OnActivateTriggered(ActivateEventArgs args)
    {
        TriggerAnimation();
    }

    public void TriggerAnimation()
    {
        if (targetAnimator == null) return;

        if (animationStates.Length > 0)
        {
            // Multi-state animation
            AnimationState currentState = animationStates[currentStateIndex];
            targetAnimator.SetTrigger(currentState.triggerName);

            if (autoReset)
            {
                StartCoroutine(ResetAnimationAfterDelay(currentState.duration));
            }

            // Move to next state
            currentStateIndex = (currentStateIndex + 1) % animationStates.Length;
        }
        else
        {
            // Simple animation
            targetAnimator.SetTrigger(animationTriggerName);

            if (autoReset)
            {
                StartCoroutine(ResetAnimationAfterDelay(resetDelay));
            }
        }
    }

    private System.Collections.IEnumerator ResetAnimationAfterDelay(float delay)
    {
        yield return new WaitForSeconds(delay);

        if (targetAnimator != null && !string.IsNullOrEmpty(resetTriggerName))
        {
            targetAnimator.SetTrigger(resetTriggerName);
        }
    }

    public void SetAnimationState(int stateIndex)
    {
        if (stateIndex >= 0 && stateIndex < animationStates.Length)
        {
            currentStateIndex = stateIndex;
        }
    }
}
```

![VR Activation Events](./img/12-activition-event-1.avif)

## بخش ۳: برنامه‌نویسی Events پیشرفته

### Advanced Event Listener System

```csharp
public class AdvancedEventListener : MonoBehaviour
{
    [System.Serializable]
    public class EventCondition
    {
        public string conditionName;
        public ConditionType type;
        public string requiredTag;
        public float requiredValue;
        public GameObject requiredObject;

        public enum ConditionType
        {
            HasTag,
            MinimumValue,
            RequiredObject,
            TimeElapsed,
            StateMatches
        }
    }

    [Header("Event Configuration")]
    public EventCondition[] activationConditions;
    public UnityEvent onAllConditionsMet;
    public UnityEvent onConditionsFailed;

    [Header("State Management")]
    public float stateCheckInterval = 0.5f;
    public bool persistentState = false;

    private Dictionary<string, bool> conditionStates;
    private bool allConditionsMet = false;

    void Start()
    {
        InitializeConditionStates();
        InvokeRepeating(nameof(CheckConditions), 0f, stateCheckInterval);
    }

    private void InitializeConditionStates()
    {
        conditionStates = new Dictionary<string, bool>();

        foreach (EventCondition condition in activationConditions)
        {
            conditionStates[condition.conditionName] = false;
        }
    }

    public void OnInteractionEvent(string eventType, GameObject interactor)
    {
        // Handle different interaction types
        switch (eventType)
        {
            case "grab":
                ProcessGrabEvent(interactor);
                break;
            case "hover":
                ProcessHoverEvent(interactor);
                break;
            case "activate":
                ProcessActivateEvent(interactor);
                break;
        }

        CheckConditions();
    }

    private void ProcessGrabEvent(GameObject interactor)
    {
        foreach (EventCondition condition in activationConditions)
        {
            if (condition.type == EventCondition.ConditionType.HasTag)
            {
                conditionStates[condition.conditionName] = interactor.CompareTag(condition.requiredTag);
            }
        }
    }

    private void ProcessHoverEvent(GameObject interactor)
    {
        // Process hover-specific conditions
    }

    private void ProcessActivateEvent(GameObject interactor)
    {
        // Process activation-specific conditions
    }

    private void CheckConditions()
    {
        bool newAllConditionsMet = true;

        foreach (EventCondition condition in activationConditions)
        {
            bool conditionMet = EvaluateCondition(condition);
            conditionStates[condition.conditionName] = conditionMet;

            if (!conditionMet)
            {
                newAllConditionsMet = false;
            }
        }

        if (newAllConditionsMet != allConditionsMet)
        {
            allConditionsMet = newAllConditionsMet;

            if (allConditionsMet)
            {
                onAllConditionsMet?.Invoke();
            }
            else
            {
                onConditionsFailed?.Invoke();
            }
        }
    }

    private bool EvaluateCondition(EventCondition condition)
    {
        switch (condition.type)
        {
            case EventCondition.ConditionType.HasTag:
                return conditionStates.ContainsKey(condition.conditionName) &&
                       conditionStates[condition.conditionName];

            case EventCondition.ConditionType.RequiredObject:
                return condition.requiredObject != null && condition.requiredObject.activeInHierarchy;

            case EventCondition.ConditionType.TimeElapsed:
                return Time.time >= condition.requiredValue;

            default:
                return false;
        }
    }
}
```

### State Machine Implementation

```csharp
public class VRObjectStateMachine : MonoBehaviour
{
    [System.Serializable]
    public class ObjectState
    {
        public string stateName;
        public Material stateMaterial;
        public Color stateColor = Color.white;
        public AudioClip stateSound;
        public float stateDuration = -1f; // -1 = infinite
        public string[] allowedTransitions;
    }

    [Header("State Configuration")]
    public ObjectState[] states;
    public string initialState = "Idle";

    [Header("Transition Settings")]
    public bool allowManualTransitions = true;
    public bool logTransitions = true;

    private string currentState;
    private ObjectState currentStateData;
    private Dictionary<string, ObjectState> stateDict;
    private Coroutine stateTimeoutCoroutine;

    public UnityEvent<string> onStateEntered;
    public UnityEvent<string> onStateExited;

    void Start()
    {
        InitializeStateMachine();
    }

    private void InitializeStateMachine()
    {
        stateDict = new Dictionary<string, ObjectState>();

        foreach (ObjectState state in states)
        {
            stateDict[state.stateName] = state;
        }

        ChangeState(initialState);
    }

    public bool ChangeState(string newState)
    {
        if (!stateDict.ContainsKey(newState))
        {
            Debug.LogWarning($"State '{newState}' not found!");
            return false;
        }

        if (currentStateData != null && currentStateData.allowedTransitions != null)
        {
            if (!System.Array.Exists(currentStateData.allowedTransitions, s => s == newState))
            {
                Debug.LogWarning($"Transition from '{currentState}' to '{newState}' not allowed!");
                return false;
            }
        }

        // Exit current state
        if (!string.IsNullOrEmpty(currentState))
        {
            ExitState(currentState);
        }

        // Enter new state
        currentState = newState;
        currentStateData = stateDict[newState];
        EnterState(newState);

        return true;
    }

    private void EnterState(string state)
    {
        if (logTransitions)
        {
            Debug.Log($"Entering state: {state}");
        }

        ObjectState stateData = stateDict[state];

        // Apply visual changes
        ApplyStateVisuals(stateData);

        // Play state sound
        if (stateData.stateSound != null)
        {
            AudioSource.PlayClipAtPoint(stateData.stateSound, transform.position);
        }

        // Set up state timeout
        if (stateData.stateDuration > 0)
        {
            stateTimeoutCoroutine = StartCoroutine(StateTimeoutCoroutine(stateData.stateDuration));
        }

        // Trigger event
        onStateEntered?.Invoke(state);
    }

    private void ExitState(string state)
    {
        if (logTransitions)
        {
            Debug.Log($"Exiting state: {state}");
        }

        // Cancel timeout
        if (stateTimeoutCoroutine != null)
        {
            StopCoroutine(stateTimeoutCoroutine);
            stateTimeoutCoroutine = null;
        }

        // Trigger event
        onStateExited?.Invoke(state);
    }

    private void ApplyStateVisuals(ObjectState stateData)
    {
        Renderer renderer = GetComponent<Renderer>();
        if (renderer != null)
        {
            if (stateData.stateMaterial != null)
            {
                renderer.material = stateData.stateMaterial;
            }
            else
            {
                renderer.material.color = stateData.stateColor;
            }
        }
    }

    private System.Collections.IEnumerator StateTimeoutCoroutine(float duration)
    {
        yield return new WaitForSeconds(duration);

        // Auto-transition back to initial state
        ChangeState(initialState);
    }

    // Public methods for interaction events
    public void OnGrabbed()
    {
        ChangeState("Grabbed");
    }

    public void OnReleased()
    {
        ChangeState("Idle");
    }

    public void OnActivated()
    {
        ChangeState("Activated");
    }

    public string GetCurrentState()
    {
        return currentState;
    }

    public bool IsInState(string state)
    {
        return currentState == state;
    }
}
```

## بخش ۴: زنجیره Events و Sequence ها

### Sequential Activation System

```csharp
public class SequentialActivationManager : MonoBehaviour
{
    [System.Serializable]
    public class ActivationStep
    {
        public GameObject targetObject;
        public string requiredAction; // "grab", "activate", "hover"
        public float timeLimit = -1f; // -1 = no limit
        public bool mustMaintainState = false;
        public UnityEvent onStepCompleted;
        public UnityEvent onStepFailed;
    }

    [Header("Sequence Configuration")]
    public ActivationStep[] activationSequence;
    public bool allowReset = true;
    public bool requireSequentialOrder = true;

    [Header("Feedback")]
    public UnityEvent onSequenceCompleted;
    public UnityEvent onSequenceFailed;
    public UnityEvent onSequenceReset;

    private int currentStepIndex = 0;
    private bool sequenceCompleted = false;
    private Dictionary<GameObject, bool> stepStates;
    private Coroutine timeoutCoroutine;

    void Start()
    {
        InitializeSequence();
    }

    private void InitializeSequence()
    {
        stepStates = new Dictionary<GameObject, bool>();

        foreach (ActivationStep step in activationSequence)
        {
            stepStates[step.targetObject] = false;
            SetupStepListeners(step);
        }

        HighlightCurrentStep();
    }

    private void SetupStepListeners(ActivationStep step)
    {
        XRBaseInteractable interactable = step.targetObject.GetComponent<XRBaseInteractable>();
        if (interactable != null)
        {
            switch (step.requiredAction.ToLower())
            {
                case "grab":
                    if (interactable is XRGrabInteractable grabInteractable)
                    {
                        grabInteractable.selectEntered.AddListener(args => OnStepAction(step, "grab"));
                        grabInteractable.selectExited.AddListener(args => OnStepActionEnded(step, "grab"));
                    }
                    break;

                case "activate":
                    if (interactable is XRGrabInteractable activateInteractable)
                    {
                        activateInteractable.activated.AddListener(args => OnStepAction(step, "activate"));
                    }
                    break;

                case "hover":
                    interactable.hoverEntered.AddListener(args => OnStepAction(step, "hover"));
                    interactable.hoverExited.AddListener(args => OnStepActionEnded(step, "hover"));
                    break;
            }
        }
    }

    private void OnStepAction(ActivationStep step, string action)
    {
        if (sequenceCompleted) return;

        int stepIndex = System.Array.IndexOf(activationSequence, step);

        // Check if this is the correct step in sequence
        if (requireSequentialOrder && stepIndex != currentStepIndex)
        {
            if (stepIndex > currentStepIndex)
            {
                // Skip ahead - reset sequence
                ResetSequence();
                return;
            }
        }

        // Mark step as completed
        stepStates[step.targetObject] = true;
        step.onStepCompleted?.Invoke();

        // Start timeout if specified
        if (step.timeLimit > 0)
        {
            if (timeoutCoroutine != null)
            {
                StopCoroutine(timeoutCoroutine);
            }
            timeoutCoroutine = StartCoroutine(StepTimeoutCoroutine(step));
        }

        // Check if we can advance
        if (stepIndex == currentStepIndex)
        {
            AdvanceToNextStep();
        }
    }

    private void OnStepActionEnded(ActivationStep step, string action)
    {
        if (step.mustMaintainState)
        {
            stepStates[step.targetObject] = false;
            // Potentially reset sequence or mark as failed
        }
    }

    private void AdvanceToNextStep()
    {
        currentStepIndex++;

        if (currentStepIndex >= activationSequence.Length)
        {
            CompleteSequence();
        }
        else
        {
            HighlightCurrentStep();
        }
    }

    private void HighlightCurrentStep()
    {
        // Remove highlight from previous steps
        for (int i = 0; i < activationSequence.Length; i++)
        {
            ApplyStepHighlight(activationSequence[i].targetObject, i == currentStepIndex);
        }
    }

    private void ApplyStepHighlight(GameObject obj, bool highlight)
    {
        Renderer renderer = obj.GetComponent<Renderer>();
        if (renderer != null)
        {
            Color color = highlight ? Color.green : Color.white;
            renderer.material.color = color;
        }
    }

    private void CompleteSequence()
    {
        sequenceCompleted = true;
        onSequenceCompleted?.Invoke();

        Debug.Log("Sequence completed successfully!");
    }

    public void ResetSequence()
    {
        currentStepIndex = 0;
        sequenceCompleted = false;

        foreach (var key in stepStates.Keys.ToList())
        {
            stepStates[key] = false;
        }

        if (timeoutCoroutine != null)
        {
            StopCoroutine(timeoutCoroutine);
            timeoutCoroutine = null;
        }

        HighlightCurrentStep();
        onSequenceReset?.Invoke();

        Debug.Log("Sequence reset");
    }

    private System.Collections.IEnumerator StepTimeoutCoroutine(ActivationStep step)
    {
        yield return new WaitForSeconds(step.timeLimit);

        // Step timed out
        step.onStepFailed?.Invoke();
        onSequenceFailed?.Invoke();

        if (allowReset)
        {
            ResetSequence();
        }
    }
}
```

### Domino Effect System

```csharp
public class DominoEffectSystem : MonoBehaviour
{
    [System.Serializable]
    public class DominoNode
    {
        public GameObject dominoObject;
        public DominoNode[] connectedNodes;
        public float activationDelay = 0.5f;
        public bool isActivated = false;
        public UnityEvent onActivated;
    }

    [Header("Domino Configuration")]
    public DominoNode[] dominoNodes;
    public GameObject startingDomino;
    public float propagationSpeed = 1f;

    [Header("Visual Effects")]
    public ParticleSystem activationEffect;
    public AudioClip dominoSound;

    private Dictionary<GameObject, DominoNode> nodeDict;

    void Start()
    {
        InitializeDominoSystem();
    }

    private void InitializeDominoSystem()
    {
        nodeDict = new Dictionary<GameObject, DominoNode>();

        foreach (DominoNode node in dominoNodes)
        {
            nodeDict[node.dominoObject] = node;
            SetupDominoInteraction(node);
        }
    }

    private void SetupDominoInteraction(DominoNode node)
    {
        XRBaseInteractable interactable = node.dominoObject.GetComponent<XRBaseInteractable>();
        if (interactable != null)
        {
            interactable.selectEntered.AddListener(args => TriggerDomino(node));
        }
    }

    public void StartDominoEffect()
    {
        if (startingDomino != null && nodeDict.ContainsKey(startingDomino))
        {
            TriggerDomino(nodeDict[startingDomino]);
        }
    }

    public void TriggerDomino(DominoNode node)
    {
        if (node.isActivated) return;

        StartCoroutine(ActivateDominoNode(node));
    }

    private System.Collections.IEnumerator ActivateDominoNode(DominoNode node)
    {
        // Mark as activated
        node.isActivated = true;

        // Visual and audio feedback
        ApplyActivationEffects(node);

        // Trigger custom events
        node.onActivated?.Invoke();

        // Wait for activation delay
        yield return new WaitForSeconds(node.activationDelay);

        // Propagate to connected nodes
        foreach (DominoNode connectedNode in node.connectedNodes)
        {
            if (!connectedNode.isActivated)
            {
                StartCoroutine(ActivateDominoNode(connectedNode));
            }
        }
    }

    private void ApplyActivationEffects(DominoNode node)
    {
        // Change color or material
        Renderer renderer = node.dominoObject.GetComponent<Renderer>();
        if (renderer != null)
        {
            renderer.material.color = Color.red;
        }

        // Play particle effect
        if (activationEffect != null)
        {
            ParticleSystem effect = Instantiate(activationEffect, node.dominoObject.transform.position, Quaternion.identity);
            effect.Play();
            Destroy(effect.gameObject, effect.main.duration);
        }

        // Play sound
        if (dominoSound != null)
        {
            AudioSource.PlayClipAtPoint(dominoSound, node.dominoObject.transform.position);
        }
    }

    public void ResetDominoSystem()
    {
        foreach (DominoNode node in dominoNodes)
        {
            node.isActivated = false;

            // Reset visual state
            Renderer renderer = node.dominoObject.GetComponent<Renderer>();
            if (renderer != null)
            {
                renderer.material.color = Color.white;
            }
        }
    }
}
```

## بخش ۵: مدیریت Timing و Performance

### Timer-Based Event Manager

```csharp
public class TimerEventManager : MonoBehaviour
{
    [System.Serializable]
    public class TimedEvent
    {
        public string eventName;
        public float duration;
        public bool repeating = false;
        public float repeatInterval = 1f;
        public UnityEvent onEventTriggered;
        public UnityEvent onEventCompleted;

        [HideInInspector]
        public float remainingTime;
        [HideInInspector]
        public bool isActive = false;
    }

    [Header("Timer Configuration")]
    public TimedEvent[] timedEvents;
    public bool showDebugUI = true;

    [Header("Global Timer Settings")]
    public float globalTimeScale = 1f;

    private Dictionary<string, TimedEvent> eventDict;

    void Start()
    {
        InitializeTimers();
    }

    void Update()
    {
        UpdateTimers();
    }

    private void InitializeTimers()
    {
        eventDict = new Dictionary<string, TimedEvent>();

        foreach (TimedEvent timedEvent in timedEvents)
        {
            timedEvent.remainingTime = timedEvent.duration;
            eventDict[timedEvent.eventName] = timedEvent;
        }
    }

    private void UpdateTimers()
    {
        float deltaTime = Time.deltaTime * globalTimeScale;

        foreach (TimedEvent timedEvent in timedEvents)
        {
            if (timedEvent.isActive)
            {
                timedEvent.remainingTime -= deltaTime;

                if (timedEvent.remainingTime <= 0f)
                {
                    // Timer completed
                    timedEvent.onEventCompleted?.Invoke();

                    if (timedEvent.repeating)
                    {
                        timedEvent.remainingTime = timedEvent.repeatInterval;
                        timedEvent.onEventTriggered?.Invoke();
                    }
                    else
                    {
                        timedEvent.isActive = false;
                    }
                }
            }
        }
    }

    public void StartTimer(string eventName)
    {
        if (eventDict.ContainsKey(eventName))
        {
            TimedEvent timedEvent = eventDict[eventName];
            timedEvent.isActive = true;
            timedEvent.remainingTime = timedEvent.duration;
            timedEvent.onEventTriggered?.Invoke();
        }
    }

    public void StopTimer(string eventName)
    {
        if (eventDict.ContainsKey(eventName))
        {
            eventDict[eventName].isActive = false;
        }
    }

    public void PauseTimer(string eventName)
    {
        if (eventDict.ContainsKey(eventName))
        {
            eventDict[eventName].isActive = false;
        }
    }

    public void ResumeTimer(string eventName)
    {
        if (eventDict.ContainsKey(eventName))
        {
            eventDict[eventName].isActive = true;
        }
    }

    public float GetRemainingTime(string eventName)
    {
        return eventDict.ContainsKey(eventName) ? eventDict[eventName].remainingTime : 0f;
    }

    public float GetTimerProgress(string eventName)
    {
        if (eventDict.ContainsKey(eventName))
        {
            TimedEvent timedEvent = eventDict[eventName];
            return 1f - (timedEvent.remainingTime / timedEvent.duration);
        }
        return 0f;
    }

    void OnGUI()
    {
        if (!showDebugUI) return;

        GUILayout.BeginArea(new Rect(10, 10, 300, 200));
        GUILayout.Label("Timer Events Debug", GUI.skin.box);

        foreach (TimedEvent timedEvent in timedEvents)
        {
            string status = timedEvent.isActive ? "ACTIVE" : "INACTIVE";
            string timeDisplay = timedEvent.remainingTime.ToString("F1");

            GUILayout.Label($"{timedEvent.eventName}: {status} ({timeDisplay}s)");

            if (GUILayout.Button($"Toggle {timedEvent.eventName}"))
            {
                if (timedEvent.isActive)
                    StopTimer(timedEvent.eventName);
                else
                    StartTimer(timedEvent.eventName);
            }
        }

        GUILayout.EndArea();
    }
}
```

### Performance Optimization Manager

```csharp
public class EventPerformanceOptimizer : MonoBehaviour
{
    [Header("Performance Settings")]
    public int maxConcurrentEvents = 20;
    public float eventCullingDistance = 30f;
    public float updateFrequency = 10f; // Hz

    [Header("Event Pooling")]
    public int eventPoolSize = 50;

    private Queue<GameObject> eventPool;
    private List<IPerformantEvent> activeEvents;
    private Transform playerTransform;
    private float lastUpdateTime;

    public interface IPerformantEvent
    {
        Vector3 GetPosition();
        bool IsActive();
        void SetActive(bool active);
        float GetPriority();
    }

    void Start()
    {
        InitializeOptimizer();
    }

    void Update()
    {
        if (Time.time - lastUpdateTime >= (1f / updateFrequency))
        {
            OptimizeEventPerformance();
            lastUpdateTime = Time.time;
        }
    }

    private void InitializeOptimizer()
    {
        eventPool = new Queue<GameObject>();
        activeEvents = new List<IPerformantEvent>();
        playerTransform = Camera.main.transform;

        // Pre-populate event pool
        for (int i = 0; i < eventPoolSize; i++)
        {
            GameObject pooledEvent = CreatePooledEvent();
            eventPool.Enqueue(pooledEvent);
        }
    }

    private GameObject CreatePooledEvent()
    {
        GameObject eventObject = new GameObject("PooledEvent");
        eventObject.SetActive(false);
        return eventObject;
    }

    private void OptimizeEventPerformance()
    {
        // Sort events by distance and priority
        activeEvents.Sort((a, b) =>
        {
            float distanceA = Vector3.Distance(playerTransform.position, a.GetPosition());
            float distanceB = Vector3.Distance(playerTransform.position, b.GetPosition());
            float priorityA = a.GetPriority() / (distanceA + 1f);
            float priorityB = b.GetPriority() / (distanceB + 1f);

            return priorityB.CompareTo(priorityA);
        });

        int activeCount = 0;

        foreach (IPerformantEvent eventObj in activeEvents)
        {
            float distance = Vector3.Distance(playerTransform.position, eventObj.GetPosition());

            // Distance culling
            if (distance > eventCullingDistance)
            {
                eventObj.SetActive(false);
                continue;
            }

            // Limit concurrent events
            if (activeCount >= maxConcurrentEvents)
            {
                eventObj.SetActive(false);
                continue;
            }

            eventObj.SetActive(true);
            activeCount++;
        }
    }

    public GameObject GetPooledEvent()
    {
        if (eventPool.Count > 0)
        {
            GameObject pooledEvent = eventPool.Dequeue();
            pooledEvent.SetActive(true);
            return pooledEvent;
        }
        else
        {
            return CreatePooledEvent();
        }
    }

    public void ReturnEventToPool(GameObject eventObject)
    {
        eventObject.SetActive(false);
        eventPool.Enqueue(eventObject);
    }

    public void RegisterEvent(IPerformantEvent eventObj)
    {
        if (!activeEvents.Contains(eventObj))
        {
            activeEvents.Add(eventObj);
        }
    }

    public void UnregisterEvent(IPerformantEvent eventObj)
    {
        activeEvents.Remove(eventObj);
    }
}
```

## جمع‌بندی سیستم

### اجزای پیاده‌سازی شده:

| بخش                          | وضعیت | کاربرد        |
| ---------------------------- | ----- | ------------- |
| **Basic Events**             | ✅    | تعاملات ساده  |
| **Object-Specific Systems**  | ✅    | کاربردهای خاص |
| **Advanced Scripting**       | ✅    | منطق پیچیده   |
| **Sequential Events**        | ✅    | پازل و سناریو |
| **Performance Optimization** | ✅    | بازی‌های بزرگ |

### نتیجه نهایی

سیستم **Activation Events** پیشرفته امکان ایجاد تعاملات غنی و پاسخگو در محیط VR را فراهم می‌کند که تجربه کاربر را به میزان قابل توجهی بهبود می‌بخشد.
