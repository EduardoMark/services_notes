-- CreateEnum
CREATE TYPE "Guarantee" AS ENUM ('three_months', 'six_months', 'twelve_months');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('to_receive', 'paid');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "technicalName" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "dateOfService" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guarantee" "Guarantee" NOT NULL,
    "price" DECIMAL(10,2),
    "nameOfClient" VARCHAR(255) NOT NULL,
    "clientPhone" VARCHAR(20),
    "clientAddress" VARCHAR(100),
    "status" "Status",
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
