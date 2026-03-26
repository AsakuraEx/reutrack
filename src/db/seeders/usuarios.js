
'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        nombre: 'Administrador REQ',
        email: 'requerimientos@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        first_session: 1,
        id_estado: 4,
        id_rol: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'William Andrés Hoyos Arango',
        email: 'william.hoyos@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        first_session: 1,
        id_estado: 4,
        id_rol: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Andrés Ernesto Kury Rivas',
        email: 'andres.kury@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        first_session: 1,
        id_estado: 4,
        id_rol: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      
      
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