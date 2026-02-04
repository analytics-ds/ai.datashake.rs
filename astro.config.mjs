import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ai.datashake.rs',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
