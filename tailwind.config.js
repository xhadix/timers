/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#1d47ba',
          dark: '#0e215a',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to top, #1d47ba 0%, #0e215a 100%)',
      }
    },
  },
  plugins: [],
} 