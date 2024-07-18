const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import models
const Review = require('../models/reviewModel');
const User = require('../models/userModel');

// Middleware to get a Review by ID
async function getReviewById(req, res, next) {
  let review;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    review = await Review.findById(id).populate('author');
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.review = review;
  next();
}

// Getting all Reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('author');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one Review
router.get('/:id', getReviewById, (req, res) => {
  res.json(res.review);
});

// Creating one Review
router.post('/', async (req, res) => {
  const { author, body, timestamp } = req.body;
  const newReview = new Review({ author, body, timestamp });

  try {
    const savedReview = await newReview.save();
    // Populate the 'author' field before sending the response
    await savedReview.populate('author').execPopulate();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one Review
router.patch('/:id', getReviewById, async (req, res) => {
  const { author, body, timestamp } = req.body;

  if (author != null) {
    res.review.author = author;
  }
  if (body != null) {
    res.review.body = body;
  }
  if (timestamp != null) {
    res.review.timestamp = timestamp;
  }

  try {
    const updatedReview = await res.review.save();
    // Populate the 'author' field before sending the response
    await updatedReview.populate('author').execPopulate();
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one Review
router.delete('/:id', getReviewById, async (req, res) => {
  try {
    await res.review.remove();
    res.json({ message: 'Deleted Review' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
