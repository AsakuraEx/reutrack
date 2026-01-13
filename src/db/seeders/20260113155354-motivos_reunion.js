'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ctl_motivos_reunion', [
      { id: 1, nombre: 'Definición de requerimientos', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, nombre: 'Revisión de avances', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, nombre: 'Aceptación de prototipo', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, nombre: 'Administrativo', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, nombre: 'Logística', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
