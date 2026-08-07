const mongoose = require('mongoose');
const User = require('../models/User');

const validateObjectId = (id) => mongoose.isValidObjectId(id);

const getAllUsers = async (req, res) => {
  console.log('getAllUsers called, mongoose readyState=', mongoose.connection.readyState, 'User connection readyState=', User.db.readyState);
  try {
    const users = await User.find().sort({ createdAt: 1 });
    console.log('getAllUsers retrieved', users.length, 'records');
    return res.json(users);
  } catch (error) {
    console.error('getAllUsers error', error.message);
    return res.status(500).json({ error: 'Unable to fetch users', details: error.message });
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({ error: 'Invalid User ID' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to fetch User', details: error.message });
  }
};
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: 'Unable to create user', details: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({ error: 'Invalid User ID' });
  }

  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: 'Unable to update user', details: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!validateObjectId(id)) {
    return res.status(400).json({ error: 'Invalid User ID' });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Unable to delete user', details: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
