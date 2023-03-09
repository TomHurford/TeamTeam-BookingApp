/*
  Warnings:

  - The `status` column on the `Ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TICKET_STATUS" AS ENUM ('UNUSED', 'USED');

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "status",
ADD COLUMN     "status" "TICKET_STATUS" NOT NULL DEFAULT 'UNUSED';
