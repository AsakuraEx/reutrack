'use strict';
const {Model} = require('sequelize');

const db = require("../config/database"); 

module.exports = (sequelize, DataTypes) => {
  class ctl_cargos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ctl_cargos.hasMany(models.users,{
        foreignKey: 'id_cargo',
        as: 'usuarios'
      })
    }
  }
  ctl_cargos.init({
    nombre: DataTypes.STRING,
    activo: DataTypes.BOOLEAN
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'ctl_cargos',
    
  });
  return ctl_cargos;
};