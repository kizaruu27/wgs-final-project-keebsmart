-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_inventoryId_fkey";

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "inventoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
