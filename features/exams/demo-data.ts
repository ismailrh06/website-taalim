// Données de démonstration en attendant la base de données (Prisma/Neon, Étape 4).
// Chaque ressource porte un champ `language` : un examen en arabe est une ressource
// arabe, pas une traduction (cf. ARCHITECTURE.md §4).

export type ExamType = "national" | "regional" | "blanc" | "cnc" | "concours";
export type ExamSession = "normale" | "rattrapage";

export interface Exam {
  id: string;
  title: string;
  levelId: string;
  streamId: string;
  subjectId: string;
  type: ExamType;
  year: number;
  session: ExamSession;
  language: "fr" | "ar";
  durationMin: number;
  hasCorrection: boolean;
}

export const DEMO_EXAMS: Exam[] = [
  { id: "ex-1", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-sma", subjectId: "math", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 240, hasCorrection: true },
  { id: "ex-2", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-sma", subjectId: "math", type: "national", year: 2025, session: "rattrapage", language: "fr", durationMin: 240, hasCorrection: true },
  { id: "ex-3", title: "Examen national — Physique-Chimie", levelId: "2bac", streamId: "2bac-pc", subjectId: "pc", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },
  { id: "ex-4", title: "Examen national — SVT", levelId: "2bac", streamId: "2bac-svt", subjectId: "svt", type: "national", year: 2024, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },
  { id: "ex-5", title: "الامتحان الوطني — الفلسفة", levelId: "2bac", streamId: "2bac-lettres", subjectId: "philo", type: "national", year: 2024, session: "normale", language: "ar", durationMin: 180, hasCorrection: true },
  { id: "ex-6", title: "Examen régional — Français", levelId: "1bac", streamId: "1bac-se", subjectId: "fr", type: "regional", year: 2025, session: "normale", language: "fr", durationMin: 120, hasCorrection: true },
  { id: "ex-7", title: "الامتحان الجهوي — التاريخ والجغرافيا", levelId: "1bac", streamId: "1bac-se", subjectId: "hg", type: "regional", year: 2025, session: "normale", language: "ar", durationMin: 120, hasCorrection: true },
  { id: "ex-8", title: "Examen blanc — Mathématiques (n°1)", levelId: "2bac", streamId: "2bac-pc", subjectId: "math", type: "blanc", year: 2026, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },
  { id: "ex-9", title: "Examen blanc — Physique-Chimie (n°1)", levelId: "2bac", streamId: "2bac-pc", subjectId: "pc", type: "blanc", year: 2026, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },
  { id: "ex-10", title: "CNC — Mathématiques 1 (MP)", levelId: "cpge", streamId: "cpge-mp", subjectId: "math", type: "cnc", year: 2025, session: "normale", language: "fr", durationMin: 240, hasCorrection: true },
  { id: "ex-11", title: "CNC — Physique 1 (PSI)", levelId: "cpge", streamId: "cpge-psi", subjectId: "pc", type: "cnc", year: 2025, session: "normale", language: "fr", durationMin: 240, hasCorrection: true },
  { id: "ex-12", title: "CNC — Mathématiques 2 (MP)", levelId: "cpge", streamId: "cpge-mp", subjectId: "math", type: "cnc", year: 2024, session: "normale", language: "fr", durationMin: 240, hasCorrection: false },
  { id: "ex-13", title: "Concours ENSA — Épreuve maths-physique", levelId: "2bac", streamId: "2bac-pc", subjectId: "math", type: "concours", year: 2025, session: "normale", language: "fr", durationMin: 120, hasCorrection: true },
  { id: "ex-14", title: "TAFEM (ENCG) — Test d'admissibilité", levelId: "2bac", streamId: "2bac-eco", subjectId: "eco", type: "concours", year: 2025, session: "normale", language: "fr", durationMin: 150, hasCorrection: true },
  { id: "ex-15", title: "Concours Médecine — QCM commun", levelId: "2bac", streamId: "2bac-svt", subjectId: "svt", type: "concours", year: 2024, session: "normale", language: "fr", durationMin: 120, hasCorrection: true },
  { id: "ex-16", title: "Concours ENSAM — Épreuve 2024", levelId: "2bac", streamId: "2bac-pc", subjectId: "pc", type: "concours", year: 2024, session: "normale", language: "fr", durationMin: 120, hasCorrection: false },
];

export function filterExams(filters: {
  levelId?: string;
  subjectId?: string;
  type?: string;
  year?: number;
}): Exam[] {
  return DEMO_EXAMS.filter(
    (e) =>
      (!filters.levelId || e.levelId === filters.levelId) &&
      (!filters.subjectId || e.subjectId === filters.subjectId) &&
      (!filters.type || e.type === filters.type) &&
      (!filters.year || e.year === filters.year),
  );
}

export const EXAM_YEARS = [...new Set(DEMO_EXAMS.map((e) => e.year))].sort(
  (a, b) => b - a,
);
