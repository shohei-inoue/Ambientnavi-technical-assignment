/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Menu` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_categoryId_fkey";

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "MenuCategory" (
    "menuId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "MenuCategory_pkey" PRIMARY KEY ("menuId","categoryId")
);

-- AddForeignKey
ALTER TABLE "MenuCategory" ADD CONSTRAINT "MenuCategory_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuCategory" ADD CONSTRAINT "MenuCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
