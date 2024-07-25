-- CreateTable
CREATE TABLE "PendingOrders" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "PendingOrders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CartToPendingOrders" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CartToPendingOrders_AB_unique" ON "_CartToPendingOrders"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToPendingOrders_B_index" ON "_CartToPendingOrders"("B");

-- AddForeignKey
ALTER TABLE "_CartToPendingOrders" ADD CONSTRAINT "_CartToPendingOrders_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToPendingOrders" ADD CONSTRAINT "_CartToPendingOrders_B_fkey" FOREIGN KEY ("B") REFERENCES "PendingOrders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
