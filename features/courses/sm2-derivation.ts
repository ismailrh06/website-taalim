// Cours original « Dérivation et étude des fonctions » — 2BAC Sciences Mathématiques.
// Conforme au cadre référentiel officiel (CNEE 2024). Version interactive du chapitre
// LaTeX cours/bac2/sciences-maths/mathematiques/02-derivation-et-etude-des-fonctions.tex.

import type { Course } from "./types";

export const COURS_DERIVATION_SM: Course = {
  slug: "derivation-etude-fonctions-2bac-sm",
  language: "fr",
  subjectId: "math",
  levelId: "2bac",
  streamIds: ["2bac-sma", "2bac-smb"],
  chapter: "Dérivation et étude des fonctions",
  title: "Dérivation et étude des fonctions",
  summary:
    "Dérivabilité en un point, toutes les formules de dérivation (composées, réciproque, puissances rationnelles), théorèmes de Rolle et des accroissements finis démontrés, extremums, concavité, branches infinies et plan d'étude complet — avec les applications aux suites récurrentes et aux inégalités qui tombent chaque année au national.",
  readingMin: 55,
  objectives: [
    "Étudier la dérivabilité en un point (à droite, à gauche) et interpréter géométriquement : tangente, point anguleux, demi-tangente verticale.",
    "Maîtriser toutes les formules de dérivation : opérations, composées, fonction réciproque, puissances rationnelles.",
    "Démontrer et appliquer le théorème de Rolle, le théorème des accroissements finis (TAF) et son inégalité.",
    "Relier signe de la dérivée et monotonie, déterminer et justifier les extremums locaux.",
    "Étudier la concavité, les points d'inflexion, classifier toutes les branches infinies.",
    "Mener l'étude complète d'une fonction et résoudre les exercices type examen : tangentes, position relative, suites liées à une fonction.",
  ],
  sections: [
    // ————————————————————————————————— Dérivabilité en un point
    {
      id: "derivabilite",
      title: "Dérivabilité en un point",
      blocks: [
        {
          type: "formula",
          label: "Définition (nombre dérivé)",
          expr: "f′(a) = lim [f(x) − f(a)]/(x − a)  =  lim [f(a+h) − f(a)]/h   (limite FINIE)",
        },
        {
          type: "p",
          text: "f est dérivable en a lorsque ce taux d'accroissement admet une limite finie. On définit de même la dérivabilité à droite (x → a⁺, notée f′d(a)) et à gauche (f′g(a)) : f est dérivable en a si et seulement si les deux existent et sont égales.",
        },
        {
          type: "callout",
          variant: "key",
          title: "Interprétations géométriques : les trois cas",
          items: [
            "f dérivable en a ⟹ tangente au point A(a ; f(a)), d'équation y = f′(a)(x − a) + f(a).",
            "f′d(a) ≠ f′g(a) (toutes deux finies) ⟹ point ANGULEUX : deux demi-tangentes de pentes différentes.",
            "Taux d'accroissement → ±∞ ⟹ demi-tangente VERTICALE d'équation x = a.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Dérivable ⟹ continue (jamais l'inverse !)",
          items: [
            "Toute fonction dérivable en a est continue en a. Preuve : f(x) − f(a) = [taux] × (x − a) → f′(a) × 0 = 0.",
            "La réciproque est FAUSSE : |x| est continue en 0 mais pas dérivable (f′d(0) = 1 ≠ −1 = f′g(0), point anguleux).",
            "Autre exemple : √x est continue en 0 mais son taux 1/√x → +∞ : demi-tangente verticale.",
          ],
        },
        {
          type: "example",
          title: "Calcul direct du nombre dérivé",
          steps: [
            "Montrons, à partir de la définition, que f(x) = x² est dérivable en 3.",
            "[f(3+h) − f(3)]/h = [(3+h)² − 9]/h = (6h + h²)/h = 6 + h.",
            "Quand h → 0 : → 6.",
          ],
          answer: "f est dérivable en 3 et f′(3) = 6.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Approximation affine locale",
          items: [
            "Au voisinage de a : f(x) ≈ f(a) + f′(a)(x − a).",
            "Exemple : √4,02 ≈ 2 + 0,02/4 = 2,005 (avec f = √, f′(4) = 1/4).",
          ],
        },
      ],
    },

    // ————————————————————————————————— Formules
    {
      id: "calcul-derivees",
      title: "Calcul des dérivées : toutes les formules",
      blocks: [
        {
          type: "table",
          head: ["Fonction", "Dérivée", "Domaine de dérivabilité"],
          rows: [
            ["xⁿ (n ∈ ℤ)", "n·xⁿ⁻¹", "ℝ (ou ℝ* si n < 0)"],
            ["√x", "1/(2√x)", "]0 ; +∞["],
            ["ⁿ√x", "(1/n)·x^(1/n − 1)", "]0 ; +∞["],
            ["sin x", "cos x", "ℝ"],
            ["cos x", "−sin x", "ℝ"],
            ["tan x", "1 + tan²x = 1/cos²x", "x ≠ π/2 + kπ"],
          ],
        },
        {
          type: "formula",
          label: "Opérations",
          expr: "(u+v)′ = u′+v′  ;  (uv)′ = u′v + uv′  ;  (u/v)′ = (u′v − uv′)/v²  ;  (1/v)′ = −v′/v²",
        },
        {
          type: "formula",
          label: "Composées usuelles (chaîne : (g∘f)′ = f′ × g′∘f)",
          expr: "(uⁿ)′ = n·u′·uⁿ⁻¹  ;  (√u)′ = u′/(2√u)  ;  (sin u)′ = u′cos u  ;  (cos u)′ = −u′sin u",
        },
        {
          type: "callout",
          variant: "key",
          title: "Dérivée de la fonction réciproque",
          items: [
            "Si f est continue strictement monotone, dérivable en a avec f′(a) ≠ 0, alors f⁻¹ est dérivable en b = f(a) et (f⁻¹)′(b) = 1/f′(f⁻¹(b)).",
            "Si f′(a) = 0 : f⁻¹ n'est PAS dérivable en b (tangente verticale sur la courbe de f⁻¹).",
            "Application : (x^r)′ = r·x^(r−1) pour tout rationnel r et x > 0 (puissances rationnelles).",
          ],
        },
        {
          type: "example",
          title: "Dérivée d'une réciproque sans expliciter f⁻¹",
          steps: [
            "Soit f(x) = x³ + x, strictement croissante sur ℝ (f′ = 3x² + 1 > 0), donc bijective de ℝ sur ℝ. Calculons (f⁻¹)′(2).",
            "On cherche a tel que f(a) = 2 : f(1) = 2, donc f⁻¹(2) = 1.",
            "f′(1) = 4 ≠ 0, donc (f⁻¹)′(2) = 1/f′(1) = 1/4.",
          ],
          answer: "(f⁻¹)′(2) = 1/4.",
        },
        {
          type: "example",
          title: "Tangente à une courbe",
          steps: [
            "Équation de la tangente à la courbe de f(x) = x³ − 2x + 1 au point d'abscisse 1.",
            "f(1) = 0 ; f′(x) = 3x² − 2 ; f′(1) = 1.",
            "Tangente : y = f′(1)(x − 1) + f(1) = x − 1.",
          ],
          answer: "T : y = x − 1.",
        },
      ],
    },

    // ————————————————————————————————— Rolle et TAF
    {
      id: "rolle-taf",
      title: "Théorème de Rolle et accroissements finis",
      blocks: [
        {
          type: "callout",
          variant: "key",
          title: "Théorème de Rolle",
          items: [
            "f continue sur [a ; b], dérivable sur ]a ; b[, avec f(a) = f(b) ⟹ il existe c ∈ ]a ; b[ tel que f′(c) = 0.",
            "Idée de la preuve : f atteint son max M et son min m sur le segment. Si m = M, f est constante. Sinon, l'un des deux extrema est atteint à l'intérieur (car f(a) = f(b)), et en un extremum intérieur, f′ s'annule.",
          ],
        },
        {
          type: "callout",
          variant: "key",
          title: "Théorème des accroissements finis (TAF)",
          items: [
            "f continue sur [a ; b], dérivable sur ]a ; b[ ⟹ il existe c ∈ ]a ; b[ tel que f(b) − f(a) = f′(c)(b − a).",
            "Preuve : appliquer Rolle à φ(x) = f(x) − f(a) − [(f(b)−f(a))/(b−a)](x − a), qui vérifie φ(a) = φ(b) = 0.",
            "Inégalité des accroissements finis : si m ≤ f′ ≤ M sur ]a;b[, alors m(b−a) ≤ f(b)−f(a) ≤ M(b−a) ; et si |f′| ≤ k : |f(b)−f(a)| ≤ k|b−a|.",
          ],
        },
        {
          type: "example",
          title: "Encadrement classique via le TAF",
          steps: [
            "Montrons que sin x ≤ x pour tout x > 0.",
            "f(t) = sin t est continue sur [0 ; x], dérivable sur ]0 ; x[, avec f′(t) = cos t ≤ 1.",
            "L'inégalité des accroissements finis avec M = 1 donne : sin x − sin 0 ≤ 1 × (x − 0).",
          ],
          answer: "sin x ≤ x pour tout x > 0.",
        },
        {
          type: "example",
          title: "Encadrement d'une différence de racines",
          steps: [
            "Montrons que pour x > 1 : 1/(2√x) < √x − √(x−1) < 1/(2√(x−1)).",
            "TAF appliqué à f(t) = √t sur [x−1 ; x] : il existe c ∈ ]x−1 ; x[ tel que √x − √(x−1) = 1/(2√c).",
            "Comme x−1 < c < x et que t ↦ 1/(2√t) est décroissante : 1/(2√x) < 1/(2√c) < 1/(2√(x−1)).",
          ],
          answer: "L'encadrement annoncé, directement par le TAF.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "L'application reine au bac : suites récurrentes",
          items: [
            "Pour uₙ₊₁ = f(uₙ) avec point fixe ℓ (f(ℓ) = ℓ) : si |f′| ≤ k < 1 sur un intervalle stable contenant les uₙ et ℓ, alors |uₙ₊₁ − ℓ| = |f(uₙ) − f(ℓ)| ≤ k|uₙ − ℓ|.",
            "Par récurrence : |uₙ − ℓ| ≤ kⁿ|u₀ − ℓ| → 0 : la suite converge vers ℓ, SANS étude de monotonie.",
            "Bonus : cette majoration permet de répondre à « trouver n tel que |uₙ − ℓ| < 10⁻ᵖ ».",
          ],
        },
      ],
    },

    // ————————————————————————————————— Monotonie, extremums, concavité
    {
      id: "monotonie-concavite",
      title: "Monotonie, extremums, concavité",
      blocks: [
        {
          type: "callout",
          variant: "key",
          title: "Signe de f′ et variations (démontré via le TAF)",
          items: [
            "f′ ≥ 0 sur I ⟺ f croissante ; f′ > 0 ⟹ strictement croissante (idem en décroissant).",
            "Preuve : pour x₁ < x₂, le TAF donne f(x₂) − f(x₁) = f′(c)(x₂ − x₁) ≥ 0.",
            "Extremum local : f′ s'annule EN CHANGEANT DE SIGNE (max si + → −, min si − → +).",
          ],
        },
        {
          type: "callout",
          variant: "pitfall",
          title: "f′(a) = 0 ne suffit pas !",
          items: [
            "Pour f(x) = x³ : f′(0) = 0 mais f est strictement croissante — pas d'extremum en 0 (c'est un point d'inflexion à tangente horizontale).",
            "De même f″(a) = 0 ne suffit pas pour un point d'inflexion : pour f(x) = x⁴, f″(0) = 0 mais pas de changement de signe — pas d'inflexion.",
          ],
        },
        {
          type: "callout",
          variant: "key",
          title: "Concavité et point d'inflexion",
          items: [
            "f″ ≥ 0 sur I ⟹ courbe convexe (au-dessus de ses tangentes) ; f″ ≤ 0 ⟹ concave (au-dessous).",
            "Point d'inflexion : f″ s'annule en changeant de signe — la courbe traverse sa tangente.",
            "Application aux inégalités : si f est convexe, f(x) ≥ f(a) + f′(a)(x − a) pour tous x, a — outil puissant pour démontrer une inégalité par la tangente.",
          ],
        },
        {
          type: "example",
          title: "Extremums et inflexion sur un exemple complet",
          steps: [
            "Étudions f(x) = x³ − 3x : f′(x) = 3(x−1)(x+1) et f″(x) = 6x.",
            "f′ change de signe (+,−,+) en −1 et 1 : maximum local f(−1) = 2, minimum local f(1) = −2.",
            "f″ s'annule en 0 en changeant de signe : point d'inflexion en (0 ; 0), la courbe passe de concave à convexe.",
          ],
          answer: "Max local (−1 ; 2), min local (1 ; −2), inflexion en (0 ; 0).",
        },
        {
          type: "example",
          title: "Démontrer une inégalité par concavité",
          steps: [
            "Montrons que √(1+x) ≤ 1 + x/2 pour tout x ≥ 0.",
            "f(t) = √(1+t) : f″(t) = −1/[4(1+t)^(3/2)] < 0 : f est concave.",
            "Une fonction concave est au-dessous de ses tangentes. Tangente en 0 : y = 1 + t/2.",
          ],
          answer: "√(1+t) ≤ 1 + t/2 pour tout t ≥ 0, par concavité.",
        },
      ],
    },

    // ————————————————————————————————— Branches infinies
    {
      id: "branches-infinies",
      title: "Branches infinies : classification complète",
      blocks: [
        {
          type: "steps",
          title: "L'arbre de décision complet",
          items: [
            "lim f = ±∞ en un point a ⟹ asymptote VERTICALE x = a.",
            "lim f = b (fini) en ±∞ ⟹ asymptote HORIZONTALE y = b.",
            "Si f(x) → ±∞ en ±∞ : étudier f(x)/x. Si f(x)/x → ±∞ ⟹ branche parabolique de direction (Oy).",
            "Si f(x)/x → 0 ⟹ branche parabolique de direction (Ox).",
            "Si f(x)/x → a ≠ 0 : étudier f(x) − ax. Limite finie b ⟹ asymptote OBLIQUE y = ax + b ; limite infinie ⟹ branche parabolique de direction y = ax.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Position par rapport à l'asymptote oblique",
          items: [
            "Étudier le signe de f(x) − (ax + b) : positif ⟹ courbe au-dessus ; négatif ⟹ au-dessous ; changement de signe ⟹ la courbe traverse son asymptote.",
          ],
        },
        {
          type: "example",
          title: "Étude complète guidée",
          steps: [
            "f(x) = (x² + 1)/x = x + 1/x sur ℝ*. La fonction est impaire : étude sur ]0 ; +∞[ puis symétrie par rapport à O.",
            "Limites : en 0⁺, f → +∞ (asymptote verticale x = 0) ; en +∞, f(x) − x = 1/x → 0 : asymptote oblique y = x, courbe au-dessus (1/x > 0).",
            "f′(x) = 1 − 1/x² = (x²−1)/x² : f′ < 0 sur ]0;1[, f′ > 0 sur ]1;+∞[ : minimum local f(1) = 2.",
            "Par imparité : maximum local f(−1) = −2 sur ]−∞ ; 0[.",
          ],
          answer: "Asymptotes x = 0 et y = x ; min local (1 ; 2), max local (−1 ; −2).",
        },
        {
          type: "steps",
          title: "Plan d'étude complet d'une fonction (les 6 étapes)",
          items: [
            "Domaine de définition ; parité/périodicité éventuelles (pour réduire l'intervalle d'étude).",
            "Limites aux bornes ; classification des asymptotes et branches infinies.",
            "Dérivabilité, calcul de f′, étude de son signe.",
            "Tableau de variations complet (flèches, valeurs et limites).",
            "Concavité, points d'inflexion (si demandé), tangentes remarquables.",
            "Tracé : asymptotes en pointillés, extremums, points d'inflexion, quelques valeurs.",
          ],
        },
      ],
    },

    // ————————————————————————————————— Exercices type examen
    {
      id: "exercices-examen",
      title: "Exercices corrigés type examen national",
      blocks: [
        {
          type: "example",
          title: "Exercice 1 — Dérivabilité avec paramètre",
          steps: [
            "f(x) = √(x²+1) si x ≤ 0 et f(x) = ax + 1 si x > 0. Déterminer a pour que f soit dérivable en 0.",
            "Continuité d'abord : f(0) = 1 et lim f = 1 en 0⁺ : continue quel que soit a.",
            "À gauche : f′(x) = x/√(x²+1), donc f′g(0) = 0. À droite : f′(x) = a, donc f′d(0) = a.",
            "Dérivable en 0 ⟺ f′g(0) = f′d(0) ⟺ a = 0.",
          ],
          answer: "a = 0.",
        },
        {
          type: "example",
          title: "Exercice 2 — Tangente et position relative",
          steps: [
            "f(x) = x³ − 3x² + 2. Tangente T en x = 1, et position de la courbe par rapport à T.",
            "f(1) = 0 ; f′(x) = 3x² − 6x ; f′(1) = −3. Donc T : y = −3x + 3.",
            "g(x) = f(x) − (−3x + 3) = x³ − 3x² + 3x − 1 = (x − 1)³ (identité remarquable).",
            "Signe de (x−1)³ = signe de (x−1) : courbe au-dessous de T pour x < 1, au-dessus pour x > 1.",
          ],
          answer: "La courbe traverse sa tangente en x = 1 : c'est un point d'inflexion (f″(x) = 6x − 6 s'y annule en changeant de signe ✓).",
        },
        {
          type: "example",
          title: "Exercice 3 — Rolle appliqué deux fois",
          steps: [
            "f(x) = (x−1)(x−2)(x−3). Montrer, sans calculer f′, que f′ admet au moins deux racines réelles distinctes.",
            "f est polynomiale (continue, dérivable) et f(1) = f(2) = f(3) = 0.",
            "Rolle sur [1 ; 2] : il existe c₁ ∈ ]1 ; 2[ avec f′(c₁) = 0.",
            "Rolle sur [2 ; 3] : il existe c₂ ∈ ]2 ; 3[ avec f′(c₂) = 0.",
            "Les intervalles ]1;2[ et ]2;3[ sont disjoints donc c₁ ≠ c₂.",
          ],
          answer: "f′ admet au moins deux racines réelles distinctes.",
        },
        {
          type: "example",
          title: "Exercice 4 — Suite récurrente via les accroissements finis",
          steps: [
            "f(x) = √(x+6), u₀ = 3, uₙ₊₁ = f(uₙ). On admet uₙ ∈ [2 ; 3]. Montrer |uₙ₊₁ − 3| ≤ (1/4)|uₙ − 3| et conclure.",
            "f(3) = 3 : 3 est point fixe. Sur [2 ; 3] : f′(x) = 1/(2√(x+6)) ≤ 1/(2√8) < 1/4.",
            "Par l'inégalité des accroissements finis : |uₙ₊₁ − 3| = |f(uₙ) − f(3)| ≤ (1/4)|uₙ − 3|.",
            "Par récurrence : |uₙ − 3| ≤ (1/4)ⁿ|u₀ − 3| = (1/4)ⁿ → 0.",
          ],
          answer: "lim uₙ = 3 (convergence prouvée sans étude de monotonie).",
        },
        {
          type: "example",
          title: "Exercice 5 — Étude complète avec asymptote oblique",
          steps: [
            "f(x) = (x² − x + 1)/(x − 1) sur ℝ∖{1}.",
            "Division euclidienne : f(x) = x + 1/(x−1).",
            "Limites : ±∞ de part et d'autre de 1 (asymptote verticale x = 1) ; f(x) − x = 1/(x−1) → 0 en ±∞ : asymptote oblique y = x (au-dessus si x > 1, au-dessous si x < 1).",
            "f′(x) = 1 − 1/(x−1)² = x(x−2)/(x−1)² : f′ > 0 sur ]−∞;0[, < 0 sur ]0;1[∪]1;2[, > 0 sur ]2;+∞[.",
          ],
          answer: "Maximum local f(0) = −1, minimum local f(2) = 3 ; asymptotes x = 1 et y = x.",
        },
      ],
    },

    // ————————————————————————————————— Méthodes et pièges
    {
      id: "methodes-pieges",
      title: "Méthodes et pièges : la boîte à outils de l'examen",
      blocks: [
        {
          type: "table",
          head: ["Ce qu'on te demande", "Ton réflexe"],
          rows: [
            ["Étudier la dérivabilité en a", "Calculer f′g(a) et f′d(a) séparément, comparer (après vérification de la continuité)."],
            ["Écrire l'équation d'une tangente", "y = f′(x₀)(x − x₀) + f(x₀)."],
            ["Position courbe / tangente ou asymptote", "Étudier le signe de f(x) − (droite)."],
            ["Montrer qu'une dérivée s'annule k fois", "Rolle sur chacun des k sous-intervalles où f prend la même valeur."],
            ["Convergence d'une suite uₙ₊₁ = f(uₙ)", "Inégalité des accroissements finis : |f′| ≤ k < 1 sur un intervalle stable."],
            ["Trouver les extrema locaux", "Signe de f′ : vérifier le CHANGEMENT de signe, pas seulement f′ = 0."],
            ["Trouver un point d'inflexion", "Signe de f″ : vérifier le changement de signe."],
            ["Prouver une inégalité f(x) ≤ droite", "Concavité de f (courbe sous ses tangentes) ou TAF."],
            ["Classifier une branche infinie", "Étudier f(x)/x, puis f(x) − ax, selon l'arbre de décision."],
          ],
        },
        {
          type: "callout",
          variant: "pitfall",
          title: "Erreurs relevées chaque année par les correcteurs",
          items: [
            "Confondre f′(a) = 0 avec « extremum en a » : il faut le changement de signe (contre-exemple x³).",
            "Confondre f″(a) = 0 avec « inflexion en a » : même exigence (contre-exemple x⁴).",
            "Oublier de vérifier la continuité avant la dérivabilité en un point de raccordement.",
            "Appliquer Rolle sans vérifier f(a) = f(b), ou le TAF sans la continuité sur le segment FERMÉ.",
            "Écrire (f⁻¹)′(b) = 1/f′(b) au lieu de 1/f′(f⁻¹(b)).",
            "Oublier le facteur u′ dans une composée : (sin(x²))′ = 2x·cos(x²), PAS cos(x²).",
            "Conclure à une asymptote oblique sans vérifier que f(x) − ax a une limite FINIE.",
          ],
        },
      ],
    },

    // ————————————————————————————————— Résumé
    {
      id: "resume",
      title: "Résumé",
      blocks: [
        {
          type: "list",
          items: [
            "f′(a) = lim [f(a+h) − f(a)]/h ; tangente y = f′(a)(x−a) + f(a) ; dérivable ⟹ continue (jamais l'inverse).",
            "Composées : (uⁿ)′ = nu′uⁿ⁻¹, (√u)′ = u′/(2√u), (sin u)′ = u′cos u ; réciproque : (f⁻¹)′(b) = 1/f′(f⁻¹(b)).",
            "Rolle : f(a) = f(b) ⟹ ∃c, f′(c) = 0 ; TAF : f(b) − f(a) = f′(c)(b−a) ; |f′| ≤ k ⟹ |f(b)−f(a)| ≤ k|b−a| (clé pour les suites).",
            "Signe de f′ → monotonie (via TAF) ; extremum = changement de signe de f′ ; inflexion = changement de signe de f″.",
            "Branches infinies : verticale / horizontale / oblique / paraboliques, via l'étude de f(x)/x puis f(x) − ax.",
            "Convexe ⟹ courbe au-dessus de ses tangentes : outil puissant pour les inégalités.",
          ],
        },
      ],
    },

    // ————————————————————————————————— Quiz
    {
      id: "quiz",
      title: "Quiz — teste ta compréhension",
      blocks: [
        {
          type: "quiz",
          questions: [
            {
              q: "f(x) = |x| en 0 : que peut-on dire ?",
              options: [
                "f est dérivable en 0",
                "f est continue mais pas dérivable en 0",
                "f n'est ni continue ni dérivable en 0",
                "f est dérivable à droite seulement",
              ],
              answer: 1,
              explain: "f′d(0) = 1 et f′g(0) = −1 : les demi-dérivées existent mais diffèrent — point anguleux. f reste continue en 0. C'est LE contre-exemple à « continue ⟹ dérivable ».",
            },
            {
              q: "Que vaut (sin(x²))′ ?",
              options: ["cos(x²)", "2x·cos(x²)", "−2x·cos(x²)", "2x·sin(x²)"],
              answer: 1,
              explain: "Dérivée d'une composée : (sin u)′ = u′·cos u avec u = x², donc u′ = 2x. Oublier le facteur u′ est l'erreur la plus fréquente.",
            },
            {
              q: "f′(a) = 0. Peut-on conclure que f admet un extremum en a ?",
              options: [
                "Oui, toujours",
                "Oui, si f est continue",
                "Non : il faut que f′ change de signe en a",
                "Non : il faut f″(a) = 0",
              ],
              answer: 2,
              explain: "Contre-exemple : f(x) = x³ en 0. f′(0) = 0 mais f est strictement croissante. L'extremum exige le changement de signe de f′.",
            },
            {
              q: "Le théorème de Rolle exige :",
              options: [
                "f dérivable sur [a ; b] et f(a) = f(b)",
                "f continue sur [a ; b], dérivable sur ]a ; b[, et f(a) = f(b)",
                "f continue sur ]a ; b[ et f(a) = f(b)",
                "f strictement monotone sur [a ; b]",
              ],
              answer: 1,
              explain: "Les trois hypothèses exactes : continuité sur le segment FERMÉ, dérivabilité sur l'ouvert, égalité des valeurs aux bornes. Chacune est indispensable.",
            },
            {
              q: "f(x)/x → 2 et f(x) − 2x → +∞ quand x → +∞. La courbe admet :",
              options: [
                "une asymptote oblique y = 2x",
                "une branche parabolique de direction y = 2x",
                "une asymptote horizontale",
                "une branche parabolique de direction (Oy)",
              ],
              answer: 1,
              explain: "f(x)/x → a = 2 fini, mais f(x) − ax ne tend PAS vers une limite finie : c'est une branche parabolique de direction y = 2x, pas une asymptote.",
            },
            {
              q: "Pour prouver la convergence de uₙ₊₁ = f(uₙ) par les accroissements finis, il faut :",
              options: [
                "|f′| ≤ k < 1 sur un intervalle stable contenant les uₙ et le point fixe",
                "f′ ≥ 0 sur ℝ",
                "f continue seulement",
                "|f′| ≤ 1 au sens large",
              ],
              answer: 0,
              explain: "La contraction exige k STRICTEMENT inférieur à 1 (sinon kⁿ ne tend pas vers 0), un intervalle stable, et le point fixe dedans. Alors |uₙ − ℓ| ≤ kⁿ|u₀ − ℓ| → 0.",
            },
          ],
        },
      ],
    },
  ],
};
