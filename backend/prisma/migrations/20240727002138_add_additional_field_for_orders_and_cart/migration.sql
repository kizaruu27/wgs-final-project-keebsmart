-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "buyerName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "phoneNumber" INTEGER NOT NULL DEFAULT 0;
