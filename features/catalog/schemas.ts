import { z } from "zod";

export const streamSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug : lettres minuscules, chiffres et tirets uniquement"),
  nameFr: z.string().trim().min(2),
  nameAr: z.string().trim().min(2),
  nameEn: z.string().trim().min(2),
  subjectSlugs: z.array(z.string()).min(1, "Au moins une matière"),
});

export type StreamInput = z.infer<typeof streamSchema>;
