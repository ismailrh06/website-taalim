"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { StreamDTO } from "@/features/catalog/queries";
import { SUBJECTS } from "@/features/catalog/taxonomy";

type ActionResult = { error?: string; success?: boolean };

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";
const labelClass = "mb-1 block text-xs font-semibold text-slate-600";

export function StreamForm({
  initialData,
  action,
}: {
  initialData?: StreamDTO;
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(action, {});
  const selectedSlugs = new Set(initialData?.subjects.map((s) => s.slug) ?? []);

  useEffect(() => {
    if (state.success) {
      router.push("/admin/cours");
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <label className="block">
        <span className={labelClass}>Slug (identifiant d&apos;URL)</span>
        <input
          type="text"
          name="slug"
          required
          pattern="[a-z0-9-]+"
          defaultValue={initialData?.slug}
          placeholder="sciences-physiques"
          className={inputClass}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className={labelClass}>Nom (français)</span>
          <input
            type="text"
            name="nameFr"
            required
            defaultValue={initialData?.name.fr}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Nom (arabe)</span>
          <input
            type="text"
            name="nameAr"
            required
            dir="rtl"
            defaultValue={initialData?.name.ar}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Nom (anglais)</span>
          <input
            type="text"
            name="nameEn"
            required
            defaultValue={initialData?.name.en}
            className={inputClass}
          />
        </label>
      </div>

      <fieldset>
        <legend className={labelClass}>Matières enseignées dans cette filière</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SUBJECTS.map((subject) => (
            <label
              key={subject.slug}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <input
                type="checkbox"
                name="subjectSlugs"
                value={subject.slug}
                defaultChecked={selectedSlugs.has(subject.slug)}
                className="h-4 w-4 rounded border-slate-300"
              />
              {subject.name.fr}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
      >
        {pending ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}
