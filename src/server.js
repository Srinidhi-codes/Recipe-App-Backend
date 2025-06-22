const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('../src/graphql');
const job = require('./helpers/cron');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

if (process.env.ENV === 'production') job.start()

const startServer = async () => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await apolloServer.start();

    app.use(cors({
        origin: "*",
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-apollo-operation-name'],
        credentials: true,
    }));

    app.use(express.json());

    app.get("/api/health", (req, res) => {
        res.status(200).json({ success: true });
    });

    app.use('/graphql', expressMiddleware(apolloServer, {
        context: async ({ req, res }) => ({ req, res }),
    }));

    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}`);
        console.log(`📬 GraphQL endpoint ready at http://localhost:${PORT}/graphql`);
    });
};

startServer();
