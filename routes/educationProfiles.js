const express = require('express');
const router = express.Router();
const EducationProfile = require('../models/educationProfileModel');
const Subject = require('../models/subjectModel'); // Assuming subject model is defined similarly

// Middleware to get EducationProfile by ID
async function getEducationProfile(req, res, next) {
    let educationProfile;
    try {
        educationProfile = await EducationProfile.findById(req.params.id)
                               .populate('subjects_taken'); // Populate subjects_taken array
        if (!educationProfile) {
            return res.status(404).json({ message: 'EducationProfile not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.educationProfile = educationProfile;
    next();
}

// Getting all EducationProfiles
router.get('/', async (req, res) => {
    try {
        const educationProfiles = await EducationProfile.find().populate('subjects_taken');
        res.json(educationProfiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One EducationProfile
router.get('/:id', getEducationProfile, (req, res) => {
    res.json(res.educationProfile);
});

// Creating One EducationProfile
router.post('/', async (req, res) => {
    const { intended_major, current_grade, gpa, subjects_taken } = req.body;

    // Validate that required fields are provided
    if (!intended_major || !current_grade || !gpa || !subjects_taken) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newEducationProfile = new EducationProfile({
        intended_major,
        current_grade,
        gpa,
        subjects_taken
    });

    try {
        const savedEducationProfile = await newEducationProfile.save();
        res.status(201).json(savedEducationProfile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One EducationProfile
router.patch('/:id', getEducationProfile, async (req, res) => {
    const { intended_major, current_grade, gpa, subjects_taken } = req.body;

    // Validate that at least one field is provided for update
    if (!intended_major && !current_grade && !gpa && !subjects_taken) {
        return res.status(400).json({ message: 'Please provide at least one field to update' });
    }

    try {
        if (intended_major) {
            res.educationProfile.intended_major = intended_major;
        }
        if (current_grade) {
            res.educationProfile.current_grade = current_grade;
        }
        if (gpa) {
            res.educationProfile.gpa = gpa;
        }
        if (subjects_taken) {
            res.educationProfile.subjects_taken = subjects_taken;
        }

        const updatedEducationProfile = await res.educationProfile.save();
        res.json(updatedEducationProfile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One EducationProfile
router.delete('/:id', getEducationProfile, async (req, res) => {
    try {
        await res.educationProfile.remove();
        res.json({ message: 'EducationProfile deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
