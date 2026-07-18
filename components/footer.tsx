import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LEVELS } from "@/features/catalog/taxonomy";
import type { Locale } from "@/i18n/routing";
import { Logo } from "./logo";
import { ZelligePattern } from "./decor";

const footerLinkClass = "transition-colors hover:text-white";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-950 text-slate-300">
      {/* Décor : zellige en filigrane + lueur de sommet */}
      <ZelligePattern
        id="footer-zellige"
        className="pointer-events-none absolute inset-0 h-full w-full text-brand-400/[0.04]"
      />
      <div
        className="pointer-events-none absolute -top-24 start-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl rtl:translate-x-1/2"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
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
          {/* Mini-sommet décoratif */}
          <svg
            className="mt-6 h-8 w-40 text-brand-800"
            viewBox="0 0 160 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 30 L34 12 L52 22 L84 4 L108 18 L132 10 L158 26"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="84" cy="4" r="3" fill="#f59e0b" />
          </svg>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">
            {t("footer.sections.platform")}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/cours" className={footerLinkClass}>
                {t("nav.courses")}
              </Link>
            </li>
            <li>
              <Link href="/examens" className={footerLinkClass}>
                {t("nav.exams")}
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: "/examens", query: { type: "blanc" } }}
                className={footerLinkClass}
              >
                {t("nav.mockExams")}
              </Link>
            </li>
            <li>
              <Link href="/concours" className={footerLinkClass}>
                {t("nav.concours")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">
            {t("footer.sections.levels")}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {LEVELS.map((level) => (
              <li key={level.id}>
                <Link href={`/cours/${level.slug}`} className={footerLinkClass}>
                  {level.name[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-slate-800/80">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-slate-500 sm:px-6">
          © {year} {t("common.appName")} — {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
