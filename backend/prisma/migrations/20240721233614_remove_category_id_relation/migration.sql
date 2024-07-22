/*
  Warnings:

  - A unique constraint covering the columns `[inventoryId]` on the table `Products` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_inventoryId_categoryId_fkey";

-- DropIndex
DROP INDEX "Inventory_id_categoryId_key";

-- DropIndex
DROP INDEX "Products_inventoryId_categoryId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Products_inventoryId_key" ON "Products"("inventoryId");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
