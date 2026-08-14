'use strict';
const {
  Model
} = require('sequelize');


const db = require("../config/database"); 

module.exports = (sequelize, DataTypes) => {
  class reuniones_recibidas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reuniones_recibidas.hasOne(models.reunion,{
        foreignKey: 'id_reunion_recibida',
        as: 'reunion_compartida'
      })
      reuniones_recibidas.belongsTo(models.users,{
        foreignKey: 'aceptado_por',
        as: 'user'
      })
    }
  }
  reuniones_recibidas.init({
    reunion: DataTypes.JSON,
    enviado_por: DataTypes.STRING(500),
    instancia_origen: DataTypes.STRING(500),
    eliminada: DataTypes.BOOLEAN,
    aceptado_por: DataTypes.INTEGER
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'reuniones_recibidas',
  });
  return reuniones_recibidas;
};
