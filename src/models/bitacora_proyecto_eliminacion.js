'use strict';

const db = require("../config/database"); 

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class bitacora_proyecto_eliminacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      bitacora_proyecto_eliminacion.belongsTo(models.users,{
        foreignKey: 'id_usuario',
        as: 'usuario'
      })
    }
  }
  bitacora_proyecto_eliminacion.init({
    id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    nombre_proyecto: DataTypes.STRING,
    //justificacion: DataTypes.STRING
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'bitacora_proyecto_eliminacion',
    timestamps: true,
  });
  return bitacora_proyecto_eliminacion;
};