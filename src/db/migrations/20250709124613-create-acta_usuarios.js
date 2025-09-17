'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('acta_usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_acta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'acta_aceptacion',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nombre: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      institucion: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      cargo: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      documento_identidad: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      documento_institucional: {
        type: Sequelize.TEXT,
        allowNull: false
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
    await queryInterface.dropTable('acta_usuarios');
  }
};