const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import models
const School = require('../models/schoolModel');
const ContactPerson = require('../models/contactPersonModel');
const ApplicationRequirement = require('../models/applicationRequirementModel');
const Review = require('../models/reviewModel');

// Middleware to get a School by ID
async function getSchoolById(req, res, next) {
  let school;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    school = await School.findById(id)
      .populate('contact_persons')
      .populate('application_requirements')
      .populate('reviews');
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.school = school;
  next();
}

// Getting all Schools
router.get('/', async (req, res) => {
  try {
    const schools = await School.find()
      .populate('contact_persons')
      .populate('application_requirements')
      .populate('reviews');
    res.json(schools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one School
router.get('/:id', getSchoolById, (req, res) => {
  res.json(res.school);
});

// Creating one School
router.post('/', async (req, res) => {
  const { name, contact_persons, application_requirements, address, reviews } = req.body;
  const newSchool = new School({ name, contact_persons, application_requirements, address, reviews });

  try {
    const savedSchool = await newSchool.save();
    // Populate fields before sending the response
    await savedSchool
      .populate('contact_persons')
      .populate('application_requirements')
      .populate('reviews')
      .execPopulate();
    res.status(201).json(savedSchool);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one School
router.patch('/:id', getSchoolById, async (req, res) => {
  const { name, contact_persons, application_requirements, address, reviews } = req.body;

  if (name != null) {
    res.school.name = name;
  }
  if (contact_persons != null) {
    res.school.contact_persons = contact_persons;
  }
  if (application_requirements != null) {
    res.school.application_requirements = application_requirements;
  }
  if (address != null) {
    res.school.address = address;
  }
  if (reviews != null) {
    res.school.reviews = reviews;
  }

  try {
    const updatedSchool = await res.school.save();
    // Populate fields before sending the response
    await updatedSchool
      .populate('contact_persons')
      .populate('application_requirements')
      .populate('reviews')
      .execPopulate();
    res.json(updatedSchool);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one School
router.delete('/:id', getSchoolById, async (req, res) => {
  try {
    await res.school.remove();
    res.json({ message: 'Deleted School' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
