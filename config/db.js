const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/lash_db', {
  dialect: 'postgres',
});

module.exports = sequelize;
