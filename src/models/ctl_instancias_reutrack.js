'use strict';

const {  Model } = require('sequelize');

const db = require("../config/database"); 

module.exports = (sequelize, DataTypes) => {
  class ctl_instancias_reutrack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // instancias_reutrack.belongsTo(models.version, {
      //   foreignKey: 'id_version',
      //   as: 'version'
      // }),

      // instancias_reutrack.belongsTo(models.users, {
      //   foreignKey: 'id_usuario',
      //   as: 'usuario'
      // })

      // instancias_reutrack.belongsTo(models.ctl_estado, {
      //   foreignKey: 'id_estado',
      //   as: 'estado'
      // })

      // instancias_reutrack.hasMany(models.acta_funcionalidades, {
      //   foreignKey: 'id_acta',
      //   as: 'funcionalidades'
      // })

      // instancias_reutrack.hasMany(models.acta_usuarios, {
      //   foreignKey: 'id_acta',
      //   as: 'usuarios'
      // })
    }
  }

  ctl_instancias_reutrack.init({
    frontend_url: DataTypes.STRING(200),
    backend_url: DataTypes.INTEGER
  }, {
    sequelize: db,
    modelName: 'ctl_instancias_reutrack',
    freezeTableName: true,
    timestamps: false
  });
  return ctl_instancias_reutrack;
};