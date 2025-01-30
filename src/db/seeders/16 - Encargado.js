'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('encargado', 
      [
        { id_usuario: 1,id_reunion: 1},
        { id_usuario: 2,id_reunion: 1},
        { id_usuario: 3,id_reunion: 2},
      ], 
      {});
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('encargado', null, {});s
  }
};
