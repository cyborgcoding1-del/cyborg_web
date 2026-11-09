import React, { createContext, useContext, useState, useCallback } from 'react';

const translations = {
  en: {
    // Navbar
    nav_home: 'Home',
    nav_services: 'Our Services',
    nav_industries: 'Industries',
    nav_workflow: 'Our Workflow',
    nav_contact: 'Contact Us',
    nav_quote: 'Get a Quote',

    // Hero
    hero_badge: 'Premier Software Development Agency',
    hero_title: 'We Build The Future of Digital Solutions',
    hero_subtitle: 'Transforming businesses, pharmacies, restaurants, and supermarkets with state-of-the-art mobile apps, websites, and customized software systems.',
    hero_cta_primary: 'Start Your Project',
    hero_cta_secondary: 'Explore Services',
    hero_stat_projects: 'Projects Deployed',
    hero_stat_uptime: 'Uptime SLA',
    hero_stat_industries: 'Specialized Industries',
    hero_stat_support: 'AI Support',

    // Services
    services_title: 'Our Core Services',
    services_subtitle: 'End-to-end digital solutions crafted for businesses that demand quality, reliability, and innovation.',
    svc_mobile_title: 'Custom Mobile Apps',
    svc_mobile_desc: 'We design and develop high-performance cross-platform mobile applications for iOS and Android. Our apps are built with clean architecture, smooth animations, and intuitive user experiences.',
    svc_web_title: 'Websites & E-Commerce',
    svc_web_desc: 'From blazing-fast Progressive Web Apps to full-featured e-commerce platforms, we build digital storefronts that convert visitors into customers. Fully responsive and SEO-optimized.',
    svc_pos_title: 'Integrated POS & ERP',
    svc_pos_desc: 'Complete point-of-sale and enterprise resource planning systems tailored for restaurants, pharmacies, and supermarkets with real-time inventory and analytics.',
    svc_ai_title: 'AI & Automation',
    svc_ai_desc: 'Leverage artificial intelligence with custom AI models, smart automation workflows, voice-ordering engines, and intelligent data processing pipelines.',
    svc_db_title: 'Database & Cloud Solutions',
    svc_db_desc: 'Robust database architecture, cloud infrastructure setup, and scalable backend systems. We handle data migration, optimization, and backup strategies.',
    svc_security_title: 'Cybersecurity & Protection',
    svc_security_desc: 'Protect your digital assets with enterprise-grade security solutions, vulnerability assessments, penetration testing, and compliance auditing.',
    svc_data_title: 'Data Analysis & BI',
    svc_data_desc: 'Transform raw data into actionable insights with custom dashboards, business intelligence tools, and advanced analytics for data-driven decisions.',
    svc_api_title: 'System Integration & APIs',
    svc_api_desc: 'Seamlessly connect your existing tools and platforms with custom API development, third-party integrations, and payment gateways.',

    // Industries
    industries_title: 'Industries We Transform',
    industries_subtitle: 'We specialize in tailoring cutting-edge solutions for diverse industries.',
    industries_coming: 'Coming Soon',
    industries_coming_desc: 'We\'re preparing detailed showcases of our industry expertise. Stay tuned for updates on how we transform Supermarkets, Pharmacies, Restaurants, and Enterprises.',
    industries_notify: 'Notify Me',
    ind_retail: 'Supermarkets & Retail',
    ind_pharma: 'Pharmacies & Healthcare',
    ind_restaurant: 'Restaurants & Cafes',
    ind_enterprise: 'Enterprise & Startups',

    // Workflow
    workflow_title: 'Our Cybernetic Workflow',
    workflow_subtitle: 'A streamlined process designed to deliver exceptional results, from concept to launch.',
    wf_analyze: 'Analyze',
    wf_analyze_desc: 'In-depth discovery, technical architecture planning, and requirements mapping.',
    wf_design: 'Design UI/UX',
    wf_design_desc: 'Futuristic wireframes, interactive mockups, and ergonomic UX prototypes.',
    wf_develop: 'Develop',
    wf_develop_desc: 'Clean, modular, production-grade code using modern frameworks.',
    wf_test: 'QA & Test',
    wf_test_desc: 'Automated performance testing, security audits, and bug tracking.',
    wf_launch: 'Launch & Support',
    wf_launch_desc: 'Cloud deployment, real-time monitoring, and 24/7 ongoing maintenance.',

    // Contact
    contact_title: 'Initiate Connection',
    contact_subtitle: 'Ready to transform your business? Let\'s build something extraordinary together.',
    contact_form_title: 'Send Us a Message',
    contact_name: 'Full Name',
    contact_email: 'Business Email',
    contact_service: 'Select Service / Project Type',
    contact_message: 'Project Brief / Message',
    contact_send: 'Send Message',
    contact_sending: 'Sending...',
    contact_success: 'Message sent successfully!',
    contact_error: 'Failed to send. Please try again.',
    contact_required: 'is required',
    contact_valid_email: 'Please provide a valid email address',
    contact_choose_service: 'Please choose a service',
    contact_direct_email: 'Direct Email',
    contact_headquarters: 'Headquarters',
    contact_hotline: 'Direct Hotline',
    contact_whatsapp: 'WhatsApp Chat',
    contact_social: 'Connect With Us',
    contact_opt_mobile: 'Mobile App Development',
    contact_opt_web: 'Website & E-Commerce',
    contact_opt_pos: 'POS & ERP System',
    contact_opt_ai: 'AI & Automation',
    contact_opt_custom: 'Custom Solution',
    contact_opt_other: 'Other',

    // Footer
    footer_desc: 'Next-generation software engineering agency delivering transformative solutions, resilient digital architectures, and smart automation systems.',
    footer_quick: 'Quick Links',
    footer_services: 'Services',
    footer_copyright: '© 2026 CYBORG. All rights reserved.',
    footer_powered: 'Powered by Cyborg Engine',
    footer_status: 'SYSTEM STATUS: OPTIMAL',

    // Theme
    dark_mode: 'Dark Mode',
    light_mode: 'Light Mode',
  },

  ar: {
    // Navbar
    nav_home: 'الرئيسية',
    nav_services: 'خدماتنا',
    nav_industries: 'الصناعات',
    nav_workflow: 'طريقة عملنا',
    nav_contact: 'اتصل بنا',
    nav_quote: 'اطلب مشروعك',

    // Hero
    hero_badge: 'وكالة تطوير برمجيات متميزة',
    hero_title: 'نبني المستقبل الرقمي لأعمالك',
    hero_subtitle: 'نحوّل أفكارك إلى تطبيقات ذكية، مواقع إلكترونية، وأنظمة متكاملة مخصصة للمطاعم، الصيدليات، الشركات، والسوبر ماركت.',
    hero_cta_primary: 'ابدأ مشروعك الآن',
    hero_cta_secondary: 'تصفح خدماتنا',
    hero_stat_projects: 'مشروع منجز',
    hero_stat_uptime: 'وقت تشغيل',
    hero_stat_industries: 'صناعات متخصصة',
    hero_stat_support: 'دعم فني',

    // Services
    services_title: 'خدماتنا الذكية',
    services_subtitle: 'حلول رقمية متكاملة مصممة للشركات التي تطلب الجودة والموثوقية والابتكار.',
    svc_mobile_title: 'تطوير تطبيقات الموبايل',
    svc_mobile_desc: 'نصمم ونطور تطبيقات موبايل عالية الأداء لنظامي iOS و Android. تطبيقاتنا مبنية بهندسة نظيفة وتجربة مستخدم سلسة وبديهية.',
    svc_web_title: 'المواقع والمتاجر الإلكترونية',
    svc_web_desc: 'من تطبيقات الويب التقدمية إلى منصات التجارة الإلكترونية الكاملة، نبني واجهات رقمية تحول الزوار إلى عملاء.',
    svc_pos_title: 'أنظمة نقاط البيع والإدارة',
    svc_pos_desc: 'أنظمة نقاط بيع وتخطيط موارد مؤسسية متكاملة مصممة خصيصاً للمطاعم والصيدليات والسوبر ماركت مع تتبع المخزون والتحليلات.',
    svc_ai_title: 'الذكاء الاصطناعي والأتمتة',
    svc_ai_desc: 'استفد من قوة الذكاء الاصطناعي مع نماذج AI مخصصة وأتمتة ذكية ومحركات طلب صوتي وخطوط معالجة بيانات ذكية.',
    svc_db_title: 'قواعد البيانات والسحابة',
    svc_db_desc: 'بنية قواعد بيانات قوية وإعداد بنية سحابية وأنظمة خلفية قابلة للتوسع. نتعامل مع ترحيل البيانات والتحسين والنسخ الاحتياطي.',
    svc_security_title: 'الأمن السيبراني والحماية',
    svc_security_desc: 'احمِ أصولك الرقمية بحلول أمنية على مستوى المؤسسات، وتقييمات الثغرات، واختبارات الاختراق، والتدقيق الأمني.',
    svc_data_title: 'تحليل البيانات والذكاء التجاري',
    svc_data_desc: 'حوّل البيانات الخام إلى رؤى قابلة للتنفيذ مع لوحات تحكم مخصصة وأدوات ذكاء الأعمال والتحليلات المتقدمة.',
    svc_api_title: 'تكامل الأنظمة وواجهات البرمجة',
    svc_api_desc: 'اربط أدواتك ومنصاتك الحالية بسلاسة مع تطوير واجهات برمجة مخصصة وتكامل مع أطراف ثالثة وبوابات دفع.',

    // Industries
    industries_title: 'الصناعات التي نحولها',
    industries_subtitle: 'نتخصص في تصميم حلول متطورة لمختلف الصناعات.',
    industries_coming: 'قريباً',
    industries_coming_desc: 'نحضر عروضاً تفصيلية لخبراتنا في مختلف الصناعات. ترقبوا تحديثاتنا حول كيفية تحويل السوبر ماركت والصيدليات والمطاعم والشركات.',
    industries_notify: 'أخبرني',
    ind_retail: 'السوبر ماركت والتجزئة',
    ind_pharma: 'الصيدليات والرعاية الصحية',
    ind_restaurant: 'المطاعم والكافيهات',
    ind_enterprise: 'الشركات والمشاريع الناشئة',

    // Workflow
    workflow_title: 'طريقة عملنا',
    workflow_subtitle: 'عملية مبسطة مصممة لتقديم نتائج استثنائية، من الفكرة إلى الإطلاق.',
    wf_analyze: 'التحليل',
    wf_analyze_desc: 'اكتشاف معمق، تخطيط البنية التقنية، ورسم خارطة المتطلبات.',
    wf_design: 'التصميم',
    wf_design_desc: 'إطارات سلكية متقدمة، نماذج تفاعلية، وتصميمات UX مريحة.',
    wf_develop: 'التطوير',
    wf_develop_desc: 'كود نظيف ومنظم وجاهز للإنتاج باستخدام أحدث الأطر.',
    wf_test: 'الاختبار والجودة',
    wf_test_desc: 'اختبارات أداء آلية، تدقيق أمني، وتتبع الأخطاء.',
    wf_launch: 'الإطلاق والدعم',
    wf_launch_desc: 'نشر سحابي، مراقبة فورية، وصيانة مستمرة على مدار الساعة.',

    // Contact
    contact_title: 'تواصل معنا',
    contact_subtitle: 'مستعد لتحويل أعمالك؟ لنبني شيئاً استثنائياً معاً.',
    contact_form_title: 'أرسل لنا رسالة',
    contact_name: 'الاسم الكامل',
    contact_email: 'البريد الإلكتروني',
    contact_service: 'اختر الخدمة / نوع المشروع',
    contact_message: 'وصف المشروع / رسالتك',
    contact_send: 'إرسال الرسالة',
    contact_sending: 'جاري الإرسال...',
    contact_success: 'تم إرسال رسالتك بنجاح!',
    contact_error: 'فشل الإرسال. يرجى المحاولة مرة أخرى.',
    contact_required: 'مطلوب',
    contact_valid_email: 'يرجى إدخال بريد إلكتروني صحيح',
    contact_choose_service: 'يرجى اختيار خدمة',
    contact_direct_email: 'البريد المباشر',
    contact_headquarters: 'المقر الرئيسي',
    contact_hotline: 'الخط الساخن',
    contact_whatsapp: 'واتساب',
    contact_social: 'تابعنا',
    contact_opt_mobile: 'تطوير تطبيقات الموبايل',
    contact_opt_web: 'موقع ومتجر إلكتروني',
    contact_opt_pos: 'نظام نقاط البيع والإدارة',
    contact_opt_ai: 'الذكاء الاصطناعي والأتمتة',
    contact_opt_custom: 'حل مخصص',
    contact_opt_other: 'أخرى',

    // Footer
    footer_desc: 'وكالة هندسة برمجيات متقدمة تقدم حلولاً تحويلية وبنيات رقمية مرنة وأنظمة أتمتة ذكية.',
    footer_quick: 'روابط سريعة',
    footer_services: 'الخدمات',
    footer_copyright: '© 2026 CYBORG. جميع الحقوق محفوظة.',
    footer_powered: 'مدعوم بمحرك Cyborg',
    footer_status: 'حالة النظام: مثالية',

    // Theme
    dark_mode: 'الوضع الداكن',
    light_mode: 'الوضع الفاتح',
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t = useCallback((key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const isRTL = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toggleLang, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

export default LanguageContext;
