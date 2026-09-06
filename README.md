# ai.datashake.rs

Blog GEO (Generative Engine Optimization) propulsé par [Astro](https://astro.build/) et déployé via GitHub Pages.

## Stack technique

- **Astro 4** — Générateur de site statique, zéro JavaScript par défaut
- **Schema.org / JSON-LD** — Données structurées (Article, Author, BreadcrumbList)
- **GitHub Pages** — Hébergement et déploiement automatique via GitHub Actions

## Direction artistique

Le site suit la **DA datashake 2026** (référence : `datashake - design system.md` de la
charte). Les règles appliquées dans `src/styles/global.css` :

- **Fonds** : blanc `#FFFFFF`, beige `#F3EDE8`, noir `#101010`. Rien d'autre.
- **Accents** bleu `#77B0ED`, jaune `#FFFF7D`, kaki `#ADAC2F` : petites touches
  (tags, icônes, data-viz sur fond noir), **jamais un fond**.
- **Typo** : Inter Regular pour les paragraphes, Inter Medium pour les titres, en une
  seule graisse (Season Sans reste la cible de la DA, en standby licence).
- **Textes** en noir ou blanc uniquement, atténués par transparence (70 % / 55 %).
- **Logo** noir ou blanc exclusivement (`logo-datashake-full.svg` /
  `logo-datashake-white.svg`), jamais coloré ni déformé.
- **Tokens de forme** : rayon carte 16, rayon moyen 12, tag pilule, bordure de carte
  `#E0E0E0`, filets noir 30 % (blanc 30 % sur fond noir).
- **Interdits** : dégradés, ombres marquées, plus d'une graisse de titre, jaune vif
  `#FFFF00`.

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
