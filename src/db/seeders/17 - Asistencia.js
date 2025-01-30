'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('listaasistencia', 
      [
        { participante: 'Sofia Paz',
          doc_identidad: '11111111-1',
          cargo:'Tenico Informatico',
          telefono:'7777777',
          correo: 'sofia@salud.gob.sv',
          id_reunion: 1
        },
        { participante: 'Arleny Garcia',
          doc_identidad: '11111111-1',
          cargo:'Tenico Informatico',
          telefono:'7777777',
          correo: 'arleny@salud.gob.sv',
          id_reunion: 1
        },
        { participante: 'Diana Sara',
          doc_identidad: '11111111-1',
          cargo:'Tenico Informatico',
          telefono:'7777777',
          correo: 'sofia@salud.gob.sv',
          id_reunion: 2
        },
      ], 
      {});
  },

  async down (queryInterface, Sequelize) {
  }
};
