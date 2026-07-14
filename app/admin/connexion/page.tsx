import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn, auth } from "@/auth";
import { Logo } from "@/components/logo";

async function authenticate(formData: FormData) {
  "use server";
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (err) {
    if (err instanceof AuthError) {
      redirect("/admin/connexion?erreur=identifiants");
    }
    throw err;
  }
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const session = await auth();
  if (session?.user?.role === "ADMIN") redirect("/admin");

  const { erreur } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <div className="flex items-center gap-2">
          <Logo className="h-9 w-9" />
          <span className="text-xl font-bold text-white">Qimma Admin</span>
        </div>

        {erreur === "identifiants" && (
          <p className="mt-6 rounded-lg border border-red-900 bg-red-950 px-3 py-2 text-sm text-red-300">
            Email ou mot de passe incorrect.
          </p>
        )}
        {erreur === "acces-refuse" && (
          <p className="mt-6 rounded-lg border border-red-900 bg-red-950 px-3 py-2 text-sm text-red-300">
            Ce compte n&apos;a pas les droits administrateur.
          </p>
        )}

        <form action={authenticate} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-400">Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-400">Mot de passe</span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
