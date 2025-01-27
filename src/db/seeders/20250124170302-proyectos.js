'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('listaasistencia', 
      [
        { nombre: 'Costos',
          id_usuario: 1,
          id_estado: 2
        },
        { nombre: 'CONADEM',
          id_usuario: 2,
          id_estado: 1
        },
        { nombre: 'SIS',
          id_usuario: 1,
          id_estado: 1
        },
      ], 
      {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('listaasistencia', null, {});
  }
};
