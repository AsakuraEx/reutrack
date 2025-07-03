'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('reunion', 'reactivado', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      comment: 'Indica que la reunion ha sido reactivada'
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('reunion', 'reactivado');
    
  }
};
