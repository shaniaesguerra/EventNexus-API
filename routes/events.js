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
  //#swagger.parameters['body'] = { "in": "body", "description": "Event payload", "required": true, "schema": { "$ref": "#/definitions/EventInput" } }
  //#swagger.responses[201] = { "description": "Event created", "schema": { "$ref": "#/definitions/Event" } }
  createEvent(req, res);
});

router.put('/:id', (req, res) => {
  //#swagger.tags = ['Events']
  //#swagger.summary = 'Update an event'
  //#swagger.parameters['id'] = { "in": "path", "description": "Event ID", "required": true, "type": "string" }
  //#swagger.parameters['body'] = { "in": "body", "description": "Updated event payload", "required": true, "schema": { "$ref": "#/definitions/EventInput" } }
  //#swagger.responses[200] = { "description": "Event updated", "schema": { "$ref": "#/definitions/Event" } }
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