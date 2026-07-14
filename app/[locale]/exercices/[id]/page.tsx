import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { DEMO_EXERCISES, getExercise } from "@/features/exercises/demo-exercises";
import { getSubject, LEVELS } from "@/features/catalog/taxonomy";
import { ExerciseWorkspace } from "@/components/exercises/exercise-workspace";
import { IconTimer } from "@/components/icons";

// Pré-génère chaque exercice dans les 3 langues (bon pour le SEO — cf. §5).
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    DEMO_EXERCISES.map((ex) => ({ locale, id: ex.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const exercise = getExercise(id);
  if (!exercise) return {};
  const t = await getTranslations({ locale, namespace: "exercise" });
  return {
    title: exercise.title,
    description: `${exercise.chapter} · ${t("metaDescription")}`,
  };
}

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const exercise = getExercise(id);
  if (!exercise) notFound();

  const t = await getTranslations("exercise");
  const subject = getSubject(exercise.subjectId);
  const level = LEVELS.find((l) => l.id === exercise.levelId);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/exercices" className="hover:text-brand-700">
          {t("breadcrumb")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{subject?.name[locale]}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
        {/* Colonne énoncé (statique, indexable) */}
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-brand-100 px-2.5 py-1 font-bold uppercase tracking-wide text-brand-800">
              {subject?.name[locale]}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
              {level?.shortName[locale]}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
              {t(`difficulty.${exercise.difficulty}`)}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
              <IconTimer className="h-3.5 w-3.5" />
              {t("estimated", { min: exercise.estimatedMin })}
            </span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            {exercise.chapter}
          </p>
          <h1
            dir="auto"
            className="mt-1 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            {exercise.title}
          </h1>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              {t("statement")}
            </h2>
            <p
              dir="auto"
              className="whitespace-pre-line text-[15px] leading-relaxed text-slate-800"
            >
              {exercise.statement}
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-900">
            {t("philosophy")}
          </div>
        </div>

        {/* Colonne outils interactifs */}
        <ExerciseWorkspace exercise={exercise} />
      </div>
    </div>
  );
}
