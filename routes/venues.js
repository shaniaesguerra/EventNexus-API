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
  //#swagger.description = 'Get all venues'
  getAllVenues(req, res);
});

router.get('/:id', (req, res) => {
  //#swagger.tags = ['Venues']
  //#swagger.description = 'Get venue by ID'
  getVenueById(req, res);
});

router.post('/', (req, res) => {
  //#swagger.tags = ['Venues']
  //#swagger.description = 'Create a venue'
  createVenue(req, res);
});

router.put('/:id', (req, res) => {
  //#swagger.tags = ['Venues']
  //#swagger.description = 'Update a venue'
  updateVenue(req, res);
});

router.delete('/:id', (req, res) => {
  //#swagger.tags = ['Venues']
  //#swagger.description = 'Delete a venue'
  deleteVenue(req, res);
});

module.exports = router;
