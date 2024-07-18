const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Replace 'MediaFile' with your schema's model name and import it
const MediaFile = require('../models/mediaFileModel');

// Middleware to get a MediaFile by ID
async function getMediaFileById(req, res, next) {
  let mediaFile;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    mediaFile = await MediaFile.findById(id);
    if (!mediaFile) {
      return res.status(404).json({ message: 'MediaFile not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.mediaFile = mediaFile;
  next();
}

// Getting all MediaFiles
router.get('/', async (req, res) => {
  try {
    const mediaFiles = await MediaFile.find();
    res.json(mediaFiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one MediaFile
router.get('/:id', getMediaFileById, (req, res) => {
  res.json(res.mediaFile);
});

// Creating one MediaFile
router.post('/', async (req, res) => {
  const { name, type, size } = req.body;
  const newMediaFile = new MediaFile({ name, type, size });

  try {
    const savedMediaFile = await newMediaFile.save();
    res.status(201).json(savedMediaFile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one MediaFile
router.patch('/:id', getMediaFileById, async (req, res) => {
  const { name, type, size } = req.body;

  if (name != null) {
    res.mediaFile.name = name;
  }
  if (type != null) {
    res.mediaFile.type = type;
  }
  if (size != null) {
    res.mediaFile.size = size;
  }

  try {
    const updatedMediaFile = await res.mediaFile.save();
    res.json(updatedMediaFile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one MediaFile
router.delete('/:id', getMediaFileById, async (req, res) => {
  try {
    await res.mediaFile.remove();
    res.json({ message: 'Deleted MediaFile' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
