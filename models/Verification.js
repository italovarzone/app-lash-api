const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Verification = sequelize.define('Verification', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Verification;
