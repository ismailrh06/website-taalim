import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/logo";
import { HeroSky, SummitRidge } from "@/components/decor";
import { Reveal } from "@/components/reveal";
import { IconCheck } from "@/components/icons";

/// Coquille commune des pages connexion / inscription : formulaire à gauche,
/// panneau de marque animé (ciel, sommets, arguments) à droite sur desktop.
export function AuthShell({
  title,
  subtitle,
  footerPrompt,
  footerLinkLabel,
  footerHref,
  children,
}: {
  title: string;
  subtitle: string;
  footerPrompt: string;
  footerLinkLabel: string;
  footerHref: "/connexion" | "/inscription";
  children: React.ReactNode;
}) {
  const t = useTranslations();

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Formulaire */}
      <div className="flex items-center justify-center bg-slate-50 px-4 py-12 sm:px-6">
        <Reveal className="w-full max-w-md">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/[0.04] sm:p-10">
            <Logo className="h-12 w-12" />
            <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="mt-1.5 text-sm leading-6 text-slate-500">{subtitle}</p>

            <div className="mt-7">{children}</div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            {footerPrompt}{" "}
            <Link
              href={footerHref}
              className="font-bold text-brand-700 underline-offset-4 hover:underline"
            >
              {footerLinkLabel}
            </Link>
          </p>
        </Reveal>
      </div>

      {/* Panneau de marque */}
      <div className="relative hidden overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 lg:block">
        <HeroSky />
        <div className="relative flex h-full flex-col justify-center px-14 pb-32 xl:px-20">
          <Reveal delay={120}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400">
              {t("common.appName")} — قِمّة
            </p>
            <h2 className="text-balance mt-3 max-w-md text-3xl font-extrabold leading-tight tracking-tight text-white xl:text-4xl">
              {t("common.tagline")}
            </h2>
          </Reveal>

          <ul className="mt-10 space-y-4">
            {(["one", "two", "three"] as const).map((key, i) => (
              <Reveal key={key} delay={220 + i * 110}>
                <li className="flex items-center gap-3 text-sm font-medium text-brand-100/90">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  {t(`auth.signup.perks.${key}`)}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <SummitRidge className="absolute inset-x-0 bottom-0 h-32 w-full" />
      </div>
    </div>
  );
}
