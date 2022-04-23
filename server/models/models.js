const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const { model } = require('../db');

const User = sequelize.define('User', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"},
  image: {type: DataTypes.STRING, allowNull: true}
});

module.exports = {
  User
};