import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllStreamParams, getStream } from "@/features/catalog/queries";
import { filterCourses } from "@/features/courses/registry";
import { PageHero } from "@/components/decor";
import { Reveal } from "@/components/reveal";
import { SUBJECT_ICONS, IconBookOpen, IconFileCheck } from "@/components/icons";
import type { Locale } from "@/i18n/routing";

export async function generateStaticParams() {
  return getAllStreamParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; level: string; stream: string }>;
}): Promise<Metadata> {
  const { locale, level: levelSlug, stream: streamSlug } = await params;
  const result = await getStream(levelSlug, streamSlug);
  if (!result) return {};
  return { title: `${result.stream.name[locale]} — ${result.level.shortName[locale]}` };
}

export default async function StreamPage({
  params,
}: {
  params: Promise<{ locale: Locale; level: string; stream: string }>;
}) {
  const { locale, level: levelSlug, stream: streamSlug } = await params;
  setRequestLocale(locale);
  const result = await getStream(levelSlug, streamSlug);
  if (!result) notFound();
  const { level, stream } = result;
  const t = await getTranslations("catalog");

  return (
    <>
      <PageHero
        patternId={`stream-zellige-${streamSlug}`}
        eyebrow={level.name[locale]}
        title={stream.name[locale]}
      >
        <nav className="text-sm text-brand-200/80">
          <Link href="/cours" className="transition-colors hover:text-white">
            {t("coursesTitle")}
          </Link>{" "}
          /{" "}
          <Link
            href={`/cours/${level.slug}`}
            className="transition-colors hover:text-white"
          >
            {level.shortName[locale]}
          </Link>
        </nav>
      </PageHero>

      <div className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <Reveal>
            <h2 className="text-xl font-bold text-slate-900">{t("subject")}</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stream.subjects.map((subject, i) => {
              const Icon = SUBJECT_ICONS[subject.iconKey];
              const courses = filterCourses({
                levelId: levelSlug,
                subjectId: subject.iconKey,
              });

              return (
                <Reveal key={subject.slug} delay={(i % 4) * 80}>
                  <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 ring-1 ring-inset ring-brand-600/10 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 font-semibold text-slate-900">
                      {subject.name[locale]}
                    </h3>

                    {courses.length > 0 ? (
                      <ul className="mt-3 space-y-2">
                        {courses.map((course) => (
                          <li key={course.slug}>
                            <Link
                              href={`/cours/lecon/${course.slug}`}
                              className="flex items-start gap-1.5 text-sm font-medium text-brand-700 transition-colors hover:text-brand-800"
                            >
                              <IconBookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                              <span dir="auto">{course.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 text-sm text-slate-400">{t("noCourseYet")}</p>
                    )}

                    <Link
                      href={{
                        pathname: "/examens",
                        query: { level: level.slug, subject: subject.slug },
                      }}
                      className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-medium text-slate-500 transition-colors hover:text-brand-700"
                    >
                      <IconFileCheck className="h-3.5 w-3.5" />
                      {t("viewExams")}
                      <span aria-hidden className="rtl:rotate-180">→</span>
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            {t("comingSoon")}
          </p>
        </div>
      </div>
    </>
  );
}
