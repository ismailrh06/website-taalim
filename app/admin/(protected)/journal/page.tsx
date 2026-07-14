import { prisma } from "@/lib/prisma";

const ACTION_LABELS = { CREATE: "a créé", UPDATE: "a modifié", DELETE: "a supprimé" } as const;
const ACTION_COLORS = {
  CREATE: "bg-emerald-100 text-emerald-800",
  UPDATE: "bg-amber-100 text-amber-800",
  DELETE: "bg-red-100 text-red-800",
} as const;

export default async function AdminAuditLogPage() {
  const logs = await prisma.auditLog.findMany({
    take: 200,
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Journal d&apos;audit</h1>
      <p className="mt-1 text-sm text-slate-500">
        Les 200 dernières actions effectuées depuis l&apos;admin.
      </p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Quand</th>
              <th className="px-4 py-3">Qui</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Élément</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="whitespace-nowrap px-4 py-3 text-xs tabular-nums text-slate-500">
                  {log.createdAt.toLocaleString("fr-FR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-4 py-3 text-slate-700">{log.user.name}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${ACTION_COLORS[log.action]}`}
                  >
                    {ACTION_LABELS[log.action]}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-700" dir="auto">
                  <span className="text-slate-400">{log.entityType}</span> « {log.entityLabel} »
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-400">
                  Aucune action enregistrée pour l&apos;instant.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
