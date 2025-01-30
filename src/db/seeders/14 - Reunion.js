'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reunion', [
      { id: 1, nombre: 'Reunion 1', lugar: 'Lugar 1', codigo: 'CODE1', id_usuario: 1, id_estado: 1, id_version: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, nombre: 'Reunion 2', lugar: 'Lugar 2', codigo: 'CODE2', id_usuario: 1, id_estado: 1, id_version: 1, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reunion', null, {});
  }
};
