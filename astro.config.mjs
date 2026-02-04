import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://analytics-ds.github.io',
  base: '/ai.datashake.rs',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
