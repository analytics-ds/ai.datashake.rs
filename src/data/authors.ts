export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  url?: string;
  avatar?: string;
  sameAs?: string[];
}

export const authors: Record<string, Author> = {
  datashake: {
    id: 'datashake',
    name: 'Datashake',
    role: 'Agence Data & IA',
    bio: "Datashake est une agence spécialisée en data et intelligence artificielle, accompagnant les entreprises dans leur stratégie digitale et leur optimisation pour les moteurs de recherche et l'IA générative.",
    url: 'https://www.datashake.fr',
    sameAs: [
      'https://www.linkedin.com/company/datashake',
    ],
  },
};

export function getAuthor(id: string): Author {
  return authors[id] ?? authors.datashake;
}
