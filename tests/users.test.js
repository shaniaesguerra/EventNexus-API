const request = require('supertest');
const mongoose = require('mongoose');
const { app, connectDB } = require('../server');
const User = require('../models/User');

let createdIds = [];

beforeAll(async () => {
  const connected = await connectDB();
  if (!connected) throw new Error('Failed to connect to MongoDB');
});

afterAll(async () => {
  await User.deleteMany({ _id: { $in: createdIds } });
  await mongoose.connection.close();
});

const baseUser = () => ({
  FirstName: 'Jane',
  LastName: 'Doe',
  email: `jane.doe.${Date.now()}@example.com`,
  password: 'secret123',
});

describe('Users API', () => {
  describe('GET /users', () => {
    it('returns a list of users', async () => {
      const res = await request(app).get('/users');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /users', () => {
    it('creates a user', async () => {
      const payload = baseUser();
      const res = await request(app).post('/users').send(payload);

      expect(res.status).toBe(201);
      expect(res.body._id).toBeDefined();
      expect(res.body.FirstName).toBe(payload.FirstName);
      expect(res.body.LastName).toBe(payload.LastName);
      expect(res.body.email).toBe(payload.email);
      createdIds.push(res.body._id);
    });

    it('returns 400 when required fields are missing', async () => {
      const res = await request(app).post('/users').send({});
      expect(res.status).toBe(400);
    });
  });

  describe('GET /users/:id', () => {
    it('returns a user by id', async () => {
      const created = await User.create(baseUser());
      createdIds.push(created._id);

      const res = await request(app).get(`/users/${created._id}`);
      expect(res.status).toBe(200);
      expect(res.body.FirstName).toBe('Jane');
      expect(res.body.email).toBe(created.email);
    });

    it('returns 400 for an invalid id', async () => {
      const res = await request(app).get('/users/not-an-id');
      expect(res.status).toBe(400);
    });

    it('returns 404 when user does not exist', async () => {
      const res = await request(app).get(`/users/${new mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
    });
  });

  describe('PUT /users/:id', () => {
    it('updates a user', async () => {
      const created = await User.create(baseUser());
      createdIds.push(created._id);

      const res = await request(app)
        .put(`/users/${created._id}`)
        .send({ LastName: 'Smith', jobTitle: 'Engineer' });

      expect(res.status).toBe(200);
      expect(res.body.LastName).toBe('Smith');
      expect(res.body.jobTitle).toBe('Engineer');
      expect(res.body.FirstName).toBe('Jane');
    });

    it('returns 400 for an invalid id', async () => {
      const res = await request(app).put('/users/not-an-id').send({ LastName: 'X' });
      expect(res.status).toBe(400);
    });

    it('returns 404 when user does not exist', async () => {
      const res = await request(app)
        .put(`/users/${new mongoose.Types.ObjectId()}`)
        .send({ LastName: 'X' });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /users/:id', () => {
    it('deletes a user', async () => {
      const created = await User.create(baseUser());

      const res = await request(app).delete(`/users/${created._id}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('User deleted successfully');

      const found = await User.findById(created._id);
      expect(found).toBeNull();
    });

    it('returns 400 for an invalid id', async () => {
      const res = await request(app).delete('/users/not-an-id');
      expect(res.status).toBe(400);
    });

    it('returns 404 when user does not exist', async () => {
      const res = await request(app).delete(`/users/${new mongoose.Types.ObjectId()}`);
      expect(res.status).toBe(404);
    });
  });
});
