/*
  Warnings:

  - The `category` column on the `Society` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SocietyCategories" AS ENUM ('SPORTS', 'ACADEMIC', 'SOCIAL', 'OTHER');

-- AlterTable
ALTER TABLE "Society" DROP COLUMN "category",
ADD COLUMN     "category" "SocietyCategories" NOT NULL DEFAULT 'OTHER';
