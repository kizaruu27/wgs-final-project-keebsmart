-- CreateTable
CREATE TABLE "_CartToOrders" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CartToOrders_AB_unique" ON "_CartToOrders"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToOrders_B_index" ON "_CartToOrders"("B");

-- AddForeignKey
ALTER TABLE "_CartToOrders" ADD CONSTRAINT "_CartToOrders_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToOrders" ADD CONSTRAINT "_CartToOrders_B_fkey" FOREIGN KEY ("B") REFERENCES "Orders"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;
