# ⚡ CYBORG SUPERMARKET — Production-Oriented, AI-Powered Omnichannel Retail Ecosystem
> **منظومة سايبورغ سوبرماركت المتكاملة للتجزئة الذكية — تجمع بين المتجر الإلكتروني ثلاثي الأبعاد، تطبيق الموبايل، شاشات الكاشير وإدارة الفروع، والباك إند اللحظي.**

[![Quality Gate](https://img.shields.io/badge/Quality%20Gate-8%20Suites%20%7C%2060%20Tests%20Passed-10B981.svg)](#-automated-testing--verification)
[![Products Seeded](https://img.shields.io/badge/Catalog-1%2C000%20Verified%20SKUs-0F766E.svg)](#-real-dataset-integration-1000-skus)
[![Architecture](https://img.shields.io/badge/Architecture-Clean%20%2F%20Onion-38BDF8.svg)](#-system-architecture)
[![Egyptian Dialect AI](https://img.shields.io/badge/AI%20Voice-Egyptian%20Arabic%20NLP-F59E0B.svg)](#1-customer-web-storefront-final-customer-website--appscustomer-web)
[![Commercial Readiness](https://img.shields.io/badge/Commercial%20Gate-Production%20Ready-6366F1.svg)](#-commercial-readiness--financial-integrity)

---

## 📌 الفهرس العام (Table of Contents)
1. [نظرة عامة على المنظومة (Ecosystem Overview)](#-نظرة-عامة-على-المنظومة-ecosystem-overview)
2. [معمارية النظام الشاملة (System Architecture)](#-معمارية-النظام-الشاملة-system-architecture)
3. [تفاصيل التطبيقات والأنظمة الأربعة (Ecosystem Applications Deep-Dive)](#-تفاصيل-التطبيقات-والأنظمة-الأربعة-ecosystem-applications-deep-dive)
   - [1. المتجر الإلكتروني للعملاء (Customer Web Storefront)](#1-المتجر-الإلكتروني-للعملاء-customer-web-storefront)
   - [2. لوحة تحكم وكاشير الفروع (Flutter POS & Operations Terminal)](#2-لوحة-تحكم-وكاشير-الفروع-flutter-pos--operations-terminal)
   - [3. تطبيق الموبايل للعملاء (Customer Mobile App)](#3-تطبيق-الموبايل-للعملاء-customer-mobile-app)
   - [4. الخادم المركزي والباك إند (Central Backend & Real-Time Sync)](#4-الخادم-المركزي-والباك-إند-central-backend--real-time-sync)
4. [كتالوج المنتجات الحقيقي (Real Dataset Integration - 1,000 SKUs)](#-كتالوج-المنتجات-الحقيقي-real-dataset-integration---1000-skus)
5. [هيكل المونوريبو والدلائل (Monorepo Directory Structure)](#-هيكل-المونوريبو-والدلائل-monorepo-directory-structure)
6. [حزم الإصدارات القابلة للتحميل (Downloadable ZIP Packages)](#-حزم-الإصدارات-القابلة-للتحميل-downloadable-zip-packages)
7. [دليل التشغيل والبدء السريع (Quick Start & Running)](#-دليل-التشغيل-والبدء-السريع-quick-start--running)
8. [الاختبارات والتحقق الآلي (Automated Testing & Verification)](#-الاختبارات-والتحقق-الآلي-automated-testing--verification)
9. [مكتبة التوثيق الهندسي (Enterprise PDF Books)](#-مكتبة-التوثيق-الهندسي-enterprise-pdf-books)
10. [الأمان وتكامل البيانات (Security & Concurrency Safe)](#-الأمان-وتكامل-البيانات-security--concurrency-safe)

---

## 🌟 نظرة عامة على المنظومة (Ecosystem Overview)

منظومة **سايبورغ سوبرماركت (CYBORG Supermarket)** هي بيئة تجزئة متكاملة تجمع بين فروع السوبرماركت التقليدية على أرض الواقع (Brick-and-Mortar) والتجربة الرقمية الحديثة (Digital Omnichannel). 

تضمن المنظومة **مصدر حقيقة موحد (Single Source of Truth)** لقواعد العمل وإدارة المخزون والأسعار وحسابات العملاء، من خلال تكامل لحظي عالي السرعة بين:
* نقطة بيع الكاشير داخل المحل (Desktop POS Terminal).
* لوحات إدارة الفروع والتحكم في سلاسل الإمداد ومسؤولي المستودع (Store Operations Dashboard).
* موقع الويب للعملاء ثلاثي الأبعاد مع المساعد الصوتي المصري (3D Web Storefront).
* تطبيق الهاتف المحمول للتسوق الذكي (Customer Mobile App).
* الباك إند المركزي السحابي وقاعدة البيانات المتزامنة (Core Backend & REST API).

---

## 🏛️ معمارية النظام الشاملة (System Architecture)

تتبع المنظومة مبادئ **Clean Architecture (Onion Architecture)** لعزل منطق الأعمال الحرج تماماً عن واجهات المستخدم والعتاد وقواعد البيانات:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                              │
│   Web Storefront (3002)  │  Mobile App (Flutter)  │  POS Cashier (Desktop) │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST / SSE / WebSocket
┌───────────────────────────────────▼────────────────────────────────────┐
│                      APPLICATION CORE & USE CASES                      │
│   - CreateOrder & VAT Engine       - Voice Colloquial Parser           │
│   - Stock Reservation & Commit     - Cashier Shift Reconciliation      │
│   - Out-of-Stock Safety Guard      - Support & Complaints Dispatcher   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Repositories & Adapters
┌───────────────────────────────────▼────────────────────────────────────┐
│                    INFRASTRUCTURE & PERSISTENCE                        │
│   - SQLite3 Database (WAL Mode + 10s Concurrency Timeout)              │
│   - SSE Event Broadcasting Gateway                                     │
│   - ESC/POS Thermal Printer Driver & Cash Drawer Solenoid Pulse        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📱 تفاصيل التطبيقات والأنظمة الأربعة (Ecosystem Applications Deep-Dive)

---

### 1. المتجر الإلكتروني للعملاء (Customer Web Storefront)
* **المسارات في المشروع**: [`final-customer-website/`](final-customer-website/) و [`apps/customer-web/`](apps/customer-web/)
* **المنفذ الافتراضي**: `http://localhost:3002`
* **حزمة التقنيات**: HTML5, Modern ES6+ JavaScript, Tailwind CSS, WebGL 3D Canvas, Web Speech API, Node.js Native HTTP Microservice.

#### أهم المميزات والقدرات:
1. **المساعد الصوتي والذكاء الاصطناعي المصري (3D Voice Orb & AI)**:
   - مجسم كروي ثلاثي الأبعاد بـ WebGL يتفاعل مع الترددات الصوتية وحالة التحدث.
   - يفهم الأوامر بالعامية المصرية (مثل: *"خزين أسبوعين بـ 2000 جنيه"*، *"عايز 2 لبن جهينة وكيس شيبسي"*، *"بكام السمنة"*).
   - تخطيط ميزانية الخزين السكني من يوم إلى 365 يوم وتوزيع الميزانية بدقة حسابية صارمة على الأقسام الأساسية دون تخطي الحد الأقصى للميزانية.
2. **كتالوج التجزئة الحي (1,000 SKUs)**:
   - كتالوج كامل يضم 1,000 منتج حقيقي مقسمة إلى 5 فئات أساسية مع البحث اللحظي وتصفية الأسعار.
   - **حماية النفاذ من المخزون (Out-of-Stock Guard)**: الأصناف ذات الرصيد صفر يتم تعطيل زر إضافتها للسلة آلياً مع حظر الإضافة في المساعد الصوتي واقتراح بدائل متوفرة.
3. **سلة المشتريات ومحاكي الدفع التفاعلي 3D**:
   - محاكي بطاقة بنكية 3D ينقلب عند إدخال رمز CVV ويحدث بيانات البطاقة لحظياً.
   - دعم كامل للدفع عند الاستلام (COD) والدفع الإلكتروني بالبطاقة (Card).
   - حساب ضريبة القيمة المضافة المصرية (14% VAT) تلقائياً.
   - إصدار فاتورة ضريبية رسمية قابلة للطباعة (`Printable Receipt`) مع إرسال إشعار فوري لإيميل المتجر.
4. **التوثيق وحفظ الجلسات (Auth & Profiles)**:
   - تسجيل الدخول وإنشاء الحسابات بدون تعقيد (Zero-OTP option).
   - حفظ بيانات العميل (الاسم، الهاتف، العنوان) في الجلسة وتمريرها في كل معاملة.
5. **الربط اللحظي مع كاشير المتجر**:
   - عند تأكيد أي طلب، يُرسل إشعار لحظي عبر نقطة الابتلاع `/sync/ingest` و SSE لتظهر في شاشة الكاشير فورياً باسم العميل المسجل ورقم هاتفه.
6. **مركز الشكاوى والدعم الفني**:
   - تقديم شكاوى ومقترحات ومتابعتها من قبل الإدارة.

---

### 2. لوحة تحكم وكاشير الفروع (Flutter POS & Operations Terminal)
* **المسارات في المشروع**: [`admin-dashboard/`](admin-dashboard/) و [`apps/admin-dashboard/`](apps/admin-dashboard/)
* **المنصة**: Flutter Desktop (Linux & Windows)
* **حزمة التقنيات**: Flutter 3, Dart, Provider / PosStateManager, SQLite local sync queue, HTTP & SSE streaming.

#### أهم المميزات والقدرات:
1. **نقطة بيع الكاشير السريعة (Fast Cashier POS Checkout)**:
   - دعم مسدس قراءة الباركود (Barcode Scanner) ورموز EAN-13.
   - اختصارات لوحة المفاتيح السريعة (F2 للدفع النقدي، F3 لدفع البطاقة، F4 للإلغاء، Esc للخروج).
   - حساب الفكة المتبقية للعميل وإصدار أوامر فتح درج النقدية وطباعة الإيصال الحراري (ESC/POS).
2. **شاشة إدارة طلبات الموقع اللحظية (Online Orders Tab)**:
   - استلام طلبات الدفع عند الاستلام والبطاقات من الموقع فور تأكيدها من العميل.
   - ظهور الاسم الحقيقي للعميل ورقم هاتفه ومعرفه (`[CID: usr-xxx]`) بدقة دون نصوص افتراضية مجهولة.
   - **معالجة الأصناف الناقصة (Smart Replacement Dialog)**: نافذة منسدلة ذكية تقترح أفضل البدائل المتاحة من نفس القسم وبنفس رصيد المخزون مع حماية من الانهيار وثنائية لغة كاملة (عربي/إنجليزي).
   - ثبات ومزامنة حالة الطلب الفورية: الانتقال المباشر للطلب بين المراحل:
     `CONFIRMED` ➔ `PREPARING` ➔ `OUT_FOR_DELIVERY` ➔ `DELIVERED`.
3. **لوحة تحكم مدير الفرع (Store Manager Dashboard)**:
   - مراقبة الورديات (Shifts) واحتساب مؤشرات أداء الكاشيرية (Sales, Transactions, Discrepancies).
   - تنبيهات انخفاض المخزون (Low-Stock Alerts) عند هبوط الكميات عن الحد الأدنى.
   - تبويب الشكاوى والدعم الفني (`ComplaintsTab`): فرز وتعديل حالات الشكاوى القادمة من الموقع والتطبيق (`Open`, `In Progress`, `Resolved`, `Closed`).
4. **عمليات مسؤول المستودع (Stock Manager & Warehouse Operations)**:
   - مراجعة طلبات تزويد صالة العرض واعتمادها (`Approve Store Reorders`).
   - ترحيل الكميات فورياً وبشكل آلي من رصيد المستودع (`warehouseStock`) إلى رصيد الرفوف بالصالة (`stock`).
   - سجل تدقيق غير قابل للتلاعب (`Audit Log`) يسجل كل حركة بالثانية واسم القائم بها.

---

### 3. تطبيق الموبايل للعملاء (Customer Mobile App)
* **المسارات في المشروع**: [`final-mobile-application/`](final-mobile-application/) و [`apps/mobile-app/`](apps/mobile-app/)
* **المنصة**: Flutter Mobile (Android & iOS)
* **حزمة التقنيات**: Flutter, Dart, BLoC / Provider, REST API client, Audio Streaming, Speech Recognition.

#### أهم المميزات والقدرات:
1. **المساعد الصوتي بالموبايل (Mobile AI Voice Assistant)**:
   - واجهة صوتية تفاعلية تتوافق مع شاشات اللمس.
   - فهم الأوامر بالعامية المصرية والبحث الصوتي المباشر في قائمة المنتجات.
2. **سلة العائلة الذكية وتحديد الميزانية (Shared Family Cart & Spend Limits)**:
   - إمكانية وضع سقف للميزانية وتنبيه المستخدم عند الاقتراب من تخطيها.
3. **المؤن الذكية وإعادة التزويد (Smart Pantry Auto-Replenishment)**:
   - نظام يقترح إعادة شراء المنتجات الاستهلاكية الدورية (مثل الألبان والخبز والشاي) بناءً على معدل الاستهلاك المعتاد.
4. **تتبع حالة الطلبات والشكاوى**:
   - شاشة "طلباتي" لمتابعة مسار توصيل الأوردر خطوة بخطوة.
   - نموذج الشكاوى وتذاكر الدعم الفني المباشر لإدارة المتجر.
   - دعم التبديل السلس بين اللغة العربية والإنجليزية والثيم الداكن والفاتح.

---

### 4. الخادم المركزي والباك إند (Central Backend & Real-Time Sync)
* **المسارات في المشروع**: [`backend/`](backend/) و [`apps/backend/`](apps/backend/)
* **المنفذ الافتراضي**: `http://localhost:3000` (مسار الـ API: `/api/v1`)
* **حزمة التقنيات**: Node.js, Express / Modular Monolith, SQLite3 (WAL mode), SSE (Server-Sent Events), JWT Auth, Crypto.

#### أهم المميزات والقدرات:
1. **قاعدة بيانات متزامنة عالية الأداء (Concurrency-Safe SQLite Engine)**:
   - تعمل بنمط **WAL (Write-Ahead Logging)** مع مهلة انتظار `PRAGMA busy_timeout = 10000` وحلقة إعادة محاولة ذكية (Exponential Backoff).
   - منع أخطاء القفل `database is locked (5)` نهائياً أثناء ضغط المعاملات بين الكاشير والموقع وتطبيق الموبايل.
2. **بوابة المزامنة والأحداث اللحظية (SSE Broadcast Gateway)**:
   - بث أحداث النظام الحية (`ORDER_CREATED`, `ORDER_STATUS_CHANGED`, `INVENTORY_UPDATED`, `SHIFT_STARTED`).
   - استلام الطرود غير المتصلة من نقاط البيع (`POST /api/v1/sync/ingest`) مع فحص ومنع التكرار (Idempotency Guard).
3. **محرك حجز المخزون والتحقق المزدوج (Inventory Concurrency & Reservations)**:
   - التحقق الصارم من توفر الرصيد بالصالة قبل إنشاء أي طلب.
   - دعم حجز الكميات مؤقتاً أثناء مرحلة الدفع (`reserveCheckoutStock`) وتأكيدها أو تحريرها تلقائياً عند الإلغاء.
4. **محرك التسعير والضرائب المصرية (14% VAT Engine)**:
   - احتساب ضريبة القيمة المضافة بدقة محاسبية متوافقة مع متطلبات الفاتورة الإلكترونية المصرية.
5. **إدارة الهوية والصلاحيات (RBAC & Authentication)**:
   - تشفير كلمات المرور باستخدام SHA-512 مع التمليح (Salt).
   - توثيق متعدد الأدوار: `SUPER_ADMIN`, `STORE_MANAGER`, `CASHIER`, `INVENTORY_OPERATOR`, `CUSTOMER`.

---

## 📊 كتالوج المنتجات الحقيقي (Real Dataset Integration - 1,000 SKUs)

تم تغذية النظام بالكامل ببيانات التجزئة الفعلية المعتمدة:
* **إجمالي الأصناف النشطة**: **1,000 منتج تجزئة حقيقي**.
* **توزيع الفئات الرئيسية (5 أقسام)**:
  - **Food Cupboard (البقالة الجافة والمؤن)**: 309 منتج (مكرونة، أرز، سكر، زيوت، بقوليات).
  - **Beverages (المشروبات والعصائر)**: 292 منتج (مياه غازية، عصائر، شاي، قهوة).
  - **Fresh Food (الأغذية الطازجة والألبان)**: 199 منتج (ألبان، أجبان، مصنعات لحوم، زبادي).
  - **Fruits & Vegetables (الخضراوات والفاكهة)**: 160 منتج (أصناف طازجة بالوزن والعدد).
  - **Frozen Food (المجمدات)**: 40 منتج (خضار مجمد، دواجن، لحوم).
* **العلامات التجارية المصرية المشهورة**: أكثر من 140 براند محلي (جهينة، مزارع دينا، المراعي، دومتي، لمار، هارفست، دريم، شيبسي، كوكاكولا).
* **العملة الرسمية**: الجنيه المصري (EGP) بدقة منزلتين عشريتين.

---

## 📁 هيكل المونوريبو والدلائل (Monorepo Directory Structure)

```text
CYBORG-SUPERMARKET/
├── backend/                       # السيرفر المركزي الأساسي وقاعدة البيانات
│   ├── src/
│   │   ├── database/db.js         # محرك SQLite بنمط WAL ومهلة 10 ثوانٍ
│   │   ├── modules/orders/        # خدمة إدارة الطلبات ودورة الحياة
│   │   ├── modules/inventory/     # خدمة الأرصدة والمخزون وحجز الكميات
│   │   ├── modules/auth/          # التوثيق والصلاحيات (JWT + RBAC)
│   │   ├── modules/voice/         # محرك معالجة الصوت واللهجة المصرية
│   │   ├── modules/sync/          # خدمة بث الأحداث SSE وابتلاع المعاملات
│   │   └── standalone-server.js   # خادم الـ REST API الرئيسي (بورت 3000)
├── final-customer-website/        # موقع العملاء النهائي ثلاثي الأبعاد
│   ├── server.js                  # خادم المتجر (بورت 3002) وربط الكاشير
│   ├── src/views/index.html       # الواجهة الكاملة: الكتالوج، السلة، الـ 3D Orb
│   └── README.md                  # توثيق مفصل لمتجر الويب
├── admin-dashboard/               # لوحة تحكم الإدارة ونظام الكاشير (Flutter)
│   ├── lib/core/data/pos_state_manager.dart     # إدارة الحالة والمزامنة
│   ├── lib/features/cashier/presentation/tabs/  # تبويب Online Orders والكاشير
│   ├── lib/features/manager/presentation/tabs/  # تبويب الورديات والشكاوى
│   └── lib/features/stock_manager/              # إدارة المستودع وسجل التدقيق
├── final-mobile-application/      # تطبيق الموبايل للعملاء (Flutter)
│   └── lib/                       # واجهات التسوق وسلة العائلة والمساعد الصوتي
├── apps/                          # النسخ المزامنة للمونوريبو المتكامل
│   ├── backend/                   # نظير مجلد backend
│   ├── customer-web/              # نظير مجلد final-customer-website
│   ├── admin-dashboard/           # نظير مجلد admin-dashboard
│   └── mobile-app/                # نظير مجلد final-mobile-application
├── data/
│   ├── source/super_market(1).xlsx # ملف البيانات الأصلي المعتمد (1,000 صنف)
│   └── cyborg_supermarket.db      # قاعدة بيانات SQLite الجاهزة النشطة
├── scripts/
│   ├── start-all.js               # المشغل الرئيسي لمنظومة سايبورغ بالكامل
│   ├── run-all-tests.js           # مشغل اختبارات الجودة المتكاملة
│   └── import-products.js         # سكربت استيراد وتحديث كتالوج المنتجات
├── package.json                   # تعريف المشروع والمهام المشتركة
└── README.md                      # دليل المنظومة الشامل (هذا الملف)
```

---

## 📦 حزم الإصدارات القابلة للتحميل (Downloadable ZIP Packages)

تتوفر إصدارات جاهزة ومجمعة كحزم في مجلد [`dist/`](dist/):

| الحزمة | المنصة المستهدفة | الوصف المختصر |
| :--- | :--- | :--- |
| **Desktop POS Application** | Windows / Linux Desktop | كاشير المتجر، قارئ الباركود، الطابعات الحرارية، ودرج النقدية. |
| **Customer Android App** | Android Mobile | تطبيق التسوق للموبايل بالمساعد الصوتي وسلة العائلة. |
| **Web Ecosystem & API** | Node.js Web Stack | المتجر الإلكتروني، الباك إند المركزي، وقاعدة البيانات المعتمدة. |

---

## 🚀 دليل التشغيل والبدء السريع (Quick Start & Running)

### 1. المتطلبات الأساسية
* **Node.js**: الإصدار 18 أو أحدث.
* **Flutter SDK**: الإصدار 3.10+ (لتشغيل تطبيق الكاشير والموبايل محلياً).
* **Python**: الإصدار 3.10+ (لأدوات الفحص والتحقق من البيانات).

### 2. تثبيت الحزم والاعتماديات
```bash
npm install
```

### 3. تشغيل المنظومة بالكامل بأمر واحد (Master Ecosystem Launcher)
يقوم هذا الأمر بتشغيل الباك إند، المتجر الإلكتروني، لوحة تحكم الكاشير، وتطبيق الموبايل في نافذة واحدة متناسقة:
```bash
npm start
# أو يدوياً عبر:
node scripts/start-all.js
```

### 4. روابط الخدمات المفتوحة في المتصفح:
* **المتجر الإلكتروني للعملاء**: [`http://localhost:3002`](http://localhost:3002)
* **الباك إند والـ REST API**: [`http://localhost:3000/api/v1`](http://localhost:3000/api/v1)
* **فحص صحة النظام (Health Check)**: [`http://localhost:3000/health`](http://localhost:3000/health)

---

## 🧪 الاختبارات والتحقق الآلي (Automated Testing & Verification)

تم إخضاع النظام بالكامل لاختبارات صارمة عبر 8 أجنحة اختبار معتمدة:
```bash
npm test
# أو
node scripts/run-all-tests.js
```

### الأجنحة المختبرة بنجاح (100% Passed):
1. **أمان وجودة كتالوج البيانات**: التحقق من عدم وجود باركودات مكررة وصحة الأسعار في الـ 1,000 صنف.
2. **صلاحيات الدخول (RBAC)**: عزل صلاحيات المدير عن الكاشير عن العميل.
3. **محرك حجز المخزون**: اختبار المنع من البيع بالسالب وقفل التزامن.
4. **دورة حياة الطلب والـ SSE**: التحقق من وصول الطلبات من الموقع إلى الكاشير فورياً.
5. **جودة الذكاء الاصطناعي والمساعد الصوتي**: اختبار فهم العامية المصرية وعدم هلوسة المنتجات غير المتوفرة.
6. **معالجة قفل قاعدة البيانات (WAL Concurrency)**: نجاح استعلامات القراءة والكتابة المتزامنة بدون تعارض.

---

## 📚 مكتبة التوثيق الهندسي (Enterprise PDF Books)

يحتوي مجلد [`docs/pdf/`](docs/pdf/) على 10 كتب توثيق هندسية متكاملة تغطي كافة جوانب المنظومة:
1. `01_Cyborg_Complete_Project_Handbook.pdf` (دليل المشروع الشامل)
2. `02_System_Architecture_and_Infrastructure.pdf` (معمارية البنية التحتية)
3. `03_Complete_Workflows_and_Sequence_Diagrams.pdf` (مخططات تسلسل العمليات)
4. `04_Database_ERD_and_Data_Dictionary.pdf` (قاموس البيانات ومخطط الكيانات)
5. `05_API_Reference_and_Integration_Guide.pdf` (دليل واجهات الـ API)
6. `06_Security_Architecture_and_Threat_Model.pdf` (نموذج التهديدات والأمان)
7. `07_QA_Testing_and_Verification_Report.pdf` (تقرير جودة الاختبارات)
8. `08_Deployment_Operations_and_Recovery_Manual.pdf` (دليل النشر والتعافي)
9. `09_User_Admin_and_Cashier_Manual.pdf` (دليل المستخدم والمدير والكاشير)
10. `10_Cyborg_Product_Presentation_and_Demo_Guide.pdf` (عرض المنتج والعرض التقديمي)

---

## 🔒 الأمان وتكامل البيانات (Security & Concurrency Safe)

* **منع تعارض قواعد البيانات**: تفعيل نمط `WAL (Write-Ahead Logging)` مع مهلة انتظار 10 ثوانٍ يتيح قراءة وكتابة متوازية فائقة السرعة.
* **ربط هوية العميل الدقيقة**: يتم تمرير وتثبيت هوية العميل المسجل (`user_id`, `customer_name`, `customer_phone`) من المتصفح وقاعدة البيانات مباشرة لكاشير المتجر لمنع الطلبات مجهولة المصدر.
* **مفاتيح التكرار (Idempotency Keys)**: كل طلب يتم توليد مفتاح تشفيري فريد له لمنع تكرار الخصم أو الازدواجية في حالة ضعف شبكة العميل.
* **حماية بيانات البطاقات**: عدم تخزين أي أرقام بطاقات حساسة (Zero PAN / CVV Storage) بما يتطابق مع معايير PCI-DSS.

---

**⚡ تم تطوير وتكامل منظومة CYBORG SUPERMARKET بالكامل — جاهزة للإنتاج والتشغيل التجاري على أعلى درجات الموثوقية.**
