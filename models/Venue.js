const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, default: '' },
  services: { type: [String], default: [] },
  capacity: { type: Number, default: 0 },
  contactNumber: { type: String, default: '' },
  contactEmail: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.models.Venue || mongoose.model('Venue', venueSchema);
