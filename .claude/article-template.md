# Template d'article - AI datashake

Copier la structure ci-dessous dans `src/content/blog/{slug}.md`.

---

```markdown
---
title: "[Mot-cle principal integre naturellement en H1]"
description: "[Meta description SEO, 140 car. max, contient le mot-cle]"
date: "YYYY-MM-DD"
author: "[auteur]"
category: "[categorie]"
tags: ["tag1", "tag2", "tag3"]
draft: false
---

> **En bref :** [Resume en 2-3 phrases avec les informations cles de l'article. Inclure un chiffre ou une statistique marquante si possible.]

*Temps de lecture : X minutes*

## Sommaire

- [Titre H2 1](#titre-h2-1)
- [Titre H2 2](#titre-h2-2)
- [Titre H2 3](#titre-h2-3)
- [Titre H2 4](#titre-h2-4)
- [Titre H2 5](#titre-h2-5)

## Titre H2 1 {#titre-h2-1}

Paragraphe d'introduction de la section. Integrer le **mot-cle principal** naturellement. Fournir du contexte et des **donnees chiffrees** pertinentes.

### Titre H3 1.1

Contenu detaille. Utiliser des phrases impersonnelles. Mettre les **termes importants** en gras.

- Element de liste 1
- Element de liste 2
- Element de liste 3

### Titre H3 1.2

Contenu complementaire de la section.

## Titre H2 2 {#titre-h2-2}

Paragraphe d'introduction. Penser a inserer un lien interne naturel vers un [article connexe du blog](/ai.datashake.rs/blog/slug-article/).

### Titre H3 2.1

Contenu. Integrer un tableau si pertinent :

| Critere | Option A | Option B | Option C |
|---------|----------|----------|----------|
| Critere 1 | Valeur | Valeur | Valeur |
| Critere 2 | Valeur | Valeur | Valeur |
| Critere 3 | Valeur | Valeur | Valeur |

## Titre H2 3 {#titre-h2-3}

Paragraphe avec **mots-cles secondaires** integres naturellement.

### Titre H3 3.1

> "Citation pertinente d'un expert ou statistique sourcee qui appuie le propos de la section."
> — Source

Analyse ou commentaire de la citation.

### Titre H3 3.2

- Point cle 1 avec **mot-cle** en gras
- Point cle 2 avec donnee chiffree
- Point cle 3

## Titre H2 4 {#titre-h2-4}

Contenu de la section.

### Titre H3 4.1

Developper le sujet.

### Titre H3 4.2

Contenu complementaire avec lien interne vers un [autre article pertinent](/ai.datashake.rs/blog/slug-article/).

## Titre H2 5 {#titre-h2-5}

Section de synthese ou dernier axe du sujet.

### Titre H3 5.1

Derniers elements. Tableau comparatif ou liste si pertinent.

| Element | Detail |
|---------|--------|
| A | Description |
| B | Description |
| C | Description |

### Titre H3 5.2

Paragraphe de cloture de la section.
```

---

## Notes

- Le H1 est genere automatiquement par Astro via le champ `title` du frontmatter. Ne jamais ecrire de `#` dans le corps.
- Les ancres `{#ancre}` permettent au sommaire de fonctionner.
- Adapter le nombre de H2/H3 selon le sujet (minimum 5 H2, 1 H3 par H2).
- La FAQ est optionnelle. Si ajoutee, utiliser le format :

```markdown
## Questions frequentes {#faq}

### Question 1 ?

Reponse.

### Question 2 ?

Reponse.
```

- Pour les articles commerciaux, ajouter une section de comparaison avec tableau.
