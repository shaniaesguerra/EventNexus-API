const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Event Nexus API',
        description: 'This is an api server for a events and bookings app/website.'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);