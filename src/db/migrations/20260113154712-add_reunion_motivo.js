'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('reunion', 'id_motivo', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
          model: 'ctl_motivos_reunion',
          key: 'id',        
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('reunion', 'id_motivo');
    
  }
};

