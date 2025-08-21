---
sidebar_position: 6

title: ساخت فضای سه‌بعدی از صفر
---

# راهنمای جامع ایجاد مدل‌های سه‌بعدی و بهینه‌سازی برای Unity

## بخش ۱: طراحی مدل با Sweet Home 3D

### نصب و راه‌اندازی

#### منابع دانلود

- **Microsoft Store**: دسترسی مستقیم برای Windows
- **وبسایت رسمی**: [sweethome3d.com](http://www.sweethome3d.com/download.jsp)

:::tip مزیت Sweet Home 3D
نرم‌افزار رایگان و مناسب برای طراحی سریع فضاهای معماری ساده است.
:::

### شروع پروژه جدید

#### مراحل اولیه:

1. **ایجاد پروژه جدید**
2. **آشنایی با رابط کاربری**:
   - **Catalog** (سمت چپ): عناصر آماده
   - **Plan View**: نمای دوبعدی طراحی
   - **3D View**: پیش‌نمایش سه‌بعدی

#### عناصر موجود در Catalog:

| دسته‌بندی           | محتوا              |
| ------------------- | ------------------ |
| **Walls**           | انواع دیوار        |
| **Doors & Windows** | درها و پنجره‌ها    |
| **Furniture**       | مبلمان و دکوراسیون |
| **Kitchen**         | تجهیزات آشپزخانه   |
| **Bathroom**        | تجهیزات حمام       |

### فرایند طراحی

#### ساخت ساختار اصلی:

1. **استفاده از Room Tool** برای ترسیم کنتور اتاق
2. **Drag & Drop** عناصر از Catalog به Plan View
3. **تنظیم ابعاد** با استفاده از Property Panel

#### شخصی‌سازی:

- **Texture ها**: اعمال بافت بر روی سطوح
- **رنگ‌ها**: تنظیم پالت رنگی
- **نورپردازی**: تنظیم منابع نور

![طراحی در Sweet Home 3D](./img/6-create-custom-room.png)

:::info نکته طراحی
از 3D View برای بررسی نتیجه نهایی و تنظیم زاویه‌های مناسب استفاده کنید.
:::

## بخش ۲: Export برای Unity

### تنظیمات Export

**مسیر**: `3D View > Export to OBJ format`

#### پارامترهای مهم:

| تنظیم               | مقدار توصیه‌شده | توضیح              |
| ------------------- | --------------- | ------------------ |
| **Quality**         | High            | کیفیت بالای مدل    |
| **Export textures** | ✅ فعال         | شامل بافت‌ها       |
| **Width × Height**  | 1024+ px        | رزولوشن مناسب      |
| **Include Ground**  | اختیاری         | بسته به نیاز پروژه |

### فایل‌های خروجی

پس از Export، فایل‌های زیر تولید می‌شوند:

- **`.obj`**: مدل سه‌بعدی اصلی
- **`.mtl`**: تعریف مواد و بافت‌ها
- **Texture files**: فایل‌های تصویری بافت

:::warning نکته مهم
تمام فایل‌ها را در یک پوشه نگه دارید تا ارجاعات بافت‌ها حفظ شود.
:::

## بخش ۳: Import به Unity

### وارد کردن فایل‌های OBJ

#### مراحل Import:

1. **کپی کردن** پوشه Export به داخل Assets
2. **تشخیص خودکار** فایل .obj توسط Unity
3. **تنظیم پارامترهای Model**

### پیکربندی Model Settings

در **Inspector > Model tab**:

| پارامتر                | مقدار | دلیل                    |
| ---------------------- | ----- | ----------------------- |
| **Scale Factor**       | 0.01  | تبدیل سانتی‌متر به متر  |
| **Generate Colliders** | ✅    | تعامل فیزیکی            |
| **Read/Write Enabled** | ✅    | لازم برای ProBuilderize |

:::caution مشکل رایج
مدل ممکن است ابتدا تکه‌تکه یا نادرست نمایش داده شود که در مرحله بعد حل می‌شود.
:::

## بخش ۴: تصحیح UV Map با ProBuilder

### نصب ProBuilder

**مسیر**: `Package Manager > ProBuilder`

پس از نصب: `Tools > ProBuilder > ProBuilder Window`

### فرایند ProBuilderize

#### مراحل اجرا:

1. **انتخاب مدل** در Hierarchy
2. **انتخاب تمام Child Objects**
3. **کلیک روی "ProBuilderize"** در ProBuilder Window

:::info فایده ProBuilderize
تبدیل مدل به فرمت ProBuilder برای ویرایش UV Maps و نمایش صحیح Material ها.
:::

![تصحیح UV Map](./img/6-create-custom-room-2.png)

### مشکلات Sweet Home 3D

این تصحیح مخصوص Sweet Home 3D است. نرم‌افزارهای دیگر ممکن است این مشکل را نداشته باشند:

| نرم‌افزار         | وضعیت Material | نیاز به ProBuilderize |
| ----------------- | -------------- | --------------------- |
| **Sweet Home 3D** | ❌ مشکل‌دار    | ✅ ضروری              |
| **Blender**       | ✅ صحیح        | ❌ غیرضروری           |
| **Revit**         | ✅ صحیح        | ❌ غیرضروری           |

## بخش ۵: ایجاد Material های سفارشی

### منابع Texture

#### پلتفرم‌های توصیه‌شده:

| وبسایت                                          | ویژگی             | کیفیت |
| ----------------------------------------------- | ----------------- | ----- |
| **[Polyhaven.com](https://polyhaven.com/)**     | HDR + PBR         | عالی  |
| **[AmbientCG.com](https://ambientcg.com/)**     | Seamless patterns | عالی  |
| **[TextureLabs.org](https://texturelabs.org/)** | مجموعه جامع       | خوب   |

### انواع Texture مورد نیاز

برای هر Material معمولاً نیاز به موارد زیر دارید:

| نوع Texture        | نقش             | فرمت توصیه‌شده  |
| ------------------ | --------------- | --------------- |
| **Diffuse/Albedo** | رنگ اصلی        | PNG/JPG         |
| **Normal Map**     | جزئیات سطح      | PNG             |
| **Roughness**      | میزان زبری/صافی | PNG (Grayscale) |
| **Metallic**       | خواص فلزی       | PNG (Grayscale) |

### بهینه‌سازی برای VR

:::tip تنظیمات بهینه

- **Resolution**: 1024×1024 یا 2048×2048
- **Max Size**: 1024 یا 512 برای بهینه‌سازی
- **Normal Maps**: تنظیم Texture Type روی "Normal map"
  :::

### ساخت Material با URP

#### مراحل ایجاد:

1. `Assets > Create > Material`
2. **Shader**: `Universal Render Pipeline > Lit`

#### تنظیمات Surface Inputs:

Albedo Map → Diffuse Texture
Normal Map → Normal Texture  
Metallic Map → Metallic Texture
Smoothness Map → Roughness Texture

#### تنظیمات دستی:

- **Smoothness**: 0 (زبر) تا 1 (صاف)
- **Tiling & Offset**: تنظیم اندازه تکرار
- **Base Color Tint**: تصحیح رنگ نهایی

## بخش ۶: دانلود مدل از Sketchfab

### فیلترهای جستجو

**وبسایت**: [sketchfab.com/3d-models](https://sketchfab.com/3d-models)

#### تنظیمات فیلتر:

- ✅ **Free**: مدل‌های رایگان
- ✅ **Downloadable**: قابل دانلود
- ✅ **Low Poly**: زیر 10K triangles برای VR

### فرمت‌های پشتیبانی‌شده

| فرمت                | مزیت         | نیاز به پکیج                                       |
| ------------------- | ------------ | -------------------------------------------------- |
| **Original format** | کیفیت اصلی   | ❌                                                 |
| **glTF**            | استاندارد وب | ✅ [glTFast](https://github.com/atteneder/glTFast) |
| **FBX**             | صنعتی        | ❌                                                 |

### نصب پکیج glTFast

برای پشتیبانی از فایل‌های glTF:

Package Manager > Add package from git URL:
https://github.com/atteneder/glTFast.git

:::info مزیت glTF
فرمت مدرن و بهینه برای انتقال مدل‌های سه‌بعدی با پشتیبانی Material کامل.
:::

## بخش ۷: نرم‌افزارهای پیشرفته

### جایگزین‌های حرفه‌ای

برای پروژه‌های پیچیده‌تر:

| نرم‌افزار    | تخصص           | سطح دشواری |
| ------------ | -------------- | ---------- |
| **Blender**  | مدل‌سازی عمومی | متوسط      |
| **3ds Max**  | معماری/صنعتی   | بالا       |
| **Revit**    | معماری BIM     | بالا       |
| **SketchUp** | معماری ساده    | کم         |

### نکات انتقال به Unity

:::caution بهینه‌سازی

- **Poly Count**: کنترل تعداد مثلث‌ها
- **Texture Resolution**: تنظیم اندازه مناسب
- **LOD Systems**: استفاده از سطوح جزئیات
- **Occlusion Culling**: حذف اشیاء غیرقابل مشاهده
  :::

---

**نسخه مستند**: 2.0  
**آخرین به‌روزرسانی**: ۱۴۰۴/۰۵/۳۰

:::note به‌روزرسانی آینده
این راهنما با معرفی ابزارهای جدید مدل‌سازی و بهینه‌سازی‌های Unity به‌روزرسانی خواهد شد.
:::
