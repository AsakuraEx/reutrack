'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('proyecto', 'eliminado', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      comment: 'Indica que el proyecto ha sido eliminado'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('reproyecto', 'eliminado');
    
  }
};
