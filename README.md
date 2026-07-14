# Qimma — قِمّة

Plateforme d'apprentissage pour les élèves marocains : **1ère & 2ème année Baccalauréat** et
**classes préparatoires (CPGE)**. Cours, résumés, exercices corrigés, anciens examens
(nationaux, régionaux, CNC) et examens blancs chronométrés — en français, arabe et anglais.

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — architecture technique (référence)
- [docs/ETUDE-MARCHE.md](docs/ETUDE-MARCHE.md) — étude de marché, différenciation, roadmap

## Stack

Next.js 15 (App Router) · TypeScript strict · Tailwind CSS v4 · next-intl (FR/AR/EN + RTL) ·
Neon Postgres + Prisma (à venir) · Auth.js v5 (à venir) · YouCan Pay (à venir) · Vercel.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000 → redirige vers /fr
```

`npm run build` pour la production, `npm run lint` pour le lint.

## Structure

```
app/[locale]/          Pages (Server Components) — fr, ar (RTL), en
components/            UI partagée (header, footer, sélecteur de langue)
features/              Modules métier (catalog, exams, …) — cf. ARCHITECTURE.md §3
i18n/ + messages/      Routage next-intl et traductions
```


Email : admin@qimma.ma
Mot de passe : klwltgdlyrfwr4pZXY0f