import { prisma } from "@/lib/prisma";

/// Limitation de débit par compteur en base (cf. ARCHITECTURE.md §9) — pas
/// besoin de Redis pour le volume actuel. Une clé = une action + un
/// identifiant (IP, email…). Renvoie `false` quand la limite est atteinte.
///
/// Fail-open : une panne transitoire de la base (cold start Neon, etc.) ne
/// doit pas bloquer la connexion des utilisateurs légitimes — le rate limit
/// est une protection en profondeur, pas un point de défaillance unique.
export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  try {
    const now = new Date();
    const bucket = await prisma.rateLimitBucket.findUnique({ where: { key } });

    const windowExpired =
      !bucket || now.getTime() - bucket.windowStart.getTime() > windowSeconds * 1000;

    if (windowExpired) {
      await prisma.rateLimitBucket.upsert({
        where: { key },
        create: { key, count: 1, windowStart: now },
        update: { count: 1, windowStart: now },
      });
      return true;
    }

    if (bucket.count >= limit) return false;

    await prisma.rateLimitBucket.update({
      where: { key },
      data: { count: { increment: 1 } },
    });
    return true;
  } catch (err) {
    console.error("checkRateLimit: échec (fail-open)", err);
    return true;
  }
}
