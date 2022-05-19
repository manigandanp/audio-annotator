/*
  Warnings:

  - You are about to drop the column `source` on the `titles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sourceFilename]` on the table `titles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sourceFilePath]` on the table `titles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sourceFilePath` to the `titles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceFilename` to the `titles` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "titles_source_key";

-- AlterTable
ALTER TABLE "titles" DROP COLUMN "source",
ADD COLUMN     "sourceFilePath" TEXT NOT NULL,
ADD COLUMN     "sourceFilename" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "titles_sourceFilename_key" ON "titles"("sourceFilename");

-- CreateIndex
CREATE UNIQUE INDEX "titles_sourceFilePath_key" ON "titles"("sourceFilePath");
