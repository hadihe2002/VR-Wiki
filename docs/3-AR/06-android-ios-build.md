# 06 — بیلد پایدار برای Android (الزامی) و نکات iOS (اختیاری)
> این فصل گام‌به‌گام شما را به یک **بیلد پایدار** می‌رساند: تنظیم‌های Player/Project، امضای بسته، خطایابی نصب، و نکات مهم Xcode برای iOS. همهٔ موارد **عمومی** هستند و به اپلیکیشن خاصی اشاره ندارند.

- **چکیده:** برای Android، `IL2CPP + ARM64` با حداقل API مناسب، XR Plugin Management فعال، و امضای صحیح ضروری‌اند. برای iOS، Xcode + Provisioning + `Camera Usage Description` و فعال‌بودن ARKit شرط اجراست.
- **پس از مطالعه:** می‌توانید AAB/APK (Android) و پروژهٔ Xcode (iOS) بسازید، نصب کنید، و خطاهای متداول را سریع رفع کنید.

---

## 1) پیش‌نیازهای نصب و ابزار
- **Unity 2022 LTS (2022.3.x)** از طریق Unity Hub
- **Android Build Support** + **Android SDK & NDK Tools** + **OpenJDK** (از Hub اضافه کنید)
- (اختیاری) **iOS Build Support** (تنها روی macOS کاربرد دارد) + **Xcode** آخرین نسخهٔ پایدار
- یک دستگاه **Android** پشتیبانی‌شده توسط ARCore یا **iOS** پشتیبانی‌شده توسط ARKit

> از نصب SDK/NDK خارجی خودداری کنید مگر مجبور باشید؛ تنظیمات Hub معمولاً پایدارتر است.

---

## 2) تنظیم‌های ضروری پروژه (Android)
Edit → **Project Settings**

### 2.1 XR Plugin Management
- Android: تیک **ARCore** را بزنید.

### 2.2 Player → Other Settings (Android)
| گزینه | مقدار توصیه‌شده | توضیح |
|---|---|---|
| **Scripting Backend** | **IL2CPP** | برای عملکرد/سازگاری بهتر |
| **Target Architectures** | **ARM64** | الزامی برای فروشگاه‌ها؛ ARMv7 را حذف کنید مگر نیاز خاص |
| **Api Compatibility Level** | .NET Standard 2.1 | پیش‌فرض مناسب است |
| **Managed Stripping Level** | Medium یا Low | به تعادل بین حجم و سازگاری توجه کنید |
| **Color Space** | Linear | رندر بهتر؛ در صورت ناسازگاری به Gamma برگردید |
| **Auto Graphics API** | روشن | برای شروع ساده‌تر است |
| **Minimum API Level** | Android 8/9 یا بالاتر | بسته به نیاز؛ ARCore معمولاً Android 8+ |
| **Target API Level** | Latest Installed | هم‌راستا با الزامات فروشگاه |
| **Multithreaded Rendering** | روشن | عملکرد بهتر در اغلب دستگاه‌ها |
| **Graphics Jobs** | روشن (در صورت مشکل خاموش) | به GPU کمک می‌کند |

### 2.3 Player → Identification
- **Package Name**: قالب معکوس دامنه (مثلاً `com.example.arapp`).
- **Version** / **Bundle Version Code (Android)**: برای هر بیلد افزایش دهید.

### 2.4 Player → Publishing Settings (Android)
- اگر می‌خواهید روی دستگاه نصب کنید: **Keystore** بسازید/انتخاب کنید (Debug/Release).
- برای انتشار در Play: **AAB** بسازید (ترجیح فروشگاه).

---

## 3) ساخت AAB/APK (Android)
File → **Build Settings** → **Android** → Switch Platform  
- **Scenes In Build**: صحنهٔ اصلی را اضافه کنید.  
- **Build** یا **Build And Run** (USB Debugging در دستگاه فعال باشد).

**AAB vs APK**
- **AAB**: قالب توصیه‌شده برای توزیع فروشگاهی (Google Play).
- **APK**: برای نصب مستقیم/تست محلی مفید است.

---

## 4) خطایابی نصب و اجرا (Android)
### 4.1 Logcat (لاگ‌گیری)
- Unity → Window → Analysis → **Android Logcat**  
یا با ADB:
```bash
adb devices
adb install -r path/to/your.apk
adb logcat -s Unity ActivityManager AndroidRuntime
```
- اگر نصب شکست خورد، خطای پیام را دقیق بخوانید (کدهای زیر).

### 4.2 خطاهای رایج Android و راه‌حل سریع
| پیام/نشانه | علت محتمل | راهکار |
|---|---|---|
| `INSTALL_FAILED_VERSION_DOWNGRADE` | Version Code کمتر از نسخهٔ نصب‌شده | **Bundle Version Code** را افزایش دهید |
| کرش در اجرا (بلافاصله) | نبود مجوز یا ناسازگاری ABI | Camera Permission، ARM64 فقط، Logcat را بخوانید |
| خطای Gradle/SDK | نسخه‌های ابزار ناسازگار | از SDK/NDK/Gradle داخلی Hub استفاده کنید؛ Clear Gradle Cache |
| `Unable to list target platforms` | مسیر SDK خراب | مسیر SDK را در Preferences → External Tools اصلاح کنید |
| FPS پایین | تنظیمات سنگین/Prefabهای پرهزینه | کیفیت را کاهش دهید، Visualization اضافی را خاموش کنید |
| صفحه سیاه | مجوز دوربین، ARSession خاموش | Permission را بررسی کنید، XR و ARSession فعال باشد |

### 4.3 امضا و نصب
- برای نصب روی دستگاه: Debug keystore کافی است.  
- برای کانال رسمی: **Keystore Release** را امن نگه دارید؛ گم‌شدن آن یعنی عدم توانایی در آپدیت نسخه.

---

## 5) دسترسی‌ها و Manifest (Android)
- Unity به‌صورت خودکار **Camera** را اضافه می‌کند (برای AR).
- اگر Plug-inهایی دارید که دسترسی اضافی می‌خواهند، علت را به کاربر **شفاف** توضیح دهید.
- حداقل دسترسی‌ها را نگه دارید؛ اصل کمترین امتیاز (Principle of Least Privilege).

---

## 6) نکات پایداری/عملکرد (Android)
- **IL2CPP + ARM64** را حفظ کنید؛ ARMv7 را فقط در صورت نیاز فعال کنید.
- **Strip Engine Code** را با احتیاط فعال کنید (ممکن است با برخی Plug-inها تعارض داشته باشد).
- **Managed Stripping Level** را اگر Reflect/Plugins دارید روی Low نگه دارید.
- Visualizationهای AR (Plane/Point Cloud) را بعد از انتخاب مکان خاموش کنید.
- از **Proguard/R8** فقط در صورت نیاز استفاده کنید و قوانین استثنا برای بازتاب (Reflection) بنویسید.

---

## 7) آماده‌سازی iOS (اختیاری، روی macOS)
### 7.1 پیش‌نیاز
- macOS + **Xcode** (آخرین نسخهٔ پایدار)
- حساب توسعه‌دهندهٔ اپل و Provisioning Profile معتبر (برای نصب روی دستگاه واقعی)

### 7.2 تنظیم‌های Unity برای iOS
Edit → **Project Settings** → **XR Plugin Management**
- iOS: تیک **ARKit** را بزنید.

Player → iOS → Other Settings
| گزینه | مقدار توصیه‌شده |
|---|---|
| **Target minimum iOS** | نسخهٔ پشتیبانی‌شدهٔ ARKit (معمولاً iOS 13+) |
| **Architecture** | ARM64 |
| **Scripting Backend** | IL2CPP |
| **Graphics API** | Metal |

Player → iOS → **Camera Usage Description**
- یک متن شفاف بنویسید (مثلاً «برای نمایش محتوای AR نیاز به دوربین داریم»).

### 7.3 بیلد پروژهٔ Xcode
File → **Build Settings** → **iOS** → Switch Platform → **Build**  
- Unity پروژهٔ Xcode تولید می‌کند؛ در Xcode باز کنید، Team/Signing را ست کنید و روی دستگاه **Run** بگیرید.

### 7.4 خطایابی iOS (رایج)
| نشانه | علت محتمل | راهکار |
|---|---|---|
| Build fails: Provisioning | امضا/گواهی نامعتبر | Team/Bundle ID/Profile را هم‌خوان تنظیم کنید |
| صفحه سیاه/عدم دسترسی دوربین | Info.plist بدون Camera Usage | متن Usage Description را اضافه/اصلاح کنید |
| AR کار نمی‌کند | ARKit غیرفعال/دستگاه قدیمی | XR → ARKit را فعال کنید؛ روی دستگاه پشتیبانی‌شده تست کنید |
| نرخ فریم پایین | تنظیمات سنگین/Outline زیاد | ساده‌سازی Prefab، کاهش افکت‌ها، پروفایل با Instruments |

---

## 8) چک‌لیست نهایی برای بیلد پایدار
- [ ] XR Plugin Management برای پلتفرم هدف فعال است (ARCore/ARKit).
- [ ] Player Settings: `IL2CPP + ARM64`، API Levels مناسب.
- [ ] Scenes In Build تنظیم شده است.
- [ ] Keystore (Android) یا Signing (iOS) پیکربندی شده است.
- [ ] Camera permission/usage description تعریف شده است.
- [ ] روی دستگاه واقعی نصب و اجرا شده؛ Logcat/Xcode پاک است.
- [ ] FPS قابل‌قبول (۳۰+ روی دستگاه میان‌رده).

---

## 9) جدول «علت ↔ راهکار سریع» (Android/iOS)
| نشانه | پلتفرم | راهکار سریع |
|---|---|---|
| نصب نمی‌شود (DOWNGRADE) | Android | Version Code را افزایش دهید |
| کرش در بدو اجرا | Android | Logcat؛ XR/Permissions را چک کنید |
| صفحه سیاه | هر دو | Camera Permission/Usage + ARSession/XR فعال |
| اجرای کند | هر دو | Prefab سبک؛ Visualization خاموش؛ Multithreaded ON |
| Build fail امضا | iOS | Team/Bundle ID/Profile را هماهنگ کنید |
| AR غیرفعال | iOS | ARKit فعال + دستگاه پشتیبانی‌شده |

---

## 10) نکات کلیدی فصل
- **Android**: IL2CPP + ARM64، XR فعال، AAB برای انتشار و APK برای تست، Logcat برای خطایابی.
- **iOS**: ARKit فعال، Camera Usage Description، Signing درست، تست روی دستگاه واقعی.
- کیفیت اجرا را از طریق **سادگی صحنه** و **خاموش‌کردن Visualizationهای غیرضروری** حفظ کنید.
