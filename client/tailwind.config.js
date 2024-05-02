/** @type {import('tailwindcss').Config} */
const colors = require ('./src/common/colors.ts');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat','sans-serif'],
      },
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        blue: colors.blue,
        lightBlue: colors.lightBlue,
        yellow: colors.yellow,
        alert: '#CB0000'
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },

        'shake': {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '10%, 30%, 50%, 70%, 90%': {
            transform: 'translateX(-2px)',
          },
          '20%, 40%, 60%, 80%': {
            transform: 'translateX(2px)',
          },
        },

      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'shake': 'shake 0.9s cubic-bezier(0.04, 0.04, 0.04, 0.04)',
      },
    },
  },
  plugins: [],
}

