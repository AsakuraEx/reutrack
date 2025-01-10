'use strict';
const db = require("../config/database"); 
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class acuerdocompromiso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      acuerdocompromiso.belongsTo(models.reunion, {
        foreignKey: 'id_reunion',
        as: 'reunion'
      })
    }
  }
  acuerdocompromiso.init({
    nombre: DataTypes.STRING(256),
    id_reunion: DataTypes.INTEGER
  }, {
    sequelize: db,
    modelName: 'acuerdocompromiso',
    freezeTableName: true,
  });
  return acuerdocompromiso;
};