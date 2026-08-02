import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sunite: {
          50: '#fffbe1',
          100: '#fff6c2',
          200: '#ffe888',
          300: '#ffd343',
          400: '#ffbc11',
          500: '#f59e00',
          600: '#d97700',
          700: '#ad5200',
          800: '#8c3f07',
          900: '#73340b',
        },
      },
    },
  },
  plugins: [],
};

export default config;
