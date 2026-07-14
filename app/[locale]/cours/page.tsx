import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLevelsWithStreams } from "@/features/catalog/queries";
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
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {t("coursesTitle")}
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">{t("coursesSubtitle")}</p>

      <div className="mt-12 space-y-14">
        {levels.map((level) => {
          const streams = level.streams;
          return (
            <section key={level.slug}>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  {level.name[locale]}
                </h2>
                <Link
                  href={`/cours/${level.slug}`}
                  className="text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  {t("subjectsCount", {
                    count: new Set(streams.flatMap((s) => s.subjects.map((sub) => sub.slug)))
                      .size,
                  })}{" "}
                  →
                </Link>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {streams.map((stream) => (
                  <Link
                    key={stream.slug}
                    href={`/cours/${level.slug}/${stream.slug}`}
                    className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-300 hover:shadow-md"
                  >
                    <h3 className="font-semibold text-slate-900 group-hover:text-brand-800">
                      {stream.name[locale]}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {t("subjectsCount", { count: stream.subjects.length })}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
