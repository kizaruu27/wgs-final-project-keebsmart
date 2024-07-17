/*
  Warnings:

  - You are about to drop the column `orderStatus` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `orderStatus` table. All the data in the column will be lost.
  - Added the required column `statusDescription` to the `orderStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "isOrdered" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "orderStatus";

-- AlterTable
ALTER TABLE "orderStatus" DROP COLUMN "updateAt",
ADD COLUMN     "statusDescription" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_OrdersToorderStatus" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrdersToorderStatus_AB_unique" ON "_OrdersToorderStatus"("A", "B");

-- CreateIndex
CREATE INDEX "_OrdersToorderStatus_B_index" ON "_OrdersToorderStatus"("B");

-- AddForeignKey
ALTER TABLE "_OrdersToorderStatus" ADD CONSTRAINT "_OrdersToorderStatus_A_fkey" FOREIGN KEY ("A") REFERENCES "Orders"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrdersToorderStatus" ADD CONSTRAINT "_OrdersToorderStatus_B_fkey" FOREIGN KEY ("B") REFERENCES "orderStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
