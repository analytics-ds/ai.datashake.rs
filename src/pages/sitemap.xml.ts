import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.href ?? 'https://ai.datashake.rs/';
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const categories = [...new Set(posts.map((p) => p.data.category))];

  const staticPages = ['', 'blog/'];
  const postPages = posts.map((p) => `blog/${p.slug}/`);
  const categoryPages = categories.map((c) =>
    `categorie/${c.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}/`
  );

  const allPages = [...staticPages, ...postPages, ...categoryPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((page) => `  <url>
    <loc>${siteUrl}${page}</loc>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
