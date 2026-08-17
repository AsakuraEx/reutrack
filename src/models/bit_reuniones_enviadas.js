'use strict';
const {
  Model
} = require('sequelize');


const db = require("../config/database"); 

module.exports = (sequelize, DataTypes) => {
  class bit_reuniones_enviadas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  bit_reuniones_enviadas.init({
      id_reunion: DataTypes.INTEGER,
      enviado_por: DataTypes.STRING(500),
      instancia_origen: DataTypes.STRING(500),
      instancia_destino: DataTypes.STRING(500)
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'bit_reuniones_enviadas',
  });
  return bit_reuniones_enviadas;
};
