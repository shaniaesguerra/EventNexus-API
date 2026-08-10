const mongoose = require('mongoose');
const Event = require('../models/Event');
const { validateObjectId } = require('../middleware/validate');

const getAllEvents = async (req, res) => {
  console.log('getAllEvents called, mongoose readyState=', mongoose.connection.readyState, 'Event connection readyState=', Event.db.readyState);
  try {
    const events = await Event.find().sort({ date: 1 });
    console.log('getAllEvents retrieved', events.length, 'records');
    return res.json(events);
  } catch (error) {
    console.error('getAllEvents error', error.message);
    return res.status(500).json({ error: 'Unable to fetch events', details: error.message });
  }
};

const getEventById = async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({ error: 'Invalid event ID' });
  }

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    return res.json(event);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to fetch event', details: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    return res.status(201).json(event);
  } catch (error) {
    return res.status(400).json({ error: 'Unable to create event', details: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({ error: 'Invalid event ID' });
  }

  try {
    const event = await Event.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    return res.json(event);
  } catch (error) {
    return res.status(400).json({ error: 'Unable to update event', details: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({ error: 'Invalid event ID' });
  }

  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    return res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Unable to delete event', details: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
