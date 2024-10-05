import type { Config } from 'tailwindcss';

// Plugins:
import defaultTheme from 'tailwindcss/defaultTheme';
import twTypography from '@tailwindcss/typography';

const config = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            'h1 a': {
              'text-decoration': 'none'
            },
            'h2 a': {
              'text-decoration': 'none'
            },
            blockquote: {
              'font-style': 'normal'
            }
          }
        }
      },
      colors: {
        dark: '#161616',
        light: '#f5f5f5'
      },
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
        mono: ['GeistMono', ...defaultTheme.fontFamily.mono]
      },
      fontSize: {
        mini: '14px'
      }
    }
  },
  plugins: [
    twTypography,
    ({ addUtilities }) => {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance'
        }
      });
    }
  ]
} satisfies Config;

export default config;
