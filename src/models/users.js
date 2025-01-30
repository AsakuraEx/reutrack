'use strict';
const {
  Model
} = require('sequelize');

const db = require("../config/database"); 


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
      users.hasMany(models.personal_access_token,{
        foreignKey: 'id_usuario',
        as: 'usuario token'
      })
      users.belongsTo(models.ctl_estado,{
        foreignKey: 'id_estado',
        as: 'estado usuario'
      })
      users.belongsTo(models.ctl_rol,{
        foreignKey: 'id_rol',
        as: 'rol usuario'
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  remember_token: {
    type: DataTypes.STRING,
    allowNull: true,
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
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ctl_rol', 
      key: 'id',        
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
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
    freezeTableName: true,
    modelName: 'users',
  });
  return users;
};