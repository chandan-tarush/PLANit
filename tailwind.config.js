/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17201c',
        line: '#d9dfd8',
        panel: '#f7f8f5',
        moss: '#4f6f52',
        coral: '#c75f4b',
        amber: '#c9973b',
        sky: '#4d8096',
      },
      boxShadow: {
        soft: '0 12px 32px rgba(23, 32, 28, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
