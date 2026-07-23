// Cours original « Limites et continuité » — 2BAC Sciences Mathématiques (A et B).
// Rédigé pour Qimma, conforme au cadre référentiel officiel de l'examen national
// (CNEE 2024). Version interactive du chapitre LaTeX
// cours/bac2/sciences-maths/mathematiques/01-limites-et-continuite.tex.

import type { Course } from "./types";

export const COURS_LIMITES_CONTINUITE_SM: Course = {
  slug: "limites-continuite-2bac-sm",
  language: "fr",
  subjectId: "math",
  levelId: "2bac",
  streamIds: ["2bac-sma", "2bac-smb"],
  chapter: "Limites et continuité",
  title: "Limites et continuité",
  pdfUrl: "/cours/pdf/01-limites-et-continuite.pdf",
  summary:
    "Le chapitre fondateur de l'analyse en Sciences Maths : définition formelle de la limite (en ε), toutes les méthodes de calcul, continuité et prolongement, théorème des valeurs intermédiaires avec la dichotomie, fonction réciproque et racine n-ième. Avec démonstrations, exercices type examen national et boîte à outils complète.",
  readingMin: 50,
  objectives: [
    "Manipuler la définition formelle (en ε) de la limite et l'utiliser dans des démonstrations simples.",
    "Calculer des limites en levant les formes indéterminées : terme dominant, conjugué, limites trigonométriques, encadrement avec la partie entière.",
    "Étudier la continuité en un point, sur un intervalle, et construire un prolongement par continuité.",
    "Exploiter le lien entre suites et continuité, notamment pour les suites récurrentes uₙ₊₁ = f(uₙ).",
    "Démontrer l'existence et l'unicité de solutions d'équations par le TVI, et encadrer une solution par dichotomie.",
    "Appliquer le théorème de la bijection et maîtriser la fonction racine n-ième et les puissances rationnelles.",
  ],
  sections: [
    // ————————————————————————————————— Définitions formelles
    {
      id: "definitions-formelles",
      title: "La notion de limite : définitions formelles",
      blocks: [
        {
          type: "p",
          text: "En Sciences Maths, on ne se contente pas de l'intuition « f(x) se rapproche de ℓ » : on exige une définition précise, avec des quantificateurs. C'est elle qui permet de démontrer les théorèmes du chapitre, et elle peut faire l'objet d'une question directe à l'examen.",
        },
        {
          type: "formula",
          label: "Définition (limite finie en un point)",
          expr: "lim f(x) = ℓ  ⟺  (∀ε>0)(∃α>0)(∀x∈D_f) : 0<|x−a|<α ⟹ |f(x)−ℓ|<ε",
        },
        {
          type: "p",
          text: "Autrement dit : on peut rendre f(x) aussi proche de ℓ que l'on veut (à ε près), à condition de prendre x suffisamment proche de a (à α près). Les définitions en ±∞ s'écrivent de la même façon en remplaçant les inégalités : par exemple, lim f(x) = +∞ en a signifie (∀A>0)(∃α>0) : 0<|x−a|<α ⟹ f(x)>A.",
        },
        {
          type: "example",
          title: "Utiliser la définition en ε (démonstration type)",
          steps: [
            "Montrons avec la définition que lim (3x − 1) = 5 quand x → 2.",
            "Soit ε > 0. On calcule |(3x − 1) − 5| = |3x − 6| = 3|x − 2|.",
            "On choisit α = ε/3.",
            "Alors 0 < |x − 2| < α entraîne |(3x − 1) − 5| = 3|x − 2| < 3α = ε.",
          ],
          answer: "La définition est vérifiée : lim (3x−1) = 5 quand x → 2.",
        },
        {
          type: "callout",
          variant: "key",
          title: "Unicité de la limite (démontrée par l'absurde)",
          items: [
            "Si f admet une limite en a, cette limite est unique.",
            "Idée de la preuve : si ℓ ≠ ℓ′ étaient deux limites, en prenant ε = |ℓ−ℓ′|/2, l'inégalité triangulaire donnerait |ℓ−ℓ′| ≤ |ℓ−f(x)| + |f(x)−ℓ′| < 2ε = |ℓ−ℓ′|, absurde.",
          ],
        },
        {
          type: "p",
          text: "Limites à droite et à gauche : lim f(x) = ℓ en a⁺ signifie que la condition est exigée seulement pour a < x < a+α (et symétriquement à gauche). La limite en a existe si et seulement si les limites à droite et à gauche existent et sont égales.",
        },
        {
          type: "callout",
          variant: "info",
          title: "La fonction partie entière E(x)",
          items: [
            "E(x) est l'unique entier tel que E(x) ≤ x < E(x)+1.",
            "En tout entier n : limite à gauche = n−1, limite à droite = n → pas de limite en n (et pas de continuité).",
            "Encadrement fondamental à retenir : x − 1 < E(x) ≤ x. C'est l'outil clé de toutes les limites avec E.",
          ],
        },
      ],
    },

    // ————————————————————————————————— Calcul des limites
    {
      id: "calcul-des-limites",
      title: "Calcul des limites : toutes les méthodes",
      blocks: [
        {
          type: "p",
          text: "Les opérations sur les limites (somme, produit, quotient, composée) fonctionnent tant qu'on ne tombe pas sur l'une des quatre formes indéterminées : « ∞ − ∞ », « 0 × ∞ », « ∞/∞ » et « 0/0 ». Face à une FI, chaque situation a sa méthode — les voici toutes.",
        },
        {
          type: "table",
          head: ["Situation", "Méthode"],
          rows: [
            ["Polynôme ou rationnelle en ±∞", "Termes de plus haut degré (factorisation)."],
            ["« 0/0 » avec des polynômes", "Factoriser la racine commune (x − a) en haut et en bas."],
            ["« ∞ − ∞ » ou « 0/0 » avec racines carrées", "Expression conjuguée (attention au signe de |x| en −∞)."],
            ["« 0/0 » trigonométrique en 0", "Se ramener à sin X/X → 1, tan X/X → 1, (1−cos X)/X² → 1/2."],
            ["« 0 × ∞ »", "Réécrire en quotient ou changement de variable t = 1/x."],
            ["Présence de E(x)", "Encadrement x−1 < E(x) ≤ x puis gendarmes."],
            ["Présence de cos, sin bornés", "Encadrer entre −1 et 1 puis gendarmes."],
            ["Racine n-ième en « 0/0 »", "Changement de variable t = ⁿ√x ou conjugué cubique a³−b³."],
          ],
        },
        {
          type: "callout",
          variant: "key",
          title: "Limites trigonométriques usuelles (démontrées par encadrement)",
          items: [
            "sin x / x → 1 quand x → 0 (via l'encadrement géométrique sin x < x < tan x).",
            "tan x / x → 1 quand x → 0.",
            "(1 − cos x) / x² → 1/2 quand x → 0 (via 1 − cos x = 2sin²(x/2)).",
          ],
        },
        {
          type: "example",
          title: "Rationnelle en l'infini : les trois cas",
          steps: [
            "Degrés égaux : lim (2x² − 5x + 1)/(3x² + 4) = lim 2x²/3x² = 2/3 en +∞.",
            "Degré du haut plus grand : lim (x³ + 1)/(x + 2) = lim x³/x = lim x² = +∞ en −∞.",
            "Degré du bas plus grand : lim (5x + 3)/(x² + 1) = lim 5/x = 0 en +∞.",
          ],
          answer: "En ±∞, une rationnelle a la limite du quotient de ses termes dominants.",
        },
        {
          type: "example",
          title: "Conjugué : lever « ∞ − ∞ » avec racine",
          steps: [
            "Calculons lim (√(x² + x) − x) quand x → +∞.",
            "On multiplie par le conjugué : √(x²+x) − x = [(x²+x) − x²] / [√(x²+x) + x] = x / [√(x²+x) + x].",
            "On factorise x au dénominateur (x > 0) : = 1 / [√(1 + 1/x) + 1].",
            "Quand x → +∞ : 1/x → 0, donc la limite vaut 1/(1+1) = 1/2.",
          ],
          answer: "lim (√(x²+x) − x) = 1/2 en +∞.",
        },
        {
          type: "callout",
          variant: "pitfall",
          title: "Le piège du signe en −∞",
          items: [
            "Pour x < 0 : √(x²) = |x| = −x (et PAS x). C'est le point le plus surveillé par les correcteurs.",
            "Exemple : lim (√(x²+1) + x) en −∞ : par conjugué, = 1/(√(x²+1) − x), dont le dénominateur → +∞, donc la limite vaut 0.",
          ],
        },
        {
          type: "example",
          title: "Limite avec la partie entière (niveau SM)",
          steps: [
            "Calculons lim x·E(1/x) quand x → 0⁺.",
            "Pour x > 0, l'encadrement 1/x − 1 < E(1/x) ≤ 1/x, multiplié par x > 0, donne :",
            "1 − x < x·E(1/x) ≤ 1.",
            "Quand x → 0⁺ : 1 − x → 1.",
          ],
          answer: "Par le théorème des gendarmes : lim x·E(1/x) = 1 en 0⁺.",
        },
        {
          type: "callout",
          variant: "key",
          title: "Théorèmes de comparaison et d'encadrement",
          items: [
            "Si f ≥ g et g → +∞, alors f → +∞ (comparaison).",
            "Gendarmes : si g ≤ f ≤ h et si g et h tendent vers la même limite finie ℓ, alors f → ℓ.",
            "Variante très utile : si |f − ℓ| ≤ g et g → 0, alors f → ℓ.",
          ],
        },
      ],
    },

    // ————————————————————————————————— Continuité
    {
      id: "continuite",
      title: "Continuité et prolongement par continuité",
      blocks: [
        {
          type: "p",
          text: "f est continue en a lorsque lim f(x) = f(a) quand x → a. Elle est continue à droite (resp. à gauche) si la limite à droite (resp. à gauche) vaut f(a) ; la continuité en a équivaut à la continuité des deux côtés. Sur un segment [a ; b], on exige la continuité sur ]a ; b[, à droite en a et à gauche en b.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Fonctions continues de référence",
          items: [
            "Les polynômes sont continus sur ℝ ; les fonctions rationnelles sur leur domaine.",
            "sin et cos sont continues sur ℝ, tan sur son domaine, √x sur [0 ; +∞[.",
            "Somme, produit, quotient (dénominateur non nul) et composée de fonctions continues sont continues.",
            "En pratique : la continuité ne s'étudie « à la main » qu'aux points de raccordement des fonctions définies par morceaux.",
          ],
        },
        {
          type: "callout",
          variant: "key",
          title: "Prolongement par continuité",
          items: [
            "Si f n'est pas définie en a mais que lim f(x) = ℓ existe et est FINIE quand x → a, on peut prolonger f en posant f̃(a) = ℓ : la fonction obtenue est continue en a.",
            "Impossible si la limite est infinie ou n'existe pas.",
          ],
        },
        {
          type: "example",
          title: "Construire un prolongement par continuité",
          steps: [
            "Soit f(x) = (√(x+1) − 1)/x, définie sur ]−1 ; 0[ ∪ ]0 ; +∞[. Est-elle prolongeable en 0 ?",
            "Conjugué : f(x) = [(x+1) − 1] / [x(√(x+1) + 1)] = 1/(√(x+1) + 1).",
            "Quand x → 0 : f(x) → 1/(1+1) = 1/2. La limite existe et est finie.",
          ],
          answer: "f est prolongeable par continuité en 0, avec f̃(0) = 1/2.",
        },
        {
          type: "example",
          title: "Déterminer des paramètres pour rendre f continue",
          steps: [
            "Soit f(x) = x + a si x < 0 ; x² + 1 si 0 ≤ x ≤ 1 ; bx + 2 si x > 1. Trouvons a et b pour que f soit continue sur ℝ.",
            "Sur chaque intervalle ouvert, f est polynomiale donc continue : seuls les raccordements 0 et 1 sont à étudier.",
            "En 0 : f(0) = 1 ; limite à gauche = a ; limite à droite = 1. Continuité ⟺ a = 1.",
            "En 1 : f(1) = 2 ; limite à gauche = 2 ; limite à droite = b + 2. Continuité ⟺ b + 2 = 2 ⟺ b = 0.",
          ],
          answer: "a = 1 et b = 0.",
        },
      ],
    },

    // ————————————————————————————————— Suites et continuité
    {
      id: "suites-et-continuite",
      title: "Suites et continuité",
      blocks: [
        {
          type: "callout",
          variant: "key",
          title: "Image d'une suite convergente",
          items: [
            "Si uₙ → a et si f est continue en a, alors f(uₙ) → f(a).",
            "Conséquence capitale : si une suite récurrente uₙ₊₁ = f(uₙ) CONVERGE vers ℓ et si f est continue en ℓ, alors ℓ est un point fixe : f(ℓ) = ℓ.",
          ],
        },
        {
          type: "example",
          title: "Schéma type bac SM : limite d'une suite récurrente",
          steps: [
            "Soit u₀ = 1 et uₙ₊₁ = √(uₙ + 2). On suppose démontré (par récurrence) que 0 ≤ uₙ ≤ 2 et que (uₙ) est croissante.",
            "(uₙ) est croissante et majorée par 2 : elle converge vers un réel ℓ ∈ [0 ; 2] (convergence monotone).",
            "f(t) = √(t+2) est continue sur [0 ; 2], donc ℓ vérifie ℓ = √(ℓ+2).",
            "En élevant au carré (ℓ ≥ 0) : ℓ² − ℓ − 2 = 0, soit (ℓ−2)(ℓ+1) = 0.",
            "Comme ℓ ≥ 0 : ℓ = 2.",
          ],
          answer: "lim uₙ = 2.",
        },
        {
          type: "callout",
          variant: "pitfall",
          title: "L'erreur qui coûte tous les points",
          items: [
            "L'équation f(ℓ) = ℓ ne donne la limite QUE si l'on a déjà prouvé la convergence (monotonie + borne, ou accroissements finis).",
            "Résoudre le point fixe sans justifier la convergence ne rapporte rien.",
          ],
        },
      ],
    },

    // ————————————————————————————————— TVI
    {
      id: "tvi",
      title: "Théorème des valeurs intermédiaires et dichotomie",
      blocks: [
        {
          type: "callout",
          variant: "key",
          title: "Image d'un intervalle, image d'un segment",
          items: [
            "L'image d'un intervalle par une fonction continue est un intervalle.",
            "L'image d'un segment [a ; b] est un segment [m ; M] : une fonction continue sur un segment est bornée et atteint ses bornes.",
            "Si f est strictement monotone, l'image se lit directement : f croissante ⟹ f([a;b]) = [f(a) ; f(b)] (bornes échangées si décroissante ; limites à la place des valeurs pour un intervalle ouvert ou non borné).",
          ],
        },
        {
          type: "callout",
          variant: "key",
          title: "Le TVI et ses deux corollaires",
          items: [
            "TVI : f continue sur [a ; b] ⟹ pour tout k compris entre f(a) et f(b), il existe c ∈ [a ; b] tel que f(c) = k.",
            "Corollaire 1 : si f(a)·f(b) < 0, l'équation f(x) = 0 admet au moins une solution dans ]a ; b[.",
            "Corollaire 2 (unicité) : si de plus f est strictement monotone, cette solution est unique.",
          ],
        },
        {
          type: "p",
          text: "La démonstration du corollaire 1 se fait par dichotomie : on coupe l'intervalle en deux à chaque étape en gardant la moitié où f change de signe. Les deux suites de bornes ainsi construites sont adjacentes (écart (b−a)/2ⁿ → 0) et convergent vers un réel c qui vérifie f(c) = 0 par continuité. Cette même dichotomie sert en pratique à encadrer une solution avec une précision imposée.",
        },
        {
          type: "steps",
          title: "Variantes du TVI à connaître absolument",
          items: [
            "Équation f(x) = k : appliquer le TVI à g(x) = f(x) − k.",
            "Équation g(x) = h(x) : poser f = g − h et chercher un changement de signe.",
            "Intervalle non borné : remplacer la valeur à la borne par la LIMITE (ex. f continue strictement croissante sur [a ; +∞[, f(a) < 0 et lim f = +∞ ⟹ solution unique).",
            "Tout polynôme de degré impair admet au moins une racine réelle (limites −∞ et +∞ aux deux bouts + TVI).",
          ],
        },
        {
          type: "example",
          title: "TVI + dichotomie avec précision imposée",
          steps: [
            "Montrons que x³ + x − 3 = 0 admet une unique solution α dans ]1 ; 2[, puis encadrons α à 0,25 près.",
            "f(x) = x³ + x − 3 est continue (polynôme) et f′(x) = 3x² + 1 > 0 : strictement croissante.",
            "f(1) = −1 < 0 et f(2) = 7 > 0 : par le TVI + stricte monotonie, α existe et est unique.",
            "Dichotomie : f(1,5) = 1,875 > 0 ⟹ α ∈ ]1 ; 1,5[. Puis f(1,25) ≈ 0,203 > 0 ⟹ α ∈ ]1 ; 1,25[.",
            "Amplitude après n étapes : (b−a)/2ⁿ. Pour une précision 10⁻² il faudrait n = 7 étapes.",
          ],
          answer: "1 < α < 1,25 (amplitude 0,25 en 2 étapes).",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Rédaction attendue à l'examen",
          items: [
            "Cite TOUJOURS, dans l'ordre : continuité sur l'intervalle, valeurs (ou limites) aux bornes, et pour l'unicité la stricte monotonie.",
            "Précise ensuite l'intervalle ouvert ou fermé où vit la solution.",
          ],
        },
      ],
    },

    // ————————————————————————————————— Réciproque
    {
      id: "fonction-reciproque",
      title: "Fonction réciproque d'une fonction continue strictement monotone",
      blocks: [
        {
          type: "callout",
          variant: "key",
          title: "Théorème de la bijection",
          items: [
            "Si f est continue et strictement monotone sur un intervalle I, alors f réalise une bijection de I sur J = f(I).",
            "La réciproque f⁻¹ : J → I (définie par y = f(x) ⟺ x = f⁻¹(y)) est continue, strictement monotone, de MÊME sens de variation que f.",
            "Dans un repère orthonormé, les courbes de f et f⁻¹ sont symétriques par rapport à la droite y = x.",
            "Pour tout x ∈ I : f⁻¹(f(x)) = x ; pour tout y ∈ J : f(f⁻¹(y)) = y.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Attention",
          items: ["f⁻¹ ne désigne PAS 1/f. Ce sont deux objets totalement différents."],
        },
        {
          type: "example",
          title: "Étude complète d'une réciproque",
          steps: [
            "Soit f(x) = x² + 2x sur I = [−1 ; +∞[.",
            "f′(x) = 2(x+1) ≥ 0, nulle seulement en −1 : f est continue et strictement croissante sur I.",
            "f(−1) = −1 et lim f = +∞ : f est une bijection de [−1 ; +∞[ sur J = [−1 ; +∞[.",
            "Expression de f⁻¹ : pour y ≥ −1, on résout y = (x+1)² − 1 avec x+1 ≥ 0, d'où x = −1 + √(y+1).",
            "Vérification : f(f⁻¹(y)) = (√(y+1) − 1)² + 2(√(y+1) − 1) = y. ✓",
          ],
          answer: "f⁻¹(y) = √(y+1) − 1, de [−1 ; +∞[ vers [−1 ; +∞[.",
        },
      ],
    },

    // ————————————————————————————————— Racine n-ième
    {
      id: "racine-n-ieme",
      title: "Racine n-ième et puissances rationnelles",
      blocks: [
        {
          type: "p",
          text: "La fonction x ↦ xⁿ est continue et strictement croissante sur [0 ; +∞[ : elle réalise une bijection de [0 ; +∞[ sur [0 ; +∞[. Sa réciproque est la fonction racine n-ième : y = ⁿ√x ⟺ yⁿ = x (avec x, y ≥ 0). Elle est continue, strictement croissante, et tend vers +∞ en +∞.",
        },
        {
          type: "callout",
          variant: "key",
          title: "L'équation xⁿ = a : tous les cas",
          items: [
            "n impair : une unique solution réelle pour tout a (ⁿ√a, avec ⁿ√a = −ⁿ√|a| si a < 0). Ex. : x⁵ = −32 ⟹ x = −2.",
            "n pair et a > 0 : deux solutions ±ⁿ√a.",
            "n pair et a = 0 : la seule solution est 0.",
            "n pair et a < 0 : aucune solution réelle.",
          ],
        },
        {
          type: "formula",
          label: "Règles de calcul (a, b ≥ 0)",
          expr: "ⁿ√(ab) = ⁿ√a·ⁿ√b   ;   ⁿ√(a/b) = ⁿ√a/ⁿ√b   ;   ⁿ√(ᵖ√a) = ⁿᵖ√a   ;   a^(p/q) = ᑫ√(aᵖ)",
        },
        {
          type: "p",
          text: "Ces règles se démontrent toutes sur le même schéma : élever à la bonne puissance et invoquer l'unicité de la racine n-ième. Par exemple (ⁿ√a·ⁿ√b)ⁿ = ab et ⁿ√a·ⁿ√b ≥ 0, donc ⁿ√a·ⁿ√b est bien LA racine n-ième de ab.",
        },
        {
          type: "example",
          title: "Inéquations avec racines n-ièmes",
          steps: [
            "a) ³√(2x−1) ≤ 3 : la racine cubique est définie sur ℝ et strictement croissante, donc équivaut à 2x−1 ≤ 27, soit x ≤ 14.",
            "b) ⁴√x > 2 : DOMAINE d'abord (x ≥ 0), puis par stricte croissance : x > 2⁴ = 16.",
          ],
          answer: "a) S = ]−∞ ; 14]   b) S = ]16 ; +∞[.",
        },
        {
          type: "example",
          title: "Limite avec racine n-ième (changement de variable)",
          steps: [
            "Calculons lim (³√x − 1)/(x − 1) quand x → 1 (forme 0/0).",
            "Posons t = ³√x, donc x = t³ et t → 1.",
            "(t − 1)/(t³ − 1) = (t − 1)/[(t − 1)(t² + t + 1)] = 1/(t² + t + 1).",
            "Quand t → 1 : → 1/3.",
          ],
          answer: "lim = 1/3. (Autre méthode : conjugué cubique avec a³−b³ = (a−b)(a²+ab+b²).)",
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
          title: "Exercice 1 — Limite trigonométrique avec conjugué",
          steps: [
            "Calculer lim [√(1+sin x) − √(1−sin x)]/x quand x → 0.",
            "Conjugué au numérateur : = 2sin x / [x(√(1+sin x) + √(1−sin x))].",
            "= (sin x/x) × 2/[√(1+sin x) + √(1−sin x)].",
            "Quand x → 0 : sin x/x → 1 et le second facteur → 2/(1+1) = 1.",
          ],
          answer: "Limite : 1.",
        },
        {
          type: "example",
          title: "Exercice 2 — Continuité avec paramètre",
          steps: [
            "Soit f(x) = (x² − 4)/(x − 2) si x ≠ 2 et f(2) = m. Pour quelle valeur de m la fonction est-elle continue en 2 ?",
            "Pour x ≠ 2 : f(x) = (x−2)(x+2)/(x−2) = x + 2, donc lim f(x) = 4 quand x → 2.",
            "f continue en 2 ⟺ m = 4.",
          ],
          answer: "m = 4.",
        },
        {
          type: "example",
          title: "Exercice 3 — TVI sur une équation non polynomiale",
          steps: [
            "Montrer que cos x = x admet une unique solution dans [0 ; π/2].",
            "Posons g(x) = cos x − x, continue sur [0 ; π/2].",
            "g′(x) = −sin x − 1 < 0 sur ]0 ; π/2[ : g est strictement décroissante.",
            "g(0) = 1 > 0 et g(π/2) = −π/2 < 0.",
          ],
          answer: "Par le TVI + stricte monotonie : solution unique dans ]0 ; π/2[.",
        },
        {
          type: "example",
          title: "Exercice 4 — Bijection homographique et calcul de f⁻¹",
          steps: [
            "Soit f(x) = 2x/(x+1) sur I = ]−1 ; +∞[. Montrer que f est une bijection de I sur un intervalle J et expliciter f⁻¹.",
            "f′(x) = 2/(x+1)² > 0 : f est continue et strictement croissante sur I.",
            "Bornes : lim f = −∞ en (−1)⁺ et lim f = 2 en +∞. Donc J = ]−∞ ; 2[.",
            "Pour y ∈ J, on résout y = 2x/(x+1) : y(x+1) = 2x ⟺ x(y−2) = −y ⟺ x = y/(2−y).",
          ],
          answer: "f⁻¹(y) = y/(2−y), de ]−∞ ; 2[ vers ]−1 ; +∞[.",
        },
        {
          type: "example",
          title: "Exercice 5 — Limite en −∞ avec racine (piège du signe)",
          steps: [
            "Calculer lim (√(x² − x + 1) + x) quand x → −∞.",
            "Conjugué : = (−x + 1)/[√(x² − x + 1) − x].",
            "Pour x < 0, on factorise par −x > 0 : numérateur −x(1 − 1/x) ; dénominateur −x[√(1 − 1/x + 1/x²) + 1].",
            "Après simplification par −x : (1 − 1/x)/[√(1 − 1/x + 1/x²) + 1] → 1/(1+1).",
          ],
          answer: "Limite : 1/2.",
        },
        {
          type: "example",
          title: "Exercice 6 — Limite avec partie entière",
          steps: [
            "Calculer lim E(x)/x quand x → +∞.",
            "Pour x > 0 : l'encadrement x − 1 < E(x) ≤ x donne, en divisant par x : 1 − 1/x < E(x)/x ≤ 1.",
            "Comme 1 − 1/x → 1, le théorème des gendarmes conclut.",
          ],
          answer: "lim E(x)/x = 1 en +∞.",
        },
      ],
    },

    // ————————————————————————————————— Pièges
    {
      id: "pieges",
      title: "Les pièges qui coûtent des points",
      blocks: [
        {
          type: "callout",
          variant: "pitfall",
          title: "Erreurs relevées chaque année par les correcteurs",
          items: [
            "En −∞ : écrire √(x²) = x au lieu de √(x²) = −x (pour x < 0).",
            "Conclure par le point fixe f(ℓ) = ℓ sans avoir prouvé la convergence de la suite.",
            "Appliquer le TVI sans citer la continuité, ou conclure à l'unicité sans stricte monotonie.",
            "Prolonger par continuité alors que la limite est infinie ou n'existe pas : impossible.",
            "Oublier le domaine avant d'élever une inéquation à une puissance paire (⁴√x > 2 exige x ≥ 0).",
            "Écrire ⁿ√(aⁿ) = a pour a < 0 et n pair : c'est |a|.",
            "Pour un quotient tendant vers « ℓ/0 » : oublier d'étudier le signe du dénominateur à droite et à gauche.",
            "Confondre f⁻¹(x) et 1/f(x).",
            "Traiter « ∞ − ∞ » ou « ∞/∞ » comme si cela valait 0 ou 1 : ce sont des formes indéterminées.",
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
            "Définition formelle : lim f = ℓ en a ⟺ (∀ε>0)(∃α>0) : 0<|x−a|<α ⟹ |f(x)−ℓ|<ε ; la limite est unique.",
            "Outils de calcul : opérations, composition, gendarmes, |f−ℓ| ≤ g → 0 ; partie entière : x−1 < E(x) ≤ x.",
            "Trigonométrie en 0 : sin x/x → 1, tan x/x → 1, (1−cos x)/x² → 1/2.",
            "Prolongement par continuité : possible en a dès que la limite existe et est finie.",
            "Suites : uₙ → a et f continue en a ⟹ f(uₙ) → f(a) ; suite récurrente convergente ⟹ limite = point fixe (après preuve de convergence).",
            "TVI : continuité + changement de signe ⟹ existence ; + stricte monotonie ⟹ unicité ; dichotomie : amplitude (b−a)/2ⁿ.",
            "Bijection : f continue strictement monotone sur I ⟹ f⁻¹ continue, même monotonie, courbes symétriques par rapport à y = x.",
            "Racine n-ième : y = ⁿ√x ⟺ yⁿ = x (x, y ≥ 0) ; xⁿ = a : 1 solution si n impair, 0 ou 2 si n pair ; a^(p/q) = ᑫ√(aᵖ).",
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
              q: "Que vaut lim (sin 3x)/x quand x → 0 ?",
              options: ["0", "1", "3", "1/3"],
              answer: 2,
              explain: "On écrit sin 3x/x = 3 × sin 3x/(3x). En posant t = 3x → 0, sin t/t → 1, donc la limite vaut 3 × 1 = 3.",
            },
            {
              q: "Pour x < 0, √(x²) vaut :",
              options: ["x", "−x", "±x", "x²"],
              answer: 1,
              explain: "√(x²) = |x|, et pour x < 0, |x| = −x. C'est le piège classique des limites en −∞ avec racines.",
            },
            {
              q: "f est continue sur [a ; b] avec f(a)·f(b) < 0. Que peut-on conclure ?",
              options: [
                "f(x) = 0 a une unique solution dans ]a ; b[",
                "f(x) = 0 a au moins une solution dans ]a ; b[",
                "f est strictement monotone sur [a ; b]",
                "f s'annule exactement deux fois",
              ],
              answer: 1,
              explain: "Le TVI garantit l'EXISTENCE d'au moins une solution. L'unicité exige une hypothèse supplémentaire : la stricte monotonie de f.",
            },
            {
              q: "L'équation x⁴ = −16 admet dans ℝ :",
              options: ["deux solutions", "une solution", "aucune solution", "quatre solutions"],
              answer: 2,
              explain: "n = 4 est pair et a = −16 < 0 : un réel à la puissance 4 est toujours positif ou nul, donc aucune solution réelle.",
            },
            {
              q: "Si f est continue et strictement décroissante sur I, alors f⁻¹ est :",
              options: [
                "strictement croissante",
                "strictement décroissante",
                "égale à 1/f",
                "non nécessairement continue",
              ],
              answer: 1,
              explain: "Le théorème de la bijection : f⁻¹ est continue et a le MÊME sens de variation que f, donc strictement décroissante ici. Et f⁻¹ n'est jamais 1/f.",
            },
            {
              q: "Une suite récurrente uₙ₊₁ = f(uₙ) vérifie f(3) = 3. Peut-on conclure que lim uₙ = 3 ?",
              options: [
                "Oui, 3 est un point fixe",
                "Oui, si u₀ = 3",
                "Non, il faut d'abord prouver que la suite converge",
                "Non, une suite récurrente ne converge jamais",
              ],
              answer: 2,
              explain: "Le point fixe ne donne la limite QUE si la convergence est déjà établie (monotonie + borne, ou accroissements finis). Sans cela, la suite peut très bien diverger.",
            },
          ],
        },
      ],
    },
  ],
};
