import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/prisma/generated/prisma/client";

export async function logAudit(params: {
  userId: string;
  action: "CREATE" | "UPDATE" | "DELETE";
  entityType: "Exam" | "Level" | "Stream" | "Subject" | "User";
  entityId: string;
  entityLabel: string;
  metadata?: Record<string, unknown>;
}) {
  await prisma.auditLog.create({
    data: {
      userId: params.userId,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      entityLabel: params.entityLabel,
      metadata: params.metadata as Prisma.InputJsonValue | undefined,
    },
  });
}
