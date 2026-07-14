import { createStream } from "@/features/catalog/actions";
import { StreamForm } from "@/components/admin/stream-form";

export default async function NewStreamPage({
  searchParams,
}: {
  searchParams: Promise<{ niveau?: string }>;
}) {
  const { niveau } = await searchParams;
  const levelSlug = niveau ?? "1bac";

  async function action(_prevState: { error?: string }, formData: FormData) {
    "use server";
    return createStream(levelSlug, formData);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900">Ajouter une filière</h1>
      <p className="mt-1 text-sm text-slate-500">Niveau : {levelSlug}</p>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <StreamForm action={action} />
      </div>
    </div>
  );
}
