// GraphQL: resolvers設定
const models = require('../models/index');
const Messages = models.messages;
const messageController = require('../controller/message');
const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

const MESSAGE_ADDED = 'MESSAGE_ADDED';

const messageResolver = {
  Query: {
    messages: () => {
      // ORMで取得したデータをDBとして利用する
      return Messages.findAll().then(messages => {
        console.log(JSON.stringify(messages, null, 4));
        return messages;
      });
    }
  },
  Mutation: {
    addMessage(root, args, context) {
      pubsub.publish(MESSAGE_ADDED, { messageAdded: args });
      return messageController.addMessage(args);
    }
  },
  Subscription: {
    messageAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([MESSAGE_ADDED])
    }
  }
};

module.exports = messageResolver;
