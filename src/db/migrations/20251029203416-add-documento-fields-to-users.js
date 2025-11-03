'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'documento', {
      type: Sequelize.STRING(20),
      allowNull: false,
    });
  
    await queryInterface.addColumn('users', 'telefono', {
      type: Sequelize.STRING(10),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'documento');
    await queryInterface.removeColumn('users', 'telefono');
    
  }
};
