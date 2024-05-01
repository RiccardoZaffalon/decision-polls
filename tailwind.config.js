/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.svelte'],
  daisyui: {
    themes: ["sunset"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
}

