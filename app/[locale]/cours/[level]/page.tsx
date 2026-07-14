import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LEVELS, getLevel, getStreamsByLevel } from "@/features/catalog/taxonomy";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return LEVELS.map((level) => ({ level: level.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; level: string }>;
}): Promise<Metadata> {
  const { locale, level: levelSlug } = await params;
  const level = getLevel(levelSlug);
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
  const level = getLevel(levelSlug);
  if (!level) notFound();
  const t = await getTranslations("catalog");
  const streams = getStreamsByLevel(level.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <span className="inline-block rounded-lg bg-brand-100 px-3 py-1 text-sm font-bold text-brand-800">
        {level.shortName[locale]}
      </span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {level.name[locale]}
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        {level.description[locale]}
      </p>

      <h2 className="mt-12 text-xl font-bold text-slate-900">{t("stream")}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {streams.map((stream) => (
          <Link
            key={stream.id}
            href={`/cours/${level.slug}/${stream.slug}`}
            className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-300 hover:shadow-md"
          >
            <h3 className="font-semibold text-slate-900 group-hover:text-brand-800">
              {stream.name[locale]}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {t("subjectsCount", { count: stream.subjectIds.length })}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
