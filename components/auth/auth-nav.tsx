"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { logoutStudent } from "@/features/auth/actions";
import { IconLogOut, IconLibrary } from "@/components/icons";

type SessionUser = { name?: string | null; role?: "ELEVE" | "ADMIN" };

/// Le header reste un composant statique (SSG) : la session est récupérée
/// côté client via l'endpoint Auth.js, sans rendre les 100+ pages dynamiques.
export function AuthNav() {
  const t = useTranslations();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/session")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled) setUser(data?.user ?? null);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  if (!user) {
    return (
      <>
        <Link
          href="/connexion"
          className="hidden text-sm font-semibold text-slate-700 transition-colors hover:text-brand-700 md:block"
        >
          {t("nav.login")}
        </Link>
        <Link
          href="/inscription"
          className="hidden rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-700/20 transition-all hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-md sm:block"
        >
          {t("nav.signup")}
        </Link>
      </>
    );
  }

  const initials = (user.name ?? "?")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        title={user.name ?? undefined}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white shadow-sm shadow-brand-700/30 ring-2 ring-white transition-transform hover:scale-105"
      >
        {initials}
      </button>

      {open && (
        <div
          role="menu"
          className="animate-fade-up absolute end-0 top-11 z-50 w-56 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/10 [animation-duration:0.25s]"
        >
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="truncate text-sm font-bold text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-500">{t("auth.menu.account")}</p>
          </div>
          <div className="p-1.5">
            <Link
              href="/cours"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-800"
            >
              <IconLibrary className="h-4 w-4 text-brand-600" />
              {t("auth.menu.mySpace")}
            </Link>
            {user.role === "ADMIN" && (
              {/* next/link brut : /admin vit hors du routage i18n, pas de préfixe de locale */}
              <NextLink
                href="/admin"
                role="menuitem"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-800"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-brand-700 text-[8px] font-black text-white">
                  A
                </span>
                Admin
              </NextLink>
            )}
            <form action={logoutStudent}>
              <button
                type="submit"
                role="menuitem"
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                <IconLogOut className="h-4 w-4" />
                {t("auth.menu.logout")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
