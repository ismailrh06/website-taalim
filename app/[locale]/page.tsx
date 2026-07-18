import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLevelsWithStreams } from "@/features/catalog/queries";
import { CONCOURS } from "@/features/catalog/concours";
import { Reveal } from "@/components/reveal";
import { HeroSky, SummitRidge, ZelligePattern } from "@/components/decor";
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

const LEVEL_TINTS = [
  "from-brand-500 to-brand-700",
  "from-brand-600 to-brand-900",
  "from-amber-500 to-amber-700",
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const levels = await getLevelsWithStreams();

  return (
    <>
      {/* ————— Hero ————— */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white">
        <HeroSky />

        <div className="relative mx-auto max-w-7xl px-4 pb-44 pt-20 text-center sm:px-6 sm:pb-56 sm:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-400/10 px-4 py-1.5 text-sm font-medium text-brand-200 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
            </span>
            {t("home.hero.badge")}
          </span>

          <h1 className="text-balance mx-auto mt-7 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            {t.rich("home.hero.title", {
              highlight: (chunks) => (
                <span className="relative whitespace-nowrap text-accent-400">
                  {chunks}
                  <svg
                    className="absolute -bottom-1.5 left-0 h-2 w-full text-accent-500/60"
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 6 Q 25 2 50 5 T 99 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              ),
            })}
          </h1>

          <p className="text-balance mx-auto mt-6 max-w-2xl text-lg leading-8 text-brand-100/90">
            {t("home.hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/cours"
              className="group rounded-full bg-accent-500 px-7 py-3.5 text-base font-bold text-brand-950 shadow-lg shadow-accent-500/25 transition-all hover:-translate-y-0.5 hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-500/30 focus:outline-none focus:ring-4 focus:ring-accent-500/30"
            >
              {t("home.hero.ctaPrimary")}
              <span className="ms-2 inline-block transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/examens"
              className="rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              {t("home.hero.ctaSecondary")}
            </Link>
          </div>
        </div>

        <SummitRidge className="absolute inset-x-0 bottom-0 h-28 w-full sm:h-40" />
      </section>

      {/* ————— Stats ————— */}
      <section className="border-b border-slate-200 bg-white">
        <Reveal>
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-100 px-4 py-12 sm:px-6 md:grid-cols-4 rtl:divide-x-reverse">
            {STATS.map((stat) => (
              <div key={stat.key} className="flex flex-col items-center px-4 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600">
                  <stat.icon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-3xl font-extrabold tabular-nums tracking-tight text-brand-800 sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {t(`home.stats.${stat.key}`)}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ————— Niveaux ————— */}
      <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24">
        <ZelligePattern
          id="levels-zellige"
          className="pointer-events-none absolute inset-0 h-full w-full text-brand-900/[0.025]"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
              1BAC · 2BAC · CPGE
            </p>
            <h2 className="text-balance mt-2 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t("home.levels.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
              {t("home.levels.subtitle")}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {levels.map((level, i) => (
              <Reveal key={level.slug} delay={i * 120}>
                <Link
                  href={`/cours/${level.slug}`}
                  className="group relative block h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/5"
                >
                  {/* Liseré dégradé en haut */}
                  <span
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${LEVEL_TINTS[i % LEVEL_TINTS.length]}`}
                  />
                  <span
                    className={`inline-block rounded-xl bg-gradient-to-br px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm ${LEVEL_TINTS[i % LEVEL_TINTS.length]}`}
                  >
                    {level.shortName[locale]}
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {level.name[locale]}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {level.description[locale]}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {level.streams.slice(0, 4).map((s) => (
                      <span
                        key={s.slug}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 transition-colors group-hover:bg-brand-50 group-hover:text-brand-800"
                      >
                        {s.name[locale]}
                      </span>
                    ))}
                    {level.streams.length > 4 && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
                        +{level.streams.length - 4}
                      </span>
                    )}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-brand-700 transition-all group-hover:gap-2.5">
                    {t("home.levels.explore")}
                    <span aria-hidden className="rtl:rotate-180">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Concours ————— */}
      <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900">
              {t("concours.homeTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              {t("concours.homeSubtitle")}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-2.5">
              {CONCOURS.map((concours) => (
                <Link
                  key={concours.id}
                  href="/concours"
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800 hover:shadow-sm"
                >
                  {concours.name[locale]}
                </Link>
              ))}
            </div>
            <Link
              href="/concours"
              className="mt-9 inline-block rounded-full bg-brand-700 px-6 py-3 text-sm font-bold text-white shadow-md shadow-brand-700/20 transition-all hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-lg"
            >
              {t("concours.homeCta")}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ————— Fonctionnalités ————— */}
      <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24">
        <ZelligePattern
          id="features-zellige"
          className="pointer-events-none absolute inset-0 h-full w-full text-brand-900/[0.025]"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t("home.features.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
              {t("home.features.subtitle")}
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_KEYS.map((key, i) => {
              const Icon = FEATURE_ICONS[key];
              return (
                <Reveal key={key} delay={(i % 3) * 110}>
                  <div className="group h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 ring-1 ring-inset ring-brand-600/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                      {t(`home.features.items.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {t(`home.features.items.${key}.desc`)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ————— Comment ça marche ————— */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t("home.how.title")}
            </h2>
          </Reveal>
          <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {/* Ligne de liaison (desktop) */}
            <div
              aria-hidden="true"
              className="absolute inset-x-[16%] top-6 hidden border-t-2 border-dashed border-brand-200 md:block"
            />
            {(["one", "two", "three"] as const).map((step, i) => (
              <Reveal key={step} delay={i * 140}>
                <div className="relative text-center">
                  <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-lg font-bold text-white shadow-lg shadow-brand-700/25 ring-4 ring-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {t(`home.how.steps.${step}.title`)}
                  </h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-600">
                    {t(`home.how.steps.${step}.desc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— CTA final ————— */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 py-20 text-white sm:py-24">
        <ZelligePattern
          id="cta-zellige"
          className="pointer-events-none absolute inset-0 h-full w-full text-brand-300/[0.06]"
        />
        <div
          className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              {t("home.cta.title")}
            </h2>
            <p className="mt-4 text-lg text-brand-100">{t("home.cta.subtitle")}</p>
            <Link
              href="/cours"
              className="mt-9 inline-block rounded-full bg-accent-500 px-8 py-4 text-base font-bold text-brand-950 shadow-xl shadow-accent-500/25 transition-all hover:-translate-y-0.5 hover:bg-accent-400 hover:shadow-2xl hover:shadow-accent-500/30 focus:outline-none focus:ring-4 focus:ring-accent-500/30"
            >
              {t("home.cta.button")}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
