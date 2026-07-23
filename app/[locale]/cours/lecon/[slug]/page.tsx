import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link, redirect } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { auth } from "@/auth";
import { COURSES, getCourse } from "@/features/courses/registry";
import { getExercise } from "@/features/exercises/demo-exercises";
import { getSubject, LEVELS } from "@/features/catalog/taxonomy";
import { IconTimer, IconHint, IconTutorAI, IconDownload } from "@/components/icons";

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

// Page volontairement épurée : un résumé court + les objectifs, puis le
// cours complet (mise en page LaTeX Qimma : définitions, démonstrations,
// exemples résolus, exercices corrigés) en téléchargement PDF. Le rendu
// bloc par bloc (features/courses/*.ts, components/courses/course-content)
// reste dans le code — pas supprimé — au cas où on réintroduise plus tard
// une vue interactive complète ; il n'est simplement plus affiché ici :
// un mur de texte détaillé à l'écran décourage plus qu'il n'aide, alors que
// le PDF, lui, est fait pour être lu et annoté à son rythme.
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
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/cours" className="hover:text-brand-700">
          {t("breadcrumb")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{subject?.name[locale]}</span>
      </nav>

      {/* En-tête : bannière façon page de titre LaTeX (templates/qimma-template.tex) */}
      <header className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 to-brand-600 shadow-lg">
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

        <div className="flex items-center justify-center gap-1.5 border-t border-white/10 bg-white/[0.06] px-6 py-3 text-sm text-brand-100">
          <IconTimer className="h-4 w-4" />
          {t("readingMin", { min: course.readingMin })}
        </div>
      </header>

      {/* Résumé court */}
      <p dir="auto" className="mb-8 text-center text-base leading-relaxed text-slate-600">
        {course.summary}
      </p>

      {/* Objectifs — même charte que la tcolorbox "Objectifs du chapitre" du PDF */}
      <section className="mb-8 rounded-xl border border-brand-200 bg-brand-50 p-5 shadow-sm sm:p-6">
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

      {/* CTA principal : le cours complet, en PDF */}
      {course.pdfUrl && (
        <a
          href={course.pdfUrl}
          download
          className="group mb-8 flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-brand-300 bg-white p-8 text-center shadow-sm transition-colors hover:border-brand-500 hover:bg-brand-50/50 sm:p-10"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm transition-transform group-hover:scale-105">
            <IconDownload className="h-6 w-6" />
          </span>
          <span className="text-lg font-bold text-brand-900">{t("pdfCta")}</span>
          <span className="max-w-md text-sm text-slate-500">{t("pdfHint")}</span>
          <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors group-hover:bg-brand-800">
            {t("pdfButton")}
          </span>
        </a>
      )}

      {/* CTA exercice lié */}
      {relatedExercise && (
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-900 to-brand-950 p-6 text-white sm:p-8">
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
  );
}
