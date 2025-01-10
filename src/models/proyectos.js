'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class proyectos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  proyectos.init({
    nombre: DataTypes.STRING,
    version: DataTypes.STRING,
    id_usuario: DataTypes.INTEGER,
    id_estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'proyectos',
  });
  return proyectos;
};