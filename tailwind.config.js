/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#0099bf',
        },
      },
      {
        dark: {
          primary: '#0099bf',
        },
      },
    ],
  },
};
