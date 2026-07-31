const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Event Nexus API',
        description: 'API documentation for available routes and requests'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);