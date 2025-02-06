'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ctl_rol', 
      [
      {nombre: 'admin', Descripcion: 'El mero mero macizo admin loco', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'estandar', Descripcion: 'Para uno humilde de req ni modo', createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ctl_rol', null, {});
  }
};