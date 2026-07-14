"use client";

// Questions de méta-cognition posées APRÈS l'exercice (cf. cahier des charges :
// « pourquoi cette méthode fonctionne ? », « une autre méthode ? », « l'erreur
// fréquente ? »). L'élève réfléchit, puis dévoile une réponse-modèle. Le but
// est de fixer la compréhension, pas de noter.

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Exercise } from "@/features/exercises/types";
import { IconProgress, IconChevronDown } from "@/components/icons";

export function ReflectionPanel({ exercise }: { exercise: Exercise }) {
  const t = useTranslations("reflection");
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-slate-700">
        <IconProgress className="h-5 w-5 text-brand-600" />
        <h3 className="text-base font-semibold">{t("title")}</h3>
      </div>
      <p className="mb-4 text-sm text-slate-500">{t("subtitle")}</p>

      <ul className="space-y-2">
        {exercise.reflection.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className="overflow-hidden rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 bg-white px-4 py-3 text-start text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                <span dir="auto">{item.question}</span>
                <IconChevronDown
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-slate-100 bg-brand-50 px-4 py-3">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                    {t("modelAnswer")}
                  </p>
                  <p dir="auto" className="text-sm leading-relaxed text-slate-800">
                    {item.modelAnswer}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
