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

const getEssayBodies = async (student) => {
    try {
      // Evaluate the student's past essays for potential areas of improvement
      const essayPromises = student.essays.map(essayId => getEssayById(essayId));
      
      // Wait for all promises to resolve
      const essayObjects = await Promise.all(essayPromises);
      
      return essayObjects;
    } catch (error) {
      console.error('Error fetching essays:', error);
      throw error;
    }
  };

module.exports = {
    getRandomEssay,
    getEssayById,
    getEssayBodies
};
