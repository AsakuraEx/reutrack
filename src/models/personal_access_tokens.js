'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class personal_access_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  personal_access_tokens.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'personal_access_tokens',
  });
  return personal_access_tokens;
};