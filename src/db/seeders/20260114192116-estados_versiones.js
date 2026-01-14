
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ctl_estado', [
      { nombre: 'Toma de requerimiento', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Reunión Pendiente', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Validación pendiente', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Prototipo pendiente', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Documento pendiente', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Requerimiento en Desarrollo', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Requerimiento en QA', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Requerimiento en espera/documentado', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Requerimiento detenido', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Pendiente de publicar', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Requerimiento en piloto', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Soporte', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ctl_estado', null, {});
  }
};
