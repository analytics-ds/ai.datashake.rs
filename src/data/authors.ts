export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  url?: string;
  avatar?: string;
  sameAs?: string[];
  type: 'Person' | 'Organization';
  jobTitle?: string;
  knowsAbout?: string[];
  worksFor?: { name: string; url: string };
  foundingDate?: string;
  address?: { streetAddress: string; addressLocality: string; postalCode: string; addressCountry: string };
  numberOfEmployees?: string;
}

export const authors: Record<string, Author> = {
  datashake: {
    id: 'datashake',
    name: 'datashake',
    role: 'Agence Data & IA',
    bio: "datashake est une agence spécialisée en data et intelligence artificielle, accompagnant les entreprises dans leur stratégie digitale et leur optimisation pour les moteurs de recherche et l'IA générative.",
    url: 'https://www.datashake.fr',
    sameAs: [
      'https://www.linkedin.com/company/datashake',
    ],
    type: 'Organization',
    foundingDate: '2018',
    address: {
      streetAddress: '2 rue de Choiseul',
      addressLocality: 'Paris',
      postalCode: '75002',
      addressCountry: 'FR',
    },
    numberOfEmployees: '10-50',
    knowsAbout: ['SEO', 'GEO', 'Generative Engine Optimization', 'Data', 'Intelligence Artificielle', 'AI Overviews', 'Structured Data'],
  },
  'ruben-sebag': {
    id: 'ruben-sebag',
    name: 'Ruben Sebag',
    role: 'Co-founder of the SEO/GEO entity @datashake',
    bio: 'Co-fondateur de datashake. Expert en SEO, GEO (Generative Engine Optimization) et stratégies de visibilité pour les moteurs de recherche et l\'IA générative.',
    url: 'https://www.linkedin.com/in/ruben-sebag/',
    sameAs: [
      'https://www.linkedin.com/in/ruben-sebag/',
    ],
    type: 'Person',
    jobTitle: 'Co-fondateur & CEO',
    worksFor: { name: 'datashake', url: 'https://www.datashake.fr' },
    knowsAbout: ['SEO', 'GEO', 'Generative Engine Optimization', 'AI Overviews', 'E-E-A-T', 'Données structurées', 'Schema.org', 'Marketing digital'],
  },
};

export function getAuthor(id: string): Author {
  return authors[id] ?? authors.datashake;
}
