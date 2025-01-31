'use strict';

const db = require("../config/database"); 

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class personal_access_token extends Model {
    static associate(models) {
      personal_access_token.belongsTo(models.users, {
        foreignKey: 'id_usuario',
        as: 'usuario'
      });
    }
  }
  personal_access_token.init({
    id_usuario: DataTypes.INTEGER,
    token: DataTypes.STRING,
    last_used_at: DataTypes.DATE,
    expires_at: DataTypes.DATE,
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'personal_access_token',
  });
  return personal_access_token;
};
