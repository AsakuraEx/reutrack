'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class listaasistencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  listaasistencia.init({
    participante: DataTypes.STRING,
    dui: DataTypes.STRING,
    cargo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    correo: DataTypes.STRING,
    id_reunion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'listaasistencia',
  });
  return listaasistencia;
};