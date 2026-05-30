/*
  Warnings:

  - You are about to drop the column `file_type` on the `product_documents` table. All the data in the column will be lost.
  - You are about to drop the column `file_url` on the `product_documents` table. All the data in the column will be lost.
  - Added the required column `document_type` to the `product_documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medicines" ADD COLUMN     "shelf_life_months" INTEGER;

-- AlterTable
ALTER TABLE "product_documents" DROP COLUMN "file_type",
DROP COLUMN "file_url",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "document_type" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;
