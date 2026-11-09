import React from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Industries from './components/Industries/Industries';
import Workflow from './components/Workflow/Workflow';
import Portfolio from './components/Portfolio/Portfolio';
import ContactFooter from './components/ContactFooter/ContactFooter';

function AppContent() {
  const { isRTL } = useLanguage();
  const { isDark } = useTheme();

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen font-inter overflow-x-hidden transition-colors duration-500 ${
        isDark
          ? 'bg-[#0D0C1D] text-white'
          : 'bg-[#f0f4f8] text-gray-900'
      }`}
    >
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Industries />
      <Workflow />
      <ContactFooter />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
