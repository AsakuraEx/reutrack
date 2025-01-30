'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('minutareunion', 
      [
        { minuta: 'Prueba de una minuta de la reunion porque juela cuanto texto',
          id_reunion: 1
        },
        { minuta: 'Prueba de una minuta 2 de la reunion porque juela cuanto texto',
          id_reunion: 2
        },
      ], 
      {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('minutareunion', null, {});
  }
};
