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

        'pop1':{
          '0%': {
            transform: 'scale(0.8)',
          },
          '50%': {
            transform: 'scale(1.2)',
          },
          '100%': {
            transform: 'scale(1)',
          }
        },

        'pop2':{
          '0%': {
            transform: 'scale(0.8)',
          },
          '50%': {
            transform: 'scale(1.2)',
          },
          '100%': {
            transform: 'scale(1)',
          }
        },

        'slide-left': {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },

      },
      animation: {
        'pop1': 'pop1 0.5s cubic-bezier(0.47, 2.02, 0.31, -0.36)',
        'pop2': 'pop2 0.5s cubic-bezier(0.47, 2.02, 0.31, -0.36)',
        'fade-in': 'fade-in 0.5s ease-in-out',
        'shake': 'shake 0.9s cubic-bezier(0.04, 0.04, 0.04, 0.04)',
        'slide-left': 'slide-left 0.5s ease-out',
      },
    },
  },
  plugins: [],
  darkMode: "class",
}

