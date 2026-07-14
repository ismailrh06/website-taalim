import Link from "next/link";
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
      <nav className="text-sm font-medium text-slate-400">
        <Link href="/admin/cours" className="hover:text-brand-700">
          Cours & filières
        </Link>{" "}
        <span className="mx-1">/</span>
        <span className="text-slate-600">Modifier</span>
      </nav>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {stream.name.fr}
      </h1>
      <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <StreamForm initialData={stream} action={action} />
      </div>
    </div>
  );
}
