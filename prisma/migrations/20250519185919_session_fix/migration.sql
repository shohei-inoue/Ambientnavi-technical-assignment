/*
  Warnings:

  - You are about to drop the column `uuid` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `Table` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `TableSession` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TableSession" DROP CONSTRAINT "TableSession_userId_fkey";

-- DropIndex
DROP INDEX "Order_uuid_key";

-- DropIndex
DROP INDEX "Table_uuid_key";

-- DropIndex
DROP INDEX "TableSession_uuid_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "uuid";

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "uuid";

-- AlterTable
ALTER TABLE "TableSession" DROP COLUMN "uuid";

-- CreateTable
CREATE TABLE "UserSession" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tableSessionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSession_userId_tableSessionId_key" ON "UserSession"("userId", "tableSessionId");

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_tableSessionId_fkey" FOREIGN KEY ("tableSessionId") REFERENCES "TableSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
