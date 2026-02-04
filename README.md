# ai.datashake.rs

Blog GEO (Generative Engine Optimization) propulsé par [Astro](https://astro.build/) et déployé via GitHub Pages.

## Stack technique

- **Astro 4** — Générateur de site statique, zéro JavaScript par défaut
- **Schema.org / JSON-LD** — Données structurées (Article, Author, BreadcrumbList)
- **GitHub Pages** — Hébergement et déploiement automatique via GitHub Actions

## Commandes

```bash
npm install          # Installer les dépendances
npm run dev          # Serveur de développement (localhost:4321)
npm run build        # Build de production → dist/
npm run preview      # Prévisualiser le build
```

## Structure du projet

```
src/
├── content/blog/    # Articles en Markdown
├── components/      # Composants Astro (Header, Footer, SEO, etc.)
├── layouts/         # Layouts (Base, Article)
├── pages/           # Pages et routes
├── styles/          # CSS global et design system
└── data/            # Données auteurs
```

## Ajouter un article

Créer un fichier `.md` dans `src/content/blog/` avec le frontmatter suivant :

```yaml
---
title: "Titre de l'article"
description: "Description pour le SEO"
date: 2025-01-15
author: datashake
category: GEO
tags: [GEO, SEO, IA]
---
```

## Domaine personnalisé

Pour connecter un domaine GoDaddy :
1. Ajouter un fichier `CNAME` dans `public/` avec le nom de domaine
2. Configurer un enregistrement CNAME chez GoDaddy pointant vers `<username>.github.io`
3. Activer le custom domain dans Settings > Pages du repo GitHub
