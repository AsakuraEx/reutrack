'use strict';
const {
  Model
} = require('sequelize');

const db = require("../config/database"); 

module.exports = (sequelize, DataTypes) => {
  class version extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      version.belongsTo(models.ctl_estado,{
        foreignKey: 'id_estado',
        as: 'estado'
      }),
      version.belongsTo(models.users,{
        foreignKey: 'id_usuario',
        as: 'usuario'
      }),
      version.belongsTo(models.proyecto,{
        foreignKey: 'id_proyecto',
        as: 'proyecto'
      })
      version.hasMany(models.reunion,{
        foreignKey: 'id_version',
        as: 'reunion'
      })
    }
  }
  version.init({
    nombre: DataTypes.STRING,  
    id_proyecto: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER,
    id_estado: DataTypes.INTEGER,
    acta_aceptacion: DataTypes.STRING
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'version',
  });
  return version;
};