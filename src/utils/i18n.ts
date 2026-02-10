export type Lang = 'fr' | 'en';

export function getLang(url: URL): Lang {
  return url.pathname.startsWith('/en/') ? 'en' : 'fr';
}

export function getAlternatePath(pathname: string): string {
  if (pathname.startsWith('/en/')) {
    return pathname.replace(/^\/en/, '');
  }
  return `/en${pathname}`;
}

export function localizedUrl(path: string, lang: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return lang === 'en' ? `${base}/en${cleanPath}` : `${base}${cleanPath}`;
}

const translations = {
  fr: {
    home: 'Accueil',
    blog: 'Blog',
    readArticle: "Lire l'article",
    latestArticles: 'Derniers articles',
    categories: 'Catégories',
    exploreByTopic: 'Explorez nos articles par thématique.',
    all: 'Tout',
    article: 'article',
    articles: 'articles',
    publishedBy: 'Publié par',
    tags: 'Tags :',
    updatedOn: 'mis à jour le',
    heroLabel: 'Generative Engine Optimization',
    heroTitle1: 'Optimisez votre visibilité pour',
    heroTitle2: "l'IA générative",
    heroDescription:
      "Le SEO évolue. Les moteurs de recherche intègrent l'IA générative dans leurs réponses. Découvrez comment adapter votre stratégie de contenu pour rester visible dans ce nouvel écosystème.",
    exploreBlog: 'Explorer le blog',
    blogTitle: 'Blog',
    blogDescription: "Retrouvez tous nos articles sur le GEO, le SEO et l'IA générative.",
    blogMetaDescription:
      "Tous les articles sur le GEO (Generative Engine Optimization), l'optimisation pour l'IA générative, les données structurées et le SEO nouvelle génération.",
    footerTagline: 'Le blog francophone de référence sur le GEO — Generative Engine Optimization.',
    navigation: 'Navigation',
    allRightsReserved: 'Tous droits réservés.',
    categoryPrefix: 'categorie',
    categoryArticlesTitle: 'Articles',
    categoryMetaDesc: (cat: string) =>
      `Tous les articles de la catégorie ${cat} sur AI datashake. Guides, analyses et stratégies.`,
    homeTitle: 'AI datashake — Le blog GEO : Generative Engine Optimization',
    homeDescription:
      "Découvrez le GEO (Generative Engine Optimization) : comment optimiser votre contenu pour les moteurs de recherche et l'IA générative. Stratégies, guides et analyses.",
    filterByCategory: 'Filtrer par catégorie',
  },
  en: {
    home: 'Home',
    blog: 'Blog',
    readArticle: 'Read article',
    latestArticles: 'Latest articles',
    categories: 'Categories',
    exploreByTopic: 'Browse our articles by topic.',
    all: 'All',
    article: 'article',
    articles: 'articles',
    publishedBy: 'Published by',
    tags: 'Tags:',
    updatedOn: 'updated on',
    heroLabel: 'Generative Engine Optimization',
    heroTitle1: 'Optimize your visibility for',
    heroTitle2: 'generative AI',
    heroDescription:
      'SEO is evolving. Search engines are integrating generative AI into their answers. Learn how to adapt your content strategy to stay visible in this new ecosystem.',
    exploreBlog: 'Explore the blog',
    blogTitle: 'Blog',
    blogDescription: 'All our articles on GEO, SEO, and generative AI.',
    blogMetaDescription:
      'All articles on GEO (Generative Engine Optimization), generative AI optimization, structured data and next-generation SEO.',
    footerTagline: 'The reference blog on GEO — Generative Engine Optimization.',
    navigation: 'Navigation',
    allRightsReserved: 'All rights reserved.',
    categoryPrefix: 'category',
    categoryArticlesTitle: 'Articles',
    categoryMetaDesc: (cat: string) =>
      `All articles in the ${cat} category on AI datashake. Guides, analysis and strategies.`,
    homeTitle: 'AI datashake — The GEO Blog: Generative Engine Optimization',
    homeDescription:
      'Discover GEO (Generative Engine Optimization): how to optimize your content for search engines and generative AI. Strategies, guides and analysis.',
    filterByCategory: 'Filter by category',
  },
} as const;

type TranslationKey = keyof Omit<(typeof translations)['fr'], 'categoryMetaDesc'>;

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key] as string;
}

export function tCategoryMeta(lang: Lang, category: string): string {
  return translations[lang].categoryMetaDesc(category);
}

export function getDateLocale(lang: Lang): string {
  return lang === 'en' ? 'en-US' : 'fr-FR';
}

export function getCollectionName(lang: Lang): 'blog' | 'blog-en' {
  return lang === 'en' ? 'blog-en' : 'blog';
}
