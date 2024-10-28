/*
  Warnings:

  - You are about to drop the `Agent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomProperty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `ProjectId` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Node` table. All the data in the column will be lost.
  - Added the required column `timeBack` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeFront` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Agent";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CustomProperty";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Estimation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "projectid" TEXT NOT NULL,
    CONSTRAINT "Estimation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Estimation_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EstimationExport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "estimationId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EstimationExport_estimationId_fkey" FOREIGN KEY ("estimationId") REFERENCES "Estimation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Calendar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "initialDateFront" DATETIME NOT NULL,
    "initialDateBack" DATETIME NOT NULL,
    "endDateFront" DATETIME NOT NULL,
    "endDateBack" DATETIME NOT NULL,
    "personalFront" INTEGER NOT NULL,
    "personalBack" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estimationId" TEXT,
    CONSTRAINT "Calendar_estimationId_fkey" FOREIGN KEY ("estimationId") REFERENCES "Estimation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "timeBack" DECIMAL NOT NULL,
    "timeFront" DECIMAL NOT NULL,
    "color" TEXT NOT NULL,
    "previews" TEXT,
    "tags" TEXT,
    "sectionId" TEXT NOT NULL,
    CONSTRAINT "Feature_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Node" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "timeBack" DECIMAL NOT NULL,
    "timeFront" DECIMAL NOT NULL,
    "description" TEXT,
    "baseFeature" TEXT,
    "tags" TEXT,
    "type" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "positionX" REAL NOT NULL,
    "positionY" REAL NOT NULL,
    "width" REAL,
    "height" REAL,
    "section" TEXT NOT NULL,
    "projectId" TEXT,
    "projectName" TEXT,
    "estimationId" TEXT,
    CONSTRAINT "Node_estimationId_fkey" FOREIGN KEY ("estimationId") REFERENCES "Estimation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Node" ("color", "description", "height", "id", "label", "positionX", "positionY", "section", "type", "width") SELECT "color", "description", "height", "id", "label", "positionX", "positionY", "section", "type", "width" FROM "Node";
DROP TABLE "Node";
ALTER TABLE "new_Node" RENAME TO "Node";
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "previews" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT
);
INSERT INTO "new_Project" ("createdAt", "createdById", "id", "name") SELECT "createdAt", "createdById", "id", "name" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "code" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,
    CONSTRAINT "User_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("active", "code", "createdAt", "createdById", "deleted", "deletedAt", "email", "id", "name", "passwordHash", "updatedAt", "updatedById") SELECT "active", "code", "createdAt", "createdById", "deleted", "deletedAt", "email", "id", "name", "passwordHash", "updatedAt", "updatedById" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_code_key" ON "User"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Calendar_estimationId_key" ON "Calendar"("estimationId");
