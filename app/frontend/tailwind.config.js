/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0A0A0C',
          900: '#111114',
          850: '#17171B',
          800: '#1E1E23',
        },
        emerald: {
          500: '#10B981',
        },
        amber: {
          500: '#F59E0B',
        },
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        sans: ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #10B981 0%, #F59E0B 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.4)',
        'glow-emerald': '0 0 40px rgba(16,185,129,0.25)',
      },
      animation: {
        'aurora': 'aurora 22s ease infinite',
        'fade-up': 'fade-up 0.9s cubic-bezier(0.19,1,0.22,1) both',
      },
      keyframes: {
        aurora: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(4%,-4%,0) scale(1.15)' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
