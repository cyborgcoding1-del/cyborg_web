/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0D0C1D',
          darker: '#05050D',
          deep: '#080B1A',
          cyan: '#00F0FF',
          purple: '#8A2BE2',
          magenta: '#FF007F',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'border-flow': 'borderFlow 3s linear infinite',
        'grid-move': 'gridMove 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px #00F0FF, 0 0 20px #00F0FF40' },
          '50%': { boxShadow: '0 0 20px #00F0FF, 0 0 60px #00F0FF60' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        gridMove: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #00F0FF 0%, #8A2BE2 50%, #FF007F 100%)',
        'cyber-gradient-text': 'linear-gradient(90deg, #00F0FF, #8A2BE2, #FF007F)',
      },
    },
  },
  plugins: [],
};
