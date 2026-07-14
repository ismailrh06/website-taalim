import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/authz";
import { UserRowControls } from "@/components/admin/user-row-controls";
import { CreateUserForm } from "@/components/admin/create-user-form";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_TINTS = [
  "from-brand-500 to-brand-700",
  "from-sky-500 to-sky-700",
  "from-violet-500 to-violet-700",
  "from-amber-500 to-amber-700",
  "from-rose-500 to-rose-700",
];

export default async function AdminUsersPage() {
  const currentUser = await requireAdmin();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
            Sécurité
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Utilisateurs
          </h1>
          <p className="mt-1 text-sm text-slate-500">{users.length} comptes.</p>
        </div>
      </div>

      <div className="mt-6">
        <CreateUserForm />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3.5">Utilisateur</th>
                <th className="px-4 py-3.5">Statut</th>
                <th className="px-4 py-3.5">Rôle</th>
                <th className="px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user, i) => (
                <tr key={user.id} className="transition-colors hover:bg-slate-50/60">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white ${AVATAR_TINTS[i % AVATAR_TINTS.length]}`}
                      >
                        {initialsOf(user.name)}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {user.name}
                          {user.id === currentUser.id && (
                            <span className="ms-2 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">
                              toi
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${
                        user.isActive
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                          : "bg-red-50 text-red-700 ring-red-600/20"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          user.isActive ? "bg-emerald-500" : "bg-red-500"
                        }`}
                      />
                      {user.isActive ? "Actif" : "Désactivé"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${
                        user.role === "ADMIN"
                          ? "bg-amber-50 text-amber-800 ring-amber-600/20"
                          : "bg-slate-50 text-slate-600 ring-slate-500/20"
                      }`}
                    >
                      {user.role === "ADMIN" ? "Admin" : "Élève"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <UserRowControls
                      userId={user.id}
                      role={user.role}
                      isActive={user.isActive}
                      isSelf={user.id === currentUser.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
