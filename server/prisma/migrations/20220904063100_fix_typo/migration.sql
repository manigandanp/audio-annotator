/*
  Warnings:

  - You are about to drop the column `cleansedAnnotatoin` on the `annotations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "annotations" DROP COLUMN "cleansedAnnotatoin",
ADD COLUMN     "cleansedAnnotation" TEXT NOT NULL DEFAULT E'';
