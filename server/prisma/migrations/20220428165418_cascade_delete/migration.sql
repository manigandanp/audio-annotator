-- DropForeignKey
ALTER TABLE "segments" DROP CONSTRAINT "segments_titleId_fkey";

-- AddForeignKey
ALTER TABLE "segments" ADD CONSTRAINT "segments_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "titles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
