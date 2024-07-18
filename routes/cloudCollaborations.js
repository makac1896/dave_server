const express = require('express');
const router = express.Router();
const CloudCollaboration = require('../models/cloudCollaborationModel');
const Mentor = require('../models/mentorModel');
const Essay = require('../models/essayModel');
const Feedback = require('../models/feedbackModel');

// Middleware to get CloudCollaboration by ID
async function getCloudCollaboration(req, res, next) {
    let collaboration;
    try {
        collaboration = await CloudCollaboration.findById(req.params.id)
            .populate('mentors')
            .populate('essay')
            .populate('feedback');
        if (!collaboration) {
            return res.status(404).json({ message: 'Cloud collaboration not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.collaboration = collaboration;
    next();
}

// Getting all CloudCollaborations
router.get('/', async (req, res) => {
    try {
        const collaborations = await CloudCollaboration.find()
            .populate('mentors')
            .populate('essay')
            .populate('feedback');
        res.json(collaborations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One CloudCollaboration
router.get('/:id', getCloudCollaboration, (req, res) => {
    res.json(res.collaboration);
});

// Creating One CloudCollaboration
router.post('/', async (req, res) => {
    const { mentors, essay, feedback } = req.body;

    // Validate that required fields are provided
    if (!mentors || !essay || !feedback) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Check if mentors, essay, and feedback exist
        const existingMentors = await Mentor.find({ _id: { $in: mentors } });
        const existingEssay = await Essay.findById(essay);
        const existingFeedback = await Feedback.find({ _id: { $in: feedback } });

        if (!existingEssay || existingMentors.length !== mentors.length || existingFeedback.length !== feedback.length) {
            return res.status(404).json({ message: 'One or more referenced documents do not exist' });
        }

        const newCollaboration = new CloudCollaboration({
            mentors,
            essay,
            feedback
        });

        const savedCollaboration = await newCollaboration.save();
        res.status(201).json(savedCollaboration);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One CloudCollaboration
router.patch('/:id', getCloudCollaboration, async (req, res) => {
    const { mentors, essay, feedback } = req.body;

    // Validate that required fields are provided
    if (!mentors && !essay && !feedback) {
        return res.status(400).json({ message: 'Please provide at least one field to update' });
    }

    try {
        // Check if mentors, essay, and feedback exist
        if (mentors) {
            const existingMentors = await Mentor.find({ _id: { $in: mentors } });
            if (existingMentors.length !== mentors.length) {
                return res.status(404).json({ message: 'One or more referenced mentors do not exist' });
            }
            res.collaboration.mentors = mentors;
        }
        if (essay) {
            const existingEssay = await Essay.findById(essay);
            if (!existingEssay) {
                return res.status(404).json({ message: 'Referenced essay does not exist' });
            }
            res.collaboration.essay = essay;
        }
        if (feedback) {
            const existingFeedback = await Feedback.find({ _id: { $in: feedback } });
            if (existingFeedback.length !== feedback.length) {
                return res.status(404).json({ message: 'One or more referenced feedbacks do not exist' });
            }
            res.collaboration.feedback = feedback;
        }

        const updatedCollaboration = await res.collaboration.save();
        res.json(updatedCollaboration);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One CloudCollaboration
router.delete('/:id', getCloudCollaboration, async (req, res) => {
    try {
        await res.collaboration.remove();
        res.json({ message: 'Cloud collaboration deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
