-- AlterTable
ALTER TABLE "titles" ADD COLUMN     "sourceFileSize" INTEGER,
ALTER COLUMN "sampleRate" DROP NOT NULL,
ALTER COLUMN "sourceDuration" DROP NOT NULL;
