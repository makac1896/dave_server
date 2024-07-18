const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import models
const Reviewer = require('../models/reviewerModel');
const Skill = require('../models/skillModel');

// Middleware to get a Reviewer by ID
async function getReviewerById(req, res, next) {
  let reviewer;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    reviewer = await Reviewer.findById(id).populate('skills');
    if (!reviewer) {
      return res.status(404).json({ message: 'Reviewer not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.reviewer = reviewer;
  next();
}

// Getting all Reviewers
router.get('/', async (req, res) => {
  try {
    const reviewers = await Reviewer.find().populate('skills');
    res.json(reviewers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one Reviewer
router.get('/:id', getReviewerById, (req, res) => {
  res.json(res.reviewer);
});

// Creating one Reviewer
router.post('/', async (req, res) => {
  const { name, email, skills } = req.body;
  const newReviewer = new Reviewer({ name, email, skills });

  try {
    const savedReviewer = await newReviewer.save();
    // Populate the 'skills' field before sending the response
    await savedReviewer.populate('skills').execPopulate();
    res.status(201).json(savedReviewer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one Reviewer
router.patch('/:id', getReviewerById, async (req, res) => {
  const { name, email, skills } = req.body;

  if (name != null) {
    res.reviewer.name = name;
  }
  if (email != null) {
    res.reviewer.email = email;
  }
  if (skills != null) {
    res.reviewer.skills = skills;
  }

  try {
    const updatedReviewer = await res.reviewer.save();
    // Populate the 'skills' field before sending the response
    await updatedReviewer.populate('skills').execPopulate();
    res.json(updatedReviewer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one Reviewer
router.delete('/:id', getReviewerById, async (req, res) => {
  try {
    await res.reviewer.remove();
    res.json({ message: 'Deleted Reviewer' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
