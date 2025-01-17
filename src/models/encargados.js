'use strict';
const {
  Model
} = require('sequelize');

const reunion = require('./reunion')
const users = require('./users')
const db = require("../config/database"); 


module.exports = (sequelize, DataTypes) => {
  class encargado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      encargado.belongsTo(models.reunion, {
        foreignKey: 'id_reunion',
        as: 'reunion'
      })
      encargado.belongsTo(models.users, {
        foreignKey: 'id_usuario',
        as: 'usuario'
      })
    }
  }
  encargado.init({
    id_usuario: DataTypes.INTEGER,
    id_reunion: DataTypes.INTEGER
  }, {
    sequelize: db,
    reezeTableName: true,
    modelName: 'encargado',
  });
  return encargado;
};