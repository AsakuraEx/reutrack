const Sequelize = require("sequelize");
require('dotenv').config();
const config = require('./config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        connectTimeout: dbConfig.connectTimeout,
        dialectOptions: {
            dateStrings: true,
            typeCast: true,
        },
        timezone: '-06:00',
        define: {
            timestamps: true,
        },
        logging: false,


    }
);
sequelize.authenticate()
    .then(() => {
        console.log(`DB CONNECTED`);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err.message || err);
    });

module.exports = sequelize;
