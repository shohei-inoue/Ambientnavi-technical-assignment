/*
  Warnings:

  - You are about to drop the `MenuCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subCategoryId` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MenuCategory" DROP CONSTRAINT "MenuCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "MenuCategory" DROP CONSTRAINT "MenuCategory_menuId_fkey";

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "subCategoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "MenuCategory";

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
