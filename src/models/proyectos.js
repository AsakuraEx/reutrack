'use strict';
const {
  Model
} = require('sequelize');

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
        foreignKey: 'id_usuario',
        as: 'usuario'
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
    freezeTableName: true,
    modelName: 'proyecto',
  });
  return proyecto;
};