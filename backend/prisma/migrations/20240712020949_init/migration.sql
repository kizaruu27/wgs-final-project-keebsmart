/*
  Warnings:

  - Added the required column `manufacturer` to the `ProductItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ProductItem_unitId_key";

-- AlterTable
ALTER TABLE "ProductItem" ADD COLUMN     "manufacturer" TEXT NOT NULL;
