const { ApolloServer } = require('apollo-server');
const models = require('./models/index');
const resolvers = require('./resolvers/index');
const synchronization = require('./synchronization/index');
const typeDefs = require('./schema/message');

// sequelize: DB同期
models.sequelize.sync({ force: true }).then(() => {
  synchronization.init();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    } else {
      // check from req
      const token = req.headers.authorization || '';
      return { token };
    }
  }
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
