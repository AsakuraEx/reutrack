'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('minutareunion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      minuta: {
        type: Sequelize.STRING(5000),
        allowNull: true
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
    await queryInterface.dropTable('minutareunion');
  }
};