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
        normal: ['var(--font-bebas-neue)', 'var(--font-bebas-neue-light)'],
        light: ['var(--font-bebas-neue-light)'],
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
      container: {
        center: true,
        padding: {
          DEFAULT: '24',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
