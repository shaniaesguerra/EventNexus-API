const swaggerAutogen = require('swagger-autogen')();
const host = process.env.RENDER_URL || 'localhost:3000';

const doc = {
  info: {
    title: 'Event Nexus API',
    description: 'This is the API documentation for available endpoints in the Event Nexus API project. The idea is that it will handle events and bookings that can be implemented in an app or website.'
  },
  host: host,
  schemes: ['https', 'http'],
  tags: [
    { name: 'Events', description: 'Event endpoints' },
    { name: 'Venues', description: 'Venue endpoints' }
  ],
  definitions: {
    Event: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        date: { type: 'string', format: 'date-time' },
        time: { type: 'string' },
        venueId: { type: 'string' },
        userId: { type: 'string' },
        category: { type: 'string' },
        capacity: { type: 'integer' },
        age: { type: 'integer' },
        price: { type: 'number' },
        status: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
      example: {
        _id: '66f1aa11e4b0123456789206',
        title: 'Tech Conference 2026',
        description: 'Annual developer conference',
        date: '2026-09-15T09:00:00.000Z',
        time: '09:00 AM',
        venueId: '6a6e45cff28359b8e7e2251e',
        userId: '66f1aa11e4b0123456789206',
        category: 'Tech',
        capacity: 500,
        age: 18,
        price: 50,
        status: 'Upcoming',
        createdAt: '2026-05-01T12:00:00.000Z',
        updatedAt: '2026-05-01T12:00:00.000Z'
      }
    },
    EventInput: {
      type: 'object',
      required: ['title', 'date', 'venueId', 'userId'],
      properties: {
        title: { type: 'string', example: 'Tech Conference 2026' },
        description: { type: 'string', example: 'Annual developer conference' },
        date: { type: 'string', format: 'date-time', example: '2026-09-15T09:00:00.000Z' },
        time: { type: 'string', example: '09:00 AM' },
        venueId: { type: 'string', example: '6a6e45cff28359b8e7e2251e' },
        userId: { type: 'string', example: '66f1aa11e4b0123456789206' },
        category: { type: 'string', example: 'Tech' },
        capacity: { type: 'integer', example: 500 },
        age: { type: 'integer', example: 18 },
        price: { type: 'number', example: 50 },
        status: { type: 'string', example: 'Upcoming' },
      },
      example: {
        title: 'Tech Conference 2026',
        description: 'Annual developer conference',
        date: '2026-09-15T09:00:00.000Z',
        time: '09:00 AM',
        venueId: '6a6e45cff28359b8e7e2251e',
        userId: '66f1aa11e4b0123456789206',
        category: 'Tech',
        capacity: 500,
        age: 18,
        price: 50,
        status: 'Upcoming'
      }
    },
    Venue: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        address: { type: 'string' },
        city: { type: 'string' },
        services: { type: 'array', items: { type: 'string' } },
        capacity: { type: 'integer' },
        contactNumber: { type: 'string' },
        contactEmail: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
      example: {
        _id: '6a6e45cff28359b8e7e2251e',
        name: 'Grand Convention Center',
        address: '123 Main Street',
        city: 'New York',
        services: ['WiFi', 'Parking', 'Catering'],
        capacity: 1000,
        contactNumber: '+1-555-123-4567',
        contactEmail: 'events@grandcenter.com',
        createdAt: '2026-05-01T12:00:00.000Z',
        updatedAt: '2026-05-01T12:00:00.000Z'
      }
    },
    VenueInput: {
      type: 'object',
      required: ['name', 'address', 'city'],
      properties: {
        name: { type: 'string', example: 'Grand Convention Center' },
        address: { type: 'string', example: '123 Main Street' },
        city: { type: 'string', example: 'New York' },
        services: {
          type: 'array',
          items: { type: 'string' },
          example: ['WiFi', 'Parking', 'Catering'],
        },
        capacity: { type: 'integer', example: 1000 },
        contactNumber: { type: 'string', example: '+1-555-123-4567' },
        contactEmail: { type: 'string', example: 'events@grandcenter.com' },
      },
      example: {
        name: 'Grand Convention Center',
        address: '123 Main Street',
        city: 'New York',
        services: ['WiFi', 'Parking', 'Catering'],
        capacity: 1000,
        contactNumber: '+1-555-123-4567',
        contactEmail: 'events@grandcenter.com'
      }
    },
  },
};

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log(`Swagger JSON generated at ${outputFile}`);
});