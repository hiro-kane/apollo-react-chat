// GraphQL: schema設定
const { gql } = require('apollo-server');
const typeDefs = gql`
  type Message {
    id: ID
    name: String
    text: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    messages: [Message]
    recentMessages: [Message]
  }

  type Mutation {
    addMessage(name: String, text: String): Message
  }

  type Subscription {
    messageAdded: Message
  }
`;

module.exports = typeDefs;
