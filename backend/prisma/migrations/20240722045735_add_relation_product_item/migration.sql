/*
  Warnings:

  - A unique constraint covering the columns `[inventoryItemId]` on the table `ProductItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inventoryItemId` to the `ProductItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductItem" ADD COLUMN     "inventoryItemId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductItem_inventoryItemId_key" ON "ProductItem"("inventoryItemId");

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
