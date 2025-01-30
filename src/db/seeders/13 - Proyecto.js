'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('proyecto', 
      [
        { nombre: 'Costos',
          id_usuario: 1,
        },
        { nombre: 'CONADEM',
          id_usuario: 2,
        },
        { nombre: 'SIS',
          id_usuario: 1,
        },
      ], 
      {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('proyecto', null, {});
  }
};
