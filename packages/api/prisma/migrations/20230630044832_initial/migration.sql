-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "additionalInfo" TEXT,
    "createdAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Transactions" (
    "transactionUid" TEXT NOT NULL PRIMARY KEY,
    "transactionTypeId" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "inboundAccountId" INTEGER,
    "outboundAccountId" INTEGER,
    "issuedDate" DATETIME NOT NULL,
    "amount" INTEGER NOT NULL,
    "comment" TEXT,
    CONSTRAINT "Transactions_inboundAccountId_fkey" FOREIGN KEY ("inboundAccountId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transactions_outboundAccountId_fkey" FOREIGN KEY ("outboundAccountId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");
