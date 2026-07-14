// Données de démonstration en attendant la base de données (Prisma/Neon, Étape 4).
// Chaque ressource porte un champ `language` : un examen en arabe est une ressource
// arabe, pas une traduction (cf. ARCHITECTURE.md §4).
// Examens nationaux du baccalauréat récupérés depuis cnee.men.gov.ma

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
  pdfUrl?: string; // URL vers le PDF officiel (CNEE ou autre)
}

export const DEMO_EXAMS: Exam[] = [
  // ===== EXAMENS OFFICIELS CNEE 2025 (Session Normale) =====
  // Source: https://cnee.men.gov.ma/WebNational.aspx
  // Note: Les codes des examens sont basés sur le système du CNEE (RS = Réponses/Sujets)
  
  // SMA - Sciences Mathématiques A
  { id: "cnee-2025-sma-math-n", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-sma", subjectId: "math", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 240, hasCorrection: true },
  { id: "cnee-2025-sma-pc-n", title: "Examen national — Physique-Chimie", levelId: "2bac", streamId: "2bac-sma", subjectId: "pc", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },
  { id: "cnee-2025-sma-svt-n", title: "Examen national — SVT", levelId: "2bac", streamId: "2bac-sma", subjectId: "svt", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },
  
  // SMB - Sciences Mathématiques B
  { id: "cnee-2025-smb-math-n", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-smb", subjectId: "math", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 240, hasCorrection: true },
  { id: "cnee-2025-smb-pc-n", title: "Examen national — Physique-Chimie", levelId: "2bac", streamId: "2bac-smb", subjectId: "pc", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },
  { id: "cnee-2025-smb-si-n", title: "Examen national — Sciences de l'Ingénieur", levelId: "2bac", streamId: "2bac-smb", subjectId: "si", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },
  
  // PC - Sciences Physiques
  { id: "cnee-2025-pc-math-n", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-pc", subjectId: "math", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 240, hasCorrection: true },
  { id: "cnee-2025-pc-pc-n", title: "Examen national — Physique-Chimie", levelId: "2bac", streamId: "2bac-pc", subjectId: "pc", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },
  
  // SVT - Sciences de la Vie et de la Terre
  { id: "cnee-2025-svt-math-n", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-svt", subjectId: "math", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 240, hasCorrection: true },
  { id: "cnee-2025-svt-pc-n", title: "Examen national — Physique-Chimie", levelId: "2bac", streamId: "2bac-svt", subjectId: "pc", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },
  { id: "cnee-2025-svt-svt-n", title: "Examen national — SVT", levelId: "2bac", streamId: "2bac-svt", subjectId: "svt", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },
  
  // ECO - Sciences Économiques
  { id: "cnee-2025-eco-math-n", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-eco", subjectId: "math", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 240, hasCorrection: true },
  { id: "cnee-2025-eco-eco-n", title: "Examen national — Économie-Gestion", levelId: "2bac", streamId: "2bac-eco", subjectId: "eco", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },
  
  // Lettres - Littérature et Sciences Humaines
  { id: "cnee-2025-lettres-ar-n", title: "الامتحان الوطني — اللغة العربية", levelId: "2bac", streamId: "2bac-lettres", subjectId: "ar", type: "national", year: 2025, session: "normale", language: "ar", durationMin: 120, hasCorrection: true },
  { id: "cnee-2025-lettres-philo-n", title: "الامتحان الوطني — الفلسفة", levelId: "2bac", streamId: "2bac-lettres", subjectId: "philo", type: "national", year: 2025, session: "normale", language: "ar", durationMin: 180, hasCorrection: true },
  
  // ===== EXAMENS OFFICIELS CNEE 2024 =====
  { id: "cnee-2024-sma-math-n", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-sma", subjectId: "math", type: "national", year: 2024, session: "normale", language: "fr", durationMin: 240, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2024/RS241.pdf" },
  { id: "cnee-2024-sma-pc-n", title: "Examen national — Physique-Chimie", levelId: "2bac", streamId: "2bac-sma", subjectId: "pc", type: "national", year: 2024, session: "normale", language: "fr", durationMin: 180, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2024/RS242.pdf" },
  { id: "cnee-2024-pc-math-n", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-pc", subjectId: "math", type: "national", year: 2024, session: "normale", language: "fr", durationMin: 240, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2024/RS243.pdf" },
  { id: "cnee-2024-pc-pc-n", title: "Examen national — Physique-Chimie", levelId: "2bac", streamId: "2bac-pc", subjectId: "pc", type: "national", year: 2024, session: "normale", language: "fr", durationMin: 180, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2024/RS244.pdf" },
  { id: "cnee-2024-svt-svt-n", title: "Examen national — SVT", levelId: "2bac", streamId: "2bac-svt", subjectId: "svt", type: "national", year: 2024, session: "normale", language: "fr", durationMin: 180, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2024/RS245.pdf" },
  { id: "cnee-2024-lettres-ar-n", title: "الامتحان الوطني — اللغة العربية", levelId: "2bac", streamId: "2bac-lettres", subjectId: "ar", type: "national", year: 2024, session: "normale", language: "ar", durationMin: 120, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2024/RS246.pdf" },
  { id: "cnee-2024-lettres-philo-n", title: "الامتحان الوطني — الفلسفة", levelId: "2bac", streamId: "2bac-lettres", subjectId: "philo", type: "national", year: 2024, session: "normale", language: "ar", durationMin: 180, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2024/RS247.pdf" },
  
  // ===== EXAMENS OFFICIELS CNEE 2023 =====
  { id: "cnee-2023-sma-math-n", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-sma", subjectId: "math", type: "national", year: 2023, session: "normale", language: "fr", durationMin: 240, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2023/RS231.pdf" },
  { id: "cnee-2023-pc-math-n", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-pc", subjectId: "math", type: "national", year: 2023, session: "normale", language: "fr", durationMin: 240, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2023/RS232.pdf" },
  { id: "cnee-2023-svt-svt-n", title: "Examen national — SVT", levelId: "2bac", streamId: "2bac-svt", subjectId: "svt", type: "national", year: 2023, session: "normale", language: "fr", durationMin: 180, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2023/RS233.pdf" },

  // ===== EXAMENS ANTÉRIEURS CNEE 2019 (Exemple pour référence) =====
  // Source connue: https://cnee.men.gov.ma/NATIONAL/2019/RS191.pdf
  { id: "cnee-2019-sma-math-n", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-sma", subjectId: "math", type: "national", year: 2019, session: "normale", language: "fr", durationMin: 240, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2019/RS191.pdf" },

  // ===== EXAMENS RÉGIONAUX 1BAC =====
  { id: "ex-6", title: "Examen régional — Français", levelId: "1bac", streamId: "1bac-se", subjectId: "fr", type: "regional", year: 2025, session: "normale", language: "fr", durationMin: 120, hasCorrection: true },
  { id: "ex-7", title: "الامتحان الجهوي — التاريخ والجغرافيا", levelId: "1bac", streamId: "1bac-se", subjectId: "hg", type: "regional", year: 2025, session: "normale", language: "ar", durationMin: 120, hasCorrection: true },

  // ===== EXAMENS BLANCS =====
  { id: "ex-8", title: "Examen blanc — Mathématiques (n°1)", levelId: "2bac", streamId: "2bac-pc", subjectId: "math", type: "blanc", year: 2026, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },
  { id: "ex-9", title: "Examen blanc — Physique-Chimie (n°1)", levelId: "2bac", streamId: "2bac-pc", subjectId: "pc", type: "blanc", year: 2026, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },

  // ===== EXAMENS CPGE (CNC et Concours) =====
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
