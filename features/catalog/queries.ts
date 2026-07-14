// Couche de lecture pour la taxonomie — seule porte d'entrée vers Prisma pour
// les Server Components (cf. ARCHITECTURE.md §2). Les DTO exposent la forme
// `{ fr, ar, en }` déjà utilisée par les composants pour rester compatibles
// avec l'ancienne version statique (features/catalog/taxonomy.ts).
import { prisma } from "@/lib/prisma";
import type { LocalizedText } from "./taxonomy";

export interface LevelDTO {
  slug: string;
  name: LocalizedText;
  shortName: LocalizedText;
  description: LocalizedText;
}

export interface SubjectDTO {
  slug: string;
  iconKey: string;
  name: LocalizedText;
}

export interface StreamDTO {
  slug: string;
  name: LocalizedText;
  subjects: SubjectDTO[];
}

function toLevelDTO(l: {
  slug: string;
  nameFr: string;
  nameAr: string;
  nameEn: string;
  shortNameFr: string;
  shortNameAr: string;
  shortNameEn: string;
  descFr: string;
  descAr: string;
  descEn: string;
}): LevelDTO {
  return {
    slug: l.slug,
    name: { fr: l.nameFr, ar: l.nameAr, en: l.nameEn },
    shortName: { fr: l.shortNameFr, ar: l.shortNameAr, en: l.shortNameEn },
    description: { fr: l.descFr, ar: l.descAr, en: l.descEn },
  };
}

function toSubjectDTO(s: {
  slug: string;
  icon: string;
  nameFr: string;
  nameAr: string;
  nameEn: string;
}): SubjectDTO {
  return {
    slug: s.slug,
    iconKey: s.icon,
    name: { fr: s.nameFr, ar: s.nameAr, en: s.nameEn },
  };
}

function toStreamDTO(s: {
  slug: string;
  nameFr: string;
  nameAr: string;
  nameEn: string;
  subjects: Parameters<typeof toSubjectDTO>[0][];
}): StreamDTO {
  return {
    slug: s.slug,
    name: { fr: s.nameFr, ar: s.nameAr, en: s.nameEn },
    subjects: s.subjects.map(toSubjectDTO),
  };
}

export async function getLevels(): Promise<LevelDTO[]> {
  const levels = await prisma.level.findMany({ orderBy: { slug: "asc" } });
  return levels.map(toLevelDTO);
}

export async function getLevel(slug: string): Promise<LevelDTO | null> {
  const level = await prisma.level.findUnique({ where: { slug } });
  return level ? toLevelDTO(level) : null;
}

export async function getLevelsWithStreams(): Promise<
  (LevelDTO & { streams: StreamDTO[] })[]
> {
  const levels = await prisma.level.findMany({
    orderBy: { slug: "asc" },
    include: { streams: { include: { subjects: true } } },
  });
  return levels.map((l) => ({
    ...toLevelDTO(l),
    streams: l.streams.map(toStreamDTO),
  }));
}

export async function getStreamsByLevel(levelSlug: string): Promise<StreamDTO[]> {
  const streams = await prisma.stream.findMany({
    where: { level: { slug: levelSlug } },
    include: { subjects: true },
  });
  return streams.map(toStreamDTO);
}

export async function getStream(
  levelSlug: string,
  streamSlug: string,
): Promise<{ level: LevelDTO; stream: StreamDTO } | null> {
  const stream = await prisma.stream.findFirst({
    where: { slug: streamSlug, level: { slug: levelSlug } },
    include: { subjects: true, level: true },
  });
  if (!stream) return null;
  return { level: toLevelDTO(stream.level), stream: toStreamDTO(stream) };
}

export async function getAllStreamParams(): Promise<
  { level: string; stream: string }[]
> {
  const streams = await prisma.stream.findMany({
    select: { slug: true, level: { select: { slug: true } } },
  });
  return streams.map((s) => ({ level: s.level.slug, stream: s.slug }));
}
