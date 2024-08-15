-- AlterTable
ALTER TABLE "annotations" ADD COLUMN     "cleansedAnnotatoin" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "emotionalType" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "isValid" BOOLEAN NOT NULL DEFAULT true;
