/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      
     fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
      condensed: ['"Roboto Condensed"', 'sans-serif'],
      noto: ['"Noto Serif Khitan Small Script"', 'serif'],
    },
  },
  plugins: [],
}
};
