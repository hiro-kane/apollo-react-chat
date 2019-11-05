const { ApolloServer, gql } = require('apollo-server');
const models = require('./models/index');
const Books = models.books;
const bookController = require('./controller/message.controller');
const synchronization = require('./synchronization/index');
const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

// sequelize: DB同期
models.sequelize.sync({ force: true }).then(() => {
  synchronization.init();
});

// GraphQL: schema設定
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }

  type Subscription {
    bookAdded: Book
  }
`;

const POST_ADDED = 'POST_ADDED';

// GraphQL: resolvers設定
const resolvers = {
  Query: {
    books: () => {
      // ORMで取得したデータをDBとして利用する
      return Books.findAll().then(books => {
        console.log(JSON.stringify(books, null, 4));
        return books;
      });
    }
  },
  Mutation: {
    addBook(root, args, context) {
      pubsub.publish(POST_ADDED, { bookAdded: args });
      return bookController.addBook(args);
    }
  },
  Subscription: {
    bookAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([POST_ADDED])
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
  // subscriptions: {
  //   onConnect: (connectionParams, webSocket) => {
  //     // if (connectionParams.authToken) {
  //     //     return validateToken(connectionParams.authToken)
  //     //         .then(findUser(connectionParams.authToken))
  //     //         .then(user => {
  //     //             return {
  //     //                 currentUser: user,
  //     //             };
  //     //         });
  //     // }
  //     // throw new Error('Missing auth token!');
  //   }
  // }
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
