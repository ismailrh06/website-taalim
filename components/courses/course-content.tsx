// Rendu du contenu d'un cours (composant serveur), dans le style de la charte
// LaTeX Qimma (templates/qimma-template.tex) : sections numérotées en pastille
// teal soulignées d'un filet ambre, boîtes pédagogiques blanches à bordure
// colorée avec titre en badge (Définition teal, Propriété teal foncé, Exemple
// ambre, Remarque rose), formules centrées sur fond teal pâle, tableaux à
// en-tête teal foncé et lignes alternées. Même palette que le PDF téléchargeable.

import type { Block, CalloutVariant, Course } from "@/features/courses/types";
import { CourseQuiz } from "./course-quiz";

// Charte du template LaTeX : colDef #0d9488 (brand-600), colProp #0f766e
// (brand-700), colEx #b45309 (amber-700), colRem #9d174d (≈ rose-800).
const CALLOUT_STYLES: Record<
  CalloutVariant,
  { border: string; badge: string; icon: string }
> = {
  info: { border: "border-brand-600", badge: "bg-brand-600", icon: "■" },
  key: { border: "border-brand-700", badge: "bg-brand-700", icon: "★" },
  tip: { border: "border-rose-800", badge: "bg-rose-800", icon: "☛" },
  warning: { border: "border-rose-800", badge: "bg-rose-800", icon: "☛" },
  pitfall: { border: "border-rose-800", badge: "bg-rose-800", icon: "☛" },
};

// Boîte pédagogique façon tcolorbox : bordure colorée, titre en badge qui
// chevauche le bord supérieur, ombre portée légère.
function Fiche({
  border,
  badge,
  icon,
  title,
  children,
}: {
  border: string;
  badge: string;
  icon: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div dir="auto" className={`relative mt-4 rounded-lg border ${border} bg-white p-4 shadow-sm ${title ? "pt-5" : ""}`}>
      {title && (
        <p
          className={`absolute -top-3 start-4 inline-flex items-center gap-1.5 rounded-md ${badge} px-2.5 py-1 text-xs font-bold text-white shadow-sm`}
        >
          <span aria-hidden>{icon}</span>
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

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
        <ol dir="auto" className="ms-5 list-decimal space-y-1.5 text-[15px] leading-relaxed text-slate-700 marker:font-semibold marker:text-brand-700">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      ) : (
        <ul dir="auto" className="ms-5 space-y-1.5 text-[15px] leading-relaxed text-slate-700">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="mt-0.5 shrink-0 font-bold text-accent-500">➤</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );

    case "callout": {
      const s = CALLOUT_STYLES[block.variant];
      return (
        <Fiche border={s.border} badge={s.badge} icon={s.icon} title={block.title}>
          <ul className="space-y-1.5 text-sm leading-relaxed text-slate-700">
            {block.items.map((it, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </Fiche>
      );
    }

    case "formula":
      return (
        <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-center">
          {block.label && (
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-800">
              {block.label}
            </p>
          )}
          <p dir="ltr" className="font-mono text-lg text-brand-950 [overflow-wrap:anywhere]">
            {block.expr}
          </p>
        </div>
      );

    case "example":
      return (
        <Fiche border="border-amber-700" badge="bg-amber-700" icon="➙" title={block.title}>
          <ol dir="auto" className="space-y-1.5 text-sm leading-relaxed text-slate-700">
            {block.steps.map((st, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-semibold text-amber-700">{i + 1}.</span>
                <span>{st}</span>
              </li>
            ))}
          </ol>
          {block.answer && (
            <p dir="auto" className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
              {answerLabel} {block.answer}
            </p>
          )}
        </Fiche>
      );

    case "steps":
      return (
        <div dir="auto" className="rounded-lg border border-brand-200 bg-white p-4 shadow-sm">
          {block.title && (
            <p className="mb-2 text-sm font-bold text-brand-900">{block.title}</p>
          )}
          <ol className="space-y-2 text-sm leading-relaxed text-slate-700">
            {block.items.map((it, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
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
        <div className="overflow-x-auto rounded-lg border border-brand-200 shadow-sm">
          <table className="w-full text-start text-sm">
            <thead className="bg-brand-900">
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} className="px-4 py-2.5 text-start font-semibold text-white">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className={`align-top ${i % 2 === 0 ? "bg-brand-50" : "bg-white"}`}>
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
            <div key={i} dir="auto" className="rounded-lg border border-brand-200 bg-white p-3 shadow-sm">
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
      {course.sections.map((section, idx) => (
        <section key={section.id} id={section.id} className="scroll-mt-24">
          {/* Titre de section façon LaTeX : pastille teal numérotée + filet ambre */}
          <h2 className="mb-1 flex items-center gap-3 text-xl font-bold tracking-tight text-brand-900">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
              {idx + 1}
            </span>
            {section.title}
          </h2>
          <div className="mb-5 ms-11 h-0.5 rounded bg-accent-400" />
          <div className="space-y-5">
            {section.blocks.map((block, i) => (
              <BlockView key={i} block={block} answerLabel={answerLabel} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
