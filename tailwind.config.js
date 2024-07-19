/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,tsx,ts,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        "my-primary": "#7F75F0"
      }
    },
  },
  plugins: [],
};