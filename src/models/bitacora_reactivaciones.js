'use strict';

const db = require("../config/database"); 

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class bitacora_reactivaciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      bitacora_reactivaciones.hasMany(models.users,{
        foreignKey: 'id',
      }),
      bitacora_reactivaciones.hasMany(models.reunion,{
        foreignKey: 'id',
      })
    }
  }
  bitacora_reactivaciones.init({
    id_reunion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'reunion',
        key: 'id'
      },
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    justificacion: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'bitacora_reactivaciones',
    timestamps: true,
  });
  return bitacora_reactivaciones;
};