-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "specs" TEXT[],
    "description" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" SERIAL NOT NULL,
    "variationOptionId" INTEGER NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_variationOptionId_fkey" FOREIGN KEY ("variationOptionId") REFERENCES "VariationOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
