import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { filterExercises } from "@/features/exercises/demo-exercises";
import { getSubject, LEVELS, SUBJECTS } from "@/features/catalog/taxonomy";
import { IconChevronDown, IconHint, IconTutorAI, IconTimer } from "@/components/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "exercise" });
  return { title: t("listTitle") };
}

export default async function ExercisesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ level?: string; subject?: string; difficulty?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const filters = await searchParams;
  const t = await getTranslations("exercise");
  const tc = await getTranslations("catalog");

  const exercises = filterExercises({
    levelId: filters.level,
    subjectId: filters.subject,
    difficulty: filters.difficulty,
  });

  const selectClass =
    "w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {t("listTitle")}
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">{t("listSubtitle")}</p>

      {/* Bandeau valeur : ce qui distingue un exercice Qimma d'un PDF */}
      <div className="mt-6 flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/10 px-3 py-1.5 text-sm font-medium text-amber-800">
          <IconHint className="h-4 w-4 text-accent-500" />
          {t("badgeHints")}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1.5 text-sm font-medium text-brand-800">
          <IconTutorAI className="h-4 w-4 text-brand-600" />
          {t("badgeTutor")}
        </span>
      </div>

      <form
        method="get"
        className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-slate-600">{tc("level")}</span>
          <div className="relative">
            <select name="level" defaultValue={filters.level ?? ""} className={selectClass}>
              <option value="">{t("allLevels")}</option>
              {LEVELS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.shortName[locale]}
                </option>
              ))}
            </select>
            <IconChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-slate-600">{tc("subject")}</span>
          <div className="relative">
            <select name="subject" defaultValue={filters.subject ?? ""} className={selectClass}>
              <option value="">{tc("allSubjects")}</option>
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name[locale]}
                </option>
              ))}
            </select>
            <IconChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-slate-600">{t("difficultyLabel")}</span>
          <div className="relative">
            <select name="difficulty" defaultValue={filters.difficulty ?? ""} className={selectClass}>
              <option value="">{t("allDifficulties")}</option>
              {(["facile", "moyen", "difficile"] as const).map((d) => (
                <option key={d} value={d}>
                  {t(`difficulty.${d}`)}
                </option>
              ))}
            </select>
            <IconChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </label>

        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            {tc("filter")}
          </button>
          <Link
            href="/exercices"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white"
          >
            {tc("reset")}
          </Link>
        </div>
      </form>

      <p className="mt-8 text-sm font-medium text-slate-500">
        {tc("results", { count: exercises.length })}
      </p>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {exercises.map((ex) => {
          const subject = getSubject(ex.subjectId);
          const level = LEVELS.find((l) => l.id === ex.levelId);
          return (
            <li key={ex.id}>
              <Link
                href={`/exercices/${ex.slug}`}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-brand-100 px-2.5 py-1 font-bold uppercase tracking-wide text-brand-800">
                    {subject?.name[locale]}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
                    {level?.shortName[locale]}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
                    {t(`difficulty.${ex.difficulty}`)}
                  </span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {ex.chapter}
                </p>
                <h2 dir="auto" className="mt-1 font-semibold text-slate-900">
                  {ex.title}
                </h2>
                <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <IconTimer className="h-3.5 w-3.5" />
                    {t("estimated", { min: ex.estimatedMin })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <IconHint className="h-3.5 w-3.5 text-accent-500" />
                    {t("hintsCount", { count: ex.hints.length })}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
