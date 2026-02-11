import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getAlternatePath } from '@/utils/i18n';

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

  interface PostEntry {
    path: string;
    lastmod: string;
  }

  const frEntries: PostEntry[] = postsFr
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map((p) => ({ path: `blog/${p.slug}/`, lastmod: toISO(p.data.date) }));

  const enEntries: PostEntry[] = postsEn
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map((p) => ({ path: `en/blog/${p.slug}/`, lastmod: toISO(p.data.date) }));

  const allEntries = [...frEntries, ...enEntries];

  const entries = allEntries.map(({ path, lastmod }) => {
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
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
