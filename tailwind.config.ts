import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-bebas-neue)'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        aqua: '#64EEBC',
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        scaleIn: 'scaleIn 5s ease-in-out',
      },
      container: {
        center: true,
        screens: {
          sm: '327px',
          lg: '1232px',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
