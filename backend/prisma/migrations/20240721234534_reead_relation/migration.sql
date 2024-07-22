/*
  Warnings:

  - A unique constraint covering the columns `[inventoryId]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inventoryId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "inventoryId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Products_inventoryId_key" ON "Products"("inventoryId");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
