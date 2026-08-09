const mongoose = require('mongoose');

const isValidObjectId = function (id) {
    return mongoose.Types.ObjectId.isValid(id);
};

const validateRegistration = (req, res, next) => {
    const {
        eventId,
        userId,
        quantity,
        ticketType,
        ticketStatus,
    } = req.body;

    // Required fields for POST only
    if (req.method === 'POST') {
        if (!eventId || !userId || quantity === undefined) {
            return res.status(400).json({
                error: 'eventId, userId and quantity are required.',
            });
        }
    }

    // Validate the eventId
    if (
        eventId !== undefined &&
        !mongoose.Types.ObjectId.isValid(eventId)
    ) {
        return res.status(400).json({
            error: 'Invalid eventId.',
        });
    }

    // Validate the userId
    if (
        userId !== undefined &&
        !mongoose.Types.ObjectId.isValid(userId)
    ) {
        return res.status(400).json({
            error: 'Invalid userId.',
        });
    }

    // Validate the quantity
    if (
        quantity !== undefined &&
        (!Number.isInteger(quantity) || quantity < 1)
    ) {
        return res.status(400).json({
            error: 'Quantity must be a whole number greater than 0.',
        });
    }

    // Validate ticket type
    if (
        ticketType !== undefined &&
        !['Regular', 'VIP', 'VVIP'].includes(ticketType)
    ) {
        return res.status(400).json({
            error: 'Ticket type must be Regular, VIP or VVIP.',
        });
    }

    // Validate the ticket status
    if (
        ticketStatus !== undefined &&
        !['Pending', 'Confirmed', 'Cancelled'].includes(ticketStatus)
    ) {
        return res.status(400).json({
            error: 'Ticket status must be Pending, Confirmed or Cancelled.',
        });
    }

    next();
};

module.exports = {
    isValidObjectId,
    validateRegistration
};
