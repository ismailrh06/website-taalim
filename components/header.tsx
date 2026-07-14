import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { Logo } from "./logo";

export function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-9 w-9" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            {t("common.appName")}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/cours" className="transition-colors hover:text-brand-700">
            {t("nav.courses")}
          </Link>
          <Link href="/examens" className="transition-colors hover:text-brand-700">
            {t("nav.exams")}
          </Link>
          <Link
            href={{ pathname: "/examens", query: { type: "blanc" } }}
            className="transition-colors hover:text-brand-700"
          >
            {t("nav.mockExams")}
          </Link>
          <Link
            href="/cours/cpge"
            className="transition-colors hover:text-brand-700"
          >
            {t("nav.cpge")}
          </Link>
          <Link href="/concours" className="transition-colors hover:text-brand-700">
            {t("nav.concours")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <Link
            href="/cours"
            className="hidden rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800 sm:block"
          >
            {t("nav.signup")}
          </Link>
        </div>
      </div>
    </header>
  );
}
