"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = { fr: "FR", ar: "ع", en: "EN" };

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200 p-1">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          aria-current={l === locale}
          onClick={() => router.replace(pathname, { locale: l })}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
            l === locale
              ? "bg-brand-700 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
