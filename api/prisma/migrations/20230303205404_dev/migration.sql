/*
  Warnings:

  - The values [SPORTS,ACADEMIC,SOCIAL,OTHER] on the enum `SocietyCategories` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SocietyCategories_new" AS ENUM ('Sports', 'Academic', 'Social', 'Other');
ALTER TABLE "Society" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "Society" ALTER COLUMN "category" TYPE "SocietyCategories_new" USING ("category"::text::"SocietyCategories_new");
ALTER TYPE "SocietyCategories" RENAME TO "SocietyCategories_old";
ALTER TYPE "SocietyCategories_new" RENAME TO "SocietyCategories";
DROP TYPE "SocietyCategories_old";
ALTER TABLE "Society" ALTER COLUMN "category" SET DEFAULT 'Other';
COMMIT;

-- AlterTable
ALTER TABLE "Society" ALTER COLUMN "category" SET DEFAULT 'Other';
