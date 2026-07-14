// Contenu pédagogique de démonstration (en attendant Prisma/Neon — Étape 4).
// Chaque exercice est rédigé dans sa langue naturelle avec ses 5 niveaux
// d'indices, sa correction complète et un dialogue socratique authoré.
// Ce contenu alimente à la fois l'échelle d'indices et le tuteur socratique.

import type { Exercise } from "./types";

export const DEMO_EXERCISES: Exercise[] = [
  // ————————————————————————————————————————————————————————————————
  // 1. Mathématiques — Suites numériques (2BAC) — FR
  // ————————————————————————————————————————————————————————————————
  {
    id: "math-suites-arithgeo-1",
    slug: "suite-arithmetico-geometrique-limite",
    language: "fr",
    subjectId: "math",
    levelId: "2bac",
    streamId: "2bac-pc",
    chapter: "Suites numériques",
    title: "Limite d'une suite arithmético-géométrique",
    difficulty: "moyen",
    estimatedMin: 20,
    statement:
      "On considère la suite (uₙ) définie par u₀ = 5 et, pour tout entier naturel n, " +
      "uₙ₊₁ = ½·uₙ + 1.\n\n" +
      "1) Calculer u₁ et u₂.\n" +
      "2) On pose vₙ = uₙ − 2. Montrer que (vₙ) est une suite géométrique dont on précisera la raison et le premier terme.\n" +
      "3) Exprimer uₙ en fonction de n, puis déterminer la limite de la suite (uₙ).",
    hints: [
      {
        kind: "comprendre",
        text: "La suite est définie par récurrence : chaque terme se calcule à partir du précédent. On cherche vers quelle valeur elle se stabilise lorsque n devient très grand.",
      },
      {
        kind: "chapitre",
        text: "Chapitre « Suites numériques ». La forme uₙ₊₁ = a·uₙ + b caractérise une suite arithmético-géométrique : on la ramène à une suite géométrique auxiliaire.",
      },
      {
        kind: "piste",
        text: "Cherche d'abord la valeur limite possible ℓ en résolvant ℓ = ½·ℓ + 1. Puis observe la suite vₙ = uₙ − ℓ : elle devrait être géométrique.",
      },
      {
        kind: "formule",
        text: "Une suite géométrique de raison q vérifie vₙ₊₁ = q·vₙ et a pour terme général vₙ = v₀·qⁿ. De plus, si |q| < 1 alors qⁿ → 0 quand n → +∞.",
      },
      {
        kind: "premiere-etape",
        text: "Calcule vₙ₊₁ = uₙ₊₁ − 2 = (½·uₙ + 1) − 2 = ½·uₙ − 1 = ½·(uₙ − 2) = ½·vₙ. Donc (vₙ) est géométrique de raison ½.",
      },
    ],
    correction: [
      "1) u₁ = ½·5 + 1 = 3,5 et u₂ = ½·3,5 + 1 = 2,75.",
      "2) La limite éventuelle ℓ vérifie ℓ = ½·ℓ + 1, d'où ℓ = 2. On pose vₙ = uₙ − 2.",
      "vₙ₊₁ = uₙ₊₁ − 2 = ½·uₙ + 1 − 2 = ½·(uₙ − 2) = ½·vₙ. Donc (vₙ) est géométrique de raison q = ½, de premier terme v₀ = u₀ − 2 = 3.",
      "3) vₙ = 3·(½)ⁿ, donc uₙ = 2 + 3·(½)ⁿ.",
      "Comme |½| < 1, (½)ⁿ → 0 quand n → +∞, donc uₙ → 2. La suite (uₙ) converge vers 2.",
    ],
    socratic: [
      {
        id: "s1",
        question:
          "Cette suite est définie par récurrence : uₙ₊₁ dépend de uₙ. En observant la forme uₙ₊₁ = a·uₙ + b, quel chapitre du programme reconnais-tu ?",
        keywords: ["suite", "suites", "géométrique", "geometrique", "arithmético", "arithmetico"],
        onCorrect: "Exactement — on est dans les suites numériques, et plus précisément les suites arithmético-géométriques.",
        escalation: [
          "Regarde la forme uₙ₊₁ = a·uₙ + b : elle appartient à une famille de suites bien précise vue en cours.",
          "C'est le chapitre des suites numériques, catégorie « arithmético-géométrique » (de la forme uₙ₊₁ = a·uₙ + b).",
        ],
        reveal: "Chapitre : Suites numériques — suite arithmético-géométrique.",
      },
      {
        id: "s2",
        question:
          "Si la suite converge vers une limite ℓ, cette limite est stable par la relation de récurrence. Quelle équation ℓ doit-elle vérifier ?",
        keywords: ["½", "1/2", "0.5", "0,5", "point fixe", "= 2", "ℓ = 2", "l = 2"],
        onCorrect: "Oui : ℓ = ½·ℓ + 1, ce qui donne ℓ = 2.",
        escalation: [
          "Remplace uₙ et uₙ₊₁ par ℓ dans la relation uₙ₊₁ = ½·uₙ + 1.",
          "Tu obtiens ℓ = ½·ℓ + 1, donc ½·ℓ = 1, donc ℓ = 2.",
        ],
        reveal: "La limite éventuelle vérifie ℓ = ½·ℓ + 1, d'où ℓ = 2.",
      },
      {
        id: "s3",
        question:
          "Pour prouver la convergence, on fabrique une suite auxiliaire géométrique. Que proposes-tu de poser à partir de la limite trouvée ?",
        keywords: ["uₙ - 2", "un - 2", "un-2", "u - 2", "vn = un - 2", "− 2", "- 2"],
        onCorrect: "Parfait : vₙ = uₙ − 2.",
        escalation: [
          "Retire la limite à chaque terme : pose vₙ = uₙ − (la limite trouvée).",
          "Pose vₙ = uₙ − 2.",
        ],
        reveal: "On pose vₙ = uₙ − 2.",
      },
      {
        id: "s4",
        question:
          "Calcule vₙ₊₁ en fonction de vₙ. Quelle est alors la raison de cette suite géométrique ?",
        keywords: ["½", "1/2", "0.5", "0,5", "un demi", "raison"],
        onCorrect: "Oui, la raison est ½.",
        escalation: [
          "vₙ₊₁ = uₙ₊₁ − 2 = ½·uₙ + 1 − 2. Factorise par ½.",
          "vₙ₊₁ = ½·(uₙ − 2) = ½·vₙ. La raison est donc ½.",
        ],
        reveal: "vₙ₊₁ = ½·vₙ : (vₙ) est géométrique de raison ½, avec v₀ = 3.",
      },
      {
        id: "s5",
        question:
          "Déduis-en le terme général uₙ, puis la limite. Vers quelle valeur tend la suite ?",
        keywords: ["2", "vers 2", "converge", "limite 2"],
        onCorrect: "Bravo — la suite converge vers 2.",
        escalation: [
          "vₙ = 3·(½)ⁿ donc uₙ = 2 + 3·(½)ⁿ. Que devient (½)ⁿ quand n → +∞ ?",
          "(½)ⁿ → 0 car |½| < 1, donc uₙ → 2.",
        ],
        reveal: "uₙ = 2 + 3·(½)ⁿ → 2 : la suite converge vers 2.",
      },
    ],
    reflection: [
      {
        question: "Pourquoi le fait de poser vₙ = uₙ − 2 fonctionne-t-il si bien ?",
        modelAnswer:
          "En retranchant la limite, on élimine la constante « +1 » et on fait apparaître une suite géométrique pure, dont on sait calculer le terme général et la limite.",
      },
      {
        question: "Existe-t-il une autre méthode pour établir la convergence ?",
        modelAnswer:
          "Oui : montrer que (uₙ) est décroissante et minorée par 2, donc convergente (théorème de la convergence monotone), puis passer à la limite dans la relation de récurrence.",
      },
      {
        question: "Quelle est l'erreur la plus fréquente sur ce type d'exercice ?",
        modelAnswer:
          "Écrire « la limite est 2 » à partir de ℓ = ½·ℓ + 1 sans avoir prouvé que la suite converge : cette équation ne donne que la limite POSSIBLE, encore faut-il justifier la convergence.",
      },
    ],
    relatedExamId: "cnee-2024-pc-math-n",
  },

  // ————————————————————————————————————————————————————————————————
  // 2. Physique-Chimie — Chute libre / énergie mécanique (2BAC) — FR
  // ————————————————————————————————————————————————————————————————
  {
    id: "pc-chute-libre-energie-1",
    slug: "chute-libre-energie-mecanique",
    language: "fr",
    subjectId: "pc",
    levelId: "2bac",
    streamId: "2bac-pc",
    chapter: "Chute libre et énergie mécanique",
    title: "Vitesse d'arrivée au sol en chute libre",
    difficulty: "facile",
    estimatedMin: 15,
    statement:
      "Un solide de masse m = 0,5 kg est lâché sans vitesse initiale d'une hauteur h = 20 m " +
      "au-dessus du sol. Les frottements de l'air sont négligés et on prend g = 10 m/s².\n\n" +
      "Déterminer la vitesse v du solide juste avant qu'il ne touche le sol.",
    hints: [
      {
        kind: "comprendre",
        text: "Un objet tombe en chute libre (sans frottement) depuis 20 m. On cherche sa vitesse à l'instant où il atteint le sol.",
      },
      {
        kind: "chapitre",
        text: "Chapitre « Chute libre / Énergie mécanique ». Deux outils sont possibles : les équations du mouvement, ou la conservation de l'énergie mécanique (plus rapide ici, car on ne demande pas le temps).",
      },
      {
        kind: "piste",
        text: "Sans frottement, l'énergie mécanique se conserve : l'énergie potentielle de pesanteur du départ se transforme intégralement en énergie cinétique à l'arrivée.",
      },
      {
        kind: "formule",
        text: "Énergie cinétique Ec = ½·m·v² ; énergie potentielle de pesanteur Epp = m·g·h. Conservation : Ec(sol) = Epp(départ).",
      },
      {
        kind: "premiere-etape",
        text: "Écris ½·m·v² = m·g·h. La masse se simplifie des deux côtés : v² = 2·g·h.",
      },
    ],
    correction: [
      "Système : le solide dans le champ de pesanteur. Les frottements étant négligés, l'énergie mécanique Em = Ec + Epp se conserve.",
      "Au départ (hauteur h, lâché sans vitesse) : Ec₀ = 0 et Epp₀ = m·g·h.",
      "Juste avant le sol (h = 0) : Epp = 0 et Ec = ½·m·v².",
      "Conservation : ½·m·v² = m·g·h. La masse se simplifie : v² = 2·g·h.",
      "Application numérique : v = √(2 × 10 × 20) = √400 = 20 m/s.",
    ],
    socratic: [
      {
        id: "s1",
        question:
          "L'objet tombe sans frottement. Quel principe physique relie la hauteur de départ à la vitesse d'arrivée, sans avoir à calculer le temps de chute ?",
        keywords: ["énergie", "energie", "mécanique", "mecanique", "conservation"],
        onCorrect: "Oui — la conservation de l'énergie mécanique.",
        escalation: [
          "Sans frottement, une certaine grandeur reste constante pendant toute la chute. Laquelle ?",
          "C'est l'énergie mécanique qui se conserve : Em = Ec + Epp = constante.",
        ],
        reveal: "Sans frottement, l'énergie mécanique Em = Ec + Epp se conserve.",
      },
      {
        id: "s2",
        question:
          "Au moment où on lâche l'objet, que valent son énergie cinétique Ec et son énergie potentielle Epp ?",
        keywords: ["ec = 0", "ec=0", "0", "mgh", "m g h", "m·g·h", "potentielle"],
        onCorrect: "Exact : Ec = 0 (lâché sans vitesse) et Epp = m·g·h.",
        escalation: [
          "« Lâché sans vitesse initiale » te renseigne directement sur Ec au départ.",
          "Ec₀ = 0 (car v = 0) et Epp₀ = m·g·h.",
        ],
        reveal: "Au départ : Ec = 0 et Epp = m·g·h.",
      },
      {
        id: "s3",
        question: "Et juste avant de toucher le sol (h = 0), que deviennent ces deux énergies ?",
        keywords: ["epp = 0", "epp=0", "0", "½mv", "1/2 m v", "cinétique", "cinetique"],
        onCorrect: "Oui : Epp = 0 et toute l'énergie est devenue cinétique, Ec = ½·m·v².",
        escalation: [
          "À h = 0, que vaut l'énergie potentielle de pesanteur ?",
          "Au sol : Epp = 0 et Ec = ½·m·v².",
        ],
        reveal: "Au sol : Epp = 0 et Ec = ½·m·v².",
      },
      {
        id: "s4",
        question: "Écris l'égalité de conservation entre le départ et l'arrivée, puis simplifie-la.",
        keywords: ["v² = 2gh", "v2 = 2gh", "2gh", "2 g h", "2·g·h", "racine"],
        onCorrect: "Parfait : v² = 2·g·h.",
        escalation: [
          "Em(départ) = Em(arrivée) donne m·g·h = ½·m·v².",
          "La masse se simplifie : v² = 2·g·h.",
        ],
        reveal: "m·g·h = ½·m·v² ⟹ v² = 2·g·h.",
      },
      {
        id: "s5",
        question: "Application numérique avec g = 10 m/s² et h = 20 m : combien vaut v ?",
        keywords: ["20", "20 m/s", "√400", "racine 400"],
        onCorrect: "Bravo : v = 20 m/s.",
        escalation: [
          "v = √(2 × 10 × 20).",
          "v = √400 = 20 m/s.",
        ],
        reveal: "v = √(2 × 10 × 20) = √400 = 20 m/s.",
      },
    ],
    reflection: [
      {
        question: "Pourquoi la masse n'apparaît-elle pas dans le résultat final ?",
        modelAnswer:
          "Parce qu'elle se simplifie des deux côtés de m·g·h = ½·m·v². La vitesse acquise en chute libre ne dépend pas de la masse (résultat de Galilée).",
      },
      {
        question: "Existe-t-il une autre méthode que l'énergie ?",
        modelAnswer:
          "Oui, la cinématique : de v = g·t et h = ½·g·t², on élimine t pour retrouver v² = 2·g·h, donc le même résultat de 20 m/s.",
      },
      {
        question: "Quelle est l'erreur fréquente ?",
        modelAnswer:
          "Oublier que l'énergie cinétique de départ est nulle, ou croire qu'un objet plus lourd arrive plus vite au sol.",
      },
    ],
    relatedExamId: "cnee-2024-pc-pc-n",
  },

  // ————————————————————————————————————————————————————————————————
  // 3. Mathématiques — Dérivation et variations (2BAC) — FR
  // ————————————————————————————————————————————————————————————————
  {
    id: "math-derivation-variations-1",
    slug: "etude-variations-fonction-cubique",
    language: "fr",
    subjectId: "math",
    levelId: "2bac",
    streamId: "2bac-sma",
    chapter: "Dérivation et étude des variations",
    title: "Variations et extrema d'une fonction cubique",
    difficulty: "moyen",
    estimatedMin: 20,
    statement:
      "Soit f la fonction définie sur ℝ par f(x) = x³ − 3x + 2.\n\n" +
      "Étudier les variations de f sur ℝ et déterminer ses extrema locaux (nature et valeurs).",
    hints: [
      {
        kind: "comprendre",
        text: "On veut savoir sur quels intervalles la fonction monte, sur lesquels elle descend, et repérer ses sommets (maximum et minimum locaux).",
      },
      {
        kind: "chapitre",
        text: "Chapitre « Dérivation et étude des variations ». Le signe de la dérivée f'(x) donne le sens de variation de f.",
      },
      {
        kind: "piste",
        text: "Calcule f'(x), puis étudie son signe. Les valeurs de x où f'(x) = 0 sont les candidats pour les extrema.",
      },
      {
        kind: "formule",
        text: "Règle : (xⁿ)' = n·xⁿ⁻¹. La fonction f est croissante là où f'(x) > 0 et décroissante là où f'(x) < 0.",
      },
      {
        kind: "premiere-etape",
        text: "f'(x) = 3x² − 3 = 3(x² − 1) = 3(x − 1)(x + 1). Il reste à étudier le signe de ce produit.",
      },
    ],
    correction: [
      "f est dérivable sur ℝ et f'(x) = 3x² − 3.",
      "Factorisation : f'(x) = 3(x² − 1) = 3(x − 1)(x + 1). Donc f'(x) = 0 ⟺ x = −1 ou x = 1.",
      "Signe de f' : f'(x) > 0 sur ]−∞, −1[ ∪ ]1, +∞[ et f'(x) < 0 sur ]−1, 1[.",
      "Variations : f est croissante sur ]−∞, −1], décroissante sur [−1, 1], croissante sur [1, +∞[.",
      "Extrema : maximum local en x = −1 avec f(−1) = 4 ; minimum local en x = 1 avec f(1) = 0.",
    ],
    socratic: [
      {
        id: "s1",
        question:
          "Pour déterminer le sens de variation d'une fonction dérivable, quel outil du programme utilise-t-on ?",
        keywords: ["dérivée", "derivee", "dérivation", "derivation", "signe", "f'"],
        onCorrect: "Oui — la dérivée et l'étude de son signe.",
        escalation: [
          "Le sens de variation est lié au signe d'une fonction associée à f.",
          "On étudie le signe de la dérivée f'(x).",
        ],
        reveal: "On étudie le signe de la dérivée f'.",
      },
      {
        id: "s2",
        question: "Calcule f'(x) pour f(x) = x³ − 3x + 2.",
        keywords: ["3x² - 3", "3x²-3", "3x2-3", "3x^2-3", "3x² − 3", "3x2 - 3"],
        onCorrect: "Exact : f'(x) = 3x² − 3.",
        escalation: [
          "Dérive terme à terme : (x³)' = 3x², (−3x)' = −3, (2)' = 0.",
          "f'(x) = 3x² − 3.",
        ],
        reveal: "f'(x) = 3x² − 3.",
      },
      {
        id: "s3",
        question: "Factorise f'(x) et trouve les valeurs de x où elle s'annule.",
        keywords: ["x = 1", "x = -1", "x=1", "x=-1", "(x-1)(x+1)", "x²-1", "-1", "1"],
        onCorrect: "Oui : f'(x) = 3(x − 1)(x + 1), qui s'annule en −1 et 1.",
        escalation: [
          "Mets 3 en facteur : f'(x) = 3(x² − 1), puis reconnais une identité remarquable.",
          "3(x − 1)(x + 1) = 0 ⟺ x = −1 ou x = 1.",
        ],
        reveal: "f'(x) = 3(x − 1)(x + 1), qui s'annule en x = −1 et x = 1.",
      },
      {
        id: "s4",
        question: "Quel est le signe de f'(x) sur chaque intervalle, et donc les variations de f ?",
        keywords: ["croissante", "décroissante", "decroissante", "positive", "négative", "negative"],
        onCorrect: "Parfait : f est croissante, puis décroissante, puis croissante.",
        escalation: [
          "Un produit (x − 1)(x + 1) est positif à l'extérieur des racines et négatif entre elles.",
          "f' > 0 sur ]−∞, −1[ et ]1, +∞[ (f croissante) ; f' < 0 sur ]−1, 1[ (f décroissante).",
        ],
        reveal: "f croissante sur ]−∞, −1], décroissante sur [−1, 1], croissante sur [1, +∞[.",
      },
      {
        id: "s5",
        question: "Conclus : où se situent les extrema et quelles sont leurs valeurs ?",
        keywords: ["maximum", "minimum", "4", "0"],
        onCorrect: "Bravo : maximum local 4 en x = −1, minimum local 0 en x = 1.",
        escalation: [
          "Un maximum apparaît là où f passe de croissante à décroissante ; un minimum au changement inverse. Calcule f(−1) et f(1).",
          "Maximum local : f(−1) = 4 ; minimum local : f(1) = 0.",
        ],
        reveal: "Maximum local en x = −1 (f = 4) ; minimum local en x = 1 (f = 0).",
      },
    ],
    reflection: [
      {
        question: "Pourquoi les points où f'(x) = 0 sont-ils déterminants ?",
        modelAnswer:
          "Ce sont les seuls points où une fonction dérivable peut changer de sens de variation ; les extrema locaux s'y trouvent, lorsque f' s'y annule EN changeant de signe.",
      },
      {
        question: "Un point où f'(x) = 0 est-il toujours un extremum ?",
        modelAnswer:
          "Non. Si f' ne change pas de signe (par exemple f(x) = x³ en 0), il s'agit d'un point d'inflexion à tangente horizontale, pas d'un extremum.",
      },
      {
        question: "Quelle est l'erreur fréquente ?",
        modelAnswer:
          "Conclure à un extremum dès que f'(x) = 0, sans vérifier le CHANGEMENT de signe de la dérivée.",
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————
  // 4. Mathématiques — Le second degré (1BAC) — AR
  // ————————————————————————————————————————————————————————————————
  {
    id: "math-second-degre-ar-1",
    slug: "second-degre-equation-signe",
    language: "ar",
    subjectId: "math",
    levelId: "1bac",
    streamId: "1bac-se",
    chapter: "الحدودية من الدرجة الثانية",
    title: "حل معادلة من الدرجة الثانية ودراسة إشارة الحدودية",
    difficulty: "facile",
    estimatedMin: 15,
    statement:
      "حُلَّ في المجموعة ℝ المعادلة التالية: x² − 5x + 6 = 0.\n\n" +
      "ثم ادرس إشارة الحدودية f(x) = x² − 5x + 6 على المجموعة ℝ.",
    hints: [
      {
        kind: "comprendre",
        text: "المطلوب أولاً إيجاد قيم x التي تجعل الحدودية تنعدم (تساوي 0)، ثم معرفة متى تكون f(x) موجبة ومتى تكون سالبة.",
      },
      {
        kind: "chapitre",
        text: "الدرس: الحدودية من الدرجة الثانية والمعادلات من الدرجة الثانية.",
      },
      {
        kind: "piste",
        text: "احسب المميز Δ = b² − 4ac لمعرفة عدد الحلول، ثم استعمل قاعدة إشارة الحدودية من الدرجة الثانية.",
      },
      {
        kind: "formule",
        text: "المميز Δ = b² − 4ac. إذا كان Δ > 0 فالحلان: x = (−b ± √Δ)/(2a). الحدودية تأخذ إشارة a خارج الجذرين وإشارة معاكسة لـ a بينهما.",
      },
      {
        kind: "premiere-etape",
        text: "هنا a = 1، b = −5، c = 6، إذن Δ = (−5)² − 4×1×6 = 25 − 24 = 1.",
      },
    ],
    correction: [
      "المميز: Δ = b² − 4ac = (−5)² − 4×1×6 = 25 − 24 = 1 > 0، إذن للمعادلة حلان مختلفان.",
      "الحلان: x₁ = (5 − 1)/2 = 2 و x₂ = (5 + 1)/2 = 3.",
      "التعميل: f(x) = (x − 2)(x − 3).",
      "الإشارة: بما أن a = 1 > 0، فإن f(x) > 0 خارج المجال [2 ، 3]، و f(x) < 0 على المجال ]2 ، 3[، وتنعدم عند x = 2 و x = 3.",
    ],
    socratic: [
      {
        id: "s1",
        question: "لدينا معادلة من الدرجة الثانية. ما هو أول مقدار نحسبه لمعرفة عدد الحلول؟",
        keywords: ["المميز", "مميز", "delta", "Δ", "b²-4ac", "b2-4ac"],
        onCorrect: "أحسنت — إنه المميز Δ.",
        escalation: [
          "نحسب مقداراً يُرمز له بالرمز Δ ويخبرنا بعدد حلول المعادلة.",
          "إنه المميز Δ = b² − 4ac.",
        ],
        reveal: "نبدأ بحساب المميز Δ = b² − 4ac.",
      },
      {
        id: "s2",
        question: "حدِّد قيم a و b و c ثم احسب Δ.",
        keywords: ["1", "25", "24", "Δ = 1", "delta = 1", "25 - 24"],
        onCorrect: "صحيح: Δ = 25 − 24 = 1.",
        escalation: [
          "لدينا a = 1، b = −5، c = 6. عوّض في b² − 4ac.",
          "Δ = (−5)² − 4×1×6 = 25 − 24 = 1.",
        ],
        reveal: "a = 1، b = −5، c = 6، ومنه Δ = 1 > 0.",
      },
      {
        id: "s3",
        question: "بما أن Δ > 0، ما هي صيغة الحلين؟ احسبهما.",
        keywords: ["2", "3", "x = 2", "x = 3", "x=2", "x=3"],
        onCorrect: "ممتاز: x₁ = 2 و x₂ = 3.",
        escalation: [
          "الحلان يُعطيان بالصيغة x = (−b ± √Δ)/(2a) = (5 ± 1)/2.",
          "x₁ = (5 − 1)/2 = 2 و x₂ = (5 + 1)/2 = 3.",
        ],
        reveal: "الحلان هما x = 2 و x = 3.",
      },
      {
        id: "s4",
        question: "الآن ادرس إشارة f(x). ما إشارتها خارج المجال [2 ، 3]، وما إشارتها داخله؟",
        keywords: ["موجبة", "سالبة", "موجب", "سالب"],
        onCorrect: "أحسنت — الإشارة صحيحة.",
        escalation: [
          "الحدودية من الدرجة الثانية تأخذ إشارة a (موجبة هنا) خارج الجذرين.",
          "f(x) > 0 خارج [2 ، 3]، و f(x) < 0 داخل ]2 ، 3[.",
        ],
        reveal: "f(x) > 0 خارج [2 ، 3]، و f(x) < 0 على ]2 ، 3[، وتنعدم عند 2 و 3.",
      },
    ],
    reflection: [
      {
        question: "لماذا نحسب المميز Δ قبل كل شيء؟",
        modelAnswer:
          "لأن إشارة Δ تحدد عدد الحلول: حلان مختلفان إذا Δ > 0، حل مضاعف إذا Δ = 0، ولا حل حقيقي إذا Δ < 0.",
      },
      {
        question: "هل توجد طريقة أخرى لإيجاد الحلين دون حساب Δ؟",
        modelAnswer:
          "نعم، باستعمال المجموع والجداء: x₁ + x₂ = −b/a = 5 و x₁·x₂ = c/a = 6، فنبحث عن عددين مجموعهما 5 وجداؤهما 6 وهما 2 و 3.",
      },
      {
        question: "ما هو الخطأ الشائع في هذا التمرين؟",
        modelAnswer:
          "الخطأ في إشارة b عند حساب Δ (نسيان أن (−5)² = 25)، أو عكس قاعدة إشارة الحدودية بين الجذرين وخارجهما.",
      },
    ],
  },
];

// ————————————————————————————————————————————————————————————————
// Helpers de lecture (même esprit que features/exams/demo-data).
// ————————————————————————————————————————————————————————————————

export function getExercise(id: string): Exercise | undefined {
  return DEMO_EXERCISES.find((e) => e.id === id || e.slug === id);
}

export function filterExercises(filters: {
  levelId?: string;
  subjectId?: string;
  difficulty?: string;
}): Exercise[] {
  return DEMO_EXERCISES.filter(
    (e) =>
      (!filters.levelId || e.levelId === filters.levelId) &&
      (!filters.subjectId || e.subjectId === filters.subjectId) &&
      (!filters.difficulty || e.difficulty === filters.difficulty),
  );
}
