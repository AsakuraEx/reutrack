const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        dialect:'mariadb',
        dialectOptions: {
            dateStrings: true, //Force date types (TIMESTAMP, DATETIME, DATE) to be returned as strings
            typeCast: true, //Determines if column values should be converted to native JavaScript types.
        },
        timezone: '-06:00', // -->Add this line. for writing to database
        define: {
            timestamps: true, //Times and dates for createdAt and updatedAt 
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
