import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ELEVE" | "ADMIN";
    } & DefaultSession["user"];
  }

  interface User {
    role: "ELEVE" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ELEVE" | "ADMIN";
  }
}
