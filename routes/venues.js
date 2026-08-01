const express = require('express');
const {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
} = require('../controllers/venues');

const router = express.Router();

router.get('/', getAllVenues);
router.get('/:id', getVenueById);
router.post('/', createVenue);
router.put('/:id', updateVenue);
router.delete('/:id', deleteVenue);

module.exports = router;
