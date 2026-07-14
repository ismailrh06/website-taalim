// Amorce Neon avec la taxonomie et les examens de référence (features/catalog/taxonomy.ts,
// features/exams/demo-data.ts) et crée le compte admin initial. Les examens ne sont
// réimportés que si la table est vide — une fois du contenu géré depuis /admin,
// ce script ne l'écrase plus (cf. le check existingExamCount ci-dessous).
import bcrypt from "bcryptjs";
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
  const streamsByLevel = new Map<string, number>();
  for (const stream of STREAMS) {
    const order = streamsByLevel.get(stream.levelId) ?? 0;
    streamsByLevel.set(stream.levelId, order + 1);

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
        order,
        subjects: { connect: subjects.map((s) => ({ id: s.id })) },
      },
      update: {
        order,
        subjects: { set: subjects.map((s) => ({ id: s.id })) },
      },
    });
  }

  console.log("→ Exams…");
  const existingExamCount = await prisma.exam.count();
  if (existingExamCount > 0) {
    console.log(
      `  (${existingExamCount} examens déjà en base — probablement modifiés depuis l'admin, on ne touche pas)`,
    );
  }
  for (const exam of existingExamCount > 0 ? [] : DEMO_EXAMS) {
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

  console.log("→ Compte admin…");
  const adminEmail = process.env.ADMIN_INITIAL_EMAIL;
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD;
  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.upsert({
      where: { email: adminEmail },
      create: { email: adminEmail, name: "Admin", role: "ADMIN", passwordHash },
      update: {}, // ne réinitialise pas le mot de passe s'il a déjà été changé
    });
  } else {
    console.warn(
      "  ✗ ADMIN_INITIAL_EMAIL / ADMIN_INITIAL_PASSWORD absents — aucun compte admin créé.",
    );
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
