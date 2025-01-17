'use strict';
const {
  Model
} = require('sequelize');

const reunion = require('./reunion')
const db = require("../config/database"); 

module.exports = (sequelize, DataTypes) => {
  class minutareunion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      minutareunion.belongsTo(models.reunion, {
        foreignKey: 'id_reunion',
        as: 'reunion'
      })
    }
  }
  minutareunion.init({
    minuta: DataTypes.STRING,
    id_reunion: DataTypes.INTEGER
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'minutareunion',
  });
  return minutareunion;
};