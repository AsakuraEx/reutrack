'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ctl_estado', 
      [{nombre: 'Iniciado'},
        {nombre: 'Cancelado'},
        {nombre: 'Finalizado'},
        {nombre: 'Activo'},
        {nombre: 'Inactivo'}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ctl_estado', null, {});
  }
};
