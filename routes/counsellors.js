const express = require('express');
const router = express.Router();
const Counselor = require('../models/counselorModel');

// Middleware to get Counselor by ID
async function getCounselor(req, res, next) {
    let counselor;
    try {
        counselor = await Counselor.findById(req.params.id)
                               .populate('skills') // Populate skills array
                               .populate('students'); // Populate students array
        if (!counselor) {
            return res.status(404).json({ message: 'Counselor not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.counselor = counselor;
    next();
}

// Getting all Counselors
router.get('/', async (req, res) => {
    try {
        const counselors = await Counselor.find().populate('skills').populate('students');
        res.json(counselors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One Counselor
router.get('/:id', getCounselor, (req, res) => {
    res.json(res.counselor);
});

// Creating One Counselor
router.post('/', async (req, res) => {
    const { name, email, phone_number, skills, students } = req.body;

    // Validate that required fields are provided
    if (!name || !email || !phone_number) {
        return res.status(400).json({ message: 'Please provide name, email, and phone_number' });
    }

    const newCounselor = new Counselor({
        name,
        email,
        phone_number,
        skills,
        students
    });

    try {
        const savedCounselor = await newCounselor.save();
        res.status(201).json(savedCounselor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One Counselor
router.patch('/:id', getCounselor, async (req, res) => {
    const { name, email, phone_number, skills, students } = req.body;

    // Validate that at least one field is provided for update
    if (!name && !email && !phone_number && !skills && !students) {
        return res.status(400).json({ message: 'Please provide at least one field to update' });
    }

    try {
        if (name) {
            res.counselor.name = name;
        }
        if (email) {
            res.counselor.email = email;
        }
        if (phone_number) {
            res.counselor.phone_number = phone_number;
        }
        if (skills) {
            res.counselor.skills = skills;
        }
        if (students) {
            res.counselor.students = students;
        }

        const updatedCounselor = await res.counselor.save();
        res.json(updatedCounselor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One Counselor
router.delete('/:id', getCounselor, async (req, res) => {
    try {
        await res.counselor.remove();
        res.json({ message: 'Counselor deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
