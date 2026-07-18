import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";

/// Levée quand la limite de tentatives est atteinte — son `code` remonte
/// jusqu'au formulaire pour afficher un message distinct des identifiants
/// invalides, sans révéler si l'email existe.
class RateLimitedError extends CredentialsSignin {
  code = "trop-de-tentatives";
}

/// Hash factice comparé quand l'email est inconnu : la réponse prend le même
/// temps qu'avec un compte réel, donc impossible de deviner quels emails
/// existent en mesurant la latence (anti-énumération).
const DUMMY_HASH =
  "$2b$12$/m3uXXYUBP/hnL9sbbijteh/1bJNT9KmGTxFlYJ13vPnqrHdhPkp.";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  // Session admin de 8 h : un poste oublié ouvert redevient inoffensif le
  // jour même, sans forcer une reconnexion en pleine journée de travail.
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  pages: { signIn: "/admin/connexion" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials, request) {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";
        if (!email || !password || email.length > 254 || password.length > 128) {
          return null;
        }

        // Double limite : par email (bourrage de mot de passe sur un compte)
        // et par IP (rotation d'emails depuis une même machine).
        const ip =
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          "inconnue";
        const [emailOk, ipOk] = await Promise.all([
          checkRateLimit(`login:email:${email}`, 5, 300),
          checkRateLimit(`login:ip:${ip}`, 20, 900),
        ]);
        if (!emailOk || !ipOk) throw new RateLimitedError();

        // Insensible à la casse : les comptes créés avant la normalisation
        // des emails restent accessibles.
        const user = await prisma.user.findFirst({
          where: { email: { equals: email, mode: "insensitive" } },
        });

        const valid = await bcrypt.compare(
          password,
          user?.passwordHash ?? DUMMY_HASH,
        );
        if (!valid || !user || !user.isActive) return null;

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "ELEVE" | "ADMIN";
      }
      return session;
    },
  },
});
