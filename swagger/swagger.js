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
    },
    EventInput: {
      type: 'object',
      required: ['title', 'date', 'venueId', 'userId'],
      properties: {
        title: { type: 'string', description: 'Event title', example: 'Annual Tech Conference' },
        description: { type: 'string', description: 'Event description', example: 'A day of talks and networking for developers.' },
        date: { type: 'string', format: 'date-time', description: 'Event date in ISO 8601 format', example: '2026-09-15T09:00:00.000Z' },
        time: { type: 'string', description: 'Event start time', example: '09:00' },
        venueId: { type: 'string', description: 'Identifier of the venue', example: '60f7a1b2c3d4e5f6a7b8c9d0' },
        userId: { type: 'string', description: 'Identifier of the event owner', example: '60f7a1b2c3d4e5f6a7b8c9d1' },
        category: { type: 'string', description: 'Event category', example: 'Technology' },
        capacity: { type: 'integer', description: 'Maximum number of attendees', example: 500 },
        age: { type: 'integer', description: 'Minimum age requirement', example: 18 },
        price: { type: 'number', description: 'Ticket price', example: 25.5 },
        status: { type: 'string', description: 'Event status', example: 'published' },
      },
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
    },
    VenueInput: {
      type: 'object',
      required: ['name', 'address', 'city'],
      properties: {
        name: { type: 'string', description: 'Venue name' },
        address: { type: 'string', description: 'Venue address' },
        city: { type: 'string', description: 'Venue city' },
        services: {
          type: 'array',
          items: { type: 'string' },
          description: 'Available venue services',
        },
        capacity: { type: 'integer', description: 'Venue capacity' },
        contactNumber: { type: 'string', description: 'Venue contact number' },
        contactEmail: { type: 'string', description: 'Venue contact email' },
      },
    },
  },
};

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log(`Swagger JSON generated at ${outputFile}`);
});