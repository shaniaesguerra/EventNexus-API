const express = require('express');
const {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
} = require('../controllers/venues');

const router = express.Router();

router.get('/', (req, res) => {
  //#swagger.tags = ['Venues']
  //#swagger.summary = 'Get all venues'
  //#swagger.responses[200] = {"description": "A list of venues","schema": { "type": "array", "items": { "$ref": "#/definitions/Venue" } } }
  getAllVenues(req, res);
});

router.get('/:id', (req, res) => {
  //#swagger.tags = ['Venues']
  //#swagger.summary = 'Get venue by ID'
  //#swagger.parameters['id'] = { "in": "path", "description": "Venue ID", "required": true, "type": "string" }
  //#swagger.responses[200] = {"description": "Venue found","schema": { "$ref": "#/definitions/Venue" }}
  //#swagger.responses[404] = { "description": "Venue not found" }
  getVenueById(req, res);
});

router.post('/', (req, res) => {
  //#swagger.tags = ['Venues']
  //#swagger.summary = 'Create a new venue'
  //#swagger.parameters['body'] = { "in": "body", "description": "Venue payload", "required": true, "schema": { "type": "object", "required": ["name", "address", "city"], "properties": { "name": { "type": "string" }, "address": { "type": "string" }, "city": { "type": "string" }, "state": { "type": "string" }, "services": { "type": "array", "items": { "type": "string" } }, "capacity": { "type": "integer" }, "contactNumber": { "type": "string" }, "contactEmail": { "type": "string" } }, "example": { "name": "Grand Convention Center", "address": "123 Main Street", "city": "New York", "state":"NY", "services": ["WiFi", "Parking", "Catering"], "capacity": 1000,"contactNumber": "+1-555-123-4567","contactEmail":"events@grandcenter.com" } } }
  //#swagger.responses[201] = { "description":"Venue created","schema": { "$ref": "#/definitions/Venue" } }
  createVenue(req, res);
});

router.put('/:id', (req, res) => {
  //#swagger.tags = ['Venues']
  //#swagger.summary = 'Update a venue'
  //#swagger.parameters['id'] = { "in": "path", "description": "Venue ID", "required": true, "type": "string" }
  //#swagger.parameters['body'] = { "in": "body", "description": "Updated venue payload", "required": true, "schema": { "type": "object", "required": ["name", "address", "city"], "properties": { "name": { "type": "string" }, "address": { "type": "string" }, "city": { "type": "string" }, "state": { "type": "string" }, "services": { "type": "array", "items": { "type": "string" } }, "capacity": { "type": "integer" }, "contactNumber": { "type": "string" }, "contactEmail": { "type": "string" } }, "example": { "name": "Grand Convention Center", "address": "123 Main Street", "city": "New York", "state":"NY","services": ["WiFi","Parking","Catering"],"capacity":1000,"contactNumber":"+1-555-123-4567","contactEmail":"events@grandcenter.com"} } }
  //#swagger.responses[200] = { "description":"Venue updated","schema": { "$ref": "#/definitions/Venue" } }
  //#swagger.responses[404] = { "description":"Venue not found" }
  updateVenue(req, res);
});

router.delete('/:id', (req, res) => {
  //#swagger.tags = ['Venues']
  //#swagger.summary = 'Delete a venue'
  //#swagger.parameters['id'] = { "in": "path", "description": "Venue ID", "required": true, "type": "string" }
  //#swagger.responses[200] = { "description": "Venue deleted" }
  //#swagger.responses[404] = { "description": "Venue not found" }
  deleteVenue(req, res);
});

module.exports = router;