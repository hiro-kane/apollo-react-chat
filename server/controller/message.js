// sequelize: controller
const models = require('../models/index');
const Messages = models.messages;

const messageController = {
  messages: () => Messages.find({}),
  addMessage: messages => {
    const newMassage = new Messages({
      name: messages.name,
      text: messages.text
    });
    return newMassage.save();
  }
};

module.exports = messageController;
