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
    <div className="flex items-center gap-3">
      <select
        defaultValue={role}
        disabled={pending || isSelf}
        onChange={(e) => {
          startTransition(async () => {
            await updateUserRole(userId, e.target.value as "ELEVE" | "ADMIN");
            router.refresh();
          });
        }}
        className="rounded-lg border border-slate-300 px-2 py-1 text-xs disabled:opacity-50"
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
        className={`text-xs font-semibold disabled:opacity-50 ${
          isActive ? "text-red-600 hover:text-red-800" : "text-emerald-600 hover:text-emerald-800"
        }`}
      >
        {isActive ? "Désactiver" : "Réactiver"}
      </button>
    </div>
  );
}
