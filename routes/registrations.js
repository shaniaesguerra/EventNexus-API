const express = require('express');

const {
    getAllRegistrations,
    getRegistrationById,
    createRegistration,
    updateRegistration,
    deleteRegistration
} = require('../controllers/registrations');

const authenticate = require('../middleware/authenticate');

const {
    validateRegistration
} = require('../middleware/registrationValidation');

const router = express.Router();

router.get('/', (req, res) => {
    //#swagger.tags = ['Registrations']
    //#swagger.summary = 'Get all registrations'
    //#swagger.responses[200] = {"description": "List of registrations","schema": [ { "$ref": "#/definitions/Registration" } ]}
    getAllRegistrations(req, res);
});

router.get('/:id', (req, res) => {
    //#swagger.tags = ['Registrations']
    //#swagger.summary = 'Get registration by ID'
    //#swagger.parameters['id'] = { "in": "path", "description": "Registration ID", "required": true, "type": "string" }
    //#swagger.responses[200] = { "description": "Registration found", "schema": { "$ref": "#/definitions/Registration" } }
    //#swagger.responses[404] = { "description": "Registration not found" }
    getRegistrationById(req, res);
});

router.post('/', authenticate, validateRegistration, (req, res) => {
    //#swagger.tags = ['Registrations']
    //#swagger.summary = 'Create a new registration'
    //#swagger.parameters['body'] = { "in": "body", "description": "Registration payload", "required": true, "schema": { "$ref": "#/definitions/RegistrationInput" } }
    //#swagger.responses[201] = { "description": "Registration created", "schema": { "$ref": "#/definitions/Registration" } }
    //#swagger.responses[400] = { "description": "Bad Request" }
    createRegistration(req, res);
});

router.put('/:id', authenticate, validateRegistration, (req, res) => {
    //#swagger.tags = ['Registrations']
    //#swagger.summary = 'Update a registration'
    //#swagger.parameters['id'] = { "in": "path", "description": "Registration ID", "required": true, "type": "string" }
    //#swagger.parameters['body'] = { "in": "body", "description": "Updated registration payload", "required": true, "schema": { "$ref": "#/definitions/RegistrationInput" } }
    //#swagger.responses[200] = { "description": "Registration updated", "schema": { "$ref": "#/definitions/Registration" } }
    //#swagger.responses[404] = { "description": "Registration not found" }
    updateRegistration(req, res);
});

router.delete('/:id', authenticate, (req, res) => {
    //#swagger.tags = ['Registrations']
    //#swagger.summary = 'Delete a registration'
    //#swagger.parameters['id'] = { "in": "path", "description": "Registration ID", "required": true, "type": "string" }
    //#swagger.responses[200] = { "description": "Registration deleted" }
    //#swagger.responses[404] = { "description": "Registration not found" }
    deleteRegistration(req, res);
});

module.exports = router;