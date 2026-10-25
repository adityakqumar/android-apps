/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(210, 70%, 55%)',
        accent: 'hsl(34, 90%, 55%)',
        surface: {
          light: 'hsl(0, 0%, 98%)',
          dark: 'hsl(220, 12%, 12%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
