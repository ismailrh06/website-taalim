"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { completeOnboarding } from "@/features/auth/actions";
import type { LevelDTO, StreamDTO } from "@/features/catalog/queries";
import { IconCheck } from "@/components/icons";
import { Spinner } from "./spinner";

type Locale = "fr" | "ar" | "en";
type LevelWithStreams = LevelDTO & { streams: StreamDTO[] };

const cardClass = (selected: boolean) =>
  `group relative w-full rounded-2xl border-2 p-5 text-start transition-all duration-200 ${
    selected
      ? "border-accent-400 bg-white shadow-xl shadow-accent-500/10 -translate-y-0.5"
      : "border-white/10 bg-white/[0.06] hover:border-white/25 hover:bg-white/10 hover:-translate-y-0.5"
  }`;

// La carte passe sur fond blanc une fois sélectionnée — le texte doit suivre,
// sinon il reste blanc sur blanc (bug remonté par l'utilisateur).
const titleClass = (selected: boolean) =>
  `transition-colors duration-200 ${selected ? "text-slate-900" : "text-white"}`;
const subtleClass = (selected: boolean) =>
  `transition-colors duration-200 ${selected ? "text-brand-700" : "text-brand-200"}`;
const mutedClass = (selected: boolean) =>
  `transition-colors duration-200 ${selected ? "text-slate-500" : "text-brand-100/60"}`;
const pillClass = (selected: boolean) =>
  `rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors duration-200 ${
    selected ? "bg-brand-50 text-brand-700" : "bg-white/10 text-brand-100/80"
  }`;

function SelectedBadge({ visible }: { visible: boolean }) {
  return (
    <span
      className={`absolute -end-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent-500 text-brand-950 shadow-lg shadow-accent-500/40 transition-all duration-200 ${
        visible ? "scale-100 opacity-100" : "scale-0 opacity-0"
      }`}
    >
      <IconCheck className="h-4 w-4" />
    </span>
  );
}

export function OnboardingWizard({
  levels,
  firstName,
  next,
}: {
  levels: LevelWithStreams[];
  firstName: string;
  next?: string;
}) {
  const t = useTranslations("auth.onboarding");
  const locale = useLocale() as Locale;
  const [step, setStep] = useState<0 | 1>(0);
  const [levelSlug, setLevelSlug] = useState<string | null>(null);
  const [streamSlug, setStreamSlug] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const level = levels.find((l) => l.slug === levelSlug) ?? null;
  const totalSteps = 2;
  const progress = ((step + 1) / totalSteps) * 100;

  const finish = (input: { levelSlug?: string; streamSlug?: string }) =>
    startTransition(async () => {
      await completeOnboarding({ ...input, next });
    });

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* En-tête + progression */}
      <div className="text-center">
        <p className="animate-fade-up text-xs font-bold uppercase tracking-[0.2em] text-accent-400">
          {t("step", { current: step + 1, total: totalSteps })}
        </p>
        <h1
          className="text-balance mt-3 animate-fade-up text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          style={{ animationDelay: "80ms" }}
        >
          {t("welcome", { name: firstName })}
        </h1>
        <p
          className="mt-2 animate-fade-up text-sm text-brand-100/80 sm:text-base"
          style={{ animationDelay: "160ms" }}
        >
          {t("welcomeSubtitle")}
        </p>
      </div>

      <div
        className="mx-auto mt-8 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-accent-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Étapes — la clé force le remontage et rejoue l'animation d'entrée */}
      <div key={step} className="mt-10">
        {step === 0 ? (
          <>
            <h2 className="animate-fade-up text-center text-lg font-bold text-white">
              {t("levelTitle")}
            </h2>
            <p
              className="mt-1 animate-fade-up text-center text-sm text-brand-100/70"
              style={{ animationDelay: "60ms" }}
            >
              {t("levelSubtitle")}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {levels.map((l, i) => (
                <button
                  key={l.slug}
                  type="button"
                  onClick={() => {
                    setLevelSlug(l.slug);
                    setStreamSlug(null);
                  }}
                  className={`${cardClass(levelSlug === l.slug)} animate-fade-up`}
                  style={{ animationDelay: `${120 + i * 80}ms` }}
                >
                  <SelectedBadge visible={levelSlug === l.slug} />
                  <p className={`text-lg font-extrabold ${titleClass(levelSlug === l.slug)}`}>
                    {l.shortName[locale]}
                  </p>
                  <p className={`mt-0.5 text-sm font-semibold ${subtleClass(levelSlug === l.slug)}`}>
                    {l.name[locale]}
                  </p>
                  <p className={`mt-2 line-clamp-2 text-xs leading-5 ${mutedClass(levelSlug === l.slug)}`}>
                    {l.description[locale]}
                  </p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="animate-fade-up text-center text-lg font-bold text-white">
              {t("streamTitle")}
            </h2>
            <p
              className="mt-1 animate-fade-up text-center text-sm text-brand-100/70"
              style={{ animationDelay: "60ms" }}
            >
              {t("streamSubtitle")}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {(level?.streams ?? []).map((s, i) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setStreamSlug(s.slug)}
                  className={`${cardClass(streamSlug === s.slug)} animate-fade-up`}
                  style={{ animationDelay: `${120 + i * 70}ms` }}
                >
                  <SelectedBadge visible={streamSlug === s.slug} />
                  <p className={`font-bold ${titleClass(streamSlug === s.slug)}`}>
                    {s.name[locale]}
                  </p>
                  <p className={`mt-1 text-xs font-medium ${subtleClass(streamSlug === s.slug)}`}>
                    {t("subjectsCount", { count: s.subjects.length })}
                  </p>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {s.subjects.slice(0, 4).map((subject) => (
                      <span key={subject.slug} className={pillClass(streamSlug === s.slug)}>
                        {subject.name[locale]}
                      </span>
                    ))}
                    {s.subjects.length > 4 && (
                      <span className={pillClass(streamSlug === s.slug)}>
                        +{s.subjects.length - 4}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between gap-4">
        {step === 1 ? (
          <button
            type="button"
            onClick={() => setStep(0)}
            disabled={pending}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-100/70 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50"
          >
            ← {t("back")}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => finish({})}
            disabled={pending}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-brand-100/50 transition-colors hover:text-brand-100/80 disabled:opacity-50"
          >
            {t("skip")}
          </button>
        )}

        {step === 0 ? (
          <button
            type="button"
            onClick={() => setStep(1)}
            disabled={!levelSlug}
            className="flex items-center gap-2 rounded-xl bg-accent-500 px-6 py-3 text-sm font-bold text-brand-950 shadow-lg shadow-accent-500/25 transition-all hover:-translate-y-0.5 hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {t("continue")} →
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              finish({
                levelSlug: levelSlug ?? undefined,
                streamSlug: streamSlug ?? undefined,
              })
            }
            disabled={!streamSlug || pending}
            className="flex items-center gap-2 rounded-xl bg-accent-500 px-6 py-3 text-sm font-bold text-brand-950 shadow-lg shadow-accent-500/25 transition-all hover:-translate-y-0.5 hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {pending && <Spinner />}
            {pending ? t("finishing") : t("finish")}
          </button>
        )}
      </div>
    </div>
  );
}
