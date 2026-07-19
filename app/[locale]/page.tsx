import Image, { type StaticImageData } from "next/image";
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
import heroImg from "@/public/images/home/hero.jpg";
import writingImg from "@/public/images/home/writing.jpg";
import deskImg from "@/public/images/home/desk.jpg";
import chalkboardImg from "@/public/images/home/chalkboard.jpg";
import classroomImg from "@/public/images/home/classroom.jpg";
import libraryImg from "@/public/images/home/library.jpg";
import graduationImg from "@/public/images/home/graduation.jpg";

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

/// Photo d'en-tête de chaque carte de niveau — mappée par slug, avec repli.
const LEVEL_PHOTOS: Record<string, StaticImageData> = {
  "1bac": deskImg,
  "2bac": chalkboardImg,
  cpge: classroomImg,
};

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
      {/* ————— Hero : photo d'étudiants + voile de marque ————— */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={heroImg}
            alt=""
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="object-cover"
          />
          {/* Voile sombre : le texte reste lisible, la photo reste présente */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/95 via-brand-950/85 to-brand-900/75" />
        </div>
        <HeroSky pattern={false} />

        <div className="relative mx-auto max-w-7xl px-4 pb-48 pt-20 text-center sm:px-6 sm:pb-60 sm:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-950/40 px-4 py-1.5 text-sm font-medium text-brand-200 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
            </span>
            {t("home.hero.badge")}
          </span>

          <h1 className="text-balance mx-auto mt-7 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight drop-shadow-sm sm:text-5xl md:text-6xl">
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

          <p className="text-balance mx-auto mt-6 max-w-2xl text-lg leading-8 text-brand-100/95">
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

      {/* ————— Stats : carte flottante qui chevauche le hero ————— */}
      <section className="relative z-10 -mt-16 px-4 sm:-mt-20 sm:px-6">
        <Reveal>
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 rounded-3xl border border-slate-200/70 bg-white/95 px-4 py-10 shadow-2xl shadow-brand-950/10 backdrop-blur md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.key} className="flex flex-col items-center px-4 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 ring-1 ring-inset ring-brand-600/10">
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

      {/* ————— Comment ça marche : photo + étapes en frise ————— */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          {/* Composition photo */}
          <Reveal className="relative mx-auto w-full max-w-xl">
            <div
              className="absolute -inset-4 -rotate-2 rounded-[2rem] bg-gradient-to-br from-brand-100 via-brand-50 to-accent-400/20"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-brand-950/15">
              <Image
                src={writingImg}
                alt=""
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-brand-950/30 to-transparent"
                aria-hidden="true"
              />
            </div>
            {/* Badge flottant */}
            <div className="absolute -bottom-6 -end-3 flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-xl sm:-end-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-500 text-brand-950">
                <IconPencil className="h-5 w-5" />
              </span>
              <div>
                <p className="text-lg font-extrabold leading-tight text-slate-900">6 000+</p>
                <p className="text-xs font-medium text-slate-500">
                  {t("home.stats.exercises")}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Étapes */}
          <div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
                {t("common.appName")}
              </p>
              <h2 className="text-balance mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {t("home.how.title")}
              </h2>
            </Reveal>
            <div className="relative mt-10">
              {/* Ligne verticale de liaison */}
              <div
                aria-hidden="true"
                className="absolute bottom-8 start-6 top-2 border-s-2 border-dashed border-brand-200"
              />
              <div className="space-y-9">
                {(["one", "two", "three"] as const).map((step, i) => (
                  <Reveal key={step} delay={i * 140}>
                    <div className="relative flex gap-5">
                      <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-lg font-bold text-white shadow-lg shadow-brand-700/25 ring-4 ring-white">
                        {i + 1}
                      </span>
                      <div className="pt-1">
                        <h3 className="text-lg font-bold text-slate-900">
                          {t(`home.how.steps.${step}.title`)}
                        </h3>
                        <p className="mt-1.5 max-w-md text-sm leading-6 text-slate-600">
                          {t(`home.how.steps.${step}.desc`)}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ————— Niveaux : cartes à en-tête photo ————— */}
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
                  className="group relative block h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/10"
                >
                  {/* En-tête photo */}
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={LEVEL_PHOTOS[level.slug] ?? deskImg}
                      alt=""
                      fill
                      placeholder="blur"
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/25 to-transparent"
                      aria-hidden="true"
                    />
                    <span
                      className={`absolute bottom-4 start-5 inline-block rounded-xl bg-gradient-to-br px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg ${LEVEL_TINTS[i % LEVEL_TINTS.length]}`}
                    >
                      {level.shortName[locale]}
                    </span>
                  </div>

                  <div className="p-7">
                    <h3 className="text-xl font-bold text-slate-900">
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
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Concours : bandeau photo bibliothèque ————— */}
      <section className="relative overflow-hidden py-20 text-white sm:py-24">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={libraryImg}
            alt=""
            fill
            placeholder="blur"
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/95 via-brand-950/85 to-brand-950/95" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              {t("concours.homeTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-brand-100/90">
              {t("concours.homeSubtitle")}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-2.5">
              {CONCOURS.map((concours) => (
                <Link
                  key={concours.id}
                  href="/concours"
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-brand-50 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-accent-400/60 hover:bg-white/20 hover:text-white"
                >
                  {concours.name[locale]}
                </Link>
              ))}
            </div>
            <Link
              href="/concours"
              className="mt-9 inline-block rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-brand-950 shadow-lg shadow-accent-500/25 transition-all hover:-translate-y-0.5 hover:bg-accent-400 hover:shadow-xl"
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

      {/* ————— CTA final : photo de diplômés ————— */}
      <section className="relative overflow-hidden py-24 text-white sm:py-28">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={graduationImg}
            alt=""
            fill
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/90 via-brand-950/75 to-brand-950/90" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-balance text-3xl font-bold tracking-tight drop-shadow-sm sm:text-4xl">
              {t("home.cta.title")}
            </h2>
            <p className="mt-4 text-lg text-brand-100">{t("home.cta.subtitle")}</p>
            <Link
              href="/inscription"
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
