-- CreateTable
CREATE TABLE "MoneyKeep" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "userId" TEXT,
    "isReceived" BOOLEAN NOT NULL DEFAULT false,
    "shippingId" TEXT NOT NULL,

    CONSTRAINT "MoneyKeep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MoneyKeep_shippingId_key" ON "MoneyKeep"("shippingId");

-- AddForeignKey
ALTER TABLE "MoneyKeep" ADD CONSTRAINT "MoneyKeep_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "Shipping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyKeep" ADD CONSTRAINT "MoneyKeep_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
