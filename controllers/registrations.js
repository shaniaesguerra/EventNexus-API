const mongoose = require('mongoose');
const Registration = require('../models/Registration');
const Event = require('../models/Event');

const validateObjectId = (id) => mongoose.isValidObjectId(id);

const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find()
            .populate('eventId')
            .populate('userId')
            .sort({ registrationDate: -1 });

        return res.json(registrations);
    } catch (error) {
        return res.status(500).json({
            error: 'Unable to fetch registrations',
            details: error.message,
        });
    }
};

const getRegistrationById = async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return res.status(400).json({
            error: 'Invalid registration ID',
        });
    }

    try {
        const registration = await Registration.findById(id)
            .populate('eventId')
            .populate('userId');

        if (!registration) {
            return res.status(404).json({
                error: 'Registration not found',
            });
        }

        return res.json(registration);
    } catch (error) {
        return res.status(500).json({
            error: 'Unable to fetch registration',
            details: error.message,
        });
    }
};

const createRegistration = async (req, res) => {
    try {
        const event = await Event.findById(req.body.eventId);

        if (!event) {
            return res.status(404).json({
                error: 'Event not found',
            });
        }

        const totalPrice = event.price * req.body.quantity;

        const registration = new Registration({
            ...req.body,
            totalPrice,
        });

        await registration.save();

        return res.status(201).json(registration);
    } catch (error) {
        return res.status(400).json({
            error: 'Unable to create registration',
            details: error.message,
        });
    }
};

const updateRegistration = async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return res.status(400).json({
            error: 'Invalid registration ID',
        });
    }

    try {
        const existingRegistration = await Registration.findById(id);

        if (!existingRegistration) {
            return res.status(404).json({
                error: 'Registration not found',
            });
        }

        let totalPrice = existingRegistration.totalPrice;

        if (
            req.body.quantity !== undefined ||
            req.body.eventId !== undefined
        ) {
            const eventId = req.body.eventId || existingRegistration.eventId;

            const event = await Event.findById(eventId);

            if (!event) {
                return res.status(404).json({
                    error: 'Event not found',
                });
            }

            const quantity =
                req.body.quantity || existingRegistration.quantity;

            totalPrice = event.price * quantity;
        }

        const registration = await Registration.findByIdAndUpdate(
            id,
            {
                ...req.body,
                totalPrice,
            },
            {
                returnDocument: 'after',
                runValidators: true,
            }
        );

        return res.json(registration);
    } catch (error) {
        return res.status(400).json({
            error: 'Unable to update registration',
            details: error.message,
        });
    }
};

// Delete registration
const deleteRegistration = async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return res.status(400).json({
            error: 'Invalid registration ID',
        });
    }

    try {
        const registration = await Registration.findByIdAndDelete(id);

        if (!registration) {
            return res.status(404).json({
                error: 'Registration not found',
            });
        }

        return res.json({
            message: 'Registration deleted successfully',
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Unable to delete registration',
            details: error.message,
        });
    }
};

module.exports = {
    getAllRegistrations,
    getRegistrationById,
    createRegistration,
    updateRegistration,
    deleteRegistration,
};