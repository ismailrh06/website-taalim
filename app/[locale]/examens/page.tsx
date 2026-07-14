import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LEVELS, SUBJECTS, getSubject } from "@/features/catalog/taxonomy";
import {
  filterExams,
  EXAM_YEARS,
  type ExamType,
} from "@/features/exams/demo-data";
import { IconCheck, IconChevronDown, IconDownload } from "@/components/icons";
import type { Locale } from "@/i18n/routing";

const EXAM_TYPES: ExamType[] = ["national", "regional", "blanc", "cnc", "concours"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });
  return { title: t("examsTitle") };
}

export default async function ExamsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{
    level?: string;
    subject?: string;
    type?: string;
    year?: string;
  }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const filters = await searchParams;
  const t = await getTranslations("catalog");
  const tCommon = await getTranslations("common");

  const exams = filterExams({
    levelId: filters.level,
    subjectId: filters.subject,
    type: filters.type,
    year: filters.year ? Number(filters.year) : undefined,
  });

  const selectClass =
    "w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {t("examsTitle")}
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">{t("examsSubtitle")}</p>

      <form
        method="get"
        className="mt-10 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2 lg:grid-cols-5"
      >
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-slate-600">
            {t("level")}
          </span>
          <div className="relative">
            <select name="level" defaultValue={filters.level ?? ""} className={selectClass}>
              <option value="">{t("level")} — {tCommon("viewAll")}</option>
              {LEVELS.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.shortName[locale]}
                </option>
              ))}
            </select>
            <IconChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-slate-600">
            {t("subject")}
          </span>
          <div className="relative">
            <select name="subject" defaultValue={filters.subject ?? ""} className={selectClass}>
              <option value="">{t("allSubjects")}</option>
              {SUBJECTS.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name[locale]}
                </option>
              ))}
            </select>
            <IconChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-slate-600">
            {t("type")}
          </span>
          <div className="relative">
            <select name="type" defaultValue={filters.type ?? ""} className={selectClass}>
              <option value="">{t("allTypes")}</option>
              {EXAM_TYPES.map((type) => (
                <option key={type} value={type}>
                  {t(`examTypes.${type}`)}
                </option>
              ))}
            </select>
            <IconChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-slate-600">
            {t("year")}
          </span>
          <div className="relative">
            <select name="year" defaultValue={filters.year ?? ""} className={selectClass}>
              <option value="">{t("allYears")}</option>
              {EXAM_YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <IconChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </label>

        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            {t("filter")}
          </button>
          <Link
            href="/examens"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white"
          >
            {t("reset")}
          </Link>
        </div>
      </form>

      <p className="mt-8 text-sm font-medium text-slate-500">
        {t("results", { count: exams.length })}
      </p>

      <ul className="mt-4 space-y-3">
        {exams.map((exam) => {
          const level = LEVELS.find((l) => l.id === exam.levelId);
          const subject = getSubject(exam.subjectId);
          return (
            <li
              key={exam.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div dir="auto">
                <h2 className="font-semibold text-slate-900">{exam.title}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-brand-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-800">
                    {t(`examTypes.${exam.type}`)}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
                    {level?.shortName[locale]}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
                    {subject?.name[locale]}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
                    {exam.year} · {t(`sessions.${exam.session}`)}
                  </span>
                  {exam.hasCorrection && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 font-medium text-emerald-800">
                      <IconCheck className="h-3.5 w-3.5" />
                      {t("withCorrection")}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-700 px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-700 hover:text-white"
              >
                <IconDownload className="h-4 w-4" />
                {tCommon("download")}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        {t("comingSoon")}
      </p>
    </div>
  );
}
