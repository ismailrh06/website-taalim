"use client";

// Quiz interactif de fin de cours : une question à la fois, retour immédiat
// (bonne/mauvaise réponse + explication), score final et possibilité de
// recommencer. Purement local, instantané.

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { QuizQuestion } from "@/features/courses/types";
import { IconCheck } from "@/components/icons";

export function CourseQuiz({ questions }: { questions: QuizQuestion[] }) {
  const t = useTranslations("quiz");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[index];
  const answered = selected !== null;
  const isLast = index === questions.length - 1;

  function choose(i: number) {
    if (answered) return;
    setSelected(i);
    if (i === question.answer) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      setFinished(true);
    } else {
      setIndex((n) => n + 1);
      setSelected(null);
    }
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    const ratio = score / questions.length;
    const tone =
      ratio >= 0.8 ? "text-emerald-700" : ratio >= 0.5 ? "text-amber-700" : "text-red-700";
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-sm font-medium text-slate-500">{t("result")}</p>
        <p className={`my-2 text-4xl font-bold ${tone}`}>
          {score} / {questions.length}
        </p>
        <p className="mb-5 text-sm text-slate-600">
          {ratio >= 0.8 ? t("resultGood") : ratio >= 0.5 ? t("resultOk") : t("resultBad")}
        </p>
        <button
          type="button"
          onClick={restart}
          className="rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          {t("restart")}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
          {t("progress", { current: index + 1, total: questions.length })}
        </span>
        <span className="text-xs font-medium text-slate-400">
          {t("score")} : {score}
        </span>
      </div>

      <p dir="auto" className="mb-4 text-base font-semibold text-slate-900">
        {question.q}
      </p>

      <ul className="space-y-2">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.answer;
          const isChosen = i === selected;
          let cls = "border-slate-200 bg-white hover:bg-slate-50";
          if (answered) {
            if (isCorrect) cls = "border-emerald-400 bg-emerald-50";
            else if (isChosen) cls = "border-red-400 bg-red-50";
            else cls = "border-slate-200 bg-white opacity-60";
          }
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => choose(i)}
                disabled={answered}
                dir="auto"
                className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-start text-sm text-slate-800 transition-colors ${cls} ${
                  answered ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <span>{opt}</span>
                {answered && isCorrect && (
                  <IconCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {answered && (
        <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50 p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            {selected === question.answer ? t("correct") : t("incorrect")}
          </p>
          <p dir="auto" className="text-sm leading-relaxed text-slate-800">
            {question.explain}
          </p>
          <button
            type="button"
            onClick={next}
            className="mt-3 rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            {isLast ? t("seeResult") : t("next")}
          </button>
        </div>
      )}
    </div>
  );
}
