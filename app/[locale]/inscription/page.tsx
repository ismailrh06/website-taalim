import { redirect as adminRedirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/auth";
import { safeNext } from "@/lib/safe-redirect";
import { AuthShell } from "@/components/auth/auth-shell";
import { StudentSignupForm } from "@/components/auth/signup-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.signup" });
  return { title: t("title") };
}

export default async function SignupPage({
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

  const t = await getTranslations("auth.signup");

  return (
    <AuthShell
      title={t("title")}
      subtitle={t("subtitle")}
      footerPrompt={t("hasAccount")}
      footerLinkLabel={t("loginLink")}
      footerHref="/connexion"
    >
      <StudentSignupForm next={next ?? undefined} />
    </AuthShell>
  );
}
