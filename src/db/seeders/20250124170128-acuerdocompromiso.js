'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('acuerdocompromiso', 
      [
        { nombre: 'Acuerdo de prueba  ',id_reunion: 1},
        { nombre: 'Acuerdo de prueba 2',id_reunion: 1},
        { nombre: 'Acuerdo de prueba 3',id_reunion: 2},
      ], 
      {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('acuerdocompromiso', null, {});
  }
};
