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
      keyframes: {
        colorChange: {
          '0%': { borderColor: 'rgb(255, 0, 0)' },
          '14%': { borderColor: 'rgb(255, 165, 0)' },
          '28%': { borderColor: 'rgb(255, 255, 0)' },
          '42%': { borderColor: 'rgb(0, 128, 0)' },
          '57%': { borderColor: 'rgb(0, 255, 255)' },
          '71%': { borderColor: 'rgb(0, 0, 255)' },
          '85%': { borderColor: 'rgb(128, 0, 128)' },
          '100%': { borderColor: 'rgb(255, 0, 0)' },
        },
      },
      animation: {
        colorChange: 'colorChange 4s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

