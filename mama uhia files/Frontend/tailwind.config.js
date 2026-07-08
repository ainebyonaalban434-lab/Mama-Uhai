/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E8B4D0',
        secondary: '#F5D5E8',
        accent: '#8B5A8E',
      },
    },
  },
  plugins: [],
}
