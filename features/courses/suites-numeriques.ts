// Cours original « Les suites numériques » — 2BAC Sciences (PC, SVT, Agronomie).
// Rédigé pour Qimma, entièrement avec nos propres mots, conforme au programme
// officiel marocain. Aucune reproduction de manuel ou de site.

import type { Course } from "./types";

export const COURS_SUITES_NUMERIQUES: Course = {
  slug: "suites-numeriques-2bac",
  language: "fr",
  subjectId: "math",
  levelId: "2bac",
  streamIds: ["2bac-pc", "2bac-svt", "2bac-sma", "2bac-smb"],
  chapter: "Suites numériques",
  title: "Les suites numériques",
  summary:
    "Comprendre, manipuler et étudier les suites : génération, suites arithmétiques et géométriques, sens de variation, bornes, limites et convergence. Le chapitre expliqué pas à pas, avec méthodes, exemples résolus et pièges à éviter.",
  readingMin: 35,
  pdfUrl: "/cours/pdf/03-suites-numeriques.pdf",
  objectives: [
    "Reconnaître une suite et la définir de façon explicite ou par récurrence.",
    "Identifier et exploiter une suite arithmétique ou géométrique (terme général, somme).",
    "Étudier le sens de variation et le caractère borné d'une suite.",
    "Calculer une limite à l'aide des limites de référence et des opérations sur les limites.",
    "Utiliser les théorèmes de convergence (monotonie, comparaison, encadrement).",
    "Traiter une suite arithmético-géométrique du type uₙ₊₁ = a·uₙ + b.",
  ],
  relatedExerciseIds: ["math-suites-arithgeo-1"],
  sections: [
    // ————————————————————————————————— Introduction
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        {
          type: "p",
          text: "Une suite numérique, c'est simplement une liste ordonnée de nombres réels : un premier terme, un deuxième, un troisième, et ainsi de suite sans fin. Derrière cette idée toute simple se cache l'un des outils les plus puissants des mathématiques : il permet de décrire des phénomènes qui évoluent étape par étape — la croissance d'une population, le remboursement d'un crédit, la désintégration d'un noyau radioactif ou l'évolution d'un placement à intérêts.",
        },
        {
          type: "p",
          text: "Au baccalauréat, les suites sont incontournables : elles apparaissent presque chaque année, seules ou mêlées à l'étude de fonctions. La bonne nouvelle, c'est que tout le chapitre repose sur un petit nombre d'idées bien précises. Une fois que tu les maîtrises, les exercices deviennent très mécaniques. L'objectif de ce cours est justement de te faire comprendre ces idées, pas seulement de les mémoriser.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Ce qu'il faut avoir en tête",
          items: [
            "Une suite se note (uₙ) ; le nombre uₙ est le terme d'indice n (ou terme général).",
            "L'indice n est un entier naturel : n ∈ ℕ (parfois à partir de n = 1).",
            "Étudier une suite, c'est répondre à deux questions : comment varie-t-elle, et vers quoi tend-elle ?",
          ],
        },
      ],
    },

    // ————————————————————————————————— Définitions
    {
      id: "definitions",
      title: "Définitions essentielles",
      blocks: [
        {
          type: "p",
          text: "Formellement, une suite numérique est une fonction qui associe, à chaque entier naturel n, un nombre réel noté uₙ. On écrit la suite entre parenthèses, (uₙ), pour la distinguer de son terme général uₙ qui, lui, est un nombre.",
        },
        {
          type: "keywords",
          items: [
            { term: "Terme général uₙ", def: "le terme d'indice n, c'est-à-dire le n-ième nombre de la liste." },
            { term: "Terme initial", def: "le premier terme, souvent u₀ (parfois u₁ selon l'énoncé)." },
            { term: "Indice", def: "l'entier n qui repère la position du terme dans la suite." },
          ],
        },
        {
          type: "p",
          text: "Il existe deux grandes façons de définir une suite, et savoir les distinguer est essentiel car les méthodes d'étude ne sont pas les mêmes.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Définition explicite : on donne une formule directe uₙ = f(n) qui calcule n'importe quel terme sans connaître les précédents. Exemple : uₙ = 2n + 3.",
            "Définition par récurrence : on donne le premier terme et une relation qui calcule chaque terme à partir du précédent, uₙ₊₁ = f(uₙ). Exemple : u₀ = 1 et uₙ₊₁ = 2uₙ + 1.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Comment les reconnaître d'un coup d'œil",
          items: [
            "Si tu peux calculer u₁₀₀ directement en remplaçant n par 100 → c'est explicite.",
            "Si tu as besoin de u₉₉ pour obtenir u₁₀₀ → c'est une récurrence.",
          ],
        },
      ],
    },

    // ————————————————————————————————— Suites arithmétiques
    {
      id: "suites-arithmetiques",
      title: "Les suites arithmétiques",
      blocks: [
        {
          type: "p",
          text: "Une suite est arithmétique lorsqu'on passe d'un terme au suivant en ajoutant toujours le même nombre, appelé la raison et noté r. Autrement dit, la différence entre deux termes consécutifs est constante.",
        },
        { type: "formula", label: "Relation de récurrence", expr: "uₙ₊₁ = uₙ + r" },
        { type: "formula", label: "Terme général (à partir de u₀)", expr: "uₙ = u₀ + n·r" },
        { type: "formula", label: "Terme général (à partir de uₚ)", expr: "uₙ = uₚ + (n − p)·r" },
        {
          type: "p",
          text: "Pour prouver qu'une suite est arithmétique, on calcule la différence uₙ₊₁ − uₙ et on montre qu'elle ne dépend pas de n (elle est égale à une constante r). C'est LA méthode attendue au bac.",
        },
        {
          type: "callout",
          variant: "key",
          title: "Somme de termes consécutifs",
          items: [
            "La somme d'une suite arithmétique se calcule avec : S = (nombre de termes) × (premier terme + dernier terme) / 2.",
            "Cas classique : 1 + 2 + 3 + … + n = n(n + 1) / 2.",
          ],
        },
      ],
    },

    // ————————————————————————————————— Suites géométriques
    {
      id: "suites-geometriques",
      title: "Les suites géométriques",
      blocks: [
        {
          type: "p",
          text: "Une suite est géométrique lorsqu'on passe d'un terme au suivant en multipliant toujours par le même nombre, appelé la raison et noté q. Ici, c'est le rapport entre deux termes consécutifs qui est constant (à condition que les termes ne soient pas nuls).",
        },
        { type: "formula", label: "Relation de récurrence", expr: "uₙ₊₁ = q · uₙ" },
        { type: "formula", label: "Terme général (à partir de u₀)", expr: "uₙ = u₀ · qⁿ" },
        { type: "formula", label: "Terme général (à partir de uₚ)", expr: "uₙ = uₚ · qⁿ⁻ᵖ" },
        {
          type: "p",
          text: "Pour prouver qu'une suite est géométrique, on calcule le rapport uₙ₊₁ / uₙ et on montre qu'il est égal à une constante q indépendante de n.",
        },
        {
          type: "callout",
          variant: "key",
          title: "Somme de termes consécutifs (q ≠ 1)",
          items: [
            "S = premier terme × (1 − q^(nombre de termes)) / (1 − q).",
            "Par exemple : 1 + q + q² + … + qⁿ = (1 − qⁿ⁺¹) / (1 − q).",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Ne confonds pas les deux modèles",
          items: [
            "Arithmétique = on AJOUTE r (croissance « en ligne droite »).",
            "Géométrique = on MULTIPLIE par q (croissance ou décroissance « accélérée »).",
          ],
        },
      ],
    },

    // ————————————————————————————————— Sens de variation
    {
      id: "sens-de-variation",
      title: "Sens de variation d'une suite",
      blocks: [
        {
          type: "p",
          text: "Étudier le sens de variation, c'est déterminer si la suite est croissante (chaque terme est plus grand que le précédent), décroissante (chaque terme est plus petit) ou constante. Il existe trois méthodes ; on choisit selon la forme de la suite.",
        },
        {
          type: "steps",
          title: "Les trois méthodes",
          items: [
            "Étudier le signe de uₙ₊₁ − uₙ : si ce signe est positif pour tout n, la suite est croissante ; s'il est négatif, elle est décroissante. Méthode universelle, à privilégier.",
            "Comparer le rapport uₙ₊₁ / uₙ à 1 : utile UNIQUEMENT si tous les termes sont strictement positifs. Rapport > 1 → croissante ; rapport < 1 → décroissante.",
            "Utiliser la fonction associée : si uₙ = f(n) avec f monotone sur [0 ; +∞[, la suite a le même sens de variation que f.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Le réflexe gagnant",
          items: [
            "Par défaut, calcule uₙ₊₁ − uₙ : c'est la méthode qui marche toujours.",
            "N'utilise le quotient que si tu es certain que tous les termes sont positifs.",
          ],
        },
      ],
    },

    // ————————————————————————————————— Bornes
    {
      id: "suites-bornees",
      title: "Suites majorées, minorées, bornées",
      blocks: [
        {
          type: "p",
          text: "Ces notions décrivent si la suite reste « coincée » en dessous ou au-dessus d'une valeur. Elles sont indispensables pour appliquer plus loin le théorème de convergence monotone.",
        },
        {
          type: "keywords",
          items: [
            { term: "Majorée", def: "il existe un réel M tel que uₙ ≤ M pour tout n. M est un majorant." },
            { term: "Minorée", def: "il existe un réel m tel que uₙ ≥ m pour tout n. m est un minorant." },
            { term: "Bornée", def: "la suite est à la fois majorée et minorée : m ≤ uₙ ≤ M pour tout n." },
          ],
        },
        {
          type: "callout",
          variant: "pitfall",
          title: "Erreur classique",
          items: [
            "Un majorant n'est pas forcément atteint : dire « uₙ ≤ 3 » ne signifie pas qu'un terme vaut 3.",
            "Il ne suffit pas de vérifier sur les premiers termes : il faut démontrer l'inégalité pour TOUT n.",
          ],
        },
      ],
    },

    // ————————————————————————————————— Limites
    {
      id: "limites",
      title: "Limite d'une suite et convergence",
      blocks: [
        {
          type: "p",
          text: "La question centrale du chapitre est : quand n devient très grand (n → +∞), vers quoi se rapprochent les termes uₙ ? Si les termes se stabilisent autour d'un nombre réel ℓ, on dit que la suite converge vers ℓ et on écrit lim uₙ = ℓ. Sinon, la suite diverge (elle tend vers +∞, vers −∞, ou n'a pas de limite).",
        },
        {
          type: "callout",
          variant: "key",
          title: "Limites de référence à connaître par cœur",
          items: [
            "1/n → 0 ; 1/n² → 0 ; 1/√n → 0 (et plus généralement 1/nᵏ → 0 pour k > 0).",
            "√n → +∞ ; n → +∞ ; n² → +∞ ; nᵏ → +∞ (k > 0).",
            "Suite géométrique qⁿ : si −1 < q < 1 alors qⁿ → 0 ; si q > 1 alors qⁿ → +∞ ; si q = 1 alors qⁿ = 1 ; si q ≤ −1 alors qⁿ n'a pas de limite.",
          ],
        },
        {
          type: "p",
          text: "Pour calculer une limite, on combine ces limites de référence grâce aux opérations sur les limites : la limite d'une somme est la somme des limites, celle d'un produit le produit des limites, etc. Mais attention, certaines combinaisons ne donnent pas de résultat direct : ce sont les formes indéterminées.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Les quatre formes indéterminées",
          items: [
            "« ∞ − ∞ », « 0 × ∞ », « ∞ / ∞ » et « 0 / 0 ».",
            "Face à une forme indéterminée, on ne conclut jamais directement : il faut transformer l'expression (factoriser par le terme dominant, simplifier, utiliser une expression conjuguée…).",
          ],
        },
        {
          type: "example",
          title: "Lever une indétermination ∞/∞",
          steps: [
            "On cherche la limite de uₙ = (3n² + 2n) / (n² + 5).",
            "Numérateur et dénominateur tendent vers +∞ : forme indéterminée ∞/∞.",
            "On factorise par le terme dominant n² en haut et en bas : uₙ = n²(3 + 2/n) / [n²(1 + 5/n²)].",
            "On simplifie par n² : uₙ = (3 + 2/n) / (1 + 5/n²).",
            "Quand n → +∞ : 2/n → 0 et 5/n² → 0.",
          ],
          answer: "lim uₙ = 3/1 = 3. La suite converge vers 3.",
        },
      ],
    },

    // ————————————————————————————————— Théorèmes
    {
      id: "theoremes-convergence",
      title: "Les théorèmes de convergence",
      blocks: [
        {
          type: "p",
          text: "Parfois, on ne peut pas calculer la limite directement. On utilise alors des théorèmes qui garantissent l'existence d'une limite, ou qui la déterminent par comparaison. Ce sont des outils très demandés au bac.",
        },
        {
          type: "callout",
          variant: "key",
          title: "Théorème de la convergence monotone",
          items: [
            "Toute suite croissante et majorée converge.",
            "Toute suite décroissante et minorée converge.",
            "Attention : ce théorème prouve que la limite EXISTE, mais ne donne pas sa valeur.",
          ],
        },
        {
          type: "callout",
          variant: "key",
          title: "Théorème des gendarmes (encadrement)",
          items: [
            "Si vₙ ≤ uₙ ≤ wₙ à partir d'un certain rang, et si vₙ et wₙ tendent vers la même limite ℓ, alors uₙ tend aussi vers ℓ.",
            "Idéal pour les suites contenant un cos(n) ou un sin(n) que l'on encadre entre −1 et 1.",
          ],
        },
        {
          type: "callout",
          variant: "key",
          title: "Théorème de comparaison",
          items: [
            "Si uₙ ≥ vₙ à partir d'un certain rang et si vₙ → +∞, alors uₙ → +∞.",
            "Si uₙ ≤ vₙ à partir d'un certain rang et si vₙ → −∞, alors uₙ → −∞.",
          ],
        },
      ],
    },

    // ————————————————————————————————— Arithmético-géométriques
    {
      id: "arithmetico-geometriques",
      title: "Les suites arithmético-géométriques",
      blocks: [
        {
          type: "p",
          text: "C'est le type de suite le plus fréquent dans les problèmes de bac. Elle est définie par une relation de la forme uₙ₊₁ = a·uₙ + b (avec a ≠ 1 et b ≠ 0). Elle n'est ni arithmétique ni géométrique, mais une méthode standard permet de la ramener à une suite géométrique, que l'on sait parfaitement étudier.",
        },
        {
          type: "steps",
          title: "Méthode en 4 étapes (à connaître parfaitement)",
          items: [
            "Chercher le point fixe ℓ : on résout l'équation ℓ = a·ℓ + b. C'est la limite éventuelle de la suite.",
            "Poser la suite auxiliaire vₙ = uₙ − ℓ, puis montrer qu'elle est géométrique en calculant vₙ₊₁ en fonction de vₙ (on trouve vₙ₊₁ = a·vₙ, de raison a).",
            "Exprimer vₙ = v₀ · aⁿ, puis revenir à uₙ = vₙ + ℓ.",
            "Conclure sur la limite : si −1 < a < 1, alors aⁿ → 0 donc uₙ → ℓ.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Astuce mémo",
          items: [
            "La suite auxiliaire a TOUJOURS pour raison le coefficient a de la relation uₙ₊₁ = a·uₙ + b.",
            "Le nombre à retrancher (le ℓ) est toujours le point fixe, solution de ℓ = a·ℓ + b.",
          ],
        },
      ],
    },

    // ————————————————————————————————— Méthodes
    {
      id: "methodes",
      title: "Méthodes à connaître",
      blocks: [
        {
          type: "table",
          head: ["Ce qu'on te demande", "Ce que tu fais"],
          rows: [
            ["Montrer qu'une suite est arithmétique", "Calculer uₙ₊₁ − uₙ et montrer que c'est une constante r."],
            ["Montrer qu'une suite est géométrique", "Calculer uₙ₊₁ / uₙ et montrer que c'est une constante q."],
            ["Étudier le sens de variation", "Étudier le signe de uₙ₊₁ − uₙ (méthode par défaut)."],
            ["Calculer une limite", "Utiliser les limites de référence + opérations ; lever toute indétermination."],
            ["Prouver qu'une suite converge sans la calculer", "Montrer qu'elle est monotone et bornée (convergence monotone)."],
            ["Limite avec cos(n) ou sin(n)", "Encadrer, puis appliquer le théorème des gendarmes."],
            ["Suite uₙ₊₁ = a·uₙ + b", "Point fixe ℓ, suite auxiliaire vₙ = uₙ − ℓ (géométrique de raison a)."],
          ],
        },
      ],
    },

    // ————————————————————————————————— Exemples résolus
    {
      id: "exemples-resolus",
      title: "Exemples entièrement résolus",
      blocks: [
        {
          type: "example",
          title: "Exemple 1 — Reconnaître une suite arithmétique",
          steps: [
            "Soit uₙ = 5n − 2. Montrons que (uₙ) est arithmétique.",
            "On calcule uₙ₊₁ − uₙ = [5(n + 1) − 2] − [5n − 2].",
            "= 5n + 5 − 2 − 5n + 2 = 5.",
            "La différence vaut 5, une constante indépendante de n.",
          ],
          answer: "(uₙ) est arithmétique de raison r = 5 et de premier terme u₀ = −2.",
        },
        {
          type: "example",
          title: "Exemple 2 — Limite d'une suite géométrique",
          steps: [
            "Soit uₙ = 4 × (2/3)ⁿ. Déterminons sa limite.",
            "La raison est q = 2/3, et l'on a −1 < 2/3 < 1.",
            "D'après les limites de référence, (2/3)ⁿ → 0 quand n → +∞.",
            "Donc uₙ = 4 × (2/3)ⁿ → 4 × 0.",
          ],
          answer: "lim uₙ = 0 : la suite converge vers 0.",
        },
        {
          type: "example",
          title: "Exemple 3 — Suite arithmético-géométrique complète",
          steps: [
            "Soit u₀ = 5 et uₙ₊₁ = ½·uₙ + 1. Étudions sa limite.",
            "Point fixe : ℓ = ½·ℓ + 1 donne ½·ℓ = 1, soit ℓ = 2.",
            "On pose vₙ = uₙ − 2. Alors vₙ₊₁ = uₙ₊₁ − 2 = ½·uₙ + 1 − 2 = ½·(uₙ − 2) = ½·vₙ.",
            "Donc (vₙ) est géométrique de raison ½, avec v₀ = u₀ − 2 = 3. D'où vₙ = 3·(½)ⁿ.",
            "On revient à uₙ = vₙ + 2 = 2 + 3·(½)ⁿ. Comme −1 < ½ < 1, (½)ⁿ → 0.",
          ],
          answer: "lim uₙ = 2 : la suite converge vers 2. (Cet exercice est disponible en version interactive dans la rubrique « S'entraîner ».)",
        },
      ],
    },

    // ————————————————————————————————— Pièges
    {
      id: "pieges",
      title: "Pièges fréquents",
      blocks: [
        {
          type: "callout",
          variant: "pitfall",
          title: "Les erreurs qui coûtent des points au bac",
          items: [
            "Conclure « la limite est ℓ » à partir du point fixe ℓ = a·ℓ + b SANS avoir prouvé que la suite converge : cette équation ne donne que la limite possible.",
            "Utiliser le quotient uₙ₊₁ / uₙ pour le sens de variation alors que les termes ne sont pas tous positifs.",
            "Appliquer la formule de somme géométrique S = premier × (1 − q^n)/(1 − q) dans le cas q = 1 (division par zéro !). Si q = 1, la somme vaut simplement n × premier terme.",
            "Écrire directement « ∞ − ∞ = 0 » ou « ∞ / ∞ = 1 » : ce sont des formes indéterminées, jamais un résultat.",
            "Confondre uₙ (un nombre) et (uₙ) (la suite entière) dans la rédaction.",
            "Oublier de préciser le premier terme et la raison quand on identifie une suite arithmétique ou géométrique.",
          ],
        },
      ],
    },

    // ————————————————————————————————— Conseils examen
    {
      id: "conseils-examen",
      title: "Conseils pour réussir l'examen",
      blocks: [
        {
          type: "list",
          items: [
            "Lis toute la question : les parties d'un problème de suites s'enchaînent, et la question 2 utilise souvent le résultat de la question 1.",
            "Rédige tes calculs de uₙ₊₁ − uₙ ou uₙ₊₁ / uₙ proprement : c'est là qu'on gagne les points « méthode ».",
            "Quand tu poses une suite auxiliaire, annonce-la clairement : « Posons vₙ = uₙ − ℓ ».",
            "Justifie toujours l'existence d'une limite avant de la calculer par passage à la limite dans la relation de récurrence.",
            "Vérifie la cohérence de ton résultat : une suite décroissante minorée ne peut pas tendre vers +∞.",
            "Garde les limites de référence et les quatre formes indéterminées en mémoire : elles reviennent à chaque sujet.",
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
            "Une suite (uₙ) est une liste ordonnée de réels, définie de façon explicite (uₙ = f(n)) ou par récurrence (uₙ₊₁ = f(uₙ)).",
            "Arithmétique : uₙ₊₁ = uₙ + r, terme général uₙ = u₀ + n·r.",
            "Géométrique : uₙ₊₁ = q·uₙ, terme général uₙ = u₀·qⁿ.",
            "Sens de variation : signe de uₙ₊₁ − uₙ (méthode par défaut).",
            "Convergence : une suite croissante majorée (ou décroissante minorée) converge.",
            "Suite géométrique qⁿ : converge vers 0 si |q| < 1, tend vers +∞ si q > 1.",
            "Arithmético-géométrique uₙ₊₁ = a·uₙ + b : point fixe ℓ, puis vₙ = uₙ − ℓ géométrique de raison a.",
          ],
        },
      ],
    },

    // ————————————————————————————————— Fiche de révision
    {
      id: "fiche-revision",
      title: "Fiche de révision express",
      blocks: [
        {
          type: "table",
          head: ["Notion", "Formule / réflexe"],
          rows: [
            ["Arithmétique — terme général", "uₙ = u₀ + n·r"],
            ["Arithmétique — somme", "S = (n) × (premier + dernier) / 2"],
            ["Géométrique — terme général", "uₙ = u₀ · qⁿ"],
            ["Géométrique — somme (q ≠ 1)", "S = premier × (1 − q^(nb)) / (1 − q)"],
            ["Variation", "signe de uₙ₊₁ − uₙ"],
            ["Limite de qⁿ", "0 si |q| < 1, +∞ si q > 1"],
            ["Formes indéterminées", "∞ − ∞, 0 × ∞, ∞/∞, 0/0"],
            ["Convergence garantie", "monotone + bornée"],
            ["uₙ₊₁ = a·uₙ + b", "ℓ = a·ℓ + b, puis vₙ = uₙ − ℓ"],
          ],
        },
      ],
    },

    // ————————————————————————————————— Exercices
    {
      id: "exercices",
      title: "Exercices d'entraînement",
      blocks: [
        {
          type: "steps",
          title: "Niveau 1 — Application directe",
          items: [
            "Soit uₙ = 3n + 1. Montre que (uₙ) est arithmétique et précise sa raison. (Réponse : r = 3.)",
            "Soit uₙ = 2 × 3ⁿ. Montre que (uₙ) est géométrique et précise sa raison. (Réponse : q = 3.)",
            "Calcule la limite de uₙ = 7 × (1/4)ⁿ. (Réponse : 0.)",
          ],
        },
        {
          type: "steps",
          title: "Niveau 2 — Un peu de méthode",
          items: [
            "Étudie le sens de variation de uₙ = n² − 4n. (Indice : calcule uₙ₊₁ − uₙ = 2n − 3.)",
            "Calcule la limite de uₙ = (2n + 1) / (n + 3). (Réponse : 2.)",
            "Encadre uₙ = cos(n)/n puis détermine sa limite. (Réponse : 0, par les gendarmes.)",
          ],
        },
        {
          type: "steps",
          title: "Niveau 3 — Vers le bac",
          items: [
            "Soit u₀ = 0 et uₙ₊₁ = (1/3)·uₙ + 2. Détermine le point fixe, montre que vₙ = uₙ − 3 est géométrique, puis conclus sur la limite. (Réponse : ℓ = 3, raison 1/3, limite 3.)",
            "Une population de 10 000 individus croît de 4 % par an. Exprime le nombre uₙ après n années et calcule sa nature. (Réponse : géométrique de raison 1,04.)",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Passe à la pratique guidée",
          items: [
            "Pour t'entraîner avec des indices progressifs et le tuteur socratique, ouvre l'exercice interactif « Limite d'une suite arithmético-géométrique » dans la rubrique S'entraîner.",
          ],
        },
      ],
    },

    // ————————————————————————————————— Questions type Bac
    {
      id: "questions-bac",
      title: "Questions type Bac",
      blocks: [
        {
          type: "p",
          text: "Voici la trame d'un exercice de suites tel qu'on le rencontre à l'examen national. Entraîne-toi à le rédiger entièrement.",
        },
        {
          type: "steps",
          items: [
            "On considère la suite définie par u₀ = 1 et uₙ₊₁ = (1/2)·uₙ + 3. Calcule u₁ et u₂.",
            "Montre que la suite (vₙ) définie par vₙ = uₙ − 6 est géométrique ; précise sa raison et son premier terme.",
            "Exprime vₙ puis uₙ en fonction de n.",
            "Étudie le sens de variation de la suite (uₙ).",
            "Détermine la limite de (uₙ) et interprète le résultat.",
          ],
        },
        {
          type: "callout",
          variant: "key",
          title: "Corrigé synthétique",
          items: [
            "u₁ = 3,5 et u₂ = 4,75.",
            "vₙ₊₁ = ½·vₙ, donc (vₙ) est géométrique de raison ½ avec v₀ = −5.",
            "vₙ = −5·(½)ⁿ, donc uₙ = 6 − 5·(½)ⁿ.",
            "(½)ⁿ décroît, donc −5·(½)ⁿ croît : (uₙ) est croissante.",
            "Comme (½)ⁿ → 0, on obtient lim uₙ = 6.",
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
              q: "Une suite vérifie uₙ₊₁ = uₙ − 4. De quel type est-elle ?",
              options: ["Géométrique de raison −4", "Arithmétique de raison −4", "Arithmético-géométrique", "Aucune des trois"],
              answer: 1,
              explain: "On ajoute toujours −4 pour passer d'un terme au suivant : la suite est arithmétique de raison r = −4.",
            },
            {
              q: "Quelle est la limite de la suite uₙ = (3/5)ⁿ ?",
              options: ["+∞", "1", "0", "3/5"],
              answer: 2,
              explain: "La raison q = 3/5 vérifie −1 < q < 1, donc qⁿ → 0.",
            },
            {
              q: "Pour une suite arithmético-géométrique uₙ₊₁ = a·uₙ + b, la suite auxiliaire vₙ = uₙ − ℓ est géométrique de raison :",
              options: ["b", "ℓ", "a", "a + b"],
              answer: 2,
              explain: "En calculant vₙ₊₁, on trouve toujours vₙ₊₁ = a·vₙ : la raison est le coefficient a.",
            },
            {
              q: "Laquelle de ces écritures est une forme indéterminée ?",
              options: ["0 + ∞", "∞ × ∞", "∞ − ∞", "1 / ∞"],
              answer: 2,
              explain: "« ∞ − ∞ » est une des quatre formes indéterminées : on ne peut pas conclure sans transformer l'expression.",
            },
            {
              q: "Quel théorème garantit qu'une suite croissante et majorée possède une limite ?",
              options: ["Le théorème des gendarmes", "Le théorème de la convergence monotone", "Le théorème de comparaison", "La formule du terme général"],
              answer: 1,
              explain: "Toute suite croissante et majorée converge : c'est le théorème de la convergence monotone (il prouve l'existence de la limite, pas sa valeur).",
            },
          ],
        },
      ],
    },

    // ————————————————————————————————— Mots-clés
    {
      id: "mots-cles",
      title: "Mots-clés à retenir",
      blocks: [
        {
          type: "keywords",
          items: [
            { term: "Terme général", def: "l'expression de uₙ en fonction de n." },
            { term: "Raison", def: "le pas d'une suite : r (on ajoute) pour l'arithmétique, q (on multiplie) pour la géométrique." },
            { term: "Récurrence", def: "définition d'un terme à partir du précédent : uₙ₊₁ = f(uₙ)." },
            { term: "Convergence", def: "la suite se rapproche d'un réel fini ℓ quand n → +∞." },
            { term: "Majorant / minorant", def: "un réel qui reste au-dessus / en dessous de tous les termes." },
            { term: "Point fixe", def: "solution de ℓ = f(ℓ) ; limite éventuelle d'une suite récurrente." },
            { term: "Forme indéterminée", def: "combinaison de limites (∞−∞, 0×∞, ∞/∞, 0/0) qui exige une transformation." },
            { term: "Suite auxiliaire", def: "suite vₙ construite pour se ramener à un modèle connu (souvent géométrique)." },
          ],
        },
      ],
    },
  ],
};
