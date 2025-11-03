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

      users.hasOne(models.acta_aceptacion,{
        foreignKey: 'id_usuario',
        as: 'usuario'
      })
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
      }),
      users.hasMany(models.bitacora_reactivaciones, {
        foreignKey: 'id_usuario',
        as: 'reactivaciones'
      }),
      users.hasMany(models.bitacora_proyecto_eliminacion, {
        foreignKey: 'id_usuario',
        as: 'proyectos_eliminados'
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
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  documento: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  remember_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  first_session: {
    type: DataTypes.INTEGER,
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
  two_factor_secret: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  },
  {
    sequelize: db,
    freezeTableName: true,
    modelName: 'users',
  });
  return users;
};