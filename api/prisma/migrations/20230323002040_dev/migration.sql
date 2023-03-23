-- DropForeignKey
ALTER TABLE "SocietyLinks" DROP CONSTRAINT "SocietyLinks_societyId_fkey";

-- AddForeignKey
ALTER TABLE "SocietyLinks" ADD CONSTRAINT "SocietyLinks_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "Society"("id") ON DELETE CASCADE ON UPDATE CASCADE;
