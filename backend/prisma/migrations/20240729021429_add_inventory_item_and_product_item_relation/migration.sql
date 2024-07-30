/*
  Warnings:

  - A unique constraint covering the columns `[inventoryItemId]` on the table `ProductItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProductItem" ADD COLUMN     "inventoryItemId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "ProductItem_inventoryItemId_key" ON "ProductItem"("inventoryItemId");

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
