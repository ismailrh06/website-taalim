import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link, redirect } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { auth } from "@/auth";
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

  // Contenu réservé aux comptes connectés — retour sur cette même leçon
  // une fois la connexion effectuée.
  const session = await auth();
  if (!session?.user) {
    redirect({
      href: { pathname: "/connexion", query: { next: `/cours/lecon/${slug}` } },
      locale,
    });
  }

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

      {/* En-tête : bannière façon page de titre LaTeX (templates/qimma-template.tex) */}
      <header className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 to-brand-600 shadow-lg">
        <div className="relative px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex items-start justify-between gap-4">
            <img src="/logo-icon.svg" alt="" aria-hidden className="h-11 w-11 shrink-0 rounded-xl sm:h-12 sm:w-12" />
            <span className="shrink-0 rounded-lg bg-accent-400 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-900">
              {t("badge")}
            </span>
          </div>

          <div className="mt-6 text-center sm:mt-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-200">
              {course.chapter}
            </p>
            <h1
              dir="auto"
              className="mt-2 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              {course.title}
            </h1>
            <p className="mt-3 text-base text-brand-100">
              {subject?.name[locale]} <span className="text-brand-300">•</span> {level?.shortName[locale]}
            </p>
          </div>
        </div>

        {/* bandeau bas : durée + PDF, sur fond blanc comme la fiche « Objectifs » du PDF */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-white/[0.06] px-6 py-4 backdrop-blur-sm sm:px-10">
          <span className="inline-flex items-center gap-1.5 text-sm text-brand-100">
            <IconTimer className="h-4 w-4" />
            {t("readingMin", { min: course.readingMin })}
          </span>
          {course.pdfUrl && (
            <a
              href={course.pdfUrl}
              download
              className="inline-flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 text-brand-900 shadow-sm transition-transform hover:scale-[1.02]"
            >
              <span className="rounded-md bg-accent-400 px-2 py-1 text-xs font-bold uppercase tracking-wide text-amber-900">
                PDF
              </span>
              <span className="text-start">
                <span className="block text-sm font-semibold">{t("pdfCta")}</span>
                <span className="block text-xs text-slate-500">{t("pdfHint")}</span>
              </span>
            </a>
          )}
        </div>
      </header>

      <p dir="auto" className="mb-8 max-w-3xl text-slate-600">
        {course.summary}
      </p>

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
          {/* Objectifs d'apprentissage — même charte que la tcolorbox "Objectifs du chapitre" du PDF */}
          <section className="mb-10 rounded-xl border border-brand-200 bg-brand-50 p-5 shadow-sm sm:p-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-900">
              <span aria-hidden className="text-brand-600">✓</span>
              {t("objectives")}
            </h2>
            <ul dir="auto" className="space-y-2">
              {course.objectives.map((obj, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                  <span aria-hidden className="mt-0.5 shrink-0 font-bold text-accent-500">➤</span>
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
