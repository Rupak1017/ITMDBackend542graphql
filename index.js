const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { typeDefs, resolvers } = require('./graphql/schema');

const prisma = new PrismaClient();

async function startApolloServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { prisma },
  });

  // Make sure to await server.start() before applying middleware
  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer().catch((err) => {
  console.error('Error starting Apollo Server:', err);
});
