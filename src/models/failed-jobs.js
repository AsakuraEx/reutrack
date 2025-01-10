'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class failed - jobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  failed - jobs.init({
    uuid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'failed-jobs',
  });
  return failed - jobs;
};