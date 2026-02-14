// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind'; // <-- EZ A SOR KELL

export default defineConfig({
  site: 'https://github.com/Aimentool/Aimentool.git', 
  base: '/Aimentool', // FONTOS: Ha a repód neve "Aimentool", akkor ez kell ide!
  integrations: [tailwind()]});
