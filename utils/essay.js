const Essay = require('../models/essayModel');

// Helper function to get a random Essay
async function getRandomEssay() {
    const count = await Essay.countDocuments().exec();
    const random = Math.floor(Math.random() * count);
    return Essay.findOne().skip(random).exec();
}

async function getEssayById(id) {
    return Essay.findById(id);
}

module.exports = {
    getRandomEssay,
    getEssayById
};
