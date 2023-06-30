-- CreateTable
CREATE TABLE "TransactionsType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "typeTitle" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transactions" (
    "transactionUid" TEXT NOT NULL PRIMARY KEY,
    "transactionTypeId" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "inboundAccountId" INTEGER,
    "outboundAccountId" INTEGER,
    "issuedDate" DATETIME NOT NULL,
    "amount" INTEGER NOT NULL,
    "comment" TEXT,
    CONSTRAINT "Transactions_transactionTypeId_fkey" FOREIGN KEY ("transactionTypeId") REFERENCES "TransactionsType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transactions_inboundAccountId_fkey" FOREIGN KEY ("inboundAccountId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transactions_outboundAccountId_fkey" FOREIGN KEY ("outboundAccountId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transactions" ("amount", "approved", "comment", "inboundAccountId", "issuedDate", "outboundAccountId", "transactionTypeId", "transactionUid") SELECT "amount", "approved", "comment", "inboundAccountId", "issuedDate", "outboundAccountId", "transactionTypeId", "transactionUid" FROM "Transactions";
DROP TABLE "Transactions";
ALTER TABLE "new_Transactions" RENAME TO "Transactions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
