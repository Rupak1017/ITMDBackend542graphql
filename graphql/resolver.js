const resolvers = {
    Query: {
      users: async (_, __, { prisma }) => {
        return prisma.user.findMany();
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
  
  module.exports = resolvers;
  