'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ctl_estados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ctl_estados.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ctl_estados',
  });
  return ctl_estados;
};