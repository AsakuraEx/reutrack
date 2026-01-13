'use strict';
const {Model} = require('sequelize');

const db = require("../config/database"); 

module.exports = (sequelize, DataTypes) => {
  class ctl_motivos_reunion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ctl_motivos_reunion.hasMany(models.reunion,{
        foreignKey: 'id_motivo',
        as: 'motivo_reunion'
      })
    }
  }
  ctl_motivos_reunion.init({
    nombre: DataTypes.STRING
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'ctl_motivos_reunion',
    
  });
  return ctl_motivos_reunion;
};