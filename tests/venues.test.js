const request = require('supertest');
const mongoose = require('mongoose');
const { app, connectDB } = require('../server');
const Venue = require('../models/Venue');

let createdIds = [];

beforeAll(async () => {
  const connected = await connectDB();
  if (!connected) throw new Error('Failed to connect to MongoDB');
});

afterAll(async () => {
  await Venue.deleteMany({ _id: { $in: createdIds } });
  await mongoose.connection.close();
});

describe('Venues API', () => {
  describe('GET /venues', () => {
    it('returns a list of venues', async () => {
      const res = await request(app).get('/venues');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /venues', () => {
    it('creates a venue', async () => {
      const res = await request(app)
        .post('/venues')
        .send({ name: 'Test Venue', address: '123 Test St', city: 'TestCity' });

      expect(res.status).toBe(201);
      expect(res.body._id).toBeDefined();
      expect(res.body.name).toBe('Test Venue');
      expect(res.body.address).toBe('123 Test St');
      expect(res.body.city).toBe('TestCity');
      createdIds.push(res.body._id);
    });

    it('returns 400 when required fields are missing', async () => {
      const res = await request(app).post('/venues').send({});
      expect(res.status).toBe(400);
    });
  });

  describe('GET /venues/:id', () => {
    it('returns a venue by id', async () => {
      const created = await Venue.create({ name: 'Get Me', address: '1 Get St', city: 'GetCity' });
      createdIds.push(created._id);

      const res = await request(app).get(`/venues/${created._id}`);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Get Me');
    });

    it('returns 400 for an invalid id', async () => {
      const res = await request(app).get('/venues/not-an-id');
      expect(res.status).toBe(400);
    });

    it('returns 404 when venue does not exist', async () => {
      const res = await request(app).get(`/venues/${new mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
    });
  });

  describe('PUT /venues/:id', () => {
    it('updates a venue', async () => {
      const created = await Venue.create({ name: 'Before', address: '1 Update St', city: 'UpdateCity' });
      createdIds.push(created._id);

      const res = await request(app)
        .put(`/venues/${created._id}`)
        .send({ name: 'After' });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('After');
      expect(res.body.address).toBe('1 Update St');
    });

    it('returns 400 for an invalid id', async () => {
      const res = await request(app).put('/venues/not-an-id').send({ name: 'X' });
      expect(res.status).toBe(400);
    });

    it('returns 404 when venue does not exist', async () => {
      const res = await request(app)
        .put(`/venues/${new mongoose.Types.ObjectId()}`)
        .send({ name: 'X' });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /venues/:id', () => {
    it('deletes a venue', async () => {
      const created = await Venue.create({ name: 'Delete Me', address: '1 Del St', city: 'DelCity' });

      const res = await request(app).delete(`/venues/${created._id}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Venue deleted successfully');

      const found = await Venue.findById(created._id);
      expect(found).toBeNull();
    });

    it('returns 400 for an invalid id', async () => {
      const res = await request(app).delete('/venues/not-an-id');
      expect(res.status).toBe(400);
    });

    it('returns 404 when venue does not exist', async () => {
      const res = await request(app).delete(`/venues/${new mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
    });
  });
});
