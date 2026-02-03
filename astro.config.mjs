// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind'; // <-- EZ A SOR KELL

export default defineConfig({
  integrations: [tailwind()] // <-- ÉS EZ A SOR
});