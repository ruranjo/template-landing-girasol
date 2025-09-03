// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react'; // 👈 Importa React
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: "https://ruranjo.github.io/template-landing-girasol",
  base: "/template-landing-girasol/",
  integrations: [react()], // 👈 Agrega la integración de React
  vite: {
    plugins: [tailwindcss()],
  },
});
