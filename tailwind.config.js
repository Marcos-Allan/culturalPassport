/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-primary': '#010E26',
        'my-secondary': '#445EF2',
        'my-terciary': '#263973',
        'my-quartenary': '#05C7F2',
        'my-quintenary': '#7FA1CA',
        'my-black': '#000000',
        'my-white': '#ffffff',
        'my-gray': '#818181',
        'my-gray-black': '#c0c0c0',
        'my-white-opacity': '#ffffffbb',
        'my-black-opacity': '#000000bb',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

