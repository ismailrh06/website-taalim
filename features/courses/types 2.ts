// Modèle de contenu d'un COURS. Plutôt qu'un simple bloc de texte (comme un PDF),
// un cours Qimma est une suite de sections composées de « blocs » typés :
// paragraphes, encadrés pédagogiques (astuce, piège, point-clé), formules mises
// en valeur, exemples entièrement résolus, tableaux, étapes de méthode et quiz
// interactif. C'est ce qui permet une meilleure expérience de lecture que les
// ressources existantes.
//
// Le contenu est rédigé dans sa langue naturelle (`language`) et affiché avec
// dir="auto" — un cours en français est une ressource française (cf. §4 de
// ARCHITECTURE). L'interface (boutons, quiz, sommaire) est traduite via next-intl.

export type CalloutVariant = "info" | "tip" | "warning" | "pitfall" | "key";

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "callout"; variant: CalloutVariant; title?: string; items: string[] }
  | { type: "formula"; label?: string; expr: string }
  | { type: "example"; title: string; steps: string[]; answer?: string }
  | { type: "steps"; title?: string; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "keywords"; items: { term: string; def: string }[] }
  | { type: "quiz"; questions: QuizQuestion[] };

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number; // index de la bonne réponse
  explain: string; // explication affichée après réponse
}

export interface Section {
  id: string; // ancre pour le sommaire
  title: string;
  blocks: Block[];
}

export interface Course {
  slug: string;
  language: "fr" | "ar";
  subjectId: string; // taxonomy SUBJECTS
  levelId: string; // taxonomy LEVELS
  streamIds: string[]; // filières concernées
  chapter: string;
  title: string;
  summary: string; // accroche (méta description / carte)
  readingMin: number; // durée de lecture estimée
  objectives: string[]; // objectifs d'apprentissage
  sections: Section[];
  relatedExerciseIds?: string[]; // exercices d'application
}
