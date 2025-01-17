'use strict';
const {
  Model
} = require('sequelize');

const db = require("../config/database"); 
const proyectos = require('./proyectos');


module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.encargado,{
        foreignKey: 'id_usuario',
        as: 'usuario encargado'
      })
      users.hasMany(models.proyecto,{
        foreignKey: 'id_usuario',
        as: 'usuario de proyecto'
      })
      users.hasMany(models.reunion,{
        foreignKey: 'id_usuario',
        as: 'usuario de reunion'
      })
    }
  }
  users.init({
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email_verified_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  perfil: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ctl_estado',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  rol: {
    type: DataTypes.ENUM('admin', 'estandar'),
    allowNull: false,
  },
  remember_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  }, {
    sequelize: db,
    reezeTableName: true,
    modelName: 'users',
  });
  return users;
};