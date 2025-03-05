const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerComponents = require('./swagger/index');

const host = process.env.HOST
const port = process.env.PORT;


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for the application',
        },
        servers: [
            {
                url: `http://${host}:${port}`, // Update with your server URL
            },
        ],
        components: swaggerComponents.components,
    },
    apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
    swaggerUi,
    swaggerDocs,
};

