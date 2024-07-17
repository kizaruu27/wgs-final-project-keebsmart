-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "updateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "orderStatus" (
    "id" SERIAL NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "orderStatus_pkey" PRIMARY KEY ("id")
);
