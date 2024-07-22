/*
  Warnings:

  - You are about to drop the column `inventoryId` on the `Products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_inventoryId_fkey";

-- DropIndex
DROP INDEX "Products_inventoryId_key";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "inventoryId";
