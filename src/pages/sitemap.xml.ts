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

  const allPosts = [...postsFr, ...postsEn];
  const latestPost = allPosts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())[0];
  const postsLastmod = toISO(latestPost?.data.date);
  const pagesLastmod = postsLastmod;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-index.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap-posts.xml</loc>
    <lastmod>${postsLastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-pages.xml</loc>
    <lastmod>${pagesLastmod}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
