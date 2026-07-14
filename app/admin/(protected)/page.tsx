import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { IconFileCheck, IconLibrary, IconUsers, IconCheck } from "@/components/icons";

export default async function AdminDashboard() {
  const [examCount, verifiedCount, streamCount, userCount, recentLogs] = await Promise.all([
    prisma.exam.count(),
    prisma.exam.count({ where: { pdfUrl: { not: null } } }),
    prisma.stream.count(),
    prisma.user.count(),
    prisma.auditLog.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    }),
  ]);

  const stats = [
    { label: "Examens", value: examCount, icon: IconFileCheck },
    { label: "PDF vérifiés", value: verifiedCount, icon: IconCheck },
    { label: "Filières", value: streamCount, icon: IconLibrary },
    { label: "Utilisateurs", value: userCount, icon: IconUsers },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
      <p className="mt-1 text-sm text-slate-500">Vue d&apos;ensemble du contenu Qimma.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-5">
            <s.icon className="h-5 w-5 text-brand-500" />
            <p className="mt-2 text-2xl font-bold tabular-nums text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/examens/nouveau"
          className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
        >
          + Ajouter un examen
        </Link>
        <Link
          href="/admin/cours"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Gérer les filières
        </Link>
      </div>

      <h2 className="mt-10 text-lg font-bold text-slate-900">Activité récente</h2>
      <div className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
        {recentLogs.length === 0 && (
          <p className="p-5 text-sm text-slate-500">Aucune action pour l&apos;instant.</p>
        )}
        {recentLogs.map((log) => (
          <div key={log.id} className="flex items-center justify-between gap-4 p-4 text-sm">
            <div>
              <span className="font-medium text-slate-900">{log.user.name}</span>{" "}
              <span className="text-slate-500">
                {{ CREATE: "a créé", UPDATE: "a modifié", DELETE: "a supprimé" }[log.action]}{" "}
                {log.entityType.toLowerCase()} « {log.entityLabel} »
              </span>
            </div>
            <span className="shrink-0 text-xs text-slate-400">
              {log.createdAt.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}
            </span>
          </div>
        ))}
      </div>
      <Link
        href="/admin/journal"
        className="mt-3 inline-block text-sm font-medium text-brand-700 hover:text-brand-800"
      >
        Voir tout le journal →
      </Link>
    </div>
  );
}
