const request = require('supertest');
const mongoose = require('mongoose');
const GitHubStrategy = require('passport-github2').Strategy;
const { app, connectDB } = require('../server');
const Event = require('../models/Event');
const Venue = require('../models/Venue');

GitHubStrategy.prototype.authenticate = function (req, options) {
  this.success({
    id: 'mock-github-user',
    username: 'mock-user',
    displayName: 'Mock User',
    provider: 'github',
  });
};

const userId = new mongoose.Types.ObjectId();
let venueId;
let createdIds = [];
let agent;

beforeAll(async () => {
  const connected = await connectDB();
  if (!connected) throw new Error('Failed to connect to MongoDB');
  const venue = await Venue.create({
    name: 'Events Test Venue',
    address: '1 Event St',
    city: 'EventCity',
    capacity: 100,
    contactNumber: '+256700000000',
    contactEmail: 'events.test.venue@example.com',
  });
  venueId = venue._id;

  agent = request.agent(app);
  await agent.get('/auth/github/callback');
});

afterAll(async () => {
  await Event.deleteMany({ _id: { $in: createdIds } });
  await Venue.deleteMany({ _id: venueId });
  await mongoose.connection.close();
});

const baseEvent = () => ({
  title: 'Test Event',
  date: '2026-09-15T09:00:00.000Z',
  venueId: String(venueId),
  userId: String(userId),
});

describe('Authentication', () => {
  it('rejects write routes without login', async () => {
    const res = await request(app).post('/events').send(baseEvent());
    expect(res.status).toBe(401);
  });

  it('allows access after OAuth login', async () => {
    const status = await agent.get('/auth/status');
    expect(status.status).toBe(200);
    expect(status.body.authenticated).toBe(true);
  });
});

describe('Events API', () => {
  describe('GET /events', () => {
    it('returns a list of events', async () => {
      const res = await agent.get('/events');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /events', () => {
    it('creates an event', async () => {
      const res = await agent.post('/events').send(baseEvent());

      expect(res.status).toBe(201);
      expect(res.body._id).toBeDefined();
      expect(res.body.title).toBe('Test Event');
      expect(res.body.status).toBe('Upcoming');
      createdIds.push(res.body._id);
    });

    it('returns 400 when required fields are missing', async () => {
      const res = await agent.post('/events').send({});
      expect(res.status).toBe(400);
    });
  });

  describe('GET /events/:id', () => {
    it('returns an event by id', async () => {
      const created = await Event.create(baseEvent());
      createdIds.push(created._id);

      const res = await agent.get(`/events/${created._id}`);
      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Test Event');
    });

    it('returns 400 for an invalid id', async () => {
      const res = await agent.get('/events/not-an-id');
      expect(res.status).toBe(400);
    });

    it('returns 404 when event does not exist', async () => {
      const res = await agent.get(`/events/${new mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
    });
  });

  describe('PUT /events/:id', () => {
    it('updates an event', async () => {
      const created = await Event.create(baseEvent());
      createdIds.push(created._id);

      const res = await agent
        .put(`/events/${created._id}`)
        .send({ title: 'Updated Event', capacity: 100 });

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated Event');
      expect(res.body.capacity).toBe(100);
    });

    it('returns 400 for an invalid id', async () => {
      const res = await agent.put('/events/not-an-id').send({ title: 'X' });
      expect(res.status).toBe(400);
    });

    it('returns 404 when event does not exist', async () => {
      const res = await agent
        .put(`/events/${new mongoose.Types.ObjectId()}`)
        .send({ title: 'X' });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /events/:id', () => {
    it('deletes an event', async () => {
      const created = await Event.create(baseEvent());

      const res = await agent.delete(`/events/${created._id}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Event deleted successfully');

      const found = await Event.findById(created._id);
      expect(found).toBeNull();
    });

    it('returns 400 for an invalid id', async () => {
      const res = await agent.delete('/events/not-an-id');
      expect(res.status).toBe(400);
    });

    it('returns 404 when event does not exist', async () => {
      const res = await agent.delete(`/events/${new mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
    });
  });
});
