import Link from "next/link";
import { getAdminExams } from "@/features/exams/queries";
import { deleteExam } from "@/features/exams/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { IconCheck } from "@/components/icons";

export default async function AdminExamsPage() {
  const exams = await getAdminExams();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Examens</h1>
          <p className="mt-1 text-sm text-slate-500">{exams.length} examens en base.</p>
        </div>
        <Link
          href="/admin/examens/nouveau"
          className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
        >
          + Ajouter
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Titre</th>
              <th className="px-4 py-3">Niveau</th>
              <th className="px-4 py-3">Matière</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Année</th>
              <th className="px-4 py-3">PDF</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td className="px-4 py-3 font-medium text-slate-900" dir="auto">
                  {exam.title}
                </td>
                <td className="px-4 py-3 text-slate-600">{exam.levelSlug}</td>
                <td className="px-4 py-3 text-slate-600">{exam.subjectSlug}</td>
                <td className="px-4 py-3 text-slate-600">{exam.type}</td>
                <td className="px-4 py-3 tabular-nums text-slate-600">{exam.year}</td>
                <td className="px-4 py-3">
                  {exam.pdfUrl ? (
                    <IconCheck className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <span className="text-xs text-slate-300">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/examens/${exam.id}`}
                      className="text-sm font-medium text-brand-700 hover:text-brand-800"
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
  );
}
