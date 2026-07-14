"use client";

// Échelle d'indices progressifs : l'élève débloque les niveaux un par un, dans
// l'ordre imposé (comprendre → chapitre → piste → formule → première étape),
// puis peut afficher la correction complète en dernier recours. Chaque
// déverrouillage remonte au parent pour recalculer le score d'autonomie.

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Exercise, HintKind } from "@/features/exercises/types";
import { IconHint, IconCheck } from "@/components/icons";

const KIND_META: Record<HintKind, { badge: string }> = {
  comprendre: { badge: "1" },
  chapitre: { badge: "2" },
  piste: { badge: "3" },
  formule: { badge: "4" },
  "premiere-etape": { badge: "5" },
};

export function HintLadder({
  exercise,
  hintsRevealed,
  correctionRevealed,
  onRevealNext,
  onRevealCorrection,
}: {
  exercise: Exercise;
  hintsRevealed: number;
  correctionRevealed: boolean;
  onRevealNext: () => void;
  onRevealCorrection: () => void;
}) {
  const t = useTranslations("hints");
  const [confirmCorrection, setConfirmCorrection] = useState(false);
  const allHintsRevealed = hintsRevealed >= exercise.hints.length;

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-slate-700">
        <IconHint className="h-5 w-5 text-accent-500" />
        <h3 className="text-base font-semibold">{t("title")}</h3>
      </div>
      <p className="mb-5 text-sm text-slate-500">{t("subtitle")}</p>

      <ol className="space-y-3">
        {exercise.hints.map((hint, index) => {
          const revealed = index < hintsRevealed;
          const isNext = index === hintsRevealed;
          return (
            <li
              key={hint.kind}
              className={`rounded-xl border p-4 transition-colors ${
                revealed
                  ? "border-brand-200 bg-brand-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    revealed
                      ? "bg-brand-700 text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {KIND_META[hint.kind].badge}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {t(`kinds.${hint.kind}`)}
                  </p>
                  {revealed ? (
                    <p dir="auto" className="mt-1 text-sm leading-relaxed text-slate-800">
                      {hint.text}
                    </p>
                  ) : isNext ? (
                    <button
                      type="button"
                      onClick={onRevealNext}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-accent-400"
                    >
                      {t("unlock")}
                    </button>
                  ) : (
                    <p className="mt-1 text-sm italic text-slate-400">{t("locked")}</p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Correction complète — dernier recours */}
      <div className="mt-5 rounded-xl border border-slate-200 p-4">
        {correctionRevealed ? (
          <div>
            <div className="mb-2 flex items-center gap-2 text-emerald-700">
              <IconCheck className="h-5 w-5" />
              <h4 className="text-sm font-semibold">{t("correctionTitle")}</h4>
            </div>
            <ol className="space-y-2" dir="auto">
              {exercise.correction.map((step, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-800">
                  <span className="font-semibold text-slate-400">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : !confirmCorrection ? (
          <button
            type="button"
            onClick={() => setConfirmCorrection(true)}
            disabled={!allHintsRevealed}
            className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              allHintsRevealed
                ? "border border-slate-300 text-slate-700 hover:bg-slate-50"
                : "cursor-not-allowed border border-slate-200 text-slate-300"
            }`}
          >
            {allHintsRevealed ? t("showCorrection") : t("showCorrectionLocked")}
          </button>
        ) : (
          <div className="text-center">
            <p className="mb-3 text-sm text-slate-600">{t("confirmCorrection")}</p>
            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onRevealCorrection();
                  setConfirmCorrection(false);
                }}
                className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900"
              >
                {t("confirmYes")}
              </button>
              <button
                type="button"
                onClick={() => setConfirmCorrection(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                {t("confirmNo")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
