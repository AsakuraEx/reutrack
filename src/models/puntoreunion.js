'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class puntoreunion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  puntoreunion.init({
    nombre: DataTypes.STRING,
    id_reunion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'puntoreunion',
  });
  return puntoreunion;
};