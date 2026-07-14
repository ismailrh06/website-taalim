import { redirect } from "next/navigation";
import { auth } from "@/auth";

/// Centralisé plutôt que dispersé — cf. ARCHITECTURE.md §9 : chaque Server
/// Action et page protégée appelle l'un de ces deux helpers en tête.

export async function requireUser() {
  const session = await auth();
  if (!session?.user) redirect("/admin/connexion");
  return session.user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") redirect("/admin/connexion?erreur=acces-refuse");
  return user;
}
