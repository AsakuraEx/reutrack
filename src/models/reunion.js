'use strict';
const {
  Model
} = require('sequelize');


const db = require("../config/database"); 

module.exports = (sequelize, DataTypes) => {
  class reunion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reunion.belongsTo(models.ctl_estado,{
        foreignKey: 'id_estado',
        as: 'estado'
      })
      reunion.belongsTo(models.users,{
        foreignKey: 'id_user',
        as: 'user'
      })
      reunion.belongsTo(models.proyecto,{
        foreignKey: 'id_proyecto',
        as: 'proyecto'
      })
      reunion.hasMany(models.puntoreunion,{
        foreignKey: 'id_reunion',
        as: 'puntos de reunion'
      })
      reunion.hasMany(models.encargado,{
        foreignKey: 'id_reunion',
        as: 'encargados de reunion'
      })
      reunion.hasMany(models.listaasistencia,{
        foreignKey: 'id_reunion',
        as: 'asistencia de reunion'
      })
      reunion.hasMany(models.minutareunion,{
        foreignKey: 'id_reunion',
        as: 'minuta de reunion'
      })
      reunion.hasMany(models.acuerdocompromiso,{
        foreignKey: 'id_reunion',
        as: 'acuerdos de reunion'
      })
    }
  }
  reunion.init({
    nombre: DataTypes.STRING,
    lugar: DataTypes.STRING,
    codigo: DataTypes.STRING,
    id_usuario: DataTypes.INTEGER,
    id_proyecto: DataTypes.INTEGER,
    id_estado: DataTypes.INTEGER
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'reunion',
  });
  return reunion;
};
