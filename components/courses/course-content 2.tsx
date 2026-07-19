// Rendu du contenu d'un cours (composant serveur). Chaque type de bloc a sa
// mise en forme : encadrés colorés (astuce/piège/point-clé), formules centrées,
// exemples résolus, tableaux, listes de méthode et quiz interactif. Le style
// s'inspire des interfaces épurées (Stripe/Linear) : bordures latérales
// colorées plutôt que des aplats criards.

import type { Block, CalloutVariant, Course } from "@/features/courses/types";
import { CourseQuiz } from "./course-quiz";

const CALLOUT_STYLES: Record<CalloutVariant, { box: string; title: string }> = {
  info: { box: "border-s-slate-300 bg-slate-50", title: "text-slate-700" },
  tip: { box: "border-s-emerald-400 bg-emerald-50", title: "text-emerald-800" },
  key: { box: "border-s-brand-500 bg-brand-50", title: "text-brand-800" },
  warning: { box: "border-s-amber-400 bg-amber-50", title: "text-amber-800" },
  pitfall: { box: "border-s-red-400 bg-red-50", title: "text-red-800" },
};

function BlockView({ block, answerLabel }: { block: Block; answerLabel: string }) {
  switch (block.type) {
    case "p":
      return (
        <p dir="auto" className="text-[15px] leading-relaxed text-slate-700">
          {block.text}
        </p>
      );

    case "list":
      return block.ordered ? (
        <ol dir="auto" className="ms-5 list-decimal space-y-1.5 text-[15px] leading-relaxed text-slate-700 marker:text-slate-400">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      ) : (
        <ul dir="auto" className="ms-5 list-disc space-y-1.5 text-[15px] leading-relaxed text-slate-700 marker:text-slate-400">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );

    case "callout": {
      const s = CALLOUT_STYLES[block.variant];
      return (
        <div dir="auto" className={`rounded-xl border-s-4 ${s.box} p-4`}>
          {block.title && (
            <p className={`mb-2 text-sm font-bold ${s.title}`}>{block.title}</p>
          )}
          <ul className="space-y-1.5 text-sm leading-relaxed text-slate-700">
            {block.items.map((it, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-current opacity-40" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    case "formula":
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
          {block.label && (
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {block.label}
            </p>
          )}
          <p dir="ltr" className="font-mono text-lg text-slate-900">
            {block.expr}
          </p>
        </div>
      );

    case "example":
      return (
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <p className="border-b border-slate-100 bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-800">
            {block.title}
          </p>
          <div className="p-4">
            <ol dir="auto" className="space-y-1.5 text-sm leading-relaxed text-slate-700">
              {block.steps.map((st, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-semibold text-slate-400">{i + 1}.</span>
                  <span>{st}</span>
                </li>
              ))}
            </ol>
            {block.answer && (
              <p dir="auto" className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
                {answerLabel} {block.answer}
              </p>
            )}
          </div>
        </div>
      );

    case "steps":
      return (
        <div dir="auto" className="rounded-xl border border-slate-200 bg-white p-4">
          {block.title && (
            <p className="mb-2 text-sm font-bold text-slate-800">{block.title}</p>
          )}
          <ol className="space-y-2 text-sm leading-relaxed text-slate-700">
            {block.items.map((it, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800">
                  {i + 1}
                </span>
                <span className="pt-0.5">{it}</span>
              </li>
            ))}
          </ol>
        </div>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-start text-sm">
            <thead className="bg-slate-50">
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} className="px-4 py-2.5 text-start font-semibold text-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {block.rows.map((row, i) => (
                <tr key={i} className="align-top">
                  {row.map((cell, j) => (
                    <td key={j} dir="auto" className="px-4 py-2.5 text-slate-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "keywords":
      return (
        <dl className="grid gap-3 sm:grid-cols-2">
          {block.items.map((kw, i) => (
            <div key={i} dir="auto" className="rounded-xl border border-slate-200 bg-white p-3">
              <dt className="text-sm font-semibold text-brand-700">{kw.term}</dt>
              <dd className="mt-0.5 text-sm leading-relaxed text-slate-600">{kw.def}</dd>
            </div>
          ))}
        </dl>
      );

    case "quiz":
      return <CourseQuiz questions={block.questions} />;

    default:
      return null;
  }
}

export function CourseContent({
  course,
  answerLabel,
}: {
  course: Course;
  answerLabel: string;
}) {
  return (
    <div className="space-y-12">
      {course.sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold tracking-tight text-slate-900">
            {section.title}
          </h2>
          <div className="space-y-4">
            {section.blocks.map((block, i) => (
              <BlockView key={i} block={block} answerLabel={answerLabel} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
