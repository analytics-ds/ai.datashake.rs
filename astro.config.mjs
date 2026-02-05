import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ai.datashake.fr',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
