import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllStreamParams, getStream } from "@/features/catalog/queries";
import { SUBJECT_ICONS } from "@/components/icons";
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
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-slate-500">
        <Link href="/cours" className="hover:text-brand-700">
          {t("coursesTitle")}
        </Link>{" "}
        /{" "}
        <Link href={`/cours/${level.slug}`} className="hover:text-brand-700">
          {level.shortName[locale]}
        </Link>
      </nav>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {stream.name[locale]}
      </h1>
      <p className="mt-2 text-slate-600">{level.name[locale]}</p>

      <h2 className="mt-12 text-xl font-bold text-slate-900">{t("subject")}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stream.subjects.map((subject) => {
          const Icon = SUBJECT_ICONS[subject.iconKey];
          return (
            <div
              key={subject.slug}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-semibold text-slate-900">
                {subject.name[locale]}
              </h3>
              <Link
                href={{
                  pathname: "/examens",
                  query: { level: level.slug, subject: subject.slug },
                }}
                className="mt-2 inline-block text-sm font-medium text-brand-700 hover:text-brand-800"
              >
                {t("examsTitle")} →
              </Link>
            </div>
          );
        })}
      </div>

      <p className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        {t("comingSoon")}
      </p>
    </div>
  );
}
