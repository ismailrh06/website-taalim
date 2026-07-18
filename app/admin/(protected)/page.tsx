import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/authz";
import {
  IconFileCheck,
  IconLibrary,
  IconUsers,
  IconCheck,
  IconPlus,
  IconClock,
} from "@/components/icons";

const ACTION_STYLES = {
  CREATE: { label: "a créé", dot: "bg-emerald-500" },
  UPDATE: { label: "a modifié", dot: "bg-amber-500" },
  DELETE: { label: "a supprimé", dot: "bg-red-500" },
} as const;

function timeAgo(date: Date) {
  const minutes = Math.round((Date.now() - date.getTime()) / 60000);
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.round(hours / 24);
  if (days < 7) return `il y a ${days} j`;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export default async function AdminDashboard() {
  const user = await requireAdmin();
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
    { label: "Examens", value: examCount, href: "/admin/examens", icon: IconFileCheck, tint: "from-brand-50 to-brand-100 text-brand-700" },
    { label: "PDF vérifiés", value: verifiedCount, href: "/admin/examens", icon: IconCheck, tint: "from-emerald-50 to-emerald-100 text-emerald-700" },
    { label: "Filières", value: streamCount, href: "/admin/cours", icon: IconLibrary, tint: "from-sky-50 to-sky-100 text-sky-700" },
    { label: "Utilisateurs", value: userCount, href: "/admin/utilisateurs", icon: IconUsers, tint: "from-amber-50 to-amber-100 text-amber-700" },
  ];

  const firstName = (user.name ?? "Admin").split(" ")[0];
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
        Vue d&apos;ensemble
      </p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
        Bonjour, {firstName}
      </h1>
      <p className="mt-1.5 text-sm capitalize text-slate-500">{today}</p>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-brand-200 hover:shadow-md"
          >
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br transition-transform group-hover:scale-110 ${s.tint}`}
            >
              <s.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-3xl font-extrabold tabular-nums tracking-tight text-slate-900">
              {s.value}
            </p>
            <p className="mt-0.5 text-sm font-medium text-slate-500">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/examens/nouveau"
          className="group flex items-center gap-4 rounded-2xl bg-gradient-to-r from-brand-700 to-brand-600 p-5 text-white shadow-lg shadow-brand-700/20 transition-all hover:shadow-brand-700/30"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 transition-transform group-hover:scale-110">
            <IconPlus className="h-5 w-5" />
          </span>
          <div>
            <p className="font-bold">Ajouter un examen</p>
            <p className="text-sm text-brand-100">Sujet + corrigé, PDF ou URL</p>
          </div>
        </Link>
        <Link
          href="/admin/cours"
          className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-brand-200 hover:shadow-md"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 transition-transform group-hover:scale-110">
            <IconLibrary className="h-5 w-5" />
          </span>
          <div>
            <p className="font-bold text-slate-900">Gérer les filières</p>
            <p className="text-sm text-slate-500">Créer, réordonner, assigner les matières</p>
          </div>
        </Link>
        <Link
          href="/admin/utilisateurs"
          className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-brand-200 hover:shadow-md"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 transition-transform group-hover:scale-110">
            <IconUsers className="h-5 w-5" />
          </span>
          <div>
            <p className="font-bold text-slate-900">Gérer les utilisateurs</p>
            <p className="text-sm text-slate-500">Comptes, rôles et accès admin</p>
          </div>
        </Link>
      </div>

      {/* Activité récente */}
      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Activité récente</h2>
        <Link
          href="/admin/journal"
          className="text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          Tout le journal →
        </Link>
      </div>
      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {recentLogs.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <IconClock className="h-5 w-5" />
            </span>
            <p className="text-sm text-slate-500">Aucune action pour l&apos;instant.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recentLogs.map((log) => {
              const style = ACTION_STYLES[log.action];
              return (
                <li key={log.id} className="flex items-center gap-3 px-5 py-3.5 text-sm">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${style.dot}`} />
                  <p className="min-w-0 flex-1 truncate" dir="auto">
                    <span className="font-semibold text-slate-900">{log.user.name}</span>{" "}
                    <span className="text-slate-500">
                      {style.label} {log.entityType.toLowerCase()}
                    </span>{" "}
                    <span className="font-medium text-slate-700">« {log.entityLabel} »</span>
                  </p>
                  <span
                    className="shrink-0 text-xs tabular-nums text-slate-400"
                    title={log.createdAt.toLocaleString("fr-FR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  >
                    {timeAgo(log.createdAt)}
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
