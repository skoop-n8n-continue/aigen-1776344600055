/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00b7af",
        dark: "#10181f",
        secondary: "#6a7071",
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
