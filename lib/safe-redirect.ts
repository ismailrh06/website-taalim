/// Valide une destination de redirection post-connexion venue du client
/// (query param ou champ de formulaire) — empêche les redirections ouvertes
/// vers un domaine externe et exclut /admin, qui a son propre flux d'auth.
export function safeNext(value: FormDataEntryValue | string | null | undefined): string | null {
  if (typeof value !== "string" || !value) return null;
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("://")) {
    return null;
  }
  if (value.startsWith("/admin")) return null;
  return value;
}
