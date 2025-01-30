'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ctl_estado', 
      [{name: 'Iniciado'},
        {name: 'Cancelado'},
        {name: 'Finalizado'},
        {name: 'Activo'},
        {name: 'Inactivo'}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ctl_estado', null, {});
  }
};
