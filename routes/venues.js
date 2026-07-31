const express = require('express');
const router = express.Router();
const venueController = require('../controllers/venues');

router.post("/", venueController.createVenue);
router.get('/', venueController.getVenues);
router.get("/:id", venueController.getVenueById);
router.put("/:id", venueController.updateVenue);
router.delete("/:id", venueController.deleteVenue);

module.exports = router;