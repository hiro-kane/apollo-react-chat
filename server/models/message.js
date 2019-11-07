// sequelize: model

module.exports = (sequelize, Sequelize) => {
  const Messages = sequelize.define(
    'messages',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      // options
    }
  );
  return Messages;
};
