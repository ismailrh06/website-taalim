"use client";

// Poste de travail interactif d'un exercice. Il orchestre les trois outils
// pédagogiques (indices progressifs, tuteur socratique, réflexion) et calcule
// EN DIRECT le score d'autonomie à partir des aides consommées — la métrique
// signature de Qimma.

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Exercise } from "@/features/exercises/types";
import { computeAutonomy, autonomyLevel, type AutonomyLevel } from "@/features/hints/autonomy";
import { HintLadder } from "./hint-ladder";
import { SocraticChat } from "./socratic-chat";
import { ReflectionPanel } from "./reflection-panel";
import { IconHint, IconTutorAI } from "@/components/icons";

const LEVEL_STYLES: Record<AutonomyLevel, { bar: string; text: string }> = {
  excellente: { bar: "bg-emerald-500", text: "text-emerald-700" },
  bonne: { bar: "bg-brand-600", text: "text-brand-700" },
  moyenne: { bar: "bg-accent-500", text: "text-amber-700" },
  "a-renforcer": { bar: "bg-red-500", text: "text-red-700" },
};

export function ExerciseWorkspace({ exercise }: { exercise: Exercise }) {
  const t = useTranslations("exercise");
  const [tab, setTab] = useState<"hints" | "tutor">("hints");
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [correctionRevealed, setCorrectionRevealed] = useState(false);
  const [tutorHintsUsed, setTutorHintsUsed] = useState(0);

  const score = computeAutonomy({ hintsRevealed, correctionRevealed, tutorHintsUsed });
  const level = autonomyLevel(score);
  const styles = LEVEL_STYLES[level];

  return (
    <div className="space-y-6">
      {/* Jauge d'autonomie */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="text-sm font-semibold text-slate-700">{t("autonomy.title")}</h3>
          <span className={`text-2xl font-bold ${styles.text}`}>{score}</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ${styles.bar}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <p className={`mt-2 text-xs font-medium ${styles.text}`}>
          {t(`autonomy.levels.${level}`)}
        </p>
        <p className="mt-1 text-xs text-slate-400">{t("autonomy.hint")}</p>
      </div>

      {/* Onglets Indices / Tuteur */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => setTab("hints")}
            className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${
              tab === "hints"
                ? "border-b-2 border-brand-700 text-brand-700"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <IconHint className="h-4 w-4" />
            {t("tabs.hints")}
          </button>
          <button
            type="button"
            onClick={() => setTab("tutor")}
            className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${
              tab === "tutor"
                ? "border-b-2 border-brand-700 text-brand-700"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <IconTutorAI className="h-4 w-4" />
            {t("tabs.tutor")}
          </button>
        </div>
        <div className="p-5">
          {tab === "hints" ? (
            <HintLadder
              exercise={exercise}
              hintsRevealed={hintsRevealed}
              correctionRevealed={correctionRevealed}
              onRevealNext={() => setHintsRevealed((n) => Math.min(n + 1, exercise.hints.length))}
              onRevealCorrection={() => setCorrectionRevealed(true)}
            />
          ) : (
            <SocraticChat exercise={exercise} onTutorHintsChange={setTutorHintsUsed} />
          )}
        </div>
      </div>

      {/* Réflexion post-exercice */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <ReflectionPanel exercise={exercise} />
      </div>
    </div>
  );
}
