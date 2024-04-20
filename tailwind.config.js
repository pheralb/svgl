import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        dark: '#161616',
        light: '#f5f5f5'
      },
      fontFamily: {
        sans: ['InterVariable', ...fontFamily.sans],
        mono: ['GeistMono', ...fontFamily.mono]
      },
      fontSize: {
        mini: '14px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    ({ addUtilities }) => {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance'
        }
      });
    }
  ]
};
