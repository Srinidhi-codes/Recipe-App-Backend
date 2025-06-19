const prisma = require('../../config/database');
const getAuthenticatedUser = require('../../helpers/authHelper');

const userResolver = {
    Query: {
        async getUserInfo(_, { input }, { req }) {
            try {
                const { id } = getAuthenticatedUser(req);

                const user = await prisma.user.findUnique({
                    where: { id },
                });

                return { ...user };
            } catch (error) {
                // console.error(error);
                throw new Error(error.message);
            }
        }
    },

    Mutation: {
        async updateUserInfo(_, { input }, { req }) {
            try {
                const { id } = getAuthenticatedUser(req);
                const { firstName, lastName, color, image, theme } = input;

                if (!firstName || !lastName) {
                    throw new Error('Firstname & Lastname fields are required.');
                }
                // console.log("Updating user with id:", id);

                const updatedUser = await prisma.user.update({
                    where: { id },
                    data: {
                        firstName,
                        lastName,
                        image,
                        color,
                        profileSetup: true,
                        theme
                    },
                });

                return { ...updatedUser };
            } catch (error) {
                // console.error(error);
                throw new Error(error.message);
            }
        },
    },
};


module.exports = userResolver;
