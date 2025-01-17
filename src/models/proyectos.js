'use strict';
const {
  Model
} = require('sequelize');

const reunion = require('./reunion')
const users = require('./users')
const estado = require('./ctl_estados')
const db = require("../config/database"); 

module.exports = (sequelize, DataTypes) => {
  class proyecto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      proyecto.belongsTo(models.ctl_estado,{
        foreignKey: 'id_estado',
        as: 'estado'
      })
      proyecto.belongsTo(models.users,{
        foreignKey: 'id_user',
        as: 'user'
      })
      proyecto.hasMany(models.reunion,{
        foreignKey: 'id_proyecto',
        as: 'reunion'
      })
    }
  }
  proyecto.init({
    nombre: DataTypes.STRING,
    version: DataTypes.STRING,
    id_usuario: DataTypes.INTEGER,
    id_estado: DataTypes.INTEGER
  }, {
    sequelize: db,
    reezeTableName: true,
    modelName: 'proyecto',
  });
  return proyecto;
};