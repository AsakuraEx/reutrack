'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ctl_estado', 
      [ {nombre: 'Iniciado', createdAt: new Date(), updatedAt: new Date()},
        {nombre: 'Cancelado', createdAt: new Date(), updatedAt: new Date()},
        {nombre: 'Finalizado', createdAt: new Date(), updatedAt: new Date()},
        {nombre: 'Activo', createdAt: new Date(), updatedAt: new Date()},
        {nombre: 'Inactivo', createdAt: new Date(), updatedAt: new Date()},
        {nombre: 'Pendiente', createdAt: new Date(), updatedAt: new Date()},
        {nombre: 'Aprobado', createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ctl_estado', null, {});
  }
};
