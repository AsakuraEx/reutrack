import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  darkMode: 'false',
  theme: {
    extend: {
      fontFamily: {
        'roboto': ["Roboto", "serif"],
      },
      backgroundImage: {
        'login': "url('../public/images/bg-login.jpg')"
      }
    },
  },
  plugins: [
    daisyui,
  ],
}

