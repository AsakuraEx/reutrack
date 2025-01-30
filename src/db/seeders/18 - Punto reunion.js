'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('puntoreunion', 
      [
        { nombre: 'Un punto acordadooooo  ',id_reunion: 1},
        { nombre: 'Otro punto acordado',id_reunion: 1},
        { nombre: 'Punto de prueba 3',id_reunion: 2},
      ], 
      {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('puntoreunion', null, {});
  }
};
