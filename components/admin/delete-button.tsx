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
      className="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
    >
      {pending ? "…" : "Supprimer"}
    </button>
  );
}
