/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7e4eac",
        secondary: "#e6d7ff",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#7e4eac",
          secondary: "#e6d7ff",
          accent: "#f9fafb",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
