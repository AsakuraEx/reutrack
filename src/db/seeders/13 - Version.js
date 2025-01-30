'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('version', [
      {
        nombre: 'Costos 1.0',
        descripcion: 'Versión inicial de la aplicación',
        id_proyecto: 1, 
        id_usuario: 1,
        id_estado: 1, 
        acta_aceptacion: 'Acta de aceptación de la versión ',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Costos 1.1',
        descripcion: 'Versión mejorada de la aplicación',
        id_proyecto: 1,
        id_usuario: 1,
        id_estado: 1,
        acta_aceptacion: 'Acta de aceptación de la versión ',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('version', null, {});
  }
};
