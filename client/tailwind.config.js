/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // ✅ Ensures Tailwind scans all files
  ],
  theme: {
    extend: { },
  },
  plugins: [],
};
