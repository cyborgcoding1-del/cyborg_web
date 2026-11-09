import React from 'react';
import { Rocket, Sparkles, ShoppingCart, Heart, UtensilsCrossed, Building2, ArrowRight } from 'lucide-react';
import { useInView, scrollToSection } from '../../hooks/useAnimations';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const upcomingIndustries = [
  {
    key: 'ind_retail',
    icon: ShoppingCart,
    colorDark: 'text-cyber-cyan',
    colorLight: 'text-cyan-600',
  },
  {
    key: 'ind_pharma',
    icon: Heart,
    colorDark: 'text-cyber-magenta',
    colorLight: 'text-pink-600',
  },
  {
    key: 'ind_restaurant',
    icon: UtensilsCrossed,
    colorDark: 'text-cyber-purple',
    colorLight: 'text-purple-600',
  },
  {
    key: 'ind_enterprise',
    icon: Building2,
    colorDark: 'text-cyber-cyan',
    colorLight: 'text-indigo-600',
  },
];

const Industries = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [sectionRef, isInView] = useInView({ threshold: 0.1 });

  return (
    <section
      id="industries"
      ref={sectionRef}
      className={`relative py-20 lg:py-32 overflow-hidden transition-colors duration-500 section-fade ${
        isInView ? 'visible' : ''
      } ${isDark ? 'bg-[#0D0C1D]' : 'bg-[#f0f4f8]'}`}
    >
      {/* Background Ambience Overlay */}
      {isDark ? (
        <>
          <div className="absolute inset-0 circuit-grid opacity-30 pointer-events-none" />
          <div className="absolute top-1/4 -left-32 w-80 h-80 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-cyber-purple/15 rounded-full blur-3xl pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-1/4 -left-32 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-orbitron tracking-widest uppercase mb-4 transition-colors ${
              isDark
                ? 'border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                : 'border border-cyan-500/30 bg-cyan-50 text-cyan-700 shadow-sm'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                isDark ? 'bg-cyber-cyan' : 'bg-cyan-600'
              }`}
            />
            Sector Intelligence
          </div>
          <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-4">
            <span className="gradient-text">{t('industries_title')}</span>
          </h2>
          <p
            className={`text-base md:text-lg font-inter max-w-2xl mx-auto text-center leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {t('industries_subtitle')}
          </p>
        </div>

        {/* Coming Soon Glassmorphic / Clean Card */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`rounded-2xl md:rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden transition-all duration-500 ${
              isDark
                ? 'glass-strong border border-cyber-cyan/30 neon-border animate-pulse-glow'
                : 'bg-white border border-gray-200 shadow-xl'
            }`}
          >
            {/* Top accent light */}
            <div
              className={`absolute top-0 left-1/4 right-1/4 h-[2px] transition-all duration-500 ${
                isDark
                  ? 'bg-gradient-to-r from-transparent via-cyber-cyan to-transparent shadow-[0_0_15px_#00F0FF]'
                  : 'bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent'
              }`}
            />

            {/* Background ambient lighting inside card */}
            {isDark ? (
              <>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyber-purple/15 rounded-full blur-2xl pointer-events-none" />
              </>
            ) : (
              <>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-100/50 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-100/50 rounded-full blur-2xl pointer-events-none" />
              </>
            )}

            {/* Floating Animated Icon */}
            <div className="relative inline-block mb-8">
              <div
                className={`absolute -inset-3 rounded-full blur-xl transition-all duration-500 ${
                  isDark
                    ? 'bg-gradient-to-r from-cyber-cyan/30 via-cyber-purple/30 to-cyber-magenta/30 opacity-70 animate-pulse'
                    : 'bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 opacity-50'
                }`}
              />
              <div
                className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center animate-float mx-auto transition-all duration-500 ${
                  isDark
                    ? 'bg-cyber-darker/90 border border-cyber-cyan/50 shadow-[0_0_30px_rgba(0,240,255,0.35)]'
                    : 'bg-white border border-cyan-200 shadow-lg shadow-cyan-100/50'
                }`}
              >
                <Rocket
                  className={`w-12 h-12 sm:w-14 sm:h-14 transition-colors duration-300 ${
                    isDark
                      ? 'text-cyber-cyan drop-shadow-[0_0_12px_rgba(0,240,255,0.7)]'
                      : 'text-cyan-600'
                  }`}
                />
                <Sparkles
                  className={`w-5 h-5 absolute top-2 right-2 animate-pulse ${
                    isDark ? 'text-cyber-magenta' : 'text-pink-500'
                  }`}
                />
              </div>
            </div>

            {/* Coming Soon Title */}
            <h3 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider mb-4">
              <span className="gradient-text">{t('industries_coming')}</span>
            </h3>

            {/* Subtext Description */}
            <p
              className={`font-inter text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {t('industries_coming_desc')}
            </p>

            {/* 4 Industry Badge / Pill Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 max-w-3xl mx-auto">
              {upcomingIndustries.map((industry) => {
                const Icon = industry.icon;
                return (
                  <div
                    key={industry.key}
                    className={`px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full transition-all duration-300 flex items-center gap-2.5 group ${
                      isDark
                        ? 'glass border border-white/10 hover:border-cyber-cyan/40 hover:bg-white/5 shadow-[0_2px_12px_rgba(0,0,0,0.3)]'
                        : 'bg-white border border-gray-200 hover:border-cyan-400 hover:shadow-md shadow-sm'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        isDark
                          ? 'bg-cyber-dark/80 border border-white/10 group-hover:border-cyber-cyan/30'
                          : 'bg-gray-100 border border-gray-200 group-hover:border-cyan-300'
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 ${
                          isDark ? industry.colorDark : industry.colorLight
                        }`}
                      />
                    </span>
                    <span
                      className={`font-orbitron text-xs sm:text-sm tracking-wide font-medium transition-colors ${
                        isDark
                          ? 'text-gray-200 group-hover:text-white'
                          : 'text-gray-700 group-hover:text-gray-900'
                      }`}
                    >
                      {t(industry.key)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Notify Me Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className={`inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-orbitron text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 group cursor-pointer ${
                  isDark
                    ? 'bg-cyber-cyan/10 hover:bg-cyber-cyan/20 border border-cyber-cyan/40 hover:border-cyber-cyan text-cyber-cyan hover:text-white shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)]'
                    : 'bg-cyan-600 hover:bg-cyan-700 border border-cyan-600 text-white shadow-md hover:shadow-lg'
                }`}
              >
                <span>{t('industries_notify')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
