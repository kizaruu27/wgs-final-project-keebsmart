-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Shipping" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
