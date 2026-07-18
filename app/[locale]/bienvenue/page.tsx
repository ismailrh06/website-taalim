import { redirect as adminRedirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/auth";
import { getLevelsWithStreams } from "@/features/catalog/queries";
import { HeroSky, SummitRidge } from "@/components/decor";
import { OnboardingWizard } from "@/components/auth/onboarding-wizard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.onboarding" });
  return { title: t("levelTitle"), robots: { index: false, follow: false } };
}

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth();
  if (!session?.user) redirect({ href: "/connexion", locale });
  if (session!.user.role === "ADMIN") adminRedirect("/admin");

  const levels = await getLevelsWithStreams();
  const firstName = (session!.user.name ?? "").split(" ")[0] || "!";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800">
      <HeroSky />
      <div className="relative mx-auto max-w-7xl px-4 pb-36 pt-14 sm:px-6 sm:pt-20">
        <OnboardingWizard levels={levels} firstName={firstName} />
      </div>
      <SummitRidge className="absolute inset-x-0 bottom-0 h-20 w-full sm:h-24" />
    </section>
  );
}
