import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/authz";
import { IconClock } from "@/components/icons";

const ACTION_META = {
  CREATE: { label: "Création", badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/20", dot: "bg-emerald-500" },
  UPDATE: { label: "Modification", badge: "bg-amber-50 text-amber-800 ring-amber-600/20", dot: "bg-amber-500" },
  DELETE: { label: "Suppression", badge: "bg-red-50 text-red-700 ring-red-600/20", dot: "bg-red-500" },
} as const;

const ENTITY_LABELS: Record<string, string> = {
  Exam: "Examen",
  Stream: "Filière",
  Subject: "Matière",
  Level: "Niveau",
  User: "Utilisateur",
};

export default async function AdminAuditLogPage() {
  await requireAdmin();
  const logs = await prisma.auditLog.findMany({
    take: 200,
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
        Sécurité
      </p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
        Journal d&apos;audit
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Les 200 dernières actions effectuées depuis l&apos;admin.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <IconClock className="h-5 w-5" />
            </span>
            <p className="text-sm text-slate-500">Aucune action enregistrée pour l&apos;instant.</p>
            <p className="text-xs text-slate-400">
              Les créations, modifications et suppressions apparaîtront ici.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {logs.map((log) => {
              const meta = ACTION_META[log.action];
              return (
                <li key={log.id} className="flex items-center gap-4 px-5 py-4">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${meta.dot}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm" dir="auto">
                      <span className="font-semibold text-slate-900">{log.user.name}</span>{" "}
                      <span className="text-slate-500">·</span>{" "}
                      <span className="text-slate-600">
                        {ENTITY_LABELS[log.entityType] ?? log.entityType}
                      </span>{" "}
                      <span className="font-medium text-slate-800">
                        « {log.entityLabel} »
                      </span>
                    </p>
                    <p className="mt-0.5 text-xs tabular-nums text-slate-400">
                      {log.createdAt.toLocaleString("fr-FR", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${meta.badge}`}
                  >
                    {meta.label}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
