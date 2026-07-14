import type { LocalizedText } from "./taxonomy";

// Concours d'accès aux universités sélectives, lycées d'excellence / CPGE
// et grandes écoles marocaines. Chaque concours regroupera annales, examens
// blancs et quiz de préparation.

export type ConcoursCategory = "postbac" | "prepa" | "grandes-ecoles";

export interface Concours {
  id: string;
  slug: string;
  category: ConcoursCategory;
  name: LocalizedText;
  school: LocalizedText;
  description: LocalizedText;
}

export const CONCOURS_CATEGORIES: {
  id: ConcoursCategory;
  name: LocalizedText;
  description: LocalizedText;
}[] = [
  {
    id: "postbac",
    name: {
      fr: "Concours post-Bac",
      ar: "مباريات ما بعد الباك",
      en: "Post-Bac entrance exams",
    },
    description: {
      fr: "Les concours d'accès aux universités et écoles sélectives juste après le Bac.",
      ar: "مباريات ولوج الجامعات والمدارس الانتقائية مباشرة بعد الباكالوريا.",
      en: "Entrance exams for selective universities and schools right after the Bac.",
    },
  },
  {
    id: "prepa",
    name: {
      fr: "Accès aux prépas & lycées d'excellence",
      ar: "ولوج الأقسام التحضيرية وثانويات التميز",
      en: "Prépa & excellence high schools admission",
    },
    description: {
      fr: "Sélection et tests d'admission aux CPGE et aux lycées d'excellence.",
      ar: "الانتقاء واختبارات الولوج إلى الأقسام التحضيرية وثانويات التميز.",
      en: "Selection and admission tests for CPGE and excellence high schools.",
    },
  },
  {
    id: "grandes-ecoles",
    name: {
      fr: "Grandes écoles (après prépa)",
      ar: "المدارس العليا (بعد الأقسام التحضيرية)",
      en: "Grandes écoles (after prépa)",
    },
    description: {
      fr: "Les concours d'accès aux grandes écoles d'ingénieurs et de commerce.",
      ar: "مباريات ولوج المدارس العليا للمهندسين والتجارة.",
      en: "Entrance exams for top engineering and business schools.",
    },
  },
];

export const CONCOURS: Concours[] = [
  // ——— Post-Bac ———
  {
    id: "um6p",
    slug: "um6p",
    category: "postbac",
    name: { fr: "Concours UM6P", ar: "مباراة UM6P", en: "UM6P admission" },
    school: {
      fr: "Université Mohammed VI Polytechnique — EMINES, FGSES, SHBM, 1337… (Benguérir)",
      ar: "جامعة محمد السادس متعددة التخصصات التقنية — بنجرير",
      en: "Mohammed VI Polytechnic University — Benguérir",
    },
    description: {
      fr: "Tests d'admission et entretiens des programmes sélectifs de l'UM6P.",
      ar: "اختبارات الولوج ومقابلات البرامج الانتقائية لجامعة UM6P.",
      en: "Admission tests and interviews for UM6P selective programs.",
    },
  },
  {
    id: "ensa",
    slug: "ensa",
    category: "postbac",
    name: { fr: "Concours National ENSA", ar: "المباراة الوطنية ENSA", en: "ENSA national exam" },
    school: {
      fr: "Écoles Nationales des Sciences Appliquées (toutes les villes)",
      ar: "المدارس الوطنية للعلوم التطبيقية",
      en: "National Schools of Applied Sciences",
    },
    description: {
      fr: "Présélection sur note du Bac puis concours écrit commun (maths, physique).",
      ar: "انتقاء أولي بنقطة الباك ثم مباراة كتابية موحدة (رياضيات، فيزياء).",
      en: "Preselection on Bac grades then a common written exam (maths, physics).",
    },
  },
  {
    id: "ensam",
    slug: "ensam",
    category: "postbac",
    name: { fr: "Concours ENSAM", ar: "مباراة ENSAM", en: "ENSAM exam" },
    school: {
      fr: "Écoles Nationales Supérieures d'Arts et Métiers (Meknès, Casablanca, Rabat)",
      ar: "المدارس الوطنية العليا للفنون والمهن",
      en: "National Schools of Arts and Crafts",
    },
    description: {
      fr: "Concours d'accès en 1ère année du cycle ingénieur intégré.",
      ar: "مباراة ولوج السنة الأولى من سلك المهندس المدمج.",
      en: "Entrance exam for the integrated engineering cycle.",
    },
  },
  {
    id: "tafem",
    slug: "tafem-encg",
    category: "postbac",
    name: { fr: "TAFEM — ENCG", ar: "تافم — ENCG", en: "TAFEM — ENCG" },
    school: {
      fr: "Écoles Nationales de Commerce et de Gestion",
      ar: "المدارس الوطنية للتجارة والتسيير",
      en: "National Schools of Business and Management",
    },
    description: {
      fr: "Test d'admissibilité aux formations en management (QCM : logique, langues, culture).",
      ar: "اختبار الولوج لتكوينات التدبير (أسئلة متعددة الاختيارات: منطق، لغات، ثقافة).",
      en: "Admission test for management programs (MCQ: logic, languages, culture).",
    },
  },
  {
    id: "medecine",
    slug: "medecine",
    category: "postbac",
    name: {
      fr: "Concours Médecine, Pharmacie & Dentaire",
      ar: "مباراة الطب والصيدلة وطب الأسنان",
      en: "Medicine, Pharmacy & Dentistry exam",
    },
    school: {
      fr: "Facultés de Médecine et de Pharmacie (concours commun)",
      ar: "كليات الطب والصيدلة (مباراة موحدة)",
      en: "Faculties of Medicine and Pharmacy (common exam)",
    },
    description: {
      fr: "QCM de SVT, physique, chimie et maths basé sur le programme du Bac.",
      ar: "أسئلة متعددة الاختيارات في علوم الحياة والأرض والفيزياء والكيمياء والرياضيات وفق مقرر الباك.",
      en: "MCQ in biology, physics, chemistry and maths based on the Bac curriculum.",
    },
  },
  {
    id: "iav",
    slug: "iav",
    category: "postbac",
    name: { fr: "Concours IAV (APESA)", ar: "مباراة معهد الحسن الثاني (APESA)", en: "IAV exam (APESA)" },
    school: {
      fr: "Institut Agronomique et Vétérinaire Hassan II",
      ar: "معهد الحسن الثاني للزراعة والبيطرة",
      en: "Hassan II Agronomy and Veterinary Institute",
    },
    description: {
      fr: "Concours d'accès aux filières agronomie et vétérinaire.",
      ar: "مباراة ولوج شعب الزراعة والبيطرة.",
      en: "Entrance exam for agronomy and veterinary tracks.",
    },
  },
  // ——— Accès prépas & lycées d'excellence ———
  {
    id: "lydex",
    slug: "lydex",
    category: "prepa",
    name: { fr: "Admission Lydex", ar: "ولوج ثانوية التميز LYDEX", en: "Lydex admission" },
    school: {
      fr: "Lycée d'Excellence de Benguérir (CPGE)",
      ar: "ثانوية التميز ببنجرير (أقسام تحضيرية)",
      en: "Benguérir Excellence High School (CPGE)",
    },
    description: {
      fr: "Sélection sur dossier puis tests écrits — la prépa la plus sélective du royaume.",
      ar: "انتقاء بالملف ثم اختبارات كتابية — أكثر الأقسام التحضيرية انتقائية بالمملكة.",
      en: "File selection then written tests — the most selective prépa in Morocco.",
    },
  },
  {
    id: "lm6e",
    slug: "lm6e",
    category: "prepa",
    name: { fr: "Admission LM6E", ar: "ولوج ثانوية محمد السادس للتميز", en: "LM6E admission" },
    school: {
      fr: "Lycée Mohammed VI d'Excellence (Benslimane)",
      ar: "ثانوية محمد السادس للتميز (بن سليمان)",
      en: "Mohammed VI Excellence High School (Benslimane)",
    },
    description: {
      fr: "Sélection sur dossier et tests pour le cycle secondaire et les CPGE.",
      ar: "انتقاء بالملف واختبارات للسلك الثانوي والأقسام التحضيرية.",
      en: "File selection and tests for high school and CPGE cycles.",
    },
  },
  {
    id: "cpge-publiques",
    slug: "cpge-publiques",
    category: "prepa",
    name: {
      fr: "CPGE publiques",
      ar: "الأقسام التحضيرية العمومية",
      en: "Public CPGE",
    },
    school: {
      fr: "Moulay Youssef, Omar Ibn Al Khattab, Al Azhari, Salmane Al Farissi…",
      ar: "مولاي يوسف، عمر بن الخطاب، الأزهري، سلمان الفارسي…",
      en: "Moulay Youssef, Omar Ibn Al Khattab, Al Azhari, Salmane Al Farissi…",
    },
    description: {
      fr: "Candidature nationale sur dossier (notes de 1ère et 2ème année Bac) — conseils et critères.",
      ar: "ترشيح وطني بالملف (نقط السنتين الأولى والثانية باك) — نصائح ومعايير.",
      en: "National file-based application (1st and 2nd year Bac grades) — tips and criteria.",
    },
  },
  // ——— Grandes écoles (après prépa) ———
  {
    id: "cnc",
    slug: "cnc",
    category: "grandes-ecoles",
    name: { fr: "Concours National Commun (CNC)", ar: "المباراة الوطنية المشتركة (CNC)", en: "National Common Exam (CNC)" },
    school: {
      fr: "EHTP, ENSIAS, EMI, INPT, ENSEM… (écoles d'ingénieurs)",
      ar: "المدارس العليا للمهندسين: EHTP، ENSIAS، EMI، INPT…",
      en: "Engineering schools: EHTP, ENSIAS, EMI, INPT…",
    },
    description: {
      fr: "Le concours des élèves de 2ème année CPGE : annales par filière (MP, PSI, TSI…).",
      ar: "مباراة تلاميذ السنة الثانية من الأقسام التحضيرية: أرشيف حسب الشعبة.",
      en: "The exam for 2nd year CPGE students: past papers per track (MP, PSI, TSI…).",
    },
  },
  {
    id: "iscae",
    slug: "iscae-cae",
    category: "grandes-ecoles",
    name: { fr: "Concours ISCAE (CAE)", ar: "مباراة ISCAE", en: "ISCAE exam (CAE)" },
    school: {
      fr: "Groupe ISCAE (Casablanca, Rabat) — après prépa ECS/ECT",
      ar: "مجموعة ISCAE — بعد الأقسام التحضيرية الاقتصادية",
      en: "ISCAE Group — after ECS/ECT prépa",
    },
    description: {
      fr: "Le concours d'accès à la grande école de commerce publique de référence.",
      ar: "مباراة ولوج المدرسة العليا للتجارة العمومية المرجعية.",
      en: "Entrance exam for Morocco's leading public business school.",
    },
  },
];

export function getConcoursByCategory(category: ConcoursCategory): Concours[] {
  return CONCOURS.filter((c) => c.category === category);
}
