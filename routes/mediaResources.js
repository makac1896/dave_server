const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Replace 'MediaResource' with your schema's model name and import it
const MediaResource = require('../models/mediaResourceModel');

// Middleware to get a MediaResource by ID
async function getMediaResourceById(req, res, next) {
  let mediaResource;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid ID' });
  }
  try {
    mediaResource = await MediaResource.findById(id).populate('similar_resources');
    if (!mediaResource) {
      return res.status(404).json({ message: 'MediaResource not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.mediaResource = mediaResource;
  next();
}

// Getting all MediaResources
router.get('/', async (req, res) => {
  try {
    const mediaResources = await MediaResource.find().populate('similar_resources');
    res.json(mediaResources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one MediaResource
router.get('/:id', getMediaResourceById, (req, res) => {
  res.json(res.mediaResource);
});

// Creating one MediaResource
router.post('/', async (req, res) => {
  const { name, type, description, similar_resources, url, skills, interests, schools } = req.body;
  const newMediaResource = new MediaResource({ name, type, description, similar_resources, url, skills, interests, schools });

  try {
    const savedMediaResource = await newMediaResource.save();
    // Populate the 'similar_resources' field before sending the response
    await savedMediaResource.populate('similar_resources').execPopulate();
    res.status(201).json(savedMediaResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one MediaResource
router.patch('/:id', getMediaResourceById, async (req, res) => {
  const { name, type, description, similar_resources, url, skills, interests, schools } = req.body;

  if (name != null) {
    res.mediaResource.name = name;
  }
  if (type != null) {
    res.mediaResource.type = type;
  }
  if (description != null) {
    res.mediaResource.description = description;
  }
  if (similar_resources != null) {
    res.mediaResource.similar_resources = similar_resources;
  }
  if (url != null) {
    res.mediaResource.url = url;
  }
  if (skills != null) {
    res.mediaResource.skills = skills;
  }
  if (interests != null) {
    res.mediaResource.interests = interests;
  }
  if(schools != null){
    res.mediaResource.schools = schools;
  }

  try {
    const updatedMediaResource = await res.mediaResource.save();
    // Populate the 'similar_resources' field before sending the response
    await updatedMediaResource.populate('similar_resources').execPopulate();
    res.json(updatedMediaResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one MediaResource
router.delete('/:id', getMediaResourceById, async (req, res) => {
  try {
    await res.mediaResource.remove();
    res.json({ message: 'Deleted MediaResource' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
