// Score d'autonomie — mesure à quel point l'élève a résolu l'exercice par
// lui-même. C'est LA métrique pédagogique de Qimma (cf. ARCHITECTURE §6 :
// les statistiques sont CALCULÉES à partir d'événements, jamais stockées en dur).
//
// Fonctions pures, sans dépendance à React ni à la base de données : elles sont
// directement testables et réutilisables côté serveur comme côté client.

export interface AutonomyInput {
  // Nombre de niveaux d'indices révélés (0 à 5).
  hintsRevealed: number;
  // La correction complète a-t-elle été affichée avant résolution ?
  correctionRevealed: boolean;
  // Nombre d'indices délivrés par le tuteur socratique (micro-aides).
  tutorHintsUsed: number;
}

// Pénalité par niveau d'indice : plus l'indice est explicite, plus il coûte cher.
// Index 0 → Niveau 1 (comprendre)… Index 4 → Niveau 5 (première étape).
const HINT_PENALTY = [3, 5, 9, 12, 16];
const TUTOR_HINT_PENALTY = 4; // par micro-indice du tuteur
const CORRECTION_CAP = 35; // score plafonné si la correction est dévoilée d'emblée

export function computeAutonomy(input: AutonomyInput): number {
  let score = 100;

  const revealed = clamp(input.hintsRevealed, 0, HINT_PENALTY.length);
  for (let i = 0; i < revealed; i++) {
    score -= HINT_PENALTY[i];
  }

  score -= input.tutorHintsUsed * TUTOR_HINT_PENALTY;

  if (input.correctionRevealed) {
    // Voir la correction complète sans avoir cherché plafonne fortement le score.
    score = Math.min(score, CORRECTION_CAP);
  }

  return clamp(Math.round(score), 0, 100);
}

export type AutonomyLevel = "excellente" | "bonne" | "moyenne" | "a-renforcer";

export function autonomyLevel(score: number): AutonomyLevel {
  if (score >= 85) return "excellente";
  if (score >= 60) return "bonne";
  if (score >= 40) return "moyenne";
  return "a-renforcer";
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}
