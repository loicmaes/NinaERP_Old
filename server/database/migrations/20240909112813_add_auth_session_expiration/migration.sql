/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `authSessions` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `authSessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authSessions" DROP COLUMN "updatedAt",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
