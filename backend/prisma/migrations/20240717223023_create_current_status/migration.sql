/*
  Warnings:

  - You are about to drop the `_OrdersToorderStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrdersToorderStatus" DROP CONSTRAINT "_OrdersToorderStatus_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrdersToorderStatus" DROP CONSTRAINT "_OrdersToorderStatus_B_fkey";

-- DropTable
DROP TABLE "_OrdersToorderStatus";

-- CreateTable
CREATE TABLE "currentStatus" (
    "id" SERIAL NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "orderStatusId" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "currentStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "currentStatus_orderId_key" ON "currentStatus"("orderId");

-- AddForeignKey
ALTER TABLE "currentStatus" ADD CONSTRAINT "currentStatus_orderStatusId_fkey" FOREIGN KEY ("orderStatusId") REFERENCES "orderStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "currentStatus" ADD CONSTRAINT "currentStatus_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;
