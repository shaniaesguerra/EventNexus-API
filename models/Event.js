const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  date: { type: Date, required: true },
  time: { type: String, default: '' },
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, default: '' },
  capacity: { type: Number, default: 0 },
  age: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
    default: 'Upcoming',
  },
}, { timestamps: true });

module.exports = mongoose.models.Event || mongoose.model('Event', eventSchema);
