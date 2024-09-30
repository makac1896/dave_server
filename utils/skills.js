const Skill = require('../models/skillModel');

// Helper function to get a random Skill
async function getRandomSkill() {
    const count = await Interest.countDocuments().exec();
    const random = Math.floor(Math.random() * count);
    return Interest.findOne().skip(random).exec();
}

async function getSkillById(id) {
    return await Interest.findById(id);
}

module.exports = {getRandomSkill, getSkillById};
