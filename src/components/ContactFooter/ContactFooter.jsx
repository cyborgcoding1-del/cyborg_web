import React, { useState, useEffect } from 'react';
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Facebook,
  Instagram,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useInView, scrollToSection } from '../../hooks/useAnimations';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

// TikTok inline SVG component (lucide-react does not include TikTok)
const TikTokIcon = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

export default function ContactFooter() {
  const [sectionRef, isInView] = useInView({ threshold: 0.1 });
  const { t, lang } = useLanguage();
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [showToast, setShowToast] = useState(null); // 'success' | 'error' | null

  // Auto-dismiss toast notification after 4 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = `${t('contact_name')} ${t('contact_required')}`;
    }
    if (!formData.email.trim()) {
      newErrors.email = `${t('contact_email')} ${t('contact_required')}`;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = t('contact_valid_email');
    }
    if (!formData.service) {
      newErrors.service = t('contact_choose_service');
    }
    if (!formData.message.trim()) {
      newErrors.message = `${t('contact_message')} ${t('contact_required')}`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);
    try {
      const response = await fetch('https://formsubmit.co/ajax/cyborgcoding1@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          _subject: 'New Project Request from CYBORG Website',
        }),
      });

      if (response.ok) {
        setShowToast('success');
        setFormData({
          name: '',
          email: '',
          service: '',
          message: '',
        });
        setErrors({});
      } else {
        setShowToast('error');
      }
    } catch (err) {
      setShowToast('error');
    } finally {
      setIsSending(false);
    }
  };

  const quickLinks = [
    { name: t('nav_services'), id: 'services' },
    { name: t('nav_industries'), id: 'industries' },
    { name: t('nav_workflow'), id: 'workflow' },
    { name: t('nav_contact'), id: 'contact' },
  ];

  const serviceLinks = [
    t('contact_opt_mobile'),
    t('contact_opt_web'),
    t('contact_opt_pos'),
    t('contact_opt_ai'),
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/cyborg-techworks/',
      icon: Linkedin,
      hoverClass:
        'hover:text-cyber-cyan hover:border-cyber-cyan/50 hover:bg-cyber-cyan/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.35)]',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1F1akjCush/?mibextid=wwXIfr',
      icon: Facebook,
      hoverClass:
        'hover:text-cyber-cyan hover:border-cyber-cyan/50 hover:bg-cyber-cyan/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.35)]',
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@cyborg.techworks',
      icon: TikTokIcon,
      hoverClass:
        'hover:text-cyber-magenta hover:border-cyber-magenta/50 hover:bg-cyber-magenta/10 hover:shadow-[0_0_20px_rgba(255,0,127,0.35)]',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/cyborg_techworks',
      icon: Instagram,
      hoverClass:
        'hover:text-cyber-purple hover:border-cyber-purple/50 hover:bg-cyber-purple/10 hover:shadow-[0_0_20px_rgba(138,43,226,0.35)]',
    },
  ];

  const serviceOptions = [
    { value: 'Mobile App Development', label: t('contact_opt_mobile') },
    { value: 'Website & E-Commerce', label: t('contact_opt_web') },
    { value: 'POS & ERP System', label: t('contact_opt_pos') },
    { value: 'AI & Automation', label: t('contact_opt_ai') },
    { value: 'Custom Solution', label: t('contact_opt_custom') },
    { value: 'Other', label: t('contact_opt_other') },
  ];

  return (
    <div
      className={`relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#05050D] text-white' : 'bg-[#f0f4f8] text-gray-900'
      }`}
    >
      {/* Toast Notification */}
      {showToast && (
        <div
          role={showToast === 'error' ? 'alert' : 'status'}
          className={`fixed top-6 right-4 sm:right-6 z-50 flex items-center gap-3.5 px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border transition-all duration-300 max-w-sm sm:max-w-md ${
            showToast === 'success'
              ? isDark
                ? 'bg-[#05050D]/95 border-emerald-500/50 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                : 'bg-white border-emerald-500/50 text-emerald-950 shadow-emerald-500/20'
              : isDark
              ? 'bg-[#05050D]/95 border-rose-500/50 text-white shadow-[0_0_30px_rgba(244,63,94,0.3)]'
              : 'bg-white border-rose-500/50 text-rose-950 shadow-rose-500/20'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              showToast === 'success'
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                : 'bg-rose-500/20 border border-rose-500/40 text-rose-400'
            }`}
          >
            {showToast === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400" />
            )}
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <p className="font-orbitron text-xs font-semibold tracking-wider">
              {showToast === 'success'
                ? lang === 'ar'
                  ? 'تم الإرسال بنجاح'
                  : 'TRANSMISSION SUCCESSFUL'
                : lang === 'ar'
                ? 'فشل الإرسال'
                : 'TRANSMISSION FAILED'}
            </p>
            <p
              className={`text-xs mt-0.5 font-inter ${
                showToast === 'success'
                  ? isDark
                    ? 'text-emerald-300'
                    : 'text-emerald-700'
                  : isDark
                  ? 'text-rose-300'
                  : 'text-rose-700'
              }`}
            >
              {showToast === 'success' ? t('contact_success') : t('contact_error')}
            </p>
          </div>
          <button
            onClick={() => setShowToast(null)}
            className={`p-1 rounded-lg transition-colors ${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-700'
            }`}
            aria-label="Close notification"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Background Circuit Grid Accent */}
      <div
        className={`absolute inset-0 circuit-grid pointer-events-none ${
          isDark ? 'opacity-15' : 'opacity-5'
        }`}
      />

      {/* CONTACT SECTION */}
      <section
        id="contact"
        ref={sectionRef}
        className={`relative z-10 py-24 sm:py-28 lg:py-36 section-fade ${
          isInView ? 'visible' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-orbitron uppercase tracking-widest mb-4 ${
                isDark
                  ? 'glass border border-cyber-cyan/30 text-cyber-cyan'
                  : 'bg-white border border-cyber-cyan/40 text-cyber-cyan shadow-sm'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-cyber-cyan shadow-[0_0_8px_#00F0FF] animate-pulse" />
              <span>{t('contact_title')}</span>
            </div>
            <h2 className="gradient-text font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {t('contact_title')}
            </h2>
            <p
              className={`mt-4 text-sm sm:text-base md:text-lg font-inter max-w-2xl mx-auto leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {t('contact_subtitle')}
            </p>
            <div className="mt-6 mx-auto w-28 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta rounded-full shadow-[0_0_12px_rgba(0,240,255,0.5)]" />
          </div>

          {/* Two-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* LEFT COLUMN - Contact Form (7 cols on lg) */}
            <div
              className={`lg:col-span-7 rounded-2xl p-6 sm:p-9 lg:p-11 relative overflow-hidden group transition-all duration-300 ${
                isDark
                  ? 'glass border border-white/10 shadow-[0_0_60px_rgba(0,240,255,0.05)]'
                  : 'bg-white border border-gray-200 shadow-xl'
              }`}
            >
              {/* Subtle Gradient Overlays for dark theme */}
              {isDark && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/[0.04] via-transparent to-cyber-purple/[0.06] pointer-events-none rounded-2xl" />
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyber-purple/10 rounded-full blur-3xl pointer-events-none" />
                </>
              )}

              <div className="relative z-10 mb-8">
                <h3
                  className={`font-orbitron text-xl sm:text-2xl font-semibold flex items-center gap-3 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-cyber-cyan shadow-[0_0_10px_#00F0FF]" />
                  <span>{t('contact_form_title')}</span>
                </h3>
                <p
                  className={`text-xs sm:text-sm font-inter mt-1.5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {t('contact_subtitle')}
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-6 relative z-10">
                {/* Full Name */}
                <div>
                  <label
                    className={`block text-xs font-orbitron uppercase tracking-wider mb-2.5 ${
                      isDark ? 'text-gray-300' : 'text-gray-700 font-medium'
                    }`}
                  >
                    {t('contact_name')} <span className="text-cyber-magenta">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact_name')}
                    disabled={isSending}
                    className={`w-full min-h-[48px] rounded-xl px-4 py-3.5 transition-all font-inter text-sm sm:text-base outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyber-cyan focus:bg-white/10 focus:ring-cyber-cyan/30'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyber-purple focus:bg-white focus:ring-cyber-purple/20'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-2 text-xs text-cyber-magenta font-inter flex items-center gap-1">
                      <span>•</span>
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Business Email */}
                <div>
                  <label
                    className={`block text-xs font-orbitron uppercase tracking-wider mb-2.5 ${
                      isDark ? 'text-gray-300' : 'text-gray-700 font-medium'
                    }`}
                  >
                    {t('contact_email')} <span className="text-cyber-magenta">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact_email')}
                    disabled={isSending}
                    className={`w-full min-h-[48px] rounded-xl px-4 py-3.5 transition-all font-inter text-sm sm:text-base outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyber-cyan focus:bg-white/10 focus:ring-cyber-cyan/30'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyber-purple focus:bg-white focus:ring-cyber-purple/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-xs text-cyber-magenta font-inter flex items-center gap-1">
                      <span>•</span>
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Select Service / Project Type */}
                <div>
                  <label
                    className={`block text-xs font-orbitron uppercase tracking-wider mb-2.5 ${
                      isDark ? 'text-gray-300' : 'text-gray-700 font-medium'
                    }`}
                  >
                    {t('contact_service')} <span className="text-cyber-magenta">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      disabled={isSending}
                      className={`w-full min-h-[48px] rounded-xl px-4 py-3.5 transition-all font-inter text-sm sm:text-base cursor-pointer appearance-none outline-none focus:ring-2 ${
                        isDark
                          ? 'bg-[#0D0C1D] border border-white/10 text-white placeholder-gray-500 focus:border-cyber-cyan focus:ring-cyber-cyan/30'
                          : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyber-purple focus:bg-white focus:ring-cyber-purple/20'
                      }`}
                    >
                      <option value="" disabled className={isDark ? 'text-gray-500 bg-[#0D0C1D]' : 'text-gray-400 bg-white'}>
                        {t('contact_service')}
                      </option>
                      {serviceOptions.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          className={isDark ? 'bg-[#0D0C1D] text-white' : 'bg-white text-gray-900'}
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                  {errors.service && (
                    <p className="mt-2 text-xs text-cyber-magenta font-inter flex items-center gap-1">
                      <span>•</span>
                      <span>{errors.service}</span>
                    </p>
                  )}
                </div>

                {/* Project Brief / Message */}
                <div>
                  <label
                    className={`block text-xs font-orbitron uppercase tracking-wider mb-2.5 ${
                      isDark ? 'text-gray-300' : 'text-gray-700 font-medium'
                    }`}
                  >
                    {t('contact_message')} <span className="text-cyber-magenta">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact_message')}
                    disabled={isSending}
                    className={`w-full rounded-xl p-4 transition-all font-inter text-sm sm:text-base resize-none outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyber-cyan focus:bg-white/10 focus:ring-cyber-cyan/30'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyber-purple focus:bg-white focus:ring-cyber-purple/20'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-2 text-xs text-cyber-magenta font-inter flex items-center gap-1">
                      <span>•</span>
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full min-h-[48px] bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta text-white font-orbitron font-semibold text-sm sm:text-base tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {isSending ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('contact_sending')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('contact_send')}</span>
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* RIGHT COLUMN - Contact Info & Socials (5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
              {/* Company Info with Logo */}
              <div
                className={`rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 ${
                  isDark
                    ? 'glass border border-white/10 shadow-[0_0_40px_rgba(138,43,226,0.05)]'
                    : 'bg-white border border-gray-200 shadow-xl'
                }`}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative p-0.5 rounded-2xl bg-gradient-to-br from-cyber-cyan via-cyber-purple to-cyber-magenta shadow-[0_0_20px_rgba(0,240,255,0.35)] flex-shrink-0">
                    <img
                      src={`${process.env.PUBLIC_URL}/cyborg-logo.jpeg`}
                      alt="CYBORG Logo"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-[14px] object-cover"
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-orbitron text-2xl sm:text-3xl font-bold tracking-wider ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      CYBORG
                    </h3>
                    <p className="text-xs sm:text-sm font-rajdhani text-cyber-cyan tracking-widest uppercase font-semibold">
                      Digital Engineering & Solutions
                    </p>
                  </div>
                </div>

                <p
                  className={`text-sm sm:text-base leading-relaxed font-inter ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {t('footer_desc')}
                </p>
              </div>

              {/* Contact Details with Icons */}
              <div className="space-y-3.5 sm:space-y-4">
                {/* Email */}
                <a
                  href="mailto:cyborgcoding1@gmail.com"
                  className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-300 group min-h-[48px] ${
                    isDark
                      ? 'glass border border-white/10 hover:border-cyber-cyan/50 hover:bg-white/[0.04] hover:shadow-[0_0_25px_rgba(0,240,255,0.18)]'
                      : 'bg-white border border-gray-200 hover:border-cyber-cyan hover:shadow-md'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan group-hover:scale-110 group-hover:bg-cyber-cyan/20 transition-all duration-300 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-orbitron uppercase tracking-wider ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {t('contact_direct_email')}
                    </p>
                    <p
                      className={`text-sm sm:text-base font-medium group-hover:text-cyber-cyan transition-colors truncate ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      cyborgcoding1@gmail.com
                    </p>
                  </div>
                </a>

                {/* Phone / Mobile */}
                <a
                  href="tel:+2001113021427"
                  className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-300 group min-h-[48px] ${
                    isDark
                      ? 'glass border border-white/10 hover:border-cyber-magenta/50 hover:bg-white/[0.04] hover:shadow-[0_0_25px_rgba(255,0,127,0.18)]'
                      : 'bg-white border border-gray-200 hover:border-cyber-magenta hover:shadow-md'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-cyber-magenta/10 border border-cyber-magenta/30 flex items-center justify-center text-cyber-magenta group-hover:scale-110 group-hover:bg-cyber-magenta/20 transition-all duration-300 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-orbitron uppercase tracking-wider ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {t('contact_hotline')}
                    </p>
                    <p
                      className={`text-sm sm:text-base font-medium group-hover:text-cyber-magenta transition-colors ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      +20 111 302 1427
                    </p>
                  </div>
                </a>

                {/* WhatsApp Link with Phone Number */}
                <a
                  href="https://wa.me/2001113021427"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-300 group min-h-[48px] ${
                    isDark
                      ? 'glass border border-white/10 hover:border-emerald-500/50 hover:bg-white/[0.04] hover:shadow-[0_0_25px_rgba(16,185,129,0.18)]'
                      : 'bg-white border border-gray-200 hover:border-emerald-500 hover:shadow-md'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300 flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-orbitron uppercase tracking-wider ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {t('contact_whatsapp')}
                    </p>
                    <p
                      className={`text-sm sm:text-base font-medium group-hover:text-emerald-500 transition-colors ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      +20 111 302 1427
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div
                  className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-300 group min-h-[48px] ${
                    isDark
                      ? 'glass border border-white/10 hover:border-cyber-purple/50 hover:bg-white/[0.04] hover:shadow-[0_0_25px_rgba(138,43,226,0.18)]'
                      : 'bg-white border border-gray-200 hover:border-cyber-purple hover:shadow-md'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-cyber-purple/10 border border-cyber-purple/30 flex items-center justify-center text-cyber-purple group-hover:scale-110 group-hover:bg-cyber-purple/20 transition-all duration-300 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-orbitron uppercase tracking-wider ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {t('contact_headquarters')}
                    </p>
                    <p
                      className={`text-sm sm:text-base font-medium group-hover:text-cyber-purple transition-colors ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Alexandria, Egypt
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Links Row */}
              <div
                className={`rounded-2xl p-6 sm:p-7 transition-all duration-300 ${
                  isDark
                    ? 'glass border border-white/10'
                    : 'bg-white border border-gray-200 shadow-xl'
                }`}
              >
                <p
                  className={`text-xs sm:text-sm font-orbitron uppercase tracking-wider mb-4 ${
                    isDark ? 'text-gray-300' : 'text-gray-700 font-medium'
                  }`}
                >
                  {t('contact_social')}
                </p>
                <div className="flex flex-wrap items-center gap-3.5">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${
                          isDark
                            ? 'bg-white/5 border border-white/10 text-gray-400'
                            : 'bg-gray-100 border border-gray-200 text-gray-600'
                        } ${social.hoverClass}`}
                      >
                        <IconComponent className="w-5 h-5 transition-transform duration-300" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className={`relative z-10 border-t backdrop-blur-md transition-colors duration-300 ${
          isDark
            ? 'bg-[#0D0C1D]/80 border-white/10 text-white'
            : 'bg-white border-gray-200 text-gray-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
          {/* Three Columns on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 pb-14">
            {/* Column 1: CYBORG Brand with logo image & brief description */}
            <div className="space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="relative p-0.5 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-purple shadow-[0_0_12px_rgba(0,240,255,0.3)] flex-shrink-0">
                  <img
                    src={`${process.env.PUBLIC_URL}/cyborg-logo.jpeg`}
                    alt="CYBORG"
                    className="w-9 h-9 rounded-[10px] object-cover"
                  />
                </div>
                <span
                  className={`font-orbitron font-bold text-2xl tracking-wider ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  CYBORG
                </span>
              </div>
              <p
                className={`text-sm sm:text-base leading-relaxed font-inter max-w-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {t('footer_desc')}
              </p>
              <div className="pt-1 text-xs font-rajdhani tracking-widest text-cyber-cyan uppercase font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyber-cyan shadow-[0_0_8px_#00F0FF] animate-pulse" />
                <span>{t('footer_status')}</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4
                className={`font-orbitron text-base font-semibold uppercase tracking-wider mb-6 flex items-center gap-2.5 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-cyber-cyan shadow-[0_0_8px_#00F0FF]" />
                <span>{t('footer_quick')}</span>
              </h4>
              <ul className="space-y-3.5 font-inter text-sm sm:text-base">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.id);
                      }}
                      className={`transition-colors duration-200 inline-flex items-center group cursor-pointer py-1 ${
                        isDark
                          ? 'text-gray-400 hover:text-cyber-cyan'
                          : 'text-gray-600 hover:text-cyber-cyan'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan/50 mr-3 rtl:mr-0 rtl:ml-3 transition-all duration-300 group-hover:w-3 group-hover:bg-cyber-cyan" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h4
                className={`font-orbitron text-base font-semibold uppercase tracking-wider mb-6 flex items-center gap-2.5 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-cyber-purple shadow-[0_0_8px_#8A2BE2]" />
                <span>{t('footer_services')}</span>
              </h4>
              <ul className="space-y-3.5 font-inter text-sm sm:text-base">
                {serviceLinks.map((service, index) => (
                  <li key={index}>
                    <a
                      href="#services"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('services');
                      }}
                      className={`transition-colors duration-200 inline-flex items-center group cursor-pointer py-1 ${
                        isDark
                          ? 'text-gray-400 hover:text-cyber-purple'
                          : 'text-gray-600 hover:text-cyber-purple'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple/50 mr-3 rtl:mr-0 rtl:ml-3 transition-all duration-300 group-hover:w-3 group-hover:bg-cyber-purple" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className={`pt-8 sm:pt-10 border-t flex flex-col sm:flex-row items-center justify-between gap-5 font-inter text-xs sm:text-sm ${
              isDark ? 'border-white/10 text-gray-400' : 'border-gray-200 text-gray-500'
            }`}
          >
            <p className="text-center sm:text-left">
              {t('footer_copyright')}
            </p>

            {/* Status Badge with Pulsing Green Dot Animation */}
            <div
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border shadow-sm ${
                isDark
                  ? 'glass border-emerald-500/30 bg-emerald-950/20 shadow-[0_0_18px_rgba(16,185,129,0.15)]'
                  : 'bg-emerald-50 border-emerald-500/30'
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-rajdhani font-semibold text-xs sm:text-sm tracking-wider text-emerald-500 uppercase">
                {t('footer_powered')}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
