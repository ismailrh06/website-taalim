// Peuple Neon à partir des données de référence du code (features/catalog/taxonomy.ts
// et features/exams/demo-data.ts) — ces fichiers restent la source de vérité pour la
// taxonomie tant que l'admin de contenu (ARCHITECTURE.md §3) n'existe pas ; ce script
// ne fait que les copier en base pour que les pages puissent interroger Prisma.
import { prisma } from "../lib/prisma";
import { LEVELS, STREAMS, SUBJECTS } from "../features/catalog/taxonomy";
import { DEMO_EXAMS, type ExamType, type ExamSession } from "../features/exams/demo-data";

const EXAM_TYPE_MAP: Record<ExamType, "NATIONAL" | "REGIONAL" | "BLANC" | "CNC" | "CONCOURS"> = {
  national: "NATIONAL",
  regional: "REGIONAL",
  blanc: "BLANC",
  cnc: "CNC",
  concours: "CONCOURS",
};

const SESSION_MAP: Record<ExamSession, "NORMALE" | "RATTRAPAGE"> = {
  normale: "NORMALE",
  rattrapage: "RATTRAPAGE",
};

async function main() {
  console.log("→ Levels…");
  for (const level of LEVELS) {
    await prisma.level.upsert({
      where: { slug: level.slug },
      create: {
        slug: level.slug,
        nameFr: level.name.fr,
        nameAr: level.name.ar,
        nameEn: level.name.en,
        shortNameFr: level.shortName.fr,
        shortNameAr: level.shortName.ar,
        shortNameEn: level.shortName.en,
        descFr: level.description.fr,
        descAr: level.description.ar,
        descEn: level.description.en,
      },
      update: {},
    });
  }

  console.log("→ Subjects…");
  for (const subject of SUBJECTS) {
    await prisma.subject.upsert({
      where: { slug: subject.slug },
      create: {
        slug: subject.slug,
        nameFr: subject.name.fr,
        nameAr: subject.name.ar,
        nameEn: subject.name.en,
        icon: subject.id,
      },
      update: {},
    });
  }

  console.log("→ Streams…");
  for (const stream of STREAMS) {
    const level = await prisma.level.findUniqueOrThrow({
      where: { slug: LEVELS.find((l) => l.id === stream.levelId)!.slug },
    });
    const subjects = await prisma.subject.findMany({
      where: { slug: { in: stream.subjectIds.map((id) => SUBJECTS.find((s) => s.id === id)!.slug) } },
    });
    await prisma.stream.upsert({
      where: { levelId_slug: { levelId: level.id, slug: stream.slug } },
      create: {
        slug: stream.slug,
        nameFr: stream.name.fr,
        nameAr: stream.name.ar,
        nameEn: stream.name.en,
        levelId: level.id,
        subjects: { connect: subjects.map((s) => ({ id: s.id })) },
      },
      update: {
        subjects: { set: subjects.map((s) => ({ id: s.id })) },
      },
    });
  }

  console.log("→ Exams…");
  await prisma.exam.deleteMany({}); // ré-importé en entier à chaque seed (pas encore de gestion d'édition)
  for (const exam of DEMO_EXAMS) {
    const streamMeta = STREAMS.find((s) => s.id === exam.streamId);
    if (!streamMeta) {
      console.warn(`  ✗ streamId inconnu: ${exam.streamId} (examen ${exam.id})`);
      continue;
    }
    const levelSlug = LEVELS.find((l) => l.id === streamMeta.levelId)!.slug;
    const subjectSlug = SUBJECTS.find((s) => s.id === exam.subjectId)!.slug;

    const level = await prisma.level.findUniqueOrThrow({ where: { slug: levelSlug } });
    const [stream, subject] = await Promise.all([
      prisma.stream.findFirstOrThrow({
        where: { slug: streamMeta.slug, levelId: level.id },
      }),
      prisma.subject.findUniqueOrThrow({ where: { slug: subjectSlug } }),
    ]);

    await prisma.exam.create({
      data: {
        title: exam.title,
        levelId: level.id,
        streamId: stream.id,
        subjectId: subject.id,
        type: EXAM_TYPE_MAP[exam.type],
        year: exam.year,
        session: SESSION_MAP[exam.session],
        language: exam.language === "ar" ? "AR" : "FR",
        durationMin: exam.durationMin,
        hasCorrection: exam.hasCorrection,
        pdfUrl: exam.pdfUrl,
        correctionUrl: exam.correctionUrl,
      },
    });
  }

  const [levelCount, streamCount, subjectCount, examCount, verifiedCount] = await Promise.all([
    prisma.level.count(),
    prisma.stream.count(),
    prisma.subject.count(),
    prisma.exam.count(),
    prisma.exam.count({ where: { pdfUrl: { not: null } } }),
  ]);
  console.log(
    `\n✓ ${levelCount} niveaux, ${streamCount} filières, ${subjectCount} matières, ${examCount} examens (${verifiedCount} avec PDF vérifié).`,
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
