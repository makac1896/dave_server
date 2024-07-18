const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackModel');
const Reviewer = require('../models/reviewerModel');

// Getting all Feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One Feedback
router.get('/:id', getFeedback, (req, res) => {
  res.json(res.feedback);
});

// Creating One Feedback
router.post('/', async (req, res) => {
  const { reviewer, body } = req.body;

  if (!reviewer || !body) {
    return res.status(400).json({ message: 'Please provide both reviewer and body' });
  }

  try {
    const newFeedback = new Feedback({
      reviewer,
      body,
      timestamp: new Date()
    });

    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One Feedback
router.patch('/:id', getFeedback, async (req, res) => {
  const { body } = req.body;

  if (body != null) {
    res.feedback.body = body;
    res.feedback.timestamp = new Date();
  }

  try {
    const updatedFeedback = await res.feedback.save();
    res.json(updatedFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One Feedback
router.delete('/:id', getFeedback, async (req, res) => {
  try {
    await res.feedback.remove();
    res.json({ message: 'Deleted Feedback' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get Feedback by ID
async function getFeedback(req, res, next) {
  let feedback;
  try {
    feedback = await Feedback.findById(req.params.id);
    if (feedback == null) {
      return res.status(404).json({ message: 'Cannot find Feedback' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.feedback = feedback;
  next();
}

module.exports = router;
