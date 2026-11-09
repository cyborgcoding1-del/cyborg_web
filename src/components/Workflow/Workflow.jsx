import React from 'react';
import { Search, Palette, Code, ShieldCheck, Rocket } from 'lucide-react';
import { useInView } from '../../hooks/useAnimations';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export default function Workflow() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [sectionRef, isInView] = useInView({ threshold: 0.1 });

  const steps = [
    {
      number: '01',
      icon: Search,
      title: t('wf_analyze'),
      description: t('wf_analyze_desc'),
    },
    {
      number: '02',
      icon: Palette,
      title: t('wf_design'),
      description: t('wf_design_desc'),
    },
    {
      number: '03',
      icon: Code,
      title: t('wf_develop'),
      description: t('wf_develop_desc'),
    },
    {
      number: '04',
      icon: ShieldCheck,
      title: t('wf_test'),
      description: t('wf_test_desc'),
    },
    {
      number: '05',
      icon: Rocket,
      title: t('wf_launch'),
      description: t('wf_launch_desc'),
    },
  ];

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className={`py-20 lg:py-32 relative overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#05050D] text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Background Ambience & Subtle Glows */}
      {isDark ? (
        <>
          <div className="absolute inset-0 circuit-grid opacity-20 pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyber-cyan/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyber-purple/5 rounded-full blur-[120px] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-100/40 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-100/40 rounded-full blur-[120px] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 transition-all duration-700"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <h2
            className={`font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
              isDark ? 'gradient-text-cyan' : 'text-gray-900'
            }`}
          >
            {t('workflow_title')}
          </h2>

          {/* Decorative Gradient Divider Line */}
          <div
            className={`w-20 sm:w-24 h-1 rounded-full mx-auto my-5 ${
              isDark
                ? 'bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-magenta shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                : 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 shadow-sm'
            }`}
          />

          {/* Subtitle */}
          <p
            className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {t('workflow_subtitle')}
          </p>
        </div>

        {/* DESKTOP TIMELINE (lg+) */}
        <div className="hidden lg:block relative">
          {/* Gradient Connecting Horizontal Line */}
          <div
            className={`absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r ${
              isDark
                ? 'from-cyber-cyan/30 to-cyber-purple/30 shadow-[0_0_8px_rgba(0,240,255,0.3)]'
                : 'from-cyan-300 to-purple-300'
            } rounded-full pointer-events-none transition-all duration-1000 ease-out`}
            style={{
              opacity: isInView ? (isDark ? 0.7 : 0.9) : 0,
              transform: isInView ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
            }}
          />

          {/* 5 Step Cards in Horizontal Layout */}
          <div className="grid grid-cols-5 gap-4 xl:gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className={`group relative flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 ${
                    isDark
                      ? 'backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyber-cyan/30 hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]'
                      : 'bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-cyan-500/40 hover:bg-cyan-50/20'
                  }`}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateY(0)' : 'translateY(24px)',
                    transitionDelay: `${index * 120}ms`,
                  }}
                >
                  {/* Step Number in Gradient Circle */}
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-white font-orbitron font-bold text-xs flex items-center justify-center mb-4 ring-4 ${
                      isDark
                        ? 'ring-[#05050D] shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                        : 'ring-white shadow-md'
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                      isDark
                        ? 'bg-white/5 border border-white/10 text-cyber-cyan group-hover:text-white group-hover:bg-cyber-cyan/10 group-hover:border-cyber-cyan/30'
                        : 'bg-cyan-50 border border-cyan-100 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600'
                    }`}
                  >
                    <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-orbitron text-sm font-bold mb-2 transition-colors duration-200 ${
                      isDark
                        ? 'text-white group-hover:text-cyber-cyan'
                        : 'text-gray-900 group-hover:text-cyan-600'
                    }`}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-xs leading-relaxed ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE / TABLET TIMELINE (<lg) */}
        <div className="block lg:hidden relative">
          {/* Left Vertical Gradient Line */}
          <div
            className={`absolute left-6 sm:left-7 rtl:left-auto rtl:right-6 sm:rtl:right-7 -translate-x-1/2 rtl:translate-x-1/2 top-6 bottom-6 w-[2px] bg-gradient-to-b ${
              isDark
                ? 'from-cyber-cyan/30 to-cyber-purple/30 shadow-[0_0_8px_rgba(0,240,255,0.3)]'
                : 'from-cyan-300 to-purple-300'
            } rounded-full pointer-events-none transition-all duration-1000 ease-out`}
            style={{
              height: isInView ? 'calc(100% - 48px)' : '0%',
              opacity: isInView ? (isDark ? 0.7 : 0.9) : 0,
            }}
          />

          {/* Clean Vertical Step Cards */}
          <div className="space-y-6 sm:space-y-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative flex items-start gap-4 sm:gap-6 group transition-all duration-700"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateX(0)' : 'translateX(-24px)',
                    transitionDelay: `${index * 120}ms`,
                  }}
                >
                  {/* Left: Number in Gradient Circle */}
                  <div className="relative shrink-0 z-10">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-white font-orbitron font-bold text-xs sm:text-sm flex items-center justify-center ring-4 ${
                        isDark
                          ? 'ring-[#05050D] shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                          : 'ring-white shadow-md'
                      } group-hover:scale-105 transition-transform duration-300`}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Right: Step Card with Icon, Title, Description */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`p-5 sm:p-6 rounded-2xl transition-all duration-300 ${
                        isDark
                          ? 'backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyber-cyan/30 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                          : 'bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-cyan-500/40 hover:bg-cyan-50/20'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2.5">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isDark
                              ? 'bg-white/5 border border-white/10 text-cyber-cyan group-hover:text-white group-hover:bg-cyber-cyan/10 group-hover:border-cyber-cyan/30'
                              : 'bg-cyan-50 border border-cyan-100 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600'
                          }`}
                        >
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <h3
                          className={`font-orbitron text-sm sm:text-base font-bold transition-colors duration-200 ${
                            isDark
                              ? 'text-white group-hover:text-cyber-cyan'
                              : 'text-gray-900 group-hover:text-cyan-600'
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
