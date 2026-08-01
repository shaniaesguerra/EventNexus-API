const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'EventNexus API',
    version: '1.0.0',
    description: 'API documentation for EventNexus project',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server',
    },
  ],
  paths: {
    '/events': {
      get: {
        tags: ['Events'],
        summary: 'List all events',
        responses: {
          '200': {
            description: 'A list of events',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Event' },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Events'],
        summary: 'Create a new event',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/EventInput' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Event created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Event' },
              },
            },
          },
          '400': { description: 'Validation error' },
        },
      },
    },
    '/events/{id}': {
      get: {
        tags: ['Events'],
        summary: 'Get one event by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', example: '66f1aa11e4b0123456789206' },
          },
        ],
        responses: {
          '200': {
            description: 'An event object',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Event' },
              },
            },
          },
          '404': { description: 'Event not found' },
        },
      },
      put: {
        tags: ['Events'],
        summary: 'Update an event',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', example: '66f1aa11e4b0123456789206' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/EventInput' },
            },
          },
        },
        responses: {
          '200': { description: 'Event updated' },
          '400': { description: 'Validation error' },
          '404': { description: 'Event not found' },
        },
      },
      delete: {
        tags: ['Events'],
        summary: 'Delete an event',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', example: '66f1aa11e4b0123456789206' },
          },
        ],
        responses: {
          '200': { description: 'Event deleted' },
          '404': { description: 'Event not found' },
        },
      },
    },
    '/venues': {
      get: {
        tags: ['Venues'],
        summary: 'List all venues',
        responses: {
          '200': {
            description: 'A list of venues',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Venue' },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Venues'],
        summary: 'Create a new venue',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/VenueInput' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Venue created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Venue' },
              },
            },
          },
          '400': { description: 'Validation error' },
        },
      },
    },
    '/venues/{id}': {
      get: {
        tags: ['Venues'],
        summary: 'Get one venue by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', example: '6a6e45cff28359b8e7e2251e' },
          },
        ],
        responses: {
          '200': {
            description: 'A venue object',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Venue' },
              },
            },
          },
          '404': { description: 'Venue not found' },
        },
      },
      put: {
        tags: ['Venues'],
        summary: 'Update a venue',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', example: '6a6e45cff28359b8e7e2251e' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/VenueInput' },
            },
          },
        },
        responses: {
          '200': { description: 'Venue updated' },
          '400': { description: 'Validation error' },
          '404': { description: 'Venue not found' },
        },
      },
      delete: {
        tags: ['Venues'],
        summary: 'Delete a venue',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', example: '6a6e45cff28359b8e7e2251e' },
          },
        ],
        responses: {
          '200': { description: 'Venue deleted' },
          '404': { description: 'Venue not found' },
        },
      },
    },
  },
  components: {
    schemas: {
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
          status: 'Upcoming',
        },
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
        required: ['title', 'date', 'venueId', 'userId'],
      },
      Venue: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          address: { type: 'string' },
          city: { type: 'string' },
          state: { type: 'string' },
          services: {
            type: 'array',
            items: { type: 'string' },
          },
          capacity: { type: 'integer' },
          contactNumber: { type: 'string' },
          contactEmail: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      VenueInput: {
        type: 'object',
        example: {
          name: 'Grand Convention Center',
          address: '123 Main Street',
          city: 'New York',
          state: 'NY',
          services: ['WiFi', 'Parking', 'Catering'],
          capacity: 1000,
          contactNumber: '+1-555-123-4567',
          contactEmail: 'events@grandcenter.com',
        },
        properties: {
          name: { type: 'string', example: 'Grand Convention Center' },
          address: { type: 'string', example: '123 Main Street' },
          city: { type: 'string', example: 'New York' },
          state: { type: 'string', example: 'NY' },
          services: {
            type: 'array',
            items: { type: 'string' },
            example: ['WiFi', 'Parking', 'Catering'],
          },
          capacity: { type: 'integer', example: 1000 },
          contactNumber: { type: 'string', example: '+1-555-123-4567' },
          contactEmail: { type: 'string', example: 'events@grandcenter.com' },
        },
        required: ['name', 'address', 'city'],
      },
    },
  },
};

module.exports = swaggerDocument;
