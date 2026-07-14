// Modèle de domaine de l'unité pédagogique centrale : l'EXERCICE.
// Un exercice porte son énoncé, une échelle d'indices progressifs (5 niveaux
// + correction complète) et un dialogue socratique guidé (cf. ARCHITECTURE §6).
//
// Le contenu pédagogique est rédigé dans sa langue naturelle (`language`) et
// affiché avec dir="auto" — un exercice de maths en arabe est une ressource
// arabe, pas une traduction (même principe que les examens du CNEE).
// L'interface (boutons, libellés) est, elle, traduite via next-intl.

export type ExerciseLanguage = "fr" | "ar";

export type Difficulty = "facile" | "moyen" | "difficile";

// Les 5 niveaux d'indices imposés par le cahier des charges, dans l'ordre.
export type HintKind =
  | "comprendre" // Niveau 1 — reformuler / comprendre l'énoncé
  | "chapitre" // Niveau 2 — identifier le chapitre / la notion
  | "piste" // Niveau 3 — donner une piste de réflexion
  | "formule" // Niveau 4 — rappeler la formule / le théorème utile
  | "premiere-etape"; // Niveau 5 — dévoiler uniquement la première étape

export const HINT_ORDER: HintKind[] = [
  "comprendre",
  "chapitre",
  "piste",
  "formule",
  "premiere-etape",
];

export interface Hint {
  kind: HintKind;
  text: string;
}

// Une étape du dialogue socratique. Le tuteur pose `question` ; selon la
// réponse de l'élève, il avance (`accept*`) ou délivre un indice de plus en
// plus précis (`escalation`, ordonnés du plus doux au plus explicite).
export interface SocraticStep {
  id: string;
  // Question posée par le tuteur pour guider la réflexion.
  question: string;
  // Mots-clés attendus dans une bonne réponse (comparaison normalisée,
  // insensible à la casse et aux accents). Une réponse est acceptée si elle
  // contient AU MOINS `minKeywords` de ces mots-clés.
  keywords: string[];
  minKeywords?: number; // défaut : 1
  // Message de renforcement quand l'élève répond correctement.
  onCorrect: string;
  // Indices de plus en plus précis en cas de blocage (dernier = quasi-réponse
  // de l'étape). Délivrés un par un à chaque tentative infructueuse.
  escalation: string[];
  // Ce que le tuteur finit par établir avant de passer à l'étape suivante
  // (la « bonne réponse » de cette étape, révélée en dernier recours).
  reveal: string;
}

// Questions de méta-cognition posées APRÈS résolution (cf. cahier des charges :
// « pourquoi cette méthode marche », « une autre méthode ? », etc.).
export interface ReflectionPrompt {
  question: string;
  modelAnswer: string;
}

export interface Exercise {
  id: string;
  slug: string;
  language: ExerciseLanguage;
  subjectId: string; // référence taxonomy SUBJECTS
  levelId: string; // référence taxonomy LEVELS
  streamId: string; // référence taxonomy STREAMS
  chapter: string; // chapitre / notion (dans la langue de l'exercice)
  title: string;
  statement: string; // énoncé complet
  difficulty: Difficulty;
  estimatedMin: number; // temps de résolution estimé
  hints: Hint[]; // exactement 5, dans l'ordre de HINT_ORDER
  correction: string[]; // correction complète, étape par étape
  socratic: SocraticStep[]; // dialogue guidé
  reflection: ReflectionPrompt[]; // questions post-exercice
  relatedExamId?: string; // examen d'origine (features/exams/demo-data)
}
