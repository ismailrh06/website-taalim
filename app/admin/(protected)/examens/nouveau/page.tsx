import Link from "next/link";
import { requireAdmin } from "@/lib/authz";
import { getLevelsWithStreams } from "@/features/catalog/queries";
import { createExam } from "@/features/exams/actions";
import { ExamForm } from "@/components/admin/exam-form";

export default async function NewExamPage() {
  await requireAdmin();
  const levels = await getLevelsWithStreams();

  async function action(_prevState: { error?: string }, formData: FormData) {
    "use server";
    return createExam(formData);
  }

  return (
    <div className="max-w-3xl">
      <nav className="text-sm font-medium text-slate-400">
        <Link href="/admin/examens" className="hover:text-brand-700">
          Examens
        </Link>{" "}
        <span className="mx-1">/</span>
        <span className="text-slate-600">Nouveau</span>
      </nav>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        Ajouter un examen
      </h1>
      <div className="mt-6">
        <ExamForm levels={levels} action={action} />
      </div>
    </div>
  );
}
