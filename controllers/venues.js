const mongoose = require('mongoose');
const Venue = require('../models/Venue');
const { validateObjectId } = require('../middleware/registrationValidation');

const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find().sort({ name: 1 });
    return res.json(venues);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to fetch venues', details: error.message });
  }
};

const getVenueById = async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({ error: 'Invalid venue ID' });
  }

  try {
    const venue = await Venue.findById(id);
    if (!venue) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    return res.json(venue);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to fetch venue', details: error.message });
  }
};

const createVenue = async (req, res) => {
  try {
    const venue = new Venue(req.body);
    await venue.save();
    return res.status(201).json(venue);
  } catch (error) {
    return res.status(400).json({ error: 'Unable to create venue', details: error.message });
  }
};

const updateVenue = async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({ error: 'Invalid venue ID' });
  }

  try {
    const venue = await Venue.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!venue) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    return res.json(venue);
  } catch (error) {
    return res.status(400).json({ error: 'Unable to update venue', details: error.message });
  }
};

const deleteVenue = async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({ error: 'Invalid venue ID' });
  }

  try {
    const venue = await Venue.findByIdAndDelete(id);
    if (!venue) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    return res.json({ message: 'Venue deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Unable to delete venue', details: error.message });
  }
};

module.exports = {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
};
