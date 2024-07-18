const express = require('express');
const router = express.Router();
const ApplicationRequirement = require('../models/applicationRequirementModel');

// Middleware to get ApplicationRequirement by ID
async function getApplicationRequirement(req, res, next) {
  let requirement;
  try {
    requirement = await ApplicationRequirement.findById(req.params.id);
    if (!requirement) {
      return res.status(404).json({ message: 'Application requirement not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.requirement = requirement;
  next();
}

// Getting all ApplicationRequirements
router.get('/', async (req, res) => {
  try {
    const requirements = await ApplicationRequirement.find();
    res.json(requirements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One ApplicationRequirement
router.get('/:id', getApplicationRequirement, (req, res) => {
  res.json(res.requirement);
});

// Creating One ApplicationRequirement
router.post('/', async (req, res) => {
  const { name, deadline, category, status } = req.body;
  const requirement = new ApplicationRequirement({ name, deadline, category, status });
  try {
    const newRequirement = await requirement.save();
    res.status(201).json(newRequirement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One ApplicationRequirement
router.patch('/:id', getApplicationRequirement, async (req, res) => {
  const { name, deadline, category, status } = req.body;
  if (name != null) {
    res.requirement.name = name;
  }
  if (deadline != null) {
    res.requirement.deadline = deadline;
  }
  if (category != null) {
    res.requirement.category = category;
  }
  if (status != null) {
    res.requirement.status = status;
  }
  try {
    const updatedRequirement = await res.requirement.save();
    res.json(updatedRequirement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One ApplicationRequirement
router.delete('/:id', getApplicationRequirement, async (req, res) => {
  try {
    await res.requirement.remove();
    res.json({ message: 'Application requirement deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
