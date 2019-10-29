const { ApolloServer, gql } = require('apollo-server');
const Sequelize = require('sequelize');

// 接続設定
const sequelize = new Sequelize('mydb', 'user', 'password', {
  host: 'mysql_node',
  dialect: 'mysql'
});

// sequelize: model設定
const Books = sequelize.define(
  'books',
  {
    // attributes
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    author: {
      type: Sequelize.STRING
      // allowNull defaults to true
    }
  },
  {
    // options
  }
);

// sequelize: DB同期
Books.sync({ force: true }).then(() => {
  return Books.create({
    id: '1',
    title: 'title',
    author: 'author',
    createdAt: '2011/1/1',
    updatedAt: '2011/1/1'
  });
});

// sequelize: DB同期
Books.sync({ force: true }).then(() => {
  return Books.bulkCreate([
    {
      id: '2',
      title: 'title2',
      author: 'author2',
      createdAt: '2011/1/1',
      updatedAt: '2011/1/1'
    },
    {
      id: '3',
      title: 'title3',
      author: 'author3',
      createdAt: '2011/1/1',
      updatedAt: '2011/1/1'
    }
  ]);
});

const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

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

const bookController = {
  books: () => Books.find({}),
  addBook: book => {
    const newBook = new Books({ title: book.title, author: book.author });
    return newBook.save();
  }
};

// GraphQL: resolvers設定
const resolvers = {
  Query: {
    books: () => {
      // ORMで取得したデータをDBとして利用する
      // sequelize: query
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

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

// const server = new ApolloServer({ typeDefs, resolvers });

const validateToken = authToken => {
  // ... validate token and return a Promise, rejects in case of an error
};

const findUser = authToken => {
  return tokenValidationResult => {
    // ... finds user by auth token and return a Promise, rejects in case of an error
  };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      // if (connectionParams.authToken) {
      //     return validateToken(connectionParams.authToken)
      //         .then(findUser(connectionParams.authToken))
      //         .then(user => {
      //             return {
      //                 currentUser: user,
      //             };
      //         });
      // }
      // throw new Error('Missing auth token!');
    }
  }
});

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: async ({ req, connection }) => {
//         if (connection) {
//             // check connection for metadata
//             return connection.context;
//         } else {
//             // check from req
//             const token = req.headers.authorization || "";

//             return { token };
//         }
//     },
// });

// The `listen` method launches a web server.
// server.listen().then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
// });

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
