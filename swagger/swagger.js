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
    { name: 'Venues', description: 'Venue endpoints' },
    { name: 'Users', description: 'User endpoints' },
    { name: 'Registrations', description: 'Registration endpoints' }
  ],
  definitions: {
    Event: {
      _id: '60f7a1b2c3d4e5f6a7b8c9d2',
      title: 'Annual Tech Conference',
      description: 'A day of talks and networking for developers.',
      date: '2026-09-15T09:00:00.000Z',
      time: '09:00',
      venueId: '60f7a1b2c3d4e5f6a7b8c9d0',
      userId: '60f7a1b2c3d4e5f6a7b8c9d1',
      category: 'Technology',
      capacity: 500,
      age: 18,
      price: '$25.5',
      status: 'published',
      createdAt: '2026-08-01T10:00:00.000Z',
      updatedAt: '2026-08-01T10:00:00.000Z',
    },
    EventInput: {
      $title: 'Annual Tech Conference',
      description: 'A day of talks and networking for developers.',
      $date: '2026-09-15T09:00:00.000Z',
      time: '09:00',
      $venueId: '60f7a1b2c3d4e5f6a7b8c9d0',
      $userId: '60f7a1b2c3d4e5f6a7b8c9d1',
      category: 'Technology',
      capacity: 500,
      age: 18,
      price: '$25.5',
      status: 'published',
    },
    Venue: {
      _id: '60f7a1b2c3d4e5f6a7b8c9d0',
      name: 'Convention Center',
      address: '123 Main Street',
      city: 'Kampala',
      services: ['projector', 'wifi', 'catering'],
      capacity: 500,
      contactNumber: '+256700000000',
      contactEmail: 'info@conventioncenter.ug',
      createdAt: '2026-08-01T10:00:00.000Z',
      updatedAt: '2026-08-01T10:00:00.000Z',
    },
    VenueInput: {
      $name: 'Convention Center',
      $address: '123 Main Street',
      $city: 'Kampala',
      services: ['projector', 'wifi', 'catering'],
      capacity: 500,
      contactNumber: '+256700000000',
      contactEmail: 'info@conventioncenter.ug',
    },
    User: {
      _id: '60f7a1b2c3d4e5f6a7b8c9d1',
      FirstName: 'Jane',
      LastName: 'Xaka',
      jobTitle: 'garden designer',
      email: 'jane23@example.com',
      phoneNumber: '+256700000000',
      role: 'user',
      createdAt: '2026-08-01T10:00:00.000Z',
      updatedAt: '2026-08-01T10:00:00.000Z',
    },
    UserInput: {
      $FirstName: 'Jane',
      $LastName: 'Xaka',
      jobTitle: 'garden designer',
      $email: 'jane.xaka@example.com',
      phoneNumber: '+2567004350',
      role: 'user',
    },
    Registration: {
      _id: '66f1aa11e4b0123456789206',
      eventId: '66f1aa11e4b0123456789207',
      userId: '66f1aa11e4b0123456789208',
      registrationDate: '2026-09-01T10:00:00.000Z',
      quantity: 2,
      ticketType: 'VIP',
      totalPrice: 100,
      ticketStatus: 'Confirmed',
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-01T10:00:00.000Z'
    },
    RegistrationInput: {
      $eventId: '66f1aa11e4b0123456789207',
      $userId: '66f1aa11e4b0123456789208',
      $quantity: 2,
      ticketType: 'VIP',
      ticketStatus: 'Confirmed'
    },
  },
};

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log(`Swagger JSON generated at ${outputFile}`);
});
