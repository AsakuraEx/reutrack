'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'two_factor_secret', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'two_factor_secret');
    
  }
};
