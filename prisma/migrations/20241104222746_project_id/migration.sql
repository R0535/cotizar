/*
  Warnings:

  - You are about to drop the column `projectid` on the `Estimation` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `Estimation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Estimation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "Estimation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Estimation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Estimation" ("createdAt", "createdById", "description", "id", "name") SELECT "createdAt", "createdById", "description", "id", "name" FROM "Estimation";
DROP TABLE "Estimation";
ALTER TABLE "new_Estimation" RENAME TO "Estimation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
