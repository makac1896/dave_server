const School = require('../models/schoolModel');

// Helper function to get a random School
async function getRandomSchool() {
    const count = await School.countDocuments().exec();
    const random = Math.floor(Math.random() * count);
    return School.findOne().skip(random).exec();
}

async function getSchoolById(id) {
    return School.findById(id);
}

module.exports = {getRandomSchool, getSchoolById};
