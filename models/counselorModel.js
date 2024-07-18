const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Student = require('./studentModel');
const Skill = require('./skillModel');

const CounselorSchema = new Schema({
    name: String,
    email: String,
    phone_number: String,
    skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Counselor', CounselorSchema);
