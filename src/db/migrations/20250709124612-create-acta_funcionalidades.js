'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('acta_funcionalidades', {
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
      descripcion: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      aprobado: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      cambio_solicitado: {
        type: Sequelize.STRING(200),
        allowNull: true,
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
    await queryInterface.dropTable('acta_funcionalidades');
  }
};