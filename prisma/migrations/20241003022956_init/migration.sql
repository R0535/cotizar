-- AlterTable
ALTER TABLE "Agent" ADD COLUMN "createdBy" TEXT;
ALTER TABLE "Agent" ADD COLUMN "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "createdBy" TEXT;
ALTER TABLE "User" ADD COLUMN "updatedBy" TEXT;
