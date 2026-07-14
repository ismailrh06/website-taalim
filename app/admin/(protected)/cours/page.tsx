import Link from "next/link";
import { getLevelsWithStreams } from "@/features/catalog/queries";
import { StreamList } from "@/components/admin/stream-list";
import { IconPlus } from "@/components/icons";

export default async function AdminCoursesPage() {
  const levels = await getLevelsWithStreams();

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">Contenu</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
        Cours & filières
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Les flèches réordonnent les filières au sein d&apos;un niveau — l&apos;ordre est
        celui affiché aux élèves.
      </p>

      <div className="mt-8 space-y-10">
        {levels.map((level) => (
          <section key={level.slug}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-brand-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-brand-800">
                  {level.shortName.fr}
                </span>
                <h2 className="text-lg font-bold text-slate-900">{level.name.fr}</h2>
              </div>
              <Link
                href={`/admin/cours/nouveau?niveau=${level.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                <IconPlus className="h-4 w-4" />
                Filière
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
