"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function DeleteButton({
  action,
  confirmMessage,
}: {
  action: () => Promise<unknown>;
  confirmMessage: string;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(confirmMessage)) return;
        startTransition(async () => {
          await action();
          router.refresh();
        });
      }}
      className="rounded-lg px-2 py-1 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
    >
      {pending ? "…" : "Supprimer"}
    </button>
  );
}
