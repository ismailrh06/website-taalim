// Cours original « Fonction exponentielle » — 2BAC Sciences Mathématiques.
// Conforme au cadre référentiel officiel (CNEE 2024). Version interactive du chapitre
// LaTeX cours/bac2/sciences-maths/mathematiques/05-fonction-exponentielle.tex.

import type { Course } from "./types";

export const COURS_EXPONENTIELLE_SM: Course = {
  slug: "exponentielle-2bac-sm",
  language: "fr",
  subjectId: "math",
  levelId: "2bac",
  streamIds: ["2bac-sma", "2bac-smb"],
  chapter: "Fonction exponentielle",
  title: "Fonction exponentielle",
  pdfUrl: "/cours/pdf/05-fonction-exponentielle.pdf",
  summary:
    "exp construite comme réciproque de ln, propriétés algébriques démontrées, (eˣ)′ = eˣ via la dérivée de la réciproque, croissances comparées, équations et inéquations exponentielles (changement de variable), exponentielle de base a et modélisation (radioactivité) — avec exercices type examen national.",
  readingMin: 45,
  objectives: [
    "Définir exp comme réciproque de ln et démontrer ses propriétés algébriques et analytiques.",
    "Démontrer que (eˣ)′ = eˣ via la dérivée de la fonction réciproque.",
    "Maîtriser les limites usuelles, les croissances comparées et l'inégalité eˣ ≥ x + 1.",
    "Résoudre tous les types d'équations et d'inéquations exponentielles.",
    "Manipuler l'exponentielle de base a (aˣ = e^(x·ln a)) et les situations de modélisation.",
  ],
  sections: [
    // ————————————————————————————————— Définition
    {
      id: "definition",
      title: "Définition et lien avec le logarithme",
      blocks: [
        {
          type: "p",
          text: "ln est continue et strictement croissante de ]0 ; +∞[ sur ℝ (théorème de la bijection, avec les limites −∞ et +∞ aux bornes) : elle admet donc une réciproque définie sur ℝ, la fonction exponentielle, notée exp ou x ↦ eˣ.",
        },
        {
          type: "formula",
          label: "Définition (réciprocité)",
          expr: "y = eˣ ⟺ x = ln y   (x ∈ ℝ, y > 0)",
        },
        {
          type: "callout",
          variant: "key",
          title: "Conséquences directes de la réciprocité",
          items: [
            "eˣ > 0 pour TOUT x ∈ ℝ ; e⁰ = 1 ; e¹ = e.",
            "ln(eˣ) = x pour tout x ; e^(ln y) = y pour tout y > 0.",
            "exp est continue et strictement croissante sur ℝ : eᵃ = eᵇ ⟺ a = b et eᵃ < eᵇ ⟺ a < b.",
            "Les courbes de exp et ln sont symétriques par rapport à la droite y = x.",
          ],
        },
        {
          type: "formula",
          label: "Propriétés algébriques (a, b ∈ ℝ, r ∈ ℚ)",
          expr: "e^(a+b) = eᵃ·eᵇ  ;  e^(−a) = 1/eᵃ  ;  e^(a−b) = eᵃ/eᵇ  ;  (eᵃ)ʳ = e^(ra)",
        },
        {
          type: "p",
          text: "Démonstration de e^(a+b) = eᵃeᵇ : posons u = eᵃ et v = eᵇ (donc a = ln u, b = ln v). Alors a + b = ln u + ln v = ln(uv) par la relation fonctionnelle du logarithme, et en appliquant exp : e^(a+b) = uv = eᵃeᵇ.",
        },
        {
          type: "example",
          title: "Simplifications",
          steps: [
            "A = e³·e⁻¹/e⁻² = e^(3−1−(−2)) = e⁴.",
            "B = ln(e⁵) − e^(ln 3) = 5 − 3 = 2.",
          ],
          answer: "A = e⁴ et B = 2.",
        },
      ],
    },

    // ————————————————————————————————— Étude
    {
      id: "etude",
      title: "Étude de la fonction exponentielle",
      blocks: [
        {
          type: "callout",
          variant: "key",
          title: "L'exponentielle est sa propre dérivée (démontré)",
          items: [
            "(eˣ)′ = eˣ. Preuve par la dérivée de la réciproque : exp′(a) = 1/ln′(eᵃ) = 1/(1/eᵃ) = eᵃ.",
            "Comme eˣ > 0 : exp est strictement croissante sur ℝ.",
            "Tangente en 0 : y = x + 1, d'où l'inégalité fondamentale eˣ ≥ x + 1 pour tout x (égalité seulement en 0).",
          ],
        },
        {
          type: "example",
          title: "Démonstration de eˣ ≥ x + 1",
          steps: [
            "g(x) = eˣ − x − 1 : g′(x) = eˣ − 1, du signe de x (car eˣ > 1 ⟺ x > 0).",
            "g décroît sur ]−∞ ; 0], croît sur [0 ; +∞[ : minimum g(0) = 0.",
            "Donc g(x) ≥ 0 pour tout x.",
          ],
          answer: "eˣ ≥ x + 1 pour tout x ∈ ℝ.",
        },
        {
          type: "formula",
          label: "Limites usuelles et croissances comparées",
          expr: "eˣ → +∞ (+∞)  ;  eˣ → 0 (−∞)  ;  eˣ/xⁿ → +∞ (+∞)  ;  xⁿeˣ → 0 (−∞)  ;  (eˣ−1)/x → 1 (0)",
        },
        {
          type: "p",
          text: "Preuve de eˣ/x → +∞ : on applique eᵗ ≥ t + 1 > t à t = x/2, d'où e^(x/2) > x/2, puis eˣ = (e^(x/2))² > x²/4, et donc eˣ/x > x/4 → +∞. La limite (eˣ−1)/x → 1 est le taux d'accroissement de exp en 0, qui tend vers exp′(0) = 1. Hiérarchie en +∞ : ln x ≪ xⁿ ≪ eˣ.",
        },
        {
          type: "example",
          title: "Calculs de limites",
          steps: [
            "a) lim (eˣ − x²)/eˣ = lim (1 − x²/eˣ) = 1 − 0 = 1 en +∞.",
            "b) lim (x² + 1)eˣ = 0 en −∞ (croissances comparées : x²eˣ → 0 et eˣ → 0).",
            "c) lim (e²ˣ − 1)/x = 2 × lim (e²ˣ − 1)/(2x) = 2 × 1 = 2 en 0 (poser t = 2x).",
          ],
          answer: "a) 1   b) 0   c) 2.",
        },
      ],
    },

    // ————————————————————————————————— Équations
    {
      id: "equations",
      title: "Équations et inéquations : tous les cas",
      blocks: [
        {
          type: "example",
          title: "Équation se ramenant au second degré",
          steps: [
            "Résolvons e²ˣ − 3eˣ + 2 = 0.",
            "Posons t = eˣ, avec la contrainte t > 0 : t² − 3t + 2 = 0 ⟺ (t−1)(t−2) = 0.",
            "t = 1 ou t = 2, toutes deux > 0 donc acceptables.",
            "Retour à x : eˣ = 1 ⟺ x = 0 ; eˣ = 2 ⟺ x = ln 2.",
          ],
          answer: "S = {0 ; ln 2}.",
        },
        {
          type: "example",
          title: "Inéquation directe",
          steps: [
            "Résolvons e^(1−2x) > e^(x+4).",
            "Par stricte croissance de exp : 1 − 2x > x + 4 ⟺ −3x > 3 ⟺ x < −1.",
          ],
          answer: "S = ]−∞ ; −1[.",
        },
        {
          type: "callout",
          variant: "pitfall",
          title: "Le piège du signe",
          items: [
            "eˣ > 0 pour TOUT réel x : les équations eˣ = −2 ou eˣ = 0 n'ont AUCUNE solution.",
            "Lors d'un changement de variable t = eˣ : rejette systématiquement les racines t ≤ 0.",
            "Et comme eˣ ≠ 0 toujours : x·eˣ = 0 ⟺ x = 0 (on peut « simplifier » par eˣ).",
          ],
        },
      ],
    },

    // ————————————————————————————————— e^u et base a
    {
      id: "eu-et-base-a",
      title: "Dérivée de e^u, exponentielle de base a",
      blocks: [
        {
          type: "formula",
          label: "Composée et primitive",
          expr: "(e^u)′ = u′·e^u      —  et les primitives de u′·e^u sont e^u + C",
        },
        {
          type: "callout",
          variant: "key",
          title: "Exponentielle de base a (a > 0)",
          items: [
            "Définition : aˣ = e^(x·ln a), pour tout x ∈ ℝ.",
            "Dérivée : (aˣ)′ = (ln a)·aˣ.",
            "Strictement croissante si a > 1 (ln a > 0), strictement décroissante si 0 < a < 1, constante si a = 1.",
            "Les règles des puissances restent valables : a^(x+y) = aˣ·aʸ, (aˣ)ʸ = a^(xy), (ab)ˣ = aˣ·bˣ.",
          ],
        },
        {
          type: "example",
          title: "Étude complète : f(x) = (x+1)e⁻ˣ",
          steps: [
            "f′(x) = e⁻ˣ + (x+1)(−e⁻ˣ) = e⁻ˣ(−x) = −x·e⁻ˣ.",
            "Signe de f′ = signe de −x : f croît sur ]−∞ ; 0], décroît sur [0 ; +∞[, maximum f(0) = 1.",
            "En +∞ : f(x) = x·e⁻ˣ + e⁻ˣ → 0 (croissances comparées) : asymptote y = 0.",
            "En −∞ : x + 1 → −∞ et e⁻ˣ → +∞, donc f → −∞.",
          ],
          answer: "Max f(0) = 1 ; asymptote y = 0 en +∞ ; f → −∞ en −∞.",
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
          title: "Exercice 1 — Démontrer une inégalité renforcée",
          steps: [
            "Montrer que eˣ ≥ 1 + x + x²/2 pour tout x ≥ 0.",
            "g(x) = eˣ − 1 − x − x²/2 : g″(x) = eˣ − 1 ≥ 0 pour x ≥ 0 : g′ croissante.",
            "g′(0) = e⁰ − 1 − 0 = 0, donc g′(x) ≥ 0 pour x ≥ 0 : g croissante.",
            "g(0) = 0, donc g(x) ≥ 0 pour tout x ≥ 0.",
          ],
          answer: "eˣ ≥ 1 + x + x²/2 sur [0 ; +∞[ (méthode des dérivées successives).",
        },
        {
          type: "example",
          title: "Exercice 2 — La limite célèbre (1 + 1/x)ˣ",
          steps: [
            "Calculer lim (1 + 1/x)ˣ quand x → +∞.",
            "On écrit (1 + 1/x)ˣ = e^(x·ln(1 + 1/x)).",
            "Exposant : en posant t = 1/x → 0⁺, x·ln(1+1/x) = ln(1+t)/t → 1 (limite usuelle du logarithme).",
            "Par continuité de exp : la limite vaut e¹.",
          ],
          answer: "lim (1 + 1/x)ˣ = e en +∞.",
        },
        {
          type: "example",
          title: "Exercice 3 — Équation mêlant ln et exp",
          steps: [
            "Résolvons ln(eˣ + 1) = x + ln 2.",
            "Le membre de gauche est défini pour tout x (eˣ + 1 > 0).",
            "Par injectivité de ln : eˣ + 1 = e^(x + ln 2) = eˣ·e^(ln 2) = 2eˣ.",
            "Donc 1 = eˣ, soit x = 0.",
          ],
          answer: "S = {0}.",
        },
        {
          type: "example",
          title: "Exercice 4 — Modélisation : décroissance radioactive",
          steps: [
            "N(t) = N₀·e^(−λt) avec λ > 0. La moitié de la matière disparaît au bout de T (demi-vie). Exprimer λ et T l'un en fonction de l'autre.",
            "N(T) = N₀/2 ⟺ e^(−λT) = 1/2 ⟺ −λT = ln(1/2) = −ln 2.",
            "D'où λT = ln 2.",
          ],
          answer: "λ = ln 2 / T et T = ln 2 / λ.",
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
            ["Équation type e²ˣ + a·eˣ + b = 0", "Poser t = eˣ > 0, résoudre en t, rejeter t ≤ 0, revenir à x = ln t."],
            ["Inéquation avec e^(…)", "Comparer directement les exposants (stricte croissance)."],
            ["Limite avec eˣ et polynômes", "Croissances comparées : eˣ/xⁿ → +∞ ; xⁿeˣ → 0 en −∞."],
            ["Limite du type (1 + f(x))^g(x)", "Réécrire e^(g·ln(1+f)) et étudier l'exposant."],
            ["Dériver e^u", "(e^u)′ = u′·e^u — identifier u d'abord."],
            ["Primitive de u′·e^u", "e^u + C."],
            ["Démontrer une inégalité avec exp", "Fonction auxiliaire + signe de la (ou des) dérivée(s)."],
            ["Modélisation (radioactivité, population)", "Reconnaître N(t) = N₀e^(kt), relier k à une donnée (demi-vie, taux)."],
          ],
        },
        {
          type: "callout",
          variant: "pitfall",
          title: "Erreurs relevées chaque année par les correcteurs",
          items: [
            "Oublier que eˣ > 0 : garder une racine t ≤ 0 après le changement de variable t = eˣ.",
            "Confondre e^(a+b) = eᵃeᵇ (vrai) avec e^(ab) = eᵃeᵇ (faux : e^(ab) = (eᵃ)ᵇ).",
            "Écrire (e^u)′ = e^u en oubliant le facteur u′.",
            "Utiliser (eˣ−1)/x → 1 ailleurs qu'en x → 0.",
            "Confondre exponentielle de base a (aˣ, variable en exposant) et fonction puissance (xᵃ, variable en base).",
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
            "y = eˣ ⟺ x = ln y ; ln(eˣ) = x ; e^(ln y) = y ; eˣ > 0 toujours ; (eˣ)′ = eˣ (démontré via la réciproque).",
            "Règles : e^(a+b) = eᵃeᵇ ; e⁻ᵃ = 1/eᵃ ; (eᵃ)ʳ = e^(ra) ; aˣ = e^(x ln a) et (aˣ)′ = (ln a)aˣ.",
            "Limites : eˣ → +∞ (+∞), eˣ → 0 (−∞) ; eˣ/xⁿ → +∞ ; xⁿeˣ → 0 (−∞) ; (eˣ−1)/x → 1 (0).",
            "Hiérarchie en +∞ : ln x ≪ xⁿ ≪ eˣ.",
            "Inégalité fondamentale : eˣ ≥ x + 1 (égalité seulement en 0).",
            "(e^u)′ = u′e^u ; primitives de u′e^u : e^u + C.",
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
              q: "Combien de solutions réelles admet l'équation eˣ = −3 ?",
              options: ["Une", "Deux", "Aucune", "Une infinité"],
              answer: 2,
              explain: "eˣ > 0 pour tout réel x : l'exponentielle ne prend jamais de valeur négative ni nulle. Aucune solution.",
            },
            {
              q: "Que vaut lim x³·eˣ quand x → −∞ ?",
              options: ["−∞", "0", "+∞", "1"],
              answer: 1,
              explain: "Croissance comparée : xⁿeˣ → 0 en −∞. L'exponentielle « écrase » toute puissance de x.",
            },
            {
              q: "On pose t = eˣ dans t² − t − 2 = 0, de racines t = 2 et t = −1. Les solutions en x sont :",
              options: ["x = ln 2 et x = ln(−1)", "x = ln 2 seulement", "x = 2 et x = −1", "aucune solution"],
              answer: 1,
              explain: "t = −1 ≤ 0 est à rejeter (eˣ > 0). Seul t = 2 convient, d'où x = ln 2.",
            },
            {
              q: "La dérivée de e^(x²) est :",
              options: ["e^(x²)", "2x·e^(x²)", "x²·e^(x²)", "e^(2x)"],
              answer: 1,
              explain: "(e^u)′ = u′·e^u avec u = x², u′ = 2x. Le facteur u′ est obligatoire.",
            },
            {
              q: "Pour tout x ∈ ℝ, on a :",
              options: ["eˣ ≤ x + 1", "eˣ ≥ x + 1", "eˣ = x + 1", "eˣ ≥ x² toujours"],
              answer: 1,
              explain: "La courbe de exp est au-dessus de sa tangente en 0 (y = x+1), par convexité : eˣ ≥ x + 1, avec égalité seulement en x = 0.",
            },
          ],
        },
      ],
    },
  ],
};
