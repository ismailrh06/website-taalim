import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { Logo } from "./logo";
import { AuthNav } from "./auth/auth-nav";

const navLinkClass =
  "relative py-1 transition-colors hover:text-brand-700 " +
  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:scale-x-0 " +
  "after:rounded-full after:bg-gradient-to-r after:from-brand-500 after:to-brand-700 " +
  "after:transition-transform after:duration-300 hover:after:scale-x-100";

export function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 shadow-sm shadow-slate-900/[0.03] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <Logo className="h-9 w-9 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            {t("common.appName")}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/cours" className={navLinkClass}>
            {t("nav.courses")}
          </Link>
          <Link href="/examens" className={navLinkClass}>
            {t("nav.exams")}
          </Link>
          <Link href="/exercices" className={navLinkClass}>
            {t("nav.practice")}
          </Link>
          <Link
            href={{ pathname: "/examens", query: { type: "blanc" } }}
            className={navLinkClass}
          >
            {t("nav.mockExams")}
          </Link>
          <Link href="/cours/cpge" className={navLinkClass}>
            {t("nav.cpge")}
          </Link>
          <Link href="/concours" className={navLinkClass}>
            {t("nav.concours")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <AuthNav />
        </div>
      </div>
    </header>
  );
}
