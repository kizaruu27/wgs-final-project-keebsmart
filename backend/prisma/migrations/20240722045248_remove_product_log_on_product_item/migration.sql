/*
  Warnings:

  - You are about to drop the column `productLogId` on the `ProductItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_productLogId_fkey";

-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "isUsed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ProductItem" DROP COLUMN "productLogId";
