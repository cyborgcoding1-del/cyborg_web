import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sun, Moon, Languages } from 'lucide-react';
import { scrollToSection } from '../../hooks/useAnimations';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { t, toggleLang, lang, isRTL } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t('nav_home'), id: 'home' },
    { name: t('nav_services'), id: 'services' },
    { name: t('nav_industries'), id: 'industries' },
    { name: t('nav_workflow'), id: 'workflow' },
    { name: t('nav_contact'), id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? isDark
              ? 'bg-cyber-dark/85 backdrop-blur-xl border-b border-cyber-cyan/20 shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-3'
              : 'bg-white/90 backdrop-blur-xl border-b border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.08)] py-3'
            : isDark
              ? 'bg-cyber-dark/40 backdrop-blur-md border-b border-white/5 py-4 sm:py-5'
              : 'bg-white/60 backdrop-blur-md border-b border-gray-200/50 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LEFT: CYBORG logo image in hexagonal frame + text */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="group flex items-center gap-3 cursor-pointer select-none"
              aria-label="CYBORG Home"
            >
              <div className="relative w-10 h-10 flex items-center justify-center p-[2px] transition-transform duration-300 group-hover:scale-105">
                {/* Neon hexagonal accent frame */}
                <div className="absolute inset-0 hex-frame bg-gradient-to-br from-cyber-cyan via-cyber-purple to-cyber-cyan opacity-80 group-hover:opacity-100 shadow-[0_0_12px_rgba(0,240,255,0.6)] transition-all duration-300" />
                <div className={`relative w-full h-full hex-frame ${isDark ? 'bg-cyber-darker' : 'bg-gray-900'} flex items-center justify-center p-[2px]`}>
                  <img
                    src={`${process.env.PUBLIC_URL}/cyborg-logo.jpeg`}
                    alt="CYBORG"
                    className="w-full h-full object-cover hex-frame"
                  />
                </div>
              </div>
              <span
                className={`font-orbitron font-extrabold text-xl sm:text-2xl tracking-widest transition-all duration-300 ${
                  isDark
                    ? 'text-white drop-shadow-[0_0_10px_rgba(0,240,255,0.5)] group-hover:text-cyber-cyan group-hover:drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]'
                    : 'text-gray-900 group-hover:text-cyan-600'
                }`}
              >
                CYBORG
              </span>
            </a>

            {/* CENTER: Navigation links with hover effects */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative px-3.5 py-2 font-inter text-sm font-medium transition-colors duration-200 group ${
                    isDark
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-cyan-600'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Cyan gradient hover underline effect */}
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-cyber-cyan via-cyber-cyan to-cyber-purple scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center rounded-full shadow-[0_0_8px_#00F0FF]" />
                </a>
              ))}
            </nav>

            {/* RIGHT: Theme toggle, Language toggle, CTA button, and Mobile hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme toggle: Sun icon for dark mode, Moon icon for light mode */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`p-2 rounded-lg transition-all duration-200 border flex items-center justify-center backdrop-blur-md ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-cyber-cyan hover:bg-white/10 hover:border-cyber-cyan/50 shadow-[0_0_10px_rgba(0,240,255,0.15)]'
                    : 'bg-gray-900/5 border-gray-900/10 text-gray-700 hover:bg-gray-900/10 hover:text-cyan-600 hover:border-cyan-500/50 shadow-sm'
                }`}
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-cyber-cyan transition-transform duration-200 hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-700 transition-transform duration-200 hover:-rotate-12" />
                )}
              </button>

              {/* Language toggle: Show 'EN' or 'AR' text badge */}
              <button
                type="button"
                onClick={toggleLang}
                aria-label="Toggle language"
                title={lang === 'en' ? 'تغيير إلى العربية' : 'Switch to English'}
                className={`px-2.5 py-1.5 rounded-lg transition-all duration-200 border flex items-center gap-1.5 font-orbitron text-xs font-bold backdrop-blur-md ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-gray-200 hover:text-cyber-cyan hover:bg-white/10 hover:border-cyber-cyan/50 shadow-[0_0_10px_rgba(0,240,255,0.15)]'
                    : 'bg-gray-900/5 border-gray-900/10 text-gray-700 hover:text-cyan-600 hover:bg-gray-900/10 hover:border-cyan-500/50 shadow-sm'
                }`}
              >
                <Languages className={`w-3.5 h-3.5 ${isDark ? 'text-cyber-cyan' : 'text-cyan-600'}`} />
                <span>{lang === 'en' ? 'AR' : 'EN'}</span>
              </button>

              {/* Desktop CTA button */}
              <div className="hidden lg:flex items-center">
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className={`pulse-btn relative inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-orbitron text-xs tracking-wider uppercase font-bold transition-all duration-300 active:scale-95 group overflow-hidden ${
                    isDark
                      ? 'text-white bg-white/5 border border-cyber-cyan/50 hover:border-cyber-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                      : 'text-gray-900 bg-cyan-50/80 border border-cyan-400 hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>{t('nav_quote')}</span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 ${
                        isDark ? 'text-cyber-cyan' : 'text-cyan-600 group-hover:text-white'
                      } ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform duration-200`}
                    />
                  </span>
                </button>
              </div>

              {/* Mobile hamburger menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                className={`lg:hidden p-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-cyber-cyan ${
                  isDark
                    ? 'text-gray-300 hover:text-cyber-cyan hover:bg-white/5 border-white/10 hover:border-cyber-cyan/30'
                    : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-100 border-gray-200 hover:border-cyan-300'
                }`}
              >
                {mobileMenuOpen ? (
                  <X className={`w-6 h-6 ${isDark ? 'text-cyber-cyan' : 'text-cyan-600'}`} />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Glowing cybernetic bottom border */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent transition-opacity duration-300 pointer-events-none ${
            isScrolled ? 'opacity-90 shadow-[0_0_10px_#00F0FF]' : 'opacity-40'
          }`}
        />
      </header>

      {/* MOBILE: Full-screen glassmorphic overlay menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[60px] sm:top-[68px] z-40 backdrop-blur-2xl transition-all duration-300 ease-in-out flex flex-col justify-between p-6 sm:p-8 overflow-y-auto ${
          isDark
            ? 'bg-[#0D0C1D]/95 border-t border-cyber-cyan/20'
            : 'bg-white/95 border-t border-gray-200 shadow-2xl'
        } ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
        style={{ minHeight: 'calc(100vh - 60px)' }}
      >
        <div className="flex flex-col space-y-2 pt-2">
          {navLinks.map((link, index) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`flex items-center justify-between px-4 py-3.5 rounded-lg font-orbitron text-base sm:text-lg tracking-wider border transition-all duration-200 group ${
                isDark
                  ? 'text-gray-200 hover:text-cyber-cyan hover:bg-white/5 border-transparent hover:border-cyber-cyan/30'
                  : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-100/80 border-transparent hover:border-cyan-300'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={`text-xs font-mono ${isDark ? 'text-cyber-cyan/60' : 'text-cyan-600/70'}`}>
                  0{index + 1}
                </span>
                <span>{link.name}</span>
              </span>
              <span
                className={`text-cyber-cyan opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                  isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                }`}
              >
                →
              </span>
            </a>
          ))}
        </div>

        <div className={`pt-6 pb-8 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="pulse-btn w-full py-4 rounded-lg font-orbitron text-xs sm:text-sm tracking-widest uppercase font-bold text-cyber-dark bg-cyber-cyan hover:bg-white shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>{t('nav_quote')}</span>
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </>
  );
}
