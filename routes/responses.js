const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Replace 'Response' with your schema's model name and import it
const Response = require('../models/responseModel');
const Mentor = require('../models/mentorModel'); // Ensure mentorModel is correctly imported

// Middleware to get a Response by ID
async function getResponseById(req, res, next) {
  let response;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    response = await Response.findById(id).populate('author');
    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.response = response;
  next();
}

// Getting all Responses
router.get('/', async (req, res) => {
  try {
    const responses = await Response.find().populate('author');
    res.json(responses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one Response
router.get('/:id', getResponseById, (req, res) => {
  res.json(res.response);
});

// Creating one Response
router.post('/', async (req, res) => {
  const { content, author, timestamp } = req.body;
  const newResponse = new Response({ content, author, timestamp });

  try {
    const savedResponse = await newResponse.save();
    // Populate the 'author' field before sending the response
    await savedResponse.populate('author').execPopulate();
    res.status(201).json(savedResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one Response
router.patch('/:id', getResponseById, async (req, res) => {
  const { content, author, timestamp } = req.body;

  if (content != null) {
    res.response.content = content;
  }
  if (author != null) {
    res.response.author = author;
  }
  if (timestamp != null) {
    res.response.timestamp = timestamp;
  }

  try {
    const updatedResponse = await res.response.save();
    // Populate the 'author' field before sending the response
    await updatedResponse.populate('author').execPopulate();
    res.json(updatedResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one Response
router.delete('/:id', getResponseById, async (req, res) => {
  try {
    await res.response.remove();
    res.json({ message: 'Deleted Response' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
