// Cours provisoires — le temps que l'équipe rédige le cours interactif complet
// (dans l'esprit de features/courses/suites-numeriques.ts), chaque matière
// affiche ici le programme officiel du niveau plutôt qu'un simple « à venir »
// silencieux : ça donne de la valeur immédiatement (savoir ce qui est au
// programme) sans risquer d'approximation sur des notions détaillées.

import type { Course } from "./types";

function programmeCourse(input: {
  slug: string;
  language: "fr" | "ar";
  subjectId: string;
  levelId: string;
  streamIds: string[];
  subjectLabel: string;
  levelLabel: string;
  chapters: string[];
}): Course {
  return {
    slug: input.slug,
    language: input.language,
    subjectId: input.subjectId,
    levelId: input.levelId,
    streamIds: input.streamIds,
    chapter: "Programme de l'année",
    title: `${input.subjectLabel} — ${input.levelLabel}`,
    summary:
      "Le programme officiel du niveau, chapitre par chapitre. Le cours interactif complet (méthodes, exemples résolus, quiz) arrive progressivement — en attendant, retrouve les anciens examens et exercices corrigés sur cette matière.",
    readingMin: 2,
    objectives: [
      "Visualiser en un coup d'œil l'ensemble des chapitres du programme.",
      "Te repérer pour organiser tes révisions par ordre de priorité.",
    ],
    sections: [
      {
        id: "a-venir",
        title: "Cours complet à venir",
        blocks: [
          {
            type: "callout",
            variant: "info",
            title: "Ce cours est en cours de rédaction",
            items: [
              "Nos équipes rédigent le cours interactif complet de cette matière : leçons détaillées, exemples résolus, méthodes et quiz.",
              "En attendant, tu trouveras ci-dessous le programme officiel, et dans la section Examens les anciens sujets et corrigés déjà disponibles pour t'entraîner.",
            ],
          },
        ],
      },
      {
        id: "programme",
        title: "Programme officiel",
        blocks: [{ type: "list", items: input.chapters }],
      },
    ],
  };
}

export const PROVISIONAL_COURSES: Course[] = [
  programmeCourse({
    slug: "programme-maths-1bac",
    language: "fr",
    subjectId: "math",
    levelId: "1bac",
    streamIds: ["1bac-se", "1bac-sm", "1bac-eco", "1bac-ste"],
    subjectLabel: "Mathématiques",
    levelLabel: "1ère année Bac",
    chapters: [
      "Calcul vectoriel dans le plan",
      "La projection dans le plan",
      "La droite dans le plan",
      "Généralités sur les fonctions",
      "Le premier degré",
      "Le second degré",
      "Trigonométrie",
      "Produit scalaire dans le plan",
      "Rotation dans le plan",
      "Vecteurs et translation dans l'espace",
      "Géométrie analytique dans l'espace",
      "Barycentre dans le plan",
      "Statistiques",
      "Arithmétique dans ℕ",
    ],
  }),
  programmeCourse({
    slug: "programme-pc-1bac",
    language: "fr",
    subjectId: "pc",
    levelId: "1bac",
    streamIds: ["1bac-se", "1bac-sm", "1bac-ste"],
    subjectLabel: "Physique-Chimie",
    levelLabel: "1ère année Bac",
    chapters: [
      "Mouvement et forces (mécanique)",
      "Étude des ondes mécaniques",
      "Applications des lois de Newton",
      "Le dipôle RC",
      "Le dipôle RL",
      "Transformations chimiques et avancement",
      "Réactions acide-base et dosages",
      "Solutions aqueuses et concentrations",
    ],
  }),
  programmeCourse({
    slug: "programme-svt-1bac",
    language: "fr",
    subjectId: "svt",
    levelId: "1bac",
    streamIds: ["1bac-se", "1bac-sm"],
    subjectLabel: "SVT",
    levelLabel: "1ère année Bac",
    chapters: [
      "La reproduction chez les êtres vivants",
      "Phénomènes géologiques externes",
      "Ressources naturelles et gestion durable",
      "Écologie et relations dans l'écosystème",
    ],
  }),
  programmeCourse({
    slug: "programme-pc-2bac",
    language: "fr",
    subjectId: "pc",
    levelId: "2bac",
    streamIds: ["2bac-sma", "2bac-smb", "2bac-pc", "2bac-svt"],
    subjectLabel: "Physique-Chimie",
    levelLabel: "2ème année Bac",
    chapters: [
      "Ondes mécaniques progressives",
      "Ondes lumineuses",
      "Transformations nucléaires",
      "Dipôle RC — circuit RC",
      "Dipôle RL — circuit RL",
      "Circuit RLC — oscillations libres",
      "Suivi temporel d'une transformation chimique",
      "Évolution des systèmes chimiques : sens spontané",
      "Contrôle de l'évolution des systèmes chimiques",
      "Transformations liées à des réactions acide-base",
      "Transformations en chimie organique",
    ],
  }),
  programmeCourse({
    slug: "programme-svt-2bac",
    language: "fr",
    subjectId: "svt",
    levelId: "2bac",
    streamIds: ["2bac-svt"],
    subjectLabel: "SVT",
    levelLabel: "2ème année Bac",
    chapters: [
      "Transmission de l'information génétique",
      "Génie génétique et biotechnologies",
      "Immunologie",
      "Reproduction et sexualité",
      "Phénomènes géologiques internes",
      "Géologie et ressources énergétiques",
    ],
  }),
];
