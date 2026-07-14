// Tuteur socratique SCRIPTÉ — implémentation par défaut, sans IA externe.
//
// Il applique fidèlement la méthode du cahier des charges :
//   • il pose une question au lieu de donner la réponse ;
//   • si l'élève répond correctement → il valide et avance ;
//   • s'il bloque → indice ; s'il bloque encore → indice plus précis ;
//   • la « réponse » d'une étape n'est dévoilée qu'en tout dernier recours.
//
// Le repérage d'une bonne réponse se fait par mots-clés normalisés (insensible
// à la casse, aux accents et aux signes diacritiques arabes). C'est volontaire :
// c'est déterministe, gratuit, instantané et hors-ligne. La qualité pédagogique
// vient du dialogue authoré, pas d'un modèle. Un LLMTutor prendra le relais
// pour les réponses libres et le contenu généré (Premium).

import type { Exercise } from "@/features/exercises/types";
import type { SocraticTutor, TutorReply, TutorState } from "./types";
import { INITIAL_TUTOR_STATE } from "./types";

// Normalise un texte pour la comparaison : minuscules, suppression des marques
// combinantes (accents latins ET harakat arabes via NFD + \p{M}), espaces compactés.
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function matchesKeywords(message: string, keywords: string[], minKeywords: number): boolean {
  const haystack = normalize(message);
  if (haystack.length === 0) return false;
  let hits = 0;
  for (const kw of keywords) {
    const needle = normalize(kw);
    if (needle.length > 0 && haystack.includes(needle)) {
      hits += 1;
      if (hits >= minKeywords) return true;
    }
  }
  return false;
}

const CLOSING_MESSAGE =
  "Excellent, tu as reconstruit toute la démarche par toi-même 👏. " +
  "Prends un instant pour les questions de réflexion ci-dessous : c'est là que " +
  "la compréhension se fixe vraiment.";

const CLOSING_MESSAGE_AR =
  "ممتاز، لقد بنيتَ الحل خطوة بخطوة بنفسك 👏. " +
  "خذ وقتاً للإجابة عن أسئلة التفكير أسفله، فهناك تترسّخ المعرفة حقًّا.";

function closing(exercise: Exercise): string {
  return exercise.language === "ar" ? CLOSING_MESSAGE_AR : CLOSING_MESSAGE;
}

export class ScriptedTutor implements SocraticTutor {
  start(exercise: Exercise): TutorReply {
    const first = exercise.socratic[0];
    const state: TutorState = { ...INITIAL_TUTOR_STATE };
    if (!first) {
      return { message: closing(exercise), state: { ...state, finished: true }, advanced: false, finished: true };
    }
    return { message: first.question, state, advanced: false, finished: false };
  }

  respond(exercise: Exercise, state: TutorState, message: string): TutorReply {
    if (state.finished) {
      return { message: closing(exercise), state, advanced: false, finished: true };
    }

    const step = exercise.socratic[state.stepIndex];
    if (!step) {
      return { message: closing(exercise), state: { ...state, finished: true }, advanced: false, finished: true };
    }

    const correct = matchesKeywords(message, step.keywords, step.minKeywords ?? 1);

    if (correct) {
      return this.advance(exercise, state, step.onCorrect);
    }

    // Réponse insuffisante : on escalade les indices, du plus doux au plus précis.
    const attempts = state.attempts + 1;
    const escalationIdx = attempts - 1;

    if (escalationIdx < step.escalation.length) {
      const nudge =
        attempts === 1
          ? "Pas tout à fait — mais tu n'es pas loin. Un indice : "
          : "On avance ensemble. Indice plus précis : ";
      return {
        message: nudge + step.escalation[escalationIdx],
        state: { ...state, attempts, tutorHintsUsed: state.tutorHintsUsed + 1 },
        advanced: false,
        finished: false,
      };
    }

    // Dernier recours : on dévoile la réponse de l'étape, puis on avance.
    return this.advance(
      exercise,
      { ...state, tutorHintsUsed: state.tutorHintsUsed + 1 },
      `Voici l'idée clé de cette étape : ${step.reveal}`,
    );
  }

  // Valide l'étape courante et enchaîne sur la question suivante (ou clôt le dialogue).
  private advance(exercise: Exercise, state: TutorState, prefix: string): TutorReply {
    const nextIndex = state.stepIndex + 1;
    const next = exercise.socratic[nextIndex];

    if (!next) {
      return {
        message: `${prefix}\n\n${closing(exercise)}`,
        state: { ...state, stepIndex: nextIndex, attempts: 0, finished: true },
        advanced: true,
        finished: true,
      };
    }

    return {
      message: `${prefix}\n\n${next.question}`,
      state: { ...state, stepIndex: nextIndex, attempts: 0 },
      advanced: true,
      finished: false,
    };
  }
}
