<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>XML Sitemap</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <style type="text/css">
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif; color: #444; }
    #sitemap { max-width: 980px; margin: 0 auto; }
    #sitemap__header { background: #1e3a5f; color: #fff; padding: 30px 40px; }
    #sitemap__header h1 { font-size: 24px; font-weight: 600; margin: 0; }
    #sitemap__header p { font-size: 14px; margin: 8px 0 0; opacity: .8; }
    #sitemap__header a { color: #8bb8e8; }
    #sitemap__content { padding: 20px 40px; }
    .count { font-size: 13px; color: #777; margin-bottom: 16px; }
    table { border-collapse: collapse; width: 100%; }
    th { text-align: left; padding: 12px 8px; font-size: 12px; text-transform: uppercase; color: #777; border-bottom: 2px solid #eee; }
    td { padding: 10px 8px; border-bottom: 1px solid #eee; font-size: 14px; }
    td a { color: #1e3a5f; text-decoration: none; }
    td a:hover { text-decoration: underline; }
    tr:hover td { background: #f9f9f9; }
    .hreflang { font-size: 11px; color: #999; }
    #sitemap__footer { padding: 20px 40px; font-size: 12px; color: #999; }
  </style>
</head>
<body>
<div id="sitemap">
  <div id="sitemap__header">
    <h1>XML Sitemap</h1>
    <p><a href="/sitemap_index.xml">&#8592; Sitemap Index</a></p>
  </div>
  <div id="sitemap__content">
    <p class="count">Number of URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></p>
    <table>
      <thead>
        <tr>
          <th>URL</th>
          <th>Last Modified</th>
          <th>Hreflang</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="sitemap:urlset/sitemap:url">
          <tr>
            <td><a><xsl:attribute name="href"><xsl:value-of select="sitemap:loc"/></xsl:attribute><xsl:value-of select="sitemap:loc"/></a></td>
            <td><xsl:value-of select="sitemap:lastmod"/></td>
            <td class="hreflang">
              <xsl:for-each select="xhtml:link">
                <xsl:value-of select="@hreflang"/>
                <xsl:if test="position() != last()"> · </xsl:if>
              </xsl:for-each>
            </td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </div>
  <div id="sitemap__footer">
    <p>AI datashake — ai.datashake.fr</p>
  </div>
</div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
