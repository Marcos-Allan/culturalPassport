/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-primary': '#2843BD',
        'my-secondary': '#735FE0',
        'my-terciary': '#21DD98',
        'my-black': '#000000',
        'my-white': '#ffffff',
        'my-gray': '#9e9e9e',
        'my-gray-black': '#b2b2b2',
      },
    },
  },
  plugins: [],
}

