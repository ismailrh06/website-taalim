// Source de vérité pour prisma/seed.ts — les pages lisent désormais Neon via
// features/exams/queries.ts. Chaque ressource porte un champ `language` : un
// examen en arabe est une ressource arabe, pas une traduction (cf. ARCHITECTURE.md §4).
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
  pdfUrl?: string; // URL vérifiée du sujet officiel (CNEE ou autre)
  correctionUrl?: string; // URL vérifiée du corrigé officiel
}

export const DEMO_EXAMS: Exam[] = [
  // ===== EXAMENS NATIONAUX CNEE — URLs vérifiées (téléchargement direct) =====
  // Obtenues en automatisant le formulaire officiel cnee.men.gov.ma/WebNational.aspx
  // (voir scripts/scrape-cnee.mjs). Chaque pdfUrl/correctionUrl ci-dessous a été
  // testée en HTTP et confirmée comme un vrai fichier PDF avant intégration.

  // PC — Sciences Physiques (2022, session normale)
  { id: "cnee-2022-pc-math-n", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-pc", subjectId: "math", type: "national", year: 2022, session: "normale", language: "fr", durationMin: 240, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NS%2022.pdf", correctionUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NR%2022.pdf" },
  { id: "cnee-2022-pc-pc-n", title: "Examen national — Physique-Chimie", levelId: "2bac", streamId: "2bac-pc", subjectId: "pc", type: "national", year: 2022, session: "normale", language: "fr", durationMin: 180, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NS%2028.pdf", correctionUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NR%2028.pdf" },
  { id: "cnee-2022-pc-svt-n", title: "Examen national — SVT", levelId: "2bac", streamId: "2bac-pc", subjectId: "svt", type: "national", year: 2022, session: "normale", language: "fr", durationMin: 180, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NS%2034.pdf", correctionUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NR%2034.pdf" },

  // SVT — Sciences de la Vie et de la Terre
  { id: "cnee-2022-svt-math-n", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-svt", subjectId: "math", type: "national", year: 2022, session: "normale", language: "fr", durationMin: 240, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NS%2022.pdf", correctionUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NR%2022.pdf" },
  { id: "cnee-2020-svt-pc-n", title: "Examen national — Physique-Chimie", levelId: "2bac", streamId: "2bac-svt", subjectId: "pc", type: "national", year: 2020, session: "normale", language: "fr", durationMin: 180, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2020/NS%2027.pdf", correctionUrl: "https://cnee.men.gov.ma/NATIONAL/2020/NR%2027.pdf" },
  { id: "cnee-2022-svt-svt-n", title: "Examen national — SVT", levelId: "2bac", streamId: "2bac-svt", subjectId: "svt", type: "national", year: 2022, session: "normale", language: "fr", durationMin: 180, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NS%2032.pdf", correctionUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NR%2032.pdf" },

  // ECO — Sciences Économiques et Gestion
  { id: "cnee-2022-eco-eco-n", title: "Examen national — Économie-Gestion", levelId: "2bac", streamId: "2bac-eco", subjectId: "eco", type: "national", year: 2022, session: "normale", language: "fr", durationMin: 180, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NS%2052.pdf", correctionUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NR%2052.pdf" },
  { id: "cnee-2025-eco-math-n", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-eco", subjectId: "math", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 240, hasCorrection: true },

  // Lettres — Littérature et Sciences Humaines
  { id: "cnee-2022-lettres-philo-n", title: "الامتحان الوطني — الفلسفة", levelId: "2bac", streamId: "2bac-lettres", subjectId: "philo", type: "national", year: 2022, session: "normale", language: "ar", durationMin: 180, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NS%2004.pdf", correctionUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NR%2004.pdf" },
  { id: "cnee-2022-lettres-hg-n", title: "الامتحان الوطني — التاريخ والجغرافيا", levelId: "2bac", streamId: "2bac-lettres", subjectId: "hg", type: "national", year: 2022, session: "normale", language: "ar", durationMin: 120, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NS%2007.pdf", correctionUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NR%2007.pdf" },
  { id: "cnee-2022-lettres-ar-n", title: "الامتحان الوطني — اللغة العربية", levelId: "2bac", streamId: "2bac-lettres", subjectId: "ar", type: "national", year: 2022, session: "normale", language: "ar", durationMin: 120, hasCorrection: true, pdfUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NS%2002.pdf", correctionUrl: "https://cnee.men.gov.ma/NATIONAL/2022/NR%2002.pdf" },

  // ===== EXAMENS NATIONAUX SANS PDF DIRECT VÉRIFIÉ =====
  // Ces combinaisons existent bien chez CNEE mais sont publiées en archive .rar
  // groupée (pas un PDF par matière) ou n'ont pas encore été explorées par
  // scripts/scrape-cnee.mjs. Sans pdfUrl, la page /examens affiche
  // automatiquement « Voir sur le CNEE » plutôt qu'un faux bouton.
  { id: "cnee-2025-sma-math-n", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-sma", subjectId: "math", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 240, hasCorrection: true },
  { id: "cnee-2025-sma-pc-n", title: "Examen national — Physique-Chimie", levelId: "2bac", streamId: "2bac-sma", subjectId: "pc", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },
  { id: "cnee-2025-smb-math-n", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-smb", subjectId: "math", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 240, hasCorrection: true },
  { id: "cnee-2025-smb-si-n", title: "Examen national — Sciences de l'Ingénieur", levelId: "2bac", streamId: "2bac-smb", subjectId: "si", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },
  { id: "cnee-2025-ste-math-n", title: "Examen national — Mathématiques", levelId: "2bac", streamId: "2bac-ste", subjectId: "math", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 240, hasCorrection: true },
  { id: "cnee-2025-ste-pc-n", title: "Examen national — Physique-Chimie", levelId: "2bac", streamId: "2bac-ste", subjectId: "pc", type: "national", year: 2025, session: "normale", language: "fr", durationMin: 180, hasCorrection: true },

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

