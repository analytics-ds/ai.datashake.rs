export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  url?: string;
  avatar?: string;
  sameAs?: string[];
  type: 'Person' | 'Organization';
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
  },
  'ruben-sebag': {
    id: 'ruben-sebag',
    name: 'Ruben Sebag',
    role: 'Co-founder & Director of SEO/GEO @datashake',
    bio: 'Expert en SEO / GEO.',
    url: 'https://www.linkedin.com/in/ruben-sebag/',
    sameAs: [
      'https://www.linkedin.com/in/ruben-sebag/',
    ],
    type: 'Person',
  },
};

export function getAuthor(id: string): Author {
  return authors[id] ?? authors.datashake;
}
