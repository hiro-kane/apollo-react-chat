const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// DB設定読み込み
const sequelize = require('../conf/db');

const db = {
  sequelize,
  Sequelize
};

// model設定
fs
  .readdirSync(__dirname)
  .filter(file => path.extname(file) === '.js' && file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;
