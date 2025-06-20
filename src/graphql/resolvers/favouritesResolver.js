const prisma = require("../../../src/config/database");

const favouritesResolver = {
    Query: {
        async getFavourites(_, { input }, { req }) {
            try {
                const { userId } = input;

                if (!userId) {
                    return "No Favourites Found!";
                }

                const favourite = await prisma.favourites.findMany({
                    where: {
                        userId,
                    }
                });

                return favourite.map(fav => ({
                    ...fav,
                    createdAt: fav.createdAt.toISOString()
                }));
            } catch (error) {
                throw new Error(error.message);
            }
        },
    },

    Mutation: {
        async addFavourite(_, { input }) {
            try {
                const { userId, recipeId, title, image, cookTime, servings } = input;

                if (!userId || !recipeId || !title) {
                    return "Missing required fields";
                }

                // ✅ Check if favourite already exists
                const existing = await prisma.favourites.findFirst({
                    where: { recipeId }
                });

                if (existing) {
                    throw new Error("Favourite already exists");
                }

                // ✅ Create new favourite
                const newFavourite = await prisma.favourites.create({
                    data: {
                        userId,
                        recipeId,
                        title,
                        image,
                        cookTime,
                        servings
                    }
                });

                return {
                    ...newFavourite,
                    createdAt: newFavourite.createdAt.toISOString()
                };
            } catch (error) {
                throw new Error(error.message);
            }
        },

        async deleteFavourite(_, { input }) {
            try {
                const { userId, recipeId } = input;

                const deleted = await prisma.favourites.deleteMany({
                    where: {
                        userId,
                        recipeId
                    }
                });

                if (deleted.count === 0) {
                    throw new Error("Favourite not found");
                }

                return "Favourite removed successfully";
            } catch (error) {
                throw new Error(error.message);
            }
        },

    },
};

module.exports = favouritesResolver;
