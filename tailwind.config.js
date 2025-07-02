/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Lato', 'sans-serif'],
      },
      spacing: {
        '15': '3.75rem',
        '50': '12.5rem',
        '75': '18.75rem',
        '96': '24rem',
        '125': '31.25rem',
      },
      scale: {
        '101': '1.01',
        '102': '1.02',
        '105': '1.05',
        '110': '1.1',
      },
      animation: {
        'spin': 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
}