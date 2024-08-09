const express = require('express');
const router = express.Router();
const Essay = require('../models/essayModel');
const Feedback = require('../models/feedbackModel');
const Reviewer = require('../models/reviewerModel');
const Student = require('../models/studentModel');

// Middleware to get Essay by ID
async function getEssay(req, res, next) {
    let essay;
    try {
        essay = await Essay.findById(req.params.id)
                       .populate('author')
                       .populate('feedback')
                       .populate('reviewers'); // Populate author, feedback, and reviewers fields
        if (!essay) {
            return res.status(404).json({ message: 'Essay not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.essay = essay;
    next();
}

// Getting all Essays
router.get('/', async (req, res) => {
    try {
        const essays = await Essay.find()
                          .populate('author')
                          .populate('feedback')
                          .populate('reviewers'); // Populate author, feedback, and reviewers fields
        res.json(essays);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One Essay
router.get('/:id', getEssay, (req, res) => {
    res.json(res.essay);
});

// Creating One Essay
router.post('/', async (req, res) => {
    const { title, body, author, rating, feedback, reviewers } = req.body;

    // Validate required fields
    if (!title || !body || !author || !rating || !feedback || !reviewers) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newEssay = new Essay({
        title,
        body,
        author,
        rating,
        feedback,
        reviewers
    });

    try {
        const savedEssay = await newEssay.save();
        res.status(201).json(savedEssay);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One Essay
router.patch('/:id', getEssay, async (req, res) => {
    const { title, body, author, rating, feedback, reviewers } = req.body;

    // Validate at least one field is provided for update
    if (!title && !body && !author && !rating && !feedback && !reviewers) {
        return res.status(400).json({ message: 'Please provide at least one field to update' });
    }

    try {
        if (title) {
            res.essay.title = title;
        }
        if (body) {
            res.essay.body = body;
        }
        if (author) {
            res.essay.author = author;
        }
        if (rating) {
            res.essay.rating = rating;
        }
        if (feedback) {
            res.essay.feedback = feedback;
        }
        if (reviewers) {
            res.essay.reviewers = reviewers;
        }

        const updatedEssay = await res.essay.save();
        res.json(updatedEssay);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One Essay
router.delete('/:id', getEssay, async (req, res) => {
    try {
        await res.essay.remove();
        res.json({ message: 'Essay deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
