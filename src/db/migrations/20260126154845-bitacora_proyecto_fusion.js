'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {    
    await queryInterface.createTable('bitacora_proyecto_fusion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_proyecto_a: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'proyecto',
          key: 'id'
        }
      },
      id_proyecto_b: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'proyecto',
          key: 'id'
        }
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
    await queryInterface.dropTable('bitacora_proyecto_union');
  }
};
