import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LEVELS } from "@/features/catalog/taxonomy";
import type { Locale } from "@/i18n/routing";
import { Logo } from "./logo";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Logo className="h-9 w-9" />
            <span className="text-xl font-bold text-white">
              {t("common.appName")}
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            {t("footer.description")}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">
            {t("footer.sections.platform")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/cours" className="hover:text-white">
                {t("nav.courses")}
              </Link>
            </li>
            <li>
              <Link href="/examens" className="hover:text-white">
                {t("nav.exams")}
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/examens", query: { type: "blanc" } }}
                className="hover:text-white"
              >
                {t("nav.mockExams")}
              </Link>
            </li>
            <li>
              <Link href="/concours" className="hover:text-white">
                {t("nav.concours")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">
            {t("footer.sections.levels")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {LEVELS.map((level) => (
              <li key={level.id}>
                <Link
                  href={`/cours/${level.slug}`}
                  className="hover:text-white"
                >
                  {level.name[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-slate-500 sm:px-6">
          © {year} {t("common.appName")} — {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
