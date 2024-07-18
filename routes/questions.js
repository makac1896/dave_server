const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('../models/questionModel');
const Student = require('../models/studentModel'); // Ensure studentModel is correctly imported

// Middleware to get a Question by ID
async function getQuestionById(req, res, next) {
  let question;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    question = await Question.findById(id).populate('author');
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.question = question;
  next();
}

// Getting all Questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().populate('author');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one Question
router.get('/:id', getQuestionById, (req, res) => {
  res.json(res.question);
});

// Creating one Question
router.post('/', async (req, res) => {
  const { content, author, timestamp } = req.body;
  const newQuestion = new Question({ content, author, timestamp });

  try {
    const savedQuestion = await newQuestion.save();
    // Populate the 'author' field before sending the response
    await savedQuestion.populate('author').execPopulate();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one Question
router.patch('/:id', getQuestionById, async (req, res) => {
  const { content, author, timestamp } = req.body;

  if (content != null) {
    res.question.content = content;
  }
  if (author != null) {
    res.question.author = author;
  }
  if (timestamp != null) {
    res.question.timestamp = timestamp;
  }

  try {
    const updatedQuestion = await res.question.save();
    // Populate the 'author' field before sending the response
    await updatedQuestion.populate('author').execPopulate();
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one Question
router.delete('/:id', getQuestionById, async (req, res) => {
  try {
    await res.question.remove();
    res.json({ message: 'Deleted Question' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
