const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import models
const Student = require('../models/studentModel');
const Skill = require('../models/skillModel');
const EducationProfile = require('../models/educationProfileModel');
const Interest = require('../models/interestModel');
const School = require('../models/schoolModel');
const Counselor = require('../models/counselorModel');
const Mentor = require('../models/mentorModel');
const Essay = require('../models/essayModel');
const MockEssay = require('../models/mockEssayModel');
const LearningPlan = require('../models/learningPlanModel');

// Middleware to get a Student by ID
async function getStudentById(req, res, next) {
  let student;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    student = await Student.findById(id)
      .populate('skills')
      .populate('education_profile')
      .populate('interests')
      .populate('schools')
      .populate('counselor')
      .populate('mentor')
      .populate('essays')
      .populate('mock_essay')
      .populate('learning_plan');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.student = student;
  next();
}

// Getting all Students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find()
      .populate('skills')
      .populate('education_profile')
      .populate('interests')
      .populate('schools')
      .populate('counselor')
      .populate('mentor')
      .populate('essays')
      .populate('mock_essay')
      .populate('learning_plan');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one Student
router.get('/:id', getStudentById, (req, res) => {
  res.json(res.student);
});

// Creating one Student
router.post('/', async (req, res) => {
  const { name, email, phone_number, skills, education_profile, interests, schools, counselor, mentor, essays, mock_essay, learning_plan } = req.body;
  const newStudent = new Student({ name, email, phone_number, skills, education_profile, interests, schools, counselor, mentor, essays, mock_essay, learning_plan });

  try {
    const savedStudent = await newStudent.save();
    // Populate fields before sending the response
    await savedStudent
      .populate('skills')
      .populate('education_profile')
      .populate('interests')
      .populate('schools')
      .populate('counselor')
      .populate('mentor')
      .populate('essays')
      .populate('mock_essay')
      .populate('learning_plan')
      .execPopulate();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one Student
router.patch('/:id', getStudentById, async (req, res) => {
  const { name, email, phone_number, skills, education_profile, interests, schools, counselor, mentor, essays, mock_essay, learning_plan } = req.body;

  if (name != null) {
    res.student.name = name;
  }
  if (email != null) {
    res.student.email = email;
  }
  if (phone_number != null) {
    res.student.phone_number = phone_number;
  }
  if (skills != null) {
    res.student.skills = skills;
  }
  if (education_profile != null) {
    res.student.education_profile = education_profile;
  }
  if (interests != null) {
    res.student.interests = interests;
  }
  if (schools != null) {
    res.student.schools = schools;
  }
  if (counselor != null) {
    res.student.counselor = counselor;
  }
  if (mentor != null) {
    res.student.mentor = mentor;
  }
  if (essays != null) {
    res.student.essays = essays;
  }
  if (mock_essay != null) {
    res.student.mock_essay = mock_essay;
  }
  if (learning_plan != null) {
    res.student.learning_plan = learning_plan;
  }

  try {
    const updatedStudent = await res.student.save();
    // Populate fields before sending the response
    await updatedStudent
      .populate('skills')
      .populate('education_profile')
      .populate('interests')
      .populate('schools')
      .populate('counselor')
      .populate('mentor')
      .populate('essays')
      .populate('mock_essay')
      .populate('learning_plan')
      .execPopulate();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one Student
router.delete('/:id', getStudentById, async (req, res) => {
  try {
    await res.student.remove();
    res.json({ message: 'Deleted Student' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
