"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconProgress,
  IconFileCheck,
  IconLibrary,
  IconUsers,
  IconClock,
  type IconProps,
} from "@/components/icons";

const NAV: {
  href: string;
  label: string;
  icon: (props: IconProps) => React.JSX.Element;
}[] = [
  { href: "/admin", label: "Tableau de bord", icon: IconProgress },
  { href: "/admin/examens", label: "Examens", icon: IconFileCheck },
  { href: "/admin/cours", label: "Cours & filières", icon: IconLibrary },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: IconUsers },
  { href: "/admin/journal", label: "Journal d'audit", icon: IconClock },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {NAV.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
              active
                ? "bg-brand-500/15 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
                active
                  ? "bg-brand-500/25 text-brand-300"
                  : "text-slate-500 group-hover:text-brand-300"
              }`}
            >
              <item.icon className="h-4 w-4" />
            </span>
            {item.label}
            {active && (
              <span className="ms-auto h-1.5 w-1.5 rounded-full bg-accent-400" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
