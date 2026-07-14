# 🏗️ Qimma — Architecture Technique

> Document de référence (Étape 2). Toute décision structurante du projet est consignée ici.
> Dernière mise à jour : 13/07/2026

## 1. Vue d'ensemble

Qimma est un **monolithe modulaire** construit sur Next.js 15 (App Router), déployé sur Vercel.
Un monolithe bien découpé est le meilleur choix pour une startup : une seule base de code, un seul
déploiement, une vélocité maximale — tout en gardant des frontières de modules nettes qui
permettront d'extraire des services plus tard si la croissance l'exige.

```
┌────────────────────────────────────────────────────────────┐
│                         VERCEL                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Next.js 15 (App Router)                 │  │
│  │                                                      │  │
│  │  Présentation   app/[locale]/…  (Server Components)  │  │
│  │  Application    features/*/actions.ts (Server Actions)│ │
│  │  Domaine        features/*/schemas.ts (Zod) + logique │ │
│  │  Infrastructure lib/ (prisma, auth, ai, payments, …) │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────┬──────────────┬──────────────┬───────────────────┘
          │              │              │
     ┌────▼────┐    ┌────▼─────┐   ┌────▼──────┐
     │  Neon   │    │UploadThing│   │ IA (LLM)  │
     │Postgres │    │  (PDFs)  │   │ streaming │
     └─────────┘    └──────────┘   └───────────┘
```

## 2. Les quatre couches (Clean Architecture adaptée à Next.js)

| Couche | Où | Règle |
|---|---|---|
| **Présentation** | `app/[locale]/…`, `components/` | Server Components par défaut ; `"use client"` uniquement si interactivité (formulaires, chat, quiz) |
| **Application** | `features/*/actions.ts`, `features/*/queries.ts` | Server Actions pour les écritures, fonctions de lecture pour les Server Components ; c'est la SEULE porte d'entrée vers les données |
| **Domaine** | `features/*/schemas.ts`, `features/*/logic.ts` | Schémas Zod (source de vérité de la validation), règles métier pures, testables sans base de données |
| **Infrastructure** | `lib/` | Prisma, Auth.js, provider IA, provider paiement, stockage — chaque service externe derrière une interface |

**Règle de dépendance :** Présentation → Application → Domaine ← Infrastructure.
Un composant n'importe JAMAIS Prisma directement ; il passe par les queries/actions de sa feature.

## 3. Découpage en modules (features)

Chaque fonctionnalité vit dans `features/<nom>/` avec ses actions, queries, schémas, composants
et tests. Modules prévus :

- `auth` — inscription, connexion, sessions, rôles (ELEVE, ADMIN)
- `exams` — bibliothèque d'examens (national/régional/blanc), filtres, téléchargements
- `courses` — cours, résumés, leçons, vidéos
- `hints` — système d'indices progressifs (5 niveaux + correction)
- `tutor` — tuteur socratique IA (chat, quotas, historique)
- `progress` — suivi de progression, score d'autonomie, statistiques
- `gamification` — XP, badges, niveaux, streaks, défis, classement
- `billing` — abonnements, paiements (interface provider-agnostic)
- `blog` — articles, actualités, méthodologie
- `admin` — production de contenu et gestion (import en masse, éditeurs)
- `search` — recherche instantanée multi-contenus

## 4. Internationalisation (FR + AR + EN) — décision structurante

- **Bibliothèque :** `next-intl` (intégration App Router native, Server Components compatibles).
- **Routage par locale :** `/fr/…`, `/ar/…`, `/en/…` — chaque page existe en 3 langues
  (excellent pour le SEO : 3 pages indexables par contenu, balises `hreflang` automatiques).
- **RTL :** l'attribut `dir="rtl"` est posé sur `<html>` pour l'arabe ; Tailwind utilise
  exclusivement les **propriétés logiques** (`ms-*`/`me-*`, `ps-*`/`pe-*`, `start-*`/`end-*`)
  au lieu de left/right — le layout se retourne automatiquement.
- **Polices :** Inter (latin) + IBM Plex Sans Arabic (arabe), chargées via `next/font`.
- **Contenu vs interface :** l'interface est traduite via fichiers de messages
  (`messages/fr.json`, `ar.json`, `en.json`) ; le **contenu pédagogique** porte un champ
  `language` en base (un examen de SVT en arabe est une ressource arabe, pas une traduction).

## 5. Stratégie de rendu (performance + SEO)

| Type de page | Stratégie | Pourquoi |
|---|---|---|
| Accueil, tarifs, à propos, FAQ | **Statique (SSG)** | Contenu stable, temps de réponse minimal |
| Pages examens/cours (catalogue + détail) | **ISR** (revalidation à la demande) | Indexables par Google, régénérées quand l'admin publie |
| Blog | **ISR** | Idem |
| Dashboard élève, admin, tuteur | **Dynamique (SSR + streaming)** | Données personnelles, jamais indexées |
| Recherche, quiz, chat IA | Client + Server Actions | Interactivité temps réel |

SEO programmatique : une page ISR par combinaison *matière × filière × année × session × langue*,
avec métadonnées générées (`generateMetadata`), JSON-LD (`LearningResource`), sitemap dynamique.

## 6. Modèle de données — principes

(Schéma Prisma complet à l'Étape 4.) Principes directeurs :

- **Taxonomie centrale :** `Subject` (matière) × `Stream` (filière) × `Year` × `ExamType` ×
  `session` — tout contenu pédagogique s'y rattache. C'est l'épine dorsale du catalogue ET du SEO.
- **Exercice = unité pédagogique :** un examen contient des exercices ; chaque exercice porte
  ses indices (5 niveaux ordonnés), sa correction, ses quiz associés. C'est la granularité du
  suivi de progression et du tuteur.
- **Événements d'apprentissage :** chaque action (indice consommé, exercice terminé, message
  tuteur) est un événement horodaté → les statistiques, le score d'autonomie et les
  recommandations sont **calculés**, jamais stockés en dur.
- **Soft delete** sur le contenu (un examen retiré ne casse pas l'historique des élèves).

## 7. Intégration IA (tuteur socratique)

- **Interface provider-agnostic** (`lib/ai/`) : le reste du code ne connaît pas le fournisseur.
- **Streaming** des réponses (UX + coût perçu).
- **Garde-fous :** prompt système socratique versionné, quotas par plan (gratuit : N échanges/jour,
  premium : illimité raisonnable), limite de tokens par réponse, journalisation des conversations
  (`AIConversation`) pour mesurer la qualité pédagogique.
- Deux niveaux de modèle : modèle rapide/économique pour le tutorat courant, modèle avancé pour
  les explications détaillées premium.

## 8. Paiements (spécificité Maroc)

Stripe n'opère pas au Maroc. Décision : **interface `PaymentProvider`** dans `lib/payments/`
(create checkout, webhook de confirmation, annulation) avec une première implémentation
**YouCan Pay** (MAD, cartes locales). Le domaine `billing` ne dépend que de l'interface —
changer de prestataire = écrire un adaptateur.

## 9. Sécurité

- Auth.js v5 : sessions JWT, comptes credentials + Google OAuth.
- Autorisation **centralisée** : helpers `requireUser()` / `requireAdmin()` appelés en tête de
  chaque Server Action et page protégée (jamais de logique de rôle dispersée).
- Validation Zod **côté serveur systématique** (le client ne fait que du confort).
- Rate limiting sur les actions sensibles (auth, IA, téléchargements) via compteurs en base.
- En-têtes de sécurité (CSP, HSTS) dans `next.config.ts` ; secrets uniquement en variables
  d'environnement Vercel.

## 10. Performance

- Server Components par défaut → JavaScript client minimal.
- `next/image` partout, lazy loading natif, `next/font` (zéro layout shift).
- Cache à 3 niveaux : ISR (pages), `unstable_cache`/`revalidateTag` (données chaudes comme la
  taxonomie), cache HTTP CDN Vercel.
- Budget : Lighthouse ≥ 95 sur les pages publiques, LCP < 2 s sur mobile 3G (réalité des élèves).

## 11. Environnements & déploiement

| Env | Base | Déploiement |
|---|---|---|
| Développement | Neon (branche `dev`) | `npm run dev` local |
| Préproduction | Neon (branche `preview`) | Vercel Preview (chaque PR) |
| Production | Neon `main` | Vercel Production (push sur `main`) |

Neon permet de « brancher » la base comme du code — chaque environnement a sa copie isolée.

## 12. Qualité

- TypeScript strict, ESLint + Prettier.
- Tests : Vitest (logique de domaine — indices, quotas, autonomie), Playwright plus tard pour
  les parcours critiques (inscription, recherche examen, souscription).
- Conventions de commit : `feat:`, `fix:`, `docs:`, etc.
- CI GitHub Actions : lint + typecheck + tests sur chaque push (Étape 16).
