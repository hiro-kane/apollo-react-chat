// sequelize: controller
const models = require('../models/index');
const Books = models.books;

const bookController = {
  books: () => Books.find({}),
  addBook: book => {
    const newBook = new Books({ title: book.title, author: book.author });
    return newBook.save();
  }
};

module.exports = bookController;
