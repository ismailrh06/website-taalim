import { redirect as adminRedirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/auth";
import { safeNext } from "@/lib/safe-redirect";
import { AuthShell } from "@/components/auth/auth-shell";
import { StudentLoginForm } from "@/components/auth/login-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.login" });
  return { title: t("title") };
}

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const next = safeNext((await searchParams).next);

  const session = await auth();
  if (session?.user) {
    if (session.user.role === "ADMIN") adminRedirect("/admin");
    redirect({ href: next ?? "/", locale });
  }

  const t = await getTranslations("auth.login");

  return (
    <AuthShell
      title={t("title")}
      subtitle={t("subtitle")}
      footerPrompt={t("noAccount")}
      footerLinkLabel={t("signupLink")}
      footerHref="/inscription"
    >
      <StudentLoginForm next={next ?? undefined} />
    </AuthShell>
  );
}
