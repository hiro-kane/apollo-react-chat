// sequelize: DB同期
const models = require('../models/index');
const Books = models.books;

module.exports.init = function() {
  Books.bulkCreate([
    {
      id: '2',
      title: 'aaafeafdeaa',
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
};
