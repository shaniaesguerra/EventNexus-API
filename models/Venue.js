const { validateVenueServices } = require('../middleware/validate');
const mongoose = require('mongoose');

//Venue Schema
const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: { 
        type: String, 
        default: '' 
    },
    services: {
        type: [String],
        enum: ["food", "parking", "WIFI"],
        default: [],
        validate: {
            validator: validateVenueServices,
            message: "Services must only include any combination of the three: 'food', 'parking', 'WIFI'"
        }
    },
    capacity: {
        type: Number,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match:[ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address (e.g email@example.com)']
    }
},
    //Automatically updates: createdAt and updatedAt
    { timestamps: true });

module.exports = mongoose.model('Venue', venueSchema);
