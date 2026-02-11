import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getAlternatePath } from '@/utils/i18n';

function toDateString(val: Date | string | undefined): string {
  if (!val) return new Date().toISOString().split('T')[0];
  const d = val instanceof Date ? val : new Date(val);
  return isNaN(d.getTime()) ? new Date().toISOString().split('T')[0] : d.toISOString().split('T')[0];
}

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = (site?.href ?? 'https://ai.datashake.fr/').replace(/\/$/, '');

  const postsFr = await getCollection('blog', ({ data }) => !data.draft);
  const postsEn = await getCollection('blog-en', ({ data }) => !data.draft);

  const categoriesFr = [...new Set(postsFr.map((p) => p.data.category))];
  const categoriesEn = [...new Set(postsEn.map((p) => p.data.category))];

  const normalize = (s: string) =>
    s.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Build a map of slug -> lastmod date for quick lookup
  const frDateMap = new Map(postsFr.map((p) => [`blog/${p.slug}/`, toDateString(p.data.date)]));
  const enDateMap = new Map(postsEn.map((p) => [`en/blog/${p.slug}/`, toDateString(p.data.date)]));

  // Most recent article date for listing / category pages
  const latestFr = postsFr.length
    ? toDateString(postsFr.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())[0].data.date)
    : toDateString(undefined);
  const latestEn = postsEn.length
    ? toDateString(postsEn.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())[0].data.date)
    : toDateString(undefined);

  interface PageEntry {
    path: string;
    lastmod: string;
  }

  const frPages: PageEntry[] = [
    { path: '', lastmod: latestFr },
    { path: 'blog/', lastmod: latestFr },
    ...postsFr.map((p) => ({ path: `blog/${p.slug}/`, lastmod: frDateMap.get(`blog/${p.slug}/`)! })),
    ...categoriesFr.map((c) => ({ path: `categorie/${normalize(c)}/`, lastmod: latestFr })),
  ];

  const enPages: PageEntry[] = [
    { path: 'en/', lastmod: latestEn },
    { path: 'en/blog/', lastmod: latestEn },
    ...postsEn.map((p) => ({ path: `en/blog/${p.slug}/`, lastmod: enDateMap.get(`en/blog/${p.slug}/`)! })),
    ...categoriesEn.map((c) => ({ path: `en/category/${normalize(c)}/`, lastmod: latestEn })),
  ];

  const allPages = [...frPages, ...enPages];

  const entries = allPages.map(({ path, lastmod }) => {
    const fullPath = `/${path}`;
    const alternate = getAlternatePath(fullPath);
    const isFr = !path.startsWith('en/');
    const hrefFr = isFr ? `${siteUrl}${fullPath}` : `${siteUrl}${alternate}`;
    const hrefEn = isFr ? `${siteUrl}${alternate}` : `${siteUrl}${fullPath}`;

    return `  <url>
    <loc>${siteUrl}/${path}</loc>
    <lastmod>${lastmod}</lastmod>
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
