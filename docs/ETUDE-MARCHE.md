# 📊 Qimma — Étude de marché & proposition de valeur

> Complément de `ARCHITECTURE.md`. Dernière mise à jour : 14/07/2026.

## 1. Le marché

**Cible :** élèves de 1ère et 2ème année Baccalauréat (~1 M d'élèves au lycée qualifiant,
~450 000 candidats au bac national chaque année) + étudiants CPGE (~10 000, concours CNC).

Réalités du terrain :
- Accès majoritairement **mobile**, souvent en 3G/4G → performance mobile critique.
- Bilinguisme : matières scientifiques en **français**, humanités et une partie du contenu en
  **arabe** → le site doit être nativement FR + AR (RTL).
- Forte saisonnalité : pics de trafic aux contrôles continus (novembre, février), examens
  régionaux (juin, 1BAC) et nationaux (juin, 2BAC).
- Pouvoir d'achat limité → modèle **freemium** : le contenu brut gratuit (acquisition SEO),
  l'accompagnement intelligent payant.

## 2. Concurrents observés

| Acteur | Forces | Faiblesses exploitables |
|---|---|---|
| [AlloSchool](https://www.alloschool.com/) | Référence historique, couverture complète du programme officiel, très fort SEO | Design daté, publicité intrusive, aucune interactivité ni suivi de l'élève, PDFs en vrac |
| [Moutamadris](https://moutamadris.ma/) | Très fort en arabe, examens avec corrections tous niveaux, actualités scolaires | Portail d'actualités plus que plateforme d'apprentissage ; pas de parcours, pas de progression |
| 9alami / [9rayti](https://www.9rayti.com/) | Communauté, orientation (tawjih) | Contenu inégal, expérience chargée de pubs |
| [PrépaDigitale](https://www.prepadigitale.com/) | +1500 vidéos CPGE, positionnement premium | Cible uniquement CPGE, cher, pas de bac |
| [CpgeMaroc](https://cpgemaroc.com/) / [attalib](https://attalib.net/concours-national-commun-cnc-maroc/) | Annales CNC, infos concours | Sites vitrines, pas de plateforme d'apprentissage |

**Constat :** personne ne combine (a) bibliothèque complète bac + CPGE, (b) expérience moderne
sans pubs intrusives, (c) apprentissage actif (indices progressifs, quiz, tuteur IA),
(d) suivi de progression. C'est l'espace de Qimma.

## 3. Différenciation Qimma

1. **Apprentissage actif, pas de la consultation passive** : chaque exercice a des indices
   progressifs (5 niveaux) avant la correction — l'élève cherche avant de lire la solution.
2. **Tuteur socratique IA** (guide sans donner la réponse), quotas freemium.
3. **Suivi de progression & score d'autonomie** par matière/chapitre — l'élève sait où il en est.
4. **Examens blancs chronométrés** avec barème officiel et simulation des conditions réelles.
5. **Expérience** : rapide sur mobile 3G, trilingue FR/AR/EN avec RTL natif, zéro pub intrusive.
6. **Gamification** : XP, streaks, défis hebdomadaires, classements par filière.

## 4. Fonctionnalités à forte valeur ajoutée (backlog priorisé)

### MVP (lancement)
- Bibliothèque : cours, résumés, exercices corrigés, **anciens examens nationaux/régionaux**
  filtrables par niveau × filière × matière × année × session.
- Examens blancs téléchargeables + mode chronométré en ligne.
- **Espace concours & admissions** : annales et préparation des concours post-bac (UM6P, ENSA,
  ENSAM, TAFEM/ENCG, médecine, IAV), accès aux prépas et lycées d'excellence (Lydex, LM6E,
  CPGE publiques) et grandes écoles (CNC, ISCAE) — un trafic à très forte intention,
  peu couvert par les concurrents.
- Recherche instantanée. Comptes élèves, favoris, reprise de lecture.

### V1 (différenciation)
- Indices progressifs sur les exercices, quiz auto-corrigés par chapitre.
- Tableau de bord de progression, planning de révision généré (compte à rebours bac/CNC).
- Tuteur IA socratique (freemium).

### V2 (rétention & croissance)
- Gamification complète, défis entre amis, classements.
- Espace orientation (tawjih) : seuils des écoles, calendrier des concours, fiches métiers.
- Calculateur de moyenne / simulateur de note bac & seuils d'admission.
- Espace enseignants (partage de ressources, fiches pédagogiques) — canal d'acquisition.
- Mode hors-ligne (PWA) pour les zones à faible connectivité.

## 5. Modèle économique

- **Gratuit** : tout le contenu statique (cours, examens, corrections) — moteur SEO/acquisition.
- **Premium (~29–49 MAD/mois, paiement YouCan Pay en MAD)** : tuteur IA illimité, examens blancs
  chronométrés illimités, statistiques avancées, planning personnalisé, zéro pub.
- Levier B2B plus tard : licences établissements / professeurs.

## Sources

- [Moutamadris.ma](https://moutamadris.ma/) · [Examens Moutamadris](https://moutamadris.ma/examens/)
- [AlloSchool](https://www.alloschool.com/) · [Examens régionaux AlloSchool](https://www.alloschool.com/section/5857)
- [CPGE Maroc](https://cpgemaroc.com/) · [cpge.ac.ma (CNC officiel)](https://www.cpge.ac.ma/)
- [PrépaDigitale](https://www.prepadigitale.com/) · [9rayti CPGE](https://www.9rayti.com/groupe/cpge-maroc-cnc)
- [Maroc Tawjih — CPGE](https://maroc-tawjih.com/classes-preparatoires-prepas/) · [attalib — CNC 2026](https://attalib.net/concours-national-commun-cnc-maroc/)
