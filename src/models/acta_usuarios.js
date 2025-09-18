'use strict';

const {  Model } = require('sequelize');

const db = require("../config/database"); 

module.exports = (sequelize, DataTypes) => {
  class acta_usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      acta_usuarios.belongsTo(models.acta_aceptacion, {
        foreignKey: 'id_acta',
        as: 'acta'
      })
    }
  }

  acta_usuarios.init({
    id_acta: DataTypes.INTEGER,
    nombre: DataTypes.STRING(200),
    institucion: DataTypes.STRING(200),
    cargo: DataTypes.STRING(200),
    documento: DataTypes.STRING(20),
    documento_identidad: DataTypes.TEXT,
    documento_institucional: DataTypes.TEXT
  }, {
    sequelize: db,
    modelName: 'acta_usuarios',
    freezeTableName: true,
  });
  return acta_usuarios;
};