'use strict';

const {  Model } = require('sequelize');

const db = require("../config/database"); 

module.exports = (sequelize, DataTypes) => {
  class acta_funcionalidades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      acta_funcionalidades.belongsTo(models.acta_aceptacion, {
        foreignKey: 'id_acta',
        as: 'acta'
      })
    }
  }

  acta_funcionalidades.init({
    descripcion: DataTypes.STRING(200),
    id_acta: DataTypes.INTEGER,
    aprobado: DataTypes.BOOLEAN,
    cambio_solicitado: DataTypes.STRING(200)
  }, {
    sequelize: db,
    modelName: 'acta_funcionalidades',
    freezeTableName: true,
  });
  return acta_funcionalidades;
};