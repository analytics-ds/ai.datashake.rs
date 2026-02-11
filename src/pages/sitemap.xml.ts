import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getAlternatePath } from '@/utils/i18n';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = (site?.href ?? 'https://ai.datashake.fr/').replace(/\/$/, '');

  const postsFr = await getCollection('blog', ({ data }) => !data.draft);
  const postsEn = await getCollection('blog-en', ({ data }) => !data.draft);

  const categoriesFr = [...new Set(postsFr.map((p) => p.data.category))];
  const categoriesEn = [...new Set(postsEn.map((p) => p.data.category))];

  const normalize = (s: string) =>
    s.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // FR pages
  const frPages = [
    '',
    'blog/',
    ...postsFr.map((p) => `blog/${p.slug}/`),
    ...categoriesFr.map((c) => `categorie/${normalize(c)}/`),
  ];

  // EN pages
  const enPages = [
    'en/',
    'en/blog/',
    ...postsEn.map((p) => `en/blog/${p.slug}/`),
    ...categoriesEn.map((c) => `en/category/${normalize(c)}/`),
  ];

  const allPages = [...frPages, ...enPages];

  const entries = allPages.map((page) => {
    const path = `/${page}`;
    const alternate = getAlternatePath(path);
    const isFr = !page.startsWith('en/');
    const hrefFr = isFr ? `${siteUrl}${path}` : `${siteUrl}${alternate}`;
    const hrefEn = isFr ? `${siteUrl}${alternate}` : `${siteUrl}${path}`;

    return `  <url>
    <loc>${siteUrl}/${page}</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="${hrefFr}" />
    <xhtml:link rel="alternate" hreflang="en" href="${hrefEn}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${hrefFr}" />
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
