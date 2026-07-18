import { redirect as adminRedirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/auth";
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
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth();
  if (session?.user) {
    if (session.user.role === "ADMIN") adminRedirect("/admin");
    redirect({ href: "/", locale });
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
      <StudentSignupForm />
    </AuthShell>
  );
}
