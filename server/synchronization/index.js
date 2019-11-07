// sequelize: DB同期
const models = require('../models/index');
const Messages = models.messages;

module.exports.init = function() {
  Messages.bulkCreate([
    {
      name: 'start',
      text: 'hello!'
    }
  ]);
};
