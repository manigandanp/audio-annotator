-- DropForeignKey
ALTER TABLE "annotations" DROP CONSTRAINT "annotations_segmentId_fkey";

-- DropForeignKey
ALTER TABLE "titles" DROP CONSTRAINT "titles_projectId_fkey";

-- AddForeignKey
ALTER TABLE "titles" ADD CONSTRAINT "titles_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotations" ADD CONSTRAINT "annotations_segmentId_fkey" FOREIGN KEY ("segmentId") REFERENCES "segments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
