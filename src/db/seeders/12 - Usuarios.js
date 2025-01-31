
'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        nombre: 'Walter Alcides Romero Portillo',
        email: 'walter.romero@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 1,
      },
      {
        nombre: 'Francisco Josue Escobar Quintanilla',
        email: 'francisco.escobar@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 1,
      },
      {
        nombre: 'Arleny Raquel García Claros',
        email: 'arleny.garcia@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 2,
      },
      {
        nombre: 'Elías Arturo Díaz Sorto',
        email: 'elias.diazv@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 2,
      },
      {
        nombre: 'Celina Esmeralda Mejia Melendez',
        email: 'esmeralda.mejia@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 2,
      },
      {
        nombre: 'Jessica Esmeralda Vides Romero',
        email: 'jessica.vides@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 2,
      },
      {
        nombre: 'Magdiel Corea Araujo',
        email: 'magdiel.corea@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 2,
      },
      {
        nombre: 'Karen Jassmin Soto Benavides',
        email: 'karen.soto@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 2,
      },
      {
        nombre: 'Salvador Eduardo Flamenco Pineda',
        email: 'salvador.flamenco@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 2,
      },
      {
        nombre: 'Christian Roberto Monterrosa Surio',
        email: 'cristian.monterrosa@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 2,
      },
      {
        nombre: 'Diana Saraí Escobar Serrano',
        email: 'diana.escobar@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 2,
      },
      {
        nombre: 'Jeannete Margarita Peraza Martínez',
        email: 'jeannete.peraza@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 1,
      },
      {
        nombre: 'Ana Gabriela Mendoza Carranza',
        email: 'anag.mendoza@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 2,
      },
      {
        nombre: 'Ivan Alessandro Mendoza Landaverde',
        email: 'ivan.mendozal@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 2,
      },
      {
        nombre: 'Marta Gabriel Montes Hernandez',
        email: 'marta.montes@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 2,
      },
      {
        nombre: 'Sofía Anabel Paz Flores',
        email: 'sofia.paz@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 2,
      },
      {
        nombre: 'Karla Marcela Bonilla Rosales',
        email: 'karla.bonilla@salud.gob.sv',
        password: bcrypt.hashSync('123', 16),
        remember_token: '',
        id_estado: 4,
        id_rol: 2,
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