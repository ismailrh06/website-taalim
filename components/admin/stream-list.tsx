"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { moveStream, deleteStream } from "@/features/catalog/actions";
import { DeleteButton } from "./delete-button";
import { IconChevronDown } from "@/components/icons";
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
    <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      {streams.map((stream, i) => (
        <li
          key={stream.id}
          className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-slate-50/60"
        >
          <div className="flex items-center gap-4">
            <div className="flex flex-col overflow-hidden rounded-lg border border-slate-200">
              <button
                type="button"
                disabled={pending || i === 0}
                onClick={() => move(stream.id, "up")}
                className="flex h-6 w-7 items-center justify-center bg-white text-slate-400 transition-colors hover:bg-brand-50 hover:text-brand-700 disabled:opacity-25"
                aria-label="Monter"
              >
                <IconChevronDown className="h-3.5 w-3.5 rotate-180" />
              </button>
              <button
                type="button"
                disabled={pending || i === streams.length - 1}
                onClick={() => move(stream.id, "down")}
                className="flex h-6 w-7 items-center justify-center border-t border-slate-200 bg-white text-slate-400 transition-colors hover:bg-brand-50 hover:text-brand-700 disabled:opacity-25"
                aria-label="Descendre"
              >
                <IconChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
            <div>
              <p className="font-semibold text-slate-900">{stream.name.fr}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                <span className="font-medium text-brand-700">
                  {stream.subjects.length} matières
                </span>
                <span className="mx-1.5 text-slate-300">·</span>
                <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px] text-slate-500">
                  {stream.slug}
                </code>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={`/admin/cours/${stream.id}`}
              className="text-sm font-semibold text-brand-700 hover:text-brand-800"
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
