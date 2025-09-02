// tailwind.config.mjs
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}", // busca clases dentro de /src
  ],
  theme: {
    extend: {
      colors: {
        primary: "#15803d", // tu color verde
      },
    },
  },
  plugins: [],
};
