const { MariaDbDialect } = require ('@sequelize/mariadb');

require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOSTNAME,
    port: process.env.DEV_DB_PORT,
    dialect: 'mariadb',
    connectTimeout: 1000,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    connectTimeout: 3000,
    logging: false, // Desactiva logs de SQL en producción
  },
};