/*
  Warnings:

  - You are about to alter the column `sectionId` on the `Feature` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Section` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Section` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "timeBack" DECIMAL NOT NULL,
    "timeFront" DECIMAL NOT NULL,
    "color" TEXT NOT NULL,
    "previews" TEXT,
    "tags" TEXT,
    "sectionId" INTEGER NOT NULL,
    CONSTRAINT "Feature_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Feature" ("color", "description", "id", "label", "previews", "sectionId", "tags", "timeBack", "timeFront") SELECT "color", "description", "id", "label", "previews", "sectionId", "tags", "timeBack", "timeFront" FROM "Feature";
DROP TABLE "Feature";
ALTER TABLE "new_Feature" RENAME TO "Feature";
CREATE TABLE "new_Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Section" ("description", "id", "name") SELECT "description", "id", "name" FROM "Section";
DROP TABLE "Section";
ALTER TABLE "new_Section" RENAME TO "Section";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
