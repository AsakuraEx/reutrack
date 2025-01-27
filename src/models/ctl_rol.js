'use strict';

const db = require("../config/database"); 

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ctl_rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ctl_rol.hasMany(models.users,{
        foreignKey: 'id_rol',
        as: 'rol usuario'
      })
    }
  }
  ctl_rol.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'ctl_rol',
  });
  return ctl_rol;
};