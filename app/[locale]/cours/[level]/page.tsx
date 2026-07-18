import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLevel, getLevels, getStreamsByLevel } from "@/features/catalog/queries";
import { PageHero } from "@/components/decor";
import { Reveal } from "@/components/reveal";
import type { Locale } from "@/i18n/routing";

export async function generateStaticParams() {
  const levels = await getLevels();
  return levels.map((level) => ({ level: level.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; level: string }>;
}): Promise<Metadata> {
  const { locale, level: levelSlug } = await params;
  const level = await getLevel(levelSlug);
  if (!level) return {};
  return { title: level.name[locale] };
}

export default async function LevelPage({
  params,
}: {
  params: Promise<{ locale: Locale; level: string }>;
}) {
  const { locale, level: levelSlug } = await params;
  setRequestLocale(locale);
  const level = await getLevel(levelSlug);
  if (!level) notFound();
  const t = await getTranslations("catalog");
  const streams = await getStreamsByLevel(levelSlug);

  return (
    <>
      <PageHero
        patternId={`level-zellige-${levelSlug}`}
        eyebrow={level.shortName[locale]}
        title={level.name[locale]}
        subtitle={level.description[locale]}
      />

      <div className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <Reveal>
            <h2 className="text-xl font-bold text-slate-900">{t("stream")}</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {streams.map((stream, i) => (
              <Reveal key={stream.slug} delay={(i % 3) * 90}>
                <Link
                  href={`/cours/${level.slug}/${stream.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/5"
                >
                  <span className="absolute inset-y-0 start-0 w-1 bg-gradient-to-b from-brand-500 to-brand-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-brand-800">
                    {stream.name[locale]}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {t("subjectsCount", { count: stream.subjects.length })}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
