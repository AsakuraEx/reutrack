
'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        name: 'Walter Alcides Romero',
        email: 'walter.romero@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 1,
      },
      {
        name: 'Francisco Escobar',
        email: 'francisco.escobar@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 1,
      },
      {
        name: 'Arleny García',
        email: 'arleny.garcia@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 1,
      }
    ];

    await queryInterface.bulkInsert('users', users.map(user => ({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};