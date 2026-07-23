# Suivi d'avancement — Cours Qimma

> Statuts : ✅ fait (compilé sans erreur) · 🔨 en cours · ⬜ à faire · 🔍 à vérifier (contenu à valider contre le cadre référentiel)

Dernière mise à jour : 2026-07-19

## 2 Bac — Sciences Mathématiques — Mathématiques (`cours/bac2/sciences-maths/mathematiques/`)

| # | Chapitre | Fichier | Statut |
|---|----------|---------|--------|
| 01 | Limites et continuité | `01-limites-et-continuite.tex` | ✅ **(standard exhaustif — chapitre étalon)** |
| 02 | Dérivation et étude des fonctions | `02-derivation-et-etude-des-fonctions.tex` | ✅ standard exhaustif |
| 03 | Suites numériques | `03-suites-numeriques.tex` | ✅ standard exhaustif |
| 04 | Fonction logarithme népérien | `04-fonction-logarithme-neperien.tex` | ✅ standard exhaustif |
| 05 | Fonction exponentielle | `05-fonction-exponentielle.tex` | ✅ standard exhaustif |
| 06 | Fonctions primitives | `06-fonctions-primitives.tex` | ✅ standard exhaustif |
| 07 | Calcul intégral | `07-calcul-integral.tex` | ✅ standard exhaustif |
| 08 | Équations différentielles | `08-equations-differentielles.tex` | ✅ standard exhaustif |
| 09 | Nombres complexes 1 (forme algébrique) | `09-nombres-complexes-1.tex` | ✅ standard exhaustif |
| 10 | Nombres complexes 2 (trigonométrique, géométrie) | `10-nombres-complexes-2.tex` | ✅ standard exhaustif |
| 11 | Arithmétique dans Z | `11-arithmetique-dans-z.tex` | ✅ standard exhaustif |
| 12 | Structures algébriques | `12-structures-algebriques.tex` | ✅ standard exhaustif |
| 13 | Espaces vectoriels | `13-espaces-vectoriels.tex` | ✅ standard exhaustif |
| 14 | Produit scalaire et produit vectoriel dans l'espace | `14-produit-scalaire-vectoriel-espace.tex` | ✅ standard exhaustif |
| 15 | Géométrie analytique de l'espace (droites, plans, sphère) | `15-geometrie-analytique-espace.tex` | ✅ standard exhaustif |
| 16 | Dénombrement | `16-denombrement.tex` | ✅ standard exhaustif |
| 17 | Calcul des probabilités | `17-probabilites.tex` | ✅ standard exhaustif |

**Les 17 chapitres de 2 Bac Sciences Mathématiques -- Mathématiques sont terminés (17/17).**

## 2 Bac — PC — Mathématiques (`cours/bac2/sciences-pc/mathematiques/`)
⬜ Tout à faire (11 chapitres — beaucoup adaptables depuis SM en allégeant).

## 2 Bac — PC — Physique-Chimie (`cours/bac2/sciences-pc/physique-chimie/`)
⬜ Tout à faire (~28 chapitres, voir plan/index.md §1.1.3).

## 2 Bac — SVT (maths, PC, SVT)
⬜ Tout à faire.

## 2 Bac — autres filières (éco, lettres, techno, arts)
🔍 En attente de validation des intitulés (voir plan/index.md) + décision langue pour les matières en arabe.

## 1 Bac
⬜ Après le 2 Bac (ordre demandé par le client).

## CPGE
⬜ En dernier (ordre demandé par le client). Programmes à croiser avec les référentiels CNC.

---

## Standard « exhaustif » (validé par le client le 2026-07-19)

Tous les cours doivent suivre le standard du chapitre étalon `01-limites-et-continuite.tex` (~17 pages) :
1. définitions **formelles** (quantificateurs, ε/α) en plus de la formulation intuitive ;
2. **démonstrations** des propriétés clés (environnement `demo`, admis signalés explicitement) ;
3. **exhaustivité des cas d'examen** : chaque type de question qui peut tomber a sa méthode ET son exemple résolu (ex. limites : rationnelles en ∞ (3 cas), 0/0 factorisation, conjugué carré ET cubique, trigonométriques, changement de variable, partie entière, piège du signe en −∞…) ;
4. notions du programme non éludées (partie entière, prolongement par continuité, suites-continuité, dichotomie avec précision, variantes du TVI, inéquations avec ⁿ√…) ;
5. section finale **« Exercices corrigés -- niveau examen national »** : 6-8 exercices couvrant tous les types, corrigés entièrement rédigés ;
6. section **« Méthodes et pièges : la boîte à outils de l'examen »** : tableau « ce qu'on te demande / ton réflexe » + liste des erreurs sanctionnées par les correcteurs ;
7. pas de tiret long « — » dans le texte (police T1 : utiliser `--`).

✅ Chapitres 01 à 08 (bloc **Analyse**) : tous réécrits/mis à niveau au standard exhaustif, tous compilés sans erreur.

## Vérification contre le DOCUMENT OFFICIEL fourni par le client (2026-07-22)

Le client a fourni le PDF officiel : **« الأطر المرجعية المكيفة للامتحان الوطني الموحد لنيل شهادة البكالوريا -- 2024 -- مادة الرياضيات -- شعبة العلوم الرياضية »** (Cadre référentiel adapté, filières SM A et B, Centre National des Examens, note ministérielle n°099X24 du 19/02/2024). C'est la source la plus fiable obtenue jusqu'ici (document scanné officiel, pas une page tierce). Comparaison exhaustive item par item contre les 17 chapitres produits.

**3 vrais manques trouvés et corrigés** :
1. **Cocyclicité de quatre points** via les nombres complexes (item 2.2.2 du référentiel) -- absente du ch. 10. Ajout du critère du birapport $\frac{(a-c)(b-d)}{(a-d)(b-c)}\in\mathbb{R}$, avec justification (angle inscrit) et exemple résolu.
2. **Suites définies par une intégrale** $u_n=\int_a^bf_n(t)\,dt$, étudiées par encadrement (item 6.4.1) -- distinct des « fonctions définies par une intégrale » et des « sommes de Riemann » déjà présents. Ajouté au ch. 07 avec exemple type ($u_n=\int_0^1\frac{x^n}{1+x}dx\to0$).
3. **La structure $(\mathbb{Z}/n\mathbb{Z},+,\times)$** comme exemple explicite d'anneau (et de corps ssi $n$ premier) -- item 4.1.2 du référentiel la mentionne nommément, absente du ch. 12 (je n'avais que les congruences en ch. 11, jamais reliées formellement à la structure d'anneau/corps). Ajoutée avec démonstration complète (via Bézout pour l'inversibilité) et exemples $\mathbb{Z}/5\mathbb{Z}$ / $\mathbb{Z}/6\mathbb{Z}$.

**4 écarts constatés entre mon contenu et ce document officiel** -- signalés en toute transparence (le client a autorisé le contenu « en plus », donc rien n'a été supprimé, mais ceci mérite d'être su) :
- **Équations différentielles (ch. 08)** : n'apparaît \textbf{nulle part} dans le référentiel officiel 2024 (section Analyse / Dérivation, items 1.3.1 à 16.3.1) -- alors que ce chapitre existait dans les anciens programmes marocains et reste enseigné dans des pays voisins. Soit une réforme récente l'a retiré du programme SM, soit il a été déplacé. Le chapitre reste dans le dépôt car il ne nuit pas, mais il n'est \textbf{a priori plus exigible} à l'examen 2024+ selon ce document.
- **Systèmes de numération (bases)** ajoutés au ch. 11 lors du lot précédent (sur la base d'une source tierce non officielle) : \textbf{absents} du référentiel officiel 2024 (section Arithmétique, items 1.1.2 à 6.1.2). Vraisemblablement une confusion avec un programme antérieur ou un autre pays. Conservé dans le dépôt (extra, sans nuire), mais à ne pas présenter comme « exigible ».
- **Espace vectoriel comme structure nommée** : le référentiel officiel (item 2.4.2) liste explicitement seulement « la zumra (groupe), la halqa (anneau), le haql (corps) » -- \textbf{pas} l'espace vectoriel -- dans la section Structures algébriques. Le ch. 13 « Espaces vectoriels » que j'ai produit comme chapitre séparé n'est donc pas explicitement couvert par ce document 2024 (à la différence de ce que suggérait ma recherche web précédente). Conservé (contenu mathématiquement correct et probablement utile), mais sa place exacte dans le programme actuel reste incertaine.
- **Variables aléatoires / loi binomiale / fonction de répartition (gros du ch. 17)** : le référentiel officiel liste seulement 4 items pour les probabilités (modèle combinatoire, $P(A\cup B)$/$P(\bar A)$/$P(A\cap B)$, probabilité conditionnelle, indépendance -- items 1.3.2 à 4.3.2) -- \textbf{sans mention} de variable aléatoire, loi de probabilité, espérance/variance, loi binomiale ou fonction de répartition. Le ch. 17 va donc largement au-delà de ce que ce document liste pour 2024. Conservé (correct et pédagogiquement solide), mais probablement hors du périmètre strictement exigible actuel.

**Confirmé conforme** (parmi de nombreux points) : suites adjacentes (item 2.1.1, « مفهوم المتتاليتين المتجاورتين »), sommes de Riemann sous leurs deux formes $u_n$/$v_n$ exactes (item 5.4.1), fonctions composées $x\mapsto\int_a^{u(x)}f(t)dt$ (item 4.4.1), transformations usuelles translation/rotation/homothétie (item 8.2.2), transfert de structure par morphisme (item 5.4.2), propriété caractéristique du sous-groupe (item 6.4.2), petit théorème de Fermat aux côtés de Bézout/Gauss (item 5.1.2), et l'ensemble du bloc Analyse (suites, limites/continuité/TVI/dichotomie/réciproque, dérivation/Rolle/TAF, ln/exp, calcul intégral) et du bloc Arithmétique/Complexes.

**Pondération officielle confirmée** (tableau de spécification, p.8) : Analyse 50 % ; au sein d'Algèbre-Géométrie (50 %) : Complexes+Structures algébriques 35 %, Arithmétique+Probabilités 15 %.

Tous les chapitres modifiés recompilent sans erreur ; polycopié complet régénéré (1,74 Mo).

**Recommandation** : les 4 écarts ci-dessus méritent une décision du client -- retirer ce contenu « en trop » pour coller strictement au référentiel 2024, ou le garder comme approfondissement (utile pour les meilleurs élèves ou en cas de programme différent d'une année à l'autre) ? Je n'ai rien supprimé par précaution, en attendant instruction.

## Vérification externe contre le cadre référentiel officiel (2026-07-20)

Sur demande du client (« vérifie si ça respecte le cadre référentiel et le niveau SM »), recherche web pour croiser le contenu produit avec des sources décrivant le cadre référentiel officiel du Centre National des Examens (men.gov.ma / sources relayant son contenu : alloschool.com, pdfmath.com, chtoukaphysique.com, nawafid.ma). Je n'ai pas pu extraire le texte intégral du PDF officiel scanné (échec d'extraction), mais j'ai pu obtenir une liste détaillée et crédible des objectifs d'apprentissage par chapitre via une page qui les cite explicitement.

**Confirmé conforme** :
- Répartition 50 % Analyse / 50 % Algèbre-Géométrie, avec probabilités incluses dans ce second bloc.
- Arithmétique et Structures algébriques bien "exclusives SM" (absentes des programmes PC/SVT) — cohérent avec mon plan.
- Présence attendue de : suites, limites/continuité (TVI, dichotomie, fonction réciproque), dérivation (Rolle, TAF), ln/exp, équations différentielles ($y'=ay+b$ et $y''+ay'+by=0$), calcul intégral, nombres complexes (3 écritures), PGCD/Bézout/Gauss, structures (groupe/anneau/corps/espace vectoriel), dénombrement, probabilités (dont loi binomiale) — tout ceci était déjà couvert.
- **Espaces vectoriels comme chapitre à part entière** : confirmé légitime (j'avais un doute, levé).
- **Sommes de Riemann** : confirmé comme thème explicite -- je venais justement de l'ajouter (lot précédent), bon timing.

**4 manques réels détectés et corrigés dans ce lot** (la liste des objectifs mentionnait des points absents de mes chapitres) :
1. **Systèmes de numération** (écriture d'un entier dans une base $b$, conversions, opérations en base $b$) -- totalement absent du ch. 11 Arithmétique. Ajouté (nouvelle section 3, exercice dédié).
2. **Petit théorème de Fermat** ($a^{p-1}\equiv1\,[p]$) -- mentionné explicitement dans le référentiel aux côtés de Bézout/Gauss, absent de mon ch. 11. Ajouté (propriété + exemple + exercice).
3. **Fonction de répartition** d'une variable aléatoire -- objectif explicite du référentiel, absent de mon ch. 17. Ajouté (définition, propriétés, exemple avec courbe en escalier).
4. **Fonctions définies par une intégrale**, y compris le **cas composé** $x\mapsto\int_a^{u(x)}f(t)\,dt$ -- cité explicitement comme objectif ("études de fonctions composées de la forme x → ∫a^u(x) f(t)dt"), je n'avais qu'un exercice isolé dans mon ch. 07. Ajouté comme section à part entière avec théorème, démonstration et cas composé démontré via dérivée de composée.

**1 point renforcé par cohérence** (pas cité explicitement mais découlant de « expressions complexes des transformations usuelles ») :
5. **Translation, homothétie, rotation** nommées explicitement avec leur expression complexe, avant la similitude directe générale (ch. 10) -- je n'avais que la formule générale $z'=az+b$ sans les cas particuliers nommés.

Tous les fichiers modifiés recompilent sans erreur ; le polycopié complet a été régénéré (1,72 Mo).

**Limites de cette vérification** : je n'ai pas pu lire le PDF officiel scanné mot à mot (échec technique d'extraction) ; la vérification s'appuie sur une page tierce qui cite les objectifs, elle-même vraisemblablement basée sur le document officiel mais non vérifiée à 100 % au caractère près. Recommandation : si tu as accès au PDF officiel (ou à un manuel scolaire agréé), une relecture croisée chapitre par chapitre resterait la vérification la plus fiable.

## Journal des lots

- **2026-07-20 — Lot 5 (audit de complétude)** : suite à un retour du client (« il manque les suites adjacentes »), audit systématique des 17 chapitres contre le programme officiel marocain SM pour repérer d'autres notions manquantes. Trois ajouts confirmés et intégrés :
  - **Ch. 03 (Suites)** : ajout du **principe de récurrence** (énoncé formel explicite) et d'une nouvelle section **« Suites adjacentes »** complète (définition, théorème + démonstration, lien avec la dichotomie du ch. 01, exemple classique $\sum 1/k^2$). L'exercice 4 (suites couplées), qui faisait déjà une allusion non justifiée aux « suites adjacentes », a été réécrit pour appliquer correctement le théorème et calculer la limite exacte via une combinaison linéaire invariante.
  - **Ch. 07 (Calcul intégral)** : ajout d'une section **« Sommes de Riemann »** (limite de $\frac1n\sum f(k/n)$ vers $\int_0^1 f$), classique du bac SM, avec deux exemples résolus.
  - **Ch. 12 (Structures algébriques)** : ajout d'une section **« Morphismes de groupes »** (définition, propriétés $f(e)=e'$/$f(x^{-1})=f(x)^{-1}$, noyau/image, caractérisation de l'injectivité par $\ker f$), avec deux exemples et un exercice corrigé.
  - **Ch. 15 (Géométrie analytique de l'espace)** : ajout d'une sous-section **« Angles entre droites et plans »** (formules cosinus/sinus via produit scalaire).
  - Tous les chapitres modifiés recompilent sans erreur ; tableaux méthodes/pièges/résumé et objectifs mis à jour en conséquence dans chaque fichier concerné.
  - **Chapitres audités sans modification** (jugés déjà complets pour le niveau bac SM, avec un point d'incertitude à noter) : 01, 02, 04, 05, 06, 08, 09, 10, 11, 13, 14, 16, 17. Points restés incertains, à confirmer si besoin : sous-suites/limites partielles ($u_{2n}$, $u_{2n+1}$) en ch. 03 — probablement hors-programme marocain mais non vérifié formellement ; étendue exacte du chapitre « Espaces vectoriels » (ch. 13, déjà signalé `[À VÉRIFIER]` dans plan/index.md).
- **2026-07-20 — Lot 4** : chapitres 09–17 rédigés directement au standard exhaustif -- Nombres complexes 1 et 2, Arithmétique dans ℤ, Structures algébriques, Espaces vectoriels, Produit scalaire/vectoriel dans l'espace, Géométrie analytique de l'espace, Dénombrement, Probabilités. **Les mathématiques de 2 Bac Sciences Mathématiques sont désormais complètes (17/17 chapitres)**, tous compilés sans erreur. Corrections mineures : caractère `œ` non supporté par la police (remplacé par `oe`), quelques formules réajustées pour éviter les débordements de ligne.
- **2026-07-20 — Lot 3** : chapitres 03–08 réécrits au standard exhaustif (le ch. 02 l'était déjà). Bloc **Analyse** de 2 Bac SM Maths entièrement au niveau exhaustif (8/8, ~12-17 pages chacun). Corrections mineures : caractère `œ` non supporté par la police (remplacé), quelques formules réajustées pour éviter les débordements de ligne.
- **2026-07-19 — Lot 2** : chapitres 06–08 (primitives, calcul intégral, équations différentielles) — le bloc **Analyse** de 2 Bac SM Maths est complet (8/8). Tous compilés sans erreur.
- **2026-07-19 — Lot 1** : infrastructure (template centralisé, arborescence, Makefile) + chapitres 01–05 de 2 Bac SM Maths, tous compilés sans erreur avec Tectonic.
  - Correctif template : `title={#3}` dans la boîte `fiche` (les titres contenant une virgule cassaient la compilation) — reporté dans `templates/qimma-template.tex`.
  - Correctif template : ajout de `\usepackage{colortbl}` (nécessaire pour `\rowcolor` dans les tableaux).
