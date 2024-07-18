const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MockEssay = require('../models/mockEssayModel');
const Student = require('../models/studentModel'); // Ensure studentModel is correctly imported

// Middleware to get a MockEssay by ID
async function getMockEssayById(req, res, next) {
  let mockEssay;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    mockEssay = await MockEssay.findById(id).populate('author');
    if (!mockEssay) {
      return res.status(404).json({ message: 'MockEssay not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.mockEssay = mockEssay;
  next();
}

// Getting all MockEssays
router.get('/', async (req, res) => {
  try {
    const mockEssays = await MockEssay.find().populate('author');
    res.json(mockEssays);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one MockEssay
router.get('/:id', getMockEssayById, (req, res) => {
  res.json(res.mockEssay);
});

// Creating one MockEssay
router.post('/', async (req, res) => {
  const { title, body, author, timestamp } = req.body;
  const newMockEssay = new MockEssay({ title, body, author, timestamp });

  try {
    const savedMockEssay = await newMockEssay.save();
    // Populate the 'author' field before sending the response
    await savedMockEssay.populate('author').execPopulate();
    res.status(201).json(savedMockEssay);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one MockEssay
router.patch('/:id', getMockEssayById, async (req, res) => {
  const { title, body, author, timestamp } = req.body;

  if (title != null) {
    res.mockEssay.title = title;
  }
  if (body != null) {
    res.mockEssay.body = body;
  }
  if (author != null) {
    res.mockEssay.author = author;
  }
  if (timestamp != null) {
    res.mockEssay.timestamp = timestamp;
  }

  try {
    const updatedMockEssay = await res.mockEssay.save();
    // Populate the 'author' field before sending the response
    await updatedMockEssay.populate('author').execPopulate();
    res.json(updatedMockEssay);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one MockEssay
router.delete('/:id', getMockEssayById, async (req, res) => {
  try {
    await res.mockEssay.remove();
    res.json({ message: 'Deleted MockEssay' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
