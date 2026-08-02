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
  //#swagger.description = 'Get all events'
  getAllEvents(req, res);
});

router.get('/:id', (req, res) => {
  //#swagger.tags = ['Events']
  //#swagger.description = 'Get event by ID'
  getEventById(req, res);
});

router.post('/', (req, res) => {
  //#swagger.tags = ['Events']
  //#swagger.description = 'Create an event'
  createEvent(req, res);
});

router.put('/:id', (req, res) => {
  //#swagger.tags = ['Events']
  //#swagger.description = 'Update an event'
  updateEvent(req, res);
});

router.delete('/:id', (req, res) => {
  //#swagger.tags = ['Events']
  //#swagger.description = 'Delete an event'
  deleteEvent(req, res);
});

module.exports = router;
