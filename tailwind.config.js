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
        "blue-dark": "#11223A", //cor 60% -- essa é a mesma cor azul escuro da NavBar da loja FishNet -Bianca
        "gray-light": "#CBD5E1", //cor 30% -- cinza
        "yellow-light": "#CBAD51", //cor 10% -- amarelo
        "branco-perolado": "#F0F0F0", //plano de fundo com detalhes
        "BU-azul": "#003459",
      },
    },
  },
  plugins: [],
};
