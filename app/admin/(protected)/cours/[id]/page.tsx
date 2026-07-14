import { notFound } from "next/navigation";
import { getStreamById } from "@/features/catalog/queries";
import { updateStream } from "@/features/catalog/actions";
import { StreamForm } from "@/components/admin/stream-form";

export default async function EditStreamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const stream = await getStreamById(id);
  if (!stream) notFound();

  async function action(_prevState: { error?: string }, formData: FormData) {
    "use server";
    return updateStream(id, formData);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900">Modifier la filière</h1>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <StreamForm initialData={stream} action={action} />
      </div>
    </div>
  );
}
