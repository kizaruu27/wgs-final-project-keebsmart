/*
  Warnings:

  - You are about to drop the `_CartToProductItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrdersToProductItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productItemId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTotalPrice` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CartToProductItem" DROP CONSTRAINT "_CartToProductItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToProductItem" DROP CONSTRAINT "_CartToProductItem_B_fkey";

-- DropForeignKey
ALTER TABLE "_OrdersToProductItem" DROP CONSTRAINT "_OrdersToProductItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrdersToProductItem" DROP CONSTRAINT "_OrdersToProductItem_B_fkey";

-- DropIndex
DROP INDEX "Cart_userId_key";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "productItemId" INTEGER NOT NULL,
ADD COLUMN     "qty" INTEGER NOT NULL,
ADD COLUMN     "subTotalPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductItem" ADD COLUMN     "sold" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "isActive" BOOLEAN DEFAULT false,
ADD COLUMN     "soldTotal" INTEGER DEFAULT 0,
ADD COLUMN     "specs" VARCHAR[];

-- DropTable
DROP TABLE "_CartToProductItem";

-- DropTable
DROP TABLE "_OrdersToProductItem";

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_productItemId_fkey" FOREIGN KEY ("productItemId") REFERENCES "ProductItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
