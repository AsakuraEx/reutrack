'use strict';
const {
  Model
} = require('sequelize');

const reunion = require('./reunion')
const db = require("../config/database"); 

module.exports = (sequelize, DataTypes) => {
  class puntoreunion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      puntoreunion.belongsTo(models.reunion, {
        foreignKey: 'id_reunion',
        as: 'reunion'
      })
    }
  }
  puntoreunion.init({
    nombre: DataTypes.STRING,
    id_reunion: DataTypes.INTEGER
  }, {
    sequelize: db,
    reezeTableName: true,
    modelName: 'puntoreunion',
  });
  return puntoreunion;
};