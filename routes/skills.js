const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import the Skill model
const Skill = require('../models/skillModel');

// Middleware to get a Skill by ID
async function getSkillById(req, res, next) {
  let skill;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.skill = skill;
  next();
}

// Getting all Skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one Skill
router.get('/:id', getSkillById, (req, res) => {
  res.json(res.skill);
});

// Creating one Skill
router.post('/', async (req, res) => {
  const { category, name, rating } = req.body;
  const newSkill = new Skill({ category, name, rating });

  try {
    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one Skill
router.patch('/:id', getSkillById, async (req, res) => {
  const { category, name, rating } = req.body;

  if (category != null) {
    res.skill.category = category;
  }
  if (name != null) {
    res.skill.name = name;
  }
  if (rating != null) {
    res.skill.rating = rating;
  }

  try {
    const updatedSkill = await res.skill.save();
    res.json(updatedSkill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one Skill
router.delete('/:id', getSkillById, async (req, res) => {
  try {
    await res.skill.remove();
    res.json({ message: 'Deleted Skill' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
