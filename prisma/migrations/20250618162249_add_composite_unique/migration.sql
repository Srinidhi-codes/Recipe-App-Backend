/*
  Warnings:

  - A unique constraint covering the columns `[userId,recipeId]` on the table `favourites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favourites_userId_recipeId_key" ON "favourites"("userId", "recipeId");
