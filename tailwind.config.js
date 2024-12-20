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
        'auto': 'url("https://firebasestorage.googleapis.com/v0/b/cultural-passport-78148.appspot.com/o/images%2Fcursores%2Fcursor.png?alt=media&token=369efea4-39e8-4ee3-8216-de62883451de") 0 0, auto',
        'text': 'url("https://firebasestorage.googleapis.com/v0/b/cultural-passport-78148.appspot.com/o/images%2Fcursores%2Ftext.png?alt=media&token=ad5745f7-dcea-4ef5-ae5d-16bd1c7cda58") 14 0, text',
        'pointer': 'url("https://firebasestorage.googleapis.com/v0/b/cultural-passport-78148.appspot.com/o/images%2Fcursores%2Fpointer.png?alt=media&token=864e8451-5430-43c6-86ff-56b2f65ecdc2") 14 0, pointer',
        'grab': 'url("https://firebasestorage.googleapis.com/v0/b/cultural-passport-78148.appspot.com/o/images%2Fcursores%2Fgrab.png?alt=media&token=42c327f8-4d9e-448e-b508-9c6c79534a47") 14 0, grab',
        'grabbing': 'url("https://firebasestorage.googleapis.com/v0/b/cultural-passport-78148.appspot.com/o/images%2Fcursores%2Fhold.png?alt=media&token=d2d0f31a-e90b-4fd5-a4d0-3f163f52abd8") 14 0, grabbing',
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

