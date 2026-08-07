const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

const router = express.Router();

router.get('/', (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.summary = 'Get all users'
  //#swagger.responses[200] = {"description": "List of users","schema": [ { "$ref": "#/definitions/User" } ]}
  getAllUsers(req, res);
});

router.get('/:id', (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.summary = 'Get user by ID'
  //#swagger.parameters['id'] = { "in": "path", "description": "User ID", "required": true, "type": "string" }
  //#swagger.responses[200] = { "description": "User found", "schema": { "$ref": "#/definitions/User" } }
  //#swagger.responses[404] = { "description": "User not found" }
  getUserById(req, res);
});

router.post('/', (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.summary = 'Create a new user'
  //#swagger.parameters['body'] = { "in": "body", "description": "User payload", "required": true, "schema": { "$ref": "#/definitions/UserInput" } }
  //#swagger.responses[201] = { "description": "User created", "schema": { "$ref": "#/definitions/User" } }
  //#swagger.responses[400] = { "description": "Bad Request" }
  createUser(req, res);
});

router.put('/:id', (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.summary = 'Update user'
  //#swagger.parameters['id'] = { "in": "path", "description": "User ID", "required": true, "type": "string" }
  //#swagger.parameters['body'] = { "in": "body", "description": "Updated user payload", "required": true, "schema": { "$ref": "#/definitions/UserInput" } }
  //#swagger.responses[200] = { "description": "User updated", "schema": { "$ref": "#/definitions/User" } }
  //#swagger.responses[404] = { "description": "User not found" }
  updateUser(req, res);
});

router.delete('/:id', (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.summary = 'Delete a user'
  //#swagger.parameters['id'] = { "in": "path", "description": "User ID", "required": true, "type": "string" }
  //#swagger.responses[200] = { "description": "User deleted" }
  //#swagger.responses[404] = { "description": "User not found" }
  deleteUser(req, res);
});

module.exports = router;
