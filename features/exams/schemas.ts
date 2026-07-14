import { z } from "zod";

export const examSchema = z.object({
  title: z.string().trim().min(3, "Le titre doit faire au moins 3 caractères"),
  levelSlug: z.string().min(1, "Niveau requis"),
  streamSlug: z.string().min(1, "Filière requise"),
  subjectSlug: z.string().min(1, "Matière requise"),
  type: z.enum(["national", "regional", "blanc", "cnc", "concours"]),
  year: z.coerce.number().int().min(2000).max(2100),
  session: z.enum(["normale", "rattrapage"]),
  language: z.enum(["fr", "ar", "en"]),
  durationMin: z.coerce.number().int().min(10).max(600),
  hasCorrection: z.coerce.boolean(),
  pdfUrl: z.union([z.literal(""), z.string().url()]).optional(),
  correctionUrl: z.union([z.literal(""), z.string().url()]).optional(),
});

export type ExamInput = z.infer<typeof examSchema>;
