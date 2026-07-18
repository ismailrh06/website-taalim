-- Préférences d'onboarding élève (niveau, filière, date de complétion).
-- Colonnes nullables : purement additif, aucun impact sur les lignes existantes.
ALTER TABLE "users" ADD COLUMN "levelSlug" TEXT;
ALTER TABLE "users" ADD COLUMN "streamSlug" TEXT;
ALTER TABLE "users" ADD COLUMN "onboardedAt" TIMESTAMP(3);
