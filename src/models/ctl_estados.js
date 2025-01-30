'use strict';
const {Model} = require('sequelize');

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
        as: 'estado reunion'
      })
      /* ctl_estados.hasMany(models.proyecto,{
        foreignKey: 'id_estado',
        as: 'estado proyecto'
      }) */
      ctl_estados.hasMany(models.users,{
        foreignKey: 'id_estado',
        as: 'estado usuario'
      })
      ctl_estados.hasMany(models.version, {
        foreignKey: 'id_estado',
        as: 'estado version'
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