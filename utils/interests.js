const Interest = require('../models/interestModel');

// Helper function to get a random Interests
async function getRandomInterests() {
    const count = await Interest.countDocuments().exec();
    const random = Math.floor(Math.random() * count);
    return Interest.findOne().skip(random).exec();
}

async function getInterestsById(id) {
    return await Interest.findById(id);
}

module.exports = {getRandomInterests, getInterestsById};
