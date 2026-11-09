import React from 'react';
import { Smartphone, Globe, Monitor, Brain, Database, Shield, BarChart3, Cpu } from 'lucide-react';
import { useTilt, useInView } from '../../hooks/useAnimations';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const ServiceCard = ({ icon: Icon, title, description, tags, index, isInView, isDark }) => {
  const tiltRef = useTilt(6);

  return (
    <div
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div
        ref={tiltRef}
        className={`group relative h-full rounded-2xl p-6 sm:p-7 flex flex-col backdrop-blur-md transition-all duration-500 ease-out overflow-hidden ${
          isDark
            ? 'bg-white/[0.03] border border-white/[0.08] hover:border-cyan-400/30 hover:bg-white/[0.05]'
            : 'bg-white border border-gray-200/60 shadow-sm hover:border-cyan-500/40 hover:shadow-md'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Top edge highlight */}
        <div
          className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent ${
            isDark ? 'via-cyan-400/20 group-hover:via-cyan-400/50' : 'via-cyan-500/20 group-hover:via-cyan-500/50'
          } to-transparent transition-all duration-500 pointer-events-none`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon and number */}
          <div className="flex items-start justify-between mb-5">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? 'bg-gradient-to-br from-cyan-500/15 to-purple-500/10 border border-cyan-400/20 text-cyan-400 group-hover:border-cyan-400/40'
                  : 'bg-cyan-50 border border-cyan-200 text-cyan-600 group-hover:border-cyan-400'
              }`}
            >
              <Icon className="w-6 h-6 stroke-[1.5]" />
            </div>
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center font-orbitron text-[11px] font-semibold transition-colors duration-300 ${
                isDark
                  ? 'bg-white/[0.06] border border-white/10 text-gray-500 group-hover:text-cyan-400/70'
                  : 'bg-gray-100 border border-gray-200 text-gray-400 group-hover:text-cyan-600'
              }`}
            >
              0{index + 1}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`font-orbitron text-base lg:text-lg font-bold mb-2.5 tracking-wide ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className={`font-inter text-sm leading-relaxed mb-5 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {description}
          </p>
        </div>

        {/* Tags */}
        <div className="relative z-10 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 text-[11px] font-inter font-medium rounded-full border transition-colors duration-300 ${
                  isDark
                    ? 'bg-cyan-400/[0.07] text-cyan-300/80 border-cyan-400/[0.12]'
                    : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [sectionRef, isInView] = useInView({ threshold: 0.05 });

  const services = [
    {
      icon: Smartphone,
      title: t('svc_mobile_title'),
      description: t('svc_mobile_desc'),
      tags: ['iOS', 'Android', 'React Native', 'Flutter', 'UI/UX', 'App Store'],
    },
    {
      icon: Globe,
      title: t('svc_web_title'),
      description: t('svc_web_desc'),
      tags: ['PWA', 'Next.js', 'E-Commerce', 'SEO', 'Responsive', 'CMS'],
    },
    {
      icon: Monitor,
      title: t('svc_pos_title'),
      description: t('svc_pos_desc'),
      tags: ['POS', 'Inventory', 'Multi-Branch', 'Analytics', 'Billing', 'Reports'],
    },
    {
      icon: Brain,
      title: t('svc_ai_title'),
      description: t('svc_ai_desc'),
      tags: ['AI Models', 'ML', 'NLP', 'Automation', 'Chatbots', 'Predictions'],
    },
    {
      icon: Database,
      title: t('svc_db_title'),
      description: t('svc_db_desc'),
      tags: ['PostgreSQL', 'MongoDB', 'Cloud', 'AWS', 'Firebase', 'Migration'],
    },
    {
      icon: Shield,
      title: t('svc_security_title'),
      description: t('svc_security_desc'),
      tags: ['Security', 'SSL', 'Encryption', 'Compliance', 'Firewall', 'Monitoring'],
    },
    {
      icon: BarChart3,
      title: t('svc_data_title'),
      description: t('svc_data_desc'),
      tags: ['Dashboards', 'BI', 'Visualization', 'KPIs', 'Reporting', 'Analytics'],
    },
    {
      icon: Cpu,
      title: t('svc_api_title'),
      description: t('svc_api_desc'),
      tags: ['REST APIs', 'Payments', 'Integration', 'Webhooks', 'Microservices', 'DevOps'],
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`relative py-20 lg:py-28 overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#05050D] text-white' : 'bg-[#f0f4f8] text-gray-900'
      }`}
    >
      {/* Background */}
      <div
        className={`absolute inset-0 circuit-grid pointer-events-none ${
          isDark ? 'opacity-[0.04]' : 'opacity-[0.02]'
        }`}
      />
      <div
        className={`absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none ${
          isDark ? 'bg-cyan-500/[0.06]' : 'bg-cyan-500/[0.04]'
        }`}
      />
      <div
        className={`absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none ${
          isDark ? 'bg-purple-500/[0.05]' : 'bg-purple-500/[0.03]'
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div
          className="text-center max-w-2xl mx-auto mb-14 lg:mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h2
            className={`font-orbitron font-bold text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight mb-4 ${
              isDark ? 'gradient-text-cyan' : 'text-gray-900'
            }`}
          >
            {t('services_title')}
          </h2>

          {/* Divider */}
          <div className="flex items-center justify-center gap-1.5 mb-5">
            <span
              className={`h-px w-8 rounded-full ${
                isDark
                  ? 'bg-gradient-to-r from-transparent to-cyan-400/40'
                  : 'bg-gradient-to-r from-transparent to-cyan-500/40'
              }`}
            />
            <span
              className={`h-[2px] w-12 rounded-full ${
                isDark ? 'bg-cyan-400/60' : 'bg-cyan-500'
              }`}
            />
            <span
              className={`h-px w-8 rounded-full ${
                isDark
                  ? 'bg-gradient-to-l from-transparent to-cyan-400/40'
                  : 'bg-gradient-to-l from-transparent to-cyan-500/40'
              }`}
            />
          </div>

          <p
            className={`font-inter text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {t('services_subtitle')}
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              index={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              tags={service.tags}
              isInView={isInView}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
