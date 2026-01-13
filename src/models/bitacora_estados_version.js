'use strict';

const db = require("../config/database"); 

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class bitacora_estados_version extends Model {
    
    static associate(models) {
      bitacora_estados_version.belongsTo(models.proyecto,{
        foreignKey: 'id_proyecto',
        as: 'proyecto'
      }),
      bitacora_estados_version.belongsTo(models.version,{
        foreignKey: 'id_version',
        as: 'version'
      }),
      bitacora_estados_version.belongsTo(models.ctl_estado,{
        foreignKey: 'id_estado',
        as: 'estado'
      }),
      bitacora_estados_version.belongsTo(models.users,{
        foreignKey: 'id_usuario',
        as: 'usuario'
      })
      
    }
  }
  bitacora_estados_version.init({
    id_proyecto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'proyecto',
            key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
    },
    id_version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'version',
            key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
    },
    id_estado_nuevo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ctl_estado',
            key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
    },
    id_estado_anterior: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ctl_estado',
            key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
    },
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'bitacora_estados_version',
    timestamps: true,
  });
  return bitacora_estados_version;
};