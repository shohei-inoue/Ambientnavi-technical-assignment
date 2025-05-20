/*
  Warnings:

  - You are about to drop the column `checkedInAt` on the `Table` table. All the data in the column will be lost.
  - You are about to drop the column `checkedOutAt` on the `Table` table. All the data in the column will be lost.
  - You are about to drop the column `guestCount` on the `Table` table. All the data in the column will be lost.
  - You are about to drop the column `isPaid` on the `Table` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TableSession` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TableSession` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `Table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guestCount` to the `TableSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Table" DROP COLUMN "checkedInAt",
DROP COLUMN "checkedOutAt",
DROP COLUMN "guestCount",
DROP COLUMN "isPaid",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "TableSession" DROP COLUMN "createdAt",
DROP COLUMN "userId",
ADD COLUMN     "checkedInAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "checkedOutAt" TIMESTAMP(3),
ADD COLUMN     "guestCount" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "Table_number_key" ON "Table"("number");
