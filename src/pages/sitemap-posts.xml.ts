import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

function toISO(val: Date | string | undefined): string {
  if (!val) return new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00');
  const d = val instanceof Date ? val : new Date(val);
  if (isNaN(d.getTime())) return new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00');
  return d.toISOString().replace(/\.\d{3}Z$/, '+00:00');
}

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = (site?.href ?? 'https://ai.datashake.fr/').replace(/\/$/, '');

  const postsFr = await getCollection('blog', ({ data }) => !data.draft);
  const postsEn = await getCollection('blog-en', ({ data }) => !data.draft);

  const frEntries = postsFr
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map((p) => ({ loc: `${siteUrl}/blog/${p.slug}/`, lastmod: toISO(p.data.date) }));

  const enEntries = postsEn
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map((p) => ({ loc: `${siteUrl}/en/blog/${p.slug}/`, lastmod: toISO(p.data.date) }));

  const allEntries = [...frEntries, ...enEntries];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries.map((e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
