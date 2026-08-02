/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#10131f',
        line: '#dde3ea',
        panel: '#f7f9fc',
        moss: '#2f7f6f',
        coral: '#d95f59',
        amber: '#d5a11e',
        sky: '#3e8fb0',
        violet: '#7258e8',
        lime: '#b5d66b',
      },
      boxShadow: {
        soft: '0 16px 48px rgba(16, 19, 31, 0.09)',
        lift: '0 22px 70px rgba(16, 19, 31, 0.14)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
