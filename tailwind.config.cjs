/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        text: '2px 2px 0px black',
      },
      boxShadow: {
        hard: `
        2px 2px 0px black,
        4px 4px 0px black
        `,
      },
      fontFamily: {
        pokemon: ['Pokemon'],
      },
      colors: {
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInBottom: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInTop: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        // animation for growing width with cubic bezier bounce effect
        growWidth: {
          '0%': { width: '0%' },
          '100%': { width: '50%' },
        },
      },
      animation: {
        // animation for sliding in with a playful bounce effect
        slideInLeft:
          'slideInLeft 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        slideInBottom:
          'slideInBottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        slideInTop: 'slideInTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',

        // animation for growing width with cubic bezier bounce effect
        growWidth: 'growWidth 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.115)',
      },
    },
  },
  plugins: [
    require('tailwindcss-safe-area'),
    plugin(({ addVariant }) => {
      addVariant('data-state-checked', '&[data-state="checked"]');
    }),
    plugin(({ addVariant }) => {
      addVariant('data-state-unchecked', '&[data-state="unchecked"]');
    }),
  ],
  darkMode: 'class',
};
