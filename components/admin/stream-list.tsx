"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { moveStream, deleteStream } from "@/features/catalog/actions";
import { DeleteButton } from "./delete-button";
import type { StreamDTO } from "@/features/catalog/queries";

export function StreamList({ streams }: { streams: StreamDTO[] }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function move(streamId: string, direction: "up" | "down") {
    startTransition(async () => {
      await moveStream(streamId, direction);
      router.refresh();
    });
  }

  return (
    <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
      {streams.map((stream, i) => (
        <li key={stream.id} className="flex items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <button
                type="button"
                disabled={pending || i === 0}
                onClick={() => move(stream.id, "up")}
                className="text-xs text-slate-400 hover:text-slate-700 disabled:opacity-30"
                aria-label="Monter"
              >
                ▲
              </button>
              <button
                type="button"
                disabled={pending || i === streams.length - 1}
                onClick={() => move(stream.id, "down")}
                className="text-xs text-slate-400 hover:text-slate-700 disabled:opacity-30"
                aria-label="Descendre"
              >
                ▼
              </button>
            </div>
            <div>
              <p className="font-medium text-slate-900">{stream.name.fr}</p>
              <p className="text-xs text-slate-500">
                {stream.subjects.length} matières · {stream.slug}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={`/admin/cours/${stream.id}`}
              className="text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              Modifier
            </Link>
            <DeleteButton
              action={deleteStream.bind(null, stream.id)}
              confirmMessage={`Supprimer « ${stream.name.fr} » ? Les examens de cette filière seront aussi supprimés.`}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
