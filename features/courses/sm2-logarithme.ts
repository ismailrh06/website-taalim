// Cours original « Fonction logarithme népérien » — 2BAC Sciences Mathématiques.
// Conforme au cadre référentiel officiel (CNEE 2024). Version interactive du chapitre
// LaTeX cours/bac2/sciences-maths/mathematiques/04-fonction-logarithme-neperien.tex.

import type { Course } from "./types";

export const COURS_LOGARITHME_SM: Course = {
  slug: "logarithme-neperien-2bac-sm",
  language: "fr",
  subjectId: "math",
  levelId: "2bac",
  streamIds: ["2bac-sma", "2bac-smb"],
  chapter: "Fonction logarithme népérien",
  title: "Fonction logarithme népérien",
  pdfUrl: "/cours/pdf/04-fonction-logarithme-neperien.pdf",
  summary:
    "Construction de ln comme primitive de 1/x, relation fonctionnelle démontrée, croissances comparées, tous les types d'équations et d'inéquations logarithmiques (changement de variable, systèmes), dérivée de ln u et logarithme décimal — avec exercices type examen national.",
  readingMin: 45,
  objectives: [
    "Construire ln comme primitive de x ↦ 1/x s'annulant en 1, et en déduire ses propriétés fondamentales.",
    "Démontrer et utiliser la relation fonctionnelle ln(ab) = ln a + ln b et toutes les règles de calcul.",
    "Maîtriser les limites usuelles et les croissances comparées.",
    "Résoudre tous les types d'équations et d'inéquations logarithmiques, y compris avec changement de variable.",
    "Dériver les fonctions ln u, utiliser la primitive ln|u| de u′/u, et le logarithme décimal.",
  ],
  sections: [
    // ————————————————————————————————— Construction
    {
      id: "construction",
      title: "Construction et premières propriétés",
      blocks: [
        {
          type: "p",
          text: "La fonction logarithme népérien, notée ln, est l'unique primitive sur ]0 ; +∞[ de x ↦ 1/x qui s'annule en 1. Son existence vient de la continuité de 1/x sur ]0 ; +∞[ ; son unicité, du fait que deux primitives sur un intervalle diffèrent d'une constante.",
        },
        {
          type: "formula",
          label: "Définition",
          expr: "ln(1) = 0   et   ln′(x) = 1/x  pour tout x > 0",
        },
        {
          type: "callout",
          variant: "key",
          title: "Conséquences immédiates",
          items: [
            "ln est continue et dérivable sur ]0 ; +∞[, avec ln′(x) = 1/x > 0 : ln est strictement croissante.",
            "ln x = 0 ⟺ x = 1 ; ln x > 0 ⟺ x > 1 ; ln x < 0 ⟺ 0 < x < 1.",
            "Le réel e ≈ 2,718 est défini par ln e = 1.",
            "Pour a, b > 0 : ln a = ln b ⟺ a = b, et ln a < ln b ⟺ a < b (stricte croissance).",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "LE réflexe : le domaine d'abord",
          items: [
            "Avant toute équation, inéquation ou étude avec ln : détermine l'ensemble des x pour lesquels les expressions sous les logarithmes sont STRICTEMENT positives.",
            "Toute solution hors de ce domaine est à rejeter — c'est l'erreur la plus fréquente au bac.",
          ],
        },
      ],
    },

    // ————————————————————————————————— Relation fonctionnelle
    {
      id: "relation-fonctionnelle",
      title: "Relation fonctionnelle et règles de calcul",
      blocks: [
        {
          type: "formula",
          label: "Relation fonctionnelle fondamentale (a, b > 0)",
          expr: "ln(ab) = ln a + ln b",
        },
        {
          type: "example",
          title: "Démonstration de la relation fonctionnelle",
          steps: [
            "Fixons b > 0 et posons g(x) = ln(bx) − ln x pour x > 0.",
            "g′(x) = b/(bx) − 1/x = 1/x − 1/x = 0 sur l'intervalle ]0 ; +∞[ : g est constante.",
            "En x = 1 : g(1) = ln b − ln 1 = ln b.",
            "Donc ln(bx) = ln x + ln b pour tout x > 0, ce qui est la relation annoncée.",
          ],
          answer: "ln(ab) = ln a + ln b pour tous a, b > 0.",
        },
        {
          type: "formula",
          label: "Règles dérivées (a, b > 0, r ∈ ℚ)",
          expr: "ln(1/b) = −ln b  ;  ln(a/b) = ln a − ln b  ;  ln(aʳ) = r·ln a  ;  ln√a = (1/2)ln a",
        },
        {
          type: "example",
          title: "Simplification d'expressions",
          steps: [
            "A = ln 8 + ln 3 − ln 6 = ln(8×3/6) = ln 4 = 2 ln 2.",
            "B = ln(√2+1) + ln(√2−1) = ln[(√2+1)(√2−1)] = ln(2−1) = ln 1 = 0.",
          ],
          answer: "A = 2 ln 2 et B = 0.",
        },
      ],
    },

    // ————————————————————————————————— Limites
    {
      id: "limites",
      title: "Étude complète et croissances comparées",
      blocks: [
        {
          type: "callout",
          variant: "key",
          title: "Limites aux bornes (démontrées)",
          items: [
            "lim ln x = +∞ en +∞ (preuve : ln(2ⁿ) = n·ln 2 → +∞ et ln croissante).",
            "lim ln x = −∞ en 0⁺ (poser x = 1/t avec t → +∞ : ln x = −ln t).",
            "La courbe admet l'axe des ordonnées pour asymptote verticale, et une branche parabolique de direction (Ox) en +∞ (car ln x/x → 0).",
          ],
        },
        {
          type: "formula",
          label: "Croissances comparées et limites usuelles",
          expr: "ln x/xⁿ → 0 (+∞)  ;  xⁿ·ln x → 0 (0⁺)  ;  ln(1+x)/x → 1 (0)  ;  ln x/(x−1) → 1 (1)",
        },
        {
          type: "p",
          text: "Moralité : en +∞, toute puissance de x l'emporte sur ln x. La limite ln(1+x)/x → 1 n'est autre que le taux d'accroissement de ln en 1, qui tend vers ln′(1) = 1. La preuve de ln x/x → 0 s'obtient en appliquant l'inégalité ln t ≤ t à √x : (1/2)ln x ≤ √x, donc 0 < ln x/x ≤ 2/√x → 0 (gendarmes).",
        },
        {
          type: "callout",
          variant: "key",
          title: "Concavité et inégalité fondamentale",
          items: [
            "ln″(x) = −1/x² < 0 : ln est concave sur ]0 ; +∞[.",
            "La tangente en 1 est y = x − 1, et par concavité : ln x ≤ x − 1 pour tout x > 0 (égalité seulement en x = 1).",
          ],
        },
        {
          type: "example",
          title: "Calculs de limites",
          steps: [
            "a) lim (ln x − x)/x = lim (ln x/x − 1) = 0 − 1 = −1 en +∞.",
            "b) lim x²·ln x = 0 en 0⁺ (croissance comparée directe).",
            "c) lim [ln(x+1) − ln x] = lim ln((x+1)/x) = ln 1 = 0 en +∞ (continuité de ln en 1).",
          ],
          answer: "a) −1   b) 0   c) 0.",
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
          title: "Équation directe (avec rejet de solution)",
          steps: [
            "Résolvons ln(x−1) + ln(x+2) = ln 4.",
            "DOMAINE : x − 1 > 0 et x + 2 > 0, soit x > 1.",
            "Sur ce domaine : ln[(x−1)(x+2)] = ln 4 ⟺ x² + x − 6 = 0 ⟺ (x−2)(x+3) = 0.",
            "Racines 2 et −3 ; seule x = 2 appartient au domaine.",
          ],
          answer: "S = {2}. (−3 est rejetée : hors domaine !)",
        },
        {
          type: "example",
          title: "Équation avec changement de variable",
          steps: [
            "Résolvons (ln x)² − 3 ln x + 2 = 0 (domaine : x > 0).",
            "Posons t = ln x (t parcourt tout ℝ, aucune restriction de signe) : t² − 3t + 2 = 0 ⟺ (t−1)(t−2) = 0.",
            "t = 1 ⟹ x = e ; t = 2 ⟹ x = e².",
          ],
          answer: "S = {e ; e²}.",
        },
        {
          type: "example",
          title: "Système somme-produit",
          steps: [
            "Résolvons le système : ln x + ln y = ln 6 et x + y = 5 (x, y > 0).",
            "La première équation équivaut à xy = 6.",
            "x et y sont donc racines de X² − 5X + 6 = 0 = (X−2)(X−3).",
          ],
          answer: "(x, y) = (2, 3) ou (3, 2).",
        },
        {
          type: "example",
          title: "Inéquation avec quotient",
          steps: [
            "Résolvons ln(1/x) ≥ ln(x−2).",
            "DOMAINE : 1/x > 0 (⟹ x > 0) et x − 2 > 0 (⟹ x > 2) : D = ]2 ; +∞[.",
            "Par stricte croissance : 1/x ≥ x − 2 ⟺ 1 ≥ x(x−2) (x > 0) ⟺ x² − 2x − 1 ≤ 0.",
            "Racines 1 ± √2 : l'inéquation donne x ∈ [1−√2 ; 1+√2].",
            "Intersection avec D : comme 1+√2 ≈ 2,41 > 2 : S = ]2 ; 1+√2].",
          ],
          answer: "S = ]2 ; 1+√2].",
        },
        {
          type: "callout",
          variant: "pitfall",
          title: "Piège : la valeur absolue implicite",
          items: [
            "ln(x²) = 2 ln|x| (et NON 2 ln x) : x² est positif même pour x < 0, alors que ln x n'existe pas pour x < 0.",
            "Toujours vérifier si l'expression sous le log peut être positive pour des x de signe quelconque.",
          ],
        },
      ],
    },

    // ————————————————————————————————— ln u et log
    {
      id: "ln-u-et-log",
      title: "Dérivée de ln u, primitives, logarithme décimal",
      blocks: [
        {
          type: "formula",
          label: "Dérivée de la composée (u dérivable, u > 0)",
          expr: "(ln u)′ = u′/u      —  et les primitives de u′/u sont ln|u| + C  (u ≠ 0)",
        },
        {
          type: "callout",
          variant: "info",
          title: "Logarithme décimal",
          items: [
            "log x = ln x / ln 10 ; log 1 = 0, log 10 = 1, log(10ⁿ) = n.",
            "Mêmes règles de calcul que ln. Usage : pH en chimie (pH = −log[H₃O⁺]), échelle de Richter.",
          ],
        },
        {
          type: "example",
          title: "Étude complète : f(x) = x − ln x",
          steps: [
            "Domaine ]0 ; +∞[. f′(x) = 1 − 1/x = (x−1)/x, du signe de x−1.",
            "f décroît sur ]0 ; 1[, croît sur ]1 ; +∞[ : minimum f(1) = 1.",
            "Limites : en 0⁺, −ln x → +∞ donc f → +∞ ; en +∞, f(x) = x(1 − ln x/x) → +∞.",
            "Conséquence : f(x) ≥ 1 > 0 pour tout x > 0, donc x > ln x sur ]0 ; +∞[.",
          ],
          answer: "Min f(1) = 1 ; on en déduit l'inégalité x > ln x pour tout x > 0.",
        },
        {
          type: "example",
          title: "Dérivée d'une composée et signe",
          steps: [
            "f(x) = ln(x² + 1), définie sur ℝ (x² + 1 > 0 toujours).",
            "f′(x) = 2x/(x²+1), du signe de x.",
            "f décroît sur ]−∞ ; 0], croît sur [0 ; +∞[, minimum f(0) = ln 1 = 0.",
          ],
          answer: "Minimum 0 en x = 0.",
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
          title: "Exercice 1 — Domaine, dérivée, limites",
          steps: [
            "f(x) = ln[(x−1)/(x+1)]. Domaine : (x−1)/(x+1) > 0 ⟺ x ∈ ]−∞ ; −1[ ∪ ]1 ; +∞[ (tableau de signes).",
            "Dérivée : u = (x−1)/(x+1), u′ = 2/(x+1)², donc f′ = u′/u = 2/[(x+1)(x−1)] = 2/(x²−1).",
            "Limites : en ±∞, u → 1 donc f → 0 ; en 1⁺, u → 0⁺ donc f → −∞ ; en (−1)⁻, u → +∞ donc f → +∞.",
          ],
          answer: "D = ]−∞;−1[ ∪ ]1;+∞[ ; f′(x) = 2/(x²−1) ; limites 0, −∞, +∞.",
        },
        {
          type: "example",
          title: "Exercice 2 — Suite définie via ln",
          steps: [
            "uₙ = ln(n²+1) − ln(n²) pour n ≥ 1. Simplifier et trouver la limite.",
            "uₙ = ln(1 + 1/n²). Comme 1/n² → 0 et ln continue en 1 : uₙ → ln 1 = 0.",
            "Plus fin : uₙ = [ln(1+1/n²)/(1/n²)] × (1/n²), et ln(1+x)/x → 1, donc uₙ se comporte comme 1/n².",
          ],
          answer: "lim uₙ = 0 (avec vitesse de convergence en 1/n²).",
        },
        {
          type: "example",
          title: "Exercice 3 — Démontrer une inégalité par étude de fonction",
          steps: [
            "Montrer que ln x ≤ 2(√x − 1) pour tout x > 0.",
            "g(x) = 2(√x − 1) − ln x : g′(x) = 1/√x − 1/x = (√x − 1)/x.",
            "Signe de g′ = signe de √x − 1 : g décroît sur ]0;1], croît sur [1;+∞[ : minimum g(1) = 0.",
            "Donc g(x) ≥ 0 pour tout x > 0.",
          ],
          answer: "ln x ≤ 2(√x − 1) pour tout x > 0.",
        },
        {
          type: "example",
          title: "Exercice 4 — Limites mêlant ln et puissances",
          steps: [
            "a) lim [ln(2x+1) − ln(x+3)] en +∞ : = ln[(2x+1)/(x+3)] → ln 2 (le quotient → 2, ln continue).",
            "b) lim x²·ln(3x) en 0⁺ : = x²·ln 3 + x²·ln x → 0 + 0 = 0 (croissance comparée).",
          ],
          answer: "a) ln 2   b) 0.",
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
            ["Équation/inéquation avec ln", "Domaine d'abord (arguments > 0), puis règles de calcul."],
            ["Équation type (ln x)² + …", "Changement de variable t = ln x (t parcourt tout ℝ), revenir à x = eᵗ."],
            ["Limite avec ln en +∞ ou 0⁺", "Croissances comparées : ln x/xⁿ → 0, xⁿ·ln x → 0."],
            ["Limite du type ln(1+f(x))/f(x), f(x) → 0", "Reconnaître → 1 (taux d'accroissement de ln en 1)."],
            ["Dériver ln u", "(ln u)′ = u′/u, en vérifiant u > 0 sur le domaine."],
            ["Primitive de u′/u", "ln|u| + C."],
            ["Démontrer une inégalité avec ln", "Étudier le signe de (droite) − (gauche) via sa dérivée."],
          ],
        },
        {
          type: "callout",
          variant: "pitfall",
          title: "Erreurs relevées chaque année par les correcteurs",
          items: [
            "Résoudre sans déterminer le domaine au préalable.",
            "Écrire ln(x²) = 2 ln x au lieu de 2 ln|x|.",
            "Écrire ln(a+b) = ln a + ln b : FAUX, la relation ne vaut que pour le PRODUIT.",
            "Oublier de vérifier le signe de u avant d'écrire (ln u)′ = u′/u.",
            "Dans t = ln x : croire que t doit être positif — t parcourt tout ℝ.",
            "Confondre ln (base e) et log (base 10) dans un exercice de physique-chimie.",
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
            "ln : primitive de 1/x sur ]0;+∞[, ln 1 = 0, ln e = 1, strictement croissante ; ln(ab) = ln a + ln b (démontrée).",
            "Limites : ln x → +∞ (+∞), ln x → −∞ (0⁺) ; ln x/xⁿ → 0 ; xⁿ ln x → 0 ; ln(1+x)/x → 1.",
            "Concavité : ln x ≤ x − 1 pour tout x > 0.",
            "(ln u)′ = u′/u ; primitives de u′/u : ln|u| + C ; log x = ln x/ln 10.",
            "Toujours commencer par le DOMAINE ; changement de variable t = ln x pour les équations polynomiales en ln x.",
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
              q: "Quel est le domaine de résolution de ln(x−3) + ln(x) = ln 4 ?",
              options: ["x > 0", "x > 3", "x ≠ 0 et x ≠ 3", "ℝ"],
              answer: 1,
              explain: "Il faut x − 3 > 0 ET x > 0 simultanément, soit x > 3. Le domaine se détermine AVANT toute manipulation.",
            },
            {
              q: "Que vaut lim x·ln x quand x → 0⁺ ?",
              options: ["−∞", "0", "+∞", "1"],
              answer: 1,
              explain: "Croissance comparée : xⁿ·ln x → 0 en 0⁺ pour tout n ≥ 1. La puissance de x « écrase » le logarithme.",
            },
            {
              q: "ln(a + b) est égal à :",
              options: ["ln a + ln b", "ln a × ln b", "ln(ab)", "aucune de ces réponses en général"],
              answer: 3,
              explain: "La relation fonctionnelle porte sur le PRODUIT : ln(ab) = ln a + ln b. Il n'existe aucune formule générale pour ln(a+b).",
            },
            {
              q: "La dérivée de ln(x² + 1) est :",
              options: ["1/(x²+1)", "2x/(x²+1)", "2x·ln(x²+1)", "1/(2x)"],
              answer: 1,
              explain: "(ln u)′ = u′/u avec u = x²+1, u′ = 2x. Ne pas oublier le facteur u′ !",
            },
            {
              q: "Pour tout x > 0, on a :",
              options: ["ln x ≥ x − 1", "ln x ≤ x − 1", "ln x = x − 1", "ln x ≥ x"],
              answer: 1,
              explain: "ln est concave et sa tangente en 1 est y = x − 1 : la courbe est au-dessous, avec égalité seulement en x = 1. Inégalité fondamentale à connaître.",
            },
          ],
        },
      ],
    },
  ],
};
