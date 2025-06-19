/*
  Warnings:

  - You are about to drop the column `Image` on the `favourites` table. All the data in the column will be lost.
  - Added the required column `image` to the `favourites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "favourites" DROP COLUMN "Image",
ADD COLUMN     "image" TEXT NOT NULL;
