import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLevelsWithStreams } from "@/features/catalog/queries";
import { PageHero } from "@/components/decor";
import { Reveal } from "@/components/reveal";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });
  return { title: t("coursesTitle") };
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("catalog");
  const levels = await getLevelsWithStreams();

  return (
    <>
      <PageHero
        patternId="cours-zellige"
        eyebrow="1BAC · 2BAC · CPGE"
        title={t("coursesTitle")}
        subtitle={t("coursesSubtitle")}
      />

      <div className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="space-y-16">
            {levels.map((level, li) => (
              <Reveal key={level.slug} delay={li * 80}>
                <section>
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="rounded-lg bg-brand-700 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                        {level.shortName[locale]}
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900">
                        {level.name[locale]}
                      </h2>
                    </div>
                    <Link
                      href={`/cours/${level.slug}`}
                      className="hidden text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800 sm:block"
                    >
                      {t("subjectsCount", {
                        count: new Set(
                          level.streams.flatMap((s) => s.subjects.map((sub) => sub.slug)),
                        ).size,
                      })}{" "}
                      <span aria-hidden className="rtl:hidden">→</span>
                      <span aria-hidden className="hidden rtl:inline">←</span>
                    </Link>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {level.streams.map((stream) => (
                      <Link
                        key={stream.slug}
                        href={`/cours/${level.slug}/${stream.slug}`}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/5"
                      >
                        <span className="absolute inset-y-0 start-0 w-1 bg-gradient-to-b from-brand-500 to-brand-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-brand-800">
                          {stream.name[locale]}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {t("subjectsCount", { count: stream.subjects.length })}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
