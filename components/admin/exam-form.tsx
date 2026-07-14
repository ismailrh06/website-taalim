"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { StreamDTO } from "@/features/catalog/queries";
import type { AdminExamDTO } from "@/features/exams/queries";

interface LevelWithStreams {
  slug: string;
  name: { fr: string };
  streams: StreamDTO[];
}

type ActionResult = { error?: string; success?: boolean; id?: string };

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10";
const labelClass = "mb-1.5 block text-xs font-semibold text-slate-600";
const fileClass =
  "w-full text-sm text-slate-500 file:me-3 file:rounded-lg file:border-0 file:bg-brand-50 file:px-3.5 file:py-2 file:text-sm file:font-semibold file:text-brand-700 hover:file:bg-brand-100";
const sectionClass = "rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm";
const sectionTitleClass =
  "text-[11px] font-bold uppercase tracking-[0.15em] text-brand-600";

export function ExamForm({
  levels,
  initialData,
  action,
}: {
  levels: LevelWithStreams[];
  initialData?: AdminExamDTO;
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(action, {});
  const [levelSlug, setLevelSlug] = useState(initialData?.levelSlug ?? levels[0]?.slug ?? "");

  const level = levels.find((l) => l.slug === levelSlug);
  const streams = level?.streams ?? [];
  const [streamSlug, setStreamSlug] = useState(
    initialData?.streamSlug ?? streams[0]?.slug ?? "",
  );
  const currentStream = streams.find((s) => s.slug === streamSlug) ?? streams[0];
  const subjects = currentStream?.subjects ?? [];

  useEffect(() => {
    if (state.success) {
      router.push("/admin/examens");
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}

      {/* Informations */}
      <div className={sectionClass}>
        <h3 className={sectionTitleClass}>Informations</h3>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className={labelClass}>Titre</span>
            <input
              type="text"
              name="title"
              required
              placeholder="Examen national — Mathématiques"
              defaultValue={initialData?.title}
              className={inputClass}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className={labelClass}>Niveau</span>
              <select
                name="levelSlug"
                value={levelSlug}
                onChange={(e) => {
                  setLevelSlug(e.target.value);
                  const newStreams =
                    levels.find((l) => l.slug === e.target.value)?.streams ?? [];
                  setStreamSlug(newStreams[0]?.slug ?? "");
                }}
                className={inputClass}
              >
                {levels.map((l) => (
                  <option key={l.slug} value={l.slug}>
                    {l.name.fr}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className={labelClass}>Filière</span>
              <select
                name="streamSlug"
                value={streamSlug}
                onChange={(e) => setStreamSlug(e.target.value)}
                className={inputClass}
              >
                {streams.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name.fr}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className={labelClass}>Matière</span>
              <select
                name="subjectSlug"
                defaultValue={initialData?.subjectSlug}
                className={inputClass}
              >
                {subjects.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name.fr}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Classification */}
      <div className={sectionClass}>
        <h3 className={sectionTitleClass}>Classification</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-4">
          <label className="block">
            <span className={labelClass}>Type</span>
            <select name="type" defaultValue={initialData?.type ?? "national"} className={inputClass}>
              <option value="national">Examen national</option>
              <option value="regional">Examen régional</option>
              <option value="blanc">Examen blanc</option>
              <option value="cnc">Concours CNC</option>
              <option value="concours">Concours d&apos;accès</option>
            </select>
          </label>

          <label className="block">
            <span className={labelClass}>Année</span>
            <input
              type="number"
              name="year"
              required
              min={2000}
              max={2100}
              defaultValue={initialData?.year ?? new Date().getFullYear()}
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className={labelClass}>Session</span>
            <select
              name="session"
              defaultValue={initialData?.session ?? "normale"}
              className={inputClass}
            >
              <option value="normale">Normale</option>
              <option value="rattrapage">Rattrapage</option>
            </select>
          </label>

          <label className="block">
            <span className={labelClass}>Langue</span>
            <select
              name="language"
              defaultValue={initialData?.language ?? "fr"}
              className={inputClass}
            >
              <option value="fr">Français</option>
              <option value="ar">Arabe</option>
              <option value="en">Anglais</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-end gap-6">
          <label className="block">
            <span className={labelClass}>Durée (minutes)</span>
            <input
              type="number"
              name="durationMin"
              required
              min={10}
              max={600}
              defaultValue={initialData?.durationMin ?? 180}
              className={`${inputClass} max-w-[160px]`}
            />
          </label>

          <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 px-4 py-2.5">
            <input
              type="checkbox"
              name="hasCorrection"
              value="true"
              defaultChecked={initialData?.hasCorrection ?? true}
              className="h-4 w-4 rounded border-slate-300 accent-brand-600"
            />
            <span className="text-sm font-medium text-slate-700">Corrigé disponible</span>
          </label>
        </div>
      </div>

      {/* Fichiers */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className={sectionClass}>
          <h3 className={sectionTitleClass}>Sujet (PDF)</h3>
          <div className="mt-4 space-y-4">
            <label className="block">
              <span className={labelClass}>Coller une URL</span>
              <input
                type="url"
                name="pdfUrl"
                placeholder="https://…"
                defaultValue={initialData?.pdfUrl}
                className={inputClass}
              />
            </label>
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-slate-300">
              <span className="h-px flex-1 bg-slate-100" />
              ou
              <span className="h-px flex-1 bg-slate-100" />
            </div>
            <label className="block">
              <span className={labelClass}>Téléverser un fichier</span>
              <input type="file" name="pdfFile" accept="application/pdf" className={fileClass} />
            </label>
          </div>
        </div>

        <div className={sectionClass}>
          <h3 className={sectionTitleClass}>Corrigé (PDF)</h3>
          <div className="mt-4 space-y-4">
            <label className="block">
              <span className={labelClass}>Coller une URL</span>
              <input
                type="url"
                name="correctionUrl"
                placeholder="https://…"
                defaultValue={initialData?.correctionUrl}
                className={inputClass}
              />
            </label>
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-slate-300">
              <span className="h-px flex-1 bg-slate-100" />
              ou
              <span className="h-px flex-1 bg-slate-100" />
            </div>
            <label className="block">
              <span className={labelClass}>Téléverser un fichier</span>
              <input
                type="file"
                name="correctionFile"
                accept="application/pdf"
                className={fileClass}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-brand-700 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-800 focus:outline-none focus:ring-4 focus:ring-brand-500/20 disabled:opacity-60"
        >
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
