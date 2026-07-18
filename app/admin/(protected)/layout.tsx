import { Inter } from "next/font/google";
import { requireAdmin } from "@/lib/authz";
import { signOut } from "@/auth";
import { Logo } from "@/components/logo";
import { IconLogOut } from "@/components/icons";
import { AdminNav } from "@/components/admin/admin-nav";
import "../../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: { default: "Qimma Admin", template: "%s | Qimma Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();
  const initials = (user.name ?? user.email ?? "A")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <html lang="fr" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-slate-100 text-slate-900 antialiased lg:flex-row">
        {/* Barre mobile — menu repliable, la sidebar est masquée sous lg */}
        <header className="sticky top-0 z-40 bg-slate-950 lg:hidden">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3.5 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-3">
                <Logo className="h-8 w-8" />
                <span className="text-[15px] font-bold text-white">Qimma</span>
                <span className="rounded-full bg-accent-500/15 px-2 py-px text-[10px] font-bold uppercase tracking-widest text-accent-400">
                  Admin
                </span>
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors group-open:bg-white/10 group-open:text-white">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-white/10 px-3 pb-4 pt-3">
              <AdminNav />
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/admin/connexion" });
                }}
                className="mt-3 border-t border-white/10 pt-3"
              >
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <IconLogOut className="h-4 w-4" />
                  Se déconnecter ({user.name})
                </button>
              </form>
            </div>
          </details>
        </header>

        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col bg-gradient-to-b from-slate-950 via-slate-950 to-brand-950 lg:flex">
          <div className="flex items-center gap-3 px-6 pb-6 pt-7">
            <Logo className="h-9 w-9" />
            <div>
              <p className="text-[15px] font-bold leading-tight text-white">Qimma</p>
              <span className="mt-0.5 inline-block rounded-full bg-accent-500/15 px-2 py-px text-[10px] font-bold uppercase tracking-widest text-accent-400">
                Admin
              </span>
            </div>
          </div>

          <div className="mx-6 mb-4 h-px bg-gradient-to-r from-white/10 to-transparent" />

          <div className="flex-1 overflow-y-auto px-4">
            <p className="mb-2 px-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
              Gestion
            </p>
            <AdminNav />
          </div>

          <div className="m-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
                {initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                <p className="truncate text-xs text-slate-500">{user.email}</p>
              </div>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/admin/connexion" });
                }}
              >
                <button
                  type="submit"
                  title="Se déconnecter"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <IconLogOut className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </aside>

        {/* Contenu */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
