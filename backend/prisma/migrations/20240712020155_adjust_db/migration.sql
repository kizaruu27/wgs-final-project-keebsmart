/*
  Warnings:

  - You are about to drop the column `category_name` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `manufacturer` on the `ProductItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[unitId]` on the table `ProductItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryName` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_cartId_fkey";

-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "category_name",
ADD COLUMN     "categoryName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductItem" DROP COLUMN "manufacturer";

-- CreateTable
CREATE TABLE "_CartToProductItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CartToProductItem_AB_unique" ON "_CartToProductItem"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToProductItem_B_index" ON "_CartToProductItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductItem_unitId_key" ON "ProductItem"("unitId");

-- AddForeignKey
ALTER TABLE "_CartToProductItem" ADD CONSTRAINT "_CartToProductItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToProductItem" ADD CONSTRAINT "_CartToProductItem_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
