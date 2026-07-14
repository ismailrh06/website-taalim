import Link from "next/link";
import { requireAdmin } from "@/lib/authz";
import { signOut } from "@/auth";
import { Logo } from "@/components/logo";
import {
  IconFileCheck,
  IconLibrary,
  IconUsers,
  IconProgress,
  IconPencil,
} from "@/components/icons";
import "../../globals.css";

const NAV = [
  { href: "/admin", label: "Tableau de bord", icon: IconProgress },
  { href: "/admin/examens", label: "Examens", icon: IconFileCheck },
  { href: "/admin/cours", label: "Cours & filières", icon: IconLibrary },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: IconUsers },
  { href: "/admin/journal", label: "Journal d'audit", icon: IconPencil },
] as const;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <html lang="fr">
      <body className="flex min-h-screen bg-slate-100 text-slate-900">
        <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-slate-950 text-slate-300">
          <div className="flex items-center gap-2 px-5 py-5">
            <Logo className="h-8 w-8" />
            <span className="font-bold text-white">Qimma Admin</span>
          </div>
          <nav className="mt-4 flex-1 space-y-1 px-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-900 hover:text-white"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-slate-800 p-4">
            <p className="truncate text-xs text-slate-500">{user.email}</p>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/connexion" });
              }}
            >
              <button
                type="submit"
                className="mt-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Se déconnecter
              </button>
            </form>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-8 py-10">{children}</div>
        </main>
      </body>
    </html>
  );
}
