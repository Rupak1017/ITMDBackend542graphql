const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type Mutation {
    createUser(name: String!, email: String!): User!
  }
  type User {
    id: Int!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: Int!
    title: String!
    content: String!
    author: User!
  }
`;
const resolvers = {
    Query: {
      users: async (_, __, { prisma }) => {
        return prisma.user.findMany();
      },
    },
    Mutation: {
        createUser: async (_, { name, email }, { prisma }) => {
          return prisma.user.create({
            data: {
              name,
              email,
            },
          });
        },
      },
    User: {
      posts: async (parent, _, { prisma }) => {
        return prisma.user.findUnique({ where: { id: parent.id } }).posts();
      },
    },
    Post: {
      author: async (parent, _, { prisma }) => {
        return prisma.post.findUnique({ where: { id: parent.id } }).author();
      },
    },
  };
  

module.exports = { typeDefs, resolvers };
