# 🏔 Qimma — Identité de marque

> Dernière mise à jour : 14/07/2026.

## Le nom : Qimma — قِمّة

**Qimma** (قِمّة) signifie **« le sommet »** en arabe.

Pourquoi c'est le bon nom :
- **Le sens porte la promesse** : atteindre son sommet — la mention au bac, l'admission au CNC.
  Le nom parle aux élèves ET aux parents, en arabe comme en français.
- **Ancrage marocain** : le sommet évoque l'Atlas et le Toubkal (plus haut sommet d'Afrique du
  Nord) — une métaphore locale, pas un anglicisme générique.
- **Court et prononçable dans les deux langues** : 5 lettres, « kim-ma » en français,
  قمة en arabe. Fonctionne à l'oral (bouche-à-oreille, TikTok/YouTube).
- **Extensible** : ne contient ni « bac » ni « cours » — le nom survivra à l'élargissement
  (CPGE, concours, médecine…). Slogan naturel : *« Atteins ton sommet »* / *« إلى القمة »*.

### Unicité vérifiée (14/07/2026)

- Aucun acteur edtech marocain nommé Qimma (recherche web).
- **qimma.ma : LIBRE** (domaine principal visé) ; qimma.education, qimma.academy,
  getqimma.com : libres. qimma.com est pris (site sans rapport, hors Maroc).
- ⚠️ À faire rapidement : **réserver qimma.ma** (registrars .ma : Genious, MarocHost, OVH…)
  et déposer la marque à l'**OMPIC** (classe 41 — éducation).

### Noms rejetés

| Nom | Raison |
|---|---|
| Taalim | taalim.ma existe déjà (portail lié au ministère) — générique et pris |
| Tafawoq | [tafawoq.ma](https://tafawoq.ma) : plateforme marocaine de quiz concours déjà active |
| Awj (أوج) | awj.ma pris ; ambigu à l'écrit latin |
| Tamayouz | générique (nombreux instituts « Tamayouz ») |
| BacPlus, PrepBac… | descriptifs, enferment dans le bac, déjà occupés |

## Le logo : le « Q-sommet »

Un **Q** dont l'anneau contient un **pic de montagne** sous un **soleil levant ambre**.
La queue du Q part vers le bas à droite comme un chemin qui monte au sommet.
Une seule forme, trois lectures : la lettre Q, le sommet (qimma), le lever de soleil (réussite).

Fichiers :
- `components/logo.tsx` — composant React (header, footer)
- `app/icon.svg` — favicon (généré automatiquement par Next.js)
- `public/logo-icon.svg` — icône autonome (réseaux sociaux, presse)

## Couleurs

| Rôle | Couleur | Hex |
|---|---|---|
| Primaire | Teal profond (cèdre de l'Atlas) | `#0f766e` (gamme 50→950 dans `globals.css`) |
| Fond héro | Teal nuit | `#134e4a` → `#042f2e` |
| Accent | Ambre (soleil du sommet) | `#f59e0b` / `#fbbf24` |
| Neutres | Slate | `#0f172a` → `#f8fafc` |

## Typographie

- **Latin :** Inter (via `next/font`)
- **Arabe :** IBM Plex Sans Arabic (via `next/font`)
- Wordmark : « Qimma » en Inter Bold / « قِمّة » en IBM Plex Sans Arabic Bold.
