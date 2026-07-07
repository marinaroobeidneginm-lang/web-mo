-- Migrar imagen única a array de imágenes
ALTER TABLE "Property" ADD COLUMN "imagenes" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

UPDATE "Property"
SET "imagenes" = ARRAY["imagen"]
WHERE "imagen" IS NOT NULL AND "imagen" <> '';

ALTER TABLE "Property" DROP COLUMN "imagen";
