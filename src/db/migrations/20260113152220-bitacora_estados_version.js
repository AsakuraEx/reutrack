'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {    
    await queryInterface.createTable('bitacora_estado_version', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_proyecto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'proyecto',
          key: 'id'
        },
      },
      id_version: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'version',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_estado_nuevo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ctl_estado',
          key: 'id'
        },
      },
      id_estado_anterior: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'ctl_estado',
          key: 'id'
        },
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
    await queryInterface.dropTable('bitacora_estado_reunion');
  }
};