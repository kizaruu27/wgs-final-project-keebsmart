/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `TotalIncome` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TotalIncome" ADD COLUMN     "month" TEXT,
ADD COLUMN     "orderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TotalIncome_orderId_key" ON "TotalIncome"("orderId");

-- AddForeignKey
ALTER TABLE "TotalIncome" ADD CONSTRAINT "TotalIncome_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("orderId") ON DELETE SET NULL ON UPDATE CASCADE;
