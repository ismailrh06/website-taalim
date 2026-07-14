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
      <body className="flex min-h-screen bg-slate-100 text-slate-900 antialiased">
        {/* Sidebar */}
        <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col bg-gradient-to-b from-slate-950 via-slate-950 to-brand-950">
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
          <div className="mx-auto max-w-6xl px-10 py-10">{children}</div>
        </main>
      </body>
    </html>
  );
}
