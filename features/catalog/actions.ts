"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/authz";
import { logAudit } from "@/lib/audit";
import { streamSchema } from "./schemas";

const LOCALES = ["fr", "ar", "en"] as const;
function revalidateCoursePages() {
  for (const locale of LOCALES) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/cours`);
    revalidatePath(`/${locale}/cours`, "layout");
  }
}

function parseStreamForm(formData: FormData) {
  return streamSchema.safeParse({
    slug: formData.get("slug"),
    nameFr: formData.get("nameFr"),
    nameAr: formData.get("nameAr"),
    nameEn: formData.get("nameEn"),
    subjectSlugs: formData.getAll("subjectSlugs"),
  });
}

export async function createStream(levelSlug: string, formData: FormData) {
  const admin = await requireAdmin();
  const parsed = parseStreamForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const data = parsed.data;

  const level = await prisma.level.findUniqueOrThrow({ where: { slug: levelSlug } });
  const subjects = await prisma.subject.findMany({
    where: { slug: { in: data.subjectSlugs } },
  });
  const maxOrder = await prisma.stream.aggregate({
    where: { levelId: level.id },
    _max: { order: true },
  });

  const stream = await prisma.stream.create({
    data: {
      slug: data.slug,
      nameFr: data.nameFr,
      nameAr: data.nameAr,
      nameEn: data.nameEn,
      levelId: level.id,
      order: (maxOrder._max.order ?? 0) + 1,
      subjects: { connect: subjects.map((s) => ({ id: s.id })) },
    },
  });

  await logAudit({
    userId: admin.id,
    action: "CREATE",
    entityType: "Stream",
    entityId: stream.id,
    entityLabel: stream.nameFr,
  });

  revalidateCoursePages();
  return { success: true };
}

export async function updateStream(streamId: string, formData: FormData) {
  const admin = await requireAdmin();
  const parsed = parseStreamForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const data = parsed.data;

  const subjects = await prisma.subject.findMany({
    where: { slug: { in: data.subjectSlugs } },
  });

  const stream = await prisma.stream.update({
    where: { id: streamId },
    data: {
      slug: data.slug,
      nameFr: data.nameFr,
      nameAr: data.nameAr,
      nameEn: data.nameEn,
      subjects: { set: subjects.map((s) => ({ id: s.id })) },
    },
  });

  await logAudit({
    userId: admin.id,
    action: "UPDATE",
    entityType: "Stream",
    entityId: stream.id,
    entityLabel: stream.nameFr,
  });

  revalidateCoursePages();
  return { success: true };
}

export async function deleteStream(streamId: string) {
  const admin = await requireAdmin();

  const stream = await prisma.stream.delete({ where: { id: streamId } });

  await logAudit({
    userId: admin.id,
    action: "DELETE",
    entityType: "Stream",
    entityId: stream.id,
    entityLabel: stream.nameFr,
    metadata: { note: "Les examens liés à cette filière ont aussi été supprimés (cascade)." },
  });

  revalidateCoursePages();
  return { success: true };
}

export async function moveStream(streamId: string, direction: "up" | "down") {
  await requireAdmin();

  const stream = await prisma.stream.findUniqueOrThrow({ where: { id: streamId } });
  const neighbor = await prisma.stream.findFirst({
    where: {
      levelId: stream.levelId,
      order: direction === "up" ? { lt: stream.order } : { gt: stream.order },
    },
    orderBy: { order: direction === "up" ? "desc" : "asc" },
  });
  if (!neighbor) return { success: true }; // déjà en bout de liste

  await prisma.$transaction([
    prisma.stream.update({ where: { id: stream.id }, data: { order: neighbor.order } }),
    prisma.stream.update({ where: { id: neighbor.id }, data: { order: stream.order } }),
  ]);

  revalidateCoursePages();
  return { success: true };
}
