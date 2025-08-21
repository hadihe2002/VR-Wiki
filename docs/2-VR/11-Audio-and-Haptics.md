---
sidebar_position: 11
title: صدا و افکت‌های کنترلر (Audio & Haptics)
---

# راهنمای جامع Audio and Haptics در Unity VR

سیستم‌های صوتی و لمسی از جزء‌های حیاتی تجربه VR محسوب می‌شوند که به طور مستقیم بر میزان **immersion** و **presence** کاربر تأثیر می‌گذارند.

:::info منابع یادگیری

- **آموزش Unity**: [Audio and Haptics Tutorial](https://learn.unity.com/pathway/vr-development/unit/events-and-interactions/tutorial/2-1-audio-and-haptics?version=2022.3)
- **راه‌حل چالش‌ها**: [کانال YouTube](https://www.youtube.com/@garlicsuter)
  :::

## بخش ۱: مبانی Audio System در VR

### ساختار سیستم صوتی VR

```
VR Audio System:
├── XR Origin (Audio Listener)
├── Audio Sources (3D Spatial)
├── Audio Mixer Groups
├── Reverb Zones
└── Occlusion System
```

### تفاوت‌های Audio در VR

| ویژگی                  | Audio سنتی | VR Audio  |
| ---------------------- | ---------- | --------- |
| **Spatial Awareness**  | محدود      | ضروری     |
| **Head Tracking**      | ندارد      | Real-time |
| **Distance Modeling**  | ساده       | پیچیده    |
| **Performance Impact** | کم         | بالا      |

:::tip اهمیت Spatial Audio
در VR، مغز انسان به شدت به audio cue ها برای تشخیص مکان و جهت وابسته است.
:::

## بخش ۲: راه‌اندازی صدای سه‌بعدی

### پیکربندی Audio Source

#### تنظیمات پایه:

```csharp
public class VRAudioSource : MonoBehaviour
{
    [Header("3D Audio Settings")]
    public AudioClip audioClip;
    public bool playOnAwake = false;
    public bool loop = false;

    [Range(0f, 1f)]
    public float volume = 1f;

    [Range(0f, 1f)]
    public float spatialBlend = 1f; // Full 3D

    private AudioSource audioSource;

    void Start()
    {
        SetupAudioSource();
    }

    private void SetupAudioSource()
    {
        audioSource = GetComponent<AudioSource>();

        // Core 3D settings
        audioSource.clip = audioClip;
        audioSource.volume = volume;
        audioSource.spatialBlend = spatialBlend;
        audioSource.playOnAwake = playOnAwake;
        audioSource.loop = loop;

        // 3D Sound Settings
        audioSource.dopplerLevel = 1f;
        audioSource.spread = 0f;
        audioSource.rolloffMode = AudioRolloffMode.Logarithmic;
        audioSource.minDistance = 1f;
        audioSource.maxDistance = 500f;
    }
}
```

### تنظیمات Distance Rolloff

#### مدل‌های کاهش صدا:

```
| نوع Rolloff     | فرمول                                       | کاربرد        |
| --------------- | ------------------------------------------- | ------------- |
| **Linear**      | $Volume = 1 - \frac{distance}{maxDistance}$ | محیط‌های بسته |
| **Logarithmic** | $Volume = \frac{minDistance}{distance}$     | فضای باز      |
| **Custom**      | AnimationCurve                              | کنترل دقیق    |
```

```csharp
public void ConfigureDistanceSettings()
{
    audioSource.rolloffMode = AudioRolloffMode.Custom;

    // Custom rolloff curve
    AnimationCurve customCurve = new AnimationCurve();
    customCurve.AddKey(0f, 1f);    // Full volume at source
    customCurve.AddKey(10f, 0.5f); // Half volume at 10 units
    customCurve.AddKey(50f, 0f);   // Silent at 50 units

    audioSource.SetCustomCurve(AudioSourceCurveType.CustomRolloff, customCurve);
}
```

### Audio Listener Configuration

```csharp
public class VRAudioListener : MonoBehaviour
{
    [Header("Listener Settings")]
    public float velocityUpdateInterval = 0.1f;

    private Transform headTransform;
    private Vector3 lastPosition;
    private AudioListener audioListener;

    void Start()
    {
        audioListener = GetComponent<AudioListener>();
        headTransform = transform;
        lastPosition = headTransform.position;

        InvokeRepeating(nameof(UpdateVelocity), 0f, velocityUpdateInterval);
    }

    private void UpdateVelocity()
    {
        Vector3 velocity = (headTransform.position - lastPosition) / velocityUpdateInterval;
        AudioListener.velocityUpdateMode = AudioVelocityUpdateMode.Dynamic;
        lastPosition = headTransform.position;
    }
}
```

## بخش ۳: پیاده‌سازی صدای محیطی

### Ambient Audio System

```csharp
public class AmbientAudioManager : MonoBehaviour
{
    [System.Serializable]
    public class AmbientLayer
    {
        public string layerName;
        public AudioClip[] audioClips;
        public float volume = 0.5f;
        public float fadeTime = 2f;
        public bool randomizePlayback = true;
        [Range(0f, 1f)]
        public float spatialBlend = 0f; // 2D for ambient
    }

    [Header("Ambient Configuration")]
    public AmbientLayer[] ambientLayers;
    public AudioMixerGroup ambientMixerGroup;

    private Dictionary<string, AudioSource> layerSources;

    void Start()
    {
        InitializeAmbientLayers();
    }

    private void InitializeAmbientLayers()
    {
        layerSources = new Dictionary<string, AudioSource>();

        foreach (AmbientLayer layer in ambientLayers)
        {
            GameObject layerObject = new GameObject($"Ambient_{layer.layerName}");
            layerObject.transform.SetParent(transform);

            AudioSource source = layerObject.AddComponent<AudioSource>();
            ConfigureAmbientSource(source, layer);

            layerSources[layer.layerName] = source;
        }
    }

    private void ConfigureAmbientSource(AudioSource source, AmbientLayer layer)
    {
        source.volume = layer.volume;
        source.spatialBlend = layer.spatialBlend;
        source.loop = true;
        source.playOnAwake = false;
        source.outputAudioMixerGroup = ambientMixerGroup;

        if (layer.audioClips.Length > 0)
        {
            source.clip = layer.randomizePlayback ?
                GetRandomClip(layer.audioClips) :
                layer.audioClips[0];
        }
    }

    public void FadeInLayer(string layerName, float targetVolume = -1f)
    {
        if (layerSources.ContainsKey(layerName))
        {
            AmbientLayer layer = System.Array.Find(ambientLayers, l => l.layerName == layerName);
            float volume = targetVolume >= 0 ? targetVolume : layer.volume;

            StartCoroutine(FadeAudioSource(layerSources[layerName], volume, layer.fadeTime, true));
        }
    }

    private IEnumerator FadeAudioSource(AudioSource source, float targetVolume, float fadeTime, bool playOnStart)
    {
        if (playOnStart && !source.isPlaying)
            source.Play();

        float startVolume = source.volume;
        float elapsed = 0f;

        while (elapsed < fadeTime)
        {
            elapsed += Time.deltaTime;
            source.volume = Mathf.Lerp(startVolume, targetVolume, elapsed / fadeTime);
            yield return null;
        }

        source.volume = targetVolume;
    }
}
```

### Reverb Zone Configuration

```csharp
public class VRReverbZone : MonoBehaviour
{
    [Header("Reverb Settings")]
    public AudioReverbPreset reverbPreset = AudioReverbPreset.Room;
    public bool useCustomSettings = false;

    [Header("Custom Reverb Parameters")]
    [Range(-10000, 0)]
    public int room = -1000;
    [Range(-10000, 0)]
    public int roomHF = -100;
    [Range(0.1f, 20f)]
    public float decayTime = 1.49f;
    [Range(0.1f, 2f)]
    public float decayHFRatio = 0.83f;

    private AudioReverbZone reverbZone;

    void Start()
    {
        SetupReverbZone();
    }

    private void SetupReverbZone()
    {
        reverbZone = GetComponent<AudioReverbZone>();

        if (useCustomSettings)
        {
            reverbZone.reverbPreset = AudioReverbPreset.User;
            reverbZone.room = room;
            reverbZone.roomHF = roomHF;
            reverbZone.decayTime = decayTime;
            reverbZone.decayHFRatio = decayHFRatio;
        }
        else
        {
            reverbZone.reverbPreset = reverbPreset;
        }
    }
}
```

:::info Reverb Zones
هر فضا نیاز به تنظیمات reverb مخصوص خود دارد - اتاق کوچک، سالن بزرگ، فضای باز.
:::

## بخش ۴: سیستم بازخورد صوتی تعاملات

### Interaction Audio System

```csharp
public class InteractionAudioManager : MonoBehaviour
{
    [System.Serializable]
    public class InteractionSound
    {
        public string interactionType;
        public AudioClip[] audioClips;
        public Vector2 volumeRange = new Vector2(0.8f, 1f);
        public Vector2 pitchRange = new Vector2(0.9f, 1.1f);
        public bool use3D = true;
    }

    [Header("Interaction Sounds")]
    public InteractionSound[] interactionSounds;
    public AudioMixerGroup interactionMixerGroup;

    [Header("Audio Source Pool")]
    public int poolSize = 10;
    private Queue<AudioSource> audioSourcePool;

    void Start()
    {
        InitializeAudioPool();
    }

    private void InitializeAudioPool()
    {
        audioSourcePool = new Queue<AudioSource>();

        for (int i = 0; i < poolSize; i++)
        {
            GameObject poolObject = new GameObject($"PooledAudioSource_{i}");
            poolObject.transform.SetParent(transform);

            AudioSource source = poolObject.AddComponent<AudioSource>();
            source.playOnAwake = false;
            source.outputAudioMixerGroup = interactionMixerGroup;

            audioSourcePool.Enqueue(source);
        }
    }

    public void PlayInteractionSound(string interactionType, Vector3 position, float forceMultiplier = 1f)
    {
        InteractionSound sound = System.Array.Find(interactionSounds, s => s.interactionType == interactionType);

        if (sound != null && sound.audioClips.Length > 0)
        {
            AudioSource source = GetPooledAudioSource();
            if (source != null)
            {
                ConfigureAndPlaySound(source, sound, position, forceMultiplier);
            }
        }
    }

    private void ConfigureAndPlaySound(AudioSource source, InteractionSound sound, Vector3 position, float forceMultiplier)
    {
        // Position
        source.transform.position = position;

        // Audio clip
        source.clip = sound.audioClips[Random.Range(0, sound.audioClips.Length)];

        // Volume with force scaling
        float volume = Random.Range(sound.volumeRange.x, sound.volumeRange.y) * forceMultiplier;
        source.volume = Mathf.Clamp01(volume);

        // Pitch variation
        source.pitch = Random.Range(sound.pitchRange.x, sound.pitchRange.y);

        // 3D settings
        source.spatialBlend = sound.use3D ? 1f : 0f;

        source.Play();

        // Return to pool after playing
        StartCoroutine(ReturnToPoolWhenFinished(source));
    }

    private IEnumerator ReturnToPoolWhenFinished(AudioSource source)
    {
        yield return new WaitWhile(() => source.isPlaying);
        audioSourcePool.Enqueue(source);
    }
}
```

### Material-Based Audio

```csharp
[System.Serializable]
public class MaterialAudioData
{
    public string materialName;
    public AudioClip[] impactSounds;
    public AudioClip[] frictionSounds;
    public float hardness = 1f; // 0-1, affects volume and pitch
    public float density = 1f;  // affects low-frequency content
}

public class MaterialAudioSystem : MonoBehaviour
{
    [Header("Material Database")]
    public MaterialAudioData[] materials;

    public MaterialAudioData GetMaterialData(string materialName)
    {
        return System.Array.Find(materials, m => m.materialName == materialName);
    }

    public void PlayMaterialCollision(string material1, string material2, float collisionForce, Vector3 position)
    {
        MaterialAudioData mat1 = GetMaterialData(material1);
        MaterialAudioData mat2 = GetMaterialData(material2);

        if (mat1 != null && mat2 != null)
        {
            // Calculate interaction properties
            float avgHardness = (mat1.hardness + mat2.hardness) / 2f;
            float avgDensity = (mat1.density + mat2.density) / 2f;

            // Select audio clip
            AudioClip clip = mat1.impactSounds[Random.Range(0, mat1.impactSounds.Length)];

            // Play with calculated properties
            PlayCollisionAudio(clip, position, collisionForce, avgHardness, avgDensity);
        }
    }

    private void PlayCollisionAudio(AudioClip clip, Vector3 position, float force, float hardness, float density)
    {
        // Implementation using InteractionAudioManager
        float volume = Mathf.Clamp01(force * hardness);
        float pitch = 0.8f + (hardness * 0.4f); // Harder materials = higher pitch

        // Play audio with calculated parameters
    }
}
```

![VR Audio System](./img/11-audio-and-haptics.avif)

## بخش ۵: سیستم Haptic Feedback

### XR Controller Haptics

```csharp
using UnityEngine.XR;

public class VRHapticsManager : MonoBehaviour
{
    [System.Serializable]
    public class HapticPattern
    {
        public string patternName;
        public float[] intensities;
        public float[] durations;
        public float totalDuration;
    }

    [Header("Haptic Configuration")]
    public HapticPattern[] hapticPatterns;

    [Header("Controller References")]
    public XRNode leftController = XRNode.LeftHand;
    public XRNode rightController = XRNode.RightHand;

    private InputDevice leftDevice;
    private InputDevice rightDevice;

    void Start()
    {
        InitializeControllers();
    }

    private void InitializeControllers()
    {
        leftDevice = InputDevices.GetDeviceAtXRNode(leftController);
        rightDevice = InputDevices.GetDeviceAtXRNode(rightController);
    }

    public void TriggerHaptic(XRNode controller, string patternName)
    {
        HapticPattern pattern = System.Array.Find(hapticPatterns, p => p.patternName == patternName);

        if (pattern != null)
        {
            StartCoroutine(PlayHapticPattern(controller, pattern));
        }
    }

    public void TriggerSimpleHaptic(XRNode controller, float intensity, float duration)
    {
        InputDevice device = controller == XRNode.LeftHand ? leftDevice : rightDevice;

        if (device.isValid)
        {
            device.SendHapticImpulse(0, intensity, duration);
        }
    }

    private IEnumerator PlayHapticPattern(XRNode controller, HapticPattern pattern)
    {
        InputDevice device = controller == XRNode.LeftHand ? leftDevice : rightDevice;

        if (!device.isValid) yield break;

        for (int i = 0; i < pattern.intensities.Length; i++)
        {
            device.SendHapticImpulse(0, pattern.intensities[i], pattern.durations[i]);
            yield return new WaitForSeconds(pattern.durations[i]);
        }
    }

    public void StopHaptics(XRNode controller)
    {
        InputDevice device = controller == XRNode.LeftHand ? leftDevice : rightDevice;

        if (device.isValid)
        {
            device.StopHaptics();
        }
    }
}
```

### Haptic Patterns Library

```csharp
public static class HapticPatterns
{
    // Quick tap
    public static readonly HapticPattern Tap = new HapticPattern
    {
        patternName = "Tap",
        intensities = new float[] { 0.8f },
        durations = new float[] { 0.1f },
        totalDuration = 0.1f
    };

    // Double tap
    public static readonly HapticPattern DoubleTap = new HapticPattern
    {
        patternName = "DoubleTap",
        intensities = new float[] { 0.8f, 0f, 0.8f },
        durations = new float[] { 0.1f, 0.1f, 0.1f },
        totalDuration = 0.3f
    };

    // Collision impact
    public static readonly HapticPattern Impact = new HapticPattern
    {
        patternName = "Impact",
        intensities = new float[] { 1f, 0.6f, 0.3f },
        durations = new float[] { 0.05f, 0.1f, 0.15f },
        totalDuration = 0.3f
    };

    // Texture feedback
    public static readonly HapticPattern Texture = new HapticPattern
    {
        patternName = "Texture",
        intensities = new float[] { 0.3f, 0.5f, 0.3f, 0.5f, 0.3f },
        durations = new float[] { 0.05f, 0.05f, 0.05f, 0.05f, 0.05f },
        totalDuration = 0.25f
    };
}
```

## بخش ۶: ترکیب صدا و لمس

### Synchronized Feedback System

```csharp
public class AudioHapticFeedback : MonoBehaviour
{
    [System.Serializable]
    public class FeedbackEvent
    {
        public string eventName;
        public AudioClip audioClip;
        public HapticPattern hapticPattern;
        public bool synchronizeEvents = true;
        public float audioDelay = 0f;
        public float hapticDelay = 0f;
    }

    [Header("Feedback Events")]
    public FeedbackEvent[] feedbackEvents;

    private InteractionAudioManager audioManager;
    private VRHapticsManager hapticsManager;

    void Start()
    {
        audioManager = FindObjectOfType<InteractionAudioManager>();
        hapticsManager = FindObjectOfType<VRHapticsManager>();
    }

    public void TriggerFeedback(string eventName, Vector3 position, XRNode controller)
    {
        FeedbackEvent feedbackEvent = System.Array.Find(feedbackEvents, e => e.eventName == eventName);

        if (feedbackEvent != null)
        {
            StartCoroutine(ExecuteFeedback(feedbackEvent, position, controller));
        }
    }

    private IEnumerator ExecuteFeedback(FeedbackEvent feedbackEvent, Vector3 position, XRNode controller)
    {
        // Start both audio and haptic with their respective delays
        if (feedbackEvent.audioClip != null)
        {
            if (feedbackEvent.audioDelay > 0)
                yield return new WaitForSeconds(feedbackEvent.audioDelay);

            PlayAudioAtPosition(feedbackEvent.audioClip, position);
        }

        if (feedbackEvent.hapticPattern != null)
        {
            if (feedbackEvent.hapticDelay > 0)
                yield return new WaitForSeconds(feedbackEvent.hapticDelay);

            hapticsManager.TriggerHaptic(controller, feedbackEvent.hapticPattern.patternName);
        }
    }

    private void PlayAudioAtPosition(AudioClip clip, Vector3 position)
    {
        // Use audio manager to play positioned audio
        GameObject tempAudio = new GameObject("TempAudio");
        tempAudio.transform.position = position;

        AudioSource source = tempAudio.AddComponent<AudioSource>();
        source.clip = clip;
        source.spatialBlend = 1f;
        source.Play();

        Destroy(tempAudio, clip.length);
    }
}
```

### Texture Simulation System

```csharp
public class TextureHapticSimulator : MonoBehaviour
{
    [Header("Texture Properties")]
    public float roughness = 0.5f; // 0-1
    public float frequency = 10f;   // Hz
    public AnimationCurve roughnessCurve = AnimationCurve.Linear(0, 0, 1, 1);

    [Header("Audio Feedback")]
    public AudioClip[] frictionSounds;
    public float audioVolumeMultiplier = 0.3f;

    private bool isBeingTouched = false;
    private float lastTouchTime;

    public void StartTextureSimulation(XRNode controller, float velocity)
    {
        if (!isBeingTouched)
        {
            isBeingTouched = true;
            StartCoroutine(SimulateTexture(controller, velocity));
        }
    }

    public void StopTextureSimulation()
    {
        isBeingTouched = false;
    }

    private IEnumerator SimulateTexture(XRNode controller, float velocity)
    {
        VRHapticsManager haptics = FindObjectOfType<VRHapticsManager>();

        while (isBeingTouched)
        {
            // Calculate haptic intensity based on roughness and velocity
            float intensity = roughnessCurve.Evaluate(roughness) * velocity;
            float duration = 1f / frequency;

            // Trigger haptic pulse
            haptics.TriggerSimpleHaptic(controller, intensity, duration * 0.5f);

            // Play friction audio occasionally
            if (Random.value < 0.3f && frictionSounds.Length > 0)
            {
                PlayFrictionAudio(velocity);
            }

            yield return new WaitForSeconds(duration);
        }
    }

    private void PlayFrictionAudio(float velocity)
    {
        AudioClip clip = frictionSounds[Random.Range(0, frictionSounds.Length)];

        AudioSource.PlayClipAtPoint(clip, transform.position,
            audioVolumeMultiplier * velocity);
    }
}
```

## بخش ۷: بهینه‌سازی Performance

### Audio Performance Optimization

```csharp
public class AudioPerformanceManager : MonoBehaviour
{
    [Header("Performance Settings")]
    public int maxConcurrentSources = 32;
    public float cullingDistance = 50f;
    public float updateInterval = 0.1f;

    [Header("LOD Settings")]
    public float highQualityDistance = 10f;
    public float mediumQualityDistance = 25f;

    private List<AudioSource> managedSources = new List<AudioSource>();
    private Transform playerTransform;

    void Start()
    {
        playerTransform = Camera.main.transform;
        InvokeRepeating(nameof(UpdateAudioLOD), 0f, updateInterval);
    }

    public void RegisterAudioSource(AudioSource source)
    {
        if (!managedSources.Contains(source))
        {
            managedSources.Add(source);
        }
    }

    public void UnregisterAudioSource(AudioSource source)
    {
        managedSources.Remove(source);
    }

    private void UpdateAudioLOD()
    {
        // Sort sources by distance
        managedSources.Sort((a, b) =>
        {
            float distA = Vector3.Distance(playerTransform.position, a.transform.position);
            float distB = Vector3.Distance(playerTransform.position, b.transform.position);
            return distA.CompareTo(distB);
        });

        int activeSources = 0;

        foreach (AudioSource source in managedSources)
        {
            float distance = Vector3.Distance(playerTransform.position, source.transform.position);

            // Distance culling
            if (distance > cullingDistance)
            {
                if (source.isPlaying)
                    source.Pause();
                continue;
            }

            // Limit concurrent sources
            if (activeSources >= maxConcurrentSources)
            {
                if (source.isPlaying)
                    source.Pause();
                continue;
            }

            // Apply LOD settings
            ApplyAudioLOD(source, distance);

            if (!source.isPlaying && source.enabled)
            {
                source.UnPause();
                activeSources++;
            }
        }
    }

    private void ApplyAudioLOD(AudioSource source, float distance)
    {
        if (distance <= highQualityDistance)
        {
            // High quality - no changes
            source.volume = source.volume; // Keep original
        }
        else if (distance <= mediumQualityDistance)
        {
            // Medium quality - slight reduction
            source.volume *= 0.8f;
        }
        else
        {
            // Low quality - significant reduction
            source.volume *= 0.5f;
        }
    }
}
```

### Memory Management

```csharp
public class AudioMemoryManager : MonoBehaviour
{
    [Header("Memory Settings")]
    public float memoryThresholdMB = 100f;
    public int maxCachedClips = 50;

    private Dictionary<string, AudioClip> audioCache = new Dictionary<string, AudioClip>();
    private Queue<string> cacheOrder = new Queue<string>();

    public AudioClip LoadAudioClip(string clipPath)
    {
        // Check cache first
        if (audioCache.ContainsKey(clipPath))
        {
            return audioCache[clipPath];
        }

        // Load new clip
        AudioClip clip = Resources.Load<AudioClip>(clipPath);

        if (clip != null)
        {
            CacheAudioClip(clipPath, clip);
        }

        return clip;
    }

    private void CacheAudioClip(string path, AudioClip clip)
    {
        // Check cache size limit
        if (audioCache.Count >= maxCachedClips)
        {
            RemoveOldestCachedClip();
        }

        // Check memory threshold
        float currentMemoryMB = GetAudioMemoryUsageMB();
        if (currentMemoryMB > memoryThresholdMB)
        {
            ClearHalfCache();
        }

        audioCache[path] = clip;
        cacheOrder.Enqueue(path);
    }

    private void RemoveOldestCachedClip()
    {
        if (cacheOrder.Count > 0)
        {
            string oldestPath = cacheOrder.Dequeue();
            if (audioCache.ContainsKey(oldestPath))
            {
                Resources.UnloadAsset(audioCache[oldestPath]);
                audioCache.Remove(oldestPath);
            }
        }
    }

    private float GetAudioMemoryUsageMB()
    {
        float totalMemory = 0f;

        foreach (AudioClip clip in audioCache.Values)
        {
            if (clip != null)
            {
                // Approximate memory usage calculation
                totalMemory += clip.samples * clip.channels * 4f; // 4 bytes per sample (float)
            }
        }

        return totalMemory / (1024f * 1024f); // Convert to MB
    }

    private void ClearHalfCache()
    {
        int itemsToRemove = audioCache.Count / 2;

        for (int i = 0; i < itemsToRemove && cacheOrder.Count > 0; i++)
        {
            RemoveOldestCachedClip();
        }

        System.GC.Collect(); // Force garbage collection
    }
}
```

## بخش ۸: ویژگی‌های پیشرفته Spatial Audio

### HRTF و Binaural Audio

```csharp
public class SpatialAudioProcessor : MonoBehaviour
{
    [Header("Spatial Audio Settings")]
    public bool enableHRTF = true;
    public bool enableBinauralAudio = true;
    public AudioReverbPreset environmentPreset = AudioReverbPreset.Room;

    [Header("Advanced Settings")]
    public float headCircumference = 0.56f; // Average head size in meters
    public AnimationCurve distanceAttenuation;

    private Transform headTransform;
    private AudioListener audioListener;

    void Start()
    {
        SetupSpatialAudio();
    }

    private void SetupSpatialAudio()
    {
        headTransform = Camera.main.transform;
        audioListener = Camera.main.GetComponent<AudioListener>();

        // Configure Unity's spatial audio
        AudioSettings.speakerMode = AudioSpeakerMode.Stereo;

        if (enableHRTF)
        {
            // Enable spatializer plugin if available
            AudioSettings.SetSpatializerPluginName("Oculus Spatializer");
        }
    }

    public Vector3 CalculateRelativePosition(Vector3 worldPosition)
    {
        // Convert world position to head-relative coordinates
        Vector3 relativePos = headTransform.InverseTransformPoint(worldPosition);

        // Apply head size compensation
        relativePos *= (0.56f / headCircumference);

        return relativePos;
    }

    public float CalculateInterauralTimeDifference(Vector3 sourcePosition)
    {
        Vector3 relativePos = CalculateRelativePosition(sourcePosition);

        // Simplified ITD calculation
        float angle = Mathf.Atan2(relativePos.x, relativePos.z) * Mathf.Rad2Deg;
        float itd = Mathf.Sin(angle * Mathf.Deg2Rad) * (headCircumference / 343f); // 343 m/s = speed of sound

        return itd;
    }
}
```

### Audio Occlusion System

```csharp
public class AudioOcclusionSystem : MonoBehaviour
{
    [Header("Occlusion Settings")]
    public LayerMask occlusionLayers = -1;
    public float occlusionUpdateRate = 10f;
    public AnimationCurve occlusionCurve = AnimationCurve.Linear(0, 1, 1, 0.1f);

    [Header("Audio Effects")]
    public AudioLowPassFilter lowPassFilter;
    public AudioReverbFilter reverbFilter;

    private Transform listenerTransform;
    private AudioSource audioSource;
    private Coroutine occlusionCoroutine;

    void Start()
    {
        listenerTransform = Camera.main.transform;
        audioSource = GetComponent<AudioSource>();

        SetupOcclusionFilters();
        occlusionCoroutine = StartCoroutine(UpdateOcclusion());
    }

    private void SetupOcclusionFilters()
    {
        if (lowPassFilter == null)
            lowPassFilter = gameObject.AddComponent<AudioLowPassFilter>();

        if (reverbFilter == null)
            reverbFilter = gameObject.AddComponent<AudioReverbFilter>();
    }

    private IEnumerator UpdateOcclusion()
    {
        while (true)
        {
            float occlusionFactor = CalculateOcclusion();
            ApplyOcclusionEffects(occlusionFactor);

            yield return new WaitForSeconds(1f / occlusionUpdateRate);
        }
    }

    private float CalculateOcclusion()
    {
        Vector3 directionToListener = listenerTransform.position - transform.position;
        float distance = directionToListener.magnitude;

        // Raycast to detect occlusion
        RaycastHit hit;
        if (Physics.Raycast(transform.position, directionToListener.normalized, out hit, distance, occlusionLayers))
        {
            // Calculate occlusion based on distance through obstacle
            float occlusionDistance = hit.distance;
            float totalDistance = distance;

            return occlusionCurve.Evaluate(occlusionDistance / totalDistance);
        }

        return 1f; // No occlusion
    }

    private void ApplyOcclusionEffects(float occlusionFactor)
    {
        // Apply low-pass filter
        float cutoffFrequency = Mathf.Lerp(22000f, 1000f, 1f - occlusionFactor);
        lowPassFilter.cutoffFrequency = cutoffFrequency;

        // Apply volume reduction
        audioSource.volume *= occlusionFactor;

        // Apply reverb for muffled effect
        reverbFilter.reverbLevel = Mathf.Lerp(-10000f, -1000f, 1f - occlusionFactor);
    }

    void OnDestroy()
    {
        if (occlusionCoroutine != null)
        {
            StopCoroutine(occlusionCoroutine);
        }
    }
}
```

## جمع‌بندی سیستم

### اجزای پیاده‌سازی شده:

| بخش                          | وضعیت | تأثیر بر تجربه    |
| ---------------------------- | ----- | ----------------- |
| **3D Spatial Audio**         | ✅    | Immersion بالا    |
| **Ambient System**           | ✅    | Atmosphere        |
| **Interaction Feedback**     | ✅    | Responsiveness    |
| **Haptic Patterns**          | ✅    | Tactile Feedback  |
| **Performance Optimization** | ✅    | Smooth Experience |
| **Advanced Spatial**         | ✅    | Realism           |
