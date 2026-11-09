import React, { useState, useEffect, useCallback } from 'react';
import { 
  Eye, 
  X, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  Cpu, 
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Tag,
  ShoppingBag,
  Folder,
  BookOpen,
  Terminal,
  Database
} from 'lucide-react';
import { useInView } from '../../hooks/useAnimations';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

// Supermarket gallery images organized by folder
const SUPERMARKET_GALLERY = {
  Website: {
    folder: 'Website',
    titleEn: 'Customer Web Storefront (3D Voice & Catalog)',
    titleAr: 'متجر الويب ثلاثي الأبعاد والمساعد الصوتي',
    count: 5,
    images: [
      { id: 'web-1', file: '1.png', labelEn: '3D Voice Orb & Retail Catalog', labelAr: 'المساعد الصوتي ثلاثي الأبعاد وكتالوج المنتجات' },
      { id: 'web-2', file: '2.png', labelEn: 'Product Category Filter & Search', labelAr: 'فلترة الأقسام والبحث الفوري' },
      { id: 'web-3', file: '3.png', labelEn: 'Interactive 3D Card Payment Simulation', labelAr: 'محاكي الدفع التفاعلي والبطاقة ثلاثية الأبعاد' },
      { id: 'web-4', file: '4.png', labelEn: 'Order Confirmation & Printable Receipt', labelAr: 'تأكيد الطلب والفاتورة الضريبية الرسمية' },
      { id: 'web-5', file: '5.png', labelEn: 'Customer Complaints & Support Center', labelAr: 'مركز شكاوى ودعم العملاء المباشر' }
    ]
  },
  Application: {
    folder: 'Application',
    titleEn: 'Customer Mobile App (Flutter Android & iOS)',
    titleAr: 'تطبيق الموبايل للتسوق الذكي (فلاتر)',
    count: 6,
    images: [
      { id: 'app-1', file: '1.png', labelEn: 'Mobile Home & Smart Promotions', labelAr: 'الواجهة الرئيسية وعروض السوبرماركت' },
      { id: 'app-2', file: '2.png', labelEn: 'Mobile Egyptian Voice Assistant', labelAr: 'المساعد الصوتي بالعامية المصرية للموبايل' },
      { id: 'app-3', file: '3.png', labelEn: 'Family Shared Cart & Budget Guard', labelAr: 'سلة العائلة المشتركة وحارس الميزانية' },
      { id: 'app-4', file: '4.png', labelEn: 'Smart Pantry Auto-Replenishment', labelAr: 'المؤن الذكية وإعادة التزويد الدوري' },
      { id: 'app-5', file: '5.png', labelEn: 'Live Order Tracking Timeline', labelAr: 'متابعة مسار وتوصيل الطلب خطوة بخطوة' },
      { id: 'app-6', file: '6.png', labelEn: 'Customer Profile & Multi-Address', labelAr: 'ملف العميل وحفظ العناوين المتعددة' }
    ]
  },
  Cashier: {
    folder: 'Cashier',
    titleEn: 'Branch POS Terminal (Desktop Cashier)',
    titleAr: 'نقطة بيع الكاشير بالفرع (POS السريع)',
    count: 3,
    images: [
      { id: 'cas-1', file: '1.png', labelEn: 'Fast Barcode POS Checkout Screen', labelAr: 'شاشة كاشير المبيعات مع دعم قارئ الباركود' },
      { id: 'cas-2', file: '2.png', labelEn: 'Keyboard Fast Shortcuts (F2 Cash / F3 Card)', labelAr: 'اختصارات لوحة المفاتيح السريعة وحساب الفكة' },
      { id: 'cas-3', file: '3.png', labelEn: 'ESC/POS Thermal Receipt & Drawer Pulse', labelAr: 'طباعة الإيصال الحراري وفتح درج النقدية' }
    ]
  },
  Store_Manager: {
    folder: 'Store_Manager',
    titleEn: 'Store Manager Operations & Shifts',
    titleAr: 'لوحة تحكم مدير الفرع وإدارة الورديات',
    count: 9,
    images: [
      { id: 'sm-1', file: '1.png', labelEn: 'Online Orders Ingestion Queue', labelAr: 'طابور استلام طلبات الموقع والتطبيق فورياً' },
      { id: 'sm-2', file: '2.png', labelEn: 'Smart Replacement Dialog for Out-of-Stock', labelAr: 'نافذة اقتراح البدائل الذكية للأصناف الناقصة' },
      { id: 'sm-3', file: '3.png', labelEn: 'Order Lifecycle State Sync', labelAr: 'تحديث حالة الطلب وتوجيهه للتوصيل' },
      { id: 'sm-4', file: '4.png', labelEn: 'Shift Management & Cashier Audits', labelAr: 'مراقبة الورديات ومؤشرات أداء الكاشيرية' },
      { id: 'sm-5', file: '5.png', labelEn: 'Low-Stock Realtime Alerts', labelAr: 'تنبيهات انخفاض المخزون في صالة العرض' },
      { id: 'sm-6', file: '6.png', labelEn: 'Store Sales Performance KPI', labelAr: 'مؤشرات المبيعات اليومية ونسب النمو' },
      { id: 'sm-7', file: '7.png', labelEn: 'Customer Complaints Triage Tab', labelAr: 'فرز ومعالجة تذاكر شكاوى العملاء' },
      { id: 'sm-8', file: '8.png', labelEn: 'Staff Access Role Management', labelAr: 'إدارة أدوار وصلاحيات موظفي الفرع' },
      { id: 'sm-9', file: '9.png', labelEn: 'Daily Financial Balance Reconciliation', labelAr: 'مطابقة الحسابات والإغلاق المالي لليوم' }
    ]
  },
  Stock_Manager: {
    folder: 'Stock_Manager',
    titleEn: 'Stock Manager & Warehouse Operations',
    titleAr: 'إدارة المستودع وحركات المخزون',
    count: 7,
    images: [
      { id: 'stk-1', file: '1.png', labelEn: 'Warehouse Inventory Master Grid', labelAr: 'جدول أرصدة المستودع وصالة العرض' },
      { id: 'stk-2', file: '2.png', labelEn: 'Floor Replenishment Requests', labelAr: 'طلبات تزويد الصالة من المستودع' },
      { id: 'stk-3', file: '3.png', labelEn: 'Approve & Transfer Stock Quantities', labelAr: 'اعتماد وترحيل الكميات آلياً للأرفف' },
      { id: 'stk-4', file: '4.png', labelEn: 'Tamper-Proof Stock Audit Ledger', labelAr: 'سجل حركات المخزون غير القابل للتلاعب' },
      { id: 'stk-5', file: '5.png', labelEn: 'Bulk Excel SKU Import Engine', labelAr: 'محرك استيراد وتحديث الكتالوج بملفات إكسيل' },
      { id: 'stk-6', file: '6.png', labelEn: 'Batch Expiry & Lot Tracking', labelAr: 'تتبع تواريخ الصلاحية ودفعات التوريد' },
      { id: 'stk-7', file: '7.png', labelEn: 'Supplier Reorder Purchase Orders', labelAr: 'أوامر شراء وإعادة التزويد من الموردين' }
    ]
  },
  Owner: {
    folder: 'Owner',
    titleEn: 'Owner & Executive Multi-Branch Analytics',
    titleAr: 'لوحة تحكم المالك والإحصائيات الشاملة',
    count: 6,
    images: [
      { id: 'own-1', file: '1.png', labelEn: 'Executive High-Level Revenue Dashboard', labelAr: 'لوحة الإيرادات الشاملة والأرباح الصافية' },
      { id: 'own-2', file: '2.png', labelEn: 'Multi-Branch Comparative Analytics', labelAr: 'مقارنة أداء الفروع وحجم المعاملات' },
      { id: 'own-3', file: '3.png', labelEn: 'Top-Selling Categories & SKU Velocity', labelAr: 'أكثر الأقسام والمنتجات مبيعاً وسرعة دوران' },
      { id: 'own-4', file: '4.png', labelEn: 'Profit Margin & 14% VAT Telemetry', labelAr: 'هوامش الربح وضريبة القيمة المضافة 14%' },
      { id: 'own-5', file: '5.png', labelEn: 'Customer Retention & Loyalty Metrics', labelAr: 'معدل عودة العملاء وسلوكيات الشراء' },
      { id: 'own-6', file: '6.png', labelEn: 'System Health & Concurrency Monitor', labelAr: 'مراقبة صحة السيرفر ومزامنة الفروع' }
    ]
  }
};

const SUPERMARKET_PROJECT = {
  id: 'cyborg-supermarket',
  nameEn: 'CYBORG SUPERMARKET — Production-Oriented AI Omnichannel Retail Ecosystem',
  nameAr: 'منظومة سايبورغ سوبرماركت المتكاملة للتجزئة الذكية (CYBORG Supermarket)',
  category: 'Ready Systems',
  categoryAr: 'منظومة متكاملة جاهزة للتسليم',
  priceEgp: '40,000',
  priceFormattedEn: '40,000 EGP',
  priceFormattedAr: '40,000 جنيه مصري',
  coverImage: `${process.env.PUBLIC_URL}/projects/supermarket/Website/1.png`,
  shortDescriptionEn: 'Complete omnichannel supermarket retail system with 3D Web Storefront, Egyptian AI Voice Assistant, Flutter Desktop POS, Mobile App, Real-Time SQLite WAL Backend, and 1,000 verified Egyptian SKUs.',
  shortDescriptionAr: 'منظومة تجزئة ذكية متكاملة تجمع بين المتجر ثلاثي الأبعاد بالمساعد الصوتي المصري، نقطة بيع الكاشير، تطبيق الموبايل، لوحات إدارة المخازن والفروع، والباك إند اللحظي مع 1000 صنف حقيقي.',
  techStack: [
    'WebGL 3D',
    'Egyptian Voice AI',
    'Flutter 3',
    'Dart',
    'Node.js',
    'SQLite WAL',
    'SSE Sync',
    'Tailwind CSS',
    '1,000 SKUs'
  ],
  metrics: [
    { labelEn: 'Live SKUs Seeded', labelAr: 'أصناف معتمدة', value: '1,000' },
    { labelEn: 'Quality Tests Passed', labelAr: 'اختبارات جودة ناجحة', value: '60 / 60' },
    { labelEn: 'Checkout Latency', labelAr: 'سرعة الكاشير', value: '< 250ms' },
    { labelEn: 'System Ready', labelAr: 'جاهزية التشغيل', value: '100%' }
  ],
  keyPillars: [
    { titleEn: '3D Web Storefront', titleAr: 'متجر الويب ثلاثي الأبعاد', descEn: 'Egyptian dialect voice assistant, budget planner, 3D card checkout, printable receipt.', descAr: 'مساعد صوتي مصري، ميزانية ذكية، محاكي دفع 3D، وفاتورة ضريبية رسمية.' },
    { titleEn: 'Flutter Desktop POS', titleAr: 'كاشير الفرع المكتبي', descEn: 'High-speed barcode scanner, ESC/POS thermal printing, and smart replacement for out-of-stock items.', descAr: 'دعم قارئ الباركود، الطابعات الحرارية، واقتراح ذكي للبدائل.' },
    { titleEn: 'Customer Mobile App', titleAr: 'تطبيق الموبايل للتسوق', descEn: 'Voice-powered mobile commerce, shared family cart, smart replenishment, and live order tracking.', descAr: 'تسوق بالصوت، سلة العائلة المشتركة، وجدولة استهلاك المؤن.' },
    { titleEn: 'Central WAL Backend', titleAr: 'الباك إند اللحظي المتزامن', descEn: 'Concurrency-safe SQLite in WAL mode with 10s timeout, SSE events streaming, and zero lock errors.', descAr: 'قاعدة بيانات متزامنة عالية السرعة بنمط WAL وبث أحداث لحظي.' }
  ]
};

export default function Portfolio() {
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState('Website');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [sectionRef, isInView] = useInView({ threshold: 0.1 });

  // Current active gallery items for supermarket
  const currentGalleryGroup = SUPERMARKET_GALLERY[activeGalleryTab] || SUPERMARKET_GALLERY.Website;

  // Flattened images for lightbox navigation
  const allSupermarketImages = Object.keys(SUPERMARKET_GALLERY).flatMap((folderKey) => {
    const group = SUPERMARKET_GALLERY[folderKey];
    return group.images.map((img) => ({
      ...img,
      folder: folderKey,
      folderTitleEn: group.titleEn,
      folderTitleAr: group.titleAr,
      src: `${process.env.PUBLIC_URL}/projects/supermarket/${folderKey}/${img.file}`
    }));
  });

  const handleOpenLightbox = (imgFile, folderKey) => {
    const idx = allSupermarketImages.findIndex(
      (item) => item.file === imgFile && item.folder === folderKey
    );
    if (idx !== -1) setLightboxIndex(idx);
  };

  const handleNextLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % allSupermarketImages.length);
  };

  const handlePrevLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + allSupermarketImages.length) % allSupermarketImages.length);
  };

  // Close modals on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      if (lightboxIndex !== null) {
        setLightboxIndex(null);
      } else {
        setIsModalOpen(false);
      }
    }
  }, [lightboxIndex]);

  useEffect(() => {
    if (isModalOpen || lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, lightboxIndex, handleKeyDown]);

  const scrollToContact = () => {
    setIsModalOpen(false);
    setLightboxIndex(null);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-500 section-fade ${
        isInView ? 'visible' : ''
      } ${isDark ? 'bg-[#0D0C1D]' : 'bg-[#eef4fb]'}`}
    >
      {/* Background cyber ambient gradients */}
      <div className="absolute inset-0 circuit-grid-dense opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyber-cyan/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-cyber-purple/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-cyan/15 border border-cyber-cyan/40 text-cyber-cyan text-xs font-orbitron tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Sparkles className="w-4 h-4 text-cyber-cyan" />
            <span>{isRTL ? 'أنظمتنا الجاهزة للتسليم الفوري' : 'Production-Ready Enterprise Systems'}</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-orbitron text-center gradient-text mb-4 tracking-wide">
            {isRTL ? 'منظومة سايبورغ سوبرماركت الذكية' : 'CYBORG Supermarket Ecosystem'}
          </h2>

          <p className={`text-center max-w-2xl mx-auto text-base md:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {isRTL 
              ? 'المنظومة التكنولوجية الأقوى والمتكاملة لإدارة سلاسل السوبرماركت والتجزئة — متجر 3D، تطبيق موبايل، كاشير الفروع، والباك إند اللحظي مع 1,000 صنف حقيقي.' 
              : 'Our flagship turnkey retail ecosystem for modern supermarkets — 3D Web Storefront, Mobile App, Desktop POS, and Concurrency-Safe SQLite WAL Backend with 1,000 verified SKUs.'}
          </p>
        </div>

        {/* HERO SHOWCASE CARD: CYBORG SUPERMARKET */}
        <div className="max-w-6xl mx-auto">
          <div 
            className={`rounded-2xl overflow-hidden border-2 transition-all duration-500 relative shadow-2xl ${
              isDark 
                ? 'bg-gradient-to-br from-[#12192e] via-[#0d1020] to-[#070914] border-cyber-cyan/70 hover:border-cyber-cyan hover:shadow-[0_0_60px_rgba(0,240,255,0.4)]' 
                : 'bg-white border-cyan-500 hover:border-cyan-600 shadow-2xl'
            }`}
          >
            {/* Top Glowing Corner Ribbon */}
            <div className="absolute top-0 right-0 z-20 overflow-hidden w-48 h-48 pointer-events-none">
              <div className="bg-gradient-to-r from-cyber-cyan via-blue-500 to-cyber-purple text-cyber-dark font-orbitron font-extrabold text-[11px] py-1.5 text-center transform rotate-45 translate-x-12 translate-y-7 shadow-lg uppercase tracking-wider">
                🔥 TURNKEY SYSTEM
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Cover Image Container with Hover Effects */}
              <div 
                className="lg:col-span-7 relative overflow-hidden cursor-pointer min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] flex items-center justify-center bg-black/70 group"
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  src={SUPERMARKET_PROJECT.coverImage}
                  alt="CYBORG Supermarket Cover"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0d1020]/90" />

                {/* Floating Enlarge / Inspect Action Badge on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cyber-dark/65 backdrop-blur-xs">
                  <div className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-cyber-cyan text-cyber-dark font-orbitron font-extrabold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(0,240,255,0.8)] transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="w-5 h-5" />
                    <span>{isRTL ? 'افتح تفاصيل المنظومة والصور الـ 36' : 'Open 36 Screenshots & Documentation'}</span>
                  </div>
                </div>

                {/* Bottom Image Stats Bar */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white glass px-4 py-2 rounded-xl border border-white/15 backdrop-blur-md">
                  <span className="flex items-center gap-2 font-orbitron text-cyber-cyan font-bold">
                    <Folder className="w-4 h-4 text-cyber-cyan" />
                    <span>6 أقسام / 36 شاشة عالية الدقة (HD)</span>
                  </span>
                  <span className="text-[11px] text-gray-300 font-medium hidden sm:inline">
                    {isRTL ? 'انقر لتكبير الصور وقراءة الشرح' : 'Click to preview gallery'}
                  </span>
                </div>
              </div>

              {/* Right Column: Project Meta, Price Tag, Specs & CTA */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
                <div>
                  {/* Category & Status Badges */}
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-orbitron font-bold bg-cyber-cyan/20 border border-cyber-cyan/60 text-cyber-cyan uppercase tracking-wider">
                      {isRTL ? SUPERMARKET_PROJECT.categoryAr : SUPERMARKET_PROJECT.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isRTL ? 'جاهز للتسليم والتشغيل المباشر' : 'Production Ready'}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl sm:text-3xl font-extrabold font-orbitron mb-3 leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {isRTL ? SUPERMARKET_PROJECT.nameAr : SUPERMARKET_PROJECT.nameEn}
                  </h3>

                  {/* Short Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {isRTL ? SUPERMARKET_PROJECT.shortDescriptionAr : SUPERMARKET_PROJECT.shortDescriptionEn}
                  </p>

                  {/* Key Pillars Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {SUPERMARKET_PROJECT.keyPillars.map((pillar, i) => (
                      <div key={i} className={`p-2.5 rounded-xl border text-xs ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="font-bold font-orbitron text-cyber-cyan mb-1 flex items-center gap-1 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
                          <span>{isRTL ? pillar.titleAr : pillar.titleEn}</span>
                        </div>
                        <p className={`text-[10px] leading-tight line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {isRTL ? pillar.descAr : pillar.descEn}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* PROMINENT PRICE HERO BOX */}
                  <div className="p-4 rounded-xl border-2 border-cyber-cyan bg-gradient-to-r from-cyber-cyan/20 via-cyber-purple/20 to-cyber-cyan/15 mb-6 shadow-[0_0_30px_rgba(0,240,255,0.25)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider font-orbitron text-gray-300 font-bold flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-cyber-cyan" />
                          <span>{isRTL ? 'سعر المنظومة بالكامل' : 'Complete System Price'}</span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="font-orbitron font-extrabold text-3xl sm:text-4xl text-cyber-cyan drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">
                            40,000
                          </span>
                          <span className="font-orbitron font-bold text-sm sm:text-base text-white">
                            {isRTL ? 'جنيه مصري' : 'EGP'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-mono font-bold">
                          {isRTL ? 'تسليم فوري متكامل' : 'Turnkey Delivery'}
                        </span>
                        <div className="text-[10px] text-gray-300 mt-1">
                          {isRTL ? '1,000 صنف حقيقي + 10 كتب PDF' : '1,000 SKUs + 10 Manuals'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-cyber-cyan text-cyber-dark font-orbitron font-bold text-xs sm:text-sm tracking-wider uppercase hover:shadow-[0_0_25px_rgba(0,240,255,0.85)] hover:scale-[1.02] transition-all duration-300 text-center flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{isRTL ? 'عرض تفاصيل المنظومة ومعرض الصور' : 'View System Specs & Gallery'}</span>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
                  </button>

                  <button
                    onClick={scrollToContact}
                    className="w-full sm:w-auto py-3 px-6 rounded-xl border-2 border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-dark font-orbitron font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isRTL ? 'طلب الشراء فوراً' : 'Order Now'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DETAILED PROJECT MODAL (HIGH Z-INDEX: 100, STICKY HEADER & FOOTER) */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="glass-strong rounded-2xl max-w-5xl w-full h-[94vh] max-h-[94vh] flex flex-col border-2 border-cyber-cyan/60 relative shadow-[0_0_80px_rgba(0,240,255,0.4)] text-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* STICKY MODAL TOP HEADER */}
            <div className="flex-shrink-0 px-5 py-4 border-b border-white/15 bg-[#0a0d1a]/95 flex items-center justify-between z-20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-orbitron font-bold bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan uppercase">
                  {isRTL ? 'منظومة جاهزة' : 'Ready System'}
                </span>
                <h3 className="text-base sm:text-xl font-bold font-orbitron text-white truncate max-w-[200px] sm:max-w-md">
                  {isRTL ? 'منظومة سايبورغ سوبرماركت' : 'CYBORG Supermarket Ecosystem'}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-cyber-cyan/15 border border-cyber-cyan/40">
                  <Tag className="w-3.5 h-3.5 text-cyber-cyan" />
                  <span className="font-orbitron font-bold text-cyber-cyan text-sm">40,000 {isRTL ? 'ج.م' : 'EGP'}</span>
                </div>
                {/* Prominent Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full glass border border-white/20 text-gray-300 hover:text-white hover:border-cyber-cyan hover:bg-cyber-cyan/25 transition-all duration-200 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* SCROLLABLE MODAL BODY */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
              {/* Top Highlight Price Banner */}
              <div className="p-4 sm:p-5 rounded-2xl border-2 border-cyber-cyan bg-gradient-to-r from-cyber-cyan/20 via-cyber-purple/20 to-cyber-cyan/15 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                <div className="text-center sm:text-left">
                  <div className="text-xs uppercase font-orbitron text-gray-300 tracking-wider">
                    {isRTL ? 'السعر الرسمي للمنظومة بالكامل' : 'Official Full Ecosystem Price'}
                  </div>
                  <div className="flex items-baseline justify-center sm:justify-start gap-2 mt-0.5">
                    <span className="font-orbitron font-extrabold text-3xl sm:text-4xl text-cyber-cyan drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">
                      40,000
                    </span>
                    <span className="font-orbitron font-bold text-base sm:text-lg text-white">
                      {isRTL ? 'جنيه مصري' : 'EGP'}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-300 mt-0.5">
                    {isRTL ? 'يشمل: المتجر 3D، تطبيق الموبايل، كاشير الفروع، الباك إند، 1000 صنف حقيقي، و10 كتب توثيق' : 'Includes: 3D Web, Mobile App, POS Terminal, Core Backend, 1,000 SKUs & 10 PDF Books'}
                  </p>
                </div>
                <button
                  onClick={scrollToContact}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-cyber-cyan text-cyber-dark font-orbitron font-bold text-xs sm:text-sm tracking-wider uppercase hover:shadow-[0_0_25px_rgba(0,240,255,0.9)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isRTL ? 'طلب المنظومة فوراً (40,000 ج.م)' : 'Purchase System (40,000 EGP)'}</span>
                </button>
              </div>

              {/* ======================================================== */}
              {/* SECTION 1: DIVIDED IMAGE GALLERY BY FOLDER (قبل الـ Description) */}
              {/* ======================================================== */}
              <div className="p-5 sm:p-6 rounded-2xl glass border border-cyber-cyan/40 bg-cyber-darker/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                  <div>
                    <h4 className="font-orbitron font-bold text-lg sm:text-xl text-cyber-cyan flex items-center gap-2">
                      <Folder className="w-5 h-5 text-cyber-cyan" />
                      <span>{isRTL ? 'معرض شاشات المنظومة (مقسمة حسب المجلدات)' : 'System Screenshots by Folder'}</span>
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {isRTL ? 'تصفح كافة واجهات المنظومة (36 صورة بدقة عالية) مقسمة تماماً كما في مجلدات المشروع:' : 'Explore all 36 high-resolution system screenshots organized exactly by project directories:'}
                    </p>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyber-cyan/15 border border-cyber-cyan/40 text-cyber-cyan font-bold self-start sm:self-auto">
                    36 Screenshots / 6 Folders
                  </span>
                </div>

                {/* FOLDER TABS */}
                <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 no-scrollbar">
                  {Object.keys(SUPERMARKET_GALLERY).map((folderKey) => {
                    const group = SUPERMARKET_GALLERY[folderKey];
                    const isActive = activeGalleryTab === folderKey;
                    const title = isRTL ? group.titleAr : group.titleEn;
                    return (
                      <button
                        key={folderKey}
                        onClick={() => setActiveGalleryTab(folderKey)}
                        title={title}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-orbitron transition-all duration-200 whitespace-nowrap cursor-pointer border ${
                          isActive
                            ? 'bg-cyber-cyan text-cyber-dark font-bold shadow-[0_0_15px_rgba(0,240,255,0.5)] border-cyber-cyan'
                            : 'glass text-gray-300 hover:text-white hover:bg-white/10 border-white/15'
                        }`}
                      >
                        <Folder className="w-3.5 h-3.5" />
                        <span>{folderKey}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-cyber-dark text-cyber-cyan' : 'bg-white/10 text-gray-300'}`}>
                          {group.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* ACTIVE TAB DESCRIPTION */}
                <div className="mb-4 text-xs font-medium text-gray-300 bg-white/5 p-3 rounded-lg border border-white/10 flex items-center justify-between">
                  <span>
                    <strong className="text-cyber-cyan">{activeGalleryTab}:</strong> {isRTL ? currentGalleryGroup.titleAr : currentGalleryGroup.titleEn}
                  </span>
                  <span className="text-gray-400 text-[11px] font-mono hidden sm:inline">
                    {isRTL ? 'انقر على أي صورة لتكبيرها' : 'Click image to open in full Lightbox'}
                  </span>
                </div>

                {/* SCREENSHOTS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentGalleryGroup.images.map((img) => {
                    const imageSrc = `${process.env.PUBLIC_URL}/projects/supermarket/${currentGalleryGroup.folder}/${img.file}`;
                    const label = isRTL ? img.labelAr : img.labelEn;
                    return (
                      <div
                        key={img.id}
                        onClick={() => handleOpenLightbox(img.file, currentGalleryGroup.folder)}
                        className="group relative rounded-xl overflow-hidden border border-white/15 hover:border-cyber-cyan bg-black/60 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] flex flex-col justify-between"
                      >
                        <div className="relative aspect-video overflow-hidden bg-cyber-darker flex items-center justify-center">
                          <img
                            src={imageSrc}
                            alt={label}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          {/* Zoom overlay */}
                          <div className="absolute inset-0 bg-cyber-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                            <span className="p-2 rounded-full bg-cyber-cyan text-cyber-dark font-bold shadow-lg">
                              <Maximize2 className="w-4 h-4" />
                            </span>
                            <span className="text-xs font-orbitron font-bold text-cyber-cyan uppercase tracking-wider">
                              {isRTL ? 'تكبير' : 'Enlarge'}
                            </span>
                          </div>
                        </div>
                        <div className="p-2.5 bg-cyber-darker/90 text-xs flex items-center justify-between gap-2 border-t border-white/10">
                          <span className="font-mono text-gray-400 text-[11px]">{currentGalleryGroup.folder}/{img.file}</span>
                          <span className="font-semibold text-gray-200 text-right truncate text-[11px]">{label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ======================================================== */}
              {/* SECTION 2: FULL DESCRIPTION (من ملف الـ README.md)     */}
              {/* ======================================================== */}
              <div className="space-y-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-cyber-cyan font-orbitron font-bold text-xl sm:text-2xl">
                  <BookOpen className="w-6 h-6 text-cyber-cyan" />
                  <span>{isRTL ? 'التوثيق الشامل ومواصفات المنظومة (System Documentation)' : 'System Specifications & Engineering Documentation'}</span>
                </div>

                {/* 1. Overview */}
                <div className="glass p-5 rounded-xl border border-white/10">
                  <h4 className="font-orbitron font-bold text-cyber-cyan text-base sm:text-lg mb-2">
                    {isRTL ? '🌟 نظرة عامة على المنظومة (Ecosystem Overview)' : '🌟 Ecosystem Overview'}
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {isRTL ? (
                      <>
                        منظومة <strong>سايبورغ سوبرماركت (CYBORG Supermarket)</strong> هي بيئة تجزئة متكاملة تجمع بين فروع السوبرماركت التقليدية على أرض الواقع (Brick-and-Mortar) والتجربة الرقمية الحديثة (Digital Omnichannel). تضمن المنظومة مصدر حقيقة موحد (Single Source of Truth) لقواعد العمل وإدارة المخزون والأسعار وحسابات العملاء، من خلال تكامل لحظي عالي السرعة بين الكاشير، لوحات إدارة الفروع، المتجر الإلكتروني 3D، وتطبيق الموبايل.
                      </>
                    ) : (
                      <>
                        The <strong>CYBORG Supermarket Ecosystem</strong> is a production-oriented, AI-powered omnichannel retail platform bridging physical supermarket branches with a cutting-edge digital storefront. It guarantees a single source of truth for business rules, stock reservation, and customer accounts with sub-second real-time sync.
                      </>
                    )}
                  </p>
                </div>

                {/* 2. System Architecture */}
                <div className="glass p-5 rounded-xl border border-white/10">
                  <h4 className="font-orbitron font-bold text-cyber-cyan text-base sm:text-lg mb-3 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyber-cyan" />
                    <span>{isRTL ? '🏛️ معمارية النظام الشاملة (Clean / Onion Architecture)' : '🏛️ Clean Onion System Architecture'}</span>
                  </h4>
                  <pre className="p-4 rounded-lg bg-black/60 font-mono text-[11px] sm:text-xs text-cyan-300 overflow-x-auto leading-relaxed border border-cyber-cyan/30">
{`┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                              │
│   Web Storefront (3002)  │  Mobile App (Flutter)  │  POS Cashier (Desktop) │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST / SSE / WebSocket
┌───────────────────────────────────▼────────────────────────────────────┐
│                      APPLICATION CORE & USE CASES                      │
│   - CreateOrder & 14% VAT Engine   - Egyptian Voice Colloquial Parser  │
│   - Stock Reservation & Commit     - Cashier Shift Reconciliation      │
│   - Out-of-Stock Safety Guard      - Support & Complaints Dispatcher   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Repositories & Adapters
┌───────────────────────────────────▼────────────────────────────────────┐
│                    INFRASTRUCTURE & PERSISTENCE                        │
│   - SQLite3 Database (WAL Mode + 10s Concurrency Timeout)              │
│   - SSE Event Broadcasting Gateway                                     │
│   - ESC/POS Thermal Printer Driver & Cash Drawer Solenoid Pulse        │
└────────────────────────────────────────────────────────────────────────┘`}
                  </pre>
                </div>

                {/* 3. The 4 Subsystems Deep-Dive */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Subsystem 1: Web Storefront */}
                  <div className="glass p-4 rounded-xl border border-white/10">
                    <h5 className="font-orbitron font-bold text-cyber-cyan text-sm sm:text-base mb-2 flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-cyber-cyan" />
                      <span>1. {isRTL ? 'المتجر الإلكتروني للعملاء (Web Storefront)' : 'Customer Web Storefront'}</span>
                    </h5>
                    <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                      <li>{isRTL ? 'المساعد الصوتي والذكاء الاصطناعي المصري (WebGL 3D Voice Orb يفهم العامية المصرية).' : 'Egyptian AI Voice Assistant in 3D WebGL Orb understanding colloquial Egyptian Arabic.'}</li>
                      <li>{isRTL ? 'كتالوج التجزئة الحي يضم 1,000 صنف مع حماية النفاذ من المخزون آلياً.' : '1,000 verified SKUs catalog with automatic Out-of-Stock guard.'}</li>
                      <li>{isRTL ? 'محاكي بطاقة بنكية ثلاثي الأبعاد مع حساب ضريبة القيمة المضافة 14% وفاتورة رسمية.' : '3D interactive bank card simulation, 14% VAT calculation & printable receipts.'}</li>
                      <li>{isRTL ? 'إرسال لحظي للطلبات لشاشة كاشير الفرع فور تأكيدها عبر SSE.' : 'Instant SSE synchronization with POS cashier upon checkout.'}</li>
                    </ul>
                  </div>

                  {/* Subsystem 2: POS Cashier & Admin */}
                  <div className="glass p-4 rounded-xl border border-white/10">
                    <h5 className="font-orbitron font-bold text-cyber-cyan text-sm sm:text-base mb-2 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-cyber-cyan" />
                      <span>2. {isRTL ? 'كاشير ولوحة تحكم الفروع (Flutter POS)' : 'Branch POS & Operations (Flutter)'}</span>
                    </h5>
                    <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                      <li>{isRTL ? 'كاشير فائق السرعة يدعم الباركود EAN-13 واختصارات الكيبورد (F2 نقد / F3 بطاقة).' : 'Sub-second checkout with barcode scanner & F2/F3 fast keyboard shortcuts.'}</li>
                      <li>{isRTL ? 'نافذة اقتراح البدائل الذكية (Smart Replacement Dialog) عند نقص الأصناف.' : 'Smart replacement modal suggesting in-stock alternatives dynamically.'}</li>
                      <li>{isRTL ? 'مراقبة الورديات ومؤشرات المبيعات وتنبيهات انخفاض المخزون وإدارة الشكاوى.' : 'Shift reconciliation, sales KPIs, low-stock alerts & complaints triage.'}</li>
                      <li>{isRTL ? 'سجل حركات المخزون والمستودع غير القابل للتلاعب (Audit Log).' : 'Tamper-proof audit logging for every warehouse shelf transfer.'}</li>
                    </ul>
                  </div>

                  {/* Subsystem 3: Mobile App */}
                  <div className="glass p-4 rounded-xl border border-white/10">
                    <h5 className="font-orbitron font-bold text-cyber-cyan text-sm sm:text-base mb-2 flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-cyber-cyan" />
                      <span>3. {isRTL ? 'تطبيق الموبايل للتسوق (Customer Mobile App)' : 'Customer Mobile App'}</span>
                    </h5>
                    <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                      <li>{isRTL ? 'مساعد صوتي متكامل للهواتف الذكية بالعامية المصرية.' : 'Mobile-optimized voice assistant in Egyptian dialect.'}</li>
                      <li>{isRTL ? 'سلة العائلة الذكية وتحديد سقف الميزانية وحظر التجاوز.' : 'Shared family cart with customizable budget spending limits.'}</li>
                      <li>{isRTL ? 'المؤن الذكية وإعادة التزويد الدوري للسلع الاستهلاكية المعتادة.' : 'Smart pantry auto-replenishment based on historic consumption.'}</li>
                      <li>{isRTL ? 'تتبع لحظي لمسار الطلب خطوة بخطوة وثنائية لغة كاملة عربي/إنجليزي.' : 'Real-time order delivery tracker and full bilingual support.'}</li>
                    </ul>
                  </div>

                  {/* Subsystem 4: Central WAL Backend */}
                  <div className="glass p-4 rounded-xl border border-white/10">
                    <h5 className="font-orbitron font-bold text-cyber-cyan text-sm sm:text-base mb-2 flex items-center gap-2">
                      <Database className="w-4 h-4 text-cyber-cyan" />
                      <span>4. {isRTL ? 'الخادم المركزي والباك إند المتزامن' : 'Central Backend & WAL Sync'}</span>
                    </h5>
                    <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                      <li>{isRTL ? 'محرك SQLite بنمط WAL مع مهلة 10 ثوانٍ وحماية قفل التزامن (Zero DB Lock).' : 'SQLite3 WAL engine with 10s timeout preventing database locks under load.'}</li>
                      <li>{isRTL ? 'بوابة بث الأحداث الحية (SSE) ونقطة ابتلاع المعاملات الأوفلاين /sync/ingest.' : 'SSE broadcasting gateway and offline transaction ingestion queue.'}</li>
                      <li>{isRTL ? 'محرك حجز المخزون والتحقق المزدوج قبل خصم أو تأكيد أي أوردر.' : 'Two-phase inventory reservation guard protecting against negative stock.'}</li>
                      <li>{isRTL ? 'نظام الصلاحيات المتعددة (RBAC) وتشفير كلمات المرور بـ SHA-512.' : 'Role-based access control (RBAC) with SHA-512 salted credentials.'}</li>
                    </ul>
                  </div>
                </div>

                {/* 4. Real Dataset Breakdown */}
                <div className="glass p-5 rounded-xl border border-white/10">
                  <h4 className="font-orbitron font-bold text-cyber-cyan text-base sm:text-lg mb-3">
                    {isRTL ? '📊 كتالوج المنتجات الحقيقي (Real Dataset Integration - 1,000 SKUs)' : '📊 Real Dataset Integration (1,000 Verified SKUs)'}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="font-orbitron font-bold text-cyber-cyan text-lg">309</div>
                      <div className="text-[11px] text-gray-300 mt-1">{isRTL ? 'البقالة والمؤن' : 'Food Cupboard'}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="font-orbitron font-bold text-cyber-cyan text-lg">292</div>
                      <div className="text-[11px] text-gray-300 mt-1">{isRTL ? 'المشروبات والعصائر' : 'Beverages'}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="font-orbitron font-bold text-cyber-cyan text-lg">199</div>
                      <div className="text-[11px] text-gray-300 mt-1">{isRTL ? 'الألبان والأجبان' : 'Fresh Dairy'}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="font-orbitron font-bold text-cyber-cyan text-lg">160</div>
                      <div className="text-[11px] text-gray-300 mt-1">{isRTL ? 'الخضار والفاكهة' : 'Produce & Veg'}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="font-orbitron font-bold text-cyber-cyan text-lg">40</div>
                      <div className="text-[11px] text-gray-300 mt-1">{isRTL ? 'المجمدات' : 'Frozen Food'}</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 text-center">
                    {isRTL ? 'أكثر من 140 علامة تجارية مصرية معتمدة (جهينة، مزارع دينا، المراعي، دومتي، لمار، هارفست، دريم، شيبسي، كوكاكولا) بالجنيه المصري (EGP).' : 'Features 140+ real Egyptian market brands with barcode, category, prices and stock.'}
                  </p>
                </div>

                {/* 5. PDF Books & Automated Tests */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass p-4 rounded-xl border border-white/10">
                    <h5 className="font-orbitron font-bold text-cyber-cyan text-sm mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-cyber-cyan" />
                      <span>{isRTL ? '📚 10 كتب توثيق هندسي معتمدة' : '📚 10 Enterprise PDF Manuals'}</span>
                    </h5>
                    <p className="text-xs text-gray-300 mb-2">
                      {isRTL ? 'تتضمن حزمة المشروع 10 كتب PDF شاملة للمشروع:' : 'Comprehensive PDF engineering guides included:'}
                    </p>
                    <ul className="text-[11px] text-gray-400 space-y-1 font-mono">
                      <li>• 01_Cyborg_Complete_Project_Handbook.pdf</li>
                      <li>• 02_System_Architecture_and_Infrastructure.pdf</li>
                      <li>• 03_Complete_Workflows_and_Sequence_Diagrams.pdf</li>
                      <li>• 04_Database_ERD_and_Data_Dictionary.pdf</li>
                      <li>• 05_API_Reference_and_Integration_Guide.pdf</li>
                      <li>• 06_Security_Architecture_and_Threat_Model.pdf</li>
                      <li>• 07_QA_Testing_and_Verification_Report.pdf</li>
                      <li>• 08_Deployment_Operations_and_Recovery_Manual.pdf</li>
                      <li>• 09_User_Admin_and_Cashier_Manual.pdf</li>
                      <li>• 10_Cyborg_Product_Presentation_and_Demo_Guide.pdf</li>
                    </ul>
                  </div>

                  <div className="glass p-4 rounded-xl border border-white/10">
                    <h5 className="font-orbitron font-bold text-cyber-cyan text-sm mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{isRTL ? '🧪 اختبارات الجودة (8 أجنحة / 60 فحص ناجح)' : '🧪 Automated Testing (100% Passed)'}</span>
                    </h5>
                    <p className="text-xs text-gray-300 mb-2">
                      {isRTL ? 'اجتازت المنظومة بنجاح تام 8 أجنحة اختبارات صارمة:' : 'All test suites successfully passed:'}
                    </p>
                    <ul className="text-xs text-gray-300 space-y-1.5">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{isRTL ? 'أمان الكتالوج والباركود المزدوج (1,000 صنف)' : 'Catalog SKU & Barcode integrity'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{isRTL ? 'حماية المخزون ومنع البيع بالسالب' : 'Negative stock reservation guard'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{isRTL ? 'دورة حياة الطلب والمزامنة اللحظية عبر SSE' : 'Real-time order lifecycle & SSE ingest'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{isRTL ? 'معالجة قفل قاعدة البيانات WAL Concurrency' : 'WAL high-throughput concurrency'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{isRTL ? 'فهم الذكاء الاصطناعي للهجة المصرية' : 'Colloquial Egyptian NLP voice parser'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* STICKY MODAL BOTTOM BAR (ALWAYS VISIBLE - NEVER HIDDEN) */}
            <div className="flex-shrink-0 px-5 py-4 border-t-2 border-cyber-cyan/50 bg-[#090c1a] flex flex-col sm:flex-row items-center justify-between gap-3 z-20 shadow-2xl backdrop-blur-lg">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-orbitron text-gray-300 font-bold">{isRTL ? 'السعر الشامل للمنظومة:' : 'Total System Price:'}</span>
                <span className="font-orbitron font-extrabold text-2xl sm:text-3xl text-cyber-cyan drop-shadow-[0_0_12px_rgba(0,240,255,0.7)]">
                  40,000 {isRTL ? 'جنيه مصري' : 'EGP'}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono hidden md:inline font-bold">
                  ({isRTL ? 'شامل السورس كود وقاعدة البيانات والدعم' : 'Turnkey Full Delivery'})
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 font-orbitron text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  {isRTL ? 'إغلاق' : 'Close'}
                </button>
                <button
                  onClick={scrollToContact}
                  className="flex-1 sm:flex-none px-8 py-2.5 rounded-xl bg-cyber-cyan text-cyber-dark font-orbitron font-extrabold text-xs tracking-wider uppercase hover:shadow-[0_0_25px_rgba(0,240,255,0.9)] hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isRTL ? 'طلب المنظومة الآن (40,000 ج.م)' : 'Order System (40,000 EGP)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FULLSCREEN LIGHTBOX IMAGE VIEWER (Z-INDEX: 110)        */}
      {/* ======================================================== */}
      {lightboxIndex !== null && allSupermarketImages[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-lg animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-black/80 border border-white/30 text-white hover:text-cyber-cyan hover:border-cyber-cyan transition-colors z-50 cursor-pointer shadow-xl"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={handlePrevLightbox}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/80 border border-white/30 text-white hover:text-cyber-cyan hover:border-cyber-cyan transition-all z-50 cursor-pointer shadow-xl"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNextLightbox}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/80 border border-white/30 text-white hover:text-cyber-cyan hover:border-cyber-cyan transition-all z-50 cursor-pointer shadow-xl"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div 
            className="max-w-6xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-xl overflow-hidden border-2 border-cyber-cyan/50 shadow-[0_0_60px_rgba(0,240,255,0.4)] bg-cyber-darker max-h-[80vh] flex items-center justify-center">
              <img
                src={allSupermarketImages[lightboxIndex].src}
                alt={isRTL ? allSupermarketImages[lightboxIndex].labelAr : allSupermarketImages[lightboxIndex].labelEn}
                className="max-w-full max-h-[78vh] object-contain"
              />
            </div>

            {/* Bottom Info Bar */}
            <div className="mt-3 px-5 py-2.5 rounded-xl glass-strong border border-white/20 text-center text-white max-w-xl">
              <div className="text-xs text-cyber-cyan font-orbitron font-bold">
                {allSupermarketImages[lightboxIndex].folder} {'//'} {allSupermarketImages[lightboxIndex].file} ({lightboxIndex + 1} of {allSupermarketImages.length})
              </div>
              <div className="text-sm font-medium mt-0.5">
                {isRTL ? allSupermarketImages[lightboxIndex].labelAr : allSupermarketImages[lightboxIndex].labelEn}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
