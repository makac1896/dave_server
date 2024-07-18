const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Interest = require('../models/interestModel');

// Middleware to get an interest by ID
async function getInterestById(req, res, next) {
  let interest;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    interest = await Interest.findById(id);
    if (!interest) {
      return res.status(404).json({ message: 'Interest not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.interest = interest;
  next();
}

// Getting all interests
router.get('/', async (req, res) => {
  try {
    const interests = await Interest.find();
    res.json(interests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one interest
router.get('/:id', getInterestById, (req, res) => {
  res.json(res.interest);
});

// Creating one interest
router.post('/', async (req, res) => {
  const { category, name, level } = req.body;
  const newInterest = new Interest({ category, name, level });

  try {
    const savedInterest = await newInterest.save();
    res.status(201).json(savedInterest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one interest
router.patch('/:id', getInterestById, async (req, res) => {
  const { category, name, level } = req.body;

  if (category != null) {
    res.interest.category = category;
  }
  if (name != null) {
    res.interest.name = name;
  }
  if (level != null) {
    res.interest.level = level;
  }

  try {
    const updatedInterest = await res.interest.save();
    res.json(updatedInterest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one interest
router.delete('/:id', getInterestById, async (req, res) => {
  try {
    await res.interest.remove();
    res.json({ message: 'Deleted interest' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
