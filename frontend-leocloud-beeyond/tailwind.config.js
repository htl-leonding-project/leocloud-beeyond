/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: false,
  },
  theme: {
    extend: {
      colors: {
        primary: "#7e4eac",
        secondary: "#e6d7ff",
      },
    },
  },
  plugins: [require("daisyui")],
};
