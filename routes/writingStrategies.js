const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const WritingStrategy = require('../models/writingStrategyModel');

// Middleware to get a WritingStrategy by ID
async function getWritingStrategyById(req, res, next) {
  let writingStrategy;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    writingStrategy = await WritingStrategy.findById(id);
    if (!writingStrategy) {
      return res.status(404).json({ message: 'Writing Strategy not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.writingStrategy = writingStrategy;
  next();
}

// Getting all WritingStrategies
router.get('/', async (req, res) => {
  try {
    const writingStrategies = await WritingStrategy.find();
    res.json(writingStrategies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one WritingStrategy
router.get('/:id', getWritingStrategyById, (req, res) => {
  res.json(res.writingStrategy);
});

// Creating one WritingStrategy
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const newWritingStrategy = new WritingStrategy({ title, description });

  try {
    const savedWritingStrategy = await newWritingStrategy.save();
    res.status(201).json(savedWritingStrategy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one WritingStrategy
router.patch('/:id', getWritingStrategyById, async (req, res) => {
  const { title, description } = req.body;

  if (title != null) {
    res.writingStrategy.title = title;
  }
  if (description != null) {
    res.writingStrategy.description = description;
  }

  try {
    const updatedWritingStrategy = await res.writingStrategy.save();
    res.json(updatedWritingStrategy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one WritingStrategy
router.delete('/:id', getWritingStrategyById, async (req, res) => {
  try {
    await res.writingStrategy.remove();
    res.json({ message: 'Deleted Writing Strategy' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
