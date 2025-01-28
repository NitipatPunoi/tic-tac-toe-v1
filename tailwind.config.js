/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e5e0ff',
        textDeepBlue: '#00337c',
        textLightBlue: '#09a8fa',
        textRed: '#ff1818',
        btnPrimary: '#8ca0f0',
        btnPrimaryHover: '#6e82d2',
        btnPrimaryActive: '#163172',
        boardBorder: '#14279b',
        boardBackground: '#ffffff',
        boardCellHover: '#dddddd',
        boardMark: '#f3f8ff',
        boardHilight: '#caf7e3',
        boardLastMove: '#deecff',
      },
      fontFamily: {
        lilita: ['Lilita One', 'cursive'],
        pressStart: ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
}
