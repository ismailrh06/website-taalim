// Couche de lecture pour les examens — Prisma (Neon) est la source de vérité ;
// features/exams/demo-data.ts ne sert plus qu'au script prisma/seed.ts.
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/prisma/generated/prisma/client";

export type ExamType = "national" | "regional" | "blanc" | "cnc" | "concours";
export type ExamSessionValue = "normale" | "rattrapage";

export interface ExamDTO {
  id: string;
  title: string;
  levelSlug: string;
  subjectSlug: string;
  type: ExamType;
  year: number;
  session: ExamSessionValue;
  hasCorrection: boolean;
  pdfUrl?: string;
  correctionUrl?: string;
}

const TYPE_TO_DB: Record<ExamType, "NATIONAL" | "REGIONAL" | "BLANC" | "CNC" | "CONCOURS"> = {
  national: "NATIONAL",
  regional: "REGIONAL",
  blanc: "BLANC",
  cnc: "CNC",
  concours: "CONCOURS",
};
const TYPE_FROM_DB: Record<string, ExamType> = {
  NATIONAL: "national",
  REGIONAL: "regional",
  BLANC: "blanc",
  CNC: "cnc",
  CONCOURS: "concours",
};
const SESSION_FROM_DB: Record<string, ExamSessionValue> = {
  NORMALE: "normale",
  RATTRAPAGE: "rattrapage",
};

// Le CNEE (cnee.men.gov.ma) est un formulaire ASP.NET à sélections successives
// sans URL directe par examen (cf. scripts/scrape-cnee.mjs). Pour un examen
// sans pdfUrl vérifié, on renvoie vers la bonne page d'entrée CNEE.
const CNEE_ENTRY_URL: Partial<Record<ExamType, string>> = {
  national: "https://cnee.men.gov.ma/WebNational.aspx",
  regional: "https://cnee.men.gov.ma/WebReg.aspx",
};

export function getOfficialSourceUrl(type: ExamType): string | undefined {
  return CNEE_ENTRY_URL[type];
}

export async function filterExams(filters: {
  levelSlug?: string;
  subjectSlug?: string;
  type?: string;
  year?: number;
}): Promise<ExamDTO[]> {
  const where: Prisma.ExamWhereInput = {
    level: filters.levelSlug ? { slug: filters.levelSlug } : undefined,
    subject: filters.subjectSlug ? { slug: filters.subjectSlug } : undefined,
    type: filters.type ? TYPE_TO_DB[filters.type as ExamType] : undefined,
    year: filters.year,
  };
  const exams = await prisma.exam.findMany({
    where,
    include: { level: true, subject: true },
    orderBy: [{ year: "desc" }, { title: "asc" }],
  });
  return exams.map((e) => ({
    id: e.id,
    title: e.title,
    levelSlug: e.level.slug,
    subjectSlug: e.subject.slug,
    type: TYPE_FROM_DB[e.type],
    year: e.year,
    session: SESSION_FROM_DB[e.session],
    hasCorrection: e.hasCorrection,
    pdfUrl: e.pdfUrl ?? undefined,
    correctionUrl: e.correctionUrl ?? undefined,
  }));
}

export interface AdminExamDTO extends ExamDTO {
  streamSlug: string;
  language: "fr" | "ar" | "en";
  durationMin: number;
}

const LANG_FROM_DB: Record<string, "fr" | "ar" | "en"> = { FR: "fr", AR: "ar", EN: "en" };

export async function getAdminExams(): Promise<AdminExamDTO[]> {
  const exams = await prisma.exam.findMany({
    include: { level: true, subject: true, stream: true },
    orderBy: [{ createdAt: "desc" }],
  });
  return exams.map((e) => ({
    id: e.id,
    title: e.title,
    levelSlug: e.level.slug,
    streamSlug: e.stream.slug,
    subjectSlug: e.subject.slug,
    type: TYPE_FROM_DB[e.type],
    year: e.year,
    session: SESSION_FROM_DB[e.session],
    language: LANG_FROM_DB[e.language],
    durationMin: e.durationMin,
    hasCorrection: e.hasCorrection,
    pdfUrl: e.pdfUrl ?? undefined,
    correctionUrl: e.correctionUrl ?? undefined,
  }));
}

export async function getAdminExamById(id: string): Promise<AdminExamDTO | null> {
  const e = await prisma.exam.findUnique({
    where: { id },
    include: { level: true, subject: true, stream: true },
  });
  if (!e) return null;
  return {
    id: e.id,
    title: e.title,
    levelSlug: e.level.slug,
    streamSlug: e.stream.slug,
    subjectSlug: e.subject.slug,
    type: TYPE_FROM_DB[e.type],
    year: e.year,
    session: SESSION_FROM_DB[e.session],
    language: LANG_FROM_DB[e.language],
    durationMin: e.durationMin,
    hasCorrection: e.hasCorrection,
    pdfUrl: e.pdfUrl ?? undefined,
    correctionUrl: e.correctionUrl ?? undefined,
  };
}

export async function getExamYears(): Promise<number[]> {
  const rows = await prisma.exam.findMany({
    distinct: ["year"],
    select: { year: true },
    orderBy: { year: "desc" },
  });
  return rows.map((r) => r.year);
}
