// sequelize: model

module.exports = (sequelize, Sequelize) => {
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
  return Books;
};

// const message = sequelize.define(
//   'message',
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       allowNull: false
//     },
//     name: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     message: {
//       type: Sequelize.STRING,
//       allowNull: false
//     }
//   },
//   {
//     // options
//   }
// );
