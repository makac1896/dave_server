const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Replace 'LearningPlan' with your schema's model name and import it
const LearningPlan = require('../models/learningPlanModel');
const MediaResource = require('../models/mediaResourceModel');
const Mentor = require('../models/mentorModel');
const Student = require('../models/studentModel');
const WritingStrategy = require('../models/writingStrategyModel');
const { getInterestsById } = require('../utils/interests');
const { getSkillsById } = require('../utils/skills');

// Middleware to get a LearningPlan by ID
async function getLearningPlanById(req, res, next) {
  let learningPlan;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    learningPlan = await LearningPlan.findById(id)
      .populate('student')
      .populate('resources')
      .populate('mentorship_plan')
      .populate('writing_strategies');
    if (!learningPlan) {
      return res.status(404).json({ message: 'LearningPlan not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.learningPlan = learningPlan;
  next();
}

// Getting all LearningPlans
router.get('/', async (req, res) => {
  try {
    const learningPlans = await LearningPlan.find()
      .populate('student')
      .populate('resources')
      .populate('mentorship_plan')
      .populate('writing_strategies');
    res.json(learningPlans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one LearningPlan
router.get('/:id', getLearningPlanById, (req, res) => {
  res.json(res.learningPlan);
});

// Creating one LearningPlan
router.post('/', async (req, res) => {
  const { student, resources, mentorship_plan, writing_strategies } = req.body;
  let processedResources = resources.map(resource => { return { resource: resource, viewed: false } });
  const newLearningPlan = new LearningPlan({ student, resources: processedResources, mentorship_plan, writing_strategies });

  try {
    const savedLearningPlan = await newLearningPlan.save();
    // Populate the referenced fields before sending the response
    await savedLearningPlan.populate('student').populate('resources').populate('mentorship_plan').populate('writing_strategies').execPopulate();
    res.status(201).json(savedLearningPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one LearningPlan
router.patch('/:id', getLearningPlanById, async (req, res) => {
  const { student, resources, mentorship_plan, writing_strategies } = req.body;
  let processedResources = resources.map(resource => { return { resource: resource, viewed: false } });


  if (student != null) {
    res.learningPlan.student = student;
  }
  if (processedResources != null) {
    res.learningPlan.resources = resources;
  }
  if (mentorship_plan != null) {
    res.learningPlan.mentorship_plan = mentorship_plan;
  }
  if (writing_strategies != null) {
    res.learningPlan.writing_strategies = writing_strategies;
  }

  try {
    const updatedLearningPlan = await res.learningPlan.save();
    // Populate the referenced fields before sending the response
    await updatedLearningPlan.populate('student').populate('resources').populate('mentorship_plan').populate('writing_strategies').execPopulate();

    console.log('Updated learning plan', updatedLearningPlan);
  
    let formattedPlan = {
      mentorship_plan: {
        interests: updatedLearningPlan.mentorship_plan.interests.map(interest => { return getInterestsById(interest) }),
        skills: updatedLearningPlan.mentorship_plan.skills.map(skill => { return getSkillsById(skill) }),
    }
  };


    res.json(updatedLearningPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one LearningPlan
router.delete('/:id', getLearningPlanById, async (req, res) => {
  try {
    await res.learningPlan.remove();
    res.json({ message: 'Deleted LearningPlan' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
