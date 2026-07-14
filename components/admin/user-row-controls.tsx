"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateUserRole, toggleUserActive } from "@/features/users/actions";

export function UserRowControls({
  userId,
  role,
  isActive,
  isSelf,
}: {
  userId: string;
  role: "ELEVE" | "ADMIN";
  isActive: boolean;
  isSelf: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2.5">
      <select
        defaultValue={role}
        disabled={pending || isSelf}
        onChange={(e) => {
          startTransition(async () => {
            await updateUserRole(userId, e.target.value as "ELEVE" | "ADMIN");
            router.refresh();
          });
        }}
        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:border-brand-500 focus:outline-none disabled:opacity-40"
      >
        <option value="ELEVE">Élève</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button
        type="button"
        disabled={pending || isSelf}
        onClick={() => {
          startTransition(async () => {
            await toggleUserActive(userId, !isActive);
            router.refresh();
          });
        }}
        className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors disabled:opacity-40 ${
          isActive
            ? "text-red-500 hover:bg-red-50 hover:text-red-700"
            : "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-800"
        }`}
      >
        {isActive ? "Désactiver" : "Réactiver"}
      </button>
    </div>
  );
}
