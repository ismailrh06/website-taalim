"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/authz";
import { logAudit } from "@/lib/audit";

export async function updateUserRole(userId: string, role: "ELEVE" | "ADMIN") {
  const admin = await requireAdmin();
  if (userId === admin.id && role !== "ADMIN") {
    return { error: "Tu ne peux pas retirer ton propre rôle admin." };
  }

  const user = await prisma.user.update({ where: { id: userId }, data: { role } });

  await logAudit({
    userId: admin.id,
    action: "UPDATE",
    entityType: "User",
    entityId: user.id,
    entityLabel: user.email,
    metadata: { newRole: role },
  });

  return { success: true };
}

export async function toggleUserActive(userId: string, isActive: boolean) {
  const admin = await requireAdmin();
  if (userId === admin.id && !isActive) {
    return { error: "Tu ne peux pas désactiver ton propre compte." };
  }

  const user = await prisma.user.update({ where: { id: userId }, data: { isActive } });

  await logAudit({
    userId: admin.id,
    action: "UPDATE",
    entityType: "User",
    entityId: user.id,
    entityLabel: user.email,
    metadata: { isActive },
  });

  return { success: true };
}

const createUserSchema = z.object({
  email: z.string().trim().email(),
  name: z.string().trim().min(2),
  password: z.string().min(8, "8 caractères minimum"),
  role: z.enum(["ELEVE", "ADMIN"]),
});

export async function createUser(formData: FormData) {
  const admin = await requireAdmin();
  const parsed = createUserSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
  }
  const data = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) return { error: "Un compte existe déjà avec cet email." };

  const passwordHash = await bcrypt.hash(data.password, 12);
  const user = await prisma.user.create({
    data: { email: data.email, name: data.name, passwordHash, role: data.role },
  });

  await logAudit({
    userId: admin.id,
    action: "CREATE",
    entityType: "User",
    entityId: user.id,
    entityLabel: user.email,
  });

  return { success: true };
}
