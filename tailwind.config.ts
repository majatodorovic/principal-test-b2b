import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: '#086688',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { transform: '1' },
        },
      },
      fontSize: {
        lg: [
          '1.1rem',
          {
            lineHeight: '1.4',
          },
        ],
        '5xl': [
          '42px',
          {
            lineHeight: '1.1',
          },
        ],
      },
    },
  },

  plugins: [],
};
export default config;
