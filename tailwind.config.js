/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/**/*.ejs`],
  daisyui: {
    themes: ['fantasy'],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

