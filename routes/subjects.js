const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Subject = require('../models/subjectModel');

// Middleware to get a Subject by ID
async function getSubjectById(req, res, next) {
  let subject;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.subject = subject;
  next();
}

// Getting all Subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one Subject
router.get('/:id', getSubjectById, (req, res) => {
  res.json(res.subject);
});

// Creating one Subject
router.post('/', async (req, res) => {
  const { name, level, grade } = req.body;
  const newSubject = new Subject({ name, level, grade });

  try {
    const savedSubject = await newSubject.save();
    res.status(201).json(savedSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one Subject
router.patch('/:id', getSubjectById, async (req, res) => {
  const { name, level, grade } = req.body;

  if (name != null) {
    res.subject.name = name;
  }
  if (level != null) {
    res.subject.level = level;
  }
  if (grade != null) {
    res.subject.grade = grade;
  }

  try {
    const updatedSubject = await res.subject.save();
    res.json(updatedSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one Subject
router.delete('/:id', getSubjectById, async (req, res) => {
  try {
    await res.subject.remove();
    res.json({ message: 'Deleted Subject' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
