import { getLevelsWithStreams } from "@/features/catalog/queries";
import { createExam } from "@/features/exams/actions";
import { ExamForm } from "@/components/admin/exam-form";

export default async function NewExamPage() {
  const levels = await getLevelsWithStreams();

  async function action(_prevState: { error?: string }, formData: FormData) {
    "use server";
    return createExam(formData);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">Ajouter un examen</h1>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <ExamForm levels={levels} action={action} />
      </div>
    </div>
  );
}
