const express = require('express');

const router = express.Router();

const authenticate = require('../middleware/authenticate');

const {
    validateRegistration
} = require('../middleware/validate');

const {

    getAllRegistrations,
    getRegistrationById,
    createRegistration,
    updateRegistration,
    deleteRegistration

} = require('../controllers/registrations');

router.get('/', (req, res) => {

    //#swagger.tags = ['Registrations']
    //#swagger.summary = 'Get all registrations'

    getAllRegistrations(req, res);

});

router.get('/:id', (req, res) => {

    //#swagger.tags = ['Registrations']
    //#swagger.summary = 'Get registration by ID'

    getRegistrationById(req, res);

});

router.post(
    '/',

    authenticate,

    validateRegistration,

    (req, res) => {

        //#swagger.tags = ['Registrations']
        //#swagger.summary = 'Create registration'

        createRegistration(req, res);

    }
);

router.put(
    '/:id',

    authenticate,

    validateRegistration,

    (req, res) => {

        //#swagger.tags = ['Registrations']
        //#swagger.summary = 'Update registration'

        updateRegistration(req, res);

    }
);

router.delete('/:id', (req, res) => {

    //#swagger.tags = ['Registrations']
    //#swagger.summary = 'Delete registration'

    deleteRegistration(req, res);

});

module.exports = router;