/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fffbf5',
          100: '#f8f1e8',
          200: '#f1e5d3',
        },
        brown: {
          50: '#f9f6f3',
          100: '#f0e8e0',
          200: '#e0d0c1',
          300: '#d0b8a0',
          400: '#ba9b7c',
          500: '#a48363',
          600: '#8a6d4d',
          700: '#705a3d',
          800: '#5c4932',
          900: '#483d2d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};