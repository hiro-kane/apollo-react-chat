const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'user', 'password', {
  host: 'mysql_node',
  dialect: 'mysql'
});

module.exports = sequelize;
