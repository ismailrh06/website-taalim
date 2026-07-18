"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { authInputClass } from "./ui";

export function PasswordInput({
  autoComplete,
  minLength,
  onValueChange,
}: {
  autoComplete: "current-password" | "new-password";
  minLength?: number;
  onValueChange?: (value: string) => void;
}) {
  const t = useTranslations("auth.login");
  const [show, setShow] = useState(false);
  const label = show ? t("hidePassword") : t("showPassword");

  return (
    <span className="relative block">
      <input
        type={show ? "text" : "password"}
        name="password"
        required
        minLength={minLength}
        autoComplete={autoComplete}
        placeholder="••••••••••••"
        className={`${authInputClass} pe-11`}
        onChange={onValueChange ? (e) => onValueChange(e.target.value) : undefined}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        title={label}
        aria-label={label}
        className="absolute inset-y-0 end-0 flex w-11 items-center justify-center rounded-e-xl text-slate-400 transition-colors hover:text-slate-600 focus:outline-none"
      >
        {show ? (
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
  );
}
