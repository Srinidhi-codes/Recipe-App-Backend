const { readFileSync, readdirSync } = require("fs");
const path = require("path");

// Fix 1: Correct imports (no destructuring)
const authResolver = require('./resolvers/authResolver');
const favouritesResolver = require('./resolvers/favouritesResolver')
const userResolver = require('./resolvers/userResolver')


// Utility to load all .graphql typeDefs
const loadTypeDefs = (dir) => {
    const files = readdirSync(dir).filter(file => file.endsWith('.graphql'));
    return files.map(file => readFileSync(path.join(dir, file), 'utf-8')).join('\n');
};

const typeDefs = loadTypeDefs(path.join(__dirname, './typeDefs'));

// Fix 2: Fallback safely even if resolver parts are missing
const resolvers = {
    Query: {
        ...(authResolver.Query || {}),
        ...(favouritesResolver.Query || {}),
        ...(userResolver.Query || {}),
    },
    Mutation: {
        ...(authResolver.Mutation || {}),
        ...(favouritesResolver.Mutation || {}),
        ...(userResolver.Mutation || {}),
    },
};

module.exports = { typeDefs, resolvers };
