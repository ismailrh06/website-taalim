import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  CONCOURS_CATEGORIES,
  getConcoursByCategory,
} from "@/features/catalog/concours";
import { CONCOURS_CATEGORY_ICONS } from "@/components/icons";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "concours" });
  return { title: t("title") };
}

export default async function ConcoursPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("concours");
  const tCatalog = await getTranslations("catalog");

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">{t("subtitle")}</p>

      <div className="mt-12 space-y-14">
        {CONCOURS_CATEGORIES.map((category) => {
          const Icon = CONCOURS_CATEGORY_ICONS[category.id];
          return (
          <section key={category.id}>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {category.name[locale]}
                </h2>
                <p className="text-sm text-slate-500">
                  {category.description[locale]}
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {getConcoursByCategory(category.id).map((concours) => (
                <div
                  key={concours.id}
                  className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-300 hover:shadow-md"
                >
                  <h3 className="font-semibold text-slate-900">
                    {concours.name[locale]}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-brand-700">
                    {concours.school[locale]}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                    {concours.description[locale]}
                  </p>
                  <Link
                    href={{
                      pathname: "/examens",
                      query: {
                        type: concours.category === "grandes-ecoles" && concours.id === "cnc"
                          ? "cnc"
                          : "concours",
                      },
                    }}
                    className="mt-4 text-sm font-semibold text-brand-700 hover:text-brand-800"
                  >
                    {t("annales")} →
                  </Link>
                </div>
              ))}
            </div>
          </section>
          );
        })}
      </div>

      <p className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        {tCatalog("comingSoon")}
      </p>
    </div>
  );
}
