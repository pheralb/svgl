/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        dark: '#161616',
        light: '#f5f5f5'
      },
      fontFamily: {
        sans: ['InterVariable', 'sans-serif'],
        mono: ['GeistMono', 'monospace']
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
