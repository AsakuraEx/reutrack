'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class minutareunion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  minutareunion.init({
    minuta: DataTypes.STRING,
    id_reunion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'minutareunion',
  });
  return minutareunion;
};