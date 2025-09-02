// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://ruranjo.github.io/template-landing-girasol",
  base: "/template-landing-girasol/",
  vite: {
    plugins: [tailwindcss()],
  }
});