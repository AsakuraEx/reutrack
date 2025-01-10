'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('listaasistencia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      participante: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      doc_identidad: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      cargo: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      telefono: {
        type: Sequelize.STRING(8),
        allowNull: true
      },
      correo: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      id_reunion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'reunion', // Nombre de la tabla referenciada
          key: 'id',        // Columna referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('listaasistencia');
  }
};