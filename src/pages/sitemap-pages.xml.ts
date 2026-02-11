import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

function toISO(val: Date | string | undefined): string {
  if (!val) return new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00');
  const d = val instanceof Date ? val : new Date(val);
  if (isNaN(d.getTime())) return new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00');
  return d.toISOString().replace(/\.\d{3}Z$/, '+00:00');
}

const normalize = (s: string) =>
  s.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = (site?.href ?? 'https://ai.datashake.fr/').replace(/\/$/, '');

  const postsFr = await getCollection('blog', ({ data }) => !data.draft);
  const postsEn = await getCollection('blog-en', ({ data }) => !data.draft);

  const categoriesFr = [...new Set(postsFr.map((p) => p.data.category))];
  const categoriesEn = [...new Set(postsEn.map((p) => p.data.category))];

  const latestFr = postsFr.length
    ? toISO(postsFr.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())[0].data.date)
    : toISO(undefined);
  const latestEn = postsEn.length
    ? toISO(postsEn.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())[0].data.date)
    : toISO(undefined);

  const entries = [
    { loc: `${siteUrl}/`, lastmod: latestFr },
    { loc: `${siteUrl}/blog/`, lastmod: latestFr },
    ...categoriesFr.map((c) => ({ loc: `${siteUrl}/categorie/${normalize(c)}/`, lastmod: latestFr })),
    { loc: `${siteUrl}/en/`, lastmod: latestEn },
    { loc: `${siteUrl}/en/blog/`, lastmod: latestEn },
    ...categoriesEn.map((c) => ({ loc: `${siteUrl}/en/category/${normalize(c)}/`, lastmod: latestEn })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
