/*
  Warnings:

  - You are about to drop the column `inventoryItemId` on the `ProductItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_inventoryItemId_fkey";

-- DropIndex
DROP INDEX "ProductItem_inventoryItemId_key";

-- AlterTable
ALTER TABLE "ProductItem" DROP COLUMN "inventoryItemId";
