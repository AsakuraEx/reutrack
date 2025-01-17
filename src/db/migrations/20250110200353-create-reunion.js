'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reunion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      lugar: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      codigo: {
        type: Sequelize.STRING(16),
        allowNull: false,
        unique: true
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_estado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ctl_estado', // Nombre de la tabla referenciada
          key: 'id',        // Columna referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_proyecto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'proyecto', // Nombre de la tabla referenciada
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
    await queryInterface.dropTable('reunion');
  }
};