'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('encargado', 'visitante', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      comment: 'Indica que el encargado es un visitante'
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('encargado', 'visitante');
    
  }
};
