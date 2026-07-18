"use client";

import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";
import { registerStudent, type AuthActionState } from "@/features/auth/actions";
import { authInputClass, authLabelClass, authSubmitClass } from "./ui";
import { PasswordInput } from "./password-input";
import { Spinner } from "./spinner";

const STRENGTH = [
  { key: "weak", bar: "bg-red-400", text: "text-red-600" },
  { key: "weak", bar: "bg-red-400", text: "text-red-600" },
  { key: "medium", bar: "bg-amber-400", text: "text-amber-600" },
  { key: "good", bar: "bg-lime-500", text: "text-lime-600" },
  { key: "strong", bar: "bg-emerald-500", text: "text-emerald-600" },
] as const;

function scoreOf(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export function StudentSignupForm() {
  const t = useTranslations("auth");
  const [state, formAction, pending] = useActionState<AuthActionState, FormData>(
    registerStudent,
    {},
  );
  const [password, setPassword] = useState("");
  const score = scoreOf(password);
  const strength = STRENGTH[score];

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <p
          role="alert"
          className="animate-fade-up rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-700"
        >
          {t(`errors.${state.error}`)}
        </p>
      )}

      <label className="block">
        <span className={authLabelClass}>{t("signup.name")}</span>
        <input
          type="text"
          name="name"
          required
          minLength={2}
          maxLength={80}
          autoFocus
          autoComplete="name"
          placeholder={t("signup.namePlaceholder")}
          className={authInputClass}
        />
      </label>

      <label className="block">
        <span className={authLabelClass}>{t("signup.email")}</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={t("signup.emailPlaceholder")}
          className={authInputClass}
        />
      </label>

      <label className="block">
        <span className={authLabelClass}>{t("signup.password")}</span>
        <PasswordInput
          autoComplete="new-password"
          minLength={8}
          onValueChange={setPassword}
        />
        {/* Jauge de solidité — 4 segments animés */}
        <span className="mt-2.5 flex items-center gap-2">
          <span className="flex flex-1 gap-1.5">
            {[1, 2, 3, 4].map((seg) => (
              <span
                key={seg}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  password && score >= seg ? strength.bar : "bg-slate-200"
                }`}
              />
            ))}
          </span>
          <span
            className={`min-w-16 text-end text-xs font-semibold transition-colors ${
              password ? strength.text : "text-slate-400"
            }`}
          >
            {password ? t(`signup.strength.${strength.key}`) : t("signup.passwordHint")}
          </span>
        </span>
      </label>

      <button type="submit" disabled={pending} className={authSubmitClass}>
        {pending && <Spinner />}
        {pending ? t("signup.submitting") : t("signup.submit")}
      </button>
    </form>
  );
}
