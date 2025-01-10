'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reunion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reunion.init({
    nombre: DataTypes.STRING,
    lugar: DataTypes.STRING,
    codigo: DataTypes.STRING,
    id_usuario: DataTypes.INTEGER,
    id_proyecto: DataTypes.INTEGER,
    id_estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'reunion',
  });
  return reunion;
};