'use strict';
const {Model} = require('sequelize');

const reunion = require('./reunion')
const proyectos = require('./proyectos')
const users = require('./users')
const db = require("../config/database"); 

module.exports = (sequelize, DataTypes) => {
  class ctl_estados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ctl_estados.hasMany(models.reunion,{
        foreignKey: 'id_estado',
        as: 'estado de reunion'
      })
      ctl_estados.hasMany(models.proyecto,{
        foreignKey: 'id_estado',
        as: 'estado de proyecto'
      })
      ctl_estados.hasMany(models.users,{
        foreignKey: 'id_estado',
        as: 'estado de usuario'
      })
    }
  }
  ctl_estados.init({
    name: DataTypes.STRING
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'ctl_estado',
    
  });
  return ctl_estados;
};