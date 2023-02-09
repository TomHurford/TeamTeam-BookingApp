/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Society` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[societyId]` on the table `SocietyLinks` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Society_name_key" ON "Society"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SocietyLinks_societyId_key" ON "SocietyLinks"("societyId");
