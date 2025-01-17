'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class failedjob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  failedjob.init({
    uuid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'failedjob',
  });
  return failedjob;
};