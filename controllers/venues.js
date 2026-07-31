const mongoose = require('mongoose');
const Venue = require('../models/Venue');
const { isValidObjectId } = require('../middleware/validate');

// POST /venues
const createVenue = async (req, res) => {
    try {
        const venue = await Venue.create(req.body);
        res.status(201).json(venue);
    } catch (error) {
        res.status(400).json({ error: 'Unable to create venue', details: error.message });
    }
};

// GET /venues
const getVenues = async (req, res) => {
    try {
        const venues = await Venue.find();
        res.status(200).json(venues);
    } catch (error) {
        res.status(500).json({ error: 'Unable to get venues', details: error.message });
    }
};

// GET /venues/:id
const getVenueById = async (req, res) => {
    const venueId = req.params.id;
    try {
        if (!isValidObjectId(venueId)) {
            return res.status(400).json({ error: 'Invalid venue ID', details: error.message });
        }
        const venue = await Venue.findById(venueId);
        res.status(200).json(venue);
    } catch (error) {
        res.status(500).json({ error: 'Unable to get venues by ID', details: error.message });
    }
};

// PUT /venues/:id
const updateVenue = async (req, res) => {
    const venueId = req.params.id;
    const data = req.body;
    try {
        if (!isValidObjectId(venueId)) {
            return res.status(400).json({ error: 'Invalid venue ID', details: error.message });
        }

        const venue = await Venue.findByIdAndUpdate(
            venueId,
            data,
            { new: true, runValidators: true }
        );

        if (!venue) {
            return res.status(404).json({ error: 'Venue Not Found', error: error.message });
        }

        res.status(200).json(venue);
    } catch (error) {
        res.status(400).json({ error: 'Unable to update venue', error: error.message });
    }
}

// DELETE /venues/:id
const deleteVenue = async (req, res) => {
    const venueId = req.params.id;
    try {
        if (!isValidObjectId(venueId)) {
            return res.status(400).json({ error: 'Invalid venue ID', details: error.message });
        }

        const venue = await Venue.findByIdAndDelete(venueId);

        if (!venue) {
            return res.status(404).json({ error: 'Venue Not Found', error: error.message });
        }

        res.status(200).json({ error: 'Venue deleted successfully', error: error.message });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete venue', error: error.message });
    }
}

module.exports = {
    createVenue,
    getVenues,
    getVenueById,
    updateVenue,
    deleteVenue
};