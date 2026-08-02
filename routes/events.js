const express = require('express');
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');

const router = express.Router();

router.get('/', (req, res) => {
  //#swagger.tags = ['Events']
  //#swagger.summary = 'Get all events'
  //#swagger.responses[200] = {"description": "List of events","schema": { "type": "array", "items": { "$ref": "#/definitions/Event" } }}
  getAllEvents(req, res);
});

router.get('/:id', (req, res) => {
  //#swagger.tags = ['Events']
  //#swagger.summary = 'Get event by ID'
  //#swagger.parameters['id'] = { "in": "path", "description": "Event ID", "required": true, "type": "string" }
  //#swagger.responses[200] = { "description": "Event found", "schema": { "$ref": "#/definitions/Event" } }
  //#swagger.responses[404] = { "description": "Event not found" }
  getEventById(req, res);
});

router.post('/', (req, res) => {
  //#swagger.tags = ['Events']
  //#swagger.summary = 'Create a new event'
  //#swagger.parameters['body'] = { "in": "body", "description": "Event payload", "required": true, "schema": { "type": "object", "required": ["title", "date", "venueId", "userId"], "properties": { "title": { "type": "string" }, "description": { "type": "string" }, "date": { "type": "string", "format": "date-time" }, "time": { "type": "string" }, "venueId": { "type": "string" }, "userId": { "type": "string" }, "category": { "type": "string" }, "capacity": { "type": "integer" }, "age": { "type": "integer" }, "price": { "type": "number" }, "status": { "type": "string" } }, "example": { "title": "Tech Conference 2026", "description": "Annual developer conference", "date": "2026-09-15T09:00:00.000Z", "time": "09:00 AM", "venueId": "6a6e45cff28359b8e7e2251e", "userId": "66f1aa11e4b0123456789206", "category": "Tech", "capacity": 500, "age": 18, "price": 50, "status": "Upcoming" },"default": { "title": "Tech Conference 2026", "description": "Annual developer conference", "date": "2026-09-15T09:00:00.000Z", "time": "09:00 AM", "venueId": "6a6e45cff28359b8e7e2251e", "userId": "66f1aa11e4b0123456789206", "category": "Tech", "capacity": 500, "age": 18, "price": 50, "status": "Upcoming" } } }
  //#swagger.responses[201] = { "description": "Event created", "schema": { "$ref": "#/definitions/Event" } }
  createEvent(req, res);
});

router.put('/:id', (req, res) => {
  //#swagger.tags = ['Events']
  //#swagger.summary = 'Update an event'
  //#swagger.parameters['id'] = { "in": "path", "description": "Event ID", "required": true, "type": "string" }
  //#swagger.parameters['body'] = { "in": "body", "description": "Updated event payload", "required": true, "schema": { "type": "object", "required": ["title", "date", "venueId", "userId"], "properties": { "title": { "type": "string" }, "description": { "type": "string" }, "date": { "type": "string", "format": "date-time" }, "time": { "type": "string" }, "venueId": { "type": "string" }, "userId": { "type": "string" }, "category": { "type": "string" }, "capacity": { "type": "integer" }, "age": { "type": "integer" }, "price": { "type": "number" }, "status": { "type": "string" } }, "example": { "title": "Tech Conference 2026", "description": "Annual developer conference", "date": "2026-09-15T09:00:00.000Z", "time": "09:00 AM", "venueId": "6a6e45cff28359b8e7e2251e", "userId": "66f1aa11e4b0123456789206", "category": "Tech", "capacity": 500, "age": 18, "price": 50, "status": "Upcoming" },"default": { "title": "Tech Conference 2026", "description": "Annual developer conference", "date": "2026-09-15T09:00:00.000Z", "time": "09:00 AM", "venueId": "6a6e45cff28359b8e7e2251e", "userId": "66f1aa11e4b0123456789206", "category": "Tech", "capacity": 500, "age": 18, "price": 50, "status": "Upcoming" } } }
  //#swagger.responses[200] = { "description": "Event updated", "schema": { $ref: '#/definitions/Event' } }
  //#swagger.responses[404] = { "description": "Event not found" }
  updateEvent(req, res);
});

router.delete('/:id', (req, res) => {
  //#swagger.tags = ['Events']
  //#swagger.summary = 'Delete an event'
  //#swagger.parameters['id'] = { "in": "path", "description": "Event ID", "required": true, "type": "string" }
  //#swagger.responses[200] = { "description": "Event deleted" }
  //#swagger.responses[404] = { "description": "Event not found" }
  deleteEvent(req, res);
});

module.exports = router;