const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        registrationDate: {
            type: Date,
            default: Date.now
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        ticketType: {
            type: String,
            enum: ['Regular', 'VIP', 'VVIP'],
            default: 'Regular'
        },

        totalPrice: {
            type: Number,
            required: true,
            min: 0
        },

        ticketStatus: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Cancelled'],
            default: 'Pending'
        }

    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Registration', registrationSchema);