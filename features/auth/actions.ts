"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { headers } from "next/headers";
import { redirect as adminRedirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { AuthError, CredentialsSignin } from "next-auth";
import { redirect } from "@/i18n/navigation";
import { signIn, signOut, auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";

/// Les actions renvoient des codes d'erreur (pas des phrases) : le formulaire
/// client les traduit via le namespace `auth.errors`, dans la locale active.
export type AuthActionState = { error?: string };

const signupSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8).max(128),
});

async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnue";
}

export async function registerStudent(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const locale = await getLocale();

  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    const field = parsed.error.issues[0]?.path[0];
    if (field === "name") return { error: "invalid-name" };
    if (field === "password") return { error: "invalid-password" };
    return { error: "invalid-email" };
  }
  const { name, email, password } = parsed.data;

  const allowed = await checkRateLimit(`signup:ip:${await clientIp()}`, 5, 3600);
  if (!allowed) return { error: "rate-limited" };

  const existing = await prisma.user.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
  });
  if (existing) return { error: "email-taken" };

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { email, name, passwordHash, role: "ELEVE" },
  });

  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch {
    // Compte créé mais connexion auto impossible (ex. rate limit) —
    // l'élève peut se connecter manuellement.
    redirect({ href: "/connexion", locale });
  }

  redirect({ href: "/bienvenue", locale });
  return {};
}

export async function loginStudent(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const locale = await getLocale();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (err) {
    if (err instanceof CredentialsSignin && err.code === "trop-de-tentatives") {
      return { error: "rate-limited" };
    }
    if (err instanceof AuthError) return { error: "bad-credentials" };
    throw err;
  }

  const session = await auth();
  // /admin vit hors du routage i18n — redirection brute, sans préfixe de locale.
  if (session?.user?.role === "ADMIN") adminRedirect("/admin");

  const user =
    typeof email === "string"
      ? await prisma.user.findFirst({
          where: { email: { equals: email.trim(), mode: "insensitive" } },
          select: { onboardedAt: true },
        })
      : null;

  redirect({ href: user?.onboardedAt ? "/" : "/bienvenue", locale });
  return {};
}

export async function completeOnboarding(input: {
  levelSlug?: string;
  streamSlug?: string;
}) {
  const locale = await getLocale();
  const session = await auth();
  if (!session?.user?.id) redirect({ href: "/connexion", locale });

  // Slugs validés contre le catalogue — on n'enregistre jamais une valeur
  // arbitraire venue du client.
  let levelSlug: string | null = null;
  let streamSlug: string | null = null;
  if (input.levelSlug) {
    const level = await prisma.level.findUnique({
      where: { slug: input.levelSlug },
      include: { streams: true },
    });
    if (level) {
      levelSlug = level.slug;
      streamSlug =
        level.streams.find((s) => s.slug === input.streamSlug)?.slug ?? null;
    }
  }

  await prisma.user.update({
    where: { id: session!.user.id },
    data: { levelSlug, streamSlug, onboardedAt: new Date() },
  });

  if (levelSlug && streamSlug) {
    redirect({ href: `/cours/${levelSlug}/${streamSlug}`, locale });
  }
  redirect({ href: "/cours", locale });
}

export async function logoutStudent() {
  const locale = await getLocale();
  await signOut({ redirect: false });
  redirect({ href: "/", locale });
}
