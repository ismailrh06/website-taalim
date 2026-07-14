"use client";

// Chat du tuteur socratique. Il fait tourner le moteur `getTutor()` — pour
// l'instant le ScriptedTutor, entièrement local et instantané. Le composant ne
// connaît que l'interface SocraticTutor : le jour où un LLMTutor prend le relais
// (via Server Action + streaming), seul le corps de `send` changera.

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { Exercise } from "@/features/exercises/types";
import { getTutor, type TutorMessage, type TutorState } from "@/features/tutor";
import { IconTutorAI } from "@/components/icons";

export function SocraticChat({
  exercise,
  onTutorHintsChange,
}: {
  exercise: Exercise;
  onTutorHintsChange: (used: number) => void;
}) {
  const t = useTranslations("tutor");
  const tutor = useMemo(() => getTutor(), []);
  const opening = useMemo(() => tutor.start(exercise), [tutor, exercise]);

  const [messages, setMessages] = useState<TutorMessage[]>([
    { role: "tutor", text: opening.message },
  ]);
  const [state, setState] = useState<TutorState>(opening.state);
  const [input, setInput] = useState("");
  const [finished, setFinished] = useState(opening.finished);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || finished) return;

    const reply = tutor.respond(exercise, state, text);
    setMessages((prev) => [
      ...prev,
      { role: "student", text },
      { role: "tutor", text: reply.message },
    ]);
    setState(reply.state);
    setFinished(reply.finished);
    onTutorHintsChange(reply.state.tutorHintsUsed);
    setInput("");
  }

  function restart() {
    const fresh = tutor.start(exercise);
    setMessages([{ role: "tutor", text: fresh.message }]);
    setState(fresh.state);
    setFinished(fresh.finished);
    onTutorHintsChange(0);
    setInput("");
  }

  const totalSteps = exercise.socratic.length;
  const currentStep = Math.min(state.stepIndex + (finished ? 0 : 1), totalSteps);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-700">
          <IconTutorAI className="h-5 w-5 text-brand-600" />
          <h3 className="text-base font-semibold">{t("title")}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
          {t("progress", { current: currentStep, total: totalSteps })}
        </span>
      </div>
      <p className="mb-4 text-sm text-slate-500">{t("subtitle")}</p>

      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4"
        style={{ maxHeight: "26rem", minHeight: "16rem" }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "student" ? "justify-end" : "justify-start"}`}
          >
            <div
              dir="auto"
              className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "student"
                  ? "bg-brand-700 text-white"
                  : "border border-slate-200 bg-white text-slate-800"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {finished && (
          <div className="pt-1 text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              {t("finishedBadge")}
            </span>
          </div>
        )}
      </div>

      <form onSubmit={send} className="mt-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={finished}
          placeholder={finished ? t("finishedPlaceholder") : t("placeholder")}
          className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:bg-slate-50 disabled:text-slate-400"
        />
        {finished ? (
          <button
            type="button"
            onClick={restart}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {t("restart")}
          </button>
        ) : (
          <button
            type="submit"
            className="rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            {t("send")}
          </button>
        )}
      </form>
    </div>
  );
}
