'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('version', 'id_estado_req', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'ctl_estado',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down (queryInterface, Sequelize) {
       await queryInterface.removeColumn('version', 'id_estado_req');
  }
};
