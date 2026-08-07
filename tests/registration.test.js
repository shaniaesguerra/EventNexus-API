const request = require('supertest');
const { app, connectDB } = require('../server');
const mongoose = require('mongoose');
const Registration = require('../models/Registration');

let createdIds = [];

// A helper to generate a valid registration payload
const baseRegistration = () => ({
    eventId: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId(),
    totalPrice: 100,
    quantity: 2,
});

beforeAll(async () => {
  const connected = await connectDB();
  if (!connected) throw new Error('Failed to connect to MongoDB');
});

afterAll(async () => {
  await Registration.deleteMany({ _id: { $in: createdIds } });
  await mongoose.connection.close();
});

describe('Registrations API', () => {

  // -----------------------------
  // GET /registrations
  // -----------------------------
  describe('GET /registrations', () => {
    it('returns a list of registrations', async () => {
      const res = await request(app).get('/registrations');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // -----------------------------
  // POST /registrations
  // -----------------------------
  describe('POST /registrations', () => {
    it('creates a registration', async () => {
      const payload = baseRegistration();

      const res = await request(app)
        .post('/registrations')
        .send(payload);

      expect(res.status).toBe(201);
      expect(res.body._id).toBeDefined();
      expect(res.body.eventId).toBe(payload.eventId.toString());
      expect(res.body.userId).toBe(payload.userId.toString());

      createdIds.push(res.body._id);
    });

    it('returns 400 when required fields are missing', async () => {
      const res = await request(app)
        .post('/registrations')
        .send({});

      expect(res.status).toBe(400);
    });
  });

  // -----------------------------
  // GET /registrations/:id
  // -----------------------------
  describe('GET /registrations/:id', () => {
    it('returns a registration by id', async () => {
      const created = await Registration.create(baseRegistration());
      createdIds.push(created._id);

      const res = await request(app).get(`/registrations/${created._id}`);

      expect(res.status).toBe(200);
      expect(res.body._id).toBe(created._id.toString());
      expect(res.body.eventId).toBe(created.eventId.toString());
    });

    it('returns 400 for an invalid id', async () => {
      const res = await request(app).get('/registrations/not-an-id');
      expect(res.status).toBe(400);
    });

    it('returns 404 when registration does not exist', async () => {
      const res = await request(app).get(`/registrations/${new mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
    });
  });

  // -----------------------------
  // PUT /registrations/:id
  // -----------------------------
  describe('PUT /registrations/:id', () => {
    it('updates a registration', async () => {
      const created = await Registration.create(baseRegistration());
      createdIds.push(created._id);

      const res = await request(app)
        .put(`/registrations/${created._id}`)
        .send({ status: 'confirmed' });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('confirmed');
    });

    it('returns 400 for an invalid id', async () => {
      const res = await request(app)
        .put('/registrations/not-an-id')
        .send({ status: 'confirmed' });

      expect(res.status).toBe(400);
    });

    it('returns 404 when registration does not exist', async () => {
      const res = await request(app)
        .put(`/registrations/${new mongoose.Types.ObjectId()}`)
        .send({ status: 'confirmed' });

      expect(res.status).toBe(404);
    });
  });

  // -----------------------------
  // DELETE /registrations/:id
  // -----------------------------
  describe('DELETE /registrations/:id', () => {
    it('deletes a registration', async () => {
      const created = await Registration.create(baseRegistration());

      const res = await request(app).delete(`/registrations/${created._id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const found = await Registration.findById(created._id);
      expect(found).toBeNull();
    });

    it('returns 400 for an invalid id', async () => {
      const res = await request(app).delete('/registrations/not-an-id');
      expect(res.status).toBe(400);
    });

    it('returns 404 when registration does not exist', async () => {
      const res = await request(app).delete(`/registrations/${new mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
    });
  });
});