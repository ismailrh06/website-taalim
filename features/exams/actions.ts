"use server";

import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/authz";
import { logAudit } from "@/lib/audit";
import { examSchema } from "./schemas";

const TYPE_TO_DB = {
  national: "NATIONAL",
  regional: "REGIONAL",
  blanc: "BLANC",
  cnc: "CNC",
  concours: "CONCOURS",
} as const;
const SESSION_TO_DB = { normale: "NORMALE", rattrapage: "RATTRAPAGE" } as const;
const LANG_TO_DB = { fr: "FR", ar: "AR", en: "EN" } as const;

const LOCALES = ["fr", "ar", "en"] as const;
function revalidateExamPages() {
  for (const locale of LOCALES) revalidatePath(`/${locale}/examens`);
}

async function uploadIfFile(file: FormDataEntryValue | null, pathPrefix: string) {
  if (!(file instanceof File) || file.size === 0) return undefined;
  if (file.type !== "application/pdf") {
    throw new Error("Seuls les fichiers PDF sont acceptés.");
  }
  const blob = await put(`${pathPrefix}/${Date.now()}-${file.name}`, file, {
    access: "public",
    contentType: "application/pdf",
  });
  return blob.url;
}

export async function createExam(formData: FormData) {
  const admin = await requireAdmin();

  const parsed = examSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const data = parsed.data;

  const [uploadedPdf, uploadedCorrection] = await Promise.all([
    uploadIfFile(formData.get("pdfFile"), "examens/sujets"),
    uploadIfFile(formData.get("correctionFile"), "examens/corriges"),
  ]);

  const [level, stream, subject] = await Promise.all([
    prisma.level.findUniqueOrThrow({ where: { slug: data.levelSlug } }),
    prisma.stream.findFirstOrThrow({
      where: { slug: data.streamSlug, level: { slug: data.levelSlug } },
    }),
    prisma.subject.findUniqueOrThrow({ where: { slug: data.subjectSlug } }),
  ]);

  const exam = await prisma.exam.create({
    data: {
      title: data.title,
      levelId: level.id,
      streamId: stream.id,
      subjectId: subject.id,
      type: TYPE_TO_DB[data.type],
      year: data.year,
      session: SESSION_TO_DB[data.session],
      language: LANG_TO_DB[data.language],
      durationMin: data.durationMin,
      hasCorrection: data.hasCorrection,
      pdfUrl: uploadedPdf ?? (data.pdfUrl || undefined),
      correctionUrl: uploadedCorrection ?? (data.correctionUrl || undefined),
    },
  });

  await logAudit({
    userId: admin.id,
    action: "CREATE",
    entityType: "Exam",
    entityId: exam.id,
    entityLabel: exam.title,
  });

  revalidateExamPages();
  return { success: true, id: exam.id };
}

export async function updateExam(examId: string, formData: FormData) {
  const admin = await requireAdmin();

  const parsed = examSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const data = parsed.data;

  const [uploadedPdf, uploadedCorrection] = await Promise.all([
    uploadIfFile(formData.get("pdfFile"), "examens/sujets"),
    uploadIfFile(formData.get("correctionFile"), "examens/corriges"),
  ]);

  const [level, stream, subject] = await Promise.all([
    prisma.level.findUniqueOrThrow({ where: { slug: data.levelSlug } }),
    prisma.stream.findFirstOrThrow({
      where: { slug: data.streamSlug, level: { slug: data.levelSlug } },
    }),
    prisma.subject.findUniqueOrThrow({ where: { slug: data.subjectSlug } }),
  ]);

  const exam = await prisma.exam.update({
    where: { id: examId },
    data: {
      title: data.title,
      levelId: level.id,
      streamId: stream.id,
      subjectId: subject.id,
      type: TYPE_TO_DB[data.type],
      year: data.year,
      session: SESSION_TO_DB[data.session],
      language: LANG_TO_DB[data.language],
      durationMin: data.durationMin,
      hasCorrection: data.hasCorrection,
      pdfUrl: uploadedPdf ?? (data.pdfUrl || null),
      correctionUrl: uploadedCorrection ?? (data.correctionUrl || null),
    },
  });

  await logAudit({
    userId: admin.id,
    action: "UPDATE",
    entityType: "Exam",
    entityId: exam.id,
    entityLabel: exam.title,
  });

  revalidateExamPages();
  return { success: true, id: exam.id };
}

export async function deleteExam(examId: string) {
  const admin = await requireAdmin();

  const exam = await prisma.exam.delete({ where: { id: examId } });

  await logAudit({
    userId: admin.id,
    action: "DELETE",
    entityType: "Exam",
    entityId: exam.id,
    entityLabel: exam.title,
  });

  revalidateExamPages();
  return { success: true };
}
