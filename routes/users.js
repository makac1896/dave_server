const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Middleware to get a User by ID
async function getUserById(req, res, next) {
  let user;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    user = await User.findById(id)
      .populate('student')
      .populate('counselor')
      .populate('mentor');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

// Getting all Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
      .populate('student')
      .populate('counselor')
      .populate('mentor');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one User
router.get('/:id', getUserById, (req, res) => {
  res.json(res.user);
});

// Creating one User
router.post('/', async (req, res) => {
  const { name, email, password, student, counselor, mentor } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    student,
    counselor,
    mentor
  });

  try {
    const savedUser = await newUser.save();
    // Populate fields before sending the response
    await savedUser
      .populate('student')
      .populate('counselor')
      .populate('mentor')
      .execPopulate();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one User
router.patch('/:id', getUserById, async (req, res) => {
  const { name, email, password, student, counselor, mentor } = req.body;

  if (name != null) {
    res.user.name = name;
  }
  if (email != null) {
    res.user.email = email;
  }
  if (password != null) {
    res.user.password = await bcrypt.hash(password, 10);
  }
  if (student != null) {
    res.user.student = student;
  }
  if (counselor != null) {
    res.user.counselor = counselor;
  }
  if (mentor != null) {
    res.user.mentor = mentor;
  }

  try {
    const updatedUser = await res.user.save();
    // Populate fields before sending the response
    await updatedUser
      .populate('student')
      .populate('counselor')
      .populate('mentor')
      .execPopulate();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one User
router.delete('/:id', getUserById, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Deleted User' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;