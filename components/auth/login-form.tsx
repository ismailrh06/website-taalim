"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { loginStudent, type AuthActionState } from "@/features/auth/actions";
import { authInputClass, authLabelClass, authSubmitClass } from "./ui";
import { PasswordInput } from "./password-input";
import { Spinner } from "./spinner";

export function StudentLoginForm({ next }: { next?: string }) {
  const t = useTranslations("auth");
  const [state, formAction, pending] = useActionState<AuthActionState, FormData>(
    loginStudent,
    {},
  );

  return (
    <form action={formAction} className="space-y-4">
      {next && <input type="hidden" name="next" value={next} />}
      {state.error && (
        <p
          role="alert"
          className="animate-fade-up rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-700"
        >
          {t(`errors.${state.error}`)}
        </p>
      )}

      <label className="block">
        <span className={authLabelClass}>{t("login.email")}</span>
        <input
          type="email"
          name="email"
          required
          autoFocus
          autoComplete="email"
          placeholder={t("login.emailPlaceholder")}
          className={authInputClass}
        />
      </label>

      <label className="block">
        <span className={authLabelClass}>{t("login.password")}</span>
        <PasswordInput autoComplete="current-password" />
      </label>

      <button type="submit" disabled={pending} className={authSubmitClass}>
        {pending && <Spinner />}
        {pending ? t("login.submitting") : t("login.submit")}
      </button>
    </form>
  );
}
