import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/authz";
import { getLevelsWithStreams } from "@/features/catalog/queries";
import { getAdminExamById } from "@/features/exams/queries";
import { updateExam } from "@/features/exams/actions";
import { ExamForm } from "@/components/admin/exam-form";

export default async function EditExamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const [levels, exam] = await Promise.all([getLevelsWithStreams(), getAdminExamById(id)]);
  if (!exam) notFound();

  async function action(_prevState: { error?: string }, formData: FormData) {
    "use server";
    return updateExam(id, formData);
  }

  return (
    <div className="max-w-3xl">
      <nav className="text-sm font-medium text-slate-400">
        <Link href="/admin/examens" className="hover:text-brand-700">
          Examens
        </Link>{" "}
        <span className="mx-1">/</span>
        <span className="text-slate-600">Modifier</span>
      </nav>
      <h1 className="mt-2 truncate text-3xl font-bold tracking-tight text-slate-900" dir="auto">
        {exam.title}
      </h1>
      <div className="mt-6">
        <ExamForm levels={levels} initialData={exam} action={action} />
      </div>
    </div>
  );
}
