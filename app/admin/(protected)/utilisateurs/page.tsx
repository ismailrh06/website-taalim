import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/authz";
import { UserRowControls } from "@/components/admin/user-row-controls";
import { CreateUserForm } from "@/components/admin/create-user-form";

export default async function AdminUsersPage() {
  const currentUser = await requireAdmin();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Utilisateurs</h1>
          <p className="mt-1 text-sm text-slate-500">{users.length} comptes.</p>
        </div>
      </div>

      <div className="mt-6">
        <CreateUserForm />
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Rôle / actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 font-medium text-slate-900">
                  {user.name}
                  {user.id === currentUser.id && (
                    <span className="ml-2 text-xs text-slate-400">(toi)</span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-600">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      user.isActive
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.isActive ? "Actif" : "Désactivé"}
                  </span>
                </td>
                <td className="px-4 py-3">
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
  );
}
