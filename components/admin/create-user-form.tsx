"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/features/users/actions";
import { IconPlus } from "@/components/icons";

type ActionResult = { error?: string; success?: boolean };

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10";

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
        className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
      >
        <IconPlus className="h-4 w-4" />
        Ajouter un utilisateur
      </button>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
    >
      <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-600">
        Nouvel utilisateur
      </h3>
      {state.error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input name="name" placeholder="Nom complet" required className={inputClass} />
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
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-800 disabled:opacity-60"
        >
          {pending ? "Création…" : "Créer le compte"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
