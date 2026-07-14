import Link from "next/link";
import { getLevelsWithStreams } from "@/features/catalog/queries";
import { StreamList } from "@/components/admin/stream-list";

export default async function AdminCoursesPage() {
  const levels = await getLevelsWithStreams();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Cours & filières</h1>
      <p className="mt-1 text-sm text-slate-500">
        Les flèches réordonnent les filières au sein d&apos;un niveau.
      </p>

      <div className="mt-8 space-y-10">
        {levels.map((level) => (
          <section key={level.slug}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{level.name.fr}</h2>
              <Link
                href={`/admin/cours/nouveau?niveau=${level.slug}`}
                className="text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                + Ajouter une filière
              </Link>
            </div>
            <div className="mt-3">
              <StreamList streams={level.streams} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
