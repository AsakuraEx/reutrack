'use strict';

const {  Model } = require('sequelize');

const db = require("../config/database"); 

module.exports = (sequelize, DataTypes) => {
  class acta_aceptacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      acta_aceptacion.belongsTo(models.version, {
        foreignKey: 'id_version',
        as: 'version'
      }),

      acta_aceptacion.belongsTo(models.users, {
        foreignKey: 'id_usuario',
        as: 'usuario'
      })

      acta_aceptacion.belongsTo(models.ctl_estado, {
        foreignKey: 'id_estado',
        as: 'estado'
      })

      acta_aceptacion.hasMany(models.acta_funcionalidades, {
        foreignKey: 'id_acta',
        as: 'funcionalidades'
      })

      acta_aceptacion.hasMany(models.acta_usuarios, {
        foreignKey: 'id_acta',
        as: 'usuarios'
      })
    }
  }

  acta_aceptacion.init({
    acuerdos: DataTypes.STRING(500),
    id_version: DataTypes.INTEGER,
    id_estado: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize: db,
    modelName: 'acta_aceptacion',
    freezeTableName: true,
  });
  return acta_aceptacion;
};