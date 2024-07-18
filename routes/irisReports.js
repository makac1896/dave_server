const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Replace 'IrisReport' with your schema's model name and import it
const IrisReport = require('../models/irisReportModel');
const Essay = require('../models/essayModel'); // Import the Essay model

// Middleware to get an IrisReport by ID
async function getIrisReportById(req, res, next) {
  let irisReport;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    irisReport = await IrisReport.findById(id).populate('essay'); // Populate the 'essay' field
    if (!irisReport) {
      return res.status(404).json({ message: 'IrisReport not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.irisReport = irisReport;
  next();
}

// Getting all IrisReports
router.get('/', async (req, res) => {
  try {
    const irisReports = await IrisReport.find().populate('essay'); // Populate the 'essay' field
    res.json(irisReports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one IrisReport
router.get('/:id', getIrisReportById, (req, res) => {
  res.json(res.irisReport);
});

// Creating one IrisReport
router.post('/', async (req, res) => {
  const { essay, common_errors, thematic_issues, structural_concerns, timestamp } = req.body;
  const newIrisReport = new IrisReport({ essay, common_errors, thematic_issues, structural_concerns, timestamp });

  try {
    const savedIrisReport = await newIrisReport.save();
    // Populate the 'essay' field before sending the response
    await savedIrisReport.populate('essay').execPopulate();
    res.status(201).json(savedIrisReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one IrisReport
router.patch('/:id', getIrisReportById, async (req, res) => {
  const { essay, common_errors, thematic_issues, structural_concerns, timestamp } = req.body;

  if (essay != null) {
    res.irisReport.essay = essay;
  }
  if (common_errors != null) {
    res.irisReport.common_errors = common_errors;
  }
  if (thematic_issues != null) {
    res.irisReport.thematic_issues = thematic_issues;
  }
  if (structural_concerns != null) {
    res.irisReport.structural_concerns = structural_concerns;
  }
  if (timestamp != null) {
    res.irisReport.timestamp = timestamp;
  }

  try {
    const updatedIrisReport = await res.irisReport.save();
    // Populate the 'essay' field before sending the response
    await updatedIrisReport.populate('essay').execPopulate();
    res.json(updatedIrisReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one IrisReport
router.delete('/:id', getIrisReportById, async (req, res) => {
  try {
    await res.irisReport.remove();
    res.json({ message: 'Deleted IrisReport' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
