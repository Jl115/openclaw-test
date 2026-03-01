const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging
  }
);

const User = require('./User')(sequelize, DataTypes);
const Biography = require('./Biography')(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize,
  User,
  Biography
};

module.exports = db;
