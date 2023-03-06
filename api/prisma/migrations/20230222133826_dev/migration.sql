/*
  Warnings:

  - Added the required column `category` to the `Society` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Society" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;
