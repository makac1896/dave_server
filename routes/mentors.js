const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Replace 'Mentor' with your schema's model name and import it
const Mentor = require('../models/mentorModel');
const Interest = require('../models/interestModel');
const Skill = require('../models/skillModel');
const School = require('../models/schoolModel');
const Student = require('../models/studentModel');

// Middleware to get a Mentor by ID
async function getMentorById(req, res, next) {
  let mentor;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    mentor = await Mentor.findById(id)
      .populate('skills')
      .populate('interests')
      .populate('school')
      .populate('mentees');
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.mentor = mentor;
  next();
}

// Getting all Mentors
router.get('/', async (req, res) => {
  try {
    const mentors = await Mentor.find()
      .populate('skills')
      .populate('interests')
      .populate('school')
      .populate('mentees');
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one Mentor
router.get('/:id', getMentorById, (req, res) => {
  res.json(res.mentor);
});

// Creating one Mentor
router.post('/', async (req, res) => {
  const { name, email, phone_number, skills, interests, school, mentees } = req.body;
  const newMentor = new Mentor({ name, email, phone_number, skills, interests, school, mentees: [], activeEssays: 0 });

  try {
    const savedMentor = await newMentor.save();
    // Populate the referenced fields before sending the response
    await savedMentor.populate('skills').populate('interests').populate('school').populate('mentees').execPopulate();
    res.status(201).json(savedMentor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one Mentor
router.patch('/:id', getMentorById, async (req, res) => {
  const { name, email, phone_number, skills, interests, school, mentees } = req.body;

  if (name != null) {
    res.mentor.name = name;
  }
  if (email != null) {
    res.mentor.email = email;
  }
  if (phone_number != null) {
    res.mentor.phone_number = phone_number;
  }
  if (skills != null) {
    res.mentor.skills = skills;
  }
  if (interests != null) {
    res.mentor.interests = interests;
  }
  if (school != null) {
    res.mentor.school = school;
  }
  if (mentees != null) {
    res.mentor.mentees = mentees;
  }

  try {
    const updatedMentor = await res.mentor.save();
    // Populate the referenced fields before sending the response
    await updatedMentor.populate('skills').populate('interests').populate('school').populate('mentees').execPopulate();
    res.json(updatedMentor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one Mentor
router.delete('/:id', getMentorById, async (req, res) => {
  try {
    await res.mentor.remove();
    res.json({ message: 'Deleted Mentor' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
