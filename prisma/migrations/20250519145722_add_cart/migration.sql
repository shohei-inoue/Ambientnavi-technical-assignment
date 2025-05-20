/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `TableSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "tableSessionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "note" TEXT,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_tableSessionId_key" ON "Cart"("tableSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "TableSession_sessionId_key" ON "TableSession"("sessionId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_tableSessionId_fkey" FOREIGN KEY ("tableSessionId") REFERENCES "TableSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
