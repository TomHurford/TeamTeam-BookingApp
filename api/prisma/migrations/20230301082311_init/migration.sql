/*
  Warnings:

  - The `status` column on the `Purchase` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PURCHASE_STATUS" AS ENUM ('PENDING', 'PAID', 'REFUNDED');

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "status",
ADD COLUMN     "status" "PURCHASE_STATUS" NOT NULL DEFAULT 'PENDING';
