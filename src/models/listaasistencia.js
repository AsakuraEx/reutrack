'use strict';
const {
  Model
} = require('sequelize');

const reunion = require('./reunion')
const db = require("../config/database"); 

module.exports = (sequelize, DataTypes) => {
  class listaasistencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      listaasistencia.belongsTo(models.reunion, {
        foreignKey: 'id_reunion',
        as: 'reunion'
      })
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
    sequelize: db,
    reezeTableName: true,
    modelName: 'listaasistencia',
  });
  return listaasistencia;
};