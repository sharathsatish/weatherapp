/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sky-blue': {
          primary: '#4A90E2',
          secondary: '#357ABD',
          accent: '#7EB6FF',
          background: '#F0F8FF',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 