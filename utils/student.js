const Student = require('../models/studentModel');

// Helper function to get a random student
async function getRandomStudent() {
    const count = await Student.countDocuments().exec();
    const random = Math.floor(Math.random() * count);
    return Student.findOne().skip(random).exec();
}

async function getStudentById(id) {
    return Student.findById(id);
}

module.exports = {getRandomStudent, getStudentById};
