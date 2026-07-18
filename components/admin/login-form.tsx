"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-400/10";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-4 py-3 text-sm font-bold text-brand-950 shadow-lg shadow-accent-500/20 transition-all hover:bg-accent-400 hover:shadow-accent-500/30 focus:outline-none focus:ring-4 focus:ring-accent-500/30 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending && (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            className="opacity-25"
          />
          <path
            d="M12 2a10 10 0 0 1 10 10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )}
      {pending ? "Connexion…" : "Se connecter"}
    </button>
  );
}

export function LoginForm({
  action,
  erreur,
}: {
  action: (formData: FormData) => Promise<void>;
  erreur?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {erreur && (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300"
        >
          {erreur}
        </p>
      )}

      <form action={action} className="mt-7 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-slate-400">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            autoFocus
            autoComplete="email"
            placeholder="admin@qimma.ma"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-slate-400">
            Mot de passe
          </span>
          <span className="relative block">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              className={`${inputClass} pe-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              title={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
              aria-label={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
              className="absolute inset-y-0 end-0 flex w-11 items-center justify-center rounded-e-xl text-slate-500 transition-colors hover:text-slate-300 focus:outline-none"
            >
              {showPassword ? (
                <svg
                  className="h-4.5 w-4.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.4 10.4 0 0 1 12 5c7 0 10 7 10 7a13.2 13.2 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.5 13.5 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.39-1.61" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
              ) : (
                <svg
                  className="h-4.5 w-4.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </span>
        </label>
        <SubmitButton />
      </form>
    </>
  );
}
