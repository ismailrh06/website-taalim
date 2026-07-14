import Link from "next/link";
import { getAdminExams } from "@/features/exams/queries";
import { deleteExam } from "@/features/exams/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { IconCheck, IconPlus } from "@/components/icons";

const TYPE_LABELS: Record<string, string> = {
  national: "National",
  regional: "Régional",
  blanc: "Blanc",
  cnc: "CNC",
  concours: "Concours",
};

const TYPE_STYLES: Record<string, string> = {
  national: "bg-brand-50 text-brand-700 ring-brand-600/20",
  regional: "bg-sky-50 text-sky-700 ring-sky-600/20",
  blanc: "bg-violet-50 text-violet-700 ring-violet-600/20",
  cnc: "bg-amber-50 text-amber-800 ring-amber-600/20",
  concours: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

export default async function AdminExamsPage() {
  const exams = await getAdminExams();

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
            Contenu
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Examens</h1>
          <p className="mt-1 text-sm text-slate-500">
            {exams.length} examens · {exams.filter((e) => e.pdfUrl).length} avec PDF direct
          </p>
        </div>
        <Link
          href="/admin/examens/nouveau"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
        >
          <IconPlus className="h-4 w-4" />
          Ajouter
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3.5">Titre</th>
                <th className="px-4 py-3.5">Niveau</th>
                <th className="px-4 py-3.5">Matière</th>
                <th className="px-4 py-3.5">Type</th>
                <th className="px-4 py-3.5">Année</th>
                <th className="px-4 py-3.5">PDF</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {exams.map((exam) => (
                <tr key={exam.id} className="transition-colors hover:bg-slate-50/60">
                  <td className="max-w-xs truncate px-5 py-3.5 font-semibold text-slate-900" dir="auto">
                    {exam.title}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase text-slate-600">
                      {exam.levelSlug}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600">{exam.subjectSlug}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${TYPE_STYLES[exam.type]}`}
                    >
                      {TYPE_LABELS[exam.type]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-medium tabular-nums text-slate-700">
                    {exam.year}
                  </td>
                  <td className="px-4 py-3.5">
                    {exam.pdfUrl ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        <IconCheck className="h-3 w-3" />
                        {exam.correctionUrl ? "Sujet + corrigé" : "Sujet"}
                      </span>
                    ) : (
                      <span className="rounded-full border border-dashed border-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                        Aucun
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex justify-end gap-4">
                      <Link
                        href={`/admin/examens/${exam.id}`}
                        className="text-sm font-semibold text-brand-700 hover:text-brand-800"
                      >
                        Modifier
                      </Link>
                      <DeleteButton
                        action={deleteExam.bind(null, exam.id)}
                        confirmMessage={`Supprimer « ${exam.title} » ?`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
