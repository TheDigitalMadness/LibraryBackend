-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "borrowerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
