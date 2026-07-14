import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LEVELS, getStreamsByLevel } from "@/features/catalog/taxonomy";
import { CONCOURS } from "@/features/catalog/concours";
import {
  IconLibrary,
  IconTimer,
  IconHint,
  IconTutorAI,
  IconProgress,
  IconBolt,
  IconFileCheck,
  IconPencil,
  IconUsers,
  type IconProps,
} from "@/components/icons";
import type { Locale } from "@/i18n/routing";

const FEATURE_ICONS: Record<string, (props: IconProps) => React.JSX.Element> = {
  library: IconLibrary,
  mock: IconTimer,
  hints: IconHint,
  tutor: IconTutorAI,
  progress: IconProgress,
  offline: IconBolt,
};

const FEATURE_KEYS = ["library", "mock", "hints", "tutor", "progress", "offline"] as const;

const STATS = [
  { key: "exams", value: "1 500+", icon: IconFileCheck },
  { key: "courses", value: "900+", icon: IconLibrary },
  { key: "exercises", value: "6 000+", icon: IconPencil },
  { key: "students", value: "10 000+", icon: IconUsers },
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top, rgba(45,212,191,0.35), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-40 pt-20 text-center sm:px-6 sm:pb-52 sm:pt-28">
          <span className="inline-block rounded-full border border-brand-400/40 bg-brand-400/10 px-4 py-1.5 text-sm font-medium text-brand-200">
            {t("home.hero.badge")}
          </span>
          <h1 className="text-balance mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            {t.rich("home.hero.title", {
              highlight: (chunks) => (
                <span className="text-accent-400">{chunks}</span>
              ),
            })}
          </h1>
          <p className="text-balance mx-auto mt-6 max-w-2xl text-lg leading-8 text-brand-100/90">
            {t("home.hero.subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/cours"
              className="rounded-full bg-accent-500 px-7 py-3.5 text-base font-semibold text-brand-950 shadow-lg transition-transform hover:scale-105"
            >
              {t("home.hero.ctaPrimary")}
            </Link>
            <Link
              href="/examens"
              className="rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              {t("home.hero.ctaSecondary")}
            </Link>
          </div>
        </div>

        {/* Motif de sommet — écho du logo : l'horizon vers lequel on grimpe */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full sm:h-40"
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon
            points="0,180 160,140 320,170 480,110 640,150 800,100 960,160 1120,120 1280,150 1440,130 1440,240 0,240"
            fill="#ffffff"
            fillOpacity="0.05"
          />
          <polygon
            points="0,220 140,190 260,150 400,60 520,140 680,90 760,160 900,120 1040,170 1200,130 1320,180 1440,150 1440,240 0,240"
            fill="#03211f"
            fillOpacity="0.85"
          />
          <circle cx="400" cy="58" r="11" fill="#f59e0b" fillOpacity="0.16" />
          <circle cx="400" cy="58" r="4.5" fill="#fbbf24" />
        </svg>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.key} className="flex flex-col items-center text-center">
              <stat.icon className="h-5 w-5 text-brand-400" />
              <p className="mt-2 text-3xl font-extrabold tabular-nums text-brand-700 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                {t(`home.stats.${stat.key}`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Niveaux */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("home.levels.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            {t("home.levels.subtitle")}
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {LEVELS.map((level) => {
              const streams = getStreamsByLevel(level.id);
              return (
                <Link
                  key={level.id}
                  href={`/cours/${level.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
                >
                  <span className="inline-block rounded-lg bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-800">
                    {level.shortName[locale]}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">
                    {level.name[locale]}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {level.description[locale]}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {streams.slice(0, 4).map((s) => (
                      <span
                        key={s.id}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                      >
                        {s.name[locale]}
                      </span>
                    ))}
                    {streams.length > 4 && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
                        +{streams.length - 4}
                      </span>
                    )}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:gap-2 transition-all">
                    {t("home.levels.explore")} <span aria-hidden>→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Concours */}
      <section className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900">
            {t("concours.homeTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            {t("concours.homeSubtitle")}
          </p>
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {CONCOURS.map((concours) => (
              <Link
                key={concours.id}
                href="/concours"
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
              >
                {concours.name[locale]}
              </Link>
            ))}
          </div>
          <Link
            href="/concours"
            className="mt-8 inline-block rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            {t("concours.homeCta")}
          </Link>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("home.features.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            {t("home.features.subtitle")}
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_KEYS.map((key) => {
              const Icon = FEATURE_ICONS[key];
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-7 transition-colors hover:border-brand-200 hover:bg-brand-50/50"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">
                    {t(`home.features.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {t(`home.features.items.${key}.desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("home.how.title")}
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {(["one", "two", "three"] as const).map((step, i) => (
              <div key={step} className="text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-700 text-lg font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {t(`home.how.steps.${step}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {t(`home.how.steps.${step}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-gradient-to-r from-brand-900 to-brand-700 py-20 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {t("home.cta.title")}
          </h2>
          <p className="mt-4 text-lg text-brand-100">{t("home.cta.subtitle")}</p>
          <Link
            href="/cours"
            className="mt-8 inline-block rounded-full bg-accent-500 px-8 py-4 text-base font-semibold text-brand-950 shadow-lg transition-transform hover:scale-105"
          >
            {t("home.cta.button")}
          </Link>
        </div>
      </section>
    </>
  );
}
