import { redirect } from "next/navigation";
import { AuthError, CredentialsSignin } from "next-auth";
import { signIn, auth } from "@/auth";
import { Logo } from "@/components/logo";
import { LoginForm } from "@/components/admin/login-form";

async function authenticate(formData: FormData) {
  "use server";
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (err) {
    if (err instanceof CredentialsSignin && err.code === "trop-de-tentatives") {
      redirect("/admin/connexion?erreur=trop-de-tentatives");
    }
    if (err instanceof AuthError) {
      redirect("/admin/connexion?erreur=identifiants");
    }
    throw err;
  }
}

const ERROR_MESSAGES: Record<string, string> = {
  identifiants: "Email ou mot de passe incorrect.",
  "trop-de-tentatives":
    "Trop de tentatives. Patiente quelques minutes avant de réessayer.",
  "acces-refuse": "Ce compte n'a pas les droits administrateur.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const session = await auth();
  if (session?.user?.role === "ADMIN") redirect("/admin");

  const { erreur } = await searchParams;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 px-4">
      {/* Halo lumineux */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top, rgba(45,212,191,0.35), transparent 60%)",
        }}
      />

      {/* Motif de sommet — écho du logo */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon
          points="0,180 160,140 320,170 480,110 640,150 800,100 960,160 1120,120 1280,150 1440,130 1440,240 0,240"
          fill="#ffffff"
          fillOpacity="0.05"
        />
        <polygon
          points="0,220 140,190 260,150 400,60 520,140 680,90 760,160 900,120 1040,170 1200,130 1320,180 1440,150 1440,240 0,240"
          fill="#03211f"
          fillOpacity="0.85"
        />
        <circle cx="400" cy="58" r="11" fill="#f59e0b" fillOpacity="0.16" />
        <circle cx="400" cy="58" r="4.5" fill="#fbbf24" />
      </svg>

      <div className="relative w-full max-w-sm">
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center">
            <Logo className="h-14 w-14" />
            <h1 className="mt-4 text-xl font-bold text-white">
              Espace administrateur
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Gère le contenu et les utilisateurs de Qimma.
            </p>
          </div>

          <LoginForm
            action={authenticate}
            erreur={erreur ? ERROR_MESSAGES[erreur] : undefined}
          />
        </div>

        <p className="mt-6 text-center text-xs text-brand-200/50">
          Qimma — قِمّة · Accès réservé à l&apos;équipe
        </p>
      </div>
    </div>
  );
}
