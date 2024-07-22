/*
  Warnings:

  - A unique constraint covering the columns `[id,categoryId]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inventoryId,categoryId]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inventoryId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "inventoryId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_id_categoryId_key" ON "Inventory"("id", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Products_inventoryId_categoryId_key" ON "Products"("inventoryId", "categoryId");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_inventoryId_categoryId_fkey" FOREIGN KEY ("inventoryId", "categoryId") REFERENCES "Inventory"("id", "categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
