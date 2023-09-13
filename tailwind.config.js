/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        shadow: '10px -2px 20px 2px rgb(0 0 0 / 30%)',
      }
    },
  },
  plugins: [],
}