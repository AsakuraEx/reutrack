'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ctl_rol', 
      [
      {nombre: 'admin', Descripcion: 'Administrador del sistema', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'estandar', Descripcion: 'Usuario estandar del sistema sin privilegios de administrador', createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ctl_rol', null, {});
  }
};