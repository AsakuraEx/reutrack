'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users',
      [
        {
          name: 'Walter Alcides Romero',
          email: 'walter.romero@salud.gob.sv',
          password: '123',
          id_estado: 4,
          id_rol: 1,
        },
        {
          name: 'Francisco Escobar',
          email: 'francisco.escobar@salud.gob.sv',
          password: '123',
          id_estado: 4,
          id_rol: 1,
        },
        {
          name: 'Arleny García',
          email: 'arleny.garcia@salud.gob.sv',
          password: '123',
          id_estado: 4,
          id_rol: 1,
        }
      ] ,{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
};
