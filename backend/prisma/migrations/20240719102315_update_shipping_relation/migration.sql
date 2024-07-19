/*
  Warnings:

  - You are about to drop the column `addressId` on the `Shipping` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Shipping` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Shipping` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_shippingId_fkey";

-- DropForeignKey
ALTER TABLE "Shipping" DROP CONSTRAINT "Shipping_addressId_fkey";

-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "shippingId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Shipping" DROP COLUMN "addressId",
ADD COLUMN     "orderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shipping_orderId_key" ON "Shipping"("orderId");

-- AddForeignKey
ALTER TABLE "Shipping" ADD CONSTRAINT "Shipping_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;
