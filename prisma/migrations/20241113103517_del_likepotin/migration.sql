/*
  Warnings:

  - You are about to drop the column `likePoint` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "password" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "height" REAL,
    "age" INTEGER,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "chatRoomId" INTEGER,
    "googleId" TEXT,
    "naverId" TEXT,
    "kakaoId" TEXT,
    CONSTRAINT "User_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("age", "chatRoomId", "createdAt", "description", "email", "googleId", "height", "id", "kakaoId", "name", "naverId", "password", "phoneNumber", "profileImage", "updatedAt") SELECT "age", "chatRoomId", "createdAt", "description", "email", "googleId", "height", "id", "kakaoId", "name", "naverId", "password", "phoneNumber", "profileImage", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
CREATE UNIQUE INDEX "User_naverId_key" ON "User"("naverId");
CREATE UNIQUE INDEX "User_kakaoId_key" ON "User"("kakaoId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;