import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { COURSES, getCourse } from "@/features/courses/registry";
import { getExercise } from "@/features/exercises/demo-exercises";
import { getSubject, LEVELS } from "@/features/catalog/taxonomy";
import { CourseContent } from "@/components/courses/course-content";
import { IconTimer, IconHint, IconTutorAI } from "@/components/icons";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    COURSES.map((c) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return { title: course.title, description: course.summary };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const course = getCourse(slug);
  if (!course) notFound();

  const t = await getTranslations("course");
  const subject = getSubject(course.subjectId);
  const level = LEVELS.find((l) => l.id === course.levelId);
  const relatedExercise = course.relatedExerciseIds?.[0]
    ? getExercise(course.relatedExerciseIds[0])
    : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/cours" className="hover:text-brand-700">
          {t("breadcrumb")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{subject?.name[locale]}</span>
      </nav>

      {/* En-tête */}
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-brand-100 px-2.5 py-1 font-bold uppercase tracking-wide text-brand-800">
            {subject?.name[locale]}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
            {level?.shortName[locale]}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
            <IconTimer className="h-3.5 w-3.5" />
            {t("readingMin", { min: course.readingMin })}
          </span>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {course.chapter}
        </p>
        <h1
          dir="auto"
          className="mt-1 text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
        >
          {course.title}
        </h1>
        <p dir="auto" className="mt-3 max-w-3xl text-slate-600">
          {course.summary}
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Sommaire */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            {t("toc")}
          </p>
          <nav className="space-y-1 border-s border-slate-200 ps-3 text-sm">
            {course.sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block py-1 text-slate-600 transition-colors hover:text-brand-700"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Contenu */}
        <div className="min-w-0">
          {/* Objectifs d'apprentissage */}
          <section className="mb-10 rounded-2xl border border-brand-100 bg-brand-50 p-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-800">
              {t("objectives")}
            </h2>
            <ul dir="auto" className="space-y-2">
              {course.objectives.map((obj, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          <CourseContent course={course} answerLabel={t("answer")} />

          {/* CTA exercice lié */}
          {relatedExercise && (
            <div className="mt-12 rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-900 to-brand-950 p-6 text-white sm:p-8">
              <div className="flex items-center gap-2 text-accent-400">
                <IconHint className="h-5 w-5" />
                <IconTutorAI className="h-5 w-5" />
              </div>
              <h2 className="mt-3 text-xl font-bold">{t("relatedTitle")}</h2>
              <p className="mt-2 max-w-xl text-sm text-brand-100">{t("relatedDesc")}</p>
              <Link
                href={`/exercices/${relatedExercise.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-400"
              >
                {t("relatedCta")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
