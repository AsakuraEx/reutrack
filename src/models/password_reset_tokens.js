'use strict';
const {
  Model
} = require('sequelize');

const db = require("../config/database"); 

module.exports = (sequelize, DataTypes) => {
  class password_reset_token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  password_reset_token.init({
    email: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'password_reset_token',
  });
  return password_reset_token;
};