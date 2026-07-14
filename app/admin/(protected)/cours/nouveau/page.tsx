import Link from "next/link";
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
      <nav className="text-sm font-medium text-slate-400">
        <Link href="/admin/cours" className="hover:text-brand-700">
          Cours & filières
        </Link>{" "}
        <span className="mx-1">/</span>
        <span className="text-slate-600">Nouvelle filière</span>
      </nav>
      <div className="mt-2 flex items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Ajouter une filière
        </h1>
        <span className="rounded-lg bg-brand-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-brand-800">
          {levelSlug}
        </span>
      </div>
      <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <StreamForm action={action} />
      </div>
    </div>
  );
}
