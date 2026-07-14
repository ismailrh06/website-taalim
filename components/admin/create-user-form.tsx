"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/features/users/actions";

type ActionResult = { error?: string; success?: boolean };

export function CreateUserForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(
    async (_prev, formData) => createUser(formData),
    {},
  );

  useEffect(() => {
    if (state.success) {
      setOpen(false);
      router.refresh();
    }
  }, [state.success, router]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
      >
        + Ajouter un utilisateur
      </button>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none";

  return (
    <form
      action={formAction}
      className="grid gap-3 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2"
    >
      {state.error && (
        <p className="sm:col-span-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <input name="name" placeholder="Nom" required className={inputClass} />
      <input name="email" type="email" placeholder="Email" required className={inputClass} />
      <input
        name="password"
        type="password"
        placeholder="Mot de passe (8+ caractères)"
        required
        minLength={8}
        className={inputClass}
      />
      <select name="role" defaultValue="ELEVE" className={inputClass}>
        <option value="ELEVE">Élève</option>
        <option value="ADMIN">Admin</option>
      </select>
      <div className="flex gap-2 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
        >
          {pending ? "…" : "Créer"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
