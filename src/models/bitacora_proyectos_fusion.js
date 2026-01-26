'use strict';

const db = require("../config/database"); 

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class bitacora_proyecto_fusion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      bitacora_proyecto_fusion.belongsTo(models.users,{
        foreignKey: 'id_usuario',
        as: 'proyecto_fusion'
      }),
      bitacora_proyecto_fusion.belongsTo(models.proyecto,{
        foreignKey: 'id_proyecto_a',
        as: 'id_proyecto_vigente'
      }),
      bitacora_proyecto_fusion.belongsTo(models.proyecto,{
        foreignKey: 'id_proyecto_b',
        as: 'id_proyecto_eliminado'
      })
    }
  }
  bitacora_proyecto_fusion.init({
    id_proyecto_a: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
            model: 'proyecto',
            key: 'id'
        },
    },
    id_proyecto_b: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
            model: 'proyecto',
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
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'bitacora_proyecto_fusion',
    timestamps: true,
  });
  return bitacora_proyecto_fusion;
};