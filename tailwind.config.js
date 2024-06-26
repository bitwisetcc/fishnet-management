/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        alt: "#ff9f1c",
        "alt-dimm": "#ffbf69",
        neutral: "#ffffff",
        highlight: "#cbf3f0",
        "highlighy-dimm": "#5bbfb5",
        "backnav-light": "#aee8e3", 
        "fundo-light": "#006D77", 
        sombra: "#E29578", 
      },
    },
  },
  plugins: [],
};