/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.svelte'],
  daisyui: {
    themes: ["synthwave"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
}

