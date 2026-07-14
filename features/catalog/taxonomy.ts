import type { Locale } from "@/i18n/routing";

export type LocalizedText = Record<Locale, string>;

export interface Level {
  id: string;
  slug: string;
  name: LocalizedText;
  shortName: LocalizedText;
  description: LocalizedText;
}

export interface Stream {
  id: string;
  levelId: string;
  slug: string;
  name: LocalizedText;
  subjectIds: string[];
}

export interface Subject {
  id: string;
  slug: string;
  name: LocalizedText;
}

export const LEVELS: Level[] = [
  {
    id: "1bac",
    slug: "1bac",
    name: {
      fr: "1ère année Baccalauréat",
      ar: "الأولى باكالوريا",
      en: "1st year Baccalaureate",
    },
    shortName: { fr: "1BAC", ar: "أولى باك", en: "1BAC" },
    description: {
      fr: "Examen régional, contrôles continus et bases du programme.",
      ar: "الامتحان الجهوي، الفروض المحروسة وأساسيات المقرر.",
      en: "Regional exam, continuous assessment and curriculum foundations.",
    },
  },
  {
    id: "2bac",
    slug: "2bac",
    name: {
      fr: "2ème année Baccalauréat",
      ar: "الثانية باكالوريا",
      en: "2nd year Baccalaureate",
    },
    shortName: { fr: "2BAC", ar: "ثانية باك", en: "2BAC" },
    description: {
      fr: "Examen national : anciens sujets, examens blancs et révision intensive.",
      ar: "الامتحان الوطني: مواضيع سابقة، امتحانات تجريبية ومراجعة مكثفة.",
      en: "National exam: past papers, mock exams and intensive revision.",
    },
  },
  {
    id: "cpge",
    slug: "cpge",
    name: {
      fr: "Classes préparatoires (CPGE)",
      ar: "الأقسام التحضيرية",
      en: "Preparatory classes (CPGE)",
    },
    shortName: { fr: "CPGE", ar: "التحضيرية", en: "CPGE" },
    description: {
      fr: "MP, PSI, TSI, ECS, ECT : cours, annales CNC et concours.",
      ar: "MP، PSI، TSI، ECS، ECT: دروس وأرشيف مباراة CNC.",
      en: "MP, PSI, TSI, ECS, ECT: courses, CNC archives and exams.",
    },
  },
];

export const SUBJECTS: Subject[] = [
  { id: "math", slug: "mathematiques", name: { fr: "Mathématiques", ar: "الرياضيات", en: "Mathematics" } },
  { id: "pc", slug: "physique-chimie", name: { fr: "Physique-Chimie", ar: "الفيزياء والكيمياء", en: "Physics & Chemistry" } },
  { id: "svt", slug: "svt", name: { fr: "SVT", ar: "علوم الحياة والأرض", en: "Life & Earth Sciences" } },
  { id: "fr", slug: "francais", name: { fr: "Français", ar: "اللغة الفرنسية", en: "French" } },
  { id: "ar", slug: "arabe", name: { fr: "Arabe", ar: "اللغة العربية", en: "Arabic" } },
  { id: "en", slug: "anglais", name: { fr: "Anglais", ar: "اللغة الإنجليزية", en: "English" } },
  { id: "philo", slug: "philosophie", name: { fr: "Philosophie", ar: "الفلسفة", en: "Philosophy" } },
  { id: "hg", slug: "histoire-geo", name: { fr: "Histoire-Géographie", ar: "التاريخ والجغرافيا", en: "History & Geography" } },
  { id: "islamic", slug: "education-islamique", name: { fr: "Éducation islamique", ar: "التربية الإسلامية", en: "Islamic education" } },
  { id: "eco", slug: "economie", name: { fr: "Économie & Gestion", ar: "الاقتصاد والتدبير", en: "Economics & Management" } },
  { id: "si", slug: "sciences-ingenieur", name: { fr: "Sciences de l'ingénieur", ar: "علوم المهندس", en: "Engineering sciences" } },
  { id: "info", slug: "informatique", name: { fr: "Informatique", ar: "المعلوميات", en: "Computer science" } },
];

export const STREAMS: Stream[] = [
  // ——— 1BAC ———
  { id: "1bac-se", levelId: "1bac", slug: "sciences-experimentales", name: { fr: "Sciences Expérimentales", ar: "علوم تجريبية", en: "Experimental Sciences" }, subjectIds: ["math", "pc", "svt", "fr", "ar", "en", "islamic", "hg"] },
  { id: "1bac-sm", levelId: "1bac", slug: "sciences-mathematiques", name: { fr: "Sciences Mathématiques", ar: "علوم رياضية", en: "Mathematical Sciences" }, subjectIds: ["math", "pc", "svt", "fr", "ar", "en", "islamic", "hg"] },
  { id: "1bac-eco", levelId: "1bac", slug: "sciences-economiques", name: { fr: "Sciences Économiques et Gestion", ar: "علوم اقتصادية وتدبير", en: "Economics & Management" }, subjectIds: ["math", "eco", "fr", "ar", "en", "islamic", "hg", "info"] },
  { id: "1bac-lettres", levelId: "1bac", slug: "lettres-sciences-humaines", name: { fr: "Lettres et Sciences Humaines", ar: "آداب وعلوم إنسانية", en: "Literature & Humanities" }, subjectIds: ["ar", "fr", "en", "hg", "islamic", "philo"] },
  { id: "1bac-ste", levelId: "1bac", slug: "sciences-technologies", name: { fr: "Sciences et Technologies", ar: "علوم وتكنولوجيات", en: "Science & Technology" }, subjectIds: ["math", "pc", "si", "fr", "ar", "en", "islamic"] },
  // ——— 2BAC ———
  { id: "2bac-sma", levelId: "2bac", slug: "sciences-maths-a", name: { fr: "Sciences Maths A", ar: "علوم رياضية أ", en: "Math Sciences A" }, subjectIds: ["math", "pc", "svt", "fr", "en", "philo", "islamic", "ar"] },
  { id: "2bac-smb", levelId: "2bac", slug: "sciences-maths-b", name: { fr: "Sciences Maths B", ar: "علوم رياضية ب", en: "Math Sciences B" }, subjectIds: ["math", "pc", "si", "fr", "en", "philo", "islamic", "ar"] },
  { id: "2bac-pc", levelId: "2bac", slug: "sciences-physiques", name: { fr: "Sciences Physiques (PC)", ar: "علوم فيزيائية", en: "Physical Sciences (PC)" }, subjectIds: ["math", "pc", "svt", "fr", "en", "philo", "islamic", "ar"] },
  { id: "2bac-svt", levelId: "2bac", slug: "svt", name: { fr: "Sciences de la Vie et de la Terre", ar: "علوم الحياة والأرض", en: "Life & Earth Sciences" }, subjectIds: ["math", "pc", "svt", "fr", "en", "philo", "islamic", "ar"] },
  { id: "2bac-eco", levelId: "2bac", slug: "sciences-economiques", name: { fr: "Sciences Économiques", ar: "علوم اقتصادية", en: "Economics" }, subjectIds: ["math", "eco", "fr", "en", "philo", "islamic", "ar", "hg"] },
  { id: "2bac-sgc", levelId: "2bac", slug: "gestion-comptable", name: { fr: "Sciences de Gestion Comptable", ar: "علوم التدبير المحاسباتي", en: "Accounting & Management" }, subjectIds: ["math", "eco", "fr", "en", "philo", "islamic", "ar"] },
  { id: "2bac-lettres", levelId: "2bac", slug: "lettres", name: { fr: "Lettres et Sciences Humaines", ar: "آداب وعلوم إنسانية", en: "Literature & Humanities" }, subjectIds: ["ar", "fr", "en", "hg", "philo", "islamic"] },
  { id: "2bac-ste", levelId: "2bac", slug: "sciences-technologies-electriques", name: { fr: "Sciences et Technologies Électriques", ar: "علوم وتكنولوجيات كهربائية", en: "Electrical Science & Technology" }, subjectIds: ["math", "pc", "si", "fr", "en", "philo", "ar"] },
  { id: "2bac-stm", levelId: "2bac", slug: "sciences-technologies-mecaniques", name: { fr: "Sciences et Technologies Mécaniques", ar: "علوم وتكنولوجيات ميكانيكية", en: "Mechanical Science & Technology" }, subjectIds: ["math", "pc", "si", "fr", "en", "philo", "ar"] },
  // ——— CPGE ———
  { id: "cpge-mp", levelId: "cpge", slug: "mpsi-mp", name: { fr: "MPSI / MP", ar: "MPSI / MP", en: "MPSI / MP" }, subjectIds: ["math", "pc", "si", "info", "fr", "en", "philo"] },
  { id: "cpge-psi", levelId: "cpge", slug: "pcsi-psi", name: { fr: "PCSI / PSI", ar: "PCSI / PSI", en: "PCSI / PSI" }, subjectIds: ["math", "pc", "si", "info", "fr", "en", "philo"] },
  { id: "cpge-tsi", levelId: "cpge", slug: "tsi", name: { fr: "TSI", ar: "TSI", en: "TSI" }, subjectIds: ["math", "pc", "si", "info", "fr", "en"] },
  { id: "cpge-ecs", levelId: "cpge", slug: "ecs", name: { fr: "ECS (Économique et Commerciale, option Scientifique)", ar: "ECS", en: "ECS" }, subjectIds: ["math", "eco", "hg", "fr", "en", "philo"] },
  { id: "cpge-ect", levelId: "cpge", slug: "ect", name: { fr: "ECT (Économique et Commerciale, option Technologique)", ar: "ECT", en: "ECT" }, subjectIds: ["math", "eco", "fr", "en", "philo"] },
];

export function getLevel(slug: string): Level | undefined {
  return LEVELS.find((l) => l.slug === slug);
}

export function getStreamsByLevel(levelId: string): Stream[] {
  return STREAMS.filter((s) => s.levelId === levelId);
}

export function getSubject(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}
