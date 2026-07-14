// Contrat du tuteur socratique — volontairement AGNOSTIQUE du fournisseur.
// L'implémentation actuelle (ScriptedTutor) fonctionne hors-ligne à partir du
// dialogue authoré de chaque exercice. Demain, un LLMTutor implémentera la même
// interface (appelé via Server Action + streaming) sans toucher à l'UI
// (cf. ARCHITECTURE §7 : intégration IA derrière une interface).

import type { Exercise } from "@/features/exercises/types";

export type TutorRole = "tutor" | "student";

export interface TutorMessage {
  role: TutorRole;
  text: string;
}

// État de la conversation, sérialisable et transmis à chaque tour.
// Le tuteur est sans mémoire cachée : tout ce qui compte est dans cet objet,
// ce qui permet de déplacer `respond` côté serveur plus tard sans friction.
export interface TutorState {
  stepIndex: number; // étape socratique courante
  attempts: number; // tentatives infructueuses sur l'étape courante
  tutorHintsUsed: number; // total de micro-indices délivrés (score d'autonomie)
  finished: boolean; // le dialogue est-il terminé ?
}

export interface TutorReply {
  message: string; // réponse du tuteur à afficher
  state: TutorState; // état mis à jour
  advanced: boolean; // a-t-on progressé d'une étape à ce tour ?
  finished: boolean; // le dialogue vient-il de se terminer ?
}

export interface SocraticTutor {
  // Message d'ouverture (première question socratique) + état initial.
  start(exercise: Exercise): TutorReply;
  // Traite un message de l'élève et renvoie la réponse + le nouvel état.
  respond(exercise: Exercise, state: TutorState, message: string): TutorReply;
}

export const INITIAL_TUTOR_STATE: TutorState = {
  stepIndex: 0,
  attempts: 0,
  tutorHintsUsed: 0,
  finished: false,
};
