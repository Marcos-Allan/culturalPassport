/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      // colors: {
      //   'my-primary': '#010E26',
      //   'my-secondary': '#445EF2',
      //   'my-terciary': '#263973',
      //   'my-quartenary': '#05C7F2',
      //   'my-quintenary': '#7FA1CA',
      //   'my-black': '#000000',
      //   'my-white': '#ffffff',
      //   'my-gray': '#818181',
      //   'my-gray-black': '#c0c0c0',
      //   'my-white-opacity': '#ffffffbb',
      //   'my-black-opacity': '#000000bb',
      // },

      // colors: {
      //   'my-primary': '#191D1F',
      //   'my-secondary': '#B47C49',
      //   'my-terciary': '#723F28',
      //   'my-quartenary': '#6E9488',
      //   'my-quintenary': '#50818C',
      //   'my-black': '#000000',
      //   'my-white': '#ffffff',
      //   'my-gray': '#818181',
      //   'my-gray-black': '#c0c0c0',
      //   'my-white-opacity': '#ffffffbb',
      //   'my-black-opacity': '#000000bb',
      // },
      
      colors: {
        'my-primary': '#191D1F',
        'my-secondary': '#8D46DC',
        'my-terciary': '#75028E',
        'my-quartenary': '#20db48',
        'my-quintenary': '#4882fe',
        'my-black': '#0d0d0d',
        'my-white': '#fefefe',
        'my-gray': '#818181',
        'my-gray-black': '#c0c0c0',
        'my-white-opacity': '#fefefebb',
        'my-black-opacity': '#0d0d0dbb',
      },
      cursor: {
        'my-auto': 'url(./src/assets/imgs/curso-icons/cursor.png), auto',
        'my-text': 'url(./src/assets/imgs/curso-icons/text.png), text',
        'my-pointer': 'url(./src/assets/imgs/curso-icons/pointer.png), pointer',
        'my-grab': 'url(./src/assets/imgs/curso-icons/grab.png), grab',
        'my-grabbing': 'url(./src/assets/imgs/curso-icons/hold.png), grabbing',
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
        textChange: {
          '0%': { color: 'rgb(255, 0, 0)' },
          '14%': { color: 'rgb(255, 165, 0)' },
          '28%': { color: 'rgb(255, 255, 0)' },
          '42%': { color: 'rgb(0, 128, 0)' },
          '57%': { color: 'rgb(0, 255, 255)' },
          '71%': { color: 'rgb(0, 0, 255)' },
          '85%': { color: 'rgb(128, 0, 128)' },
          '100%': { color: 'rgb(255, 0, 0)' },
        },
        bgChange: {
          '0%': { backgroundColor: 'rgb(255, 0, 0)' },
          '14%': { backgroundColor: 'rgb(255, 165, 0)' },
          '28%': { backgroundColor: 'rgb(255, 255, 0)' },
          '42%': { backgroundColor: 'rgb(0, 128, 0)' },
          '57%': { backgroundColor: 'rgb(0, 255, 255)' },
          '71%': { backgroundColor: 'rgb(0, 0, 255)' },
          '85%': { backgroundColor: 'rgb(128, 0, 128)' },
          '100%': { backgroundColor: 'rgb(255, 0, 0)' },
        },
      },
      animation: {
        colorChange: 'colorChange 4s linear infinite',
        bgChange: 'bgChange 4s infinite linear',
        textChange: 'textChange 4s infinite linear',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

