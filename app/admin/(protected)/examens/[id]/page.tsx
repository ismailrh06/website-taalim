import { notFound } from "next/navigation";
import { getLevelsWithStreams } from "@/features/catalog/queries";
import { getAdminExamById } from "@/features/exams/queries";
import { updateExam } from "@/features/exams/actions";
import { ExamForm } from "@/components/admin/exam-form";

export default async function EditExamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [levels, exam] = await Promise.all([getLevelsWithStreams(), getAdminExamById(id)]);
  if (!exam) notFound();

  async function action(_prevState: { error?: string }, formData: FormData) {
    "use server";
    return updateExam(id, formData);
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">Modifier l&apos;examen</h1>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <ExamForm levels={levels} initialData={exam} action={action} />
      </div>
    </div>
  );
}
