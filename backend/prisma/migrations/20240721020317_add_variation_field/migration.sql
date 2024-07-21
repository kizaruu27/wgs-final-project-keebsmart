/*
  Warnings:

  - You are about to drop the column `variationOptionId` on the `InventoryItem` table. All the data in the column will be lost.
  - Added the required column `variation` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variationId` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InventoryItem" DROP CONSTRAINT "InventoryItem_variationOptionId_fkey";

-- AlterTable
ALTER TABLE "InventoryItem" DROP COLUMN "variationOptionId",
ADD COLUMN     "variation" TEXT NOT NULL,
ADD COLUMN     "variationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "Variations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
